document.addEventListener('DOMContentLoaded', () => {

    // --- HEADER SCROLL & MOBILE MENU LOGIC ---
   // index.js (place next to index.html)
document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL & MOBILE MENU LOGIC ---
  const header = document.getElementById('main-header');
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const xIcon = document.getElementById('x-icon');

  if (window && header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  if (menuButton && mobileMenu && menuIcon && xIcon) {
    menuButton.addEventListener('click', () => {
      const isMenuOpen = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isMenuOpen);
      menuIcon.classList.toggle('hidden', isMenuOpen);
      xIcon.classList.toggle('hidden', !isMenuOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('hidden');
        xIcon.classList.add('hidden');
      });
    });
  }

  // --- DYNAMICALLY CREATE SERVICE CARDS ---
  (function initServices() {
    console.log('services init');
    const BASE_IMG_PATH = '/siterecoopmedia/'; // folder without spaces; must exist on server

    const servicesData = [
      { title: "Reabilitação Estrutural", iconFile: 'recoop_stone_wall_imitation.png', items: ["Reforço de vigas, lajes e fundações", "Recuperação de paredes antigas", "Tratamento de humidades e fissuras", "Reabilitação sísmica e estrutural"] },
      { title: "Telhados e Coberturas", iconFile: 'recoop_portuguese_roof_tile.jpeg', items: ["Substituição e isolamento de telhados", "Impermeabilização e drenagem", "Aplicação de telhas diversas", "Coberturas verdes e ecológicas"] },
      { title: "Fachadas e Revestimentos", iconFile: 'recoop_etics_application.jpeg', items: ["Capoto / ETICS", "Imitação de pedra e madeira", "Revestimentos em pedra natural", "Pinturas exteriores e proteção"] },
      { title: "Divisórias, Tetos e Isolamentos", iconFile: 'recoop_workers_3.png', items: ["Pladur / Gesso cartonado", "Isolamento térmico e acústico", "Tetos acústicos e decorativos", "Isolamentos interiores e de caves"] },
      { title: "Carpintarias e Acabamentos", iconFile: 'recoop_wood_imitation_railing.png', items: ["Portas, janelas e caixilharias", "Pavimentos vinílicos e flutuantes", "Revestimentos em madeira", "Mobiliário ecológico e reciclado"] },
      { title: "Canalização e Eletricidade", iconFile: 'recoop_home_repairs.png', items: ["Substituição de canalizações", "Instalação de águas e esgotos", "Instalação elétrica, LED e domótica", "Painéis solares e carregadores"] },
      { title: "Pinturas e Decoração", iconFile: 'recoop_painter.png', items: ["Pinturas com tintas ecológicas", "Estuques decorativos e cimento", "Lacagens e vernizes naturais", "Design e decoração ambiental"] },
      { title: "Sustentabilidade e Energia", iconFile: 'recoop_solar_panels.png', items: ["Painéis solares fotovoltaicos", "Sistemas off-grid e baterias", "Captação de águas pluviais", "Casas com baixo consumo"] }
    ];

    const servicesGrid = document.getElementById('services-grid');
    const servicesPin = document.getElementById('services-pin');

    if (!servicesGrid) {
      console.error('services-grid not found in DOM');
      return;
    }

    // create small pin image container if services-pin exists
    let pinImg = null;
    if (servicesPin) {
      pinImg = document.createElement('img');
      pinImg.className = 'pin-img';
      pinImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      servicesPin.appendChild(pinImg);
    }

    function imgUrl(fileName) {
      return BASE_IMG_PATH + (fileName || '').trim();
    }

    const FALLBACK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    // clear previous content
    servicesGrid.innerHTML = '';

    servicesData.forEach((svc, idx) => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.dataset.serviceIdx = idx;

      const header = document.createElement('div');
      header.className = 'service-card-header';

      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'service-icon-wrapper';
      const img = document.createElement('img');
      img.className = 'service-icon';
      img.alt = svc.title;
      img.src = imgUrl(svc.iconFile);

      img.addEventListener('error', () => {
        console.warn('Image load failed:', img.src);
        img.src = FALLBACK;
      });

      iconWrapper.appendChild(img);
      header.appendChild(iconWrapper);

      const h4 = document.createElement('h4');
      h4.textContent = svc.title;
      header.appendChild(h4);

      card.appendChild(header);

      const ul = document.createElement('ul');
      svc.items.forEach(it => {
        const li = document.createElement('li');
        li.textContent = it;
        ul.appendChild(li);
      });
      card.appendChild(ul);

      // show in pin on hover
      let selected = false;
      card.addEventListener('mouseenter', () => {
        if (pinImg) {
          pinImg.src = img.src || FALLBACK;
          servicesPin && servicesPin.classList.add('pin-filled');
        }
      });
      card.addEventListener('mouseleave', () => {
        if (pinImg && !selected) {
          pinImg.src = FALLBACK;
          servicesPin && servicesPin.classList.remove('pin-filled');
        }
      });
      card.addEventListener('click', () => {
        selected = !selected;
        if (selected) {
          if (pinImg) { pinImg.src = img.src || FALLBACK; servicesPin && servicesPin.classList.add('pin-filled'); }
          card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
        } else {
          if (pinImg) { pinImg.src = FALLBACK; servicesPin && servicesPin.classList.remove('pin-filled'); }
          card.style.boxShadow = '';
        }
      });

      servicesGrid.appendChild(card);
    });

    console.log('services-grid children count:', servicesGrid.children.length);
  })();

  // --- place for other code (smooth clone, scroll interactions, etc.)
  // Put any additional scripts here, ensuring they reference existing DOM elements.
});

});







