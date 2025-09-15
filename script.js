// script.js - 英语时态之旅游戏完整实现

// Firebase配置
const firebaseConfig = {
    apiKey: "AIzaSyDHRYTBU74r31MPYVAAnRMwKM76c_-BduQ",
    authDomain: "tetrisonline-ca400.firebaseapp.com",
    projectId: "tetrisonline-ca400",
    storageBucket: "tetrisonline-ca400.appspot.com",
    messagingSenderId: "58207939196",
    appId: "1:58207939196:web:b34f403204096084ee37f9",
    measurementId: "G-GG7GNEQ718"
};

// 初始化Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 游戏状态管理
const gameState = {
    currentPage: 2100, // 当前页面ID
    score: 0,         // 当前得分
    answers: {},      // 存储用户选择的答案
    correctAnswers: { // 正确答案映射
        2113: { group1: '1-1', group2: '2-2', group3: '3-1' },
        2114: { group1: '1-3', group2: '2-2', group3: '3-1' },
        2115: { group1: '1-2', group2: '2-1' },
        2116: { group1: '1-1', group2: '2-1' },
        2117: { group1: '1-1', group2: '2-2', group3: '3-1', group4: '4-1' },
        2118: { group1: '1-2', group2: '2-2' },
        2119: { group1: '1-1', group2: '2-1', group3: '3-1', group4: '4-1' },
        2120: { group1: '1-1', group2: '2-1' }
    },
    hasRetried: false // 是否已重试
};

