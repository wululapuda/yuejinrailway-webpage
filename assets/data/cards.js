/**
 * 跃进铁道工作组 车辆卡片库
 *
 * 修改本文件即可在所有页面上同步更新车辆卡片信息
 * 每个大类是一个数组，数组中的每个对象代表一张卡片：
 *   name    = 卡片标题
 *   img     = assets/img 下的图片文件名
 *   authors = 作者代号列表（只写代号、不带扩展名，渲染脚本会自动补齐 jpg/png 后缀）
 *   type    = 标题前的亮色前缀文字（如 IR）
 *   desc    = 卡片右下角的描述文字
 *   link    = 可选，卡片点击跳转的链接
 *   group   = 可选，卡片所属分组（机车页与客车页按分组展示，如“电力机车”）
 *
 * 现有作者代号（头像文件均位于 assets/img/author/ 下）：
 *   wllpd（乌鲁拉普达）、i9（chuanshuoi9）、eE（eE....）、sq（苏秋1972）、mzsj（美洲大车司机）、
 *   crh1（CRH1-1145A）、djhjm（动检横截面）、lmy（露米娅）、fischer（Fischer）、yyxyyx（一行样样行）
 */
window.CARD_LIBRARY = {
  "机车": [
    {
      "group": "电力机车",
      "name": "HXD3D型电力机车1893号",
      "img": "HXD3d-1893.jpg",
      "authors": ["wllpd", "mzsj"],
      "type": "IR",
      "desc": "HXD3D 1893",
      "link": "https://afdian.com/item/8e4c2d0e04e311f1935452540025c377"
    },
    {
      "group": "电力机车",
      "name": "SS3B型电力机车",
      "img": "SS3B.png",
      "authors": ["wllpd", "crh1"],
      "type": "IR",
      "desc": "SS3B",
      "link": "https://yuejingroup.lanzn.com/iAed13hia3mj"
    },
    {
      "group": "电力机车",
      "name": "HXD1型电力机车",
      "img": "HXD1.png",
      "authors": ["wllpd", "i9"],
      "type": "IR",
      "desc": "HXD1"
    },
    {
      "group": "电力机车",
      "name": "SS3型电力机车",
      "img": "ss3.png",
      "authors": ["wllpd", "i9"],
      "type": "IR",
      "desc": "SS3"
    },
    {
      "group": "内燃机车",
      "name": "东方红21型内燃机车",
      "img": "dfh21.png",
      "authors": ["wllpd", "mzsj"],
      "type": "IR",
      "desc": "DFH-21",
      "link": "https://yuejingroup.lanzn.com/iWjrO3mi4txa"
    },
    {
      "group": "内燃机车",
      "name": "DF21型内燃机车",
      "img": "df21.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "DF21"
    },
    {
      "group": "内燃机车",
      "name": "DFH-5型内燃机车",
      "img": "dfh5.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "DFH-5",
      "link": "https://afdian.com/p/b7bf1c405f1c11f0ba5c5254001e7c00"
    },
    {
      "group": "内燃机车",
      "name": "DF5型内燃机车",
      "img": "DF5.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "DF5",
      "link": "https://yuejingroup.lanzn.com/iFN6a3hi9v6f"
    },
    {
      "group": "内燃机车",
      "name": "GK1E型内燃机车",
      "img": "gk1e.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "GK1E"
    },
    {
      "group": "内燃机车",
      "name": "DF4B型内燃机车",
      "img": "df4b.png",
      "authors": ["wllpd", "i9"],
      "type": "IR",
      "desc": "DF4B"
    },
    {
      "group": "内燃机车",
      "name": "ND5-I型内燃机车",
      "img": "ND5I.png",
      "authors": ["i9", "wllpd"],
      "type": "IR",
      "desc": "ND5-I"
    },
    {
      "group": "内燃机车",
      "name": "HXN5B型内燃机车",
      "img": "HXN5.png",
      "authors": ["i9", "wllpd"],
      "type": "IR",
      "desc": "HXN5B",
      "link": "https://yuejingroup.lanzn.com/ihSRi3hf7ycj"
    },
    {
      "group": "蒸汽机车",
      "name": "上游型蒸汽机车",
      "img": "sy1770.jpg",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "SY 1770"
    }
  ],
  "客车": [
    {
      "group": "国铁现代客车",
      "name": "国铁25K系客车",
      "img": "25k.png",
      "authors": ["eE", "wllpd"],
      "type": "IR",
      "desc": "YZ-25K",
      "link": "./detail/yz25k.html"
    },
    {
      "group": "国铁现代客车",
      "name": "国铁YZ-25B型硬座车(2.1)",
      "img": "YZ-25B.png",
      "authors": ["sq"],
      "type": "IR",
      "desc": "YZ-25B",
      "link": "./detail/yz25b.html"
    },
    {
      "group": "国铁现代客车",
      "name": "国铁WX-25K轨道检查车",
      "img": "WX25K.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "WX-25K",
      "link": "https://yuejingroup.lanzn.com/ithJk30vaz8d"
    },
    {
      "group": "国铁初期客车",
      "name": "国铁21系客车(4.0)",
      "img": "YZ-21.png",
      "authors": ["sq"],
      "type": "IR",
      "desc": "YZ/YW/XL/UZ-21",
      "link": "https://yuejingroup.lanzoup.com/iHAWX2m72x7e"
    },
    {
      "group": "国铁初期客车",
      "name": "国铁22系客车(4.1)",
      "img": "YZ-22.png",
      "authors": ["sq"],
      "type": "IR",
      "desc": "YZ/YW/XL/UZ/CA-22",
      "link": "detail\\yz22.html"
    },
    {
      "group": "国铁初期客车",
      "name": "国铁31型市郊客车(2.1)",
      "img": "YZ-31.png",
      "authors": ["sq"],
      "type": "IR",
      "desc": "YZ-31",
      "link": "detail\\yz31.html"
    },
    {
      "group": "窄轨客车",
      "name": "米轨客车YZ-M1",
      "img": "m1.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "YZ-M1",
      "link": "https://yuejingroup.lanzoup.com/iHAWX2m72x7e"
    }
  ],
  "货车": [
    {
      "name": "C70型通用敞车",
      "img": "C70.png",
      "authors": ["i9", "wllpd"],
      "type": "IR",
      "desc": "C70",
      "link": "https://yuejingroup.lanzoup.com/intPu2m72y0d"
    },
    {
      "name": "GQ70型轻油罐车",
      "img": "GQ70.png",
      "authors": ["wllpd"],
      "type": "IR",
      "desc": "GQ70",
      "link": "https://yuejingroup.lanzoup.com/ie7LG2m72yeh"
    },
    {
      "name": "NX70共用平车",
      "img": "NX70.png",
      "authors": ["i9", "wllpd"],
      "type": "IR",
      "desc": "NX70",
      "link": "https://yuejingroup.lanzoup.com/imTeb2m72oha"
    },
    {
      "name": "P70型通用棚车",
      "img": "P70.png",
      "authors": ["eE", "wllpd"],
      "type": "IR",
      "desc": "P70",
      "link": "https://yuejingroup.lanzoup.com/iSCja2m72pod"
    }
  ],
  "主题包": [
    {
      "name": "最后的蒸汽小火车",
      "img": "jiayang.png",
      "authors": ["i9", "wllpd"],
      "type": "IR",
      "desc": "嘉阳窄轨小火车",
      "link": "https://www.mcmod.cn/class/16268.html"
    },
    {
      "name": "百年滇越行",
      "img": "bndyx.jpg",
      "authors": ["mzsj", "wllpd"],
      "type": "IR",
      "desc": "滇越铁路",
      "link": "https://yuejingroup.lanzoup.com/b00uyvd9ze"
    }
  ]
};
