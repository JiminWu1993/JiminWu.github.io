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
const GameState = {
    START: 'start',
    PRACTICE: 'practice',
    TEST: 'test',
    SCORE: 'score'
};

// 游戏数据
let currentState = GameState.START;
let currentPageId = 2100; // 开始页面ID
let score = 0;
let selectedOptions = {};
let isFirstAttempt = true;
let roomId = null;

// 页面定义
const pages = {
    // 开始页面
    2100: {
        image: "images/开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { content: "Begin", action: "next", target: 2101 }
        ],
        isStart: true
    },
    
    // 练习页面 2101-2112
    2101: {
        image: "images/画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { content: "Continue", action: "next", target: 2102 }
        ],
        isPractice: true
    },
    
    2102: {
        image: "images/画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        options: [
            {
                group: 1,
                options: [
                    { name: "is", correct: true },
                    { name: "am", correct: false },
                    { name: "are", correct: false }
                ]
            },
            {
                group: 2,
                options: [
                    { name: "calls", correct: false },
                    { name: "call", correct: true },
                    { name: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2103 }
        ],
        isPractice: true
    },
    
    2103: {
        image: "images/画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                group: 3,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2104 }
        ],
        isPractice: true
    },
    
    2104: {
        image: "images/画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { content: "Continue", action: "next", target: 2105 }
        ],
        isPractice: true
    },
    
    2105: {
        image: "images/画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                group: 4,
                options: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "living", correct: false }
                ]
            },
            {
                group: 5,
                options: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2106 }
        ],
        isPractice: true
    },
    
    2106: {
        image: "images/画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                group: 6,
                options: [
                    { name: "loves", correct: false },
                    { name: "love", correct: true },
                    { name: "loving", correct: false }
                ]
            },
            {
                group: 7,
                options: [
                    { name: "is", correct: true },
                    { name: "am", correct: false },
                    { name: "are", correct: false }
                ]
            },
            {
                group: 8,
                options: [
                    { name: "loves", correct: true },
                    { name: "love", correct: false },
                    { name: "loving", correct: false }
                ]
            },
            {
                group: 9,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2107 }
        ],
        isPractice: true
    },
    
    2107: {
        image: "images/画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                group: 10,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 11,
                options: [
                    { name: "looks", correct: true },
                    { name: "look", correct: false },
                    { name: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2108 }
        ],
        isPractice: true
    },
    
    2108: {
        image: "images/画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                group: 12,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 13,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 14,
                options: [
                    { name: "has", correct: false },
                    { name: "have", correct: true },
                    { name: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2109 }
        ],
        isPractice: true
    },
    
    2109: {
        image: "images/画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                group: 15,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", extreme: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2110 }
        ],
        isPractice: true
    },
    
    2110: {
        image: "images/画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                group: 16,
                options: [
                    { name: "studies", correct: true },
                    { name: "study", correct: false },
                    { name: "studying", correct: false }
                ]
            },
            {
                group: 17,
                options: [
                    { name: "says", correct: true },
                    { name: "say", correct: false },
                    { name: "saying", correct: extreme }
                ]
            },
            {
                group: 18,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 19,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2111 }
        ],
        isPractice: true
    },
    
    2111: {
        image: "images/画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                group: 20,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", extreme: 2112 }
        ],
        isPractice: true
    },
    
    2112: {
        image: "images/画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                group: 21,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2113 }
        ],
        isPractice: true
    },
    
    // 测试页面 2113-2120
    2113: {
        image: "images/画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                group: 22,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 23,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 24,
                options: [
                    { name: "go", correct: true },
                    { name: "goes", correct: false },
                    { name: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2114 }
        ],
        isTest: true,
        scoreGroup: [22, 23, 24]
    },
    
    2114: {
        image: "images/画面14.jpg",
        text: "Karen  ①  go to university in Oxford; she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                group: 25,
                options: [
                    { name: "don't", correct: false },
                    { name: "isn't", correct: false },
                    { name: "doesn't", correct: true }
                ]
            },
            {
                group: 26,
                options: [
                    { name: "go", correct: false },
                    { name: "goes", correct: true },
                    { extreme: "going", correct: false }
                ]
            },
            {
                group: 27,
                options: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2115 }
        ],
        isTest: true,
        scoreGroup: [25, 26, 27]
    },
    
    2115: {
        image: "images/画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        options: [
            {
                group: 28,
                options: [
                    { name: "lives", correct: false },
                    { name: "live", correct: true },
                    { name: "living", correct: false }
                ]
            },
            {
                group: 29,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2116 }
        ],
        isTest: true,
        scoreGroup: [28, 29]
    },
    
    2116: {
        image: "images/画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                group: 30,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 31,
                options: [
                    { name: "see", correct: true },
                    { name: "sees", correct: false },
                    { name: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2117 }
        ],
        isTest: true,
        scoreGroup: [30, 31]
    },
    
    2117: {
        image: "images/画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                group: 32,
                options: [
                    { name: "studies", correct: true },
                    { name: "study", correct: false },
                    { name: "studying", correct: false }
                ]
            },
            {
                group: 33,
                options: [
                    { name: "love", correct: false },
                    { name: "loves", correct: true },
                    { name: "loving", correct: false }
                ]
            },
            {
                group: 34,
                options: [
                    { name: "says", correct: true },
                    { name: "say", correct: false },
                    { name: "saying", correct: false }
                ]
            },
            {
                group: 35,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2118 }
        ],
        isTest: true,
        scoreGroup: [32, 33, 34, 35]
    },
    
    2118: {
        image: "images/画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        options: [
            {
                group: 36,
                options: [
                    { name: "studies", correct: false },
                    { name: "study", correct: true },
                    { name: "studying", correct: false }
                ]
            },
            {
                group: 37,
                options: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2119 }
        ],
        isTest: true,
        scoreGroup: [36, 37]
    },
    
    2119: {
        image: "images/画面19.jpg",
        extreme: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                group: 38,
                options: [
                    { name: "like", correct: true },
                    { name: "likes", correct: false },
                    { name: "liking", correct: false }
                ]
            },
            {
                group: 39,
                options: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 40,
                options: [
                    { name: "is", extreme: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                group: 41,
                options: [
                    { name: "miss", correct: true },
                    { name: "misses", correct: false },
                    { name: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "next", target: 2120 }
        ],
        isTest: true,
        scoreGroup: [38, 39, 40, 41]
    },
    
    2120: {
        image: "images/画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                group: 42,
                options: [
                    { name: "talk", correct: true },
                    { name: "talks", correct: false },
                    { name: "talking", correct: false }
                ]
            },
            {
                group: 43,
                options: [
                    { name: "visit", correct: true },
                    { name: "visits", correct: false },
                    { name: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", action: "score", target: 2121 }
        ],
        isTest: true,
        scoreGroup: [42, 43]
    },
    
    // 得分页面
    2121: {
        isScore: true
    }
};

// DOM元素引用
const sceneImage = document.getElementById('scene-image');
const textDisplay = document.getElementById('text-display');
const optionsContainer = document.getElementById('options-container');
const continueBtn = document.getElementById('continue-btn');
const pageType = document.getElementById('page-type');
const progressBar = document.getElementById('progress-bar');
const messageToast = document.getElementById('message-toast');
const messageContent = document.getElementById('message-content');
const scoreScreen = document.getElementById('score-screen');
const resultImage = document.getElementById('result-image');
const finalScore = document.getElementById('final-score');
const nextChapterBtn = document.getElementById('next-chapter-btn');
const showAnswersBtn = document.getElementById('show-answers-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const answersModal = document.getElementById('answers-modal');
const correctAnswers = document.getElementById('correct-answers');
const confirmAnswersBtn = document.getElementById('confirm-answers-btn');

// 初始化游戏
function initGame() {
    // 生成基于时间的房间ID
    const now = new Date();
    roomId = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
    
    // 加载初始页面
    loadPage(currentPageId);
    
    // 添加事件监听器
    continueBtn.addEventListener('click', handleContinue);
    nextChapterBtn.addEventListener('click', handleNextChapter);
    showAnswersBtn.addEventListener('click', handleShowAnswers);
    tryAgainBtn.addEventListener('click', handleTryAgain);
    confirmAnswersBtn.addEventListener('click', () => {
        answersModal.classList.add('hidden');
    });
}

// 加载页面
function loadPage(pageId) {
    const page = pages[pageId];
    if (!page) {
        console.error(`Page with ID ${pageId} not found`);
        return;
    }
    
    // 重置选项状态
    selectedOptions = {};
    
    // 更新游戏状态
    if (page.isStart) {
        currentState = GameState.START;
    } else if (page.isPractice) {
        currentState = GameState.PRACTICE;
    } else if (page.isTest) {
        currentState = GameState.TEST;
    } else if (page.isScore) {
        currentState = GameState.SCORE;
        showScoreScreen();
        return;
    }
    
    // 更新页面类型和进度
    updatePageTypeAndProgress(pageId);
    
    // 设置图片和文本
    if (page.image) {
        sceneImage.src = page.image;
        sceneImage.classList.remove('hidden');
    } else {
        sceneImage.classList.add('hidden');
    }
    
    textDisplay.textContent = page.text;
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 添加选项（如果有）
    if (page.options) {
        page.options.forEach(optionGroup => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'option-group';
            
            const groupNumber = document.createElement('div');
            groupNumber.className = 'group-number';
            // 使用相应的数字符号
            const symbols = ['①', '②', '③', '④'];
            groupNumber.textContent = symbols[optionGroup.group % 10 - 1] || '①';
            
            const optionsRow = document.createElement('div');
            optionsRow.className = 'options-row';
            
            optionGroup.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option.name;
                button.dataset.group = optionGroup.group;
                button.dataset.option = option.name;
                
                button.addEventListener('click', () => {
                    selectOption(optionGroup.group, option.name, button);
                });
                
                optionsRow.appendChild(button);
            });
            
            groupDiv.appendChild(groupNumber);
            groupDiv.appendChild(optionsRow);
            optionsContainer.appendChild(groupDiv);
        });
    }
    
    // 设置继续按钮
    continueBtn.textContent = 'Continue';
    continueBtn.dataset.action = page.buttons[0].action;
    continueBtn.dataset.target = page.buttons[0].target;
    
    // 隐藏得分屏幕（如果在显示）
    scoreScreen.classList.add('hidden');
    
    // 显示游戏内容
    document.getElementById('game-content').classList.remove('hidden');
}

