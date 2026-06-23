/**
 * 跃进铁道工作组 图片切换模块
 */

const imgUrls = [
  './assets/img/display/1.png',
  './assets/img/display/2.png',
  './assets/img/display/3.png',
  './assets/img/display/4.png',
  './assets/img/display/5.png',
  './assets/img/display/6.png',
  './assets/img/display/7.png',
  './assets/img/display/8.png'
];

const imgTexts = [
  'HXN5B 型机车',
  'DF5 型机车',
  'HXD1 型机车',
  '百年滇越行',
  '毛号HXD3D',
  '小站一角',
  'HXD1擦肩而过',
  'GK1E 型机车'
];

let currentIndex = 6;

function updateDisplay() {
  dspPic.style.backgroundImage = 'url('+imgUrls[currentIndex]+')';
  dspTxt.textContent = imgTexts[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imgUrls.length;
  updateDisplay();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
  updateDisplay();
}