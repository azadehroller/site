/**
 * HubSpot Forms Loader Utility
 * 
 * Ensures the HubSpot forms script is loaded only once across the entire site,
 * and provides a centralized way to initialize forms.
 */

// Type declarations for HubSpot
declare global {
  interface Window {
    __hubspotScriptLoaded?: boolean;
    __hubspotScriptLoading?: boolean;
    __hubspotFormsInitialized?: Record<string, boolean>;
    __hubspotReadyCallbacks?: Array<() => void>;
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region?: string;
          target: string | Element;
          cssClass?: string;
          onFormReady?: () => void;
          onFormSubmit?: () => void;
        }) => void;
      };
    };
  }
}

/**
 * Load the HubSpot forms script if not already loaded
 * Returns a promise that resolves when the script is ready
 */
export function loadHubSpotScript(): Promise<void> {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (window.hbspt?.forms) {
      resolve();
      return;
    }

    // If script is already being loaded, add to callback queue
    if (window.__hubspotScriptLoading) {
      window.__hubspotReadyCallbacks = window.__hubspotReadyCallbacks || [];
      window.__hubspotReadyCallbacks.push(resolve);
      return;
    }

    // If script tag already exists (e.g., from Footer), wait for it
    if (window.__hubspotScriptLoaded) {
      waitForHubSpot(resolve);
      return;
    }

    // Check if script tag already exists in DOM
    const existingScript = document.querySelector('script[src*="js.hsforms.net"]');
    if (existingScript) {
      window.__hubspotScriptLoaded = true;
      waitForHubSpot(resolve);
      return;
    }

    // Load the script
    window.__hubspotScriptLoading = true;
    window.__hubspotReadyCallbacks = [resolve];

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.async = true;
    
    script.onload = () => {
      window.__hubspotScriptLoaded = true;
      window.__hubspotScriptLoading = false;
      
      // Wait for hbspt object to be available
      waitForHubSpot(() => {
        // Execute all pending callbacks
        const callbacks = window.__hubspotReadyCallbacks || [];
        callbacks.forEach(cb => cb());
        window.__hubspotReadyCallbacks = [];
      });
    };

    script.onerror = () => {
      window.__hubspotScriptLoading = false;
      console.error('[HubSpot] Failed to load forms script');
    };

    document.head.appendChild(script);
  });
}

/**
 * Wait for HubSpot's hbspt object to be available
 */
function waitForHubSpot(callback: () => void, maxAttempts = 50): void {
  let attempts = 0;
  
  const check = () => {
    if (window.hbspt?.forms) {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(check, 100);
    } else {
      console.error('[HubSpot] Timed out waiting for hbspt object');
    }
  };
  
  check();
}

/**
 * Initialize a HubSpot form in a specific target element
 */
export interface HubSpotFormOptions {
  portalId: string;
  formId: string;
  region?: string;
  target: string | Element;
  cssClass?: string;
  onFormReady?: () => void;
  onFormSubmit?: () => void;
}

export async function initHubSpotForm(options: HubSpotFormOptions): Promise<boolean> {
  const { portalId, formId, target } = options;
  
  if (!portalId || !formId || !target) {
    console.warn('[HubSpot] Missing required form options');
    return false;
  }

  // Generate a unique key for this form instance
  const targetId = typeof target === 'string' 
    ? target.replace(/^#/, '') 
    : target.id || `form-${formId}`;
  
  // Initialize tracking object
  window.__hubspotFormsInitialized = window.__hubspotFormsInitialized || {};
  
  // Skip if already initialized
  if (window.__hubspotFormsInitialized[targetId]) {
    return true;
  }

  // Load script and wait for it
  await loadHubSpotScript();

  if (!window.hbspt?.forms) {
    console.error('[HubSpot] hbspt.forms not available after script load');
    return false;
  }

  // Mark as initialized before creating to prevent duplicates
  window.__hubspotFormsInitialized[targetId] = true;

  try {
    window.hbspt.forms.create({
      portalId: options.portalId,
      formId: options.formId,
      region: options.region || 'na1',
      target: typeof target === 'string' ? target : `#${target.id}`,
      cssClass: options.cssClass || 'hs-form stacked hs-custom-form',
      onFormReady: options.onFormReady,
      onFormSubmit: options.onFormSubmit,
    });
    return true;
  } catch (error) {
    console.error('[HubSpot] Error creating form:', error);
    // Remove from initialized so it can retry
    delete window.__hubspotFormsInitialized[targetId];
    return false;
  }
}

/**
 * Initialize all HubSpot forms on the page that have data attributes
 */
export async function initAllHubSpotForms(): Promise<void> {
  const formTargets = document.querySelectorAll<HTMLElement>('.hs-form-target[data-portal-id][data-form-id]');
  
  for (const target of formTargets) {
    const portalId = target.getAttribute('data-portal-id');
    const formId = target.getAttribute('data-form-id');
    const region = target.getAttribute('data-region') || 'na1';
    
    if (portalId && formId && target.id) {
      await initHubSpotForm({
        portalId,
        formId,
        region,
        target: `#${target.id}`,
      });
    }
  }
}

/**
 * Inline script version for use in Astro components
 * This can be used in <script is:inline> blocks
 */
export const hubspotLoaderInlineScript = `
(function() {
  'use strict';
  
  // Skip if already set up
  if (window.__hubspotLoaderSetup) return;
  window.__hubspotLoaderSetup = true;
  
  window.__hubspotFormsInitialized = window.__hubspotFormsInitialized || {};
  window.__hubspotReadyCallbacks = window.__hubspotReadyCallbacks || [];
  
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
  
  window.__loadHubSpotScript = function(callback) {
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
  };
  
  window.__initHubSpotForm = function(options) {
    var targetId = typeof options.target === 'string' 
      ? options.target.replace(/^#/, '') 
      : options.target.id;
    
    if (window.__hubspotFormsInitialized[targetId]) return;
    
    window.__loadHubSpotScript(function() {
      if (!window.hbspt || !window.hbspt.forms) return;
      if (window.__hubspotFormsInitialized[targetId]) return;
      
      window.__hubspotFormsInitialized[targetId] = true;
      
      try {
        window.hbspt.forms.create({
          portalId: options.portalId,
          formId: options.formId,
          region: options.region || 'na1',
          target: typeof options.target === 'string' ? options.target : '#' + options.target.id,
          cssClass: options.cssClass || 'hs-form stacked hs-custom-form',
          onFormReady: options.onFormReady
        });
      } catch (e) {
        delete window.__hubspotFormsInitialized[targetId];
      }
    });
  };
  
  window.__initAllHubSpotForms = function() {
    var targets = document.querySelectorAll('.hs-form-target[data-portal-id][data-form-id]');
    targets.forEach(function(target) {
      var portalId = target.getAttribute('data-portal-id');
      var formId = target.getAttribute('data-form-id');
      var region = target.getAttribute('data-region') || 'na1';
      
      if (portalId && formId && target.id) {
        window.__initHubSpotForm({
          portalId: portalId,
          formId: formId,
          region: region,
          target: '#' + target.id
        });
      }
    });
  };
})();
`;