// 页面内容配置
const pageConfigs = {
    2100: { // 开始画面
        image: '开始画面.jpg',
        text: 'Welcome to the journey of English tenses',
        buttons: [{ id: 'start-btn', text: 'Begin', action: () => navigateTo(2101) }]
    },
    2101: { // 画面01
        image: '画面01.jpg',
        text: 'Arturo: Hello, I\'m Arturo Valdez.',
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2102) }],
        isPractice: true
    },
    2102: { // 画面02
        image: '画面02.jpg',
        text: 'Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'am', value: '1-2' },
                { text: 'are', value: '1-3' }
            ],
            [
                { text: 'calls', value: '2-1' },
                { text: 'call', value: '2-2' },
                { text: 'calling', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2103) }],
        isPractice: true
    },
    2103: { // 画面03
        image: '画面03.jpg',
        text: 'Arturo: OK. Where    ①    you from, Alexa?',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2104) }],
        isPractice: true
    },
    2104: { // 画面04
        image: '画面04.jpg',
        text: 'Alexa: Brazil. How about you?',
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2105) }],
        isPractice: true
    },
    2105: { // 画面05
        image: '画面05.jpg',
        text: 'Arturo: I\'m from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.',
        options: [
            [
                { text: 'lives', value: '1-1' },
                { text: 'live', value: '1-2' },
                { text: 'living', value: '1-3' }
            ],
            [
                { text: 'lives', value: '2-1' },
                { text: 'live', value: '2-2' },
                { text: 'are living', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2106) }],
        isPractice: true
    },
    2106: { // 画面06
        image: '画面06.jpg',
        text: 'Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.',
        options: [
            [
                { text: 'loves', value: '1-1' },
                { text: 'love', value: '1-2' },
                { text: 'loving', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'am', value: '2-2' },
                { text: 'are', value: '2-3' }
            ],
            [
                { text: 'loves', value: '3-1' },
                { text: 'love', value: '3-2' },
                { text: 'loving', value: '3-3' }
            ],
            [
                { text: 'is', value: '4-1' },
                { text: 'are', value: '4-2' },
                { text: 'am', value: '4-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2107) }],
        isPractice: true
    },
    2107: { // 画面07
        image: '画面07.jpg',
        text: 'Arturo: Who   ①   Soo-jin? She   ②   familiar.',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ],
            [
                { text: 'looks', value: '2-1' },
                { text: 'look', value: '2-2' },
                { text: 'looking', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2108) }],
        isPractice: true
    },
    2108: { // 画面08
        image: '画面08.jpg',
        text: 'Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'are', value: '2-2' },
                { text: 'am', value: '2-3' }
            ],
            [
                { text: 'has', value: '3-1' },
                { text: 'have', value: '3-2' },
                { text: 'having', value: '3-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2109) }],
        isPractice: true
    },
    2109: { // 画面09
        image: '画面09.jpg',
        text: 'Arturo: Where   ①   she from?',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2110) }],
        isPractice: true
    },
    2110: { // 画面10
        image: '画面10.jpg',
        text: 'Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let\'s go and say hello. Sorry, what  ④  your last name again? Vargas?',
        options: [
            [
                { text: 'studies', value: '1-1' },
                { text: 'study', value: '1-2' },
                { text: 'studying', value: '1-3' }
            ],
            [
                { text: 'says', value: '2-1' },
                { text: 'say', value: '2-2' },
                { text: 'saying', value: '2-3' }
            ],
            [
                { text: 'is', value: '3-1' },
                { text: 'are', value: '3-2' },
                { text: 'am', value: '3-3' }
            ],
            [
                { text: 'is', value: '4-1' },
                { text: 'are', value: '4-2' },
                { text: 'am', value: '4-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2111) }],
        isPractice: true
    },
    2111: { // 画面11
        image: '画面11.jpg',
        text: 'Arturo: Actually, it   ①   Valdez',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2112) }],
        isPractice: true
    },
    2112: { // 画面12
        image: '画面12.jpg',
        text: 'Alexa: How   ①   you spell that?',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2113) }],
        isPractice: true
    },
    2113: { // 画面13 - 测试开始
        image: '画面13.jpg',
        text: 'My name\'s Nick. My girlfriend\'s name  ①  Karen. We  ②  students. I  ③  to university in Oxford.',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'are', value: '2-2' },
                { text: 'am', value: '2-3' }
            ],
            [
                { text: 'go', value: '3-1' },
                { text: 'goes', value: '3-2' },
                { text: 'going', value: '3-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2114) }],
        isTest: true
    },
    2114: { // 画面14
        image: '画面14.jpg',
        text: 'Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.',
        options: [
            [
                { text: 'don\'t', value: '1-1' },
                { text: 'isn\'t', value: '1-2' },
                { text: 'doesn\'t', value: '1-3' }
            ],
            [
                { text: 'go', value: '2-1' },
                { text: 'goes', value: '2-2' },
                { text: 'going', value: '2-3' }
            ],
            [
                { text: 'lives', value: '3-1' },
                { text: 'live', value: '3-2' },
                { text: 'living', value: '3-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2115) }],
        isTest: true
    },
    2115: { // 画面15
        image: '画面15.jpg',
        text: 'I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.',
        options: [
            [
                { text: 'lives', value: '1-1' },
                { text: 'live', value: '1-2' },
                { text: 'living', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'are', value: '2-2' },
                { text: 'am', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2116) }],
        isTest: true
    },
    2116: { // 画面16
        image: '画面16.jpg',
        text: 'It  ①  difficult sometimes because we  ②  each other only on weekends.',
        options: [
            [
                { text: 'is', value: '1-1' },
                { text: 'are', value: '1-2' },
                { text: 'am', value: '1-3' }
            ],
            [
                { text: 'see', value: '2-1' },
                { text: 'sees', value: '2-2' },
                { text: 'seeing', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2117) }],
        isTest: true
    },
    2117: { // 画面17
        image: '画面17.jpg',
        text: 'Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.',
        options: [
            [
                { text: 'studies', value: '1-1' },
                { text: 'study', value: '1-2' },
                { text: 'studying', value: '1-3' }
            ],
            [
                { text: 'love', value: '2-1' },
                { text: 'loves', value: '2-2' },
                { text: 'loving', value: '2-3' }
            ],
            [
                { text: 'says', value: '3-1' },
                { text: 'say', value: '3-2' },
                { text: 'saying', value: '3-3' }
            ],
            [
                { text: 'is', value: '4-1' },
                { text: 'are', value: '4-2' },
                { text: 'am', value: '4-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2118) }],
        isTest: true
    },
    2118: { // 画面18
        image: '画面18.jpg',
        text: 'I  ①  philosophy and politics, so my courses  ②  very different from hers.',
        options: [
            [
                { text: 'studies', value: '1-1' },
                { text: 'study', value: '1-2' },
                { text: 'studying', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'are', value: '2-2' },
                { text: 'am', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2119) }],
        isTest: true
    },
    2119: { // 画面19
        image: '画面19.jpg',
        text: 'I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.',
        options: [
            [
                { text: 'like', value: '1-1' },
                { text: 'likes', value: '1-2' },
                { text: 'liking', value: '1-3' }
            ],
            [
                { text: 'is', value: '2-1' },
                { text: 'are', value: '2-2' },
                { text: 'am', value: '2-3' }
            ],
            [
                { text: 'is', value: '3-1' },
                { text: 'are', value: '3-2' },
                { text: 'am', value: '3-3' }
            ],
            [
                { text: 'miss', value: '4-1' },
                { text: 'misses', value: '4-2' },
                { text: 'missing', value: '4-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2120) }],
        isTest: true
    },
    2120: { // 画面20
        image: '画面20.jpg',
        text: 'We  ①  on the phone every night and we  ②  each other whenever we can.',
        options: [
            [
                { text: 'talk', value: '1-1' },
                { text: 'talks', value: '1-2' },
                { text: 'talking', value: '1-3' }
            ],
            [
                { text: 'visit', value: '2-1' },
                { text: 'visits', value: '2-2' },
                { text: 'visiting', value: '2-3' }
            ]
        ],
        buttons: [{ id: 'continue-btn', text: 'Continue', action: () => navigateTo(2121) }],
        isTest: true
    },
    2121: { // 得分画面
        getImage: (score) => score >= 60 ? '及格.jpg' : '不及格.jpg',
        buttons: [
            { 
                id: 'next-chapter-btn', 
                text: 'Next Chapter', 
                action: () => console.log('Next chapter clicked'),
                isDisabled: (score) => score < 60 && !gameState.hasRetried
            },
            { 
                id: 'show-answers-btn', 
                text: 'Show the answers', 
                action: showAnswers 
            },
            { 
                id: 'try-again-btn', 
                text: 'Try Again', 
                action: () => {
                    gameState.hasRetried = true;
                    resetTest();
                    navigateTo(2113);
                }
            }
        ]
    }
};

// DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    preloadImages();
});

// 初始化游戏
function initializeGame() {
    renderPage(gameState.currentPage);
    setupEventListeners();
}

// 预加载所有图片
function preloadImages() {
    const images = Object.values(pageConfigs)
        .filter(config => config.image || config.getImage)
        .map(config => config.image || config.getImage(0));
    
    images.forEach(src => {
        const img = new Image();
        img.src = `images/${src}`;
    });
}

// 渲染页面
function renderPage(pageId) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    const config = pageConfigs[pageId];
    if (!config) {
        console.error(`No configuration found for page ${pageId}`);
        return;
    }

    // 创建页面结构
    const page = document.createElement('div');
    page.className = 'page active';
    page.id = `page-${pageId}`;

    // 添加标题栏
    if (pageId !== 2100 && pageId !== 2121) {
        const titleBar = createTitleBar(pageId);
        page.appendChild(titleBar);
    }

    // 添加图片容器
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const image = document.createElement('img');
    image.className = 'game-image';
    image.src = `images/${config.getImage ? config.getImage(gameState.score) : config.image}`;
    image.alt = `Page ${pageId} image`;
    imageContainer.appendChild(image);
    page.appendChild(imageContainer);

    // 添加文本容器
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.textContent = config.text;
    page.appendChild(textContainer);

    // 添加选项按钮（如果有）
    if (config.options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        config.options.forEach((group, groupIndex) => {
            const groupContainer = createOptionGroup(group, groupIndex + 1, pageId);
            optionsContainer.appendChild(groupContainer);
        });
        
        page.appendChild(optionsContainer);
    }

    // 添加继续按钮
    if (config.buttons) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        config.buttons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.id = btnConfig.id;
            button.className = btnConfig.id.includes('continue') ? 'continue-button' : 'score-button';
            button.textContent = btnConfig.text;
            
            if (btnConfig.isDisabled && btnConfig.isDisabled(gameState.score)) {
                button.disabled = true;
            }
            
            button.addEventListener('click', btnConfig.action);
            buttonsContainer.appendChild(button);
        });
        
        page.appendChild(buttonsContainer);
    }

    container.appendChild(page);
}

// 创建标题栏
function createTitleBar(pageId) {
    const titleBar = document.createElement('div');
    titleBar.className = 'page-title';
    
    // 添加标题文本
    const titleText = document.createElement('div');
    titleText.className = 'title-text';
    titleText.textContent = isTestPage(pageId) ? 'Test' : 'Practice';
    titleBar.appendChild(titleText);
    
    // 添加进度条
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // 计算进度
    const progress = calculateProgress(pageId);
    progressBar.style.width = `${progress * 100}%`;
    progressContainer.appendChild(progressBar);
    titleBar.appendChild(progressContainer);
    
    return titleBar;
}

// 计算进度
function calculateProgress(pageId) {
    if (pageId >= 2101 && pageId <= 2112) {
        // 练习部分进度 (1-12)
        return (pageId - 2100) / 12;
    } else if (pageId >= 2113 && pageId <= 2120) {
        // 测试部分进度 (13-20)
        return (pageId - 2112) / 8;
    }
    return 0;
}

// 创建选项组
function createOptionGroup(options, groupIndex, pageId) {
    const groupContainer = document.createElement('div');
    groupContainer.className = 'option-group';
    
    // 添加组标签
    const label = document.createElement('div');
    label.className = 'group-label';
    label.textContent = getGroupLabelSymbol(groupIndex);
    groupContainer.appendChild(label);
    
    // 添加选项行
    const row = document.createElement('div');
    row.className = 'options-row';
    
    options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.dataset.group = groupIndex;
        button.dataset.option = optionIndex + 1;
        button.textContent = option.text;
        
        // 检查是否已选择此选项
        if (gameState.answers[pageId] && gameState.answers[pageId][`group${groupIndex}`] === `${groupIndex}-${optionIndex + 1}`) {
            button.classList.add('selected');
        }
        
        button.addEventListener('click', () => selectOption(pageId, groupIndex, optionIndex + 1));
        row.appendChild(button);
    });
    
    groupContainer.appendChild(row);
    return groupContainer;
}

// 获取组标签符号
function getGroupLabelSymbol(index) {
    const symbols = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
    return symbols[index - 1] || index;
}

// 选择选项
function selectOption(pageId, groupIndex, optionIndex) {
    // 初始化页面答案记录
    if (!gameState.answers[pageId]) {
        gameState.answers[pageId] = {};
    }
    
    // 保存选择
    gameState.answers[pageId][`group${groupIndex}`] = `${groupIndex}-${optionIndex}`;
    
    // 更新UI
    const groupContainer = document.querySelector(`#page-${pageId} .option-group:nth-child(${groupIndex})`);
    if (groupContainer) {
        // 移除同组其他按钮的选中状态
        groupContainer.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 添加当前按钮的选中状态
        const selectedBtn = groupContainer.querySelector(`.option-button[data-option="${optionIndex}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
    }
}

// 导航到指定页面
function navigateTo(pageId) {
    // 检查是否可以继续
    if (!canContinueToNextPage(gameState.currentPage)) {
        showToast('Please complete all multiple-choice questions before continuing');
        return;
    }
    
    // 计算得分（如果是测试页面且点击了继续）
    if (isTestPage(gameState.currentPage) && pageId > gameState.currentPage) {
        calculateScoreForPage(gameState.currentPage);
    }
    
    // 更新当前页面
    gameState.currentPage = pageId;
    
    // 渲染新页面
    renderPage(pageId);
    
    // 如果是得分页面，计算并显示总分
    if (pageId === 2121) {
        calculateTotalScore();
        saveScoreToFirebase();
    }
}

// 检查是否可以继续到下一页
function canContinueToNextPage(pageId) {
    const config = pageConfigs[pageId];
    if (!config || !config.options) return true;
    
    // 检查是否所有选项组都已选择
    const selectedAnswers = gameState.answers[pageId] || {};
    return config.options.every((_, index) => selectedAnswers[`group${index + 1}`]);
}

// 计算当前页面得分
function calculateScoreForPage(pageId) {
    if (!isTestPage(pageId)) return;
    
    const correctAnswers = gameState.correctAnswers[pageId];
    const userAnswers = gameState.answers[pageId];
    
    if (!correctAnswers || !userAnswers) return;
    
    // 计算正确数量
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(group => {
        if (userAnswers[group] === correctAnswers[group]) {
            correctCount++;
        }
    });
    
    // 更新总分
    gameState.score += correctCount;
}

// 计算总分
function calculateTotalScore() {
    // 计算方式：选择"正确"按钮的个数*(4.55)，保留到个位
    const totalCorrect = Object.values(gameState.answers).reduce((sum, pageAnswers) => {
        return sum + Object.values(pageAnswers).filter(answer => {
            const pageId = Object.keys(gameState.answers).find(key => gameState.answers[key] === pageAnswers);
            return gameState.correctAnswers[pageId] && 
                   Object.values(gameState.correctAnswers[pageId]).includes(answer);
        }).length;
    }, 0);
    
    gameState.score = Math.round(totalCorrect * 4.55);
    
    // 显示得分
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-text';
    scoreDisplay.textContent = `Your score is: ${gameState.score}`;
    document.getElementById(`page-2121`).insertBefore(scoreDisplay, document.querySelector('#page-2121 .buttons-container'));
}

// 保存分数到Firebase
function saveScoreToFirebase() {
    const timestamp = new Date().toISOString();
    const roomId = new Date().toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/[^\d]/g, '');
    
    database.ref(`scores/${roomId}`).set({
        score: gameState.score,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).catch(error => {
        console.error('Error saving score:', error);
    });
}

// 显示答案
function showAnswers() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalText = document.createElement('div');
    modalText.className = 'modal-text';
    modalText.textContent = `正确答案如下：
My name's Nick. My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'modal-confirm';
    confirmBtn.textContent = 'Confirm';
    confirmBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(modalText);
    modalContent.appendChild(confirmBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// 重置测试
function resetTest() {
    // 重置测试部分的答案和得分
    for (let pageId = 2113; pageId <= 2120; pageId++) {
        delete gameState.answers[pageId];
    }
    gameState.score = 0;
}

// 显示提示框
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 检查是否是测试页面
function isTestPage(pageId) {
    return pageId >= 2113 && pageId <= 2120;
}

// 设置事件监听器
function setupEventListeners() {
    // 处理窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 防止横屏
    screen.orientation.lock('portrait').catch(() => {
        console.log('Screen orientation lock not supported');
    });
}

// 处理窗口大小变化
function handleResize() {
    // 调整游戏容器大小
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        gameContainer.style.width = `${window.innerWidth}px`;
        gameContainer.style.height = `${window.innerHeight}px`;
    }
}

// 初始化窗口大小
handleResize();
