// app.js – Landing page logic

(function () {
  'use strict';

  const form      = document.getElementById('url-form');
  const input     = document.getElementById('study-url');
  const inputWrap = document.getElementById('input-wrap');
  const errorMsg  = document.getElementById('error-msg');

  /**
   * Parse a URL string (or partial query string) and extract the participantId.
   * Supports full URLs and raw query strings.
   */
  function extractParams(raw) {
    raw = raw.trim();
    if (!raw) return null;

    let search = '';

    // Try as full URL first
    try {
      const url = new URL(raw);
      search = url.search;
    } catch (_) {
      // Maybe it's just a query string like ?foo=bar or foo=bar
      search = raw.startsWith('?') ? raw : '?' + raw;
    }

    const params = new URLSearchParams(search);

    return {
      participantId:  params.get('participantId')  || '',
      studyId:        params.get('studyId')        || '',
      submissionId:   params.get('submissionId')   || '',
      taskType:       params.get('TASK_TYPE')      || '',
      page:           params.get('PAGE')           || '',
      pageSize:       params.get('PAGE_SIZE')      || '',
      step:           params.get('step')           || '',
    };
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    inputWrap.classList.add('error-state');
    input.focus();
  }

  function clearError() {
    errorMsg.textContent = '';
    inputWrap.classList.remove('error-state');
  }

  input.addEventListener('input', clearError);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    const raw = input.value.trim();

    if (!raw) {
      showError('Please paste your study URL first.');
      return;
    }

    const params = extractParams(raw);

    if (!params || !params.participantId) {
      showError('Could not find a participantId in the URL. Please check and try again.');
      return;
    }

    // Build the thank-you page URL with all params
    const dest = new URL('thankyou.html', window.location.href);
    Object.entries(params).forEach(([k, v]) => {
      if (v) dest.searchParams.set(k, v);
    });

    // Animate card out then redirect
    const card = document.getElementById('main-card');
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(-20px) scale(0.97)';

    setTimeout(function () {
      window.location.href = dest.toString();
    }, 300);
  });
})();
