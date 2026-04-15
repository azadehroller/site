/**
 * chat-widget.ts
 * Initializes all DOM behaviour for the ChatWidget component.
 * Called via `document.addEventListener('astro:page-load', initChatWidget)`
 * so it re-runs after every Astro View Transitions DOM swap.
 */

import { formatMessageContent, appendSources, type Source } from './chat-formatter';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatElements {
  widget:    HTMLElement;
  toggle:    HTMLButtonElement;
  panel:     HTMLElement;
  form:      HTMLFormElement;
  input:     HTMLTextAreaElement;
  messages:  HTMLElement;
  error:     HTMLElement;
  iconOpen:  HTMLElement;
  iconClose: HTMLElement;
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function initChatWidget(): void {
  const panel = document.getElementById('chat-panel');
  if (!panel) return; // widget not present on this page

  const elements: ChatElements = {
    widget:    document.getElementById('chat-widget')     as HTMLElement,
    toggle:    document.getElementById('chat-toggle')     as HTMLButtonElement,
    panel:     panel                                      as HTMLElement,
    form:      document.getElementById('chat-form')       as HTMLFormElement,
    input:     document.getElementById('chat-input')      as HTMLTextAreaElement,
    messages:  document.getElementById('chat-messages')   as HTMLElement,
    error:     document.getElementById('chat-error')      as HTMLElement,
    iconOpen:  document.getElementById('chat-icon-open')  as HTMLElement,
    iconClose: document.getElementById('chat-icon-close') as HTMLElement,
  };

  // All listeners use { signal } so they're removed automatically on navigation.
  const controller = new AbortController();
  const { signal } = controller;
  document.addEventListener('astro:before-swap', () => controller.abort(), { once: true });

  let conversationId: string | null = null;
  let isLoading = false;

  // ── Toggle panel ──────────────────────────────────────────────────────────

  const toggleChat = () => {
    const isHidden = elements.panel.classList.contains('chat-panel-hidden');
    elements.panel.classList.toggle('chat-panel-hidden');
    elements.iconOpen.classList.toggle('chat-icon-hidden');
    elements.iconClose.classList.toggle('chat-icon-hidden');
    elements.toggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    // Move focus into the input on open; return it to the toggle on close.
    if (isHidden) {
      elements.input.focus();
    } else {
      elements.toggle.focus();
    }
  };

  elements.toggle.addEventListener('click', toggleChat, { signal });

  // Escape key closes the panel from anywhere on the page.
  document.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !elements.panel.classList.contains('chat-panel-hidden')) {
        toggleChat();
      }
    },
    { signal },
  );

  // ── Textarea auto-resize ──────────────────────────────────────────────────
  // minInputHeight is captured lazily on first call — the panel is hidden at
  // init, so scrollHeight === 0 until it's first opened.

  let minInputHeight = 0;

  const autoResize = () => {
    if (!minInputHeight) {
      elements.input.style.height = '';
      minInputHeight = elements.input.scrollHeight;
    }
    elements.input.style.height    = `${minInputHeight}px`;
    const next = elements.input.scrollHeight;
    const max  = parseInt(getComputedStyle(elements.input).maxHeight, 10);
    elements.input.style.height    = `${Math.min(next, max)}px`;
    elements.input.style.overflowY = next > max ? 'auto' : 'hidden';
  };

  elements.input.addEventListener('input', autoResize, { signal });
  elements.input.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        elements.form.requestSubmit();
      }
    },
    { signal },
  );

  // ── Form submission ───────────────────────────────────────────────────────

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (isLoading) return;

    const question = elements.input.value.trim();
    if (!question) return;

    elements.input.value = '';
    autoResize();
    hideError();
    addMessage(question, 'user');

    const loadingEl = showLoading();
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, conversationId }),
      });

      const data = await response.json();
      loadingEl.remove();

      if (!response.ok) {
        isLoading = false;
        showError(data.error || 'An error occurred. Please try again.');
        return;
      }

      if (data.conversationId) conversationId = data.conversationId;
      typeBotMessage(data.answer, data.sources);
    } catch {
      loadingEl.remove();
      isLoading = false;
      showError('Failed to connect. Please check your connection and try again.');
    }
  };

  elements.form.addEventListener('submit', handleSubmit, { signal });

  // ── Message DOM helpers ───────────────────────────────────────────────────

  const addMessage = (content: string, type: 'bot' | 'user', sources: Source[] = []) => {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message chat-message-${type}`;
    const bubbleEl = document.createElement('div');
    bubbleEl.className = `chat-bubble chat-bubble-${type}`;
    const textEl = document.createElement('div');
    textEl.className = 'chat-text';
    textEl.innerHTML = formatMessageContent(content, type);
    bubbleEl.appendChild(textEl);
    if (type === 'bot') appendSources(bubbleEl, sources);
    messageEl.appendChild(bubbleEl);
    elements.messages.appendChild(messageEl);
    elements.messages.scrollTop = elements.messages.scrollHeight;
  };

  const showLoading = (): HTMLElement => {
    const loadingEl = document.createElement('div');
    loadingEl.className = 'chat-message chat-message-bot';
    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'chat-bubble chat-bubble-bot';
    const thinkEl = document.createElement('p');
    thinkEl.className   = 'chat-text thinking-text';
    thinkEl.textContent = 'Thinking...';
    const dotEl = document.createElement('div');
    dotEl.className = 'typing-indicator';
    dotEl.innerHTML = '<span></span><span></span><span></span>';
    bubbleEl.appendChild(thinkEl);
    bubbleEl.appendChild(dotEl);
    loadingEl.appendChild(bubbleEl);
    elements.messages.appendChild(loadingEl);
    elements.messages.scrollTop = elements.messages.scrollHeight;
    return loadingEl;
  };

  const showError = (message: string) => {
    elements.error.textContent = message;
    elements.error.classList.remove('chat-error-hidden');
  };

  const hideError = () => elements.error.classList.add('chat-error-hidden');

  // ── Typewriter effect ─────────────────────────────────────────────────────
  // Reveals the answer chunk-by-chunk. scrollTop is updated every ~20 ticks
  // (~320 ms) instead of every frame to avoid per-frame forced layout reflow.

  const typeBotMessage = (content: string, sources: Source[] = []) => {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message chat-message-bot';
    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'chat-bubble chat-bubble-bot';
    const textEl = document.createElement('div');
    textEl.className = 'chat-text';
    bubbleEl.appendChild(textEl);
    messageEl.appendChild(bubbleEl);
    elements.messages.appendChild(messageEl);
    messageEl.scrollIntoView({ behavior: 'instant', block: 'start' });

    let displayed = 0;
    let tickCount = 0;
    const CHARS_PER_TICK = 4;
    const TICK_MS        = 16;
    const SCROLL_EVERY   = 20; // scroll once per ~320 ms

    const tick = () => {
      if (displayed >= content.length) {
        textEl.innerHTML = formatMessageContent(content, 'bot');
        appendSources(bubbleEl, sources);
        elements.messages.scrollTop = elements.messages.scrollHeight;
        isLoading = false;
        return;
      }
      displayed = Math.min(displayed + CHARS_PER_TICK, content.length);
      textEl.textContent = content.slice(0, displayed);
      if (++tickCount % SCROLL_EVERY === 0) {
        elements.messages.scrollTop = elements.messages.scrollHeight;
      }
      setTimeout(tick, TICK_MS);
    };

    tick();
  };

  // ── Speech-to-text (Chrome / Edge only) ──────────────────────────────────
  // Hidden automatically on Safari / Firefox via the mic-hidden CSS class.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognition = (window as any).SpeechRecognition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    || (window as any).webkitSpeechRecognition;
  const micBtn = document.getElementById('chat-mic');

  if (SpeechRecognition && micBtn) {
    micBtn.classList.remove('chat-mic-hidden');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let recognition: any = null;
    let isListening = false;

    const stopListening = () => {
      if (!isListening) return;
      isListening = false;
      micBtn.classList.remove('chat-mic-listening');
      recognition?.stop();
    };

    const startListening = () => {
      recognition = new SpeechRecognition();
      recognition.lang            = 'en-US';
      recognition.continuous      = true;
      recognition.interimResults  = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('chat-mic-listening');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (e: any) => {
        if (!isListening) return;
        // Accumulate all results (interim + final) into one transcript string.
        elements.input.value = Array.from(
          e.results as Iterable<{ 0: { transcript: string } }>,
        )
          .map((r) => r[0].transcript)
          .join('');
        autoResize();
      };

      recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('chat-mic-listening');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (e: any) => {
        if (e.error === 'no-speech') return; // routine in continuous mode
        isListening = false;
        micBtn.classList.remove('chat-mic-listening');
      };

      recognition.start();
    };

    micBtn.addEventListener(
      'click',
      () => { if (isLoading) return; isListening ? stopListening() : startListening(); },
      { signal },
    );

    // Stop recording before the submit handler reads the input value.
    elements.form?.addEventListener('submit', stopListening, { capture: true, signal });
  }

  // ── Resizable panel ───────────────────────────────────────────────────────
  // Panel is anchored bottom-right (position: absolute; right: 0; bottom: 5rem).
  // Dragging the left handle leftward widens the panel; top handle upward talls it.

  const MIN_W = 280;
  const MIN_H = 300;

  elements.panel.querySelectorAll('[data-resize]').forEach((handle) => {
    (handle as HTMLElement).addEventListener(
      'mousedown',
      (e: MouseEvent) => {
        e.preventDefault();
        const type   = (handle as HTMLElement).dataset.resize;
        const startX = e.clientX;
        const startY = e.clientY;
        const startW = elements.panel.offsetWidth;
        const startH = elements.panel.offsetHeight;

        const onMove = (ev: MouseEvent) => {
          const dx = startX - ev.clientX;
          const dy = startY - ev.clientY;
          if (type === 'left' || type === 'corner') {
            elements.panel.style.width = `${Math.max(MIN_W, Math.min(startW + dx, window.innerWidth - 48))}px`;
          }
          if (type === 'top' || type === 'corner') {
            elements.panel.style.height = `${Math.max(MIN_H, Math.min(startH + dy, window.innerHeight - 140))}px`;
          }
        };

        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup',   onUp);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup',   onUp);
      },
      { signal },
    );
  });
}
