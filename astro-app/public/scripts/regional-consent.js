/* ----- Microsoft Ads (UET) Regional Consent ----- */
window.uetq = window.uetq || [];
window.uetq.push('consent', 'default', {
  ad_storage: 'denied',
  region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB','IS','LI','NO','CH']
});
window.uetq.push('consent', 'default', { ad_storage: 'granted' });

/* ----- dataLayer + gtag bootstrap ----- */
window.dataLayer = window.dataLayer || [];
// NOTE: intentionally a regular function — GTM reads the IArguments object directly.
// Converting to an arrow + rest params changes the type and breaks GTM processing.
function gtag() { dataLayer.push(arguments); }

/* ----- Google Consent Mode REGIONAL defaults ----- */
gtag('consent', 'default', {
  ad_storage:             'denied',
  analytics_storage:      'denied',
  functionality_storage:  'granted',
  personalization_storage:'denied',
  security_storage:       'granted',
  ad_user_data:           'denied',
  ad_personalization:     'denied',
  wait_for_update:        800,
  region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB','IS','LI','NO','CH']
});
gtag('consent', 'default', {
  ad_storage:             'denied',
  analytics_storage:      'granted',
  functionality_storage:  'granted',
  personalization_storage:'denied',
  security_storage:       'granted',
  ad_user_data:           'denied',
  ad_personalization:     'denied',
  region: ['US-CA']
});
gtag('consent', 'default', {
  ad_storage:             'granted',
  analytics_storage:      'granted',
  functionality_storage:  'granted',
  personalization_storage:'granted',
  security_storage:       'granted',
  ad_user_data:           'granted',
  ad_personalization:     'granted'
});

window.dataLayer.push({ event: 'consent_defaults_set', consent_region: 'regional_rules_applied' });

/* ----- HubSpot consent API handle ----- */
// Use window._hsp directly — declaring a local const/var conflicts with HubSpot's
// own global `var _hsp` declaration when both scripts share the same scope.
window._hsp = window._hsp || [];

const toConsent = bool => bool ? 'granted' : 'denied';

function getConsentStates(consent) {
  const cats = consent?.categories ?? {};
  const acceptAll = !!consent?.allowed;
  const analyticsYes = !!(cats.analytics || cats.statistics);
  const adsYes = !!(cats.advertisement || cats.marketing);
  return { hasAnalytics: acceptAll || analyticsYes, hasAds: acceptAll || adsYes, acceptAll };
}

window._hsp.push(['addPrivacyConsentListener', consent => {
  try {
    const { hasAnalytics, hasAds, acceptAll } = getConsentStates(consent);

    (window.uetq = window.uetq || []).push('consent', 'update', { ad_storage: toConsent(hasAds) });

    gtag('consent', 'update', {
      ad_storage:             toConsent(hasAds),
      analytics_storage:      toConsent(hasAnalytics),
      functionality_storage:  'granted',
      personalization_storage:toConsent(hasAds),
      security_storage:       'granted',
      ad_user_data:           toConsent(hasAds),
      ad_personalization:     toConsent(hasAds)
    });

    window.dataLayer.push(
      {
        event:             'consent_changed',
        consent_analytics: toConsent(hasAnalytics),
        consent_ads:       toConsent(hasAds),
        consent_accept_all:String(acceptAll)
      },
      { event: hasAnalytics ? 'consent_analytics_granted' : 'consent_analytics_denied' },
      { event: hasAds       ? 'consent_ads_granted'       : 'consent_ads_denied'       }
    );

    console.log('[Consent] Update applied:', { analytics: toConsent(hasAnalytics), ads: toConsent(hasAds), raw: consent });
  } catch (e) {
    console.warn('[Consent] Error handling HubSpot consent:', e);
  }
}]);

/* ----- Universal Opt-Out ----- */
window.universalOptOut = () => {
  try {
    gtag('consent', 'update', {
      ad_storage:             'denied',
      analytics_storage:      'denied',
      personalization_storage:'denied',
      ad_user_data:           'denied',
      ad_personalization:     'denied'
    });
    (window.uetq = window.uetq || []).push('consent', 'update', { ad_storage: 'denied' });
    document.cookie = 'tracking_opted_out=true;max-age=31536000;path=/;SameSite=Strict';
    window.dataLayer.push({ event: 'universal_opt_out_activated', method: 'manual' });
    console.log('[Consent] Universal opt-out activated');
  } catch (e) {
    console.warn('[Consent] Error in universal opt-out:', e);
  }
};

if (document.cookie.includes('tracking_opted_out=true')) {
  window.universalOptOut();
}

/* =========================
  US-only footer tweak
========================= */
{
  const run = () => {
    if (document.documentElement.getAttribute('data-location') !== 'us') return;

    const originalContainer = document.getElementById('hs_menu_wrapper_footer_menu_secondary_');
    if (!originalContainer) return;

    const contactSupportElement = [...originalContainer.querySelectorAll('li')]
      .find(item => item.textContent?.includes('Contact Support'));
    if (!contactSupportElement) return;

    const clonedContainer = contactSupportElement.cloneNode(true);
    for (const node of clonedContainer.querySelector('div')?.childNodes ?? []) {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace('Contact Support', 'Contact Sales');
      }
    }
    const link = clonedContainer.querySelector('a');
    if (link) link.href = 'tel:+18334514741';

    contactSupportElement.after(clonedContainer);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

/* =========================
  Google Tag Manager (GTM-NQV6RMR)
  (bootstrap now runs only after hydration)
========================= */
/* (function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
  j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NQV6RMR'); */