// Smooth scroll-follow + snap loop for hero icon -> services pin
(function(){
    const orig = document.getElementById('hero-icon');
    const target = document.getElementById('services-pin');
    if (!orig || !target) return;
  
    // تنظیمات پیش‌فرض — می‌تونی تغییر بدی
    const settings = {
      startViewportFactor: window.innerWidth <= 560 ? 0.090 : 0.09,
      endViewportFactor:   window.innerWidth <= 560 ? 0.80 : 0.85,
      snapThreshold:       window.innerWidth <= 560 ? 0.64 : 0.66,
      snapDuration:        20,   // ms
      hideOnScrollPx:      window.innerWidth <= 560 ? 2 : 5
    };
  
    let clone = null;
    let ticking = false;
    let currentP = 0;
  
    const clamp = (v,a=0,b=1) => Math.max(a, Math.min(b, v));
  
    function createCloneIfNeeded(){
      if (clone) return clone;
      const r = orig.getBoundingClientRect();
      clone = document.createElement('div');
      clone.className = 'floating-clone';
      clone.style.width = r.width + 'px';
      clone.style.height = r.height + 'px';
      // left/top initial (fixed coords matching orig position in viewport)
      clone.style.left = r.left + 'px';
      clone.style.top  = r.top  + 'px';
  
      // copy image if orig is <img>
      if (orig.tagName.toLowerCase() === 'img' && orig.src) {
        clone.style.backgroundImage = `url("${orig.src}")`;
        clone.style.backgroundSize = 'contain';
        clone.style.backgroundRepeat = 'no-repeat';
        clone.style.backgroundPosition = 'center';
      } else {
        const bg = window.getComputedStyle(orig).backgroundImage;
        if (bg && bg !== 'none') clone.style.backgroundImage = bg;
      }
  
      document.body.appendChild(clone);
      return clone;
    }
  
    function removeClone(){
      if (clone){
        clone.remove();
        clone = null;
      }
    }
  
    function fillTargetImg(){
      if (!target.querySelector('img.pin-img')) {
        const img = document.createElement('img');
        img.className = 'pin-img';
        if (orig.tagName.toLowerCase() === 'img' && orig.src) img.src = orig.src;
        else {
          const bg = window.getComputedStyle(orig).backgroundImage;
          const m = /url\(\"?(.+?)\"?\)/.exec(bg);
          if (m && m[1]) img.src = m[1];
        }
        img.alt = orig.alt || 'icon';
        target.appendChild(img);
        target.classList.add('pin-filled');
      }
      // remove clone and keep orig hidden while pinned
      removeClone();
      orig.style.visibility = 'hidden';
    }
  
    function clearTargetImg(){
      const img = target.querySelector('img.pin-img');
      if (img) img.remove();
      target.classList.remove('pin-filled');
      orig.style.visibility = 'visible';
    }
  
    // compute progress (0..1)
    function computeProgress(){
      const oRect = orig.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
  
      // centers in page coords
      const origCenterPage = {
        x: oRect.left + oRect.width/2 + window.scrollX,
        y: oRect.top  + oRect.height/2 + scrollY
      };
      const targetCenterPage = {
        x: tRect.left + tRect.width/2 + window.scrollX,
        y: tRect.top  + tRect.height/2 + scrollY
      };
  
      const startViewportY = window.innerHeight * settings.startViewportFactor;
      const endViewportY   = window.innerHeight * settings.endViewportFactor;
  
      const startTrigger = origCenterPage.y - startViewportY;
      const endTrigger   = targetCenterPage.y - endViewportY;
      const total = endTrigger - startTrigger || 1;
      const p = (scrollY - startTrigger) / total;
      return clamp(p, 0, 1);
    }
  
    // apply exact transform (follow mode) - no smoothing
    function applyDirect(p){
      createCloneIfNeeded();
      // remove snap class so transform updates immediately (no CSS transition)
      clone.classList.remove('smooth-snap');
  
      const oRect = orig.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
  
      const origCenterPage = {
        x: oRect.left + oRect.width/2 + window.scrollX,
        y: oRect.top  + oRect.height/2 + scrollY
      };
      const targetCenterPage = {
        x: tRect.left + tRect.width/2 + window.scrollX,
        y: tRect.top  + tRect.height/2 + scrollY
      };
  
      const dx = targetCenterPage.x - origCenterPage.x;
      const dy = targetCenterPage.y - origCenterPage.y;
  
      const translateX = dx * p;
      const translateY = dy * p;
  
      clone.style.transform = `translate(${translateX}px, ${translateY}px) translateZ(0)`;
      // hide orig when p > 0 (we want clone visible)
      orig.style.visibility = (p > 0.001 || (window.scrollY || window.pageYOffset) > settings.hideOnScrollPx) ? 'hidden' : 'visible';
    }
  
    // when hitting snap threshold: do smooth snap to final place then finalize
    function applySnapThenFinalize(){
      createCloneIfNeeded();
      // compute final dx/dy
      const oRect = orig.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
  
      const origCenterPage = {
        x: oRect.left + oRect.width/2 + window.scrollX,
        y: oRect.top  + oRect.height/2 + scrollY
      };
      const targetCenterPage = {
        x: tRect.left + tRect.width/2 + window.scrollX,
        y: tRect.top  + tRect.height/2 + scrollY
      };
  
      const dx = targetCenterPage.x - origCenterPage.x;
      const dy = targetCenterPage.y - origCenterPage.y;
  
      // enable smooth snap transition
      clone.classList.add('smooth-snap');
      clone.style.transform = `translate(${dx}px, ${dy}px) translateZ(0)`;
  
      // after transition end, finalize into target
      const onTrans = (e) => {
        if (e && e.propertyName && e.propertyName.indexOf('transform') === -1) return;
        clone && clone.removeEventListener('transitionend', onTrans);
        fillTargetImg();
      };
      clone.addEventListener('transitionend', onTrans);
  
      // safety fallback
      setTimeout(()=> {
        if (document.body.contains(clone)) fillTargetImg();
      }, settings.snapDuration + 80);
    }
  
    // main update method (called within RAF)
    function update(){
      ticking = false;
      const p = computeProgress();
      currentP = p;
  
      // immediate hide orig as soon as scrolling beyond tiny px
      if ((window.scrollY || window.pageYOffset) > settings.hideOnScrollPx) {
        orig.style.visibility = 'hidden';
      }
  
      // if below snap threshold -> follow mode
      if (p < settings.snapThreshold) {
        // if target currently has pin-filled (we were snapped) but now we start moving up: 
        // remove pin and spawn clone at the visual position corresponding to p, then follow
        if (target.classList.contains('pin-filled')) {
          // remove image from target but create clone positioned as if p==1, then applyDirect(p)
          const prevImg = target.querySelector('img.pin-img');
          if (prevImg) prevImg.remove();
          target.classList.remove('pin-filled');
          // create clone and ensure it's visually at p==1 position
          createCloneIfNeeded();
          // immediately set transform to final pos (p=1) to start smoothly from there
          // compute dx/dy for p=1:
          const oRect = orig.getBoundingClientRect();
          const tRect = target.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;
  
          const origCenterPage = {
            x: oRect.left + oRect.width/2 + window.scrollX,
            y: oRect.top  + oRect.height/2 + scrollY
          };
          const targetCenterPage = {
            x: tRect.left + tRect.width/2 + window.scrollX,
            y: tRect.top  + tRect.height/2 + scrollY
          };
          const dx = targetCenterPage.x - origCenterPage.x;
          const dy = targetCenterPage.y - origCenterPage.y;
          // place clone visually at p=1 immediately (no transition)
          clone.classList.remove('smooth-snap');
          clone.style.transform = `translate(${dx}px, ${dy}px) translateZ(0)`;
          // then apply follow based on current p (< snapThreshold)
          applyDirect(p);
        } else {
          // normal follow
          applyDirect(p);
        }
  
        // cleanup when scrolled fully to top
        if (p <= 0.001 && (window.scrollY || window.pageYOffset) <= settings.hideOnScrollPx) {
          removeClone();
          clearTargetImg();
          orig.style.visibility = 'visible';
        }
        return;
      }
  
      // p >= snapThreshold -> snap final (if not already finalized)
      if (!target.classList.contains('pin-filled')) {
        // ensure clone exists at current pos, then snap
        createCloneIfNeeded();
        applyDirect(p); // set current transform
        // force reflow
        clone.offsetHeight;
        applySnapThenFinalize();
      }
    }
  
    // RAF wrapper to avoid multiple runs
    function requestTick(){
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
  
    function onScrollOrResize(){
      // on scroll we request an update; orig visibility immediate hide on tiny scroll
      requestTick();
    }
  
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', () => {
      // reset on resize to avoid mismatches
      removeClone();
      clearTargetImg();
      requestTick();
    });
  
    // init
    requestTick();



    // --- find mid section between hero (inicio) and servicos ---
let midSection = null;
function findMidSection() {
  try {
    const sections = Array.from(document.querySelectorAll('section'));
    const heroIndex = sections.findIndex(s => s.id === 'inicio' || s.id === 'hero' || s.classList.contains('hero'));
    const servIndex = sections.findIndex(s => s.id === 'servicos' || s.id === 'servicos' || s.classList.contains('section-dark') && s.id === 'servicos');
    // fallback: تلاش معمولی بر اساس id اگر بالا پیدا نشد
    const servIndexFixed = sections.findIndex(s => s.id === 'servicos');
    const hIdx = heroIndex >= 0 ? heroIndex : sections.findIndex(s => s.id === 'inicio');
    const sIdx = servIndex >= 0 ? servIndex : servIndexFixed;

    midSection = null;
    if (hIdx >= 0 && sIdx >= 0 && sIdx - hIdx > 1) {
      // اگر بین آنها یک یا چند section هست، انتخاب کن نزدیک‌ترین به servicos (آخرین قبل از servicos)
      const candidates = sections.slice(hIdx + 1, sIdx);
      if (candidates.length) {
        midSection = candidates[candidates.length - 1]; // آخرین بخش بین دو تا
      }
    }
  } catch (e) {
    midSection = null;
  }
}

// فراخوانی اولیه و on resize
findMidSection();
window.addEventListener('resize', () => {
  findMidSection();
});

// --- computeProgress (جایگزین تابع قدیمی) ---
function computeProgress(){
  const origRect = orig.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // مراکز در page coords
  const scrollY = window.scrollY || window.pageYOffset;
  const origCenterPage = {
    x: origRect.left + origRect.width/2 + window.scrollX,
    y: origRect.top + origRect.height/2 + scrollY
  };
  const targetCenterPage = {
    x: targetRect.left + targetRect.width/2 + window.scrollX,
    y: targetRect.top + targetRect.height/2 + scrollY
  };

  // نقاط viewport برای شروع/پایان (بر اساس تنظیمات)
  const startViewportY = window.innerHeight * settings.startViewportFactor;
  const endViewportY   = window.innerHeight * settings.endViewportFactor;

  // محاسبه تریگرهای پایه
  const startTrigger = origCenterPage.y - startViewportY;
  let endTrigger = targetCenterPage.y - endViewportY;

  // اگر midSection وجود داشت، مطمئن شو endTrigger طوری تنظیم بشه که
  // آیکون قبل از " گذر کامل یا تا نقطه مشخصِ " midSection " زودتر ختم نشود.
  if (midSection) {
    const mRect = midSection.getBoundingClientRect();
    const midBottomPage = mRect.top + mRect.height + window.scrollY; // پایین midSection در page coords

    // مقدار بسیار محافظه‌کارانه: اجازه نده endTrigger کوچکتر از نقطه‌ای شود
    // که midSection تا 20% از بالای viewport عبور نکرده (یعنی midBottomPage - 0.2*vh)
    const midRequiredY = midBottomPage - (window.innerHeight * 0.20);

    // اگر endTrigger قبل از این مقدار می‌افتاد، آن را جابجا کن تا snap دیرتر اتفاق بیفتد
    if (endTrigger < midRequiredY) {
      endTrigger = midRequiredY;
    }
  }

  const total = endTrigger - startTrigger || 1;
  const p = (scrollY - startTrigger) / total;
  return Math.max(0, Math.min(1, p));
}

  })();
  