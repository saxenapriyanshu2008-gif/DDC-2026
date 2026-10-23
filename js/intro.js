// DDC'26 opening intro. Plays when the site opens, then lifts away.
// "Sound on" restarts it with sound (browsers only allow audio after a click).

(function () {
  'use strict';
  var intro = document.getElementById('intro');
  if (!intro) return;
  var q = function (sel) { return intro.querySelector(sel); };
  var s1 = q('.intro__s1'), bu = q('.intro__bu'), s2 = q('.intro__s2'), flash = q('.intro__flash');
  var words = intro.querySelectorAll('.intro__word'), meta = q('.intro__meta');
  var timers = [], audio = null;

  // ---------- sound ----------
  function ctx() {
    if (!audio) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; audio = new A(); }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }
  function noise(ac, at, dur, vol, freq) {
    var n = Math.floor(ac.sampleRate * dur), buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
    var src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; g.gain.value = vol;
    src.connect(f).connect(g).connect(ac.destination); src.start(at);
  }
  function boom(ac, at, big) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.frequency.setValueAtTime(big ? 150 : 120, at);
    o.frequency.exponentialRampToValueAtTime(38, at + 0.35);
    g.gain.setValueAtTime(big ? 1.0 : 0.75, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + (big ? 1.4 : 0.6));
    o.connect(g).connect(ac.destination); o.start(at); o.stop(at + 1.5);
    noise(ac, at, big ? 0.5 : 0.18, big ? 0.35 : 0.2, 1800);
  }
  function blip(ac, at, hz, vol) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = 'square'; o.frequency.value = hz;
    g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(0.001, at + 0.12);
    o.connect(g).connect(ac.destination); o.start(at); o.stop(at + 0.15);
  }
  function riser(ac, at, dur) {
    var o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(120, at); o.frequency.exponentialRampToValueAtTime(1400, at + dur);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.12, at + dur);
    f.type = 'lowpass'; f.frequency.setValueAtTime(400, at); f.frequency.exponentialRampToValueAtTime(5000, at + dur);
    o.connect(f).connect(g).connect(ac.destination); o.start(at); o.stop(at + dur + 0.02);
  }
  function score() {
    var ac = ctx(); if (!ac) return;
    var t = ac.currentTime + 0.05, i;
    for (i = 0; i < 5; i++) noise(ac, t + 0.1 + i * 0.12, 0.05, 0.25, 3000 + i * 400);
    for (i = 0; i < 8; i++) blip(ac, t + 0.75 + i * 0.045, 1600 + i * 60, 0.04);
    noise(ac, t + 1.6, 0.7, 0.35, 700);                                   // blinds open on Bennett
    for (i = 0; i < 8; i++) blip(ac, t + 1.65 + i * 0.055, 600 + i * 90, 0.03);
    riser(ac, t + 2.75, 0.85);
    boom(ac, t + 3.65, true);                                             // DDC'26 slam
    boom(ac, t + 4.25, false); boom(ac, t + 4.5, false); boom(ac, t + 4.75, false);
    noise(ac, t + 6.15, 0.6, 0.3, 900);
  }

  // ---------- timeline ----------
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function reset() {
    timers.forEach(clearTimeout); timers = [];
    intro.className = 'intro';
    s1.className = 'intro__s1'; bu.className = 'intro__bu'; s2.className = 'intro__s2';
    flash.className = 'intro__flash'; meta.className = 'intro__meta';
    for (var i = 0; i < words.length; i++) words[i].classList.remove('on');
    void intro.offsetWidth;
  }
  function play(withSound) {
    reset();
    document.body.classList.add('intro-open');
    if (withSound) score();
    at(80, function () { s1.classList.add('on'); });
    at(1500, function () { s1.classList.add('out'); });
    at(1650, function () { bu.classList.add('on'); });
    at(3500, function () { bu.classList.add('out'); });
    at(3650, function () { flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); s2.classList.add('on'); });
    at(4250, function () { words[0].classList.add('on'); });
    at(4500, function () { words[1].classList.add('on'); });
    at(4750, function () { words[2].classList.add('on'); });
    at(5100, function () { meta.classList.add('on'); });
    at(6200, finish);
  }
  function finish() {
    timers.forEach(clearTimeout); timers = [];
    intro.classList.add('lift');
    document.body.classList.remove('intro-open');
    at(720, function () { intro.classList.add('is-gone'); });
  }

  q('[data-intro="skip"]').addEventListener('click', finish);
  q('[data-intro="sound"]').addEventListener('click', function () { play(true); });

  play(false);
})();
