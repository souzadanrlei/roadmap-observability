/* =============================================
   MODAL SYSTEM — Roadmap Observability
   Shows rich topic details when clicking .btn
============================================= */

(function () {
  const overlay = document.getElementById('topicModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');
  const titleEl  = overlay.querySelector('.modal-title');
  const iconEl   = overlay.querySelector('.modal-icon');
  const levelEl  = overlay.querySelector('.modal-level');
  const bodyEl   = overlay.querySelector('.modal-body');

  function openModal(btn) {
    const key = btn.textContent.trim();
    const data = window.TOPICS && window.TOPICS[key];
    if (!data) return;

    iconEl.textContent  = data.icon  || '📖';
    titleEl.textContent = key;
    levelEl.textContent = data.level || '';
    levelEl.className   = 'modal-level level-badge ' + (data.levelClass || 'pleno');

    let html = '';

    if (data.description) {
      html += `<p>${data.description}</p>`;
    }

    if (data.concepts && data.concepts.length) {
      html += `<h4>📚 Conceitos Chave</h4><ul>${data.concepts.map(c => `<li>${c}</li>`).join('')}</ul>`;
    }

    if (data.tools && data.tools.length) {
      html += `<h4>🔧 Ferramentas</h4><div class="tag-list">${data.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
    }

    if (data.realCase) {
      html += `<h4>🏢 Caso Real</h4><p>${data.realCase}</p>`;
    }

    if (data.code) {
      html += `<h4>💻 Exemplo</h4><pre><code>${escapeHtml(data.code)}</code></pre>`;
    }

    if (data.bestPractices && data.bestPractices.length) {
      html += `<h4>✅ Boas Práticas</h4><ul>${data.bestPractices.map(b => `<li>${b}</li>`).join('')}</ul>`;
    }

    if (data.antiPatterns && data.antiPatterns.length) {
      html += `<h4>❌ Anti-patterns</h4><ul>${data.antiPatterns.map(a => `<li>${a}</li>`).join('')}</ul>`;
    }

    if (data.prerequisites && data.prerequisites.length) {
      html += `<h4>🔑 Pré-requisitos</h4><div class="tag-list">${data.prerequisites.map(p => `<span class="tag">${p}</span>`).join('')}</div>`;
    }

    if (data.nextSteps && data.nextSteps.length) {
      html += `<h4>➡️ Próximos Passos</h4><div class="tag-list">${data.nextSteps.map(n => `<span class="tag">${n}</span>`).join('')}</div>`;
    }

    if (data.certifications && data.certifications.length) {
      html += `<h4>🎓 Certificações</h4><ul>${data.certifications.map(c => `<li>${c}</li>`).join('')}</ul>`;
    }

    if (data.links && data.links.length) {
      html += `<h4>🔗 Links Úteis</h4><ul>${data.links.map(l => `<li><a href="${l.url}" target="_blank" rel="noopener" style="color:#79c8ff">${l.label}</a></li>`).join('')}</ul>`;
    }

    bodyEl.innerHTML = html;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Attach click handlers to all .btn elements
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
      openModal(e.target);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
