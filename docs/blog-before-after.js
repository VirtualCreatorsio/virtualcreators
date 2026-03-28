/**
 * Before/after image comparison for blog posts.
 * Expects [data-blog-ba] with .blog-ba-viewport, .blog-ba-clip, .blog-ba-handle, --ba 0–100.
 */
(function () {
  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function clientXToPercent(viewport, clientX) {
    var rect = viewport.getBoundingClientRect();
    if (rect.width <= 0) return 50;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function intrinsicHeightAtWidth(img, w) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return 0;
    return (w * img.naturalHeight) / img.naturalWidth;
  }

  function syncBaViewportSize(viewport) {
    var w = viewport.clientWidth;
    if (w <= 0) return;
    var afterImg = viewport.querySelector('.blog-ba-after');
    var beforeImg = viewport.querySelector('.blog-ba-before');
    var hAfter = intrinsicHeightAtWidth(afterImg, w);
    var hBefore = intrinsicHeightAtWidth(beforeImg, w);
    var h = Math.max(hAfter, hBefore);

    if (h > 0) {
      viewport.style.height = h + 'px';
      viewport.classList.add('blog-ba-viewport--sized');
      viewport.style.setProperty('--ba-vw', w + 'px');
      viewport.style.setProperty('--ba-vh', h + 'px');
      return;
    }

    viewport.style.height = '';
    viewport.classList.remove('blog-ba-viewport--sized');
    var r = viewport.getBoundingClientRect();
    viewport.style.setProperty('--ba-vw', r.width + 'px');
    viewport.style.setProperty('--ba-vh', Math.max(r.height, 1) + 'px');
  }

  function init(root) {
    var viewport = root.querySelector('.blog-ba-viewport');
    var handle = root.querySelector('.blog-ba-handle');
    var clip = root.querySelector('.blog-ba-clip');
    if (!viewport || !handle || !clip) return;

    syncBaViewportSize(viewport);
    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(function () {
        syncBaViewportSize(viewport);
      });
      ro.observe(viewport);
    } else {
      window.addEventListener('resize', function () {
        syncBaViewportSize(viewport);
      });
    }
    var afterImg = viewport.querySelector('.blog-ba-after');
    var beforeImg = viewport.querySelector('.blog-ba-before');
    function onImgLoad() {
      syncBaViewportSize(viewport);
    }
    if (afterImg && !afterImg.complete) afterImg.addEventListener('load', onImgLoad);
    if (beforeImg && !beforeImg.complete) beforeImg.addEventListener('load', onImgLoad);
    requestAnimationFrame(function () {
      syncBaViewportSize(viewport);
      requestAnimationFrame(function () {
        syncBaViewportSize(viewport);
      });
    });

    var start = clamp(parseFloat(root.getAttribute('data-ba-start')) || 50, 2, 98);
    var pos = start;
    var dragging = false;
    var dragStartX = 0;
    var dragDidMove = false;
    var suppressViewportClick = false;

    function setPos(p) {
      pos = clamp(p, 0, 100);
      root.style.setProperty('--ba', String(pos));
      handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      var beforeLabel = root.getAttribute('data-ba-label-before') || 'Before';
      var afterLabel = root.getAttribute('data-ba-label-after') || 'After';
      handle.setAttribute(
        'aria-valuetext',
        Math.round(pos) + '% ' + beforeLabel + ' visible, ' + (100 - Math.round(pos)) + '% ' + afterLabel
      );
    }

    setPos(start);

    handle.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 25 : 5;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        setPos(pos - step);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        setPos(pos + step);
        e.preventDefault();
      } else if (e.key === 'Home') {
        setPos(0);
        e.preventDefault();
      } else if (e.key === 'End') {
        setPos(100);
        e.preventDefault();
      }
    });

    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragDidMove = false;
      suppressViewportClick = false;
      try {
        handle.setPointerCapture(e.pointerId);
      } catch (err) {}
      setPos(clientXToPercent(viewport, e.clientX));
      e.preventDefault();
    });

    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      if (Math.abs(e.clientX - dragStartX) > 6) dragDidMove = true;
      setPos(clientXToPercent(viewport, e.clientX));
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (dragDidMove) suppressViewportClick = true;
      try {
        if (e.pointerId !== undefined) handle.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);

    viewport.addEventListener('click', function (e) {
      if (e.target === handle || handle.contains(e.target)) return;
      if (suppressViewportClick) {
        suppressViewportClick = false;
        return;
      }
      setPos(clientXToPercent(viewport, e.clientX));
    });
  }

  function run() {
    document.querySelectorAll('[data-blog-ba]').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
