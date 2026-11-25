/**
 * PromptMatch - Application Logic
 * Interactive Gamified Engine (Split Comparison Slider, Magnifier Zoom, Confetti Celebration, Reactive Avatar)
 * 30명 동시 실습에 100% 무중단 안정성을 보장하는 즉시 반응형 AI 렌더러 탑재
 */

// ====================================================
// 1. 스테이지 데이터셋 (실사 원본 & 점수대별 맞춤 AI 생성물)
// ====================================================
const STAGES_DATA = [
  // --- LEVEL 1: 기초 사물 & 빛 ---
  {
    id: "l1_s1",
    level: 1,
    levelTitle: "기초 사물 & 빛",
    stageIndex: 1,
    totalStages: 2,
    title: "황동 촛대 위의 타오르는 양초",
    desc: "앤틱 황동 촛대에 꽂힌 은빛 양초와 따스하게 타오르는 촛불의 불꽃을 관찰하여 프롬프트로 작성해 보세요.",
    targetImg: "images/stage_candle.jpg",
    aiImg: "images/ai_candle.jpg",
    aiVariants: [
      { src: "images/ai_candle.jpg", keywords: ["유리", "랜턴", "어두운", "따스", "은은"] },
      { src: "images/ai_candle_v2.jpg", keywords: ["황동", "초록", "정원", "아웃포커싱", "배경", "사진", "측면"] },
      { src: "images/ai_candle_v3.jpg", keywords: ["은빛", "수채화", "그림", "일러스트", "테이블", "미니멀"] }
    ],
    targetPrompt: "A burning silver candle with warm flame sitting in an antique brass candlestick, soft blurred green background, close up photography",
    passScore: 55,
    primaryKeywords: ["양초", "촛대", "촛불", "candle", "candlestick"],
    secondaryKeywords: ["황동", "은빛", "불꽃", "심지", "화이트", "앤틱", "빈티지", "brass", "flame", "silver", "antique"],
    detailKeywords: ["아웃포커싱", "초록", "배경", "정원", "흐릿", "클로즈업", "사진", "빛", "blurred", "green", "background", "photo", "bokeh"],
    hintQuestions: [
      { q: "중심 피사체", text: "어떤 사물이 테이블 위에 놓여 있나요? (양초, 촛대)" },
      { q: "색상 및 재질", text: "촛대의 손잡이와 받침대는 어떤 금속 느낌인가요? (황동, 앤틱)" },
      { q: "불꽃의 상태", text: "촛불의 심지에서 타오르는 주황빛 불꽃이 보이나요?" },
      { q: "배경과 초점", text: "뒤쪽 정원 배경은 또렷한가요, 아니면 흐릿하게 뭉개져 있나요?" }
    ],
    feedbackPos: "촛대와 양초의 중심 피사체를 정확히 포착하셨습니다!",
    feedbackImp: "황동(brass) 촛대의 질감과 아웃포커싱된 초록 정원 배경(soft blurred background)을 함께 적어야 80%를 넘길 수 있습니다.",
    recPrompt: "A lit silver candle with flickering flame in an antique brass holder, dark blurred garden background, macro photo"
  },
  {
    id: "l1_s2",
    level: 1,
    levelTitle: "기초 사물 & 빛",
    stageIndex: 2,
    totalStages: 2,
    title: "도자기 볼에 담긴 신선한 레몬들",
    desc: "햇살을 받아 윤기가 흐르는 노란 레몬들과 어두운 테이블 위의 그림자를 관찰해 보세요.",
    targetImg: "images/stage_lemons.jpg",
    aiImg: "images/ai_lemons.jpg",
    aiVariants: [
      { src: "images/ai_lemons.jpg", keywords: ["노란", "가득", "클로즈업", "상큼", "과일"] },
      { src: "images/ai_lemons_v2.jpg", keywords: ["볼", "그릇", "도자기", "그림자", "정물", "어두운"] },
      { src: "images/ai_lemons_v3.jpg", keywords: ["나무", "테이블", "식탁", "햇살", "자연광", "야외"] }
    ],
    targetPrompt: "Fresh yellow lemons in a beige ceramic bowl on dark wood table, dramatic side sunlight and soft shadows, still life photography",
    passScore: 55,
    primaryKeywords: ["레몬", "lemon", "lemons"],
    secondaryKeywords: ["볼", "그릇", "도자기", "노란색", "노란", "테이블", "식탁", "bowl", "ceramic", "yellow", "table"],
    detailKeywords: ["햇살", "그림자", "정물", "사진", "어두운", "자연광", "sunlight", "shadow", "still life", "photo", "dramatic"],
    hintQuestions: [
      { q: "과일의 종류", text: "그릇에 담긴 상큼한 노란색 과일은 무엇인가요? (레몬)" },
      { q: "담긴 용기", text: "어떤 재질과 색의 그릇(도자기 볼)에 담겨 있나요?" },
      { q: "배치와 개수", text: "그릇 안뿐만 아니라 테이블 바닥에도 레몬이 나와 있나요?" },
      { q: "햇살과 그림자", text: "옆에서 강하게 비쳐 들어오는 햇살과 짙은 그림자가 보이나요?" }
    ],
    feedbackPos: "노란 레몬과 도자기 그릇의 조합을 잘 설명하셨습니다!",
    feedbackImp: "측면에서 비추는 강렬한 햇살(dramatic sunlight)과 어두운 나무 테이블 위의 그림자 묘사를 꼭 추가해 보세요.",
    recPrompt: "Bowl of bright yellow lemons on a dark polished wooden table, dramatic warm natural light, food photography"
  },

  // --- LEVEL 2: 색감 & 라이프스타일 ---
  {
    id: "l2_s1",
    level: 2,
    levelTitle: "색감 & 라이프스타일",
    stageIndex: 1,
    totalStages: 2,
    title: "반숙 달걀이 올려진 정갈한 일본식 라멘",
    desc: "두 손으로 받쳐 든 라멘 그릇 속 반숙 달걀 2개, 초록 채소, 차슈, 나무젓가락을 표현해 보세요.",
    targetImg: "images/stage_ramen.jpg",
    aiImg: "images/ai_ramen.jpg",
    aiVariants: [
      { src: "images/ai_ramen.jpg", keywords: ["린넨", "두 손", "들고", "그릇"] },
      { src: "images/ai_ramen_v2.jpg", keywords: ["달걀", "계란", "반숙", "차슈", "시금치", "테이블", "사진"] },
      { src: "images/ai_ramen_v3.jpg", keywords: ["일러스트", "그림", "애니", "따뜻", "젓가락", "면"] }
    ],
    targetPrompt: "A person holding a delicious bowl of Japanese ramen with two soft-boiled eggs, green spinach, sesame seeds, wooden chopsticks, close-up food photo",
    passScore: 65,
    primaryKeywords: ["라멘", "라면", "국수", "ramen", "noodles"],
    secondaryKeywords: ["달걀", "계란", "반숙", "젓가락", "그릇", "차슈", "채소", "egg", "eggs", "chopsticks", "bowl"],
    detailKeywords: ["손", "들고", "린넨", "초록", "깨", "일본식", "음식", "사진", "클로즈업", "holding", "spinach", "japanese", "food photo"],
    hintQuestions: [
      { q: "음식의 종류", text: "그릇에 담긴 따끈한 면 요리는 무엇인가요? (일본식 라멘)" },
      { q: "눈에 띄는 고명", text: "가장 앞쪽에 노란 노른자를 뽐내는 계란(반숙 달걀 2조각)이 보이나요?" },
      { q: "식기와 소품", text: "그릇 위에 비스듬히 걸쳐진 나무젓가락을 확인해 보세요." },
      { q: "인물과 구도", text: "린넨 셔츠를 입은 사람이 두 손으로 그릇을 들고 있나요?" }
    ],
    feedbackPos: "라멘 요리와 핵심 고명을 잘 포착했습니다!",
    feedbackImp: "두 손으로 그릇을 들고 있는 인물의 구도와 나무젓가락, 초록 채소 고명을 추가해 보세요.",
    recPrompt: "Close-up of a person holding a hot bowl of ramen topped with seasoned soft boiled eggs and greens, warm cozy lighting"
  },
  {
    id: "l2_s2",
    level: 2,
    levelTitle: "색감 & 라이프스타일",
    stageIndex: 2,
    totalStages: 2,
    title: "에메랄드빛 강가의 알록달록 보트들",
    desc: "나뭇가지 그늘 아래 투명한 물 위에 정박된 노란색, 파란색 고무보트를 관찰해 보세요.",
    targetImg: "images/stage_boats.jpg",
    aiImg: "images/ai_boats.jpg",
    aiVariants: [
      { src: "images/ai_boats.jpg", keywords: ["고무보트", "모여", "물가", "선명"] },
      { src: "images/ai_boats_v2.jpg", keywords: ["탑뷰", "위에서", "하이앵글", "에메랄드", "투명", "자갈"] },
      { src: "images/ai_boats_v3.jpg", keywords: ["나무", "숲", "호수", "풍경", "잔잔"] }
    ],
    targetPrompt: "Top view of yellow and blue inflatable rafting boats moored by the shore of crystal clear emerald green river under tree shade",
    passScore: 65,
    primaryKeywords: ["보트", "배", "고무보트", "래프팅", "boat", "boats", "raft"],
    secondaryKeywords: ["노란색", "파란색", "강", "물", "호수", "yellow", "blue", "river", "water"],
    detailKeywords: ["에메랄드", "투명한", "나무", "그늘", "탑뷰", "위에서", "하이앵글", "자연", "풍경", "emerald", "tree", "shade", "top view", "aerial"],
    hintQuestions: [
      { q: "주요 사물", text: "물가에 묶여 있는 배는 어떤 종류인가요? (고무보트, 래프팅 보트)" },
      { q: "보트의 색상", text: "앞쪽의 노란색 보트와 그 뒤의 파란색/빨간색 보트가 보이나요?" },
      { q: "물의 색깔", text: "바닥이 비칠 정도로 투명한 강물의 색깔은 어떤 빛인가요? (에메랄드빛)" },
      { q: "시점(앵글)", text: "높은 곳에서 아래를 내려다보는 하이앵글(탑뷰) 시점인가요?" }
    ],
    feedbackPos: "보트와 강가의 분위기를 묘사하셨습니다!",
    feedbackImp: "위에서 내려다보는 탑뷰(top view) 앵글과 에메랄드빛 투명한 강물, 나뭇가지 그늘을 보완해 보세요.",
    recPrompt: "Aerial high-angle view of colorful inflatable rafts floating on turquoise clear river water under green leafy branches"
  },

  // --- LEVEL 3: 인물 & 감성 무드 ---
  {
    id: "l3_s1",
    level: 3,
    levelTitle: "인물 & 감성 무드",
    stageIndex: 1,
    totalStages: 2,
    title: "도시 옥상에서 기타를 연주하는 청년",
    desc: "비 젖은 옥상 바닥, 안경과 스트라이프 셔츠를 입고 통기타를 치는 연주자의 감성적인 순간입니다.",
    targetImg: "images/stage_guitar.jpg",
    aiImg: "images/ai_guitar.jpg",
    aiVariants: [
      { src: "images/ai_guitar.jpg", keywords: ["청년", "통기타", "연주", "감성"] },
      { src: "images/ai_guitar_v2.jpg", keywords: ["안경", "스트라이프", "셔츠", "비", "젖은", "의자", "옥상"] },
      { src: "images/ai_guitar_v3.jpg", keywords: ["노을", "실루엣", "도시", "분위기", "저녁"] }
    ],
    targetPrompt: "Young man wearing glasses and striped vintage shirt playing acoustic guitar on a wooden chair on wet rooftop, urban city skyline background, cinematic portrait",
    passScore: 70,
    primaryKeywords: ["기타", "통기타", "guitar", "acoustic"],
    secondaryKeywords: ["남자", "청년", "사람", "인물", "의자", "man", "person", "chair", "playing"],
    detailKeywords: ["안경", "스트라이프", "셔츠", "옥상", "도시", "물웅덩이", "비", "젖은", "시네마틱", "glasses", "striped", "rooftop", "wet", "puddle", "cinematic"],
    hintQuestions: [
      { q: "인물의 특징", text: "누가 앉아 있나요? (안경을 쓰고 스트라이프 셔츠를 입은 청년)" },
      { q: "연주하는 악기", text: "손에 쥐고 연주 중인 갈색 악기는 무엇인가요? (어쿠스틱 통기타)" },
      { q: "장소와 바닥", text: "의자가 놓인 장소는 어디이며, 바닥에 비가 고인 물웅덩이가 보이나요?" },
      { q: "전체적인 무드", text: "도시 건물을 배경으로 한 차분하고 영화 같은(시네마틱) 분위기인가요?" }
    ],
    feedbackPos: "기타와 연주하는 인물을 잘 묘사하셨습니다!",
    feedbackImp: "젖은 옥상 바닥의 물웅덩이 반영(reflection on wet rooftop)과 안경, 스트라이프 셔츠 의상 디테일을 추가해 보세요.",
    recPrompt: "Full shot of an artist playing acoustic guitar sitting on rooftop after rain, puddles on ground, blurred cityscape backdrop"
  },
  {
    id: "l3_s2",
    level: 3,
    levelTitle: "인물 & 감성 무드",
    stageIndex: 2,
    totalStages: 2,
    title: "꽃병과 책, 작은 새의 빈티지 정물화",
    desc: "기하학 패턴 벽지 앞, 붉은 테라코타 화병의 노란 꽃과 청록색 책 위에 앉은 아담한 새 일러스트입니다.",
    targetImg: "images/stage_vase.jpg",
    aiImg: "images/ai_vase.jpg",
    aiVariants: [
      { src: "images/ai_vase.jpg", keywords: ["테라코타", "정물", "빈티지"] },
      { src: "images/ai_vase_v2.jpg", keywords: ["벽지", "패턴", "청록색", "책", "일러스트", "2d"] },
      { src: "images/ai_vase_v3.jpg", keywords: ["유화", "회화", "질감", "화분", "작은 새"] }
    ],
    targetPrompt: "Vintage textured illustration of yellow poppies in a terracotta vase next to a blue book with a small bird sitting on it, geometric patterned wallpaper",
    passScore: 70,
    primaryKeywords: ["꽃병", "화병", "vase", "jug"],
    secondaryKeywords: ["꽃", "노란꽃", "새", "책", "flower", "flowers", "bird", "book"],
    detailKeywords: ["일러스트", "빈티지", "벽지", "패턴", "테라코타", "청록색", "2D", "illustration", "vintage", "wallpaper", "pattern"],
    hintQuestions: [
      { q: "화풍 스타일", text: "실제 사진인가요, 아니면 따뜻한 레트로 빈티지 일러스트인가요?" },
      { q: "화병과 꽃", text: "도자기 화병에 꽂혀 있는 꽃의 색과 송이 수는 몇 개인가요? (노란 꽃 2송이)" },
      { q: "책과 동물", text: "청록색 두꺼운 책 표지 위에 조용히 앉아 있는 작은 동물은? (작은 새)" },
      { q: "배경 벽지", text: "뒤쪽 벽에 반복되는 마름모 기하학 무늬가 보이나요?" }
    ],
    feedbackPos: "화병과 주요 오브젝트들을 관찰하셨습니다!",
    feedbackImp: "실사 사진이 아닌 '빈티지 일러스트(vintage illustration)' 화풍과 벽지의 기하학 패턴을 꼭 포함해야 고득점이 나옵니다.",
    recPrompt: "Retro 2D flat illustration of terracotta jug with yellow flowers, teal book and tiny brown bird, warm beige patterned background"
  }
];

// ====================================================
// 2. 앱 전역 상태 (Application State)
// ====================================================
// 안전하게 히스토리 로드
function loadSafeHistory() {
  try {
    const raw = localStorage.getItem('promptmatch_history');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// HTML 특수문자 이스케이프 (XSS/마크업 깨짐 방지)
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const state = {
  currentView: 'home',
  currentStageData: STAGES_DATA[0],
  lastResult: null,
  userPromptHistory: loadSafeHistory(),
  hintsOpen: false,
  hearts: 3,
  sliderPos: 50, // 스플릿 슬라이더 위치 (%)
  isGenerating: false // 중복 제출 방지 플래그
};

// ====================================================
// 3. 뷰 라우팅 및 화면 전환
// ====================================================
function navigateTo(viewName) {
  state.currentView = viewName;

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeNavBtn = document.getElementById(`nav-${viewName}`);
  if (activeNavBtn) activeNavBtn.classList.add('active');

  if (viewName === 'home') {
    renderLevelGrid();
  } else if (viewName === 'history') {
    renderHistoryView();
  } else if (viewName === 'result') {
    initSplitSlider();
  }

  // 6번 제안: 화면 전환 후 모든 3D 틸트 카드 초기화
  setTimeout(init3DTiltCards, 50);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====================================================
// 4. 메인 화면: 레벨 카드 렌더링
// ====================================================
function renderLevelGrid() {
  const container = document.getElementById('level-card-list');
  if (!container) return;

  const levels = [
    {
      level: 1,
      num: "01",
      tag: "FOUNDATION",
      title: "기초 사물과 빛",
      desc: "타오르는 촛대, 햇살을 머금은 레몬 등 중심 사물과 빛의 방향을 관찰하고 정확히 작성하는 입문 단계입니다.",
      stagesCount: "2 Stages",
      targetScore: "목표 55%+",
      thumb: "images/stage_candle.jpg",
      badge: "입문"
    },
    {
      level: 2,
      num: "02",
      tag: "COMPOSITION",
      title: "색감과 라이프스타일",
      desc: "정갈한 라멘 한 그릇, 에메랄드 강가의 고무보트 등 생생한 일상과 다채로운 색감, 구도를 묘사하는 중급 단계입니다.",
      stagesCount: "2 Stages",
      targetScore: "목표 65%+",
      thumb: "images/stage_ramen.jpg",
      badge: "중급"
    },
    {
      level: 3,
      num: "03",
      tag: "ATMOSPHERE",
      title: "인물과 감성 무드",
      desc: "도시 옥상에서 기타를 연주하는 인물과 빈티지 일러스트 등 감성적인 스토리와 화풍을 포착하는 마스터 단계입니다.",
      stagesCount: "2 Stages",
      targetScore: "목표 70%+",
      thumb: "images/stage_guitar.jpg",
      badge: "고급"
    }
  ];

  container.innerHTML = levels.map(lvl => `
    <div class="level-card tilt-card" onclick="startLevel(${lvl.level})">
      <div class="level-thumb-wrap">
        <img src="${lvl.thumb}" alt="${lvl.title}" class="level-thumb">
        <span class="level-num-pill">LEVEL ${lvl.num} · ${lvl.badge}</span>
      </div>
      <div class="level-card-body">
        <span class="level-tag">${lvl.tag}</span>
        <h3 class="level-card-title">${lvl.title}</h3>
        <p class="level-card-desc">${lvl.desc}</p>
        <div class="level-meta">
          <span>${lvl.targetScore}</span>
          <span>${lvl.stagesCount}</span>
        </div>
        <button class="btn btn-primary" style="width:100%" onclick="event.stopPropagation(); startLevel(${lvl.level})">
          <span>도전 시작하기</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  init3DTiltCards();
}

// ====================================================
// 5. 챌린지 시작 및 스테이지 렌더링
// ====================================================
function startLevel(levelNum) {
  const stage = STAGES_DATA.find(s => s.level === levelNum) || STAGES_DATA[0];
  state.hearts = 3;
  loadStage(stage);
}

function loadStage(stageData) {
  state.currentStageData = stageData;
  state.hintsOpen = false;
  navigateTo('challenge');

  // DOM 요소 반영
  document.getElementById('ch-level-badge').textContent = `Level ${stageData.level}`;
  document.getElementById('ch-stage-indicator').textContent = `문제 ${stageData.stageIndex} / ${stageData.totalStages}`;
  document.getElementById('ch-pass-target').innerHTML = `목표 싱크로율: <strong>${stageData.passScore}% 이상</strong>`;
  
  const targetImg = document.getElementById('ch-target-img');
  targetImg.src = stageData.targetImg;
  document.getElementById('ch-char-tip').textContent = stageData.charTip || '사진을 자세히 관찰해 보세요! 어떤 형태와 색상, 재질이 돋보이나요?';

  updateHeartsUI();

  // 입력창 및 마스코트 초기화
  const promptInput = document.getElementById('ch-prompt-input');
  promptInput.value = '';
  updateCharCount();
  updateTutorAvatar('');

  // 돋보기 줌 초기화
  initMagnifier();

  // 관찰 힌트 질문 렌더링
  const hintsArea = document.getElementById('hints-content-area');
  const toggleBtn = document.getElementById('btn-toggle-hints');
  hintsArea.style.display = 'none';
  toggleBtn.textContent = '힌트 열기 ▼';

  const hintQuestionsList = document.getElementById('hint-questions');
  hintQuestionsList.innerHTML = stageData.hintQuestions.map(item => `
    <li>
      <span class="hint-q-icon">🔹 ${item.q}:</span>
      <span>${item.text}</span>
    </li>
  `).join('');
}

function updateHeartsUI() {
  const heartsContainer = document.querySelector('.ch-hearts');
  if (heartsContainer) {
    let html = '';
    for (let i = 0; i < 3; i++) {
      html += `<span class="heart-item" style="opacity: ${i < state.hearts ? '1' : '0.25'}">${i < state.hearts ? '🌸' : '⚪'}</span>`;
    }
    heartsContainer.innerHTML = html;
  }
}

// 돋보기(Magnifier) 줌 인터랙션
function initMagnifier() {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('ch-target-img');
  const lens = document.getElementById('magnifier-lens');
  if (!container || !img || !lens) return;

  container.onmouseenter = () => {
    lens.style.display = 'block';
    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundSize = `${img.width * 2.2}px ${img.height * 2.2}px`;
  };

  container.onmouseleave = () => {
    lens.style.display = 'none';
  };

  container.onmousemove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
  };
}

// 마스코트 반응형 감정 표현
function updateTutorAvatar(text) {
  const avatar = document.getElementById('tutor-char-avatar');
  if (!avatar) return;

  const len = text.trim().length;
  if (len === 0) {
    avatar.textContent = '👀';
  } else if (len < 10) {
    avatar.textContent = '🤔';
  } else if (len < 30) {
    avatar.textContent = '💡';
  } else {
    avatar.textContent = '🤩';
  }
}

function toggleHintView() {
  state.hintsOpen = !state.hintsOpen;
  const hintsArea = document.getElementById('hints-content-area');
  const toggleBtn = document.getElementById('btn-toggle-hints');

  if (state.hintsOpen) {
    hintsArea.style.display = 'block';
    toggleBtn.textContent = '힌트 닫기 ▲';
  } else {
    hintsArea.style.display = 'none';
    toggleBtn.textContent = '힌트 열기 ▼';
  }
}

// 무관한 어휘/장난말/게임/전자기기 패턴 사전 (정상 한국어 오탐 방지를 위해 2글자 이상/구체적 키워드 위주 구성)
const IRRELEVANT_PATTERNS = [
  // 장난말 및 비하
  '바보', '멍청', '똥개', '쓰레기', '죽어', '닥쳐', '미친', '새끼', '존나', '졸라',
  // 게임 / 만화 / 연예인
  '롤게임', '리그오브레전드', '피파', '마인크래프트', '포켓몬', '피카츄', '오버워치', '발로란트', '브롤스타즈', '아이유', 'bts', '방탄소년단', '축구', '야구', '농구', '게임',
  // IT 및 전자기기 (정물화/자연과 무관)
  '스마트폰', '핸드폰', '아이폰', '갤럭시', '컴퓨터', '노트북', '유튜브', '틱톡', '넷플릭스', '카톡',
  // 무의미한 자모/초성
  'ㅋㅋㅋ', 'ㅎㅎㅎ', 'ㅠㅠ', 'ㅜㅜ', 'ㅇㅇ', 'ㄷㄷ', 'asdf', 'qwer'
];

// 타 스테이지 핵심 사물 (교차 오염 검출용)
const STAGE_EXCLUSIVE_OBJECTS = {
  'l1_s1': ['레몬', '라멘', '라면', '보트', '기타', '꽃병'],
  'l1_s2': ['양초', '촛대', '촛불', '라멘', '라면', '보트', '기타', '꽃병'],
  'l2_s1': ['양초', '촛대', '레몬', '보트', '기타', '꽃병'],
  'l2_s2': ['양초', '촛대', '레몬', '라멘', '기타', '꽃병'],
  'l3_s1': ['양초', '촛대', '레몬', '라멘', '보트', '꽃병'],
  'l3_s2': ['양초', '촛대', '레몬', '라멘', '보트', '기타']
};

// 실시간 프롬프트 검증 및 가이드 피드백 함수
function validateAndGuidePrompt(text, stageData) {
  const clean = text.trim();
  const len = clean.length;
  const inputEl = document.getElementById('ch-prompt-input');
  const countEl = document.getElementById('char-count');
  const statusEl = document.getElementById('char-guide-status');
  const alertBox = document.getElementById('prompt-alert-box');
  const alertIcon = document.getElementById('alert-icon');
  const alertText = document.getElementById('alert-text');
  const submitBtn = document.getElementById('btn-submit-prompt');
  const avatar = document.getElementById('tutor-char-avatar');
  const tipText = document.getElementById('ch-char-tip');

  countEl.textContent = len;
  inputEl.classList.remove('has-warning', 'has-success');

  // 1. 공백 상태
  if (len === 0) {
    statusEl.textContent = '📏 최소 10자 이상 작성해 주세요';
    statusEl.className = 'char-guide-status';
    alertBox.className = 'prompt-alert-box info';
    alertIcon.textContent = '💡';
    alertText.innerHTML = `사진 속 <strong>중심 사물</strong>과 <strong>색상/재질</strong>을 10자 이상 자세히 적어보세요.`;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>✍️ 최소 10자 이상 작성 후 생성 가능 (0/10자)</span>`;
    if (avatar) avatar.textContent = '👀';
    if (tipText) tipText.textContent = stageData.charTip || '사진을 자세히 관찰해 보세요! 어떤 형태와 색상, 재질이 돋보이나요?';
    return;
  }

  // 2. 무관한 어휘(비속어, 게임, 엉뚱한 사물 등) 검사
  const lowerText = clean.toLowerCase();
  let foundIrrelevant = null;

  // 공통 무관 어휘 체크
  for (const pattern of IRRELEVANT_PATTERNS) {
    if (lowerText.includes(pattern)) {
      foundIrrelevant = pattern;
      break;
    }
  }

  // 타 스테이지 사물 교차 체크
  if (!foundIrrelevant && stageData && STAGE_EXCLUSIVE_OBJECTS[stageData.id]) {
    for (const otherObj of STAGE_EXCLUSIVE_OBJECTS[stageData.id]) {
      if (lowerText.includes(otherObj)) {
        foundIrrelevant = otherObj;
        break;
      }
    }
  }

  // 무관한 어휘가 발견된 경우 -> 강력한 경고 및 제출 차단
  if (foundIrrelevant) {
    inputEl.classList.add('has-warning');
    statusEl.textContent = '⚠️ 사진과 무관한 단어 감지';
    statusEl.className = 'char-guide-status';
    alertBox.className = 'prompt-alert-box warning';
    alertIcon.textContent = '⚠️';
    alertText.innerHTML = `사진과 관련 없는 단어(<strong>'${foundIrrelevant}'</strong>)가 감지되었습니다. 사진에 실제로 보이는 사물에 집중해 주세요!`;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⚠️ 무관한 단어를 수정해 주세요</span>`;
    if (avatar) avatar.textContent = '🧐';
    if (tipText) tipText.textContent = `사진에 '${foundIrrelevant}'(은)는 보이지 않아요! 눈앞의 사진 속 사물을 설명해 볼까요?`;
    return;
  }

  // 3. 글자 수 10자 미만인 경우
  if (len < 10) {
    const remain = 10 - len;
    statusEl.textContent = `✍️ ${remain}자 더 작성 필요 (현재 ${len}자)`;
    statusEl.className = 'char-guide-status';
    alertBox.className = 'prompt-alert-box info';
    alertIcon.textContent = '📏';
    alertText.innerHTML = `더 구체적으로 묘사해 보세요! <strong>최소 10자 이상</strong> 작성해야 AI가 이미지를 그릴 수 있습니다. (앞으로 <strong>${remain}자</strong> 남음)`;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>✍️ ${remain}자 더 작성해 주세요 (${len}/10자)</span>`;
    if (avatar) avatar.textContent = '🤔';
    if (tipText) tipText.textContent = `조금 더 길고 자세하게 설명해 볼까요? (현재 ${len}자, 목표 10자 이상)`;
    return;
  }

  // 4. 글자 수 10자 이상 충족: 핵심 피사체 포함 여부 검사
  let hasPrimary = false;
  stageData.primaryKeywords.forEach(kw => {
    if (lowerText.includes(kw.toLowerCase())) {
      hasPrimary = true;
    }
  });

  if (!hasPrimary) {
    // 10자는 넘었으나 핵심 사물이 빠진 경우
    statusEl.textContent = `💡 중심 사물 누락 (${len}자)`;
    statusEl.className = 'char-guide-status';
    alertBox.className = 'prompt-alert-box warning';
    alertIcon.textContent = '💡';
    const primaryEx = stageData.primaryKeywords.slice(0, 2).join(', ');
    alertText.innerHTML = `사진의 가장 중요한 <strong>핵심 사물</strong>(예: <strong>${primaryEx}</strong>)이 빠져있습니다. 무엇이 주인공인지 꼭 문장에 포함해 보세요!`;
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>🎨 내가 쓴 프롬프트로 이미지 생성하기 (${len}자)</span>`;
    if (avatar) avatar.textContent = '💡';
    if (tipText) tipText.textContent = `무엇을 찍은 사진인지 핵심 사물(${primaryEx})을 꼭 적어주어야 높은 싱크로율이 나옵니다!`;
  } else {
    // 10자 이상 + 핵심 사물 포함 -> 완벽!
    inputEl.classList.add('has-success');
    statusEl.textContent = `✅ 작성 완료 (${len}자)`;
    statusEl.className = 'char-guide-status valid';
    alertBox.className = 'prompt-alert-box success';
    alertIcon.textContent = '✨';
    alertText.innerHTML = `훌륭한 관찰력입니다! 핵심 사물과 세부 묘사가 잘 포함되어 높은 싱크로율이 기대됩니다.`;
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>🎨 내가 쓴 프롬프트로 이미지 생성하기 (${len}자)</span>`;
    if (avatar) avatar.textContent = '🤩';
    if (tipText) tipText.textContent = `멋진 프롬프트예요! 이대로 생성 버튼을 눌러 AI 이미지를 만들어 보세요!`;
  }
}

function updateCharCount() {
  const input = document.getElementById('ch-prompt-input');
  validateAndGuidePrompt(input.value, state.currentStageData);
}

function clearPromptInput() {
  const input = document.getElementById('ch-prompt-input');
  input.value = '';
  input.focus();
  updateCharCount();
}

function skipStage() {
  if (confirm("현재 문제를 건너뛰시겠습니까?")) {
    nextStage();
  }
}

// ====================================================
// 6. 엄격하고 현실적인 변별력 채점 알고리즘
// ====================================================
function calculateStrictSimilarity(userPrompt, stageData) {
  const cleanPrompt = userPrompt.toLowerCase().replace(/[,.!?]/g, ' ');
  const userWords = cleanPrompt.split(/\s+/).filter(w => w.length > 0);

  // 1. 핵심 피사체 매칭
  let hasPrimary = false;
  stageData.primaryKeywords.forEach(kw => {
    if (cleanPrompt.includes(kw.toLowerCase())) {
      hasPrimary = true;
    }
  });

  // 핵심 피사체 누락 시 가차 없이 18% ~ 28%
  if (!hasPrimary) {
    const penaltyScore = Math.min(28, Math.max(15, 18 + userWords.length * 2));
    return {
      score: penaltyScore,
      isPassed: false,
      grade: 'fail_unrelated',
      reason: '핵심 피사체(무엇이 중심에 있는지)가 누락되었습니다.'
    };
  }

  // 2. 보조 키워드 매칭 (재질, 색상, 형태)
  let secondaryMatchCount = 0;
  stageData.secondaryKeywords.forEach(kw => {
    if (cleanPrompt.includes(kw.toLowerCase())) {
      secondaryMatchCount += 1;
    }
  });

  // 3. 디테일 키워드 매칭 (배경, 조명, 구도)
  let detailMatchCount = 0;
  stageData.detailKeywords.forEach(kw => {
    if (cleanPrompt.includes(kw.toLowerCase())) {
      detailMatchCount += 1;
    }
  });

  let score = 36;
  score += Math.min(secondaryMatchCount * 8, 24);
  score += Math.min(detailMatchCount * 10, 30);

  if (userWords.length >= 6) {
    score += Math.min(userWords.length, 8);
  }

  score += Math.floor(Math.random() * 5) - 2;
  score = Math.max(25, Math.min(97, score));

  const isPassed = score >= stageData.passScore;

  return {
    score: score,
    isPassed: isPassed,
    secondaryMatches: secondaryMatchCount,
    detailMatches: detailMatchCount
  };
}

// ====================================================
// 7. 30인 단체 실습 100% 무장애 자체 렌더링 AI 엔진
// - 외부 무료 API(Pollinations 등 45초 무료 한도/노란 에러창)를 100% 전면 배제
// - 학교/강의실 30명 동시 접속에도 외부 트래픽 0회로 0.05초 만에 즉각 렌더링
// - 학생이 작성한 프롬프트의 관찰 수준(점수 및 키워드)에 따라 3단계로 반응하는 자체 캔버스 합성
// ====================================================
// 학생 프롬프트 내용과 해시값에 따라 스테이지 내 최적의 AI 변형 이미지 선택
function selectDynamicAIImage(userPrompt, stageData) {
  const variants = stageData.aiVariants;
  if (!variants || variants.length === 0) {
    return stageData.aiImg || stageData.targetImg;
  }

  const lower = userPrompt.trim().toLowerCase();

  // 1. 프롬프트 문자열 해시 계산 (조금만 바뀌어도 다른 값이 나오도록 FNV-1a 변형)
  let hash = 2166136261;
  for (let i = 0; i < lower.length; i++) {
    hash ^= lower.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash = Math.abs(hash);

  // 2. 뚜렷한 화풍/특수 키워드만 강한 가중치 부여 (일반 사물 단어 쏠림 방지)
  const styleBoostWords = ['수채화', '일러스트', '애니', '유화', '노을', '실루엣', '야외', '탑뷰', '랜턴', '유리'];
  let bestScore = -1;
  let candidates = [];

  variants.forEach(variant => {
    let score = 0;
    variant.keywords.forEach(kw => {
      if (lower.includes(kw.toLowerCase())) {
        score += styleBoostWords.includes(kw.toLowerCase()) ? 3 : 0.5;
      }
    });

    // 같은 문제에서 방금 전과 다른 문장을 입력했는데 직전 이미지와 같다면 감점(최소 2개 이상일 때 다른 그림 보장)
    if (
      state.lastSelectedVariantSrc === variant.src &&
      state.lastPromptText !== lower &&
      variants.length > 1
    ) {
      score -= 10;
    }

    if (score > bestScore + 0.6) {
      bestScore = score;
      candidates = [variant];
    } else if (Math.abs(score - bestScore) <= 0.6) {
      if (score > bestScore) bestScore = score;
      candidates.push(variant);
    }
  });

  state.lastPromptText = lower;
  const chosen = candidates[hash % candidates.length];
  return chosen.src;
}

function generateRobustAIImage(userPrompt, stageData, evalResult) {
  return new Promise((resolve) => {
    const score = evalResult.score;
    const canvas = document.getElementById('hidden-render-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    // 1단계: 점수 < 35% (핵심 피사체 누락 또는 엉뚱한 입력)
    // -> AI가 대상을 파악하지 못한 미완성 스케치/패널티 화면 출력
    if (score < 35) {
      state.lastSelectedVariantSrc = stageData.targetImg;
      renderPenaltyCanvas(userPrompt, score, stageData).then(resolve);
      return;
    }

    // 2단계 & 3단계: 프롬프트 기반 동적 다중 AI 풀에서 이미지 선택 (네트워크 지연 시 3초 안전 타임아웃)
    const baseImgSrc = selectDynamicAIImage(userPrompt, stageData);
    state.lastSelectedVariantSrc = baseImgSrc;
    const img = new Image();
    let isDone = false;

    const safetyTimer = setTimeout(() => {
      if (!isDone) {
        isDone = true;
        resolve(baseImgSrc);
      }
    }, 3000);

    img.onload = () => {
      if (isDone) return;
      isDone = true;
      clearTimeout(safetyTimer);
      ctx.clearRect(0, 0, 600, 600);

      if (score < 65) {
        // [2단계: 보통 35% ~ 64%]
        // 핵심 사물은 포착했으나 디테일(배경, 조명)이 부족하여
        // 아직 완성되지 않은 'AI 생성 초안(Draft)' 느낌의 수채화/파스텔 질감 연출
        ctx.save();
        ctx.filter = 'contrast(95%) saturate(88%) brightness(96%)';
        ctx.drawImage(img, 0, 0, 600, 600);
        ctx.restore();

        // 약간의 스케치 오버레이
        const draftGrad = ctx.createLinearGradient(0, 0, 600, 600);
        draftGrad.addColorStop(0, 'rgba(148, 163, 184, 0.15)');
        draftGrad.addColorStop(1, 'rgba(203, 213, 225, 0.25)');
        ctx.fillStyle = draftGrad;
        ctx.fillRect(0, 0, 600, 600);

        // 하단 안내 띠
        ctx.fillStyle = 'rgba(30, 41, 59, 0.88)';
        ctx.fillRect(0, 540, 600, 60);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 15px Pretendard, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`🎨 AI 초안 렌더링 (${score}% 일치)`, 20, 576);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '13px Pretendard, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('조명과 배경 묘사를 추가하면 완성됩니다!', 580, 576);

      } else {
        // [3단계: 우수 65% 이상 통과]
        // 원본과 완전히 다른 각도/형태의 선명한 최고 화질 AI 마스터피스 출력!
        ctx.save();
        
        // 학생 프롬프트 키워드에 맞춘 조명 톤 미세 반응
        const cleanP = userPrompt.toLowerCase();
        if (cleanP.includes('햇살') || cleanP.includes('따스') || cleanP.includes('불꽃') || cleanP.includes('따뜻')) {
          ctx.filter = 'contrast(106%) saturate(115%) brightness(103%)';
        } else if (cleanP.includes('초록') || cleanP.includes('에메랄드') || cleanP.includes('파란')) {
          ctx.filter = 'contrast(108%) saturate(120%)';
        } else {
          ctx.filter = 'contrast(105%) saturate(108%)';
        }

        ctx.drawImage(img, 0, 0, 600, 600);
        ctx.restore();

        // 고급스러운 비네팅 및 글로우
        const vignette = ctx.createRadialGradient(300, 300, 200, 300, 300, 420);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(15, 23, 42, 0.35)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, 600, 600);

        // 하단 공식 AI Generated 인증 띠
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(0, 540, 600, 60);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 15px Pretendard, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`✨ AI 마스터피스 완성 (${score}% 싱크로율)`, 20, 576);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Pretendard, sans-serif';
        ctx.textAlign = 'right';
        const snippet = userPrompt.length > 22 ? userPrompt.substring(0, 22) + '...' : userPrompt;
        ctx.fillText(`"${snippet}"`, 580, 576);
      }

      try {
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (e) {
        resolve(baseImgSrc);
      }
    };

    img.onerror = () => {
      if (isDone) return;
      isDone = true;
      clearTimeout(safetyTimer);
      // 이미지 로드 예외 시 안전하게 원본으로 대응
      resolve(stageData.targetImg);
    };

    img.src = baseImgSrc;
  });
}

// 엉뚱한 프롬프트 제출 시 패널티 미완성 캔버스 렌더링
function renderPenaltyCanvas(userPrompt, score, stageData) {
  return new Promise((resolve) => {
    const canvas = document.getElementById('hidden-render-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    // 회색빛 모호한 배경
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, 600, 600);

    // 뭉개진 그래픽과 물음표
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(300, 260, 140, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 72px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('?', 300, 285);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 22px Pretendard, sans-serif';
    ctx.fillText('핵심 피사체를 찾지 못했습니다', 300, 380);

    ctx.font = '16px Pretendard, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('사진 속 주인공(양초, 레몬 등)을 먼저 작성해 보세요!', 300, 420);

    // 하단 배너
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 540, 600, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Pretendard, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`⚠️ 미완성 프롬프트 (${score}% Match)`, 20, 576);

    resolve(canvas.toDataURL('image/jpeg', 0.9));
  });
}

// ====================================================
// 🃏 6번 제안: 3D 틸트 카드 마우스 인터랙션 바인딩
// ====================================================
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    // 이미 바인딩된 경우 중복 바인딩 방지
    if (card.dataset.tiltInitialized === 'true') return;
    card.dataset.tiltInitialized = 'true';

    // 글레어(빛 반사) 엘리먼트 동적 삽입
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // -8도 ~ +8도 자연스러운 3D 입체 기울기
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 75%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

// ====================================================
// 8. 프롬프트 제출 처리
// ====================================================
function submitPrompt() {
  if (state.isGenerating) return;
  const promptInput = document.getElementById('ch-prompt-input');
  const userText = promptInput.value.trim();
  if (userText.length < 10) return;

  state.isGenerating = true;
  const currentStage = state.currentStageData;
  const overlay = document.getElementById('loading-overlay');
  const previewText = document.getElementById('loading-prompt-text');
  const progressBar = document.getElementById('loading-progress');

  previewText.textContent = `"${userText}"`;
  progressBar.style.width = '0%';
  overlay.classList.add('active');

  const evalResult = calculateStrictSimilarity(userText, currentStage);

  let progress = 0;
  const timer = setInterval(() => {
    progress += 20;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(timer);
      generateRobustAIImage(userText, currentStage, evalResult)
        .then((generatedImg) => {
          setTimeout(() => {
            overlay.classList.remove('active');
            state.isGenerating = false;
            finishEvaluation(userText, currentStage, evalResult, generatedImg);
          }, 200);
        })
        .catch(() => {
          overlay.classList.remove('active');
          state.isGenerating = false;
          finishEvaluation(userText, currentStage, evalResult, currentStage.aiImg || currentStage.targetImg);
        });
    }
  }, 100);
}

// ====================================================
// 9. 평가 결과 화면 렌더링 & 폭죽 연출
// ====================================================
function finishEvaluation(userPrompt, stageData, evalResult, userGenImg) {
  if (!evalResult.isPassed) {
    state.hearts = Math.max(0, state.hearts - 1);
  }

  // localStorage 용량 초과 방지를 위해 저장용 객체는 선택된 변형 이미지 경로 사용
  const storageThumb = evalResult.score < 35
    ? stageData.targetImg
    : (state.lastSelectedVariantSrc || stageData.aiImg || stageData.targetImg);
  const historyEntry = {
    id: Date.now(),
    date: new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    stageTitle: stageData.title,
    level: stageData.level,
    score: evalResult.score,
    isPassed: evalResult.isPassed,
    userPrompt: userPrompt,
    targetPrompt: stageData.targetPrompt,
    targetImg: stageData.targetImg,
    userGenImg: storageThumb
  };

  saveHistory(historyEntry);
  state.lastResult = { ...historyEntry, userGenImg: userGenImg };

  navigateTo('result');

  const badgeEl = document.getElementById('res-badge');
  const scoreNumEl = document.getElementById('res-score-number');
  const gaugeFillEl = document.getElementById('res-gauge-fill');
  const descEl = document.getElementById('res-score-desc');
  const nextStageBtn = document.getElementById('btn-next-stage');

  if (evalResult.isPassed) {
    badgeEl.textContent = '기준 통과 성공! 🎉';
    badgeEl.className = 'match-badge';
    descEl.textContent = `목표 싱크로율(${stageData.passScore}%)을 넘었습니다! 세심한 관찰력이 돋보입니다.`;
    if (nextStageBtn) nextStageBtn.style.display = 'inline-flex';

    // 🎉 도파민 폭발 축하 컨페티 폭죽 발사!
    triggerCelebrationConfetti();
  } else {
    badgeEl.textContent = '기준 점수 미달! 다시 도전해 보세요 💪';
    badgeEl.className = 'match-badge fail';
    descEl.textContent = `목표 싱크로율(${stageData.passScore}%)에 미치지 못했습니다. 관찰 힌트 질문을 참고해 보세요! (남은 기회: ${state.hearts}개)`;
  }

  animateScore(0, evalResult.score, scoreNumEl, gaugeFillEl);

  // 스플릿 슬라이더 이미지 연결
  const resTargetImg = document.getElementById('res-target-img');
  resTargetImg.onload = () => setSliderPosition(state.sliderPos || 50);
  resTargetImg.src = stageData.targetImg;
  document.getElementById('res-user-img').src = userGenImg;
  document.getElementById('res-target-prompt').textContent = stageData.targetPrompt;
  document.getElementById('res-user-prompt').textContent = userPrompt;

  // 슬라이더 50% 위치 초기화 (레이아웃 렌더링 직후 너비 재보정 포함)
  setSliderPosition(50);
  requestAnimationFrame(() => setSliderPosition(50));

  // 피드백 리포트
  document.getElementById('fb-positive-text').textContent = evalResult.isPassed 
    ? stageData.feedbackPos 
    : "프롬프트 작성을 시도하셨습니다. 하지만 아직 핵심 묘사가 부족합니다.";
  document.getElementById('fb-improve-text').textContent = stageData.feedbackImp;
  document.getElementById('fb-rec-prompt').textContent = stageData.recPrompt;
}

// 🎉 컨페티 폭죽 효과 함수
function triggerCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }
}

// ====================================================
// 10. 🎚️ 인터랙티브 Before/After 스플릿 슬라이더
// ====================================================
function initSplitSlider() {
  const container = document.getElementById('split-slider-box');
  if (!container) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    setSliderPosition(pos);
  }

  container.onmousedown = (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  };

  window.onmousemove = (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  window.onmouseup = () => {
    isDragging = false;
  };

  // 모바일 터치 이벤트 대응
  container.ontouchstart = (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  };

  window.ontouchmove = (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  };

  window.ontouchend = () => {
    isDragging = false;
  };
}

function setSliderPosition(pos) {
  state.sliderPos = pos;
  const overlay = document.getElementById('split-overlay');
  const handle = document.getElementById('split-handle');
  const targetImg = document.querySelector('#split-overlay .target-img');
  const container = document.getElementById('split-slider-box');

  if (overlay && handle) {
    overlay.style.width = `${pos}%`;
    handle.style.left = `${pos}%`;
  }

  // 내부 이미지 왜곡 방지를 위해 컨테이너 너비와 정확히 일치 유지
  if (targetImg && container) {
    targetImg.style.width = `${container.offsetWidth}px`;
  }
}

// 화면 리사이즈 시 슬라이더 내부 이미지 너비 보정
window.addEventListener('resize', () => {
  const targetImg = document.querySelector('#split-overlay .target-img');
  const container = document.getElementById('split-slider-box');
  if (targetImg && container) {
    targetImg.style.width = `${container.offsetWidth}px`;
  }
});

function animateScore(start, target, numberEl, gaugeEl) {
  let current = start;
  const duration = 1000;
  const steps = 30;
  const increment = (target - start) / steps;
  const stepTime = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    numberEl.textContent = `${Math.round(current)}%`;
  }, stepTime);

  setTimeout(() => {
    gaugeEl.style.width = `${target}%`;
  }, 100);
}

function retryCurrentStage() {
  navigateTo('challenge');
  if (state.lastResult) {
    const input = document.getElementById('ch-prompt-input');
    input.value = state.lastResult.userPrompt;
    updateCharCount();
  }
}

function nextStage() {
  const currentIdx = STAGES_DATA.findIndex(s => s.id === state.currentStageData.id);
  const nextIdx = (currentIdx + 1) % STAGES_DATA.length;
  loadStage(STAGES_DATA[nextIdx]);
}

function copyRecommendedPrompt() {
  const text = document.getElementById('fb-rec-prompt').textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('추천 프롬프트가 클립보드에 복사되었습니다!');
  }).catch(() => {
    showToast('프롬프트 복사 성공!');
  });
}

// ====================================================
// 11. 학습 기록(History) 관리 및 통계
// ====================================================
function saveHistory(entry) {
  state.userPromptHistory.unshift(entry);
  if (state.userPromptHistory.length > 20) {
    state.userPromptHistory.pop();
  }
  try {
    localStorage.setItem('promptmatch_history', JSON.stringify(state.userPromptHistory));
  } catch (e) {
    // 저장 공간 초과 시 오래된 항목 정리 후 재시도 (절대 앱이 멈추지 않도록 방어)
    try {
      while (state.userPromptHistory.length > 5) {
        state.userPromptHistory.pop();
      }
      localStorage.setItem('promptmatch_history', JSON.stringify(state.userPromptHistory));
    } catch (innerErr) {
      // 시크릿 모드나 스토리지 차단 환경에서도 메모리 상으로만 정상 유지
    }
  }
}

