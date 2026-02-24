{
  let activated = false;

  // ---- Region toggles --------------------------------------------------------
  const REGION = (document.documentElement.getAttribute('data-location') || 'us').toUpperCase();
  const EEA_SET = new Set(['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB','IS','LI','NO','CH']);
  const IN_EEA = EEA_SET.has(REGION);

  // Feature flags (EEA/UK stricter by default)
  const ENABLE_SECONDARY_CLICK_IMPLIED = !IN_EEA;
  const ENABLE_40S_TIMER_IMPLIED       = !IN_EEA;
  const TIMEOUT_MS = 40_000;

  // ---- Hydration: turn <script type="text/plain"> into real scripts ----------
  function hydrateAll() {
    if (activated) return;
    activated = true;

    document.querySelectorAll('script[type="text/plain"]').forEach(s => {
      if (s.hasAttribute('data-src')) {
        const t = document.createElement('script');
        try {
          const attrs = JSON.parse(s.getAttribute('data-attrs') || '{}');
          Object.assign(t, attrs);
        } catch {}
        t.src = s.getAttribute('data-src');
        for (const attr of ['nonce', 'integrity', 'referrerpolicy', 'crossorigin']) {
          const v = s.getAttribute(`data-${attr}`);
          if (v) t.setAttribute(attr, v);
        }
        s.replaceWith(t);
      } else if (s.hasAttribute('data-inline')) {
        const ti = document.createElement('script');
        ti.textContent = s.textContent;
        s.replaceWith(ti);
      }
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'inert_scripts_hydrated', region: REGION, ts: Date.now() });
  }

  // ---- Trigger 1: explicit consent via HubSpot --------------------------------
  function attachHubSpotConsent() {
    const cb = consent => {
      try {
        const cats = consent?.categories ?? {};
        const allowed = !!consent?.allowed;
        const analyticsYes = !!(cats.analytics || cats.statistics);
        const adsYes = !!(cats.advertisement || cats.marketing);
        if (allowed || analyticsYes || adsYes) hydrateAll();
      } catch {}
    };
    (window._hsq = window._hsq || []).push(['addPrivacyConsentListener', cb]);
    (window._hsp = window._hsp || []).push(['addPrivacyConsentListener', cb]);
  }

  // ---- Trigger 2: implied via secondary page (non-home) ----------------------
  function attachSecondaryClick() {
    if (!ENABLE_SECONDARY_CLICK_IMPLIED) return;
    document.addEventListener('click', e => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const url = new URL(a.getAttribute('href'), location.href);
      if (url.origin === location.origin && url.pathname !== '/') hydrateAll();
    }, true);
  }

  // ---- Trigger 3: 40s timeout ------------------------------------------------
  function attachTimer() {
    if (!ENABLE_40S_TIMER_IMPLIED) return;
    setTimeout(hydrateAll, TIMEOUT_MS);
  }

  // Boot
  attachHubSpotConsent();
  attachSecondaryClick();
  attachTimer();
}