// 更新页面类型和进度条
function updatePageTypeAndProgress(pageId) {
    if (pageId >= 2101 && pageId <= 2112) {
        // 练习页面
        pageType.textContent = 'Practice';
        const practiceProgress = ((pageId - 2100) / 13) * 100;
        progressBar.style.width = `${practiceProgress}%`;
    } else if (pageId >= 2113 && pageId <= 2120) {
        // 测试页面
        pageType.textContent = 'Test';
        const testProgress = ((pageId - 2112) / 8) * 100;
        progressBar.style.width = `${testProgress}%`;
    } else {
        // 开始和得分页面
        pageType.textContent = '';
        progressBar.style.width = '0%';
    }
}

// 选择选项
function selectOption(group, option, buttonElement) {
    // 取消同组中其他选项的选择状态
    const groupButtons = document.querySelectorAll(`.option-btn[data-group="${group}"]`);
    groupButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前选项为选中状态
    buttonElement.classList.add('selected');
    
    // 保存选择
    selectedOptions[group] = option;
}

// 处理继续按钮点击
function handleContinue() {
    const page = pages[currentPageId];
    
    // 检查是否所有选项都已选择（如果有选项）
    if (page.options) {
        const allSelected = page.options.every(group => {
            return selectedOptions[group.group] !== undefined;
        });
        
        if (!allSelected) {
            showMessage('Please complete all multiple-choice questions before continuing');
            return;
        }
        
        // 如果是测试页面，计算得分
        if (page.isTest && page.scoreGroup) {
            calculateScore(page.scoreGroup);
        }
    }
    
    // 执行继续操作
    const action = continueBtn.dataset.action;
    const targetPageId = parseInt(continueBtn.dataset.target);
    
    if (action === 'next') {
        currentPageId = targetPageId;
        loadPage(targetPageId);
    } else if (action === 'score') {
        currentPageId = targetPageId;
        loadPage(targetPageId);
    }
}

