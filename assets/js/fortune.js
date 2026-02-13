/**
 * 跃进铁道工作组 · 今日运势 v3.0
 * 存放路径：/assets/js/fortune.js
 * 功能：无下拉框 | 每日一签 | 抽取动画 | 按钮呼吸 | 颜文字提示
 */
(function() {
    'use strict';

    // ----- 运势库（六种铁路主题签文）-----
    const FORTUNES = [
        { name: '大吉', desc: '🚦 绿灯长明，全线通过！今天的铁路属于你，任何挑战都能顺利化解。' },
        { name: '中吉', desc: '🟡 黄灯减速，但前方无阻。小麻烦不影响大局，幸运依然。' },
        { name: '小吉', desc: '↪️ 侧线待避，稍等片刻。总体顺利，稍安勿躁。' },
        { name: '大凶', desc: '🔴 红灯停车，信号故障。诸事不宜，建议在家挂机。' },
        { name: '中凶', desc: '🚧 道口栏杆放下，耐心等待。注意是非，保守为上。' },
        { name: '小凶', desc: '🌧️ 轨面湿滑，谨慎驾驶。虽有延误，终会抵达。' }
    ];

    // ----- DOM 元素变量 -----
    let popup = null;
    let fortuneDesc = null;          // 描述文字 <p>
    let fortuneDescCard = null;     // 卡片容器（用于动画）
    let fortuneBtn = null;          // 导航栏“今日运势”
    let randomBtn = null;          // 浮层内“测今日运气”

    // ----- 状态变量 -----
    let currentFortuneIndex = 0;    // 当前显示的运势索引（默认为大吉）
    const STORAGE_KEY = 'yuejin_fortune';

    // ----- 初始化入口 -----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // 1. 定位导航栏“今日运势”按钮
        const navItems = document.querySelectorAll('.nav_a .nav_items');
        let targetBtn = null;
        navItems.forEach(item => {
            if (item.textContent.trim() === '今日运势~') {
                targetBtn = item.closest('.nav_a');
            }
        });

        if (!targetBtn) {
            console.warn('今日运势：未找到导航按钮');
            return;
        }
        fortuneBtn = targetBtn;
        fortuneBtn.style.cursor = 'pointer';

        // 2. 检查浮层是否已存在（避免重复构建）
        if (document.querySelector('.fortune-popup')) {
            popup = document.querySelector('.fortune-popup');
            bindElements();
            bindEvents();
            loadSavedFortune();     // 加载今日运势
            return;
        }

        // 3. 首次运行：注入样式、构建浮层
        injectGlobalStyles();
        buildPopup();
        bindElements();
        bindEvents();
        loadSavedFortune();
    }

    // ----- 绑定浮层内部元素引用 -----
    function bindElements() {
        if (!popup) return;
        fortuneDesc = popup.querySelector('#fortuneDesc');
        fortuneDescCard = popup.querySelector('.fortune-desc-card');
        randomBtn = popup.querySelector('#fortuneRandomBtn');
    }

    // ----- 所有事件监听 -----
    function bindEvents() {
        if (!popup || !fortuneBtn) return;

        // 导航按钮切换浮层
        fortuneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            togglePopup();
        });

        // 随机抽签按钮 → 每日一次，点击后显示结果
        if (randomBtn) {
            randomBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                drawFortuneOfTheDay();      // 抽签逻辑
                animateFortuneCard();       // 触发动画
            });
        }

        // 点击外部关闭浮层
        document.addEventListener('mousedown', function(e) {
            if (!popup || !isPopupVisible()) return;
            const isInside = popup.contains(e.target);
            const isBtn = fortuneBtn.contains(e.target);
            if (!isInside && !isBtn) hidePopup();
        });

        // 浮层内部阻止冒泡（避免点击外部误判）
        popup.addEventListener('mousedown', e => e.stopPropagation());

        // 关闭按钮
        const closeBtn = popup.querySelector('.fortune-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                hidePopup();
            });
        }
    }

    // ----- 浮层显隐（淡入淡出）-----
    function isPopupVisible() {
        return popup && popup.classList.contains('visible');
    }
    function showPopup() { if (popup) popup.classList.add('visible'); }
    function hidePopup() { if (popup) popup.classList.remove('visible'); }
    function togglePopup() { isPopupVisible() ? hidePopup() : showPopup(); }

    // ----- 动画：卡片弹跳 + 高亮 -----
    function animateFortuneCard() {
        if (!fortuneDescCard) return;
        fortuneDescCard.classList.add('animate');
        setTimeout(() => {
            fortuneDescCard.classList.remove('animate');
        }, 400);
    }

    // ----- 更新UI显示运势（根据索引，可选附加文字）-----
    function updateFortuneDisplay(index, extraText = '') {
        if (!fortuneDesc) return;
        const fortune = FORTUNES[index];
        currentFortuneIndex = index;
        let text = `「${fortune.name}」 ${fortune.desc}`;
        if (extraText) text += ' ' + extraText;
        fortuneDesc.textContent = text;
    }

    // ----- 读取今日运势（localStorage）-----
    function getTodayFortune() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        try {
            const data = JSON.parse(stored);
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
            if (data.date === todayStr && typeof data.index === 'number') {
                return { index: data.index, ...FORTUNES[data.index] };
            }
        } catch (e) {}
        return null;
    }

    // ----- 保存今日抽签结果 -----
    function saveFortune(index) {
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: dateStr, index }));
    }

    // ----- 加载已保存运势（打开面板时调用）-----
    function loadSavedFortune() {
        const saved = getTodayFortune();
        if (saved) {
            // 已有今日运势 → 直接显示，无附加文字
            updateFortuneDisplay(saved.index);
        } else {
            // 无今日运势 → 显示默认提示（不显示任何运势签文）
            fortuneDesc.textContent = '✨ 点击「测今日运气」抽取今日签文';
        }
    }

    // ----- 抽签核心（每日一次，点击才显示结果）-----
    function drawFortuneOfTheDay() {
        const saved = getTodayFortune();
        if (saved) {
            // 今日已抽过 → 显示签文 + 颜文字
            updateFortuneDisplay(saved.index, '今天已经抽过了呢(*￣▽￣*)');
            return;
        }

        // 今日未抽 → 随机抽取并保存
        const randomIdx = Math.floor(Math.random() * FORTUNES.length);
        saveFortune(randomIdx);
        updateFortuneDisplay(randomIdx);   // 无附加文字
    }

    // ----- 构建浮层（无下拉框版本）-----
    function buildPopup() {
        popup = document.createElement('div');
        popup.className = 'fortune-popup';
        popup.innerHTML = `
            <div class="fortune-header">
                <span class="fortune-title">
                    <i class="fa fa-cloud-sun" style="color: #f39c12;"></i> 跃进·今日运势
                </span>
                <span class="fortune-close">
                    <i class="fa fa-times"></i>
                </span>
            </div>
            <!-- 运势卡片（直接显示结果，无下拉框） -->
            <div class="fortune-desc-card">
                <p id="fortuneDesc" class="fortune-desc-text">✨ 点击「测今日运气」抽取今日签文</p>
            </div>
            <button id="fortuneRandomBtn" class="fortune-random-btn">
                <i class="fa fa-dice"></i> 测今日运气
            </button>
        `;
        document.body.appendChild(popup);
    }

    // ----- 注入全局样式（移除下拉框相关样式）-----
    function injectGlobalStyles() {
        if (document.getElementById('yuejin-fortune-style')) return;
        const style = document.createElement('style');
        style.id = 'yuejin-fortune-style';
        style.textContent = `
            /* 浮层淡入淡出 */
            .fortune-popup {
                position: fixed;
                top: 70px;
                right: 20px;
                width: 280px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 15px 30px rgba(0,0,0,0.2);
                padding: 20px;
                z-index: 9999;
                border: 1px solid #eaeef2;
                font-family: "Microsoft YaHei", sans-serif;
                box-sizing: border-box;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.25s ease, visibility 0.25s ease;
            }
            .fortune-popup.visible {
                visibility: visible;
                opacity: 1;
            }

            /* 头部 */
            .fortune-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            .fortune-title {
                font-size: 18px;
                font-weight: bold;
                color: #2c3e50;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .fortune-close {
                font-size: 20px;
                cursor: pointer;
                color: #7f8c8d;
                padding: 4px;
                transition: color 0.2s;
            }
            .fortune-close:hover {
                color: #e74c3c;
            }

            /* 描述卡片 + 抽签动画（已移除下拉框样式） */
            .fortune-desc-card {
                background: #ecf5fb;
                border-left: 6px solid #2c7fb8;
                padding: 14px 16px;
                border-radius: 14px;
                margin-bottom: 22px;
                min-height: 75px;
                word-break: break-word;
                transition: background 0.2s, transform 0.2s;
            }
            .fortune-desc-text {
                margin: 0;
                font-size: 14.5px;
                line-height: 1.5;
                color: #1e3a4e;
            }
            /* 抽取动画：弹跳+淡蓝闪烁 */
            .fortune-desc-card.animate {
                animation: fortunePop 0.4s ease;
            }
            @keyframes fortunePop {
                0% { transform: scale(1); background: #ecf5fb; }
                30% { transform: scale(1.02); background: #d4e9ff; }
                70% { transform: scale(1.01); background: #e3f0fa; }
                100% { transform: scale(1); background: #ecf5fb; }
            }

            /* 按钮呼吸动画 */
            .fortune-random-btn {
                width: 100%;
                padding: 12px 16px;
                border: none;
                border-radius: 50px;
                background: linear-gradient(145deg, #3d6e8c, #2a4d63);
                color: white;
                font-size: 16px;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                box-shadow: 0 6px 12px rgba(0,20,30,0.2);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.1s, box-shadow 0.2s;
                animation: breathe 3s infinite ease-in-out;
            }
            .fortune-random-btn:hover {
                transform: scale(1.02);
                box-shadow: 0 8px 16px rgba(0,20,30,0.25);
            }
            @keyframes breathe {
                0% { background: linear-gradient(145deg, #3d6e8c, #2a4d63); }
                50% { background: linear-gradient(145deg, #5085a3, #326277); }
                100% { background: linear-gradient(145deg, #3d6e8c, #2a4d63); }
            }
        `;
        document.head.appendChild(style);
    }
})();