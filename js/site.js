// =====================================================================
// 모든 페이지가 함께 쓰는 기능 — 메뉴, 맨 아래 회사 정보, 다크모드,
// 그리고 페이지에 자리(id)가 있으면 그 자리에 내용을 채워 넣어요.
// 내용(글자·사진)은 js/data.js 에서 고치세요.
// =====================================================================

const $ = id => document.getElementById(id);
const currentPage = document.body.dataset.page || 'home';
const categoryById = id => CATEGORIES.find(c => c.id === id);
const categoryByName = name => CATEGORIES.find(c => c.name === name);

// 사진이 있으면 사진을, 없으면 빈 칸에 이름을 보여줍니다.
const photo = (src, label) => (src ? `<img src="${src}" alt="${label}" loading="lazy">` : label);

// 소리 없이 반복되는 짧은 영상 (화면에 보일 때만 재생돼요, 맨 아래 '영상 자동 재생' 참고)
const clip = (src, poster, label) => `<video class="auto-video" data-src="${src}" poster="${poster}" muted loop playsinline preload="none" aria-label="${label}"></video>`;

// 선으로 그린 아이콘 (data.js 의 icon 이름과 짝)
const ICONS = {
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.6 7.6L20 18M8.6 16.4L20 6"/>',
  fabric: '<path d="M4 7a3 3 0 0 1 6 0v12H7a3 3 0 0 1-3-3V7z"/><path d="M10 7h7a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7"/><circle cx="7" cy="7" r="1"/>',
  box: '<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
  needle: '<path d="M20 4L7 17"/><path d="M17 4h3v3"/><path d="M7 17c-2 1-3 2-3 3s2 0 3-1"/><path d="M14 10c3 1 5 4 3 7"/>',
  factory: '<path d="M3 21V10l6 4v-4l6 4V5h6v16H3z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  check: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9.5h8M8 12.5h5"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;


// ===== 위쪽 메뉴 =====
// 지금 페이지가 이 메뉴에 속하는지 (pages: 함께 묶인 페이지들)
const navOn = m => m.page === currentPage || (m.pages || []).includes(currentPage);
$('siteHeader').innerHTML = `
  <div class="container header-inner">
    <a href="index.html" class="logo" aria-label="${SITE.name} 홈">
      <img class="logo-light" src="images/logo/merchmate.svg" alt="${SITE.name} MERCHMATE" width="190" height="50">
      <img class="logo-dark" src="images/logo/merchmate-white.svg" alt="" width="190" height="50">
    </a>
    <nav class="nav" id="nav" aria-label="주 메뉴">
      <ul class="nav-list">
        ${NAV.map(m => `
          <li class="nav-item${navOn(m) ? ' active' : ''}${m.sub.length ? ' has-sub' : ''}${m.cta ? ' nav-cta' : ''}">
            <a href="${m.href}"${navOn(m) ? ' aria-current="page"' : ''}><span class="nav-en">${m.label}</span>${m.ko ? `<small class="nav-ko">${m.ko}</small>` : ''}</a>
            ${m.sub.length ? `<ul class="sub-menu">${m.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('')}</ul>` : ''}
          </li>`).join('')}
      </ul>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="다크모드 전환">🌙</button>
      <a href="contact.html" class="btn btn-primary">상담 신청</a>
      <button class="menu-toggle" id="menuToggle" type="button" aria-label="메뉴 열기" aria-expanded="false">☰</button>
    </div>
  </div>`;

// ===== (2026-11-06) 페이지 맨 위 띠에 사진 넣기 (위오처럼 사진 + 가운데 흰 글자) =====
// 페이지(파일 이름)마다 쓸 사진을 고를 수 있어요. 목록에 없는 페이지는 DEFAULT 사진을 써요.
(function () {
  const hero = document.querySelector('.page-hero');
  if (!hero) return;
  const HERO_PHOTOS = {
    'about.html': 'v2-w1.jpg',          // 원단을 자르는 손
    'portfolio.html': 'hero-portfolio.jpg', // (11/07) 벚꽃 앞 덕새 인형 (가로로 긴 사진)
    'products.html': 'v2-banner-b2.jpg', // 실패·가위·줄자 정물
    'business.html': 'v2-w2.jpg',       // 바늘로 꾸매는 손
    'oem.html': 'v2-w2.jpg',
    'license.html': 'v2-w4.jpg',        // 색 견본을 맞추는 손
    'quality.html': 'v2-banner-b3.jpg', // 코랄 실패와 바늘
    'faq.html': 'v2-w6.jpg',            // 메모하는 손
    'contact.html': 'v2-w6.jpg',
    'plush-doll.html': 'v2-w2.jpg',
    'character-doll.html': 'v2-w4.jpg',
    'doll-keyring.html': 'v2-w3.jpg',   // 키링 고리를 다는 손
    'university-goods.html': 'v2-banner-c.jpg',
    'mascot-doll.html': 'v2-w5.jpg',
    DEFAULT: 'v2-w1.jpg',
  };
  const file = location.pathname.split('/').pop() || 'index.html';
  const img = HERO_PHOTOS[file] || HERO_PHOTOS.DEFAULT;
  hero.classList.add('v2-photo');
  // 주소 맨 앞에 / 를 붙여야 css 폴더 기준이 아니라 사이트 기준으로 사진을 찾아요
  hero.style.setProperty('--hero-img', `url('${new URL('images/web/' + img, document.baseURI).href}')`);
  // 세로로 긴 사진(손 작업 사진)은 위쪽이 잘 보이게 맞춰요
  if (/v2-w[2-5]\.jpg$/.test(img)) hero.style.setProperty('--hero-pos', 'center 30%');
  // 제작 사례 띠 사진은 인형이 아래쪽에 있어서 아래를 보여 줘요
  if (img === 'hero-portfolio.jpg') hero.style.setProperty('--hero-pos', 'center 82%');
})();

// 휴대폰 메뉴 열고 닫기
const nav = $('nav');
const menuToggle = $('menuToggle');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', false);
}));

