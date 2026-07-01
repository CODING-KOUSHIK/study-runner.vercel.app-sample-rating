// thankyou.js – Thank-You page logic

(function () {
  'use strict';

  const params        = new URLSearchParams(window.location.search);
  const participantId = params.get('participantId') || '';
  const studyId       = params.get('studyId')       || '';
  const submissionId  = params.get('submissionId')  || '';
  const taskType      = params.get('taskType')      || params.get('TASK_TYPE') || '';
  const page          = params.get('page')          || params.get('PAGE')      || '';
  const pageSize      = params.get('pageSize')      || params.get('PAGE_SIZE') || '';
  const step          = params.get('step')          || '';

  // If no participantId, redirect back to landing
  if (!participantId) {
    window.location.replace('index.html');
    return;
  }

  // Populate participant ID
  const pidEl = document.getElementById('pid-value');
  if (pidEl) pidEl.textContent = participantId;

  // Update page <title>
  document.title = 'Thank You – Study Runner';

  // Build meta pills
  const metaPills = [];

  if (studyId)     metaPills.push({ label: 'Study ID',      value: studyId });
  if (submissionId)metaPills.push({ label: 'Submission ID', value: submissionId });
  if (taskType)    metaPills.push({ label: 'Task Type',     value: taskType });
  if (step)        metaPills.push({ label: 'Step',          value: step });
  if (page)        metaPills.push({ label: 'Page',          value: page });
  if (pageSize)    metaPills.push({ label: 'Page Size',     value: pageSize });

  const grid = document.getElementById('meta-grid');
  if (grid && metaPills.length > 0) {
    grid.innerHTML = metaPills.map(function (p) {
      return (
        '<div class="meta-pill">' +
          '<span class="meta-pill-label">' + escHtml(p.label) + '</span>' +
          '<span class="meta-pill-value" title="' + escHtml(p.value) + '">' + escHtml(p.value) + '</span>' +
        '</div>'
      );
    }).join('');
  } else if (grid) {
    grid.style.display = 'none';
    document.querySelector('.divider').style.display = 'none';
  }

  // Copy button
  const copyBtn   = document.getElementById('copy-btn');
  const copyLabel = document.getElementById('copy-label');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      if (!navigator.clipboard) {
        legacyCopy(participantId);
        return;
      }
      navigator.clipboard.writeText(participantId).then(function () {
        onCopied();
      }).catch(function () {
        legacyCopy(participantId);
      });
    });
  }

  function onCopied() {
    copyBtn.classList.add('copied');
    copyLabel.textContent = 'Copied!';
    setTimeout(function () {
      copyBtn.classList.remove('copied');
      copyLabel.textContent = 'Copy';
    }, 2000);
  }

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); onCopied(); } catch (_) {}
    document.body.removeChild(ta);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
