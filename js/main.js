// 响应式布局
function onresizeFun() {
  if (window.innerWidth <= 768) {
    var width = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = 100 * (width / 430) + 'px';
    $('.head-pc').css('display', 'none');
    $('.icon').css('display', 'none');
    $('.swiper-content').css('display', 'none');
    $('.head-phone').css('display', 'flex');
    $('.icon-phone').css('display', 'flex');
    $('.swiper-content-phone').css('display', 'block');
  } else {
    $('.head-pc').css('display', 'flex');
    $('.icon').css('display', 'flex');
    $('.swiper-content').css('display', 'block');
    $('.swiper-content-phone').css('display', 'none');
    $('.head-phone').css('display', 'none');
    $('.icon-phone').css('display', 'none');
  }
  $('.main').css('display', 'block');
}

// PC 视频自动播放
function autoPlayVideo() {
  var videosContainer = document.getElementById('videos');
  if (!videosContainer) return;
  var videos = videosContainer.querySelectorAll('.swiper-content video');

  function checkVisibility(video) {
    var rect = video.getBoundingClientRect();
    var containerRect = videosContainer.getBoundingClientRect();
    return (
      rect.top >= containerRect.top &&
      rect.left >= containerRect.left &&
      rect.bottom <= containerRect.bottom &&
      rect.right <= containerRect.right
    );
  }

  function controlVideoPlayback() {
    videos.forEach(function (video) {
      if (checkVisibility(video)) {
        if (window.loadVideo) window.loadVideo(video);
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    });
  }

  controlVideoPlayback();
  videosContainer.addEventListener('scroll', controlVideoPlayback);
  window.addEventListener('resize', controlVideoPlayback);
}

// bibtex 显示/隐藏
function hideshow(a, which) {
  if (!document.getElementById) return;
  if (which.style.display === 'block') {
    which.style.display = 'none';
    a.style.background = 'none';
  } else {
    which.style.display = 'block';
    a.style.background = 'rgba(189,220,255,0.30)';
  }
}

// 初始化
onresizeFun();
window.addEventListener('resize', onresizeFun);

document.addEventListener('DOMContentLoaded', function () {
  // 菜单点击事件
  $('.menu-phone').click(function () {
    $('.modal').addClass('modal-active');
    $('body').addClass('noscroll');
  });
  $('.modal-close').click(function () {
    $('.modal').removeClass('modal-active');
    $('body').removeClass('noscroll');
  });
  $('.modal-content-item').click(function () {
    $(this).siblings('.modal-content-item').removeClass('item-active');
    $(this).addClass('item-active');
    $('.modal').removeClass('modal-active');
    $('body').removeClass('noscroll');
  });

  if (window.innerWidth > 768) {
    autoPlayVideo();
  }
});