// ===== 페이지 위쪽 세부 메뉴 탭 (제작 품목, 제작 방법, 회사 소개 페이지) =====
if ($('subTabs')) {
  // 제작 품목 페이지는 분류(캐릭터·봉제 등) 탭을 보여 줘요
  const menu = currentPage === 'products'
    ? { sub: CATEGORIES.map(c => ({ label: c.name, href: `products.html#${c.id}` })) }
    : NAV.find(navOn);
  $('subTabs').innerHTML = menu.sub
    .map(s => `<a href="${s.href}">${s.icon ? icon(s.icon) : ''}<span>${s.label}</span></a>`)
    .join('');

  // 지금 보고 있는 부분의 탭을 주황색으로 표시해요
  const tabs = [...$('subTabs').querySelectorAll('a')];
  const setActive = id => tabs.forEach(t => t.classList.toggle('active', t.hash === '#' + id));
  // 탭이 각각의 페이지라면, 지금 페이지의 탭을 표시해요
  const file = location.pathname.split('/').pop() || 'index.html';
  const pageTab = tabs.find(t => !t.hash && t.pathname.split('/').pop() === file);
  if (pageTab) {
    pageTab.classList.add('active');
    // 휴대폰에서 탭 바가 옆으로 넘칠 때, 지금 탭이 보이도록 밀어 둬요
    $('subTabs').scrollLeft = pageTab.offsetLeft - 16;
  }
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach(e => setActive(e.target.id));
    }, { rootMargin: '-40% 0px -55% 0px' });
    tabs.forEach(t => {
      const target = t.hash && document.getElementById(t.hash.slice(1));
      if (target) spy.observe(target);
    });
  }
  if (!pageTab) setActive(location.hash.slice(1) || (tabs[0] && tabs[0].hash.slice(1)));
}

// ===== 맨 아래 회사 정보 =====
// (2026-11-06) 새 메인과 같은 모양의 하단. 예전 하단으로 되돌리려면 이 블록을 지우고 아래 V1 블록의 if (false) 를 지우세요.
$('siteFooter').className = 'footer v2-ft';
$('siteFooter').innerHTML = `
  <div class="v2-wrap">
    <div>
      <div class="v2-call">상담전화<b>${SITE.phone}</b></div>
      <div class="v2-info">상호명 : ${SITE.name}<i>|</i>대표 : ${SITE.ceo}<i>|</i>사업자등록번호 : ${SITE.bizNo}<br>이메일 : ${SITE.email}<br>${SITE.locations.map(l => `${l.label} : ${l.address}`).join('<br>')}</div>
      ${typeof GUIDES !== 'undefined' ? `<p class="v2-kw">${GUIDES.map(g => `<a href="${g.href}">${g.label}</a>`).join('')}</p>` : ''}
    </div>
    <div class="v2-map"><iframe loading="lazy" title="${SITE.name} ${SITE.locations[0].label} 위치 지도" src="https://maps.google.com/maps?q=${encodeURIComponent(SITE.locations[0].address.replace(/\s*\(\d+\)\s*$/, '').replace(/,\s*[A-Za-z0-9가-힣]+동\s*$/, ''))}&z=15&output=embed"></iframe></div>
    <div class="v2-bot"><span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span><nav class="v2-fl">${NAV.filter(m => !m.cta).map(m => `<a href="${m.href}">${m.ko || m.label}</a>`).join('')}</nav></div>
  </div>`;
