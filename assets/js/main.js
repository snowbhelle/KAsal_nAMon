(() => {
  const data = window.WEDDING_DATA;
  const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  const setText=(sel,val)=>qsa(sel).forEach(el=>el.textContent=val);

  setText('[data-bride]', data.couple.bride); setText('[data-groom]', data.couple.groom);
  setText('[data-date-display]', data.wedding.displayDate); setText('[data-date-numeric]', data.wedding.numericDate);
  setText('[data-venue]', data.wedding.venue); setText('[data-city]', data.wedding.city); setText('[data-ceremony-time]', data.wedding.ceremonyTime); setText('[data-reception-time]', data.wedding.receptionTime);
  setText('[data-rsvp-deadline]', data.rsvp.deadline); setText('[data-hashtag]', data.wedding.hashtag); setText('[data-coordinator]', `${data.coordinator.name} · ${data.coordinator.phone}`);
  qsa('[data-monogram]').forEach(el=>el.innerHTML=`${data.couple.monogramLeft}<i>&</i>${data.couple.monogramRight}`);

  const header=qs('.site-header'); const menu=qs('.menu-btn'); const drawer=qs('.mobile-drawer');
  const syncHeader=()=>header?.classList.toggle('scrolled',scrollY>20); syncHeader(); addEventListener('scroll',syncHeader,{passive:true});
  const closeMenu=()=>{menu?.classList.remove('open');drawer?.classList.remove('open');menu?.setAttribute('aria-expanded','false')};
  menu?.addEventListener('click',()=>{const open=!drawer.classList.contains('open');menu.classList.toggle('open',open);drawer.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
  qsa('.mobile-drawer a').forEach(a=>a.addEventListener('click',closeMenu)); addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

  const page=document.body.dataset.page; qsa(`[data-nav="${page}"]`).forEach(a=>a.classList.add('active'));

  const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}}),{threshold:.14}); qsa('.reveal').forEach(el=>revealObs.observe(el));

  const sound=qs('.sound-toggle'); sound?.addEventListener('click',()=>{const on=sound.dataset.on==='true';sound.dataset.on=String(!on);sound.textContent=!on?'Ambient sound: On':'Ambient sound: Off'; sound.setAttribute('aria-pressed',String(!on))});

  const countdown=qs('.countdown');
  if(countdown){ const target=new Date(data.wedding.isoDate).getTime(); const tick=()=>{let d=Math.max(0,target-Date.now()); const days=Math.floor(d/86400000);d%=86400000;const hrs=Math.floor(d/3600000);d%=3600000;const mins=Math.floor(d/60000);const secs=Math.floor((d%60000)/1000); [['days',days],['hours',hrs],['minutes',mins],['seconds',secs]].forEach(([k,v])=>{const el=qs(`[data-count="${k}"]`);if(el)el.textContent=String(v).padStart(2,'0')})};tick();setInterval(tick,1000); }

  // Watercolor leaves drift across the viewport on every page.
  // They use transparent PNG assets so the movement matches the painted invitation artwork.
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const field=document.createElement('div');
    field.className='watercolor-leaf-field';
    field.setAttribute('aria-hidden','true');
    const leafCount=innerWidth < 600 ? 9 : innerWidth < 1000 ? 12 : 15;
    const leafAssets=[1,2,3,4,5].map(n=>`assets/images/watercolor/leaves/leaf-${n}.png`);
    for(let i=0;i<leafCount;i++){
      const leaf=document.createElement('img');
      leaf.className='watercolor-leaf';
      leaf.src=leafAssets[i%leafAssets.length];
      leaf.alt='';
      leaf.decoding='async';
      leaf.style.left=`${Math.random()*98}%`;
      leaf.style.setProperty('--leaf-size',`${18+Math.random()*24}px`);
      leaf.style.setProperty('--leaf-duration',`${13+Math.random()*13}s`);
      leaf.style.setProperty('--leaf-delay',`${-Math.random()*24}s`);
      leaf.style.setProperty('--leaf-opacity',`${.22+Math.random()*.28}`);
      leaf.style.setProperty('--leaf-rot-start',`${Math.round(Math.random()*180)}deg`);
      leaf.style.setProperty('--leaf-drift-a',`${-34+Math.random()*68}px`);
      leaf.style.setProperty('--leaf-drift-b',`${-42+Math.random()*84}px`);
      leaf.style.setProperty('--leaf-drift-c',`${-32+Math.random()*64}px`);
      leaf.style.setProperty('--leaf-drift-d',`${-22+Math.random()*44}px`);
      field.appendChild(leaf);
    }
    document.body.appendChild(field);
  }

  qsa('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{const expanded=btn.getAttribute('aria-expanded')==='true';const panel=document.getElementById(btn.getAttribute('aria-controls'));btn.setAttribute('aria-expanded',String(!expanded));panel.style.maxHeight=expanded?'0px':`${panel.scrollHeight}px`}));

  const palette=qs('#palette'); if(palette){palette.innerHTML=data.palette.map(p=>`<article class="swatch"><div class="swatch-color" style="background:${p.hex}"></div><div class="swatch-meta"><strong>${p.name}</strong><small>${p.hex} · ${p.guidance}</small></div></article>`).join('')}
  const sched=qs('#schedule'); if(sched){sched.innerHTML=data.schedule.map((s,i)=>`<article class="timeline-item reveal"><div class="timeline-empty"></div><div class="timeline-time">${s.time}</div><div class="timeline-copy"><h3>${s.title}</h3><p>${s.note}</p></div></article>`).join('');qsa('.reveal',sched).forEach(el=>revealObs.observe(el))}

  qsa('[data-map="ceremony"]').forEach(a=>a.href=data.links.ceremonyMap); qsa('[data-map="reception"]').forEach(a=>a.href=data.links.receptionMap); qsa('[data-hotel-map]').forEach(a=>a.href=data.links.hotelSearch);

  const rsvp = qs('#rsvp-form');
  if (rsvp) {
    const attendance = qs('[name="attendance"]', rsvp);
    const party = qs('[name="partySize"]', rsvp);
    const guestNames = qs('[name="guestNames"]', rsvp);
    const submitButton = qs('[data-rsvp-submit]', rsvp);
    const status = qs('[data-rsvp-status]');

    const setStatus = (message = '', type = '') => {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status';
      if (type) status.classList.add(type);
    };

    attendance?.addEventListener('change', () => {
      const unableToAttend = attendance.value === 'Unable to attend';
      party.disabled = unableToAttend;
      guestNames.disabled = unableToAttend;

      if (unableToAttend) {
        party.value = '0';
        guestNames.value = '';
      } else if (party.value === '0') {
        party.value = '1';
      }
    });

    rsvp.addEventListener('submit', async (event) => {
      event.preventDefault();
      setStatus();

      if (!rsvp.reportValidity()) return;

      const endpoint = data.rsvp.googleAppsScriptUrl?.trim();
      if (!endpoint || endpoint.includes('PASTE_GOOGLE_APPS_SCRIPT')) {
        setStatus(
          'RSVP saving is not connected yet. Add your Google Apps Script Web App URL in assets/js/config.js.',
          'error'
        );
        return;
      }

      const formData = new FormData(rsvp);
      const fullName = String(formData.get('fullName') || '').trim();
      const unableToAttend = formData.get('attendance') === 'Unable to attend';
      const submissionId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `rsvp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const payload = {
        submissionId,
        submittedAt: new Date().toISOString(),
        fullName,
        email: String(formData.get('email') || '').trim(),
        mobile: String(formData.get('mobile') || '').trim(),
        attendance: String(formData.get('attendance') || ''),
        allottedGuests: Number(formData.get('allottedGuests') || data.rsvp.maxAllotmentDefault || 1),
        partySize: unableToAttend ? 0 : Number(formData.get('partySize') || 1),
        guestNames: unableToAttend ? '' : String(formData.get('guestNames') || '').trim(),
        dietaryRestrictions: String(formData.get('dietary') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        partyId: '',
        guestListMatch: 'Not validated',
        source: 'Wedding e-invite'
      };

      submitButton.disabled = true;
      submitButton.dataset.originalLabel = submitButton.textContent;
      submitButton.textContent = 'Sending…';
      rsvp.setAttribute('aria-busy', 'true');
      setStatus('Saving your RSVP…', 'sending');

      try {
        // Google Apps Script Web Apps can redirect to a Google-hosted response URL.
        // no-cors makes this reliable from a static GitHub Pages site. The response
        // is intentionally opaque, so success here means the browser completed
        // the submission request without a network-level failure.
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        rsvp.style.display = 'none';
        const success = qs('.success-state');
        qs('[data-confirm-name]', success).textContent = fullName;
        qs('[data-confirm-id]', success).textContent = submissionId;
        success.classList.add('show');
        success.setAttribute('tabindex', '-1');
        success.focus();
      } catch (error) {
        console.error('RSVP submission failed:', error);
        setStatus(
          'We could not send your RSVP. Please check your connection and try again.',
          'error'
        );
      } finally {
        rsvp.removeAttribute('aria-busy');
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalLabel || 'Send RSVP';
      }
    });
  }

  const storyHost=qs('#story-host'); if(storyHost){storyHost.innerHTML=data.story.map((s,i)=>`<section class="story-chapter"><div class="story-image reveal"><img src="${s.image}" alt="Placeholder for ${s.label.toLowerCase()} photograph" loading="lazy"></div><div class="story-copy reveal"><div class="eyebrow">${s.label}</div><div class="year">${s.year}</div><h2>${s.title}</h2><p>${s.text}</p><p class="handnote">“Replace this with a handwritten-style note from one of you.”</p></div></section>`).join(''); qsa('.reveal',storyHost).forEach(el=>revealObs.observe(el))}

  const track=qs('.carousel-track'); if(track){let idx=0;const slides=qsa('.carousel-slide',track);const move=()=>track.style.transform=`translateX(-${idx*100}%)`;qs('[data-prev]')?.addEventListener('click',()=>{idx=(idx-1+slides.length)%slides.length;move()});qs('[data-next]')?.addEventListener('click',()=>{idx=(idx+1)%slides.length;move()});track.addEventListener('touchstart',e=>track.dataset.x=e.touches[0].clientX,{passive:true});track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-Number(track.dataset.x||0);if(Math.abs(dx)>45){idx=dx<0?(idx+1)%slides.length:(idx-1+slides.length)%slides.length;move()}},{passive:true})}
})();
