#!/usr/bin/env python3
"""Generate the English and Japanese pages from index.html.

index.html is the Indonesian source of truth. Every translatable string is
marked with data-i18n="<key>" in the markup, and the values live in i18n.json.
This script rewrites those strings plus the per-language head metadata and the
JSON-LD graph, then writes en/index.html and ja/index.html.

Run after any edit to index.html or i18n.json:

    python tools/build.py
"""

import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_LANG = "id"


def read(path):
    with io.open(os.path.join(ROOT, path), encoding="utf-8") as fh:
        return fh.read()


def write(path, text):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with io.open(full, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)


def esc(text):
    """Escape a string for use as HTML text or as an attribute value."""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def replace_once(html, old, new, what):
    if html.count(old) != 1:
        sys.exit("build: expected exactly one %s in index.html, found %d" % (what, html.count(old)))
    return html.replace(old, new)


def translate_marked_text(html, dictionary):
    """Replace the text of every element carrying data-i18n with its translation."""
    missing = set()

    def swap(match):
        tag, attrs, body = match.group(1), match.group(2), match.group(3)
        key = re.search(r'data-i18n="([^"]+)"', attrs).group(1)
        if key not in dictionary:
            missing.add(key)
            return match.group(0)
        if "<" in body:
            sys.exit("build: data-i18n=\"%s\" wraps nested markup; translate its parts instead" % key)
        return "<%s%s>%s</%s>" % (tag, attrs, esc(dictionary[key]), tag)

    pattern = re.compile(r'<(\w+)([^>]*\bdata-i18n="[^"]+"[^>]*)>(.*?)</\1>', re.DOTALL)
    out = pattern.sub(swap, html)
    if missing:
        sys.exit("build: no translation for %s" % ", ".join(sorted(missing)))
    return out


def localize_jsonld(block, lang, page_url, cfg):
    """Rewrite the JSON-LD graph for one language."""
    graph = json.loads(block)["@graph"]
    ld = cfg["jsonld"]
    meta = cfg["meta"]
    anchor = lambda name: page_url + "#" + name

    for node in graph:
        kind = node["@type"]
        if kind == "ProfilePage":
            node["@id"] = anchor("webpage")
            node["url"] = page_url
            node["name"] = meta["title"]
            node["inLanguage"] = lang
            node["hasPart"] = {"@id": anchor("publications")}
        elif kind == "Person":
            # The @id stays the ORCID across all three pages: one person, one identifier.
            node["url"] = page_url
            node["jobTitle"] = ld["job_title"]
            node["description"] = ld["person_description"]
            node["hasOccupation"]["name"] = ld["occupation_name"]
            node["mainEntityOfPage"] = {"@id": anchor("webpage")}
            node["subjectOf"] = {"@id": anchor("publications")}
        elif kind == "ItemList":
            node["@id"] = anchor("publications")
            node["name"] = ld["list_name"]
            node["description"] = ld["list_description"]
        # WebSite is deliberately left alone: it describes the site as a whole.

    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=2)


def build(lang, cfg, source, base, langs):
    html = source
    meta = cfg["meta"]
    page_url = base + cfg["path"]

    # JSON-LD first, while the source block is still intact.
    start = html.index('<script type="application/ld+json">')
    open_end = html.index(">", start) + 1
    end = html.index("</script>", open_end)
    localized = localize_jsonld(html[open_end:end], lang, page_url, cfg)
    html = html[:open_end] + "\n" + localized + "\n    " + html[end:]

    html = translate_marked_text(html, cfg["dict"])

    src = langs[SOURCE_LANG]
    src_meta, src_url = src["meta"], base + src["path"]

    # Document language and per-language head metadata.
    html = replace_once(html, '<html lang="%s">' % SOURCE_LANG, '<html lang="%s">' % lang, "<html> tag")
    html = replace_once(html, "<title>%s</title>" % esc(src_meta["title"]),
                        "<title>%s</title>" % esc(meta["title"]), "<title>")
    for prop, old, new in [
        ('name="description"', src_meta["description"], meta["description"]),
        ('name="keywords"', src_meta["keywords"], meta["keywords"]),
        ('property="og:title"', src_meta["title"], meta["title"]),
        ('property="og:description"', src_meta["og_description"], meta["og_description"]),
        ('property="og:image:alt"', src_meta["og_image_alt"], meta["og_image_alt"]),
        ('name="twitter:title"', src_meta["title"], meta["title"]),
        ('name="twitter:description"', src_meta["og_description"], meta["og_description"]),
        ('name="twitter:image:alt"', src_meta["og_image_alt"], meta["og_image_alt"]),
    ]:
        html = replace_once(html, '<meta %s content="%s" />' % (prop, esc(old)),
                            '<meta %s content="%s" />' % (prop, esc(new)), prop)

    html = replace_once(html, '<link rel="canonical" href="%s" />' % src_url,
                        '<link rel="canonical" href="%s" />' % page_url, "canonical link")
    html = replace_once(html, '<meta property="og:url" content="%s" />' % src_url,
                        '<meta property="og:url" content="%s" />' % page_url, "og:url")

    # og:locale — this page's locale first, the other two as alternates.
    others = [c["locale"] for code, c in langs.items() if code != lang]
    locale_block = '<meta property="og:locale" content="%s" />' % cfg["locale"]
    locale_block += "".join(
        '\n    <meta property="og:locale:alternate" content="%s" />' % loc for loc in others)
    src_locales = '<meta property="og:locale" content="%s" />' % src["locale"]
    src_locales += "".join(
        '\n    <meta property="og:locale:alternate" content="%s" />' % c["locale"]
        for code, c in langs.items() if code != SOURCE_LANG)
    html = replace_once(html, src_locales, locale_block, "og:locale block")

    # Avatar alt text, theme-toggle label, publication toggle labels.
    html = replace_once(html, 'alt="%s"' % esc(src_meta["image_alt"]),
                        'alt="%s"' % esc(meta["image_alt"]), "avatar alt text")
    for key, what in [("theme_label", "theme toggle label"), ("cv_label", "CV button label")]:
        html = replace_once(html,
                            'aria-label="%s" title="%s"' % (esc(src_meta[key]), esc(src_meta[key])),
                            'aria-label="%s" title="%s"' % (esc(meta[key]), esc(meta[key])), what)
    html = replace_once(html,
                        'data-show="%s" data-hide="%s">%s<' % (esc(src_meta["pub_toggle_show"]),
                                                               esc(src_meta["pub_toggle_hide"]),
                                                               esc(src_meta["pub_toggle_show"])),
                        'data-show="%s" data-hide="%s">%s<' % (esc(meta["pub_toggle_show"]),
                                                               esc(meta["pub_toggle_hide"]),
                                                               esc(meta["pub_toggle_show"])),
                        "publication toggle")

    # The printed CV footer carries this page's own address.
    html = replace_once(html, '<div class="print-url">%s</div>' % src_url,
                        '<div class="print-url">%s</div>' % page_url, "print URL")

    # Landmark labels that screen readers read out.
    html = replace_once(html, '<nav class="site-nav" aria-label="%s">' % esc(src_meta["nav_label"]),
                        '<nav class="site-nav" aria-label="%s">' % esc(meta["nav_label"]), "nav label")
    html = replace_once(html, '<div class="lang-toggle" role="group" aria-label="%s">' % esc(src_meta["language_label"]),
                        '<div class="lang-toggle" role="group" aria-label="%s">' % esc(meta["language_label"]),
                        "language switcher label")

    # Mark the active language in the switcher.
    link = '<a href="/%s" data-lang="%s" hreflang="%s" lang="%s"'
    active = ' class="active" aria-current="page">'
    html = replace_once(html, (link % (src["path"], SOURCE_LANG, SOURCE_LANG, SOURCE_LANG)) + active,
                        (link % (src["path"], SOURCE_LANG, SOURCE_LANG, SOURCE_LANG)) + ">", "active ID link")
    html = replace_once(html, (link % (cfg["path"], lang, lang, lang)) + ">",
                        (link % (cfg["path"], lang, lang, lang)) + active, "%s language link" % lang)

    # These pages live one directory down, so root-relative asset paths.
    for old, new in [('href="style.css', 'href="/style.css'),
                     ('src="script.js', 'src="/script.js'),
                     ('href="img/', 'href="/img/'),
                     ('src="img/', 'src="/img/')]:
        html = html.replace(old, new)
    html = replace_once(html, '<a class="nav-logo" href="/"', '<a class="nav-logo" href="/%s"' % cfg["path"],
                        "nav logo link")

    return html


def main():
    config = json.loads(read("i18n.json"))
    base, langs = config["base"], config["languages"]
    source = read("index.html")

    for lang, cfg in langs.items():
        if lang == SOURCE_LANG:
            continue
        out = os.path.join(cfg["path"], "index.html").replace("\\", "/")
        write(out, build(lang, cfg, source, base, langs))
        print("built %s" % out)


if __name__ == "__main__":
    main()