if (false) $('siteFooter').innerHTML = `
  <div class="container footer-inner">
    <div>
      <a href="index.html" class="logo"><img src="images/logo/merchmate-white.svg" alt="${SITE.name} MERCHMATE" width="171" height="45"></a>
      <p>상호명 : ${SITE.name} | 대표 : ${SITE.ceo} | 사업자등록번호 : ${SITE.bizNo}</p>
      <p>${[SITE.phone && `전화 : ${SITE.phone}`, SITE.email && `이메일 : ${SITE.email}`].filter(Boolean).join(' | ')}</p>
      ${SITE.locations.map(l => `<p>${l.label} : ${l.address}</p>`).join('')}
      ${typeof GUIDES !== 'undefined' ? `<p class="footer-guides">${GUIDES.map(g => `<a href="${g.href}">${g.label}</a>`).join('')}</p>` : ''}
      <p class="copyright">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
    </div>
    ${SITE.locations && SITE.locations[0] ? `<div class="footer-map">
      <iframe src="https://www.google.com/maps?q=${encodeURIComponent(SITE.locations[0].address.replace(/\s*\(\d+\)\s*$/, '').replace(/,\s*[A-Za-z0-9가-힣]+동\s*$/, ''))}&hl=ko&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${SITE.name} ${SITE.locations[0].label} 위치 지도"></iframe>
      <div class="footer-map-links">
        <a href="https://map.naver.com/p/search/${encodeURIComponent(SITE.locations[0].address.replace(/\s*\(\d+\)\s*$/, '').replace(/,\s*[A-Za-z0-9가-힣]+동\s*$/, ''))}" target="_blank" rel="noopener">네이버지도에서 보기</a>
        <a href="https://map.kakao.com/?q=${encodeURIComponent(SITE.locations[0].address.replace(/\s*\(\d+\)\s*$/, '').replace(/,\s*[A-Za-z0-9가-힣]+동\s*$/, ''))}" target="_blank" rel="noopener">카카오맵에서 보기</a>
      </div>
    </div>` : ''}
  </div>`;

// ===== 다크모드 (브라우저가 저장을 막아도 홈페이지는 정상으로 보이게) =====
const themeToggle = $('themeToggle');
const readTheme = () => { try { return localStorage.getItem('theme'); } catch { return null; } };
const saveTheme = value => { try { localStorage.setItem('theme', value); } catch {} };
// (2026-11-06) 새 디자인에는 다크모드가 없어서 항상 밝은 화면으로 보여요.
document.documentElement.dataset.theme = 'light';
if (false && readTheme() === 'dark') {
  document.documentElement.dataset.theme = 'dark';
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  saveTheme(isDark ? 'light' : 'dark');
});

// ===== 첫 화면: 꽉 찬 사진 슬라이드 =====
// 5초마다 다음 사진으로 넘어가요. 점을 누르거나 휴대폰에서 옆으로 밀어도 넘어가요.
// 움직임 줄이기를 켠 사용자에게는 자동으로 넘기지 않아요.
if ($('heroSlides')) {
  const INTERVAL = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const titleHtml = t => t.replace('\n', '<br>').replace(/\[(.+?)\]/g, '<em>$1</em>');
  const studio = HERO_STYLE === 'studio';
  const cutout = HERO_STYLE === 'cutout' || studio; // studio 는 cutout 의 밝은 글자 배치를 같이 써요
  $('heroSlides').parentElement.classList.toggle('hero-cutout', cutout);
  $('heroSlides').parentElement.classList.toggle('hero-studio', studio);
  $('heroSlides').innerHTML = HERO_SLIDES
    .map((s, i) => {
      const tag = i === 0 && !document.querySelector('main > h1') ? 'h1' : 'h2'; // 페이지 대표 제목은 하나만 (index.html 에 숨은 h1 이 있으면 슬라이드는 h2)
      const lazy = i === 0 ? '' : ' loading="lazy"';
      const img = studio
        ? `<div class="hero-product"><img src="${s.studio}" alt="${s.studioAlt}"${lazy}></div>`
        : cutout
        ? `<div class="hero-product${s.wide ? ' wide' : ''}"><img src="${s.cutout}" alt="${s.cutoutAlt}"${lazy}></div>`
        : `<img src="${s.src}" alt="${s.alt}"${lazy}>`;
      return `
        <div class="hero-slide${i === 0 ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${HERO_SLIDES.length}"${i === 0 ? '' : ' inert'}${cutout ? ` style="--slide-bg: ${s.bg}"` : ''}>
          ${img}
          <div class="container hero-content">
            <p class="eyebrow">${s.eyebrow}</p>
            <${tag} class="hero-title">${titleHtml(s.title)}</${tag}>
            <p class="hero-sub">${s.sub}</p>
            <div class="hero-actions">
              <a href="contact.html" class="btn btn-primary btn-lg">무료 상담 신청</a>
              <a href="portfolio.html" class="btn btn-outline-light btn-lg">제작 사례 보기</a>
            </div>
          </div>
        </div>`;
    })
    .join('');
  $('heroDots').innerHTML = HERO_SLIDES
    .map((s, i) => `<button type="button" aria-label="${i + 1}번째 사진 보기"${i === 0 ? ' aria-current="true"' : ''}></button>`)
    .join('');

  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...$('heroDots').children];
  const pauseBtn = $('heroPause');
  let current = 0;
  let timer = null;
  let playing = !reduceMotion;

  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      s.inert = i !== current;
    });
    dots.forEach((d, i) => d.toggleAttribute('aria-current', i === current));
  };
  const restart = () => {
    clearInterval(timer);
    if (playing) timer = setInterval(() => show(current + 1), INTERVAL);
  };
  const setPlaying = on => {
    playing = on;
    pauseBtn.textContent = on ? '❚❚' : '▶';
    pauseBtn.setAttribute('aria-label', on ? '슬라이드 멈춤' : '슬라이드 재생');
    restart();
  };

  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); restart(); }));
  pauseBtn.addEventListener('click', () => setPlaying(!playing));

  // 휴대폰에서 옆으로 밀어서 넘기기
  let touchX = null;
  const hero = $('heroSlides').parentElement;
  hero.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); restart(); }
    touchX = null;
  });

  setPlaying(playing);
}

// ===== 첫 화면: 함께한 고객사 한 줄 =====
if ($('heroClients')) {
  const names = LOGOS.slice(0, 4).map(l => l.name).join(' · ');
  $('heroClients').innerHTML = `<strong>${names}</strong> 등 ${LOGOS.length}곳과 함께 만들었습니다`;
}

// ===== 숫자로 보는 회사 =====
// 숫자는 처음부터 최종값으로 보이고, 화면에 들어오는 순간 한 번만 0부터 올라가요
if ($('stats')) {
  $('stats').innerHTML = STATS
    .map(s => `<li><strong><span class="stat-num" data-num="${s.num}">${s.num}</span><em class="stat-unit">${s.unit}</em></strong><span>${s.label}</span></li>`)
    .join('');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countUp = el => {
      const target = Number(el.dataset.num);
      const start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      document.querySelectorAll('.stat-num').forEach(countUp);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe($('stats'));
  }
}

// ===== 두 갈래 안내 (OEM / ODM) =====
if ($('paths')) {
  $('paths').innerHTML = PATHS
    .map(p => `
      <article class="path-card">
        <p class="path-q">${p.question}</p>
        <span class="path-tag">${p.tag}</span>
        <h3>${p.title.replace('\n', '<br>')}</h3>
        <p class="path-desc">${p.desc}</p>
        <ol class="path-flow">${p.flow.map((f, i) => `<li><b>${i + 1}</b>${f}</li>`).join('')}</ol>
      </article>`)
    .join('');
}

// ===== 자주 묻는 질문 =====
if ($('faqList')) {
  $('faqList').innerHTML = FAQS
    .map(f => `<details><summary><span>Q.</span>${f.q}</summary><p>${f.a}</p></details>`)
    .join('');
}

// ===== 고객사: 로고 카드 4줄이 옆으로 흘러가요 (마우스를 올려도 계속 흘러요) =====
if ($('partnerFlow')) {
  const card = l => `
    <li class="partner-card${l.src ? ' has-logo' : ''}">${l.src
      ? `<img src="${l.src}" alt="${l.name}" loading="lazy">`
      : `<strong>${l.name}</strong><span>${l.type}</span>`}</li>`;
  const perRow = Math.ceil(LOGOS.length / 4);
  // 넓은 화면에서도 빈틈이 없도록 한 줄에 카드가 12장 이상 되게 반복해요
  const fill = r => { let out = r; while (out.length < 12) out = out.concat(r); return out; };
  const rows = [0, 1, 2, 3].map(i => LOGOS.slice(i * perRow, (i + 1) * perRow)).filter(r => r.length).map(fill);
  // 같은 줄을 두 번 이어 붙여서 끊김 없이 돌아가게 해요 (두 번째 묶음은 화면 읽기 프로그램에서 숨김)
  $('partnerFlow').innerHTML = rows
    .map((r, i) => `
      <div class="partner-row${i % 2 ? ' reverse' : ''}">
        <ul class="partner-track"><li class="partner-set"><ul>${r.map(card).join('')}</ul></li><li class="partner-set" aria-hidden="true"><ul>${r.map(card).join('')}</ul></li></ul>
      </div>`)
    .join('');
}

// ===== 강점 =====
if ($('whyList')) {
  $('whyList').innerHTML = STRENGTHS
    .map((s, i) => `
      <article class="why-item">
        <div class="why-photo ph">${photo(s.src, s.alt || '사진')}</div>
        <div class="why-text">
          <span class="why-no">${String(i + 1).padStart(2, '0')}</span>
          <h3>${s.title.replace('\n', '<br>')}</h3>
          <p>${s.desc}</p>
        </div>
      </article>`)
    .join('');
}

// ===== 제작 방법: 과정 사진 3장 + 기획·개발 / 생산·관리 아이콘 카드 =====
if ($('devPhotos')) {
  $('devPhotos').innerHTML = DEV_PHOTOS
    .map(p => `<figure><div class="ph">${p.video ? clip(p.video, p.src, p.alt) : photo(p.src, p.alt)}</div><figcaption>${p.title}</figcaption></figure>`)
    .join('');
}
if ($('capabilities')) {
  $('capabilities').innerHTML = CAPABILITIES
    .map(g => `
      <div class="cap-group">
        <p class="section-en">${g.en}</p>
        <h3 class="section-title">${g.group}</h3>
        <p class="section-desc">${g.desc}</p>
        <ul class="cap-list">
          ${g.items.map(c => `<li><span class="cap-icon">${icon(c.icon)}</span><h4>${c.title}</h4><p>${c.desc}</p></li>`).join('')}
        </ul>
      </div>`)
    .join('');
}

// ===== 제작 방법: 다루는 소재 =====
if ($('materials')) {
  $('materials').innerHTML = MATERIALS
    .map(m => `
      <figure class="material-card ph">
        ${photo(m.src, `${m.name}으로 만든 제품`)}
        <figcaption><span>${m.en}</span><h3>${m.name}</h3><p>${m.desc}</p></figcaption>
      </figure>`)
    .join('');
}

// ===== OEM·ODM 페이지: 만들 수 있는 품목 (분류별 대표 사진 카드) =====
if ($('makeList')) {
  $('makeList').innerHTML = CATEGORIES
    .map(c => `
      <a class="make-card" href="portfolio.html#${c.id}">
        <div class="ph">${photo(c.cover, c.name)}</div>
        <span>${c.en}</span>
        <h3>${c.name}</h3>
        <p>${c.items.join(' · ')}</p>
      </a>`)
    .join('');
}

// ===== 제작 방법: 품질·납기 관리 =====
if ($('qualityList')) {
  $('qualityList').innerHTML = QUALITY
    .map((q, i) => `<li><span class="step-no">${String(i + 1).padStart(2, '0')}</span><div><h3>${q.title}</h3><p>${q.desc}</p></div></li>`)
    .join('');
}

// ===== 제작 과정 =====
if ($('steps')) {
  $('steps').innerHTML = STEPS
    .map((s, i) => `<li><span class="step-no">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3><p>${s.desc}</p></li>`)
    .join('');
}

// ===== 제작 사례 카드 =====
const workCard = w => `
  <article class="work-card">
    <div class="work-photo ph">${photo(w.src, w.title)}</div>
    <div class="work-info">
      <span class="work-client">${w.client}</span>
      <h3>${w.title}</h3>
      <p class="work-meta">${w.meta}</p>
    </div>
  </article>`;

// ===== 분류별 제작 사례 모음 (<div data-works="분류 이름" data-limit="6">) =====
document.querySelectorAll('[data-works]').forEach(el => {
  const limit = Number(el.dataset.limit) || 6;
  el.innerHTML = WORKS.filter(w => w.category === el.dataset.works).slice(0, limit).map(workCard).join('');
});

// '전체'일 때는 분류를 하나씩 번갈아 섞어서 여러 종류가 먼저 보이게 해요
function worksFor(categoryName) {
  if (categoryName !== '전체') return WORKS.filter(w => w.category === categoryName);
  const groups = CATEGORIES.map(c => WORKS.filter(w => w.category === c.name));
  const mixed = [];
  for (let i = 0; mixed.length < WORKS.length; i++) {
    groups.forEach(g => { if (g[i]) mixed.push(g[i]); });
  }
  return mixed;
}

// ===== 메인: 대표 제작 사례 (고객사 이름이 있는 사례 6개, 분류를 섞어서) =====
if ($('workPreview')) {
  // 고객사 하나당 사례 하나만 골라요
  const clientNames = new Set(LOGOS.map(l => l.name));
  $('workPreview').innerHTML = worksFor('전체')
    .filter(w => clientNames.delete(w.client))
    .slice(0, 6).map(workCard).join('');
}

// ===== PRODUCTS: 분류별 소개 =====
if ($('productSections')) {
  $('productSections').innerHTML = CATEGORIES
    .map((c, i) => {
      const list = WORKS.filter(w => w.category === c.name);
      return `
        <section class="product-section${i % 2 ? ' section-alt' : ''}" id="${c.id}">
          <div class="container product-layout">
            <div class="product-text">
              <span class="product-no">${String(i + 1).padStart(2, '0')}</span>
              <p class="product-en">${c.en}</p>
              <h2>${c.name}</h2>
              <p class="product-desc">${c.desc}</p>
              <h3 class="product-items-label">주요 제품</h3>
              <ul class="product-items">${c.items.map(t => `<li>${t}</li>`).join('')}</ul>
              <a class="btn btn-ghost" href="portfolio.html#${c.id}">제작 사례 ${list.length}개 보기 →</a>
            </div>
            <div class="product-photos">
              ${list.slice(0, 4).map(w => `<figure class="ph">${photo(w.src, w.title)}<figcaption>${w.title}</figcaption></figure>`).join('')}
            </div>
          </div>
        </section>`;
    })
    .join('');
}

// ===== PORTFOLIO (2026-11-07): 위오처럼 사진만 4줄로 쌓고, 한 페이지에 40개씩 =====
// - 연출 사진(scene)이 있는 사례가 맨 앞에 와요.
// - 마우스를 올리면 고객사와 제품 이름이 보이고, 누르면 크게 보기 화면이 열려요.
// - 배경 색을 맞춘 사진(clean)이 있으면 그 사진을 써요.
if ($('workGrid') && !window.MERCH_CATALOG) {
  const box = $('workGrid').closest('.container');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PAGE = 40;
  let cat = '전체', page = 1, current = [];

  box.className = 'pf2-wrap';
  box.innerHTML = '<div class="pf2-filters" id="pf2Filters"></div><div class="pf2-grid" id="pf2Grid"></div>' +
    '<nav class="pf2-pager" id="pf2Pager" aria-label="페이지 번호"></nav>';
  const $f = $('pf2Filters'), $g = $('pf2Grid'), $p = $('pf2Pager');

  const ordered = name => { const b = worksFor(name); return [...b.filter(w => w.scene), ...b.filter(w => !w.scene)]; };
  const cols = () => innerWidth < 700 ? 2 : innerWidth < 1100 ? 3 : 4;
  const tile = (w, i) => {
    const img = w.scene || w.clean || w.src;
    const cls = w.scene ? ' scene' : w.clean ? ' clean' : '';
    return '<a href="#" class="pf2-item' + cls + '" data-i="' + i + '"><img src="' + img + '" alt="' + esc(w.client + ' ' + w.title) + '" loading="lazy">' +
      '<span class="pf2-cap"><small>' + esc(w.client) + '</small><strong>' + esc(w.title) + '</strong></span></a>';
  };

  function render() {
    $f.innerHTML = [{ name: '전체' }, ...CATEGORIES].map(c =>
      '<button type="button" data-name="' + c.name + '" class="' + (c.name === cat ? 'active' : '') + '" aria-pressed="' + (c.name === cat) + '">' + c.name + '</button>').join('');
    current = ordered(cat);
    const pages = Math.max(1, Math.ceil(current.length / PAGE));
    page = Math.min(page, pages);
    const start = (page - 1) * PAGE, slice = current.slice(start, start + PAGE), n = cols();
    $g.innerHTML = Array.from({ length: n }, (_, c) => '<div class="pf2-col">' + slice.map((w, i) => i % n === c ? tile(w, start + i) : '').join('') + '</div>').join('');
    $p.hidden = pages < 2;
    $p.innerHTML = '<button type="button" data-p="' + (page - 1) + '" aria-label="이전 페이지"' + (page === 1 ? ' disabled' : '') + '>‹</button>' +
      Array.from({ length: pages }, (_, i) => '<button type="button" data-p="' + (i + 1) + '" class="' + (i + 1 === page ? 'on' : '') + '">' + (i + 1) + '</button>').join('') +
      '<button type="button" data-p="' + (page + 1) + '" aria-label="다음 페이지"' + (page === pages ? ' disabled' : '') + '>›</button>';
    $g.querySelectorAll('[data-i]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openLB(+a.dataset.i); }));
  }

  $f.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cat = b.dataset.name; page = 1; render(); });
  $p.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.disabled) return; page = +b.dataset.p; render(); $f.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  let lastCols = cols();
  addEventListener('resize', () => { if (cols() !== lastCols) { lastCols = cols(); render(); } });

  // ----- 크게 보기 (위오 상세 화면처럼: 제목, 큰 사진, 좌우 화살표) -----
  const lb = document.createElement('div');
  lb.className = 'pf2-lb'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
  const chev = d => '<svg viewBox="0 0 44 110"><path d="' + d + '"/></svg>';
  lb.innerHTML = '<button type="button" class="x" aria-label="닫기">×</button>' +
    '<button type="button" class="nav prev" aria-label="이전 사례">' + chev('M42 2 L2 55 L42 108') + '</button>' +
    '<button type="button" class="nav next" aria-label="다음 사례">' + chev('M2 2 L42 55 L2 108') + '</button><div class="pf2-lb-in"></div>';
  document.body.appendChild(lb);
  let idx = 0;
  function showLB() {
    const w = current[idx];
    const main = w.clean ? '<figure class="clean"><img src="' + w.clean + '" alt="' + esc(w.title) + '"></figure>' : '<figure><img src="' + w.src + '" alt="' + esc(w.title) + '"></figure>';
    lb.querySelector('.pf2-lb-in').innerHTML = '<h2>' + esc(w.title) + '</h2><p class="meta"><b>' + esc(w.client) + '</b>' + esc(w.meta || '') + '</p>' +
      (w.scene ? '<figure class="scene"><img src="' + w.scene + '" alt="' + esc(w.title) + '"></figure>' : '') + main +
      '<div class="cta"><a class="btn btn-primary btn-lg" href="contact.html">이런 제품 상담하기</a></div>';
    lb.scrollTop = 0;
  }
  function openLB(i) { idx = i; showLB(); lb.hidden = false; document.body.classList.add('pf2-lock'); lb.querySelector('.x').focus(); }
  function closeLB() { lb.hidden = true; document.body.classList.remove('pf2-lock'); }
  const step = d => { idx = (idx + d + current.length) % current.length; showLB(); };
  lb.querySelector('.x').addEventListener('click', closeLB);
  lb.querySelector('.prev').addEventListener('click', () => step(-1));
  lb.querySelector('.next').addEventListener('click', () => step(1));
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });

  // 주소 뒤의 #pet 같은 이름으로 처음 보여줄 분류를 정해요 (메뉴에서 바로 들어올 때)
  const fromHash = () => categoryById(location.hash.slice(1))?.name || '전체';
  window.addEventListener('hashchange', () => { cat = fromHash(); page = 1; render(); });
  cat = fromHash();
  render();
}

// ===== 상담 신청 폼 =====
if ($('contactForm')) {
  const itemSelect = $('item');
  itemSelect.innerHTML = '<option value="">제작 분야</option>'
    + ['봉제·패브릭', '브랜드 굿즈', '패키지·세트'].map(name => `<option>${name}</option>`).join('')
    + '<option>아직 모르겠어요</option>';
  $('contactInfo').innerHTML = `
    ${SITE.phone ? `<li><span>전화</span>${SITE.phone}</li>` : ''}
    ${SITE.email ? `<li><span>이메일</span>${SITE.email}</li>` : ''}
    ${SITE.locations.map(l => `<li><span>${l.label}</span>${l.address}</li>`).join('')}`;
  const formStatus = $('formStatus');
  // Formspree 로 전송해요. (접수 내용은 이메일과 Formspree 대시보드 > Submissions 에서 확인)
  const showStatus = (text, ok) => {
    formStatus.textContent = text;
    formStatus.dataset.state = ok ? 'ok' : 'error';
    formStatus.hidden = false;
  };
  $('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = '보내는 중...';
    try {
      const data = new FormData(form);
      // 스팸 방지용 숨김 칸이 채워져 있으면 봇이므로 보내지 않고 성공처럼 처리해요.
      if (!data.get('bot-field')) {
        data.delete('bot-field');
        data.delete('form-name');
        data.set('_subject', `[머치메이트 상담 신청] ${data.get('company') || ''} ${data.get('name') || ''}`.trim());
        const res = await fetch('https://formspree.io/f/meaarkrd', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        if (!res.ok) throw new Error(res.status);
      }
      showStatus('상담 신청이 접수되었습니다. 내용을 확인한 뒤 연락드리겠습니다.', true);
      form.reset();
    } catch {
      showStatus(`전송에 실패했어요. 잠시 후 다시 시도하거나 ${SITE.phone || SITE.email} 로 연락해 주세요.`, false);
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}

// ===== 영상 자동 재생 =====
// 영상을 통째로 먼저 받아 둔 다음 재생해요. (조금씩 받으며 재생하면 느린 서버에서 끊겨요)
// 화면 가까이 오면 받기 시작하고, 보이면 재생, 벗어나면 멈춰요.
// 움직임 줄이기를 켠 사용자에게는 영상을 받지 않고 첫 장면만 보여줘요.
const autoVideos = document.querySelectorAll('video.auto-video');
const loadVideo = v => {
  if (!v.dmLoad) {
    v.dmLoad = fetch(v.dataset.src)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(blob => {
        // 받아 둔 영상을 못 여는 환경이면 원래 주소로 다시 재생
        v.addEventListener('error', () => { if (v.src.startsWith('blob:')) v.src = v.dataset.src; }, { once: true });
        v.src = URL.createObjectURL(blob);
      })
      .catch(() => { v.src = v.dataset.src; }); // 받기가 안 되면(내 컴퓨터에서 파일로 열 때 등) 바로 재생
  }
  return v.dmLoad;
};
if (autoVideos.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const nearObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) loadVideo(e.target);
  }), { rootMargin: '600px 0px' });
  const playObserver = new IntersectionObserver(entries => entries.forEach(e => {
    const v = e.target;
    v.dmVisible = e.isIntersecting;
    if (v.dmVisible) loadVideo(v).then(() => { if (v.dmVisible) v.play().catch(() => {}); });
    else v.pause();
  }), { threshold: 0.25 });
  autoVideos.forEach(v => { nearObserver.observe(v); playObserver.observe(v); });
}

