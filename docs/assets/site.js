// Clause — the site: the language, the opening bloom, the download, the film.
;(function () {
  var doc = document.documentElement
  var REPO = 'dingma248-stack/Clause-release'
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var $ = function (s, r) {
    return (r || document).querySelector(s)
  }
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s))
  }
  var lang = function () {
    return doc.getAttribute('data-lang') === 'zh' ? 'zh' : 'en'
  }

  /* ---------------------------------------------------------------- language */

  var TITLES = {
    en: ['Clause: every AI model, one quiet workspace', 'Clause is a free Windows app for DeepSeek, Qwen, Kimi, GPT, Claude and models on your own PC. It works in your folders, runs agents, researches the web and makes slides, and asks before it changes anything.'],
    zh: ['Clause：所有模型，一个安静的工作台', 'Clause 是免费的 Windows 应用，接 DeepSeek、通义千问、Kimi、GPT、Claude 和你电脑上的本地模型。它能在你的文件夹里工作、派出子智能体、上网研究、做 PPT，改动任何东西之前都会先问你。'],
  }
  function setLang(l, save) {
    doc.setAttribute('data-lang', l)
    doc.lang = l === 'zh' ? 'zh-CN' : 'en'
    document.title = TITLES[l][0]
    var d = $('meta[name="description"]')
    if (d) d.setAttribute('content', TITLES[l][1])
    $$('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l))
    })
    // what is read out instead of shown: the pictures' descriptions, the labels of the page's parts
    $$('[data-zh-alt]').forEach(function (el) {
      if (!el.hasAttribute('data-en-alt')) el.setAttribute('data-en-alt', el.getAttribute('alt') || '')
      el.setAttribute('alt', el.getAttribute(l === 'zh' ? 'data-zh-alt' : 'data-en-alt'))
    })
    $$('[data-zh-label]').forEach(function (el) {
      if (!el.hasAttribute('data-en-label')) el.setAttribute('data-en-label', el.getAttribute('aria-label') || '')
      el.setAttribute('aria-label', el.getAttribute(l === 'zh' ? 'data-zh-label' : 'data-en-label'))
    })
    $$('img[data-shot]').forEach(function (img) {
      var src = 'assets/shots/' + l + '/' + img.getAttribute('data-shot') + '.webp'
      if (img.getAttribute('src') !== src) img.setAttribute('src', src)
    })
    filmLang(l)
    if (save) {
      try {
        localStorage.setItem('clause-lang', l)
      } catch (e) {}
      try {
        var u = new URL(location.href)
        if (u.searchParams.has('lang')) {
          u.searchParams.set('lang', l)
          history.replaceState(null, '', u)
        }
      } catch (e) {}
    }
  }
  $$('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.getAttribute('data-set-lang'), true)
    })
  })
  $$('[data-toggle-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(lang() === 'zh' ? 'en' : 'zh', true)
    })
  })

  /* --------------------------------------------------------------------- nav */

  var nav = $('.nav')
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  /* ------------------------------------------------------- the mark blooming */

  // the app's own opening: the mark turns into place, the core swells, petal after petal unfolds
  var PETALS = [
    [4.5, 341.75, 27.75],
    [46.25, 27.75, 73],
    [86, 73, 109],
    [136.25, 109, 158.25],
    [192, 158.25, 211.75],
    [230.5, 211.75, 254.25],
    [272.25, 254.25, 295.75],
    [316.75, 295.75, 341.75],
  ]
  function spring(zeta, omega) {
    var pts = []
    var wd = omega * Math.sqrt(1 - zeta * zeta)
    for (var i = 0; i <= 60; i++) {
      var t = (i / 60) * (7 / (zeta * omega))
      var v = 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t))
      pts.push(i === 60 ? '1' : v.toFixed(4))
    }
    return 'linear(' + pts.join(', ') + ')'
  }
  var linearOK = window.CSS && CSS.supports && CSS.supports('animation-timing-function', 'linear(0, 1)')
  var BLOOM = linearOK ? spring(0.5, 13) : 'cubic-bezier(0.34, 1.4, 0.64, 1)'
  var SETTLE = linearOK ? spring(0.72, 11) : 'cubic-bezier(0.22, 1.2, 0.36, 1)'
  var stretch = function (axis, len) {
    var wid = 1 - (len - 1) * 0.35
    return 'rotate(' + axis + 'deg) scale(' + wid.toFixed(4) + ', ' + len.toFixed(4) + ') rotate(' + -axis + 'deg)'
  }
  function build(el) {
    var rot = document.createElement('span')
    rot.className = 'rot'
    PETALS.forEach(function (p) {
      var span = (p[2] - p[1] + 360) % 360
      var g = 'conic-gradient(from ' + (p[1] - 0.6) + 'deg at 50% 50%, #000 0deg ' + (span + 1.2) + 'deg, transparent ' + (span + 1.2) + 'deg)'
      var l = document.createElement('span')
      l.className = 'layer petal'
      l.style.webkitMaskImage = g
      l.style.maskImage = g
      rot.appendChild(l)
    })
    var core = document.createElement('span')
    core.className = 'layer core'
    rot.appendChild(core)
    el.appendChild(rot)
    el.classList.add('built')
    return { rot: rot, core: core, petals: $$('.petal', rot) }
  }
  var hero = $('.hero')
  function opening() {
    var mark = $('.spark.bloom')
    if (!mark || reduced || typeof mark.animate !== 'function') {
      if (hero) hero.classList.add('on')
      return
    }
    var s = build(mark)
    var halo = $('.halo')
    var d = 120
    if (halo)
      halo.animate(
        [
          { opacity: 0, transform: 'scale(0.45)' },
          { opacity: 1, transform: 'scale(0.85)', offset: 0.3 },
          { opacity: 0, transform: 'scale(1.35)' },
        ],
        { duration: 2600, delay: d - 40, easing: 'ease-out', fill: 'both' },
      )
    mark.animate([{ transform: 'scale(0.727)' }, { transform: 'scale(1)' }], { duration: 1100, delay: d, easing: BLOOM, fill: 'backwards' })
    s.core.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 700, delay: d, easing: BLOOM, fill: 'backwards' })
    s.rot.animate([{ transform: 'rotate(-50deg)' }, { transform: 'rotate(0deg)' }], { duration: 1300, delay: d, easing: SETTLE, fill: 'backwards' })
    s.petals.forEach(function (p, i) {
      var a = PETALS[i][0]
      p.animate([{ transform: stretch(a, 0.05), opacity: 0 }, { transform: stretch(a, 1), opacity: 1 }], {
        duration: 900,
        delay: d + 80 + (a / 360) * 420,
        easing: BLOOM,
        fill: 'backwards',
      })
    })
    if (hero) requestAnimationFrame(function () {
      hero.classList.add('on')
    })
  }
  // the mark's picture first, so it doesn't bloom empty
  var img = new Image()
  img.onload = img.onerror = opening
  img.src = 'assets/spark.webp'

  /* ---------------------------------------------------------------- download */

  var got = $('#got')
  var isWindows = /Windows/i.test(navigator.userAgent) && !/Windows Phone/i.test(navigator.userAgent)
  if (navigator.userAgentData && navigator.userAgentData.platform) isWindows = /Windows/i.test(navigator.userAgentData.platform)
  $$('[data-download]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!got) return
      got.hidden = false
      var other = $('.got-other', got)
      if (other) other.hidden = isWindows
      got.style.animation = 'none'
      void got.offsetWidth
      got.style.animation = ''
    })
  })
  $$('[data-got-close]').forEach(function (b) {
    b.addEventListener('click', function () {
      got.hidden = true
    })
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && got && !got.hidden) got.hidden = true
  })

  // the newest version, as GitHub has it (the page says nothing when it can't find out)
  function mb(n) {
    return (n / 1048576).toFixed(0) + ' MB'
  }
  try {
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) {
        return r.ok ? r.json() : null
      })
      .then(function (j) {
        if (!j || !j.tag_name) return
        var v = String(j.tag_name).replace(/^v/, '')
        var exe = (j.assets || []).filter(function (x) {
          return x.name === 'Clause-Setup-x64.exe'
        })[0]
        if (!exe) return
        $$('[data-version]').forEach(function (el) {
          el.textContent = v
        })
        $$('[data-size]').forEach(function (el) {
          el.textContent = mb(exe.size)
        })
        $$('.meta .ver').forEach(function (el) {
          el.hidden = false
        })
      })
      .catch(function () {})
  } catch (e) {}

  /* -------------------------------------------------------------------- film */

  var film = $('.film')
  var video = $('[data-film]')
  var userPaused = false
  function filmLang(l) {
    if (!video) return
    var src = $('source', video)
    // a phone gets the 720p one
    var small = window.matchMedia && window.matchMedia('(max-width: 760px)').matches
    var want = 'media/clause-' + l + (small ? '-720' : '') + '.mp4'
    video.setAttribute('poster', 'media/poster-' + l + '.jpg')
    if (src.getAttribute('src') === want) return
    var playing = !video.paused
    src.setAttribute('src', want)
    video.load()
    if (playing) video.play().catch(function () {})
  }
  function play() {
    if (!video) return
    var p = video.play()
    if (p && p.catch) p.catch(function () {})
  }
  if (video) {
    video.addEventListener('play', function () {
      film.classList.add('playing')
    })
    video.addEventListener('pause', function () {
      film.classList.remove('playing')
    })
    video.addEventListener('click', function () {
      if (video.paused) {
        userPaused = false
        play()
      } else {
        userPaused = true
        video.pause()
      }
    })
    $$('[data-film-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        userPaused = false
        play()
      })
    })
    $$('[data-play]').forEach(function (a) {
      a.addEventListener('click', function () {
        userPaused = false
        setTimeout(play, reduced ? 0 : 450)
      })
    })
    // it plays while it's in view (silently: it has no sound), unless you paused it
    if ('IntersectionObserver' in window && !reduced) {
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting && e.intersectionRatio > 0.55) {
              if (!userPaused) play()
            } else if (!video.paused) video.pause()
          })
        },
        { threshold: [0, 0.55, 1] },
      ).observe(video)
    }
  }

  setLang(lang(), false)
})()
