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

// 游戏状态和数据
let gameState = {
    currentPage: 2100, // 从开始画面开始
    selectedOptions: {}, // 存储每页选择的选项
    score: 0, // 测试部分得分
    isFirstTest: true, // 是否是第一次测试
    testAnswers: {} // 测试部分的答案
};

// 游戏页面数据
const gamePages = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { content: "Begin", target: 2101 }
        ]
    },
    2101: {
        type: "practice",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { content: "Continue", target: 2102 }
        ]
    },
    2102: {
        type: "practice",
        image: "画面02.jpg",
        text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2103 }
        ]
    },
    2103: {
        type: "practice",
        image: "画面03.jpg",
        text: "Arturo: OK. Where ① you from, Alexa?",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2104 }
        ]
    },
    2104: {
        type: "practice",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { content: "Continue", target: 2105 }
        ]
    },
    2105: {
        type: "practice",
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2106 }
        ]
    },
    2106: {
        type: "practice",
        image: "画面06.jpg",
        text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2107 }
        ]
    },
    2107: {
        type: "practice",
        image: "画面07.jpg",
        text: "Arturo: Who ① Soo-jin? She ② familiar.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2108 }
        ]
    },
    2108: {
        type: "practice",
        image: "画面08.jpg",
        text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2109 }
        ]
    },
    2109: {
        type: "practice",
        image: "画面09.jpg",
        text: "Arturo: Where ① she from?",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2110 }
        ]
    },
    2110: {
        type: "practice",
        image: "画面10.jpg",
        text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
        choices: [
            {
                number: "①",
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2111 }
        ]
    },
    2111: {
        type: "practice",
        image: "画面11.jpg",
        text: "Arturo: Actually, it ① Valdez",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2112 }
        ]
    },
    2112: {
        type: "practice",
        image: "画面12.jpg",
        text: "Alexa: How ① you spell that?",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2113 }
        ]
    },
    2113: {
        type: "test",
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2114 }
        ]
    },
    2114: {
        type: "test",
        image: "画面14.jpg",
        text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2115 }
        ]
    },
    2115: {
        type: "test",
        image: "画面15.jpg",
        text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2116 }
        ]
    },
    2116: {
        type: "test",
        image: "画面16.jpg",
        text: "It ① difficult sometimes because we ② each other only on weekends.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "see", correct: true },
                    { text: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2117 }
        ]
    },
    2117: {
        type: "test",
        image: "画面17.jpg",
        text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", extreme: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { extreme: "saying", correct: false }
                ]
            },
            {
                number: "④",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2118 }
        ]
    },
    2118: {
        type: "test",
        image: "画面18.jpg",
        text: "I ① philosophy and politics, so my courses ② very different from hers.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text extreme: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2119 }
        ]
    },
    2119: {
        type: "test",
        image: "画面19.jpg",
        text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                options: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "④",
                options: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2120 }
        ]
    },
    2120: {
        type: "test",
        image: "画面20.jpg",
        text: "We ① on the phone every night and we ② each other whenever we can.",
        choices: [
            {
                number: "①",
                options: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                number: "②",
                options: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2121 }
        ]
    },
    2121: {
        type: "score",
        buttons: [
            { content: "Next Chapter", action: "nextChapter" },
            { content: "Show the answers", action: "showAnswers" },
            { content: "Try Again", action: "tryAgain" }
        ]
    }
};

// 正确答案文本
const correctAnswersText = `
My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
We talk on the phone every night and we visit each other whenever we can.
`;

// 初始化游戏
function initGame() {
    renderPage(gameState.currentPage);
    
    // 预加载所有图片
    preloadImages();
}

// 预加载图片函数
function preloadImages() {
    const images = [];
    for (let i = 2100; i <= 2121; i++) {
        if (gamePages[i] && gamePages[i].image) {
            const img = new Image();
            img.src = `images/${gamePages[i].image}`;
            images.push(img);
        }
    }
}

