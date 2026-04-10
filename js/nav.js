// 移动端导航滚动
var navLinks = {
  link1: 'news',
  link2: 'publications',
  link3: 'awards',
  link4: 'teaching',
  link5: 'professional',
  link6: 'opportunities'
};

Object.keys(navLinks).forEach(function (linkId) {
  var targetId = navLinks[linkId];
  document.getElementById(linkId).addEventListener('click', function (e) {
    e.preventDefault();
    var el = document.getElementById(targetId);
    var top = el.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});