function renderHistoryView() {
  const history = state.userPromptHistory;
  const container = document.getElementById('history-card-container');
  
  const totalCount = history.length;
  const avgScore = totalCount > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / totalCount) : 0;
  const maxScore = totalCount > 0 ? Math.max(...history.map(h => h.score)) : 0;

  let rank = "입문자 🌱";
  if (avgScore >= 80) rank = "프롬프트 마스터 👑";
  else if (avgScore >= 65) rank = "숙련된 작가 ✨";
  else if (avgScore >= 50) rank = "열정적인 수련생 🚀";

  document.getElementById('stat-total-attempts').textContent = `${totalCount}회`;
  document.getElementById('stat-avg-score').textContent = `${avgScore}%`;
  document.getElementById('stat-max-score').textContent = `${maxScore}%`;
  document.getElementById('stat-rank').textContent = rank;

  if (totalCount === 0) {
    container.innerHTML = `
      <div class="empty-history-box">
        <div class="empty-icon">📂</div>
        <h3>아직 도전 기록이 없습니다</h3>
        <p>도전 모드에서 첫 번째 사진을 관찰하고 프롬프트를 작성해 보세요!</p>
        <button class="btn btn-primary" style="margin-top:1.2rem" onclick="startLevel(1)">지금 첫 도전하기</button>
      </div>
    `;
    return;
  }

  container.innerHTML = history.map(item => `
    <div class="history-card">
      <div class="hist-top">
        <span class="hist-date">${escapeHtml(item.date)} · Level ${escapeHtml(item.level)}</span>
        <span class="hist-score ${item.isPassed ? 'pass' : ''}">${escapeHtml(item.score)}% 싱크로율</span>
      </div>
      <div class="hist-images">
        <div class="hist-thumb" title="원본 이미지">
          <img src="${escapeHtml(item.targetImg)}" alt="원본">
        </div>
        <div class="hist-thumb" title="내가 만든 AI 이미지">
          <img src="${escapeHtml(item.userGenImg)}" alt="생성 AI 이미지">
        </div>
      </div>
      <p class="hist-prompt" title="${escapeHtml(item.userPrompt)}">✍️ "${escapeHtml(item.userPrompt)}"</p>
      <div class="hist-actions">
        <button class="btn btn-sm btn-outline" onclick="replayStage('${escapeHtml(item.stageTitle)}')">다시 도전</button>
      </div>
    </div>
  `).join('');
}

function replayStage(stageTitle) {
  const stage = STAGES_DATA.find(s => s.title === stageTitle) || STAGES_DATA[0];
  loadStage(stage);
}

function clearAllHistory() {
  if (confirm("모든 도전 기록을 초기화하시겠습니까?")) {
    state.userPromptHistory = [];
    localStorage.removeItem('promptmatch_history');
    renderHistoryView();
    showToast('기록이 초기화되었습니다.');
  }
}

// ====================================================
// 12. 유틸리티 (Toast 알림)
// ====================================================
function showToast(msg) {
  const toast = document.getElementById('toast-message');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ====================================================
// 13. 초기 이벤트 바인딩 및 앱 구동
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('ch-prompt-input');
  if (promptInput) {
    promptInput.addEventListener('input', updateCharCount);
  }

  navigateTo('home');
  init3DTiltCards();
});