// 渲染页面函数
function renderPage(pageId) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    const page = gamePages[pageId];
    if (!page) return;
    
    const screen = document.createElement('div');
    screen.className = 'game-screen';
    
    // 添加页面标题和进度条（非开始和得分页面）
    if (pageId !== 2100 && pageId !== 2121) {
        const titleBar = document.createElement('div');
        titleBar.className = 'page-title';
        
        const titleText = document.createElement('div');
        titleText.className = 'page-title-text';
        titleText.textContent = page.type === 'practice' ? 'Practice' : 'Test';
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        // 计算进度
        let progress = 0;
        if (page.type === 'practice') {
            const practicePages = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
            const currentIndex = practicePages.indexOf(pageId);
            progress = (currentIndex + 1) / practicePages.length;
        } else if (page.type === 'test') {
            const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
            const currentIndex = testPages.indexOf(pageId);
            progress = (currentIndex + 1) / testPages.length;
        }
        
        progressBar.style.width = `${progress * 100}%`;
        progressContainer.appendChild(progressBar);
        
        titleBar.appendChild(titleText);
        titleBar.appendChild(progressContainer);
        screen.appendChild(titleBar);
    }
    
    // 添加图片（非得分页面）
    if (pageId !== 2121) {
        const img = document.createElement('img');
        img.className = 'game-image';
        img.src = `images/${page.image}`;
        img.alt = 'Game Image';
        screen.appendChild(img);
    }
    
    // 添加文本显示
    if (page.text) {
        const textDisplay = document.createElement('div');
        textDisplay.className = 'text-display';
        textDisplay.textContent = page.text;
        screen.appendChild(textDisplay);
    }
    
    // 添加选择题（如果有）
    if (page.choices) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        page.choices.forEach((choiceGroup, groupIndex) => {
            const buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';
            
            const numberSpan = document.createElement('span');
            numberSpan.className = 'button-row-number';
            numberSpan.textContent = choiceGroup.number;
            buttonRow.appendChild(numberSpan);
            
            choiceGroup.options.forEach((option, optionIndex) => {
                const button = document.createElement('button');
                button.className = 'choice-button';
                if (gameState.selectedOptions[pageId] && 
                    gameState.selectedOptions[pageId][groupIndex] === optionIndex) {
                    button.classList.add('selected');
                }
                button.textContent = option.text;
                button.addEventListener('click', () => {
                    selectOption(pageId, groupIndex, optionIndex);
                    // 移除同一行中其他按钮的选中状态
                    const allButtons = buttonRow.querySelectorAll('.choice-button');
                    allButtons.forEach(btn => btn.classList.remove('selected'));
                    // 添加当前按钮的选中状态
                    button.classList.add('selected');
                });
                buttonRow.appendChild(button);
            });
            
            buttonsContainer.appendChild(buttonRow);
        });
        
        screen.appendChild(buttonsContainer);
    }
    
    // 添加继续按钮或其他操作按钮
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    
    page.buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = pageId === 2121 ? 'score-button' : 'continue-button';
        btn.textContent = button.content;
        
        if (pageId === 2121) {
            // 得分页面的特殊按钮处理
            if (button.action === 'nextChapter') {
                if (gameState.isFirstTest && gameState.score < 60) {
                    btn.disabled = true;
                }
                btn.addEventListener('click', () => {
                    // 下一章功能（暂无具体实现）
                    alert('Next chapter is not implemented yet.');
                });
            } else if (button.action === 'showAnswers') {
                if (gameState.isFirstTest && gameState.score < 60) {
                    btn.disabled = true;
                }
                btn.addEventListener('click', showAnswers);
            } else if (button.action === 'tryAgain') {
                btn.addEventListener('click', tryAgain);
            }
        } else {
            // 普通页面的继续按钮
            btn.addEventListener('click', () => {
                if (page.choices && !areAllChoicesSelected(pageId)) {
                    showAlert('Please complete all multiple-choice questions before continuing');
                    return;
                }
                
                // 如果是测试页面，记录答案
                if (page.type === 'test') {
                    calculateScore(pageId);
                }
                
                navigateTo(button.target);
            });
        }
        
        buttonsContainer.appendChild(btn);
    });
    
    screen.appendChild(buttonsContainer);
    
    // 如果是得分页面，显示得分
    if (pageId === 2121) {
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = `Your score is: ${Math.round(gameState.score)}`;
        screen.appendChild(scoreDisplay);
        
        // 保存得分到Firebase
        saveScoreToFirebase();
    }
    
    container.appendChild(screen);
}

// 检查是否所有选择题都已选择
function areAllChoicesSelected(pageId) {
    const page = gamePages[pageId];
    if (!page.choices) return true;
    
    if (!gameState.selectedOptions[pageId]) {
        return false;
    }
    
    return Object.keys(gameState.selectedOptions[pageId]).length === page.choices.length;
}

// 选择选项函数
function selectOption(pageId, groupIndex, optionIndex) {
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    gameState.selectedOptions[pageId][groupIndex] = optionIndex;
}

// 计算得分函数（测试部分）
function calculateScore(pageId) {
    const page = gamePages[pageId];
    if (!page.choices || page.type !== 'test') return;
    
    if (!gameState.testAnswers[pageId]) {
        gameState.testAnswers[pageId] = {};
    }
    
    page.choices.forEach((choiceGroup, groupIndex) => {
        if (gameState.selectedOptions[pageId] && 
            gameState.selectedOptions[pageId][groupIndex] !== undefined) {
            const selectedOptionIndex = gameState.selectedOptions[pageId][groupIndex];
            const isCorrect = choiceGroup.options[selectedOptionIndex].correct;
            
            gameState.testAnswers[pageId][groupIndex] = isCorrect;
            
            if (isCorrect) {
                gameState.score += 4.55; // 每个正确答案加4.55分
            }
        }
    });
}

// 显示警告函数
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    // 3秒后移除警告
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 3000);
}

// 显示正确答案函数
function showAnswers() {
    const modal = document.createElement('div');
    modal.className = 'answers-modal';
    
    const content = document.createElement('div');
    content.className = 'answers-content';
    content.textContent = correctAnswersText;
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'confirm-button';
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.appendChild(content);
    modal.appendChild(confirmButton);
    
    document.body.appendChild(modal);
}

// 重新尝试函数
function tryAgain() {
    // 重置测试相关状态
    gameState.score = 0;
    gameState.isFirstTest = false;
    gameState.testAnswers = {};
    
    // 清除测试页面的选择
    for (let i = 2113; i <= 2120; i++) {
        if (gameState.selectedOptions[i]) {
            delete gameState.selectedOptions[i];
        }
    }
    
    // 跳转到测试开始页面
    navigateTo(2113);
}

// 导航到指定页面函数
function navigateTo(pageId) {
    gameState.currentPage = pageId;
    renderPage(pageId);
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    const now = new Date();
    const roomId = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    const scoreData = {
        score: Math.round(gameState.score),
        timestamp: now.getTime()
    };
    
    database.ref('scores/' + roomId).set(scoreData)
        .catch(error => {
            console.error('Error saving score to Firebase:', error);
        });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