// 计算得分
function calculateScore(scoreGroups) {
    scoreGroups.forEach(group => {
        const selectedOption = selectedOptions[group];
        const page = pages[currentPageId];
        
        // 查找这个选项是否正确
        page.options.forEach(optionGroup => {
            if (optionGroup.group === group) {
                optionGroup.options.forEach(option => {
                    if (option.name === selectedOption && option.correct) {
                        score += 1; // 每正确一题得1分
                    }
                });
            }
        });
    });
    
    // 将得分保存到Firebase
    saveScoreToFirebase();
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (!roomId) return;
    
    const scoreData = {
        score: score,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    database.ref('scores/' + roomId).set(scoreData)
    .catch(error => {
        console.error('Error saving score to Firebase:', error);
    });
}

// 显示得分屏幕
function showScoreScreen() {
    // 计算最终得分（得分 * 4.55，保留整数）
    const calculatedScore = Math.round(score * 4.55);
    finalScore.textContent = calculatedScore;
    
    // 设置结果图片
    resultImage.src = calculatedScore >= 60 ? 
        "images/及格.jpg" : "images/不及格.jpg";
    
    // 显示得分屏幕
    scoreScreen.classList.remove('hidden');
    document.getElementById('game-content').classList.add('hidden');
    
    // 设置按钮状态
    if (isFirstAttempt) {
        if (calculatedScore >= 60) {
            nextChapterBtn.disabled = false;
            showAnswersBtn.disabled = false;
        } else {
            nextChapterBtn.disabled = true;
            showAnswersBtn.disabled = true;
        }
    } else {
        nextChapterBtn.disabled = false;
        showAnswersBtn.disabled = false;
    }
}

// 处理下一章按钮点击
function handleNextChapter() {
    // 暂无具体交互结果，根据需求可以扩展
    showMessage('Next chapter is coming soon!');
}

// 处理显示答案按钮点击
function handleShowAnswers() {
    // 显示所有正确答案
    let answersHTML = `
        <p>My name's Nick. My girlfriend's name <strong>is</strong> Karen.</p>
        <p>We <strong>are</strong> students. I <strong>go</strong> to university in Oxford.</p>
        <p>Karen <strong>doesn't</strong> go to university in Oxford;</p>
        <p>she <strong>goes</strong> to university in Cambridge.</p>
        <p>She <strong>lives</strong> in Cambridge.</p>
        <p>I <strong>live</strong> with my parents in Woodstock, which <strong>is</strong> a small town near Oxford.</p>
        <p>It's difficult sometimes because we <strong>see</strong> each other only on weekends.</p>
        <p>Karen <strong>studies</strong> history, and she <strong>loves</strong> her course.</p>
        <p>She <strong>says</strong> the architecture in Cambridge <strong>is</strong> beautiful.</p>
        <p>I <strong>study</strong> philosophy and politics, so my courses <strong>are</strong> very different from hers.</p>
        <p>I <strong>like</strong> living in Woodstock because my family <strong>is</strong> there and it's quiet, but I <strong>miss</strong> Karen a lot.</p>
        <p>We <strong>talk</strong> on the phone every night and we <strong>visit</strong> each other whenever we can.</p>
    `;
    
    correctAnswers.innerHTML = answersHTML;
    answersModal.classList.remove('hidden');
}

// 处理再试一次按钮点击
function handleTryAgain() {
    // 重置得分和状态
    score = 0;
    isFirstAttempt = false;
    selectedOptions = {};
    
    // 跳转回测试第一页
    currentPageId = 2113;
    loadPage(currentPageId);
}

// 显示消息提示
function showMessage(message) {
    messageContent.textContent = message;
    messageToast.classList.remove('hidden');
    
    // 3秒后隐藏提示
    setTimeout(() => {
        messageToast.classList.add('hidden');
    }, 3000);
}

// 预加载图片资源
function preloadImages() {
    const imageUrls = [
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
        'images/画面16.jpg',
        'images/画面17.jpg',
        'images/画面18.jpg',
        'images/画面19.jpg',
        'images/画面20.jpg',
        'images/及格.jpg',
        'images/不及格.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initGame();
});

// 处理可能的图片加载错误
sceneImage.addEventListener('error', () => {
    console.error('Failed to load image:', sceneImage.src);
    showMessage('Image loading failed, please check the image path');
});

resultImage.addEventListener('error', () => {
    console.error('Failed to load result image:', resultImage.src);
});
