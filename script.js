// =============================================
// 英语时态学习游戏 - 完整脚本 (script.js)
// 包含所有21个画面的完整定义
// =============================================

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
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 游戏状态管理
let gameState = {
    currentPageId: 2100,
    score: 0,
    selectedOptions: {},
    isTestSection: false,
    isSecondAttempt: false,
    startTime: new Date()
};

// 游戏数据 - 所有21个页面的完整定义
const gameData = {
    // 开始画面 (2100)
    2100: {
        image: "images/开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { content: "Begin", action: "next", target: 2101 }
        ],
        isStartScreen: true
    },
    
    // 练习部分: 画面01 (2101)
    2101: {
        image: "images/画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { content: "Continue", action: "next", target: 2102 }
        ],
        isPractice: true,
        practiceNumber: 1
    },
    
    // 练习部分: 画面02 (2102)
    2102: {
        image: "images/画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        options: [
            {
                group: 1,
                options: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "am", correct: false },
                    { id: "1-3", text: "are", correct: false }
                ]
            },
            {
                group: 2,
                options: [
                    { id: "2-1", text: "calls", correct: false },
                    { id: "2-2", text: "call", correct: true },
                    { id: "2-3", text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2103 }
        ],
        isPractice: true,
        practiceNumber: 2
    },
    
    // 练习部分: 画面03 (2103)
    2103: {
        image: "images/画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                group: 3,
                options: [
                    { id: "3-1", text: "is", correct: false },
                    { id: "3-2", text: "are", correct: true },
                    { id: "3-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2104 }
        ],
        isPractice: true,
        practiceNumber: 3
    },
    
    // 练习部分: 画面04 (2104)
    2104: {
        image: "images/画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { content: "Continue", action: "next", target: 2105 }
        ],
        isPractice: true,
        practiceNumber: 4
    },
    
    // 练习部分: 画面05 (2105)
    2105: {
        image: "images/画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                group: 4,
                options: [
                    { id: "4-1", text: "lives", correct: false },
                    { id: "4-2", text: "live", correct: true },
                    { id: "4-3", text: "living", correct: false }
                ]
            },
            {
                group: 5,
                options: [
                    { id: "5-1", text: "lives", correct: true },
                    { id: "5-2", text: "live", correct: false },
                    { id: "5-3", text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2106 }
        ],
        isPractice: true,
        practiceNumber: 5
    },
    
    // 练习部分: 画面06 (2106)
    2106: {
        image: "images/画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                group: 6,
                options: [
                    { id: "6-1", text: "loves", correct: false },
                    { id: "6-2", text: "love", correct: true },
                    { id: "6-3", text: "loving", correct: false }
                ]
            },
            {
                group: 7,
                options: [
                    { id: "7-1", text: "is", correct: true },
                    { id: "7-2", text: "am", correct: false },
                    { id: "7-3", text: "are", correct: false }
                ]
            },
            {
                group: 8,
                options: [
                    { id: "8-1", text: "loves", correct: true },
                    { id: "8-2", text: "love", correct: false },
                    { id: "8-3", text: "loving", correct: false }
                ]
            },
            {
                group: 9,
                options: [
                    { id: "9-极简", text: "is", correct: true },
                    { id: "9-2", text: "are", correct: false },
                    { id: "9-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action极简 "next", target: 2107 }
        ],
        isPractice: true,
        practiceNumber: 6
    },
    
    // 练习部分: 画面07 (2107)
    2107: {
        image: "images/画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                group: 10,
                options: [
                    { id: "10-1", text: "is", correct: true },
                    { id: "10-2", text: "are", correct: false },
                    { id: "10-3", text: "am", correct: false }
                ]
            },
            {
                group: 11,
                options: [
                    { id: "11-1", text: "looks", correct: true },
                    {极简 "11-2", text: "look", correct: false },
                    { id: "11-3", text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2108 }
        ],
        isPractice: true,
        practiceNumber: 7
    },
    
    // 练习部分: 画面08 (2108)
    2108: {
        image: "images/画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                group: 12,
                options: [
                    { id: "12-1", text: "is", correct: false },
                    { id: "12-2", text: "are", correct: true },
                    { id: "12-3", text: "am", correct: false }
                ]
            },
            {
                group: 13,
                options: [
                    { id: "13-1", text: "is", correct: false },
                    { id: "13-2", text: "are", correct: true },
                    { id: "13-3", text: "am", correct: false }
                ]
            },
            {
                group: 14,
                options: [
                    { id: "14-1", text: "has", correct: false },
                    { id: "14-2", text: "have", correct: true },
                    { id: "14-3", text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2109 }
        ],
        isPractice: true,
        practiceNumber: 8
    },
    
    // 练习部分: 画面09 (2109)
    2109: {
        image: "images/极简画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                group: 15,
                options: [
                    { id: "15-1", text: "is", correct: false },
                    { id: "15-2", text: "are", correct: true },
                    { id: "15-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2110 }
        ],
        isPractice: true,
        practiceNumber: 9
    },
    
    // 练习部分: 画面10 (2110)
    2110: {
        image: "images/画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                group: 16,
                options: [
                    { id: "16-1", text: "studies", correct: true },
                    { id: "16-2", text: "study", correct: false },
                    { id: "16-3", text: "studying", correct: false }
                ]
            },
            {
                group: 17,
                options: [
                    { id: "17-1", text: "says", correct: true },
                    { id: "17-2", text: "say", correct: false },
                    { id: "17-3", text: "saying",极简 false }
                ]
            },
            {
                group: 18,
                options: [
                    { id: "18-1", text: "is", correct: false },
                    { id: "18-2", text: "are", correct: true },
                    { id: "18-3", text: "am", correct: false }
                ]
            },
            {
                group: 19,
                options: [
                    { id: "19-1", text: "is", correct: true },
                    { id: "19-2", text: "are", correct: false },
                    { id: "19-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2111 }
        ],
        isPractice: true,
        practiceNumber: 10
    },
    
    // 练习部分: 画面11 (2111)
    2111: {
        image: "images/画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                group: 20,
                options: [
                    { id: "20-1", text: "is", correct: true },
                    { id: "20-2", text: "are", correct: false },
                    { id: "20-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2112 }
        ],
        isPractice: true,
        practiceNumber: 11
    },
    
    // 练习部分: 画面12 (2112)
    2112: {
        image: "images/画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                group: 21,
                options: [
                    { id: "21-1", text: "is", correct: false },
                    { id: "21-2", text: "are", correct: true },
                    { id: "21-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2113 }
        ],
        isPractice: true,
        practiceNumber: 12
    },
    
    // 测试部分: 画面13 (2113)
    211极简: {
        image: "images/画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                group: 22,
                options: [
                    { id: "22-1", text: "is", correct: true },
                    { id: "22-2", text: "are", correct: false },
                    { id: "22-3", text: "am", correct: false }
                ]
            },
            {
                group: 23,
                options: [
                    { id: "23-1", text: "is", correct: false },
                    { id: "23-2", text: "are", correct: true },
                    { id: "23-3", text: "am", correct: false }
极简 ]
            },
            {
                group: 24,
                options: [
                    { id: "24-1", text: "go", correct: true },
                    { id: "24-2", text: "go极简", correct: false },
                    { id: "24-3", text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2114 }
        ],
        isTest: true,
        testNumber: 1
    },
    
    // 测试部分: 画面14 (2114)
    2114: {
        image: "images/画面14.jpg",
        text: "Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                group: 25,
                options: [
                    { id: "25-1", text: "don't", correct: false },
                    { id: "25-2", text: "isn't", correct: false },
                    { id: "25-3", text: "doesn't", correct: true }
                ]
            },
            {
                group: 26,
                options: [
                    { id: "26-1", text: "go", correct: false },
                    { id: "26-2", text: "goes", correct: true },
                    { id: "26-3", text: "going", correct: false }
                ]
            },
            {
                group: 27,
                options: [
                    { id: "27-1", text: "lives", correct: true },
                    { id: "27-2", text: "live", correct: false },
                    { id: "27-3", text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2115 }
        ],
        isTest: true,
        testNumber: 2
    },
    
    // 测试部分: 画面15 (2115)
    2115: {
        image: "images/画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        options: [
            {
                group: 28,
                options: [
                    { id: "28-1", text: "lives", correct: false },
                    { id: "28-2", text: "live", correct: true },
                    { id: "极简-3", text: "living", correct: false }
                ]
            },
            {
                group: 29,
                options: [
                    { id: "29-1", text: "is", correct: true },
                    { id: "29-2", text: "are", correct: false },
                    { id: "29-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2116 }
        ],
        isTest极简 true,
        testNumber: 3
    },
    
    // 测试部分: 画面16 (2116)
    2116: {
        image: "images/画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                group: 30,
                options: [
                    { id: "30-1", text: "is", correct: true },
                    { id: "30-2", text: "are", correct: false },
                    { id: "30-3", text: "am", correct: false }
                ]
            },
            {
                group: 31,
                options: [
                    { id: "31-1", text: "see", correct: true },
                    { id: "31-2", text: "sees", correct: false },
                    { id: "31-3", text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2117 }
        ],
        isTest: true,
        testNumber: 4
    },
    
    // 测试部分: 画面17 (2117)
    2117: {
        image: "images/画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                group: 32,
                options: [
                    { id: "32-1", text: "studies", correct: true },
                    { id: "32-2", text: "study", correct: false },
                    { id: "32-3", text: "studying", correct: false }
                ]
            },
            {
                group: 33,
                options: [
                    { id: "33-1", text: "love", correct: false },
                    { id: "33-2", text: "loves", correct: true },
                    { id: "33-3", text: "loving", correct: false }
                ]
            },
            {
                group: 34,
                options: [
                    { id: "34-1", text极简 "says", correct: true },
                    { id: "34-2", text: "say", correct: false },
                    { id: "34-3", text: "saying", correct: false }
                ]
            },
            {
                group: 35,
                options: [
                    { id: "35-1", text: "is", correct: true },
                    { id: "35-2", text: "are", correct: false },
                    { id: "35-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2118 }
        ],
        isTest: true,
        testNumber: 5
    },
    
    // 测试部分: 画面18 (2118)
    2118: {
        image: "images/画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        options: [
            {
                group: 36,
                options: [
                    { id: "36-1", text: "studies", correct: false },
                    { id: "36-2", text: "study", correct: true },
                    { id: "36-3", text: "studying", correct: false }
                ]
            },
            {
                group: 37,
                options: [
                    { id: "37-1", text: "极简", correct: false },
                    { id: "37-2", text: "are", correct: true },
                    { id: "37-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2119 }
        ],
        isTest: true,
        testNumber: 6
    },
    
    // 测试部分: 画面19 (2119)
    2119: {
        image: "images/画面19.jpg",
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                group: 38,
                options: [
                    { id: "38-1", text: "like", correct: true },
                    { id: "38-2", text: "likes", correct: false },
                    { id: "38-3", text: "liking", correct: false }
                ]
            },
            {
                group: 39,
                options: [
                    { id: "39-1", text: "is", correct: true },
                    { id: "39-2", text: "are", correct: false },
                    { id: "39-3", text: "am", correct: false }
                ]
            },
            {
                group: 40,
                options: [
                    { id: "40-1", text: "is", correct: true },
                    { id: "40-2", text: "are", correct: false },
                    { id: "40-3", text: "am", correct: false }
                ]
            },
            {
                group: 41,
               极简: [
                    { id: "41-1", text: "miss", correct: true },
                    { id: "41-2", text: "misses", correct: false },
                    { id: "41-3", text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2120 }
        ],
        isTest: true,
        testNumber: 7
    },
    
    // 测试部分: 画面20 (2120)
    2120: {
        image: "images/画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                group: 42,
                options: [
                    { id: "42-1", text: "talk", correct: true },
                    { id: "42-2", text: "talks", correct: false },
                    { id: "42-3", text: "talking", correct: false }
                ]
            },
            {
                group: 43,
                options: [
                    { id: "43-1", text: "visit", correct: true },
                    { id: "43-2", text: "visits", correct: false },
                    { id: "43-3", text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2121 }
        ],
        isTest: true,
        testNumber: 8
    },
    
    // 得分画面 (2121)
    2121: {
        isScoreScreen: true
    }
};

// DOM元素引用
const sceneImage = document.getElementById('scene-image');
const dialogText = document.getElementById('dialog-text');
const optionsContainer = document.getElementById('options-container');
const continueBtn = document.getElementById('continue-btn');
const pageType = document.getElementById('page-type');
const progressBar = document.getElementById('progress-bar');
const messageToast = document.getElementById('message-toast');
const toastContent = document.getElementById('toast-content');
const scoreScreen = document.getElementById('score-screen');
const finalScore = document.getElementById('final-score');
const nextChapterBtn = document.getElementById('next-chapter-btn');
const showAnswersBtn = document.getElementById('show-answers-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const answersModal = document.getElementById('answers-modal');
const correctAnswersText = document.getElementById('correct-answers-text');
const confirmAnswersBtn = document.getElementById('confirm-answers-btn');

// 初始化游戏
function initGame() {
    // 设置游戏开始时间
    gameState.startTime = new Date();
    
    // 加载当前页面
    loadPage(gameState.currentPageId);
    
    // 设置事件监听器
    continueBtn.addEventListener('click', handleContinue);
    nextChapterBtn.addEventListener('click', handleNextChapter);
    showAnswersBtn.addEventListener('click', handleShowAnswers);
    tryAgainBtn.addEventListener('click', handleTryAgain);
    confirmAnswersBtn.addEventListener('click', () => {
        answersModal.classList.add('hidden');
    });
    
    // 预加载图片
    preloadImages();
    
    console.log("游戏初始化完成，当前页面:", gameState.currentPageId);
}

// 加载页面内容
function loadPage(pageId) {
    const page = gameData[pageId];
    if (!page) {
        console.error(`页面 ID ${pageId} 未找到`);
        showMessage("错误: 页面未找到");
        return;
    }
    
    // 更新页面类型和进度
    updatePageTypeAndProgress(page);
    
    // 清除之前的选择选项
    optionsContainer.innerHTML = '';
    
    // 重置继续按钮状态
    continueBtn.disabled = false;
    continueBtn.classList.remove('hidden');
    
    if (page.isStartScreen) {
        // 开始画面
        loadStartScreen(page);
    } 
    else if (page.isScoreScreen) {
        // 得分画面
        showScoreScreen();
    } 
    else {
        // 常规页面
        loadRegularPage(page, pageId);
    }
}

// 加载开始画面
function loadStartScreen(page) {
    sceneImage.src = page.image;
    dialogText.textContent = page.text;
    continueBtn.textContent = page.buttons[0].content;
    continueBtn.onclick = () => navigateTo(page.buttons[0].target);
}

// 加载常规页面
function loadRegularPage(page, pageId) {
    sceneImage.src = page.image;
    dialogText.textContent = page.text;
    
    // 创建选项按钮（如果有）
    if (page.options && page.options.length > 0) {
        createOptionButtons(page.options, pageId);
    }
    
    // 设置继续按钮
    continueBtn.textContent = "Continue";
    continueBtn.onclick = () => handlePageContinue(pageId);
}

// 更新页面类型和进度条
function updatePageTypeAndProgress(page) {
    if (page.isPractice) {
        pageType.textContent = "Practice";
        const progress = (page.practiceNumber / 12) * 100;
        progressBar.style.width = `${progress}%`;
    } 
    else if (page.isTest) {
        pageType.textContent = "Test";
        const progress = (page.testNumber / 8) * 100;
        progressBar.style.width = `${progress}%`;
    } 
    else {
        pageType.textContent = "";
        progressBar.style.width = "0%";
    }
}

// 创建选项按钮
function createOptionButtons(options, pageId) {
    options.forEach(optionGroup => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'option-group';
        
        // 添加组编号
        const groupNumber = document.createElement('div');
        groupNumber.className = 'group-number';
        groupNumber.textContent = getGroupNumberSymbol(optionGroup.group);
        groupDiv.appendChild(groupNumber);
        
        const rowDiv = document.createElement('div');
        rowDiv.className = 'option-row';
        
        optionGroup.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.dataset.id = option.id;
            button.dataset.correct = option.correct;
            button.dataset.group = optionGroup.group;
            
            // 检查是否已经选择过此选项
            if (gameState.selectedOptions[pageId] && 
                gameState.selectedOptions[pageId][optionGroup.group] === option.id) {
                button.classList.add('selected');
            }
            
            button.addEventListener('click', () => selectOption(option.id, optionGroup.group, pageId, button));
            rowDiv.appendChild(button);
        });
        
        groupDiv.appendChild(rowDiv);
        optionsContainer.appendChild(groupDiv);
    });
}

// 获取组编号符号
function getGroupNumberSymbol(groupNumber) {
    const symbols = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
    return symbols[groupNumber - 1] || groupNumber;
}

// 选择选项
function selectOption(optionId, groupId, pageId, buttonElement) {
    // 移除同组中其他选项的选中状态
    const groupButtons = document.querySelectorAll(`.option-button[data-group="${groupId}"]`);
    groupButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.style.fontWeight = 'normal';
    });
    
    // 设置当前选项为选中状态
    buttonElement.classList.add('selected');
    buttonElement.style.fontWeight = 'bold';
    
    // 保存选择
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    game极简.selectedOptions[pageId][groupId] = optionId;
    
    console.log(`页面 ${pageId} 组 ${groupId} 选择了选项 ${optionId}`);
}

// 处理继续按钮点击
function handleContinue() {
    handlePageContinue(gameState.currentPageId);
}

// 处理页面继续
function handlePageContinue(pageId) {
    const page = gameData[pageId];
    
    // 检查是否所有选项都已选择（如果有选项）
    if (page.options && page.options.length > 0) {
        const allSelected = checkAllOptionsSelected(pageId, page.options.length);
        if (!allSelected) {
            showMessage("Please complete all multiple-choice questions before continuing");
            return;
        }
    }
    
    // 如果是测试页面，计算得分
    if (page.isTest && page.options) {
        calculateScoreForPage(pageId);
    }
    
    // 导航到下一页
    const nextPageId = page.buttons[0].target;
    navigateTo(nextPageId);
}

// 检查所有选项是否已选择
function checkAllOptionsSelected(pageId, optionGroupCount) {
    if (!gameState.selectedOptions[pageId]) {
        return false;
    }
    
    const selectedGroups = Object.keys(gameState.selectedOptions[pageId]).length;
    return selectedGroups === optionGroupCount;
}

// 计算页面得分
function calculateScoreForPage(pageId) {
    const page = gameData[pageId];
    if (!page.options) return;
    
    let pageScore = 0;
    
    page.options.forEach(optionGroup => {
        const selectedOptionId = gameState.selectedOptions[pageId][optionGroup.group];
        if (selectedOptionId) {
            const selectedOption = optionGroup.options.find(opt => opt.id === selectedOptionId);
            if (selectedOption && selectedOption.correct) {
                pageScore++;
            }
        }
    });
    
    gameState.score += pageScore;
    console.log(`页面 ${pageId} 得分: ${pageScore}, 总得分: ${gameState.score}`);
}

// 导航到指定页面
function navigateTo(pageId) {
    gameState.currentPageId = pageId;
    loadPage(pageId);
}

// 显示消息提示
function showMessage(message) {
    toastContent.textContent = message;
    messageToast.classList.remove('toast-hidden');
    messageToast.classList.add('toast-visible');
    
    setTimeout(() => {
        messageToast.classList.remove('toast-visible');
        messageToast.classList.add('toast-hidden');
    }, 3000);
}

// 显示得分画面
function showScoreScreen() {
    // 计算最终得分
    const calculatedScore = Math.floor(gameState.score * 4.55);
    
    // 根据得分设置背景图片
    const backgroundImage = calculatedScore >= 60 ? "images/及格.jpg" : "images/不及格.jpg";
    scoreScreen.style.backgroundImage = `url(${backgroundImage})`;
    
    // 更新得分文本
    finalScore.textContent = calculatedScore;
    
    // 设置按钮状态
    if (!gameState.isSecondAttempt) {
        if (calculatedScore < 60) {
            nextChapterBtn.disabled = true;
            showAnswersBtn.disabled = true;
            nextChapterBtn.style.opacity = "0.5";
            showAnswersBtn.style.opacity = "0.5";
        } else {
            nextChapterBtn.disabled = false;
            showAnswersBtn.disabled = false;
            nextChapterBtn.style.opacity = "1";
            showAnswersBtn.style.opacity = "1";
        }
    } else {
        // 第二次尝试，所有按钮都可点击
        nextChapterBtn.disabled = false;
        showAnswersBtn.disabled = false;
        nextChapterBtn.style.opacity = "1";
        showAnswersBtn.style.opacity = "1";
    }
    
    // 隐藏游戏内容，显示得分画面
    document.getElementById('game-content').classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    
    // 保存得分到Firebase
    saveScoreToFirebase(calculatedScore);
}

// 保存得分到Firebase
function saveScoreToFirebase(score) {
    const roomId = generateRoomId();
    const timestamp = new Date().getTime();
    
    database.ref('scores/' + roomId).set({
        score: score,
        timestamp: timestamp,
        isSecondAttempt: gameState.isSecondAttempt
    }).catch(error => {
        console.error("保存得分到Firebase时出错:", error);
        showMessage("网络错误: 无法保存得分");
    });
}

// 生成房间ID（基于当前时间）
function generateRoomId() {
    const now = gameState.startTime || new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return month + day + hours + minutes;
}

// 处理下一章按钮点击
function handleNextChapter() {
    showMessage("下一章内容正在开发中");
    // 实际应用中这里可以跳转到下一章的内容
}

// 处理显示答案按钮点击
function handleShowAnswers() {
    // 显示正确答案
    correctAnswersText.innerHTML = `
        <p><strong>Correct Answers:</strong></p>
        <p>My name's Nick. My girlfriend's name is Karen.</p>
        <p>We're students. I go to university in Oxford.</p>
        <p>Karen doesn't go to university in Oxford; she goes to university in Cambridge.</p>
        <p>She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford.</p>
        <p>It's difficult sometimes because we see each other only on weekends.</p>
        <p>Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.</p>
        <p>I study philosophy and politics, so my courses are very different from hers.</p>
        <p>I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot.</p>
        <p>We talk on the phone every night and we visit each other whenever we can.</p>
    `;
    answersModal.classList.remove('hidden');
}

// 处理重试按钮点击
function handleTryAgain() {
    // 重置游戏状态
    gameState.score = 0;
    gameState.selectedOptions = {};
    gameState.isSecondAttempt = true;
    
    // 隐藏得分画面，显示游戏内容
    scoreScreen.classList.add('hidden');
    document.getElementById('game-content').classList.remove('hidden');
    
    // 导航到测试开始页面
    navigateTo(2113);
}

// 预加载图片函数（减少加载延迟）
function preloadImages() {
    const imagePaths = [
        'images/开始画面.jpg',
        'images/画面01.jpg',
        'images/画面02.jpg',
        'images/画面03.jpg',
        'images/画面04.jpg',
        'images/画面05.jpg',
        'images/画面06.jpg',
        'images/画面07.jpg',
        'images/画面08.jpg',
        'images/画面09.jpg',
        'images/画面10.jpg',
        'images/画面11.jpg',
        'images/画面12.jpg',
        'images/画面13.jpg',
        'images/画面14.jpg',
        'images/画面15.jpg',
        '极简/画面16.jpg',
        'images/画面17.jpg',
        'images/画面18.jpg',
        'images/画面19.jpg',
        'images/画面20.jpg',
        'images/及格.jpg',
        'images/不及格.jpg'
    ];
    
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onerror = () => {
            console.error(`图片加载失败: ${path}`);
        };
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 检查Firebase是否已加载
    if (typeof firebase === 'undefined') {
        console.error("Firebase未加载，请检查网络连接");
        showMessage("错误: 必要的资源未加载，请刷新页面");
        return;
    }
    
    try {
        initGame();
    } catch (error) {
        console.error("游戏初始化失败:", error);
        showMessage("游戏初始化失败，请刷新页面重试");
    }
});

// 错误处理全局监听
window.addEventListener('error', function(e) {
    console.error("全局错误捕获:", e.error);
    showMessage("发生意外错误，请刷新页面");
});

// 导出函数供HTML调试使用
window.debugGameState = function() {
    console.log("当前游戏状态:", JSON.parse(JSON.stringify(gameState)));
};

// 导出函数供测试使用
window.getCurrentPage = function() {
    return gameState.currentPageId;
};

// 导出函数供测试使用
window.getScore = function() {
    return gameState.score;
};
