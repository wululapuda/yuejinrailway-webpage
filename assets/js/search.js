/**
 * 跃进铁道工作组 —— 车辆搜索模块
 *
 * 功能：
 *  1. 任意页面的导航栏搜索条中输入关键词，点击搜索按钮或按回车，
 *     跳转到 search.html?q=关键词 展示搜索结果。
 *  2. search.html 读取 URL 中的关键词，在卡片库（assets/data/cards.js）中
 *     搜索全部车辆：结果只按大类（机车/客车/货车/主题包）分组展示，
 *     组内按 A-Z 排序，不再区分“电力机车”等二级分组。
 *
 * 依赖：
 *  assets/data/cards.js —— window.CARD_LIBRARY（卡片数据）
 *  assets/js/cards.js   —— window.CardLib.buildCard（复用卡片构建）
 */
(function () {
  'use strict';

  /** 大类展示顺序与英文标题（与导航栏顺序一致） */
  var CATEGORY_META = [
    { key: '机车', en: 'LOCOMOTIVES' },
    { key: '客车', en: 'PASSENGERS' },
    { key: '货车', en: 'FREIGHTS' },
    { key: '主题包', en: 'THEME PACKS' }
  ];

  /** 从 URL 中读取 ?q= 关键词 */
  function getQuery() {
    var m = location.search.match(/[?&]q=([^&]*)/);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')).trim() : '';
  }

  /** 关键词是否匹配某张卡片（标题或描述文字，不区分大小写） */
  function matchCard(card, lower) {
    return (card.name && card.name.toLowerCase().indexOf(lower) !== -1) ||
           (card.desc && card.desc.toLowerCase().indexOf(lower) !== -1);
  }

  /** A-Z 排序：按描述文字（车型代码）升序，相同再按标题 */
  function compareAtoZ(a, b) {
    var x = (a.desc || '').toLowerCase();
    var y = (b.desc || '').toLowerCase();
    if (x < y) return -1;
    if (x > y) return 1;
    var nx = a.name || '';
    var ny = b.name || '';
    return nx < ny ? -1 : nx > ny ? 1 : 0;
  }

  /** 构造一个大类的结果区块 */
  function buildSection(meta, list, reversed) {
    var section = document.createElement('section');
    section.className = 'secInfo' + (reversed ? ' secInfoRv' : '');

    var h1 = document.createElement('h1');
    var span = document.createElement('span');
    span.className = 'highLightA';
    // 用 &nbsp;（\u00A0）代替普通空格，避免浏览器合并/忽略空格
    span.textContent = '\u00A0' + meta.key + '\u00A0';
    h1.appendChild(span);
    h1.appendChild(document.createTextNode('\u00A0' + meta.en));
    section.appendChild(h1);

    var body = document.createElement('div');
    body.className = 'secInfo_body';
    list.forEach(function (card) {
      body.appendChild(window.CardLib.buildCard(card));
    });
    section.appendChild(body);
    return section;
  }

  /** 构造一个 DeepSeek 风格的空结果提示卡片 */
  function buildEmpty(prefix, keyword, suffix, hint) {
    var card = document.createElement('div');
    card.className = 'ds-empty';

    var icon = document.createElement('div');
    icon.className = 'ds-empty-icon';
    icon.innerHTML = '<i class="fa fa-search"></i>';
    card.appendChild(icon);

    var title = document.createElement('p');
    title.className = 'ds-empty-title';
    title.appendChild(document.createTextNode(prefix));
    var k = document.createElement('span');
    k.className = 'ds-result-kw';
    k.textContent = keyword;
    title.appendChild(k);
    title.appendChild(document.createTextNode(suffix));
    card.appendChild(title);

    var hintP = document.createElement('p');
    hintP.className = 'ds-empty-hint';
    hintP.textContent = hint;
    card.appendChild(hintP);

    return card;
  }

  /** 渲染搜索结果到 #searchResult */
  function renderResults(library, q) {
    var container = document.getElementById('searchResult');
    if (!container) return;

    container.textContent = '';

    if (!q) {
      container.appendChild(buildEmpty('请输入搜索关键词', '', '', '在导航栏输入如 HXD1、25K、滇越 等关键词，点击搜索按钮或按回车。'));
      return;
    }

    var lower = q.toLowerCase();
    var matched = [];
    CATEGORY_META.forEach(function (meta) {
      var list = (library[meta.key] || [])
        .filter(function (card) { return matchCard(card, lower); })
        .slice()
        .sort(compareAtoZ);
      if (list.length) {
        matched.push({ meta: meta, list: list });
      }
    });

    var total = 0;
    matched.forEach(function (m) { total += m.list.length; });

    var frag = document.createDocumentFragment();

    // 结果统计标题（DeepSeek 风格卡片）
    var header = document.createElement('div');
    header.className = 'ds-result-header';
    var badge = document.createElement('span');
    badge.className = 'ds-result-badge';
    badge.textContent = '搜索结果';
    header.appendChild(badge);
    var info = document.createElement('span');
    info.className = 'ds-result-info';
    info.appendChild(document.createTextNode('关键词 '));
    var kw = document.createElement('span');
    kw.className = 'ds-result-kw';
    kw.textContent = '“' + q + '”';
    info.appendChild(kw);
    info.appendChild(document.createTextNode(' · 共 ' + total + ' 项'));
    header.appendChild(info);
    frag.appendChild(header);

    if (!total) {
      // 无结果提示（DeepSeek 风格卡片）
      frag.appendChild(buildEmpty('未找到与“', q, '”相关的车辆', '换个关键词试试吧～'));
    } else {
      matched.forEach(function (m, index) {
        frag.appendChild(buildSection(m.meta, m.list, index % 2 === 0));
      });
    }

    container.appendChild(frag);
  }

  /** 绑定页面导航栏中的搜索条 */
  function bindNavSearch() {
    var bars = document.querySelectorAll('.nav_search');
    Array.prototype.forEach.call(bars, function (bar) {
      var input = bar.querySelector('.nav_search_input');
      var btn = bar.querySelector('.nav_search_btn');
      if (!input || !btn) return;

      var go = function () {
        var q = input.value.trim();
        if (!q) {
          input.focus();
          return;
        }
        location.href = './search.html?q=' + encodeURIComponent(q);
      };

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        go();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function init() {
    bindNavSearch();

    var container = document.getElementById('searchResult');
    if (!container) return; // 非搜索页

    if (!window.CARD_LIBRARY) {
      container.textContent = '卡片库加载失败：请确认已引入 assets/data/cards.js。';
      return;
    }

    var q = getQuery();
    var input = document.querySelector('.nav_search_input');
    if (input) input.value = q;

    renderResults(window.CARD_LIBRARY, q);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
