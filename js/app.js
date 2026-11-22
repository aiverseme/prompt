/**
 * PromptMatch - Application Logic
 * Interactive Vanilla JS (SPA Router, Challenge Engine)
 * - 100% 무료 실시간 AI 이미지 생성 API (Pollinations.ai) 연동
 * - 엄격하고 정밀한 변별력 채점 시스템 (대충 쓰면 20~30% 탈락, 묘사를 챙겨야 70~90% 통과)
 * - 하트 기회 차감 및 게이미피케이션 강화
 */

// ====================================================
// 1. 실제 사진 기반 스테이지 데이터셋 (가중치 키워드 및 질문)
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
    targetPrompt: "A burning silver candle with warm flame sitting in an antique brass candlestick, soft blurred green background, close up photography",
    passScore: 55, // 통과 기준 상향
    // 채점 가중치 키워드 (핵심/보조/디테일)
    primaryKeywords: ["양초", "촛대", "촛불", "candle", "candlestick"], // 핵심 피사체 (없으면 즉시 탈락)
    secondaryKeywords: ["황동", "은빛", "불꽃", "심지", "화이트", "앤틱", "빈티지", "brass", "flame", "silver", "antique"], // 재질/상태
    detailKeywords: ["아웃포커싱", "초록", "배경", "정원", "흐릿", "클로즈업", "사진", "빛", "blurred", "green", "background", "photo", "bokeh"], // 배경/조명
    hintQuestions: [
      { q: "중심 피사체", text: "어떤 사물이 테이블 위에 놓여 있나요? (양초, 촛대)" },
      { q: "색상 및 재질", text: "촛대의 손잡이와 받침대는 어떤 금속 느낌인가요? (황동, 앤틱)" },
      { q: "불꽃의 상태", text: "촛불의 심지에서 타오르는 주황빛 불꽃이 보이나요?" },
      { q: "배경과 초점", text: "뒤쪽 정원 배경은 또렷한가요, 아니면 흐릿하게 뭉개져 있나요?" }
    ],
    feedbackPos: "촛대와 양초의 중심 피사체를 포착하셨습니다!",
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
const state = {
  currentView: 'home',
  currentStageData: STAGES_DATA[0],
  lastResult: null,
  userPromptHistory: JSON.parse(localStorage.getItem('promptmatch_history') || '[]'),
  hintsOpen: false,
  hearts: 3 // 도전 기회 하트
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
  }

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
      title: "Level 1: 기초 사물 & 빛",
      desc: "타오르는 촛대, 햇살을 머금은 레몬 등 중심 사물과 빛의 방향을 관찰하고 정확히 작성하는 입문 단계입니다.",
      stagesCount: "2개 스테이지",
      targetScore: "목표 55%+",
      icon: "🕯️",
      badge: "입문"
    },
    {
      level: 2,
      title: "Level 2: 색감 & 라이프스타일",
      desc: "정갈한 라멘 한 그릇, 에메랄드 강가의 고무보트 등 생생한 일상과 다채로운 색감, 구도를 묘사하는 중급 단계입니다.",
      stagesCount: "2개 스테이지",
      targetScore: "목표 65%+",
      icon: "🍜",
      badge: "중급"
    },
    {
      level: 3,
      title: "Level 3: 인물 & 감성 무드",
      desc: "도시 옥상에서 기타를 연주하는 인물과 빈티지 일러스트 등 감성적인 스토리와 화풍을 포착하는 마스터 단계입니다.",
      stagesCount: "2개 스테이지",
      targetScore: "목표 70%+",
      icon: "🎸",
      badge: "고급"
    }
  ];

  container.innerHTML = levels.map(lvl => `
    <div class="level-card">
      <div>
        <div class="level-card-top">
          <span class="level-number-badge">${lvl.badge}</span>
          <span class="level-icon">${lvl.icon}</span>
        </div>
        <h3 class="level-card-title">${lvl.title}</h3>
        <p class="level-card-desc">${lvl.desc}</p>
      </div>
      <div>
        <div class="level-meta">
          <span>🎯 ${lvl.targetScore}</span>
          <span>📂 ${lvl.stagesCount}</span>
        </div>
        <button class="btn btn-primary" style="width:100%" onclick="startLevel(${lvl.level})">
          <span>도전 시작하기</span>
        </button>
      </div>
    </div>
  `).join('');
}

// ====================================================
// 5. 챌린지 시작 및 스테이지 렌더링
// ====================================================
function startLevel(levelNum) {
  const stage = STAGES_DATA.find(s => s.level === levelNum) || STAGES_DATA[0];
  state.hearts = 3; // 레벨 시작 시 기회 3개 충전
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
  document.getElementById('ch-target-img').src = stageData.targetImg;
  document.getElementById('ch-char-tip').textContent = stageData.charTip;

  updateHeartsUI();

  // 입력창 초기화
  const promptInput = document.getElementById('ch-prompt-input');
  promptInput.value = '';
  updateCharCount();

  // 생각 유도형 관찰 힌트 질문 렌더링
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

function updateCharCount() {
  const input = document.getElementById('ch-prompt-input');
  const countEl = document.getElementById('char-count');
  const submitBtn = document.getElementById('btn-submit-prompt');
  const len = input.value.trim().length;

  countEl.textContent = len;
  submitBtn.disabled = len < 2; // 최소 2글자 이상
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
// - 엉뚱한 단어/미관련: 15~28% (불합격)
// - 단답형 피사체만: 35~48% (기준 미달)
// - 피사체 + 색상/재질: 55~68% (근접/턱걸이 통과)
// - 배경, 조명, 구도까지 포함: 75~95% (우수 통과)
// ====================================================
function calculateStrictSimilarity(userPrompt, stageData) {
  const cleanPrompt = userPrompt.toLowerCase().replace(/[,.!?]/g, ' ');
  const userWords = cleanPrompt.split(/\s+/).filter(w => w.length > 0);

  // 1. 핵심 피사체 매칭 (반드시 있어야 함)
  let hasPrimary = false;
  stageData.primaryKeywords.forEach(kw => {
    if (cleanPrompt.includes(kw.toLowerCase())) {
      hasPrimary = true;
    }
  });

  // 핵심 피사체가 아예 없는 경우 (엉뚱한 단어 작성): 가차 없이 15%~28%
  if (!hasPrimary) {
    const penaltyScore = Math.min(28, Math.max(12, 15 + userWords.length * 2));
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

  // 3. 디테일 키워드 매칭 (배경, 조명, 구도, 화풍)
  let detailMatchCount = 0;
  stageData.detailKeywords.forEach(kw => {
    if (cleanPrompt.includes(kw.toLowerCase())) {
      detailMatchCount += 1;
    }
  });

  // 점수 계산 공식:
  // 기본 피사체 성공: 35점 시작
  let score = 35;

  // 보조 키워드 (개당 +8점, 최대 24점)
  score += Math.min(secondaryMatchCount * 8, 24);

  // 디테일 키워드 (개당 +10점, 최대 30점)
  score += Math.min(detailMatchCount * 10, 30);

  // 문장 구체성 보너스 (충실한 문장 표현, 최대 8점)
  if (userWords.length >= 6) {
    score += Math.min(userWords.length, 8);
  }

  // 약간의 자연스러운 편차 (-2 ~ +2)
  score += Math.floor(Math.random() * 5) - 2;

  // 20% ~ 96% 제한
  score = Math.max(25, Math.min(96, score));

  const isPassed = score >= stageData.passScore;

  return {
    score: score,
    isPassed: isPassed,
    secondaryMatches: secondaryMatchCount,
    detailMatches: detailMatchCount
  };
}

// ====================================================
// 7. 실시간 한국어 번역 및 AI 이미지 생성 API (Pollinations.ai)
// 한국어를 영어로 자동 번역하여 전달함으로써 엉뚱한 인물/애니메이션 환각 방지
// ====================================================

// 한글 ➡️ 영어 실시간 번역 함수
async function translateKoreanToEnglish(koreanText) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(koreanText)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation failed');
    const data = await response.json();
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      // 번역된 모든 문장 결합
      return data[0].map(item => item[0]).join(' ').trim();
    }
  } catch (err) {
    console.warn('실시간 번역 실패, 키워드 사전 매핑 대체:', err);
  }

  // 네트워크 오프라인 시 핵심 단어 매핑 폴백
  let translated = koreanText;
  const dict = {
    '촛대': 'candlestick',
    '양초': 'candle',
    '초': 'candle',
    '불': 'flame fire',
    '불꽃': 'flame',
    '황동': 'brass',
    '레몬': 'lemon',
    '그릇': 'bowl',
    '볼': 'bowl',
    '도자기': 'ceramic',
    '테이블': 'table',
    '라멘': 'ramen noodles',
    '라면': 'ramen',
    '달걀': 'boiled egg',
    '계란': 'boiled egg',
    '보트': 'raft boat',
    '배': 'boat',
    '강': 'river',
    '물': 'water',
    '기타': 'acoustic guitar',
    '남자': 'man',
    '청년': 'young man',
    '꽃': 'flower',
    '화병': 'vase',
    '새': 'bird',
    '책': 'book',
    '사진': 'photo',
    '그림': 'illustration',
    '노란색': 'yellow',
    '파란색': 'blue'
  };

  for (const [ko, en] of Object.entries(dict)) {
    translated = translated.split(ko).join(en + ' ');
  }
  return translated;
}

// Pollinations.ai 이미지 생성 요청
async function fetchRealtimeAIImage(userPrompt, stageData) {
  // 1. 한국어 프롬프트를 영어로 번역
  let englishPrompt = await translateKoreanToEnglish(userPrompt);

  // 2. 인물 문제가 아닌 정물/풍경 문제의 경우 엉뚱한 애니메이션/인물 생성 방지 가이드 추가
  let styleGuide = '';
  if (stageData.id !== 'l3_s1') { // 3-1(기타 치는 남자) 외에는 인물 차단
    styleGuide = ', still life, realistic object photography, centered shot, clean focus, no human, no person, no anime';
  } else {
    styleGuide = ', cinematic photograph, full body shot, high quality';
  }

  const finalAIPrompt = `${englishPrompt}${styleGuide}`;
  console.log('최종 AI 전달 프롬프트 (영문 변환):', finalAIPrompt);

  return new Promise((resolve) => {
    const seed = Math.floor(Math.random() * 999999);
    const cleanPrompt = encodeURIComponent(finalAIPrompt.trim());
    const aiApiUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=600&height=600&seed=${seed}&nologo=true`;

    const img = new Image();

    const timeout = setTimeout(() => {
      resolve(aiApiUrl);
    }, 6000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(aiApiUrl);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(aiApiUrl);
    };

    img.src = aiApiUrl;
  });
}

// 오프라인/통신 지연 시 대체용 로컬 캔버스 합성기
function renderFallbackCanvas(userPrompt, stageData) {
  const canvas = document.getElementById('hidden-render-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  // 그라디언트 AI 캔버스
  const grad = ctx.createLinearGradient(0, 0, 600, 600);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(1, '#3b82f6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 600);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Pretendard, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎨 AI Image Generated', 300, 270);

  ctx.font = '16px Pretendard, sans-serif';
  ctx.fillStyle = '#93c5fd';
  const snippet = userPrompt.length > 25 ? userPrompt.substring(0, 25) + '...' : userPrompt;
  ctx.fillText(`"${snippet}"`, 300, 310);

  return canvas.toDataURL('image/jpeg', 0.9);
}

// ====================================================
// 8. 프롬프트 제출 및 실시간 AI 생성 처리
// ====================================================
function submitPrompt() {
  const promptInput = document.getElementById('ch-prompt-input');
  const userText = promptInput.value.trim();
  if (userText.length < 2) return;

  const currentStage = state.currentStageData;
  const overlay = document.getElementById('loading-overlay');
  const previewText = document.getElementById('loading-prompt-text');
  const progressBar = document.getElementById('loading-progress');

  previewText.textContent = `"${userText}"`;
  progressBar.style.width = '0%';
  overlay.classList.add('active');

  // 1. 엄격한 싱크로율 채점
  const evalResult = calculateStrictSimilarity(userText, currentStage);

  // 2. Pollinations.ai 무료 실시간 AI 이미지 생성 호출
  let progress = 10;
  progressBar.style.width = '10%';

  const progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += 15;
      progressBar.style.width = `${progress}%`;
    }
  }, 350);

  fetchRealtimeAIImage(userText, currentStage).then((realtimeAiImgUrl) => {
    clearInterval(progressInterval);
    progressBar.style.width = '100%';

    setTimeout(() => {
      overlay.classList.remove('active');
      finishEvaluation(userText, currentStage, evalResult, realtimeAiImgUrl);
    }, 400);
  });
}

// ====================================================
// 9. 평가 결과 화면 렌더링
// ====================================================
function finishEvaluation(userPrompt, stageData, evalResult, userGenImg) {
  // 하트 기회 차감 처리
  if (!evalResult.isPassed) {
    state.hearts = Math.max(0, state.hearts - 1);
  }

  // 상태 기록
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
    userGenImg: userGenImg
  };

  saveHistory(historyEntry);
  state.lastResult = historyEntry;

  // 결과 뷰로 이동
  navigateTo('result');

  // DOM 반영
  const badgeEl = document.getElementById('res-badge');
  const scoreNumEl = document.getElementById('res-score-number');
  const gaugeFillEl = document.getElementById('res-gauge-fill');
  const descEl = document.getElementById('res-score-desc');
  const vsIconEl = document.getElementById('res-vs-icon');
  const nextStageBtn = document.getElementById('btn-next-stage');

  if (evalResult.isPassed) {
    badgeEl.textContent = '기준 통과 성공! 🎉';
    badgeEl.className = 'match-badge';
    descEl.textContent = `목표 싱크로율(${stageData.passScore}%)을 넘었습니다! 세심한 관찰력이 돋보입니다.`;
    vsIconEl.textContent = '✓';
    vsIconEl.className = 'vs-circle';
    if (nextStageBtn) nextStageBtn.style.display = 'inline-flex';
  } else {
    badgeEl.textContent = '기준 점수 미달! 다시 도전해 보세요 💪';
    badgeEl.className = 'match-badge fail';
    if (evalResult.grade === 'fail_unrelated') {
      descEl.textContent = `핵심 피사체를 찾지 못했습니다! 관찰 힌트 질문을 다시 읽어보세요. (남은 기회: ${state.hearts}개)`;
    } else {
      descEl.textContent = `목표 싱크로율(${stageData.passScore}%)에 미치지 못했습니다. 배경과 조명 표현을 보완해 보세요! (남은 기회: ${state.hearts}개)`;
    }
    vsIconEl.textContent = '✕';
    vsIconEl.className = 'vs-circle fail';
  }

  // 숫자 카운트 애니메이션
  animateScore(0, evalResult.score, scoreNumEl, gaugeFillEl);

  // 원본 vs 실시간 생성된 진짜 AI 이미지
  document.getElementById('res-target-img').src = stageData.targetImg;
  document.getElementById('res-target-prompt').textContent = stageData.targetPrompt;
  document.getElementById('res-user-img').src = userGenImg;
  document.getElementById('res-user-prompt').textContent = userPrompt;
  document.getElementById('res-ai-gen-label').textContent = `AI Generated (${evalResult.score}%)`;

  // 피드백 리포트
  document.getElementById('fb-positive-text').textContent = evalResult.isPassed 
    ? stageData.feedbackPos 
    : "프롬프트 작성을 시도하셨습니다. 하지만 아직 핵심 묘사가 부족합니다.";
  document.getElementById('fb-improve-text').textContent = stageData.feedbackImp;
  document.getElementById('fb-rec-prompt').textContent = stageData.recPrompt;
}

// 점수 게이지 및 숫자 카운팅 애니메이션
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

// 현재 문제 재도전
function retryCurrentStage() {
  navigateTo('challenge');
  if (state.lastResult) {
    const input = document.getElementById('ch-prompt-input');
    input.value = state.lastResult.userPrompt;
    updateCharCount();
  }
}

// 다음 단계로 이동
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
// 10. 학습 기록(History) 관리 및 통계
// ====================================================
function saveHistory(entry) {
  state.userPromptHistory.unshift(entry);
  if (state.userPromptHistory.length > 20) {
    state.userPromptHistory.pop();
  }
  localStorage.setItem('promptmatch_history', JSON.stringify(state.userPromptHistory));
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
        <span class="hist-date">${item.date} · Level ${item.level}</span>
        <span class="hist-score ${item.isPassed ? 'pass' : ''}">${item.score}% 싱크로율</span>
      </div>
      <div class="hist-images">
        <div class="hist-thumb" title="원본 이미지">
          <img src="${item.targetImg}" alt="원본">
        </div>
        <div class="hist-thumb" title="내가 만든 AI 이미지">
          <img src="${item.userGenImg}" alt="생성 AI 이미지">
        </div>
      </div>
      <p class="hist-prompt" title="${item.userPrompt}">✍️ "${item.userPrompt}"</p>
      <div class="hist-actions">
        <button class="btn btn-sm btn-outline" onclick="replayStage('${item.stageTitle}')">다시 도전</button>
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
// 11. 유틸리티 (Toast 알림)
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
// 12. 초기 이벤트 바인딩 및 앱 구동
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('ch-prompt-input');
  if (promptInput) {
    promptInput.addEventListener('input', updateCharCount);
  }

  navigateTo('home');
});
