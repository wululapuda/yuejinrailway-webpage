/**
 * 跃进铁道工作组 —— 卡片库渲染模块
 *
 * 车辆卡片数据统一存放在 assets/data/cards.js 中（window.CARD_LIBRARY），
 * 页面中的卡片不再硬编码在 HTML 里，只保留占位符，本脚本在页面打开时读取卡片库并渲染：
 *   data-card-category="机车|客车|货车|主题包"   指定渲染哪个大类（必填）
 *   data-card-group="电力机车"                  可选，只渲染该大类下的某个分组（机车/客车分类页用）
 *   data-card-random="4"                        可选，从该大类中随机抽取 N 张卡片展示（首页用）
 *
 * 修改车辆信息只需编辑 assets/data/cards.js，所有页面会同步更新。
 * 数据文件通过 <script> 标签加载（而非 fetch），因此本地双击打开 HTML 也能正常显示。
 *
 * 卡片数据中的 authors 只填作者代号（不带扩展名），本脚本会按 AUTHOR_EXT 对照表
 * 自动补齐 jpg/png 后缀；若新增的作者头像不是 jpg，请在 AUTHOR_EXT 中补充对应代号。
 *
 * 所有作者代号（头像文件均位于 assets/img/author/ 下）：
 *   wllpd（乌鲁拉普达）、i9（chuanshuoi9）、eE（eE....）、sq（苏秋1972）、mzsj（美洲大车司机）、
 *   crh1（CRH1-1145A）、djhjm（动检横截面）、lmy（露米娅）、fischer（Fischer）、yyxyyx（一行样样行）
 */
(function () {
  'use strict';

  /** 作者代号 → 头像扩展名（头像文件均位于 assets/img/author/ 下） */
  var AUTHOR_EXT = {
    wllpd: 'jpg',
    i9: 'jpg',
    eE: 'jpg',
    sq: 'jpg',
    mzsj: 'jpg',
    crh1: 'jpg',
    djhjm: 'jpg',
    lmy: 'jpg',
    fischer: 'jpg',
    yyxyyx: 'jpg'
  };

  /** 从数组中随机抽取 count 张（不重复），保持抽取顺序 */
  function sampleRandom(cards, count) {
    var pool = cards.slice();
    var n = Math.min(count, pool.length);
    for (var i = 0; i < n; i++) {
      var j = i + Math.floor(Math.random() * (pool.length - i));
      var tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    return pool.slice(0, n);
  }

  /** 根据卡片数据生成一个 <a><div class="secInfo_item">…</div></a> */
  function buildCard(card) {
    var a = document.createElement('a');
    if (card.link) {
      a.setAttribute('href', card.link);
    }

    var item = document.createElement('div');
    item.className = 'secInfo_item';

    var img = document.createElement('img');
    img.src = 'assets/img/' + card.img;
    item.appendChild(img);

    var h3 = document.createElement('h3');
    var span = document.createElement('span');
    span.className = 'highLightB';
    span.textContent = card.type || 'IR';
    h3.appendChild(span);
    h3.appendChild(document.createTextNode(card.name));
    item.appendChild(h3);

    var author = document.createElement('div');
    author.className = 'secInfo_Author';
    (card.authors || []).forEach(function (name) {
      var aImg = document.createElement('img');
      aImg.src = 'assets/img/author/' + name + '.' + (AUTHOR_EXT[name] || 'jpg');
      author.appendChild(aImg);
    });
    var p = document.createElement('p');
    p.textContent = card.desc || '';
    author.appendChild(p);
    item.appendChild(author);

    a.appendChild(item);
    return a;
  }

  /** 把卡片渲染到页面中所有占位符里 */
  function render(library) {
    var containers = document.querySelectorAll('.secInfo_body[data-card-category]');
    Array.prototype.forEach.call(containers, function (container) {
      var category = container.getAttribute('data-card-category');
      var group = container.getAttribute('data-card-group');
      var randomCount = container.getAttribute('data-card-random');

      var list = (library[category] || []).slice();
      if (group) {
        list = list.filter(function (card) {
          return card.group === group;
        });
      }
      if (randomCount) {
        list = sampleRandom(list, parseInt(randomCount, 10) || 0);
      }

      var frag = document.createDocumentFragment();
      list.forEach(function (card) {
        frag.appendChild(buildCard(card));
      });
      // 插到容器开头，使“查看更多”按钮保持在原有位置
      container.insertBefore(frag, container.firstChild);
    });
  }

  /** 卡片库缺失时给出提示 */
  function renderError() {
    var containers = document.querySelectorAll('.secInfo_body[data-card-category]');
    Array.prototype.forEach.call(containers, function (container) {
      var p = document.createElement('p');
      p.textContent = '卡片库加载失败：请确认页面已正确引入 assets/data/cards.js。';
      container.appendChild(p);
    });
  }

  function init() {
    var containers = document.querySelectorAll('.secInfo_body[data-card-category]');
    if (!containers.length) {
      return;
    }
    if (!window.CARD_LIBRARY) {
      console.error('[卡片库] 未找到 window.CARD_LIBRARY，请确认已引入 assets/data/cards.js');
      renderError();
      return;
    }
    render(window.CARD_LIBRARY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露卡片构建等接口，供搜索页等其它模块复用
  window.CardLib = {
    buildCard: buildCard,
    sampleRandom: sampleRandom
  };
})();
