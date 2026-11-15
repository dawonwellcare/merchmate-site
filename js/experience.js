(()=>{'use strict';const qs=s=>document.querySelector(s);const chat=qs('.fl-kakao,.kakao-chat-btn');const consult=qs('.fl-consult,.consult-float-btn');const form=qs('#contactForm');const dock=document.createElement('nav');dock.className='mm-action-dock';dock.setAttribute('aria-label','빠른 제작 상담');const chatLink=document.createElement('a');chatLink.className='mm-dock-chat';chatLink.href=chat?chat.href:'https://pf.kakao.com/_TFUWX/chat';chatLink.target='_blank';chatLink.rel='noopener';chatLink.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.5.1 1 .1 1.6.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg><span>카톡 문의</span>';const consultLink=document.createElement('a');consultLink.className='mm-dock-consult';consultLink.href=consult?consult.href:'contact.html';consultLink.textContent='제작 상담';dock.append(chatLink,consultLink);document.body.appendChild(dock);document.body.classList.add('mm-has-dock');const updateDock=()=>{const r=form?form.getBoundingClientRect():null;const formVisible=!!(r&&r.top<innerHeight-60&&r.bottom>90);dock.classList.toggle('is-hidden',formVisible||/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName||''));};document.addEventListener('focusin',updateDock);document.addEventListener('focusout',()=>setTimeout(updateDock,0));addEventListener('scroll',updateDock,{passive:true});addEventListener('resize',updateDock);if(form&&'IntersectionObserver'in window)new IntersectionObserver(updateDock,{threshold:0}).observe(form);updateDock();if(!form)return;const c=window.MERCH_CATALOG||{items:[]},p=window.MERCH_PARTNERS||{};const all=[...c.items.map(w=>({w,kind:'plush'})),...(p.goods?.items||[]).map(w=>({w,kind:'goods'})),...(p.package?.items||[]).map(w=>({w,kind:'package'}))];const params=new URLSearchParams(location.search);const selectedId=params.get('case');const found=all.find(x=>x.w.id===selectedId);const label={plush:'봉제·패브릭',goods:'브랜드 굿즈',package:'패키지·세트'};const panel=qs('#inquiryCaseContext');const notice=qs('#inquiryCaseStatus');const hiddenNames=['reference_case','reference_case_id','reference_case_url'];const put=(name,value)=>{let el=form.querySelector('[name="'+name+'"]');if(!el){el=document.createElement('input');el.type='hidden';el.name=name;form.appendChild(el)}el.value=value;};const clear=()=>{for(const name of hiddenNames)put(name,'');if(panel)panel.hidden=true;if(notice)notice.hidden=true;const u=new URL(location.href);u.searchParams.delete('case');u.searchParams.delete('kind');history.replaceState(null,'',u.pathname+u.search+u.hash);};if(found){const{w,kind}=found;const ref=new URL('https://merchmate.co.kr/portfolio.html');ref.searchParams.set('case',w.id);ref.hash=kind;put('reference_case',w.client+' / '+w.title);put('reference_case_id',w.id);put('reference_case_url',ref.href);const select=qs('#item');if(select)select.value=label[kind];if(panel){panel.hidden=false;panel.querySelector('img').src=w.thumb;panel.querySelector('img').alt=w.title;panel.querySelector('strong').textContent=w.title;panel.querySelector('p').textContent=(kind==='plush'?w.client+' · ':'')+label[kind];panel.querySelector('button').addEventListener('click',()=>{clear();if(select)select.value='';});}}else if(selectedId&&notice){notice.hidden=false;notice.textContent='선택한 사례를 찾지 못했습니다. 원하시는 제품명이나 참고 링크를 상담 내용에 적어 주세요.';}else{const kind=params.get('kind');if(label[kind]&&qs('#item'))qs('#item').value=label[kind];}const channel=qs('#inquiryChatLink');if(channel)channel.href=chatLink.href;})();
;(()=>{document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.sub-menu a,.mm-home-nav-group ul a');if(!a)return;const item=a.closest('.nav-item,.mm-home-nav-group');if(!item)return;item.classList.add('mm-menu-closed');a.blur();const t=setInterval(()=>{if(!item.matches(':hover')){item.classList.remove('mm-menu-closed');clearInterval(t)}},250)})})();

/* 2026-11-16: shared text-only vertical navigation */
;(() => {
  'use strict';
  const header = document.querySelector('header.hd, header.header');
  const homeNav = header && header.querySelector('nav.gnb');
  const subNav = header && header.querySelector('nav#nav');
  if (!header || (!homeNav && !subNav) || header.dataset.mmBandReady) return;
  header.dataset.mmBandReady = 'true';
  header.classList.add('mm-band-header','mm-text-menu-header');
  const guides = [
    ['봉제인형 제작', 'plush-doll.html'],
    ['캐릭터 인형 제작', 'character-doll.html'],
    ['인형 키링 제작', 'doll-keyring.html'],
    ['대학교 굿즈 인형 제작', 'university-goods.html'],
    ['기업 마스코트 인형 제작', 'mascot-doll.html'],
    ['관공서·지자체 굿즈 제작', 'public-goods.html'],
    ['브랜드 굿즈 제작', 'goods.html']
  ];
  const menus = [
    { en: 'ABOUT', ko: '회사소개', href: 'about.html', groups: [
      { name: '회사소개', links: [['회사 소개','about.html#intro'],['연혁','about.html#history'],['생산 현장','about.html#factory'],['품질 관리','about.html#quality'],['네트워크','about.html#network'],['고객사','about.html#partners'],['오시는 길','about.html#location']] }
    ] },
    { en: 'MAKING', ko: '제작과정', href: 'business.html', groups: [
      { name: '공통 제작 안내', links: [['사업 분야','business.html#fields'],['OEM · ODM','business.html#oem'],['제작 과정','business.html#process'],['캐릭터 IP','business.html#ip'],['제작 일정','business.html#lead-time']] },
      { name: '품목별 제작 안내', links: guides }
    ] },
    { en: 'PORTFOLIO', ko: '제작사례', href: 'portfolio.html', groups: [
      { name: '제작사례', links: [['봉제·패브릭','portfolio.html'],['브랜드 굿즈','portfolio.html#goods'],['패키지·세트','portfolio.html#package']] }
    ] },
    { en: 'INQUIRY', ko: '제작문의', href: 'contact.html', groups: [
      { name: '제작문의', links: [['상담 신청','contact.html'],['자주 묻는 질문','faq.html']] }
    ] }
  ];
  const isDesktop = () => matchMedia('(min-width:901px)').matches;
  const linkMarkup = links => links.map(([name, href]) => `<a href="${href}">${name}</a>`).join('');
  const mobileMarkup = (menu, i, drawer) => {
    const id = `mm-mobile-${drawer ? 'home' : 'sub'}-${i}`;
    return `<a href="${menu.href}" class="mm-band-trigger" data-mm-index="${i}"><span class="${drawer ? '' : 'nav-'}en">${menu.en}</span><small class="${drawer ? '' : 'nav-'}ko">${menu.ko}</small></a><button type="button" class="mm-mobile-toggle" aria-expanded="false" aria-controls="${id}" aria-label="${menu.ko} 하위 메뉴 펼치기"><span aria-hidden="true"></span></button><div class="mm-mobile-sub" id="${id}" hidden>${menu.groups.map(g => `<section>${menu.groups.length > 1 ? `<strong>${g.name}</strong>` : ''}${linkMarkup(g.links)}</section>`).join('')}</div>`;
  };
  if (homeNav) {
    homeNav.innerHTML = menus.map((m,i) => `<a class="mm-band-trigger" data-mm-index="${i}" href="${m.href}"><span class="en">${m.en}</span><small class="ko">${m.ko}</small></a>`).join('');
    const drawer = document.getElementById('mnav');
    if (drawer) {
      for (const child of [...drawer.children]) if (!child.matches('#mclose,.mc,.mk')) child.remove();
      const groups = document.createElement('div');
      groups.className = 'mm-mobile-groups';
      groups.innerHTML = menus.map((m,i) => `<div class="mm-mobile-group">${mobileMarkup(m,i,true)}</div>`).join('');
      drawer.insertBefore(groups, drawer.querySelector('.mc'));
      drawer.addEventListener('click', e => {
        if (e.target.closest('a')) drawer.classList.remove('on');
      });
    }
  } else {
    const list = subNav.querySelector('.nav-list');
    if (!list) return;
    const path = location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
    list.innerHTML = menus.map((m,i) => `<li class="nav-item mm-mobile-group${path.endsWith('/' + m.href.replace('.html','')) ? ' active' : ''}">${mobileMarkup(m,i,false)}</li>`).join('');
    subNav.addEventListener('click', e => {
      if (!e.target.closest('a')) return;
      subNav.classList.remove('open');
      const toggle = document.getElementById('menuToggle');
      if (toggle) toggle.setAttribute('aria-expanded','false');
    });
  }
  document.querySelectorAll('.mm-mobile-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      const content = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', button.getAttribute('aria-label').replace(open ? '펼치기' : '접기', open ? '접기' : '펼치기'));
      content.hidden = !open;
    });
  });
  const band = document.createElement('nav');
  band.id = 'mm-nav-band';
  band.className = 'mm-nav-band';
  band.hidden = true;
  band.setAttribute('aria-label', '상단 세부 메뉴');
  header.appendChild(band);
  const desktopNav = homeNav || subNav;
  const triggers = [...desktopNav.querySelectorAll('.mm-band-trigger')];
  triggers.forEach(a => { a.setAttribute('aria-expanded','false'); a.setAttribute('aria-controls',band.id); });
  let current = -1;
  let suppressFocus = false;
  const close = () => {
    band.hidden = true;
    header.classList.remove('mm-band-open');
    triggers.forEach(a => a.setAttribute('aria-expanded','false'));
    current = -1;
  };
  const open = i => {
    if (!isDesktop()) return;
    if (current === i && !band.hidden) return;
    current = i;
    const m = menus[i];
    band.setAttribute('aria-label', m.ko + ' 세부 메뉴');
    band.innerHTML = `<div class="mm-band-inner"><div class="mm-band-links">${linkMarkup(m.groups[0].links)}</div>${m.groups.length > 1 ? `<div class="mm-band-more"><button type="button" aria-expanded="false" aria-controls="mm-guide-flyout">품목별 제작 안내 <span aria-hidden="true">›</span></button><div id="mm-guide-flyout" class="mm-guide-flyout" role="group" aria-label="품목별 제작 안내" hidden>${linkMarkup(m.groups[1].links)}</div></div>` : ''}</div>`;
    const h = header.getBoundingClientRect();
    const t = triggers[i].getBoundingClientRect();
    const left = Math.max(16, Math.min(t.left - h.left, h.width - 196));
    band.style.left = left + 'px';
    band.classList.toggle('mm-flyout-left', left + 400 > h.width - 16);
    const more = band.querySelector('.mm-band-more');
    if (more) {
      const button = more.querySelector('button');
      const flyout = more.querySelector('.mm-guide-flyout');
      const show = value => { flyout.hidden = !value; button.setAttribute('aria-expanded',String(value)); };
      more.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') show(true); });
      more.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch' && !more.contains(document.activeElement)) show(false); });
      more.addEventListener('focusin', () => show(true));
      more.addEventListener('focusout', e => { if (!more.contains(e.relatedTarget)) show(false); });
      button.addEventListener('click', () => show(button.getAttribute('aria-expanded') !== 'true'));
    }
    band.hidden = false;
    header.classList.add('mm-band-open');
    triggers.forEach((a,j) => a.setAttribute('aria-expanded',String(i === j)));
  };
  triggers.forEach((a,i) => {
    a.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') open(i); });
    a.addEventListener('focus', () => { if (!suppressFocus) open(i); });
    a.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && isDesktop()) {
        e.preventDefault(); open(i); band.querySelector('button,a')?.focus();
      }
    });
  });
  header.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch') close(); });
  header.addEventListener('focusout', e => { if (!header.contains(e.relatedTarget)) close(); });
  header.addEventListener('keydown', e => {
    if (e.key === 'Escape' && current >= 0) {
      e.preventDefault(); const a = triggers[current]; close(); suppressFocus = true; a.focus(); suppressFocus = false;
    }
  });
  band.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (a) { a.blur(); close(); }
  });
  document.addEventListener('pointerdown', e => { if (!header.contains(e.target)) close(); });
  addEventListener('resize', close);
})();
