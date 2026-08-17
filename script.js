document.getElementById('year').textContent = new Date().getFullYear();

const translations = {
  id: {
    role_unej: 'Asisten Ahli, Program Studi Informatika,',
    role_jaist: 'Mahasiswa Doktoral (PhD),',
    h_about: 'Tentang',
    about_text: 'Saya dosen tetap di Program Studi Informatika, Fakultas Ilmu Komputer, Universitas Jember, dengan jabatan fungsional Asisten Ahli. Riset saya berfokus pada konstruksi dan penerapan knowledge graph, deep learning, dan NLP, sebagian besar diterapkan pada masalah diagnosis hama/penyakit tanaman dan peramalan hasil pertanian. Saat ini saya menempuh pendidikan doktoral di Japan Advanced Institute of Science and Technology (JAIST), Jepang.',
    h_research: 'Minat Riset',
    research_text: 'Knowledge Graph, Machine Learning, Deep Learning, Natural Language Processing, Graph Neural Network, Sistem Pakar, Game Intelligence.',
    h_education: 'Pendidikan',
    lbl_ongoing: 'Sedang berlangsung',
    lbl_now: 'sekarang',
    edu_1: 'Ph.D., Information Science, Japan Advanced Institute of Science and Technology (JAIST), Jepang',
    edu_2: 'M.Kom., Sistem Informasi, Institut Teknologi Sepuluh Nopember (ITS), Indonesia',
    edu_3: 'S.Pd., Pendidikan Teknik Informatika, Universitas Negeri Malang (UM), Indonesia',
    h_positions: 'Riwayat Jabatan',
    pos_1: 'Asisten Ahli, Program Studi Informatika, Universitas Jember',
    pos_2: 'Tenaga Pengajar, Program Studi Informatika, Universitas Jember',
    h_publications: 'Publikasi',
    pub_toggle_show: 'Tampilkan semua 52 publikasi ▾',
    pub_toggle_hide: 'Tampilkan lebih sedikit ▴',
    lbl_citations: 'sitasi',
    h_grants: 'Hibah Penelitian',
    h_patents: 'Kekayaan Intelektual',
    h_teaching: 'Pengajaran',
    th_course: 'Mata Kuliah',
    course_1: 'Kecerdasan Buatan',
    course_2: 'Pembelajaran Mesin',
    course_3: 'Graf Pengetahuan',
    course_4: 'Basis Data Graf',
    course_5: 'Teori Graf',
    course_6: 'Statistika',
    course_7: 'Game Design and Development',
    course_8: 'Game Intelligence',
    course_9: 'Metodologi Penelitian dan Proposal 1',
    course_10: 'Metodologi Penelitian dan Proposal 2',
    h_other: 'Informasi Lainnya',
    h_contact: 'Kontak',
    contact_text: 'Terbuka untuk kolaborasi riset dan bimbingan mahasiswa seputar Knowledge Graph, Machine Learning & NLP.',
  },
  en: {
    role_unej: 'Assistant Professor, Department of Informatics,',
    role_jaist: 'PhD Candidate,',
    h_about: 'About',
    about_text: 'I am an assistant professor in the Department of Informatics, Faculty of Computer Science, University of Jember, holding the academic rank of Assistant Professor. My research focuses on the construction and application of knowledge graphs, deep learning, and NLP, mostly applied to plant pest/disease diagnosis and agricultural yield forecasting. I am currently pursuing my PhD at the Japan Advanced Institute of Science and Technology (JAIST), Japan.',
    h_research: 'Research Interests',
    research_text: 'Knowledge Graphs, Machine Learning, Deep Learning, Natural Language Processing, Graph Neural Networks, Expert Systems, Game Intelligence.',
    h_education: 'Education',
    lbl_ongoing: 'Ongoing',
    lbl_now: 'present',
    edu_1: 'Ph.D. in Information Science, Japan Advanced Institute of Science and Technology (JAIST), Japan',
    edu_2: 'M.Comp.Sc. in Information Systems, Sepuluh Nopember Institute of Technology (ITS), Indonesia',
    edu_3: 'B.A. in Informatics Engineering Education, State University of Malang (UM), Indonesia',
    h_positions: 'Positions',
    pos_1: 'Assistant Professor, Department of Informatics, University of Jember',
    pos_2: 'Lecturer, Department of Informatics, University of Jember',
    h_publications: 'Publications',
    pub_toggle_show: 'Show all 58 publications ▾',
    pub_toggle_hide: 'Show fewer ▴',
    lbl_citations: 'citations',
    h_grants: 'Research Grants',
    h_patents: 'Intellectual Property',
    h_teaching: 'Teaching',
    th_course: 'Course',
    course_1: 'Artificial Intelligence',
    course_2: 'Machine Learning',
    course_3: 'Knowledge Graph',
    course_4: 'Graph Database',
    course_5: 'Graph Theory',
    course_6: 'Statistics',
    course_7: 'Game Design and Development',
    course_8: 'Game Intelligence',
    course_9: 'Research Methodology and Proposal 1',
    course_10: 'Research Methodology and Proposal 2',
    h_other: 'Other Information',
    h_contact: 'Contact',
    contact_text: 'Open to research collaboration and student supervision around Knowledge Graphs, Machine Learning & NLP.',
  },
  ja: {
    role_unej: '助教、情報学科,',
    role_jaist: '博士課程在学中,',
    h_about: '自己紹介',
    about_text: '私はジェンベル大学計算機科学部情報学科の常勤講師で、職位は助教です。研究分野は知識グラフの構築と応用、深層学習、自然言語処理で、主に植物の病害虫診断や農業収量予測に応用しています。現在、北陸先端科学技術大学院大学(JAIST)で博士課程に在学中です。',
    h_research: '研究分野',
    research_text: '知識グラフ、機械学習、深層学習、自然言語処理、グラフニューラルネットワーク、エキスパートシステム、ゲームインテリジェンス。',
    h_education: '学歴',
    lbl_ongoing: '在学中',
    lbl_now: '現在',
    edu_1: '博士(情報科学)、北陸先端科学技術大学院大学(JAIST)、日本',
    edu_2: '修士(情報システム)、スプルーノペンバー工科大学(ITS)、インドネシア',
    edu_3: '学士(情報工学教育)、マラン国立大学(UM)、インドネシア',
    h_positions: '職歴',
    pos_1: '助教、情報学科、ジェンベル大学',
    pos_2: '講師、情報学科、ジェンベル大学',
    h_publications: '論文業績',
    pub_toggle_show: '全58件の論文を表示 ▾',
    pub_toggle_hide: '表示を減らす ▴',
    lbl_citations: '被引用数',
    h_grants: '研究助成',
    h_patents: '知的財産',
    h_teaching: '担当科目',
    th_course: '科目名',
    course_1: '人工知能',
    course_2: '機械学習',
    course_3: '知識グラフ',
    course_4: 'グラフデータベース',
    course_5: 'グラフ理論',
    course_6: '統計学',
    course_7: 'ゲームデザイン・開発',
    course_8: 'ゲームインテリジェンス',
    course_9: '研究方法論と提案 1',
    course_10: '研究方法論と提案 2',
    h_other: 'その他の情報',
    h_contact: '連絡先',
    contact_text: '知識グラフ、機械学習、自然言語処理に関する共同研究や学生指導を歓迎します。',
  },
};

const pubList = document.getElementById('pub-list');
const pubToggle = document.getElementById('pub-toggle');

function applyLang(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key === 'pub_toggle_show' && pubList && !pubList.classList.contains('collapsed')) {
      el.textContent = dict.pub_toggle_hide;
    } else if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-toggle button').forEach((btn) => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

const savedLang = localStorage.getItem('lang');
if (savedLang && translations[savedLang]) applyLang(savedLang);

if (pubList && pubToggle) {
  pubToggle.addEventListener('click', () => {
    const collapsed = pubList.classList.toggle('collapsed');
    pubToggle.setAttribute('aria-expanded', String(!collapsed));
    const lang = document.documentElement.lang || 'id';
    const dict = translations[lang] || translations.id;
    pubToggle.textContent = collapsed ? dict.pub_toggle_show : dict.pub_toggle_hide;
  });
}
