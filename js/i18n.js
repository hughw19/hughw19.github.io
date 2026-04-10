// 读取 URL 参数中的语言，优先于 localStorage
function getUrlLang() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('lang')) return params.get('lang');
  // 兼容 #hash?lang=xx 的情况
  var hash = window.location.hash;
  var idx = hash.indexOf('?');
  if (idx !== -1) {
    var hashParams = new URLSearchParams(hash.substring(idx));
    if (hashParams.get('lang')) return hashParams.get('lang');
  }
  return null;
}
var urlLang = getUrlLang();
var currentLang = urlLang || localStorage.getItem('lang') || 'en';

// 更新 OPPORTUNITIES 区域语言按钮状态
function updateOpportunitiesLangUI(lang) {
  if (lang === 'en') {
    $('.opportunities-language.cn').addClass('language-active');
    $('.opportunities-language.en').removeClass('language-active');
  } else {
    $('.opportunities-language.en').addClass('language-active');
    $('.opportunities-language.cn').removeClass('language-active');
  }
}

// 更新语言按钮状态
function updateLangUI(lang) {
  updateOpportunitiesLangUI(lang);
  $('.lang-btn').attr('src', lang === 'zh' ? './assets/en.png' : './assets/cn.png');
}

// 翻译渲染
function renderI18n(data) {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var keys = el.getAttribute('data-i18n').split('.');
    var value = data;
    for (var i = 0; i < keys.length; i++) {
      value = value && value[keys[i]];
    }
    if (typeof value === 'string') {
      el.innerHTML = value;
    }
  });
}

// 获取语言数据
function getLangData(lang) {
  return I18N_LANG_DATA[lang] || I18N_LANG_DATA['zh'];
}

// 更新跨站链接，追加 ?lang= 参数
function updateCrossSiteLinks(lang) {
  document.querySelectorAll('a[href*="PKU-EPIC.github.io"]').forEach(function (a) {
    var url = new URL(a.href);
    url.searchParams.set('lang', lang);
    a.href = url.toString();
  });
}

// 仅渲染 OPPORTUNITIES 区域的翻译
function renderOpportunitiesI18n(lang) {
  var data = getLangData(lang);
  var els = document.querySelectorAll('#opportunities [data-i18n]');
  console.log('[i18n] renderOpportunitiesI18n lang=' + lang + ', elements=' + els.length, ', data.opportunities=', data && data.opportunities);
  els.forEach(function (el) {
    var keys = el.getAttribute('data-i18n').split('.');
    var value = data;
    for (var i = 0; i < keys.length; i++) {
      value = value && value[keys[i]];
    }
    if (typeof value === 'string') {
      el.innerHTML = value;
    }
  });
}

// OPPORTUNITIES 区域独立语言切换（不影响全局）
function setOpportunitiesLang(lang) {
  console.log('[i18n] setOpportunitiesLang called with lang=' + lang);
  updateOpportunitiesLangUI(lang);
  renderOpportunitiesI18n(lang);
  document.getElementById('opportunities').setAttribute('data-lang', lang);
}

// 全局语言切换
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateLangUI(lang);
  renderI18n(getLangData(lang));
  document.getElementById('opportunities').setAttribute('data-lang', lang);
  updateCrossSiteLinks(lang);
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  // 语言初始化
  updateLangUI(currentLang);
  renderI18n(getLangData(currentLang));
  updateCrossSiteLinks(currentLang);
  // OPPORTUNITIES 区域默认中文，独立于全局语言
  setOpportunitiesLang('zh');

  // 如果是通过 URL 参数传入的语言，同步到 localStorage
  if (urlLang) {
    localStorage.setItem('lang', urlLang);
  }

  // 视频懒加载
  window.loadVideo = function (video) {
    if (video.dataset.loaded === 'true') return;
    var source = video.querySelector('source[data-src]');
    if (source && source.dataset.src) {
      source.src = source.dataset.src;
      video.load();
      video.dataset.loaded = 'true';
    }
  };

  // 手机版视频懒加载
  var phoneVideos = document.querySelectorAll('.swiper-content-phone video');
  var phoneObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          window.loadVideo(entry.target);
          phoneObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '200px' }
  );
  phoneVideos.forEach(function (video) {
    phoneObserver.observe(video);
  });

  // 语言切换按钮绑定
  document.getElementById('lang-cn').addEventListener('click', function () { console.log('[i18n] CN button clicked'); setOpportunitiesLang('zh'); });
  document.getElementById('lang-en').addEventListener('click', function () { console.log('[i18n] EN button clicked'); setOpportunitiesLang('en'); });
  document.getElementById('global-lang-toggle').addEventListener('click', function () {
    setLang(currentLang === 'zh' ? 'en' : 'zh');
  });
  document.getElementById('modal-lang-toggle').addEventListener('click', function () {
    setLang(currentLang === 'zh' ? 'en' : 'zh');
  });
});
