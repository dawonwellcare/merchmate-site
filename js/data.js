// =====================================================================
// 홈페이지 내용 모음 — 글자나 사진을 바꿀 때는 이 파일만 고치면 돼요.
// 모든 페이지가 이 파일을 함께 씁니다.
// =====================================================================

// ===== 회사 정보 (맨 위 로고, 맨 아래 회사 정보에 쓰여요) =====
const SITE = {
  name: '머치메이트', // 회사 이름 (도메인 merchmate.co.kr)
  slogan: '생각을 제품으로 만드는, 머치메이트',
  ceo: '성유진',
  bizNo: '131-65-00773',
  phone: '031-944-5338', // 비워 두면 화면에 안 나와요
  email: 'merchmate@naver.com', // 비워 두면 화면에 안 나와요
  // 사무실·공장 주소 (명함 기준) — 줄을 더하거나 빼면 화면에도 그대로 반영돼요
  locations: [
    { label: 'OFFICE 1', address: '경기도 파주시 교하로 891-1, A동 (10880)' }, // 대표 주소 (실제 사용)
    { label: 'OFFICE 2', address: '경기도 고양시 일산동구 정발산로 11, 5층 501-84호(장항동, 일호골든타워)' },
    { label: 'FACTORY', address: '2F, Puiihanhua Building, Zhong Village Industry Park, Chengyang District, Qingdao City, China' },
  ],
};

// ===== 제품 분류 (회사 카탈로그 만들레퍼런스.pdf 기준) =====
// id 는 주소 뒤에 붙는 이름이에요 (예: products.html#pet)
const CATEGORIES = [
  {
    id: 'character', name: '캐릭터·봉제', en: 'CHARACTER & PLUSH',
    items: ['인형 · 캐릭터 인형', '안전벨트 인형', '캐릭터 봉제 굿즈'],
    desc: '캐릭터 IP를 활용한 다양한 봉제 제품을 OEM·ODM으로 제작합니다.',
    cover: 'images/web/mt-vest.webp',
  },
  {
    id: 'bag', name: '가방·파우치', en: 'BAG & POUCH',
    items: ['파우치 · 캐릭터 파우치', '에코백 · 트래블백', '리유저블백'],
    desc: '브랜드 굿즈부터 프로모션 제품까지, 다양한 소재와 디자인으로 제작합니다.',
    cover: 'images/web/biz-travelpouch.webp',
  },
  {
    id: 'baby', name: '유아·차량', en: 'BABY & CAR',
    items: ['카시트 매트 · 킥매트', '카시트 커버 · 차량 수납함', '유아 쿨시트 · 목베개', '안전벨트 인형 · 햇빛가리개'],
    desc: '아기의 안전과 편안함, 차량 안의 편의성을 생각한 기능성 제품입니다.',
    cover: 'images/web/baby-rattle.webp',
  },
  {
    id: 'living', name: '리빙·웰니스', en: 'LIVING & WELLNESS',
    items: ['쿠션 · 목베개', '손목대 · 복대', '패브릭 생활용품'],
    desc: '일상생활의 편안함과 실용성을 생각한 패브릭 봉제 제품입니다.',
    cover: 'images/web/biz-cushion.webp',
  },
  {
    id: 'pet', name: '반려동물', en: 'PET',
    items: ['애견 장난감 · 카시트', '봉제 토이', '패브릭 펫용품'],
    desc: '반려동물의 라이프스타일을 위한 제품입니다.',
    cover: 'images/web/pet-carseat.webp',
  },
];

// ===== 위쪽 메뉴 (마우스를 올리면 세부 메뉴가 펼쳐져요) =====
// 손님이 가장 궁금한 '만든 것'을 앞에, '회사 소개'를 뒤에 둡니다.
// cta: true 인 메뉴는 휴대폰 메뉴에만 보여요 (컴퓨터 화면은 오른쪽 위 '상담 신청' 버튼이 대신해요)
const NAV = [
  // (2026-11-07) 메뉴 이름: 영어 + 아래 작은 한글 (label = 영어, ko = 한글)
  {
    label: 'ABOUT', ko: '회사소개', href: 'about.html', page: 'about',
    sub: [
      { label: '회사 소개', href: 'about.html#intro' },
      { label: '연혁', href: 'about.html#history' },
      { label: '생산 현장', href: 'about.html#factory' },
      { label: '네트워크', href: 'about.html#network' },
      { label: '고객사', href: 'about.html#partners' },
      { label: '오시는 길', href: 'about.html#location' },
    ],
  },
  {
    label: 'MAKING', ko: '제작과정', href: 'business.html', page: 'business', pages: ['products'],
    sub: [
      { label: '개발 · 제조', href: 'business.html', icon: 'pencil' },
      { label: 'OEM · ODM', href: 'oem.html', icon: 'factory' },
      { label: '캐릭터 IP', href: 'license.html', icon: 'star' },
      { label: '품질 관리', href: 'quality.html', icon: 'check' },
      { label: '제작 품목', href: 'products.html', icon: 'box' },
    ],
  },
  {
    label: 'PORTFOLIO', ko: '제작사례', href: 'portfolio.html', page: 'portfolio',
    sub: [{ label: '전체 보기', href: 'portfolio.html' }]
      .concat(CATEGORIES.map(c => ({ label: c.name, href: `portfolio.html#${c.id}` }))),
  },
  {
    label: 'INQUIRY', ko: '제작문의', href: 'contact.html', page: 'contact',
    sub: [
      { label: '상담 신청', href: 'contact.html', icon: 'chat' },
      { label: '자주 묻는 질문', href: 'faq.html', icon: 'list' },
    ],
  },
];

// ===== 두 갈래 안내 (디자인이 있는 고객 / 아이디어만 있는 고객) =====
const PATHS = [
  {
    tag: 'OEM', question: '디자인이 이미 있으신가요?',
    title: '정해진 디자인 그대로\n우리 공장에서 만들어요',
    desc: '도면·시안·샘플이 준비된 브랜드라면, 사양 그대로 생산해서 고객사 브랜드로 납품해요.',
    flow: ['사양 확인', '샘플', '양산', '검수·납품'],
  },
  {
    tag: 'ODM', question: '아이디어만 있으신가요?',
    title: '기획과 디자인부터\n함께 만들어요',
    desc: '"이런 걸 만들고 싶어요" 한마디면 충분해요. 도면과 시안, 샘플까지 함께 만들어 제품을 완성해요.',
    flow: ['상담', '디자인 시안', '샘플', '양산', '납품'],
  },
];

// ===== 자주 묻는 질문 (누르면 답이 펼쳐져요) =====
// ※ 수량·기간 답변은 사장님 확인 후 구체적인 숫자로 바꾸면 더 좋아요
const FAQS = [
  { q: '디자인이 없어도 만들 수 있나요?', a: '네. 용도와 분위기만 알려 주시면 도면과 디자인 시안을 먼저 만들어 보여드려요. 마음에 들 때까지 함께 다듬은 뒤 샘플을 만들어요.' },
  { q: '최소 주문 수량이 있나요?', a: '품목과 소재에 따라 달라요. 생각하신 수량을 알려 주시면 그 수량에 맞는 제작 방법과 견적을 안내해 드려요.' },
  { q: '양산 전에 실물을 볼 수 있나요?', a: '네. 사진으로는 알 수 없는 색감과 촉감을 실물 샘플로 확인하신 뒤에 양산을 시작해요.' },
  { q: '제작 기간은 얼마나 걸리나요?', a: '처음 제작하시는 제품은 샘플 의뢰 후 샘플을 받기까지 2주 정도 걸려요. 샘플을 확인하고 확정하시면 양산에는 50일 전후가 걸리고, 같은 제품을 다시 주문하시는 리오더는 40일 전후예요. 제품 사양에 따라 차이가 있을 수 있어요. 긴급 제작은 추가 비용이 있으니 상담 때 희망 납기일을 알려 주세요. 일정표를 만들어 공유해 드려요.' },
  { q: '캐릭터 라이선스 제품도 만들 수 있나요?', a: '네. 디즈니, 카카오 제품을 제조할 수 있는 자격을 갖추고 있어요. 캐릭터의 표정과 비율까지 살려서 만들어요.' },
  { q: '목록에 없는 제품도 되나요?', a: '네. 봉제로 만들 수 있는 제품이라면 상담을 통해 새로 개발할 수 있어요. 참고 사진이 있으면 함께 보내 주세요.' },
  { q: '공장은 어디에 있나요?', a: '중국 산둥성 청양에 1곳, 동평에 2곳, 모두 3곳의 공장을 직접 운영해요. 중간 업체 없이 바로 생산해서 품질과 일정을 직접 챙겨요.' },
];

// ===== 첫 화면 큰 슬라이드 (5초마다 넘어가요, 위에 있는 것부터) =====
// title 의 \n 은 줄바꿈, [ ] 안의 글자는 포인트 색으로 보여요
// HERO_STYLE 로 배너 모양을 고를 수 있어요
//   'cutout' = 배경을 지운 제품 사진 + 파스텔 배경 (cutout, cutoutAlt, bg 사용)
//   'photo'  = 화면을 꽉 채우는 사진 (src, alt 사용)
//   'studio' = 흰 배경 제품 사진을 그대로 크게 (studio, studioAlt 사용)
// 옆으로 긴 제품 사진은 wide: true 를 넣으면 더 크게 보여요
const HERO_STYLE = 'studio';
const HERO_SLIDES = [
  {
    studio: 'images/web/hero-studio-highhow.webp', studioAlt: '보라색 티셔츠를 입은 강원랜드 하이하우 인형의 앞·옆·뒤 모습',
    cutout: 'images/web/hero-cut-highhow.webp', cutoutAlt: '계절 옷을 입은 강원랜드 하이하우 인형 다섯 개', bg: '#f6eedf', wide: true,
    src: 'images/web/hero.webp', alt: '차량 시트 위의 블랭킷 슬리브',
    eyebrow: '1987년부터 이어온 봉제 제조 노하우',
    title: '당신의 아이디어를\n[완성도 높은 제품으로.]',
    sub: '캐릭터 인형부터 키링·쿠션·파우치까지. 기획, 디자인, 샘플, 양산, 품질 관리를 거쳐 납품까지. 머치메이트는 OEM·ODM 전문 제조 파트너입니다.',
  },
  {
    studio: 'images/web/hero-studio-tino.webp', studioAlt: '야구 점퍼를 입은 한국공학대학교 마스코트 티노 인형의 앞·옆·뒤 모습',
    cutout: 'images/web/hero-cut-mascots.webp', cutoutAlt: '야구 점퍼와 학사복을 입은 대학교 마스코트 인형 세 개', bg: '#e2edfa',
    src: 'images/web/why4.webp', alt: '웰시코기 봉제인형 두 마리',
    eyebrow: '대학교 · 기관 마스코트',
    title: '학교의 얼굴을\n[인형으로] 만들어요',
    sub: '동덕여대, 삼육대, 한국공학대 같은 학교와 기관의 마스코트 인형을 만들었습니다.',
  },
  {
    studio: 'images/web/hero-studio-findout.webp', studioAlt: '귤을 안은 고양이 후드 인형의 앞·옆·뒤 모습',
    cutout: 'images/web/hero-cut-keyrings.webp', cutoutAlt: '너구리 옷을 입은 인형 키링 여섯 개', bg: '#fbe9ee',
    src: 'images/web/why4.webp', alt: '웰시코기 봉제인형 두 마리',
    eyebrow: '캐릭터 인형 · 키링',
    title: '캐릭터의 표정까지\n[살려 내는] 공장',
    sub: '디즈니·카카오 제품 제조 자격을 갖춘 생산 라인에서 만듭니다.',
  },
  {
    studio: 'images/web/hero-studio-mirror.webp', studioAlt: '토끼·곰·강아지 인형이 달린 차량용 후방 거울 세 가지',
    cutout: 'images/web/hero-cut-baby.webp', cutoutAlt: '인형이 달린 유모차 장난감과 동물 모양 후방 거울', bg: '#efe8f7',
    src: 'images/web/car-a1beltdoll.webp', alt: '여우 모양 안전벨트 인형',
    eyebrow: '유아 · 차량용품',
    title: '아이와 함께하는 물건,\n[1987년부터] 만들어 왔어요',
    sub: '유모차 장난감, 차량용 거울, 안전벨트 인형까지 유아 브랜드와 함께 만들었습니다.',
  },
  {
    studio: 'images/web/hero-studio-pouch.webp', studioAlt: '스펀지밥 파인애플 집 모양 에어팟 파우치',
    cutout: 'images/web/hero-cut-brand.webp', cutoutAlt: '메르세데스-벤츠 무릎담요, 스펀지밥 에코백, 파인애플 파우치', bg: '#e6eee8',
    src: 'images/web/why3.webp', alt: '사무실 파티션에 건 수납 포켓',
    eyebrow: '브랜드 굿즈 · 리빙',
    title: '브랜드 굿즈부터\n[생활용품]까지',
    sub: '무릎담요, 에코백, 파우치처럼 매일 쓰는 패브릭 제품을 브랜드에 맞춰 만듭니다.',
  },
];

// ===== 고객사 =====
// [이름, 분야] 순서예요. 앞쪽 4곳은 첫 화면 문구에 나와요.
// 로고 파일이 생기면 LOGO_FILES 에 '이름': '경로' 를 적어 주세요. 로고가 없으면 이름 글자로 보여요.
const LOGO_FILES = {
  '강원랜드': 'images/logos/kangwonland.png',
  '농심': 'images/logos/nongshim.svg',
  '블랙야크': 'images/logos/blackyak.svg',
  '메르세데스-벤츠': 'images/logos/mercedes-benz.svg',
  '한화생명': 'images/logos/hanwha-life.svg',
  '덕성여자대학교': 'images/logos/duksung.png',
  '동덕여자대학교': 'images/logos/dongduk.png',
  '서울여자대학교': 'images/logos/swu.jpg',
  '삼육대학교': 'images/logos/sahmyook.png',
  '강원대학교': 'images/logos/kangwon-univ.png',
  '한국공학대학교': 'images/logos/tukorea.svg',
  '사이버한국외국어대학교': 'images/logos/cufs.svg',
  '상산고등학교': 'images/logos/sangsan.png',
  '국립생태원': 'images/logos/nie.png',
  '파주시': 'images/logos/paju.svg',
  '대구 중구청': 'images/logos/daegu-junggu.png',
  '영덕도서관': 'images/logos/yeongdeok-library.png',
  '범아': 'images/logos/buma.png',
  '엠티코리아': 'images/logos/mtkorea.png',
  '마켓유니버스': 'images/logos/market-universe.png',
  '예인미술': 'images/logos/yein.png',
  '우리공간연구소': 'images/logos/woori-space.jpg',
  '굿디': 'images/logos/goody.png',
  '한솔기프트': 'images/logos/hansol-gift.jpg',
  '잉글레시나': 'images/logos/inglesina.svg',
  '메리본': 'images/logos/merrybon.png',
  '에이원': 'images/logos/aone.png',
  '엠베이비': 'images/logos/mbaby.png',
  '페도라': 'images/logos/fedora.png',
  '시모네': 'images/logos/simone.png',
  '피크몽': 'images/logos/pickmong.png',
  '펀앳홈': 'images/logos/funathome.jpg',
  '콜드웜': 'images/logos/coldwarm.svg',
  '금홍': 'images/logos/kumhong.png',
  '폼포라 펫': 'images/logos/pompolarr-pet.png',
  '쿠잉': 'images/logos/cooing.png',
  'HL그룹': 'images/logos/hl-group.png',
  // 아직 로고 없음: 파인드아웃, 푸딩
};
const LOGOS = [
  ['강원랜드', '기업'], ['농심', '기업'], ['블랙야크', '기업'], ['메르세데스-벤츠', '기업'],
  ['한화생명', '기업'],
  ['덕성여자대학교', '대학교'], ['동덕여자대학교', '대학교'], ['서울여자대학교', '대학교'], ['삼육대학교', '대학교'],
  ['강원대학교', '대학교'], ['한국공학대학교', '대학교'], ['사이버한국외국어대학교', '대학교'], ['상산고등학교', '학교'],
  ['국립생태원', '공공기관'], ['파주시', '공공기관'], ['대구 중구청', '공공기관'], ['영덕도서관', '공공기관'],
  ['HL그룹', '기업'], ['범아', '기업'], ['엠티코리아', '기업'], ['마켓유니버스', '기업'],
  ['예인미술', '기업'], ['우리공간연구소', '기업'], ['굿디', '판촉물'], ['한솔기프트', '판촉물'],
  ['잉글레시나', '유아 브랜드'], ['메리본', '유아 브랜드'], ['에이원', '유아 브랜드'], ['엠베이비', '유아 브랜드'],
  ['페도라', '유아 브랜드'], ['시모네', '캐릭터'], ['피크몽', '캐릭터'], ['펀앳홈', '리빙'],
  ['콜드웜', '리빙'], ['파인드아웃', '브랜드'], ['금홍', '브랜드'], ['폼포라 펫', '반려동물'],
  ['쿠잉', '브랜드'], ['푸딩', '브랜드'],
].map(([name, type]) => ({ name, type, src: LOGO_FILES[name] || '' }));

// ===== 강점 (사진 한 장에 장점 하나씩) =====
const STRENGTHS = [
  { title: '디자인 시안을 먼저 확인', desc: '도면과 시안으로 완성 모습을 먼저 보여드려요.', src: 'images/web/why-new-1.webp', alt: '도면과 완성품을 나란히 놓은 사진' },
  { title: '실물 샘플 확인 후 양산', desc: '색감과 촉감을 실물 샘플로 확인한 뒤 양산해요.', src: 'images/web/why-new-2.webp', alt: '진열대에 놓인 샘플 인형들' },
  { title: '택·라벨·포장까지 맞춤', desc: '택, 라벨, 개별 포장을 함께 정하고 원하는 곳까지 보내 드려요.', src: 'images/web/why-new-3.webp', alt: '포장한 박스를 트럭에 싣는 출고 모습' },
  { title: '직접 운영하는 생산 현장', desc: '공장 3곳에서 품질과 일정을 직접 챙겨요.', src: 'images/web/why-new-4.webp', alt: '작업자들이 인형을 만드는 공장 작업장' },
];

// ===== 제작 방법: 과정 사진 3장 (기획 → 생산 → 납품) =====
// 중국 공장에서 찍은 실제 사진이에요 (원본: images/6_공장샘플_260907)
// video 를 넣으면 사진 대신 소리 없는 짧은 영상이 나와요 (src 는 영상 첫 장면 사진)
const DEV_PHOTOS = [
  { title: '기획 · 디자인', src: 'images/web/factory-ribbons.webp', alt: '공장 선반에 색깔별로 정리된 리본과 끈 부자재' },
  { title: '재단 · 생산', src: 'images/web/video-sewing.webp', video: 'images/web/video-sewing.mp4', alt: '재봉틀로 보라색 원단을 박는 작업 영상' },
  { title: '포장 · 납품', src: 'images/web/dev-ship.webp', alt: '포장한 박스를 팔레트에 쌓아 트럭에 싣는 출고 모습' },
];

// ===== 제작 방법: 기획·개발 / 생산·관리 (icon 은 js/site.js 의 ICONS 중 하나) =====
const CAPABILITIES = [
  {
    en: 'STRATEGIC PLANNING', group: '기획 · 개발',
    desc: '만들기 전에, 잘 만들어지고 잘 쓰일 제품을 함께 설계해요.',
    items: [
      { icon: 'pencil', title: '캐릭터·제품 디자인', desc: '아이디어나 캐릭터 그림을 봉제로 만들 수 있는 도안으로 옮겨요.' },
      { icon: 'scissors', title: '패턴 개발', desc: '표정과 비율이 살아나도록 재단 패턴을 직접 만들고 다듬어요.' },
      { icon: 'fabric', title: '원단·부자재 선택', desc: '용도와 예산에 맞는 원단과 지퍼, 라벨 같은 부자재를 골라 드려요.' },
      { icon: 'box', title: '포장·원가 설계', desc: '택, 라벨, 포장 방법과 수량별 단가를 함께 정해요.' },
    ],
  },
  {
    en: 'INTEGRATED PRODUCTION', group: '생산 · 관리',
    desc: '샘플부터 납품까지, 직접 운영하는 공장에서 챙겨요.',
    items: [
      { icon: 'needle', title: '샘플 제작', desc: '실물 샘플로 색감과 촉감을 확인하고, 마음에 들 때까지 고쳐요.' },
      { icon: 'factory', title: '공정 관리', desc: '공장 3곳에서 재단부터 봉제, 마무리까지 직접 관리해요.' },
      { icon: 'check', title: '품질 검수', desc: '승인한 샘플을 기준으로 출고 전에 한 번 더 확인해요.' },
      { icon: 'truck', title: '납기·배송 관리', desc: '일정표를 공유하고, 원하는 곳까지 포장해서 보내 드려요.' },
    ],
  },
];

// ===== 제작 방법: 다루는 소재 (사진은 그 소재로 만든 실제 제품, 첫 번째가 가장 크게 보여요) =====
const MATERIALS = [
  { en: 'LINEN', name: '린넨', desc: '블랭킷, 파우치, 슬리브 같은 리빙 굿즈', src: 'images/web/hero.webp' },
  { en: 'PLUSH', name: '부드러운 털 원단', desc: '봉제인형, 쿠션처럼 손에 닿는 제품', src: 'images/web/why4.webp', clean: 'images/web/bg-why4.jpg' },
  { en: 'DENIM', name: '데님', desc: '개성 있는 인형과 소품', src: 'images/web/doll-denim.webp' },
  { en: 'COTTON · KNIT', name: '면 · 니트', desc: '아기가 만지는 애착 인형, 딸랑이', src: 'images/web/baby-simone.webp', scene: 'images/web/scene-simone.jpg' },
  { en: 'PVC', name: 'PVC · 비닐', desc: '속이 보이거나 반짝이는 파우치, 필통', src: 'images/web/doll-pouch.webp', clean: 'images/web/bg-doll-pouch.jpg' },
  { en: 'FUNCTIONAL', name: '두꺼운 기능성 원단', desc: '카시트 수납함, 매트 같은 차량·반려용품', src: 'images/web/car-organizer.webp' },
];

// ===== 제작 방법: 품질·납기 관리 =====
const QUALITY = [
  { title: '샘플 승인 후 양산', desc: '고객이 확인하고 승인한 샘플을 기준으로 양산을 시작해요.' },
  { title: '공장 직접 운영', desc: '중간 업체 없이 공장 3곳을 직접 운영해서, 문제가 생기면 바로 잡아요.' },
  { title: '출고 전 검수', desc: '바느질과 마감 상태를 샘플과 비교해 확인한 뒤 내보내요.' },
  { title: '진행 상황 공유', desc: '일정표를 만들어 공유하고, 단계마다 진행 상황을 알려 드려요.' },
];

// ===== 제작 과정 =====
const STEPS = [
  { title: '상담', desc: '용도, 수량, 예산, 납기를 듣고 맞는 품목을 제안해요.' },
  { title: '디자인 시안', desc: '브랜드에 맞춘 도면과 시안을 만들어 함께 다듬어요.' },
  { title: '샘플 확인', desc: '실물 샘플로 색상과 품질을 먼저 확인해요.' },
  { title: '양산', desc: '검수 기준에 맞춰 일정대로 생산해요.' },
  { title: '포장·납품', desc: '원하는 곳까지 포장해서 보내 드려요.' },
];

// ===== 제작 사례 (사진은 images/web 폴더, 분류 안에서 위에 있을수록 먼저 보여요) =====
// (2026-11-07) scene: 제작 사례 1페이지에 쓰는 연출 사진, clean: 배경 색을 맞춘 사진 (제작 사례 페이지에서만 써요)
const WORKS = [
  // 2026-10-13 받은 사진 (원본: images/대학교 인형, images/가방.담요)
  { client: '강원랜드', title: '하이하우 시즌 인형', category: '캐릭터·봉제', meta: '계절 옷을 입힌 마스코트 인형 5종', src: 'images/web/client-highhow-season.webp', scene: 'images/web/scene-highhow-season.jpg' },
  { client: '메르세데스-벤츠', title: '쿠션 무릎담요', category: '리빙·웰니스', meta: '로고 자수 쿠션형 무릎담요', src: 'images/web/client-benz-blanket.webp' },
  { client: '농심', title: '너구리 옷 인형 키링', category: '캐릭터·봉제', meta: '너구리 옷을 입힌 인형 키링 6종', src: 'images/web/client-nongshim.webp', scene: 'images/web/scene-nongshim.jpg' },
  { client: '메르세데스-벤츠', title: '에코백', category: '가방·파우치', meta: 'EQ 로고 프린트 에코백', src: 'images/web/client-benz-ecobag.webp' },
  { client: '한화생명', title: '골프 항공 커버', category: '가방·파우치', meta: '골프백 항공 커버 · 수납 파우치', src: 'images/web/client-hanwha-golf.webp', scene: 'images/web/scene-hanwha-golf.jpg' },
  { client: '페도라', title: '유아 쿨시트', category: '유아·차량', meta: '유모차 · 카시트용 쿨시트', src: 'images/web/client-fedora-coolseat.webp', scene: 'images/web/scene-fedora-coolseat.jpg' },
  { client: '덕성여자대학교', title: '덕새 학사복 인형', category: '캐릭터·봉제', meta: '학사모와 학위복을 입힌 마스코트 인형', src: 'images/web/client-duksung.webp', scene: 'images/web/scene-duksung.jpg' },
  { client: '우리공간연구소', title: '스펀지밥 파인애플 파우치', category: '가방·파우치', meta: '파인애플 집 모양 에어팟 파우치', src: 'images/web/client-spongebob-pouch.webp' },
  { client: '동덕여자대학교', title: '솜솜이 인형', category: '캐릭터·봉제', meta: '야구 점퍼를 입힌 마스코트 인형', src: 'images/web/client-dongduk.webp', scene: 'images/web/scene-dongduk.jpg' },
  { client: 'HL그룹', title: '에코백', category: '가방·파우치', meta: '로고 프린트 블랙 에코백', src: 'images/web/client-halla-ecobag.webp', scene: 'images/web/scene-halla-ecobag.jpg' },
  { client: '서울여자대학교', title: '캐릭터 인형 키링', category: '캐릭터·봉제', meta: '교복 입은 캐릭터 인형 3종', src: 'images/web/client-swu.webp', scene: 'images/web/scene-swu.jpg' },
  { client: '파인드아웃', title: '2way 보스턴백', category: '가방·파우치', meta: '수납 포켓 보스턴백', src: 'images/web/client-findout-bag.webp', scene: 'images/web/scene-findout-bag.jpg' },
  { client: '삼육대학교', title: '수야 학사복 인형', category: '캐릭터·봉제', meta: '20cm 학사복 마스코트 인형', src: 'images/web/client-sahmyook-grad.webp', scene: 'images/web/scene-sahmyook.jpg' },
  { client: '캐릭터 굿즈', title: '스펀지밥 리유저블백', category: '가방·파우치', meta: '캐릭터 얼굴 프린트 리유저블백', src: 'images/web/client-reusable-face.webp' },
  { client: '삼육대학교', title: '수야 키링', category: '캐릭터·봉제', meta: '후드를 입힌 마스코트 키링', src: 'images/web/client-sahmyook-keyring.webp' },
  { client: '캐릭터 굿즈', title: '스펀지밥 패턴 리유저블백', category: '가방·파우치', meta: '전체 패턴 프린트 리유저블백', src: 'images/web/client-reusable-pattern.webp' },
  { client: '삼육대학교', title: '날개 수야 키링', category: '캐릭터·봉제', meta: '날개를 단 마스코트 키링', src: 'images/web/client-sahmyook-wing.webp' },
  { client: '삼육대학교', title: '인형 옷 패딩 · 후드', category: '캐릭터·봉제', meta: '마스코트 인형용 옷 5종', src: 'images/web/client-sahmyook-padding.webp' },
  { client: '한국공학대학교', title: '티노 학사복 인형', category: '캐릭터·봉제', meta: '학사모와 학위복을 입힌 마스코트 인형', src: 'images/web/client-tino-grad.webp', scene: 'images/web/scene-tino-grad.jpg' },
  { client: '한국공학대학교', title: '티노 후드 인형', category: '캐릭터·봉제', meta: '후드티와 귀마개를 한 마스코트 인형', src: 'images/web/client-tino-hood.webp', scene: 'images/web/scene-tino.jpg' },
  { client: '한국공학대학교', title: '티노 키링', category: '캐릭터·봉제', meta: '야구 점퍼를 입힌 마스코트 키링', src: 'images/web/client-tino-keyring.webp' },
  { client: '사이버한국외국어대학교', title: '부엉이 키링', category: '캐릭터·봉제', meta: '야구 점퍼를 입힌 마스코트 키링', src: 'images/web/client-cufs.webp', scene: 'images/web/scene-cufs.jpg' },
  { client: '상산고등학교', title: '코끼리 인형 키링', category: '캐릭터·봉제', meta: '교복을 입힌 마스코트 키링', src: 'images/web/client-sangsan.webp' },
  { client: '국립생태원', title: '사막여우 · 펭귄 인형', category: '캐릭터·봉제', meta: '동물 봉제인형 2종', src: 'images/web/client-ecorium.webp', scene: 'images/web/scene-ecorium.jpg' },
  { client: '파주시', title: '파랑이 인형', category: '캐릭터·봉제', meta: '목도리를 두른 마스코트 인형', src: 'images/web/client-paju.webp', scene: 'images/web/scene-paju.jpg' },
  { client: '대구 중구청', title: '백로 키링', category: '캐릭터·봉제', meta: '멜빵바지를 입힌 마스코트 키링', src: 'images/web/client-junggu.webp', scene: 'images/web/scene-junggu.jpg' },
  { client: '영덕도서관', title: '마스코트 키링', category: '캐릭터·봉제', meta: '모자를 쓴 얼굴 인형 키링', src: 'images/web/client-yeongdeok-keyring.webp', scene: 'images/web/scene-yeongdeok-keyring.jpg' },
  { client: '영덕도서관', title: '마스코트 헤어핀', category: '캐릭터·봉제', meta: '얼굴 인형 집게핀', src: 'images/web/client-yeongdeok-pin.webp' },
  { client: '강원랜드', title: '하이하우 티셔츠 인형', category: '캐릭터·봉제', meta: '색깔별 티셔츠 마스코트 인형 3종', src: 'images/web/client-highhow-tee.webp' },
  { client: '메르세데스-벤츠', title: '곰 인형 키링', category: '캐릭터·봉제', meta: '체크 원단 곰 인형 키링', src: 'images/web/client-benz-keyring.webp' },
  { client: '블랙야크', title: '책가방 세트 인형', category: '캐릭터·봉제', meta: '캐릭터 인형 · 파우치 구성품', src: 'images/web/client-blackyak-set.webp' },
  { client: '마켓유니버스', title: '뭉태 키링', category: '캐릭터·봉제', meta: '럭키볼을 단 캐릭터 키링 세트', src: 'images/web/client-mungtae.webp', clean: 'images/web/bg-client-mungtae.jpg' },
  { client: '예인미술', title: '스텔라이브 키링', category: '캐릭터·봉제', meta: '캐릭터 인형 키링 3종', src: 'images/web/client-stellive.webp' },
  { client: 'ERTR', title: '미니 베개 키링', category: '캐릭터·봉제', meta: '체크 원단 베개 모양 키링 5종', src: 'images/web/client-coldwarm.webp' },
  { client: '파인드아웃', title: '볼캡 키링', category: '캐릭터·봉제', meta: '미니 모자 모양 키링', src: 'images/web/client-findout-cap.webp', scene: 'images/web/scene-findout-cap.jpg' },
  { client: '파인드아웃', title: '고양이 후드 인형', category: '캐릭터·봉제', meta: '고양이 후드를 쓴 인형', src: 'images/web/client-findout-cat.webp' },
  { client: '에이원', title: '강아지 차량 후방거울', category: '유아·차량', meta: '강아지 얼굴 봉제 커버 후방거울', src: 'images/web/client-aone-mirror.webp', scene: 'images/web/scene-aone-mirror.jpg' },
  { client: '금홍', title: '토끼 얼굴 냉감 쿠션', category: '리빙·웰니스', meta: '냉감 원단 얼굴 쿠션 2종', src: 'images/web/client-geumhong-cool.webp', scene: 'images/web/scene-geumhong-cool.jpg' },
  { client: '금홍', title: '토끼 얼굴 인형', category: '캐릭터·봉제', meta: '털 원단 얼굴 인형 2종', src: 'images/web/client-geumhong-bunny.webp' },
  { client: '금홍', title: '캐릭터 머리띠', category: '캐릭터·봉제', meta: '얼굴 인형을 단 머리띠', src: 'images/web/client-geumhong-hairband.webp', scene: 'images/web/scene-geumhong-hairband.jpg' },
  { client: '한국공학대학교', title: '티노 가방 고리 인형', category: '캐릭터·봉제', meta: '가방에 거는 마스코트 인형', src: 'images/web/client-tino-bagcharm.webp', clean: 'images/web/bg-client-tino-bagcharm.jpg' },
  { client: '공장 샘플', title: '곰 인형 웅이', category: '캐릭터·봉제', meta: '체크 발바닥 대형 곰 인형', src: 'images/web/client-bear-woong.webp' },
  // 공장 샘플
  { client: '공장 샘플', title: '녹음 토끼 인형', category: '캐릭터·봉제', meta: '발바닥 버튼으로 녹음 · 재생', src: 'images/web/sample-voice-bunny.webp' },
  { client: '공장 샘플', title: '월리 목베개', category: '리빙·웰니스', meta: '캐릭터 프린트 U자 목베개', src: 'images/web/sample-neckpillow.webp', clean: 'images/web/bg-sample-neckpillow.jpg' },
  { client: '공장 샘플', title: '쥐 도넛 파우치', category: '가방·파우치', meta: '큰 · 작은 사이즈 봉제 파우치', src: 'images/web/sample-donut-pouch.webp', clean: 'images/web/bg-sample-donut-pouch.jpg' },
  { client: '공장 샘플', title: '토끼 모자 곰 인형', category: '캐릭터·봉제', meta: '안경 케이스와 함께 만든 세트', src: 'images/web/sample-bunny-glasses.webp', clean: 'images/web/bg-sample-bunny-glasses.jpg' },
  { client: '공장 샘플', title: '강아지 옷 곰 인형', category: '캐릭터·봉제', meta: '강아지 옷을 입힌 곰 인형', src: 'images/web/sample-bear-puppy.webp', clean: 'images/web/bg-sample-bear-puppy.jpg' },
  { client: '공장 샘플', title: '동물 옷 곰 인형 3종', category: '캐릭터·봉제', meta: '리본 · 토끼 · 강아지 옷 곰 인형', src: 'images/web/sample-bear-trio.webp', clean: 'images/web/bg-sample-bear-trio.jpg' },
  { client: '공장 샘플', title: '토끼 · 곰 인형 선물 세트', category: '캐릭터·봉제', meta: '상자 포장 인형 세트', src: 'images/web/sample-bear-box.webp', clean: 'images/web/bg-sample-bear-box.jpg' },
  { client: '공장 샘플', title: '웰시코기 인형', category: '캐릭터·봉제', meta: '봉제인형 2종', src: 'images/web/why4.webp', clean: 'images/web/bg-why4.jpg' },
  { client: '공장 샘플', title: '데님 동물 인형', category: '캐릭터·봉제', meta: '데님 원단 봉제인형', src: 'images/web/doll-denim.webp' },
  { client: '공장 샘플', title: '원피스 강아지 인형', category: '캐릭터·봉제', meta: '옷 입힌 봉제인형', src: 'images/web/doll-puppy.webp', clean: 'images/web/bg-doll-puppy.jpg' },
  { client: '공장 샘플', title: '캐릭터 지퍼 파우치', category: '가방·파우치', meta: '투명 PVC 파우치', src: 'images/web/doll-pouch.webp', clean: 'images/web/bg-doll-pouch.jpg' },
  // 애견용품
  { client: '애견용품', title: '강아지 캐리어', category: '반려동물', meta: '백팩형 · 수납포켓 · 탈부착 쿠션패드', src: 'images/web/pet-carrier.webp', clean: 'images/web/bg-pet-carrier.jpg' },
  { client: '애견용품', title: '애견 카시트', category: '반려동물', meta: '차량용 쿠션 카시트', src: 'images/web/pet-carseat.webp' },
  { client: '펀앳홈', title: '아이스크림 시리즈 노즈워크', category: '반려동물', meta: '노즈워크 장난감 4종', src: 'images/web/pet-nosework.webp' },
  { client: '애견용품', title: '파스텔 밀크 카우 인형 세트', category: '반려동물', meta: '노즈워크 인형 세트', src: 'images/web/pet-milkcow.webp' },
  { client: '피크몽', title: '내꺼유 노즈워크', category: '반려동물', meta: '노즈워크 인형 세트', src: 'images/web/pet-peakmong.webp', scene: 'images/web/scene-peakmong.jpg' },
  // 유아제품
  { client: '유아제품', title: '봉제 딸랑이', category: '유아·차량', meta: '토끼 딸랑이 3종', src: 'images/web/baby-rattle.webp', clean: 'images/web/bg-baby-rattle.jpg' },
  { client: '메리본', title: '차량용 후방거울', category: '유아·차량', meta: '캐릭터 봉제 커버 3종', src: 'images/web/baby-mirror.webp' },
  { client: '유아제품', title: '아기 걸음마 머리보호대', category: '유아·차량', meta: '백팩형 머리보호대', src: 'images/web/baby-headguard.webp', clean: 'images/web/bg-baby-headguard.jpg' },
  { client: '메리본', title: '유모차 가드', category: '유아·차량', meta: '유모차 손잡이 쿠션', src: 'images/web/baby-strollerguard.webp' },
  { client: '메리본', title: '차량 햇빛가리개', category: '유아·차량', meta: '프린트 햇빛가리개', src: 'images/web/baby-sunshade.webp' },
  { client: '시모네', title: '딸랑이 세트', category: '유아·차량', meta: '니트 인형 딸랑이', src: 'images/web/baby-simone.webp', scene: 'images/web/scene-simone.jpg' },
  { client: '유아제품', title: '아기띠 어깨보호대', category: '유아·차량', meta: '캐릭터 어깨 커버', src: 'images/web/baby-shoulder.webp', clean: 'images/web/bg-baby-shoulder.jpg' },
  { client: '엠베이비', title: '모빌', category: '유아·차량', meta: '봉제 바다 친구 모빌', src: 'images/web/baby-mobile.webp', scene: 'images/web/scene-mobile.jpg' },
  { client: '유아제품', title: '우쭈쭈 베이비 애착인형', category: '유아·차량', meta: '니트 토끼 인형', src: 'images/web/baby-doll.webp' },
  { client: '유아제품', title: '유모차 장난감', category: '유아·차량', meta: '아치형 봉제 장난감', src: 'images/web/baby-strollertoy.webp' },
  { client: '유아제품', title: '짱구 베개', category: '유아·차량', meta: '캐릭터 아기 베개', src: 'images/web/baby-pillow.webp', clean: 'images/web/bg-baby-pillow.jpg' },
  { client: '페도라', title: '차량용 에어크리너 인형', category: '유아·차량', meta: '캐릭터 봉제 커버', src: 'images/web/baby-aircleaner.webp' },
  // 차량용품
  { client: '메리본', title: '카시트 킥 매트', category: '유아·차량', meta: '시트 뒷면 보호 매트', src: 'images/web/car-kickmat.webp', scene: 'images/web/scene-kickmat.jpg' },
  { client: '잉글레시나', title: '안전벨트 인형', category: '유아·차량', meta: '안전벨트 쿠션 인형', src: 'images/web/car-beltdoll.webp', clean: 'images/web/bg-car-beltdoll.jpg' },
  { client: '차량용품', title: '자동차 수납함', category: '유아·차량', meta: '시트 걸이형 · 태블릿 수납', src: 'images/web/car-organizer.webp' },
  { client: '메리본', title: '카시트 커버', category: '유아·차량', meta: '카시트 보관 커버', src: 'images/web/car-seatcover.webp' },
  { client: '메리본', title: '카시트 보호 매트', category: '유아·차량', meta: '시트 보호 매트 3색', src: 'images/web/car-seatmat.webp' },
  { client: '에이원', title: '안전벨트 인형', category: '유아·차량', meta: '여우 안전벨트 인형', src: 'images/web/car-a1beltdoll.webp', clean: 'images/web/bg-car-a1beltdoll.jpg' },
  // 기업 주문 제품 (강원대, 게임 굿즈, 범아)
  { client: '강원대학교', title: '곰두리 키링 인형', category: '캐릭터·봉제', meta: '마스코트 인형 · 옷 교체형', src: 'images/web/biz-knu.webp' },
  { client: '범아', title: '블랭킷 슬리브', category: '리빙·웰니스', meta: '담요 보관 슬리브', src: 'images/web/biz-blanketsleeve.webp' },
  { client: '게임 굿즈', title: '패브릭 포스터', category: '캐릭터·봉제', meta: '캐릭터 패브릭 포스터', src: 'images/web/biz-poster.webp' },
  { client: '범아', title: '문 걸이 수납 포켓', category: '리빙·웰니스', meta: '현관문 걸이형 수납', src: 'images/web/biz-door.webp' },
  { client: '범아', title: '기내 카트 커튼', category: '리빙·웰니스', meta: '카트 덮개 커튼', src: 'images/web/biz-cartcurtain.webp' },
  { client: '범아', title: '랩스타일 앞치마', category: '리빙·웰니스', meta: '앞치마 2색', src: 'images/web/biz-apron.webp' },
  { client: '범아', title: '보틀 슬리브', category: '리빙·웰니스', meta: '와인병 슬리브 2색', src: 'images/web/biz-bottlesleeve.webp' },
  { client: '범아', title: '캐비닛 수납 포켓', category: '리빙·웰니스', meta: '걸이형 수납 포켓', src: 'images/web/biz-cabinet.webp' },
  { client: '범아', title: '컵 슬리브', category: '리빙·웰니스', meta: '자석 여밈 컵 슬리브', src: 'images/web/biz-cupsleeve.webp' },
  { client: '범아', title: '코스터', category: '리빙·웰니스', meta: '패브릭 코스터 2색', src: 'images/web/biz-coaster.webp' },
  { client: '범아', title: '쿠션 커버', category: '리빙·웰니스', meta: '쿠션 커버 2색', src: 'images/web/biz-cushion.webp' },
  { client: '범아', title: '테이블 커튼', category: '리빙·웰니스', meta: '행사용 테이블 커버', src: 'images/web/biz-tablecurtain.webp' },
  { client: '범아', title: '간편 파우치', category: '가방·파우치', meta: '패브릭 파우치 2색', src: 'images/web/biz-pouch.webp' },
  { client: '범아', title: '파티션 수납 포켓', category: '리빙·웰니스', meta: '사무실 파티션 걸이형', src: 'images/web/biz-partition.webp' },
  { client: '범아', title: '확장형 파우치', category: '가방·파우치', meta: '2단 확장 파우치', src: 'images/web/biz-bigpouch.webp' },
  // 베이비박스 시절 제품 (블로그 상세페이지에서 잘라낸 사진)
  { client: '푸딩', title: '나비형 목쿠션', category: '리빙·웰니스', meta: '아기 목쿠션 · 무늬 6종', src: 'images/web/blog-neckpillow.webp', clean: 'images/web/bg-blog-neckpillow.jpg' },
  { client: '캐릭터·봉제', title: '모자 쓴 오뚜기 인형', category: '캐릭터·봉제', meta: '봉제 오뚜기 인형 2종', src: 'images/web/blog-roly.webp', clean: 'images/web/bg-blog-roly.jpg' },
  { client: '푸딩', title: '오뚜기 인형', category: '캐릭터·봉제', meta: '방울 소리 나는 극세사 오뚜기 3종', src: 'images/web/blog-pudding-roly.webp', clean: 'images/web/bg-blog-pudding-roly.jpg' },
  { client: '캐릭터·봉제', title: '줄무늬 곰인형 세트', category: '캐릭터·봉제', meta: '큰 곰·작은 곰 커플 인형', src: 'images/web/blog-bigbear.webp', clean: 'images/web/bg-blog-bigbear.jpg' },
  { client: '유아·차량', title: '캐릭터 안전벨트 인형', category: '유아·차량', meta: '곰·코알라·토끼 안전벨트 인형', src: 'images/web/blog-beltdoll.webp', clean: 'images/web/bg-blog-beltdoll.jpg' },
  { client: '푸딩', title: '미니 안전벨트 인형', category: '유아·차량', meta: '수납공간 있는 안전벨트 인형 3종', src: 'images/web/blog-minibelt.webp', clean: 'images/web/bg-blog-minibelt.jpg' },
  { client: '푸딩', title: '아기 쿨토시', category: '유아·차량', meta: '자외선 차단 · 시험성적서 보유', src: 'images/web/blog-armsleeve.webp', clean: 'images/web/bg-blog-armsleeve.jpg' },
  { client: '쿠잉', title: '카시트 커버', category: '유아·차량', meta: '카시트 보관용 커버', src: 'images/web/blog-seatcover.webp' },
  { client: '쿠잉', title: '유모차 커버', category: '유아·차량', meta: '유모차 보관용 커버 2색', src: 'images/web/blog-strollercover.webp' },
  // 업체제안서 PPT에서 꺼낸 사진
  { client: '범아', title: '트래블 파우치 세트', category: '가방·파우치', meta: '자석 여밈 파우치 S·M·L', src: 'images/web/biz-travelpouch.webp' },
  { client: '범아', title: '슬림 파우치', category: '가방·파우치', meta: '패브릭 파우치 2색', src: 'images/web/biz-slimpouch.webp', clean: 'images/web/bg-biz-slimpouch.jpg' },
  { client: '범아', title: '티슈 케이스', category: '리빙·웰니스', meta: '패브릭 티슈 커버 2색', src: 'images/web/biz-tissue.webp' },
  { client: '범아', title: '수면 안대', category: '리빙·웰니스', meta: '패브릭 안대', src: 'images/web/biz-eyemask.webp', clean: 'images/web/bg-biz-eyemask.jpg' },
  { client: '범아', title: '어깨끈 앞치마', category: '리빙·웰니스', meta: '앞치마 2색', src: 'images/web/biz-bibapron.webp' },
  { client: '엠티코리아', title: '보숑이 마스코트 인형', category: '캐릭터·봉제', meta: '반다나 보숑이', src: 'images/web/mt-bandana.webp', clean: 'images/web/bg-mt-bandana.jpg' },
  { client: '엠티코리아', title: '한복 입은 보숑이', category: '캐릭터·봉제', meta: '옷 입힌 마스코트 인형', src: 'images/web/mt-hanbok.webp', scene: 'images/web/scene-mt-hanbok.jpg' },
  { client: '엠티코리아', title: '조끼 입은 보숑이', category: '캐릭터·봉제', meta: '앉은 자세 마스코트 인형', src: 'images/web/mt-vest.webp', clean: 'images/web/bg-mt-vest.jpg' },
  { client: '엠티코리아', title: '엎드린 보숑이', category: '캐릭터·봉제', meta: '엎드린 자세 마스코트 인형', src: 'images/web/mt-lying.webp' },
  { client: '폼포라 펫', title: '사각 배변봉투 홀더', category: '반려동물', meta: '산책용 배변봉투 홀더', src: 'images/web/pet-holder-square.webp' },
  { client: '폼포라 펫', title: '강아지 귀 배변봉투 홀더', category: '반려동물', meta: '귀 모양 배변봉투 홀더', src: 'images/web/pet-holder-ears.webp', scene: 'images/web/scene-pompora-ears.jpg' },
  { client: '폼포라 펫', title: '원통형 배변봉투 홀더', category: '반려동물', meta: '구급상자 디자인 홀더', src: 'images/web/pet-holder-firstaid.webp' },
  { client: '폼포라 펫', title: '뼈다귀 배변봉투 홀더', category: '반려동물', meta: '뼈다귀 모양 홀더', src: 'images/web/pet-holder-bone.webp' },
];

// ===== 숫자로 보는 회사 (첫 화면, 화면에 보이면 0부터 올라가요) =====
// 제작 사례·고객사 수는 위 목록 개수로 자동 계산돼요
const STATS = [
  { num: 1987, unit: '년부터', label: '이어온 봉제 제조' },
  { num: 3, unit: '곳', label: '직접 운영하는 공장' },
  { num: WORKS.length, unit: '+', label: '제작 사례' },
  { num: LOGOS.length, unit: '곳+', label: '함께한 고객사' },
];

// ===== 제품별 제작 안내 페이지 (검색용, 맨 아래 회사 정보에 링크가 나와요) =====
// 페이지 내용은 각 html 파일(plush-doll.html 등)에서 바로 고치세요
const GUIDES = [
  { label: '봉제인형 제작', href: 'plush-doll.html' },
  { label: '캐릭터 인형 제작', href: 'character-doll.html' },
  { label: '인형 키링 제작', href: 'doll-keyring.html' },
  { label: '대학교 굿즈 인형 제작', href: 'university-goods.html' },
  { label: '기업 마스코트 인형 제작', href: 'mascot-doll.html' },
];
