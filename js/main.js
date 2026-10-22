// DDC 2026 · ACM Student Chapter, Bennett University
// Live countdown to the event, plus a small trailer helper.

(function () {
  'use strict';

  // ---------- countdown ----------
  var box = document.getElementById('countdown');
  if (box) {
    var target = new Date(box.getAttribute('data-target')).getTime();
    var parts = {
      days: box.querySelector('[data-unit="days"]'),
      hours: box.querySelector('[data-unit="hours"]'),
      mins: box.querySelector('[data-unit="mins"]'),
      secs: box.querySelector('[data-unit="secs"]')
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };

    var tick = function () {
      var left = isNaN(target) ? 0 : Math.max(0, target - Date.now());
      var d = Math.floor(left / 86400000); left -= d * 86400000;
      var h = Math.floor(left / 3600000); left -= h * 3600000;
      var m = Math.floor(left / 60000); left -= m * 60000;
      var s = Math.floor(left / 1000);
      parts.days.textContent = pad(d);
      parts.hours.textContent = pad(h);
      parts.mins.textContent = pad(m);
      parts.secs.textContent = pad(s);
      if (d + h + m + s === 0) clearInterval(timer);
    };
    tick();
    var timer = setInterval(tick, 1000);
  }

  // ---------- trailer: pause when scrolled away ----------
  var video = document.querySelector('.video-frame video');
  if (video && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting && !video.paused) video.pause();
      });
    }, { threshold: 0.25 }).observe(video);
  }

  // ---------- gallery: pin the section and slide the cards sideways with the scroll ----------
  var gallery = document.getElementById('gallery');
  var track = document.getElementById('galleryTrack');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (gallery && track && !still) {
    var distance = 0;
    var size = function () {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      gallery.style.height = (window.innerHeight + distance) + 'px';
      move();
    };
    var move = function () {
      var top = gallery.getBoundingClientRect().top;
      var p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0;
      track.style.transform = 'translate3d(' + (-p * distance) + 'px, 0, 0)';
    };
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { move(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', size);
    window.addEventListener('load', size);
    size();
  }
})();
