// Firebase配置和初始化
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

// 游戏状态和变量
let currentPageId = 2100; // 当前页面ID，从开始画面启动
let score = 0; // 总得分
let selectedOptions = {}; // 存储每页选择的选项 {组号: 选项数据}
let roomId = null; // Firebase房间ID
let isFirstAttempt = true; // 是否是第一次尝试
let pageStartTime = 0; // 页面开始时间（用于计算停留时间）[2](@ref)

// 页面数据定义
const pageData = {
    // 开始画面 (2100)
    2100: {
        image: "images/开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { text: "Begin", target: 2101 }
        ],
        isStartPage: true
    },
    
    // 练习页面 (2101-2112)
    2101: {
        image: "images/画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { text: "Continue", target: 2102 }
        ],
        pageType: "practice",
        progress: 1/13
    },
    
    2102: {
        image: "images/画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        options: [
            {
                group: 1,
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                group: 2,
                options: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2103 }
        ],
        pageType: "practice",
        progress: 2/13
    },
    
    2103: {
        image: "images/画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                group: 3,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2104 }
        ],
        pageType: "practice",
        progress: 3/13
    },
    
    2104: {
        image: "images/画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { text: "Continue", target: 2105 }
        ],
        pageType: "practice",
        progress: 4/13
    },
    
    2105: {
        image: "images/画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                group: 4,
                options: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                group: 5,
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2106 }
        ],
        pageType: "practice",
        progress: 5/13
    },
    
    2106: {
        image: "images/画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                group: 6,
                options: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 7,
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                group: 8,
                options: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 9,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2107 }
        ],
        pageType: "practice",
        progress: 6/13
    },
    
    2107: {
        image: "images/画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                group: 10,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 11,
                options: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2108 }
        ],
        pageType: "practice",
        progress: 7/13
    },
    
    2108: {
        image: "images/画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                group: 12,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 13,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 14,
                options: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2109 }
        ],
        pageType: "practice",
        progress: 8/13
    },
    
    2109: {
        image: "images/画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                group: 15,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2110 }
        ],
        pageType: "practice",
        progress: 9/13
    },
    
    2110: {
        image: "images/画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                group: 16,
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                group: 17,
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                group: 18,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 19,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2111 }
        ],
        pageType: "practice",
        progress: 10/13
    },
    
    2111: {
        image: "images/画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                group: 20,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2112 }
        ],
        pageType: "practice",
        progress: 11/13
    },
    
    2112: {
        image: "images/画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                group: 21,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2113 }
        ],
        pageType: "practice",
        progress: 12/13
    },
    
    // 测试页面 (2113-2120)
    2113: {
        image: "images/画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                group: 22,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 23,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 24,
                options: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2114 }
        ],
        pageType: "test",
        progress: 1/7,
        scoreGroup: true
    },
    
    2114: {
        image: "images/画面14.jpg",
        text: "Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                group: 25,
                options: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                group: 26,
                options: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                group: 27,
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2115 }
        ],
        pageType: "test",
        progress: 2/7,
        scoreGroup: true
    },
    
    2115: {
        image: "images/画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        options: [
            {
                group: 28,
                options: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                group: 29,
                options: [
                    { text: "is", correct: true },
                    { text: "are", extreme: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2116 }
        ],
        pageType: "test",
        progress: 3/7,
        scoreGroup: true
    },
    
    2116: {
        image: "images/画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                group: 30,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: extreme }
                ]
            },
            {
                group: 31,
                options: [
                    { text: "see", correct: true },
                    { extreme: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2117 }
        ],
        pageType: "test",
        progress: 4/7,
        scoreGroup: true
    },
    
    2117: {
        image: "images/画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                group: 32,
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                group: 33,
                options: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                group: 34,
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                group: 35,
                options: [
                    { text: "is", extreme: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2118 }
        ],
        pageType: "test",
        progress: 5/7,
        scoreGroup: true
    },
    
    2118: {
        image: "images/画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        options: [
            {
                group: 36,
                options: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                extreme: 37,
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2119 }
        ],
        pageType: "test",
        progress: 6/7,
        scoreGroup: true
    },
    
    2119: {
        image: "images/画面19.jpg",
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                group: 38,
                options: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                group: 39,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 40,
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                group: 41,
                options: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2120 }
        ],
        pageType: "test",
        progress: 7/7,
        scoreGroup: true
    },
    
    2120: {
        image: "images/画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                group: 42,
                options: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                group: 43,
                options: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { 
                text: "Continue", 
                target: 2121,
                action: function() {
                    // 从Firebase获取得分情况
                    getScoreFromFirebase();
                }
            }
        ],
        pageType: "test",
        scoreGroup: true
    },
    
    // 得分画面 (2121)
    2121: {
        image: "", // 动态设置
        text: "",
        buttons: [],
        pageType: "score"
    }
};

// DOM元素引用
const sceneImage = document.getElementById('scene-image');
const textDisplay = document.getElementById('text-display');
const optionsContainer = document.getElementById('options-container');
const continueBtn = document.getElementById('continue-btn');
const pageTypeDisplay = document.getElementById('page-type');
const progressBar = document.getElementById('progress-bar');
const messageToast = document.getElementById('message-toast');
const scoreScreen = document.getElementById('score-screen');
const resultImage = document.getElementById('result-image');
const scoreDisplay = document.getElementById('score-display');
const nextChapterBtn = document.getElementById('next-chapter-btn');
const showAnswersBtn = document.getElementById('show-answers-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const answersModal = document.getElementById('answers-modal');
const answersContent = document.getElementById('answers-content');
const confirmAnswersBtn = document.getElementById('confirm-answers-btn');

// 初始化游戏
function initGame() {
    // 生成基于时间的房间ID
    const now = new Date();
    roomId = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
    
    // 检查是否是第一次尝试
    isFirstAttempt = localStorage.getItem('game_attempted') === null;
    
    // 加载开始页面
    loadPage(2100);
    
    // 添加事件监听器
    continueBtn.addEventListener('click', handleContinue);
    nextChapterBtn.addEventListener('click', handleNextChapter);
    showAnswersBtn.addEventListener('click', handleShowAnswers);
    tryAgainBtn.addEventListener('click', handleTryAgain);
    confirmAnswersBtn.addEventListener('click', () => {
        answersModal.style.display = 'none';
    });
    
    console.log('Game initialized with room ID:', roomId);
}

// 加载页面
function loadPage(pageId) {
    const page = pageData[pageId];
    if (!page) {
        console.error(`Page with ID ${pageId} not found`);
        showMessage('Page loading error');
        return;
    }
    
    // 记录页面停留时间开始[2](@ref)
    pageStartTime = new Date().getTime();
    
    currentPageId = pageId;
    
    // 更新页面标题和进度条
    if (page.pageType) {
        pageTypeDisplay.textContent = page.pageType === "practice" ? "Practice" : "Test";
        if (page.progress) {
            progressBar.style.width = `${page.progress * 100}%`;
        }
    }
    
    // 隐藏得分画面，显示游戏内容
    scoreScreen.style.display = 'none';
    document.getElementById('game-content').style.display = 'flex';
    answersModal.style.display = 'none';
    
    // 设置场景图片
    sceneImage.src = page.image;
    sceneImage.onerror = () => {
        console.error(`Failed to load image: ${page.image}`);
        showMessage('Image loading failed');
    };
    
    // 设置文本内容
    textDisplay.textContent = page.text;
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    selectedOptions = {};
    
    // 添加选项按钮（如果有）
    if (page.options) {
        page.options.forEach(optionGroup => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'option-group';
            
            // 添加组编号
            const groupNumber = document.createElement('div');
            groupNumber.className = 'group-number';
            groupNumber.textContent = getGroupNumberSymbol(optionGroup.group);
            groupDiv.appendChild(groupNumber);
            
            const rowDiv = document.createElement('div');
            rowDiv.className = 'options-row';
            
            optionGroup.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option.text;
                button.dataset.group = optionGroup.group;
                button.dataset.correct = option.correct;
                
                button.addEventListener('click', () => {
                    // 取消同组中其他按钮的选中状态
                    const siblings = rowDiv.querySelectorAll('.option-btn');
                    siblings.forEach(btn => btn.classList.remove('selected'));
                    
                    // 设置当前按钮为选中状态
                    button.classList.add('selected');
                    
                    // 存储选择
                    selectedOptions[optionGroup.group] = {
                        text: option.text,
                        correct: option.correct === 'true' || option.correct === true
                    };
                });
                
                rowDiv.appendChild(button);
            });
            
            groupDiv.appendChild(rowDiv);
            optionsContainer.appendChild(groupDiv);
        });
    }
    
    // 设置继续按钮
    if (page.buttons && page.buttons.length > 0) {
        continueBtn.textContent = page.buttons[0].text;
        continueBtn.style.display = 'block';
    } else {
        continueBtn.style.display = 'none';
    }
    
    // 如果是开始页面，隐藏页面标题区域
    if (page.isStartPage) {
        document.getElementById('page-title').style.display = 'none';
    } else {
        document.getElementById('page-title').style.display = 'flex';
    }
    
    // 如果是得分页面，特殊处理
    if (pageId === 2121) {
        showScoreScreen();
    }
    
    console.log(`Page ${pageId} loaded successfully`);
}

// 处理继续按钮点击
function handleContinue() {
    const page = pageData[currentPageId];
    const nextPageId = page.buttons[0].target;
    
    // 记录页面停留时间[2](@ref)
    const endTime = new Date().getTime();
    const stayTime = Math.floor((endTime - pageStartTime) / 1000);
    console.log(`Stay time on page ${currentPageId}: ${stayTime} seconds`);
    
    // 检查是否所有选项都已选择（如果有选项）
    if (page.options && Object.keys(selectedOptions).length < page.options.length) {
        showMessage('Please complete all multiple-choice questions before continuing');
        return;
    }
    
    // 如果是计分组，计算得分
    if (page.scoreGroup) {
        const correctSelections = Object.values(selectedOptions).filter(opt => opt.correct).length;
        score += correctSelections;
        console.log(`Score updated: ${score} points`);
    }
    
    // 执行特殊操作（如果有）
    if (page.buttons[0].action) {
        page.buttons[0].action();
    }
    
    // 加载下一页
    loadPage(nextPageId);
}

// 显示得分画面
function showScoreScreen() {
    document.getElementById('game-content').style.display = 'none';
    scoreScreen.style.display = 'flex';
    
    // 计算得分（每组正确选项得1分，共22组）
    const totalCorrect = Object.values(selectedOptions).filter(opt => opt.correct).length;
    const finalScore = Math.round(totalCorrect * 4.55);
    
    // 设置结果图片
    resultImage.src = finalScore >= 60 ? "images/及格.jpg" : "images/不及格.jpg";
    resultImage.onerror = () => {
        console.error('Failed to load result image');
        resultImage.alt = finalScore >= 60 ? "Pass" : "Fail";
    };
    
    // 显示得分
    scoreDisplay.textContent = `Your score is: ${finalScore}`;
    
    // 设置按钮状态
    if (isFirstAttempt) {
        nextChapterBtn.disabled = finalScore < 60;
        showAnswersBtn.disabled = finalScore < 60;
        localStorage.setItem('game_attempted', 'true');
    } else {
        nextChapterBtn.disabled = false;
        showAnswersBtn.disabled = false;
    }
    
    // 保存得分到Firebase
    saveScoreToFirebase(finalScore);
    
    console.log(`Final score: ${finalScore}, First attempt: ${isFirstAttempt}`);
}

// 处理下一章按钮点击
function handleNextChapter() {
    // 暂无交互结果，根据需求可以添加
    showMessage('Next chapter is not available yet');
}

// 处理显示答案按钮点击
function handleShowAnswers() {
    answersContent.textContent = `
        My name's Nick. My girlfriend's name is Karen. 
        We're students. I go to university in Oxford. 
        Karen doesn't go to university in Oxford; she goes to university in Cambridge. 
        She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
        It's difficult sometimes because we see each other only on weekends. 
        Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
        I study philosophy and politics, so my courses are very different from hers. 
        I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
        We talk on the phone every night and we visit each other whenever we can.
    `;
    answersModal.style.display = 'block';
}

// 处理重试按钮点击
function handleTryAgain() {
    // 清零分数并重新开始测试
    score = 0;
    isFirstAttempt = false;
    loadPage(2113); // 跳转到第一个测试页面
    console.log('Game restarted from test section');
}

// 显示提示消息
function showMessage(message) {
    messageToast.textContent = message;
    messageToast.style.display = 'block';
    
    setTimeout(() => {
        messageToast.style.display = 'none';
    }, 3000);
}

// 获取组编号符号
function getGroupNumberSymbol(groupNum) {
    const groupSymbols = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
    return groupSymbols[groupNum - 1] || groupNum;
}

// 从Firebase获取得分情况
function getScoreFromFirebase() {
    if (!roomId) return;
    
    database.ref('scores/' + roomId).once('value')
        .then(snapshot => {
            const data = snapshot.val();
            if (data) {
                console.log('Score from Firebase:', data.score);
            }
        })
        .catch(error => {
            console.error('Error fetching score from Firebase:', error);
        });
}

// 保存得分到Firebase
function saveScoreToFirebase(finalScore) {
    if (!roomId) return;
    
    const scoreData = {
        score: finalScore,
        timestamp: new Date().getTime(),
        isFirstAttempt: isFirstAttempt
    };
    
    database.ref('scores/' + roomId).set(scoreData)
        .then(() => {
            console.log('Score saved to Firebase successfully');
        })
        .catch(error => {
            console.error('Error saving score to Firebase:', error);
        });
}

// 页面加载完成后初始化游戏
window.addEventListener('load', initGame);

// 防止页面滚动和缩放
document.addEventListener('touchmove', function (e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// 处理键盘事件（防止缩放）
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});

// 错误处理全局捕获
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showMessage('An error occurred. Please refresh the page.');
});

// 页面卸载前保存状态[2](@ref)
window.addEventListener('beforeunload', function() {
    const endTime = new Date().getTime();
    const totalStayTime = Math.floor((endTime - pageStartTime) / 1000);
    console.log(`Total stay time: ${totalStayTime} seconds`);
    
    // 保存游戏状态到localStorage
    localStorage.setItem('game_current_page', currentPageId);
    localStorage.setItem('game_score', score);
});
