(function() {
  'use strict';

  if (window.__hubspotLoaderSetup) {
    observeForms();
    return;
  }
  window.__hubspotLoaderSetup = true;

  window.__hubspotFormsInitialized = window.__hubspotFormsInitialized || {};
  window.__hubspotReadyCallbacks = window.__hubspotReadyCallbacks || [];

  function runAfterWindowLoad(fn) {
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', fn, { once: true });
  }

  function waitForHubSpot(callback, maxAttempts) {
    maxAttempts = maxAttempts || 50;
    var attempts = 0;

    function check() {
      if (window.hbspt && window.hbspt.forms) {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(check, 100);
      }
    }
    check();
  }

  function loadScript(callback) {
    if (window.hbspt && window.hbspt.forms) {
      callback && callback();
      return;
    }

    if (window.__hubspotScriptLoading) {
      callback && window.__hubspotReadyCallbacks.push(callback);
      return;
    }

    var existingScript = document.querySelector('script[src*="js.hsforms.net"]');
    if (existingScript || window.__hubspotScriptLoaded) {
      window.__hubspotScriptLoaded = true;
      waitForHubSpot(function() {
        callback && callback();
        window.__hubspotReadyCallbacks.forEach(function(cb) { cb(); });
        window.__hubspotReadyCallbacks = [];
      });
      return;
    }

    window.__hubspotScriptLoading = true;
    callback && window.__hubspotReadyCallbacks.push(callback);

    runAfterWindowLoad(function() {
      if (window.hbspt && window.hbspt.forms) {
        window.__hubspotScriptLoading = false;
        window.__hubspotReadyCallbacks.forEach(function(cb) { cb(); });
        window.__hubspotReadyCallbacks = [];
        return;
      }

      var existing = document.querySelector('script[src*="js.hsforms.net"]');
      if (existing || window.__hubspotScriptLoaded) {
        window.__hubspotScriptLoaded = true;
        window.__hubspotScriptLoading = false;
        waitForHubSpot(function() {
          window.__hubspotReadyCallbacks.forEach(function(cb) { cb(); });
          window.__hubspotReadyCallbacks = [];
        });
        return;
      }

      var script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.async = true;

      script.onload = function() {
        window.__hubspotScriptLoaded = true;
        window.__hubspotScriptLoading = false;
        waitForHubSpot(function() {
          window.__hubspotReadyCallbacks.forEach(function(cb) { cb(); });
          window.__hubspotReadyCallbacks = [];
        });
      };

      document.head.appendChild(script);
    });
  }

  function getUrlParameters(url, names) {
    if (!Array.isArray(names)) return {};
    var params = {};
    var searchParams = new URLSearchParams(url.search);
    names.forEach(function(name) {
      var value = searchParams.get(name);
      params[name] = value !== null ? value : null;
    });
    return params;
  }

  function setInputValues(formInputs, formValues) {
    formInputs.forEach(function(inputName) {
      var el = document.querySelector('input[name="' + inputName + '"]');
      if (el && formValues[inputName]) {
        el.value = formValues[inputName];
      }
    });
  }

  function onFormReady() {
    var url = new URL(window.location.href);
    var params = getUrlParameters(url, ['customer_ref_id', 'promo_code']);
    setInputValues(['customer_ref_id', 'promo_code'], params);
  }

  function initForm(target) {
    var targetId = target.id;
    if (window.__hubspotFormsInitialized[targetId]) return;

    var portalId = target.getAttribute('data-portal-id');
    var formId = target.getAttribute('data-form-id');
    var region = target.getAttribute('data-region') || 'na1';

    if (portalId && formId) {
      window.__hubspotFormsInitialized[targetId] = true;

      loadScript(function() {
        if (window.hbspt) {
          try {
            window.hbspt.forms.create({
              portalId: portalId,
              formId: formId,
              region: region,
              target: '#' + targetId,
              cssClass: 'hs-form stacked hs-custom-form',
              onFormReady: onFormReady
            });
          } catch (error) {
            console.log('[HubSpot] Form creation error:', error);
            delete window.__hubspotFormsInitialized[targetId];
          }
        }
      });
    }
  }

  function observeForms() {
    var formTargets = document.querySelectorAll('.hs-form-target');

    if (!window.IntersectionObserver) {
      formTargets.forEach(initForm);
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          initForm(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px'
    });

    formTargets.forEach(function(target) {
      observer.observe(target);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeForms);
  } else {
    observeForms();
  }

  document.addEventListener('astro:page-load', observeForms);
})();
