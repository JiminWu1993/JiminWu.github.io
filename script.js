// script.js
// 英语时态之旅游戏逻辑

// Firebase配置
const firebaseConfig = {
    apiKey: "AIzaSyDHRYTBU74r31MPYVAAnRMwKM76c_-BduQ",
    authDomain: "tetrisonline-ca400.firebaseapp.com",
    projectId: "tetrisonline-ca400",
    storageBucket: "tetrisonline-ca400.firebasestorage.app",
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
    score: 0, // 当前得分
    totalCorrect: 0, // 正确选项数量
    selectedOptions: {}, // 存储每页选择的选项
    isFirstAttempt: true, // 是否是第一次尝试
    practicePages: [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112], // 练习页面
    testPages: [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120] // 测试页面
};

// 页面配置数据
const pageConfigs = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [{ text: "Begin", action: () => navigateTo(2101) }]
    },
    2101: {
        type: "practice",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: []
    },
    2102: {
        type: "practice",
        image: "画面02.jpg",
        text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
        options: [
            {
                group: 1,
                label: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                group: 2,
                label: "②",
                options: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ]
    },
    2103: {
        type: "practice",
        image: "画面03.jpg",
        text: "Arturo: OK. Where ① you from, Alexa?",
        options: [
            {
                group: 3,
                label: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2104: {
        type: "practice",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: []
    },
    2105: {
        type: "practice",
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
        options: [
            {
                group: 4,
                label: "①",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                group: 5,
                label: "②",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ]
    },
    2106: {
        type: "practice",
        image: "画面06.jpg",
        text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
        options: [
            {
                group: 6,
                label: "①",
                options: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 7,
                label: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                group: 8,
                label: "③",
                options: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 9,
                label: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2107: {
        type: "practice",
        image: "画面07.jpg",
        text: "Arturo: Who ① Soo-jin? She ② familiar.",
        options: [
            {
                group: 10,
                label: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 11,
                label: "②",
                options: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ]
    },
    2108: {
        type: "practice",
        image: "画面08.jpg",
        text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
        options: [
            {
                group: 12,
                label: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 13,
                label: "②",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 14,
                label: "③",
                options: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ]
    },
    2109: {
        type: "practice",
        image: "画面09.jpg",
        text: "Arturo: Where ① she from?",
        options: [
            {
                group: 15,
                label: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2110: {
        type: "practice",
        image: "画面10.jpg",
        text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
        options: [
            {
                group: 16,
                label: "①",
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                group: 17,
                label: "②",
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                group: 18,
                label: "③",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 19,
                label: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2111: {
        type: "practice",
        image: "画面11.jpg",
        text: "Arturo: Actually, it ① Valdez",
        options: [
            {
                group: 20,
                label: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2112: {
        type: "practice",
        image: "画面12.jpg",
        text: "Alexa: How ① you spell that?",
        options: [
            {
                group: 21,
                label: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2113: {
        type: "test",
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
        options: [
            {
                group: 22,
                label: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 23,
                label: "②",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 24,
                label: "③",
                options: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ]
    },
    2114: {
        type: "test",
        image: "画面14.jpg",
        text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
        options: [
            {
                group: 25,
                label: "①",
                options: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                group: 26,
                label: "②",
                options: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                group: 27,
                label: "③",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ]
    },
    2115: {
        type: "test",
        image: "画面15.jpg",
        text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
        options: [
            {
                group: 28,
                label: "①",
                options: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                group: 29,
                label: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2116: {
        type: "test",
        image: "画面16.jpg",
        text: "It ① difficult sometimes because we ② each other only on weekends.",
        options: [
            {
                group: 30,
                label: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 31,
                label: "②",
                options: [
                    { text: "see", correct: true },
                    { text: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ]
    },
    2117: {
        type: "test",
        image: "画面17.jpg",
        text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
        options: [
            {
                group: 32,
                label: "①",
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                group: 33,
                label: "②",
                options: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 34,
                label: "③",
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                group: 35,
                label: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2118: {
        type: "test",
        image: "画面18.jpg",
        text: "I ① philosophy and politics, so my courses ② very different from hers.",
        options: [
            {
                group: 36,
                label: "①",
                options: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                group: 37,
                label: "②",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ]
    },
    2119: {
        type: "test",
        image: "画面19.jpg",
        text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
        options: [
            {
                group: 38,
                label: "①",
                options: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                group: 39,
                label: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 40,
                label: "③",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 41,
                label: "④",
                options: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ]
    },
    2120: {
        type: "test",
        image: "画面20.jpg",
        text: "We ① on the phone every night and we ② each other whenever we can.",
        options: [
            {
                group: 42,
                label: "①",
                options: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                group: 43,
                label: "②",
                options: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ]
    },
    2121: {
        type: "score",
        buttons: [
            { text: "Next Chapter", action: () => {} },
            { text: "Show the answers", action: showAnswers },
            { text: "Try Again", action: () => navigateTo(2113) }
        ]
    }
};

// 初始化游戏
function initGame() {
    // 预加载所有图片
    preloadImages();
    
    // 渲染初始页面
    renderPage(gameState.currentPage);
    
    // 添加事件监听
    document.addEventListener('click', handleGlobalClick);
}

// 预加载图片函数
function preloadImages() {
    const images = [];
    for (let i = 2100; i <= 2120; i++) {
        if (pageConfigs[i] && pageConfigs[i].image) {
            const img = new Image();
            img.src = `images/${pageConfigs[i].image}`;
            images.push(img);
        }
    }
    // 预加载得分页面图片
    const passImg = new Image();
    passImg.src = 'images/及格.jpg';
    images.push(passImg);
    
    const failImg = new Image();
    failImg.src = 'images/不及格.jpg';
    images.push(failImg);
}

// 渲染页面函数
function renderPage(pageId) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    
    const config = pageConfigs[pageId];
    if (!config) return;
    
    // 创建页面元素
    const pageElement = document.createElement('div');
    pageElement.id = `page-${pageId}`;
    pageElement.className = 'page active';
    
    // 添加标题栏（非开始和得分页面）
    if (pageId !== 2100 && pageId !== 2121) {
        const titleBar = createTitleBar(pageId, config.type);
        pageElement.appendChild(titleBar);
    }
    
    // 根据页面类型渲染不同内容
    if (pageId === 2100) {
        // 开始页面
        pageElement.appendChild(createStartPage());
    } else if (pageId === 2121) {
        // 得分页面
        pageElement.appendChild(createScorePage());
    } else {
        // 普通页面
        pageElement.appendChild(createImageSection(config.image));
        pageElement.appendChild(createTextSection(config.text));
        
        if (config.options && config.options.length > 0) {
            pageElement.appendChild(createOptionsSection(config.options, pageId));
        }
        
        pageElement.appendChild(createContinueButton(pageId));
    }
    
    gameContainer.appendChild(pageElement);
}

// 创建标题栏
function createTitleBar(pageId, pageType) {
    const titleBar = document.createElement('div');
    titleBar.className = 'page-title';
    
    // 左侧标题文本
    const titleText = document.createElement('div');
    titleText.className = 'title-text';
    titleText.textContent = pageType === 'practice' ? 'Practice' : 'Test';
    titleBar.appendChild(titleText);
    
    // 右侧进度条
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // 计算进度
    let progress = 0;
    if (pageType === 'practice') {
        const index = gameState.practicePages.indexOf(pageId);
        progress = (index + 1) / gameState.practicePages.length;
    } else if (pageType === 'test') {
        const index = gameState.testPages.indexOf(pageId);
        progress = (index + 1) / gameState.testPages.length;
    }
    
    progressBar.style.width = `${progress * 100}%`;
    progressContainer.appendChild(progressBar);
    titleBar.appendChild(progressContainer);
    
    return titleBar;
}

// 创建开始页面
function createStartPage() {
    const container = document.createElement('div');
    container.className = 'start-container';
    
    const title = document.createElement('div');
    title.className = 'start-title';
    title.textContent = pageConfigs[2100].text;
    container.appendChild(title);
    
    const button = document.createElement('button');
    button.className = 'start-button';
    button.textContent = 'Begin';
    button.addEventListener('click', () => navigateTo(2101));
    container.appendChild(button);
    
    return container;
}

// 创建图片区域
function createImageSection(imageName) {
    const container = document.createElement('div');
    container.className = 'image-container';
    
    const image = document.createElement('img');
    image.className = 'game-image';
    image.src = `images/${imageName}`;
    image.alt = 'Game Image';
    container.appendChild(image);
    
    return container;
}

// 创建文本区域
function createTextSection(text) {
    const container = document.createElement('div');
    container.className = 'text-container';
    container.textContent = text;
    return container;
}

// 创建选项区域
function createOptionsSection(options, pageId) {
    const container = document.createElement('div');
    container.className = 'options-container';
    
    options.forEach((optionGroup, index) => {
        const groupElement = document.createElement('div');
        groupElement.className = 'option-group';
        
        // 添加组标签
        const label = document.createElement('div');
        label.className = 'group-label';
        label.textContent = optionGroup.label;
        groupElement.appendChild(label);
        
        // 添加选项行
        const row = document.createElement('div');
        row.className = 'options-row';
        
        optionGroup.options.forEach((option, optIndex) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.dataset.group = optionGroup.group;
            button.dataset.option = optIndex;
            
            // 检查是否已选择此选项
            if (gameState.selectedOptions[pageId] && 
                gameState.selectedOptions[pageId][optionGroup.group] === optIndex) {
                button.classList.add('selected');
            }
            
            button.addEventListener('click', () => selectOption(pageId, optionGroup.group, optIndex, button));
            row.appendChild(button);
        });
        
        groupElement.appendChild(row);
        container.appendChild(groupElement);
    });
    
    return container;
}

// 创建继续按钮
function createContinueButton(pageId) {
    const container = document.createElement('div');
    container.className = 'continue-container';
    
    const button = document.createElement('button');
    button.className = 'continue-button';
    button.textContent = 'Continue';
    
    // 检查是否需要禁用继续按钮（有选项但未完成选择）
    const config = pageConfigs[pageId];
    if (config.options && config.options.length > 0) {
        if (!areAllOptionsSelected(pageId)) {
            button.disabled = true;
        }
    }
    
    button.addEventListener('click', () => handleContinue(pageId));
    container.appendChild(button);
    
    return container;
}

// 创建得分页面
function createScorePage() {
    const container = document.createElement('div');
    container.className = 'score-container';
    
    // 根据分数选择背景图片
    const bgImage = document.createElement('img');
    bgImage.className = 'score-background';
    bgImage.src = gameState.score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    bgImage.alt = 'Score Background';
    container.appendChild(bgImage);
    
    // 显示分数
    const scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    scoreText.textContent = `Your score is: ${Math.round(gameState.score)}`;
    container.appendChild(scoreText);
    
    // 添加按钮
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'score-buttons';
    
    pageConfigs[2121].buttons.forEach(btnConfig => {
        const button = document.createElement('button');
        button.className = 'score-button';
        button.textContent = btnConfig.text;
        
        // 处理Next Chapter按钮状态
        if (btnConfig.text === 'Next Chapter') {
            if (gameState.isFirstAttempt && gameState.score < 60) {
                button.disabled = true;
            }
        }
        
        button.addEventListener('click', btnConfig.action);
        buttonsContainer.appendChild(button);
    });
    
    container.appendChild(buttonsContainer);
    
    return container;
}

// 选择选项处理
function selectOption(pageId, groupId, optionIndex, buttonElement) {
    // 移除同组其他选项的选中状态
    const groupButtons = document.querySelectorAll(`.option-button[data-group="${groupId}"]`);
    groupButtons.forEach(btn => btn.classList.remove('selected'));
    
    // 设置当前选项为选中状态
    buttonElement.classList.add('selected');
    
    // 更新游戏状态
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    gameState.selectedOptions[pageId][groupId] = optionIndex;
    
    // 检查是否所有选项都已选择，启用继续按钮
    if (areAllOptionsSelected(pageId)) {
        const continueButton = document.querySelector('.continue-button');
        if (continueButton) {
            continueButton.disabled = false;
        }
    }
}

// 检查是否所有选项都已选择
function areAllOptionsSelected(pageId) {
    const config = pageConfigs[pageId];
    if (!config.options) return true;
    
    if (!gameState.selectedOptions[pageId]) return false;
    
    for (const optionGroup of config.options) {
        if (gameState.selectedOptions[pageId][optionGroup.group] === undefined) {
            return false;
        }
    }
    
    return true;
}

// 处理继续按钮点击
function handleContinue(pageId) {
    // 检查是否所有选项都已选择
    if (pageConfigs[pageId].options && !areAllOptionsSelected(pageId)) {
        showToast("Please complete all multiple-choice questions before continuing");
        return;
    }
    
    // 如果是测试页面，计算得分
    if (pageConfigs[pageId].type === 'test') {
        calculateScoreForPage(pageId);
    }
    
    // 确定下一页ID
    let nextPageId;
    if (pageId === 2120) {
        // 测试结束，转到得分页面
        nextPageId = 2121;
        saveScoreToFirebase();
    } else {
        // 普通页面跳转
        const allPages = [...gameState.practicePages, ...gameState.testPages];
        const currentIndex = allPages.indexOf(pageId);
        nextPageId = allPages[currentIndex + 1];
    }
    
    // 导航到下一页
    navigateTo(nextPageId);
}

// 计算当前页面得分
function calculateScoreForPage(pageId) {
    const config = pageConfigs[pageId];
    if (!config.options || !gameState.selectedOptions[pageId]) return;
    
    config.options.forEach(optionGroup => {
        const selectedOptionIndex = gameState.selectedOptions[pageId][optionGroup.group];
        if (selectedOptionIndex !== undefined) {
            const selectedOption = optionGroup.options[selectedOptionIndex];
            if (selectedOption.correct) {
                gameState.totalCorrect++;
            }
        }
    });
    
    // 更新总分
    gameState.score = gameState.totalCorrect * 4.55;
}

// 保存分数到Firebase
function saveScoreToFirebase() {
    const now = new Date();
    const roomId = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    const scoreData = {
        score: Math.round(gameState.score),
        timestamp: now.getTime()
    };
    
    database.ref('scores/' + roomId).set(scoreData)
        .catch(error => {
            console.error("Error saving score to Firebase:", error);
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
    modalText.innerHTML = `
        The answer of test：<br>
        My name's Nick.My girlfriend's name is Karen.<br> 
        We're students. I go to university in Oxford. Karen doesn't go to university in Oxford;<br> 
        she goes to university in Cambridge.<br> 
        She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford.<br> 
        It's difficult sometimes because we see each other only on weekends.<br> 
        Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.<br>
        I study philosophy and politics, so my courses are very different from hers.<br> 
        I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot.<br> 
        We talk on the phone every night and we visit each other whenever we can.
    `;
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'modal-confirm';
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(modalText);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// 显示提示框
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // 3秒后自动移除提示
    setTimeout(() => {
        toastContainer.removeChild(toast);
    }, 3000);
}

// 全局点击处理
function handleGlobalClick(event) {
    // 处理模态框外部点击关闭
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 页面导航
function navigateTo(pageId) {
    gameState.currentPage = pageId;
    renderPage(pageId);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