// ===== 사진 미리 받기 =====
// 브라우저 기본 지연 로딩은 사진이 화면에 거의 닿아야 받기 시작해서 늦게 뜨는 느낌이 나요.
// 화면 아래 약 1.5화면 거리에 들어오면 미리 받기 시작해요.
if ('IntersectionObserver' in window) {
  const preload = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.loading = 'eager';
    preload.unobserve(e.target);
  }), { rootMargin: '150% 0px' });
  const watchLazy = () => document.querySelectorAll('img[loading="lazy"]').forEach(img => preload.observe(img));
  watchLazy();
  // 제작 사례 필터처럼 나중에 그려지는 사진도 챙겨요
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; watchLazy(); });
  }).observe(document.body, { childList: true, subtree: true });
}


// ===== 카톡 문의 버튼 =====
// 모든 페이지 오른쪽 아래에 고정돼요. 누르면 카카오톡 채널 채팅이 새 탭으로 열려요. (2026-11-06부터 PC에서는 숨김)
(function () {
  if (document.getElementById('kakaoChatBtn')) return;
  const a = document.createElement('a');
  a.id = 'kakaoChatBtn';
  a.className = 'kakao-chat-btn';
  a.href = 'https://pf.kakao.com/_TFUWX/chat';
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', '카카오톡으로 문의하기 (새 창)');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.5.1 1 .1 1.6.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg><span>카톡 문의</span>';
  document.body.appendChild(a);
})();

// ===== 상담 신청 버튼 =====
// 카톡 문의 버튼 바로 아래에 고정돼요. 누르면 상담 신청 페이지로 이동해요. (상담 신청 페이지에서는 숨겨요)
(function () {
  if (document.getElementById('consultFloatBtn')) return;
  if (/contact\.html$/.test(location.pathname)) return;
  const a = document.createElement('a');
  a.id = 'consultFloatBtn';
  a.className = 'consult-float-btn';
  a.href = 'contact.html';
  a.setAttribute('aria-label', '상담 신청하기');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 4v2h10V8H7zm0 3.5v2h7v-2H7z"/></svg><span>상담 신청</span>';
  document.body.appendChild(a);
})();

// ===== 부드러운 등장 효과 =====
// 스크롤해서 화면에 들어오면 제목·카드가 아래에서 살짝 올라와요. (움직임을 줄이는 설정을 쓰는 분께는 적용하지 않아요)
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const SEL = '.section-en, .section-title, .section-desc, .work-card, .why-item, .stats li, #paths > *';
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const seen = new WeakSet();
  const scan = () => document.querySelectorAll(SEL).forEach(el => {
    if (seen.has(el)) return;
    seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // 처음 화면에 보이는 것은 그대로 둬요
    if (el.classList.contains('work-card')) el.style.transitionDelay = ([...el.parentNode.children].indexOf(el) % 3) * 120 + 'ms';
    el.classList.add('reveal');
    io.observe(el);
  });
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();