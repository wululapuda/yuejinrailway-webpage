/**
 * 跃进铁道工作组 图片切换模块
 */

const imgUrls = [
  './assets/img/display/1.webp',
  './assets/img/display/2.webp',
  './assets/img/display/3.webp',
  './assets/img/display/4.webp',
  './assets/img/display/5.webp',
  './assets/img/display/6.webp',
  './assets/img/display/7.webp',
  './assets/img/display/8.webp',
  './assets/img/display/9.webp'
];

const imgTexts = [
  'HXN5B 型机车',
  'DF5 型机车',
  'HXD1 型机车',
  '百年滇越行',
  '毛号HXD3D',
  '25B型铁路客车',
  'HXD1擦肩而过',
  'GK1E 型机车',
  'DF9 型机车'
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