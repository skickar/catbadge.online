/* Tutorials index — renders cards from tutorials.json and drives tag filtering.
   Deep-link: tutorials/?tag=bit-pirate (or #tag=bit-pirate) pre-selects a filter. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  var TAGS = {}, LIST = [];

  function activeTag() {
    var m = (location.search + ' ' + location.hash).match(/[?&#]tag=([a-z0-9\-]+)/i);
    return m ? m[1].toLowerCase() : null;
  }

  function tagColor(t) { return (TAGS[t] && TAGS[t].color) || '#98a09a'; }
  function tagLabel(t) { return (TAGS[t] && TAGS[t].label) || t; }

  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

  function renderChips(sel) {
    var bar = $('tagbar');
    bar.querySelectorAll('.tagchip').forEach(function (n) { n.remove(); });
    // count guides per tag
    var counts = {};
    LIST.forEach(function (g) { (g.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    // "All" chip
    mkChip(bar, null, 'All', LIST.length, sel === null, '#14181b');
    // tags that actually appear, ordered by the registry order
    Object.keys(TAGS).forEach(function (t) {
      if (!counts[t]) return;
      mkChip(bar, t, tagLabel(t), counts[t], sel === t, tagColor(t));
    });
  }

  function mkChip(bar, tag, label, n, active, color) {
    var c = document.createElement('span');
    c.className = 'tagchip' + (active ? ' active' : '');
    c.innerHTML = esc(label) + ' <span class="n">' + n + '</span>';
    if (active) c.style.background = color;
    c.addEventListener('click', function () { select(tag); });
    bar.appendChild(c);
  }

  function cardTag(t, asLink) {
    var el = document.createElement(asLink ? 'a' : 'span');
    el.className = 'card-tag';
    el.style.background = tagColor(t);
    el.textContent = tagLabel(t);
    if (asLink) { el.href = '?tag=' + t; el.addEventListener('click', function (e) { e.preventDefault(); select(t); }); }
    return el;
  }

  function renderList(sel) {
    var wrap = $('guide-list');
    wrap.innerHTML = '';
    var shown = LIST.filter(function (g) { return !sel || (g.tags || []).indexOf(sel) !== -1; });
    if (!shown.length) {
      var e = document.createElement('div'); e.className = 'empty';
      e.textContent = '// no guides tagged "' + tagLabel(sel) + '" yet — check back soon.';
      wrap.appendChild(e); return;
    }
    // newest first by updated date
    shown.sort(function (a, b) { return (b.updated || '').localeCompare(a.updated || ''); });
    shown.forEach(function (g) {
      var card = document.createElement('div');
      card.className = 'guide-card';

      var main = document.createElement('div');
      var title = document.createElement('a');
      title.className = 'card-title'; title.href = g.url; title.textContent = g.title;
      var sum = document.createElement('div'); sum.className = 'card-sum'; sum.textContent = g.summary;
      var tags = document.createElement('div'); tags.className = 'card-tags';
      (g.tags || []).forEach(function (t) { tags.appendChild(cardTag(t, true)); });
      main.appendChild(title); main.appendChild(sum); main.appendChild(tags);

      var meta = document.createElement('div');
      meta.className = 'card-meta';
      if (g.difficulty) { var d = document.createElement('span'); d.className = 'diff'; d.textContent = g.difficulty; meta.appendChild(d); }
      if (g.minutes) { var m = document.createElement('span'); m.textContent = '~' + g.minutes + ' min'; meta.appendChild(m); }
      if (g.updated) { var u = document.createElement('span'); u.textContent = g.updated; meta.appendChild(u); }

      card.appendChild(main); card.appendChild(meta);
      // make the whole card clickable, but keep inner links working
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (ev) { if (ev.target.tagName !== 'A') location.href = g.url; });
      wrap.appendChild(card);
    });
  }

  function select(tag) {
    var url = tag ? ('?tag=' + tag) : location.pathname;
    history.replaceState(null, '', url);
    renderChips(tag);
    renderList(tag);
  }

  fetch('tutorials.json').then(function (r) { return r.json(); }).then(function (data) {
    TAGS = data.tags || {};
    LIST = data.tutorials || [];
    var sel = activeTag();
    if (sel && !anyHasTag(sel)) sel = null;
    renderChips(sel);
    renderList(sel);
  }).catch(function (e) {
    $('guide-list').innerHTML = '<div class="empty">// failed to load tutorials.json: ' + esc(e.message) + '</div>';
  });

  function anyHasTag(t) { return LIST.some(function (g) { return (g.tags || []).indexOf(t) !== -1; }); }
})();
