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

// 游戏状态
let gameState = {
    currentPage: 2100,
    selectedOptions: {},
    testScore: 0,
    isFirstAttempt: true,
    roomId: generateRoomId()
};

// 生成房间ID (月日时分)
function generateRoomId() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return month + day + hours + minutes;
}

// 游戏数据
const gameData = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { text: "Begin", target: 2101 }
        ]
    },
    2101: {
        type: "practice",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { text: "Continue", target: 2102 }
        ]
    },
    2102: {
        type: "practice",
        image: "画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        options: [
            {
                id: "1",
                choices: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "2",
                choices: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2103 }
        ]
    },
    2103: {
        type: "practice",
        image: "画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                id: "3",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2104 }
        ]
    },
    2104: {
        type: "practice",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { text: "Continue", target: 2105 }
        ]
    },
    2105: {
        type: "practice",
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                id: "4",
                choices: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "5",
                choices: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2106 }
        ]
    },
    2106: {
        type: "practice",
        image: "画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                id: "6",
                choices: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "7",
                choices: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "8",
                choices: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "9",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2107 }
        ]
    },
    2107: {
        type: "practice",
        image: "画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                id: "10",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "11",
                choices: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2108 }
        ]
    },
    2108: {
        type: "practice",
        image: "画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                id: "12",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "13",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "14",
                choices: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2109 }
        ]
    },
    2109: {
        type: "practice",
        image: "画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                id: "15",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2110 }
        ]
    },
    2110: {
        type: "practice",
        image: "画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                id: "16",
                choices: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "17",
                choices: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "18",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "19",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2111 }
        ]
    },
    2111: {
        type: "practice",
        image: "画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                id: "20",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2112 }
        ]
    },
    2112: {
        type: "practice",
        image: "画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                id: "21",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2113 }
        ]
    },
    2113: {
        type: "test",
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                id: "22",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "23",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "24",
                choices: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2114 }
        ]
    },
    2114: {
        type: "test",
        image: "画面14.jpg",
        text: "Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                id: "25",
                choices: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                id: "26",
                choices: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                id: "27",
                choices: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2115 }
        ]
    },
    2115: {
        type: "test",
        image: "画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        options: [
            {
                id: "28",
                choices: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "29",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2116 }
        ]
    },
    2116: {
        type: "test",
        image: "画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                id: "30",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "31",
                choices: [
                    { text: "see", correct: true },
                    { text: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2117 }
        ]
    },
    2117: {
        type: "test",
        image: "画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                id: "32",
                choices: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "33",
                choices: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "34",
                choices: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "35",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2118 }
        ]
    },
    2118: {
        type: "test",
        image: "画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        options: [
            {
                id: "36",
                choices: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "37",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2119 }
        ]
    },
    2119: {
        type: "test",
        image: "画面19.jpg",
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                id: "38",
                choices: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                id: "39",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "40",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "41",
                choices: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2120 }
        ]
    },
    2120: {
        type: "test",
        image: "画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                id: "42",
                choices: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                id: "43",
                choices: [
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
                    // 计算得分并保存到数据库
                    calculateScore();
                    saveScoreToDatabase();
                }
            }
        ]
    },
    2121: {
        type: "score",
        buttons: [
            { 
                text: "Next Chapter", 
                action: function() {
                    // 根据条件判断是否可以点击
                    if (gameState.testScore >= 60 || !gameState.isFirstAttempt) {
                        // 实际项目中这里应该有跳转逻辑
                        showToast("Next chapter is not implemented in this demo");
                    } else {
                        showToast("You need to score at least 60 on your first attempt");
                    }
                }
            },
            { 
                text: "Show the answers", 
                action: function() {
                    showAnswers();
                }
            },
            { 
                text: "Try Again", 
                action: function() {
                    // 重置测试状态
                    resetTest();
                    navigateTo(2113);
                }
            }
        ]
    }
};

// 初始化游戏
function initGame() {
    createAllScreens();
    navigateTo(2100);
    setupEventListeners();
}

// 创建所有游戏画面
function createAllScreens() {
    const container = document.getElementById('game-container');
    
    // 为每个页面创建屏幕
    for (const pageId in gameData) {
        const screen = document.createElement('div');
        screen.id = `screen-${pageId}`;
        screen.className = 'game-screen';
        
        const pageData = gameData[pageId];
        
        // 创建页面标题和进度条
        if (pageData.type !== "start" && pageData.type !== "score") {
            const titleBar = document.createElement('div');
            titleBar.className = 'page-title';
            
            const titleText = document.createElement('div');
            titleText.className = 'page-title-text';
            titleText.textContent = pageData.type === "practice" ? "Practice" : "Test";
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.id = `progress-${pageId}`;
            
            progressContainer.appendChild(progressBar);
            titleBar.appendChild(titleText);
            titleBar.appendChild(progressContainer);
            
            screen.appendChild(titleBar);
        }
        
        // 创建图片
        if (pageData.image) {
            const img = document.createElement('img');
            img.className = 'screen-image';
            img.src = `images/${pageData.image}`;
            img.alt = `Page ${pageId} image`;
            screen.appendChild(img);
        }
        
        // 创建文本容器
        if (pageData.text) {
            const textContainer = document.createElement('div');
            textContainer.className = 'text-container';
            textContainer.innerHTML = formatTextWithPlaceholders(pageData.text);
            screen.appendChild(textContainer);
        }
        
        // 创建选项按钮容器
        if (pageData.options) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            
            pageData.options.forEach((optionGroup, index) => {
                const buttonRow = document.createElement('div');
                buttonRow.className = 'button-row';
                
                const rowNumber = document.createElement('div');
                rowNumber.className = 'button-row-number';
                rowNumber.textContent = getNumberSymbol(index);
                buttonRow.appendChild(rowNumber);
                
                optionGroup.choices.forEach((choice, choiceIndex) => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = choice.text;
                    button.dataset.groupId = optionGroup.id;
                    button.dataset.choiceIndex = choiceIndex;
                    button.dataset.correct = choice.correct;
                    
                    button.addEventListener('click', function() {
                        selectOption(optionGroup.id, choiceIndex, pageId);
                    });
                    
                    buttonRow.appendChild(button);
                });
                
                buttonsContainer.appendChild(buttonRow);
            });
            
            screen.appendChild(buttonsContainer);
        }
        
        // 创建继续按钮
        if (pageData.buttons) {
            pageData.buttons.forEach(buttonData => {
                const button = document.createElement('button');
                button.className = pageData.type === "score" ? 'score-button' : 'continue-button';
                button.textContent = buttonData.text;
                
                button.addEventListener('click', function() {
                    // 检查是否所有选项都已选择（如果有选项）
                    if (pageData.options && !areAllOptionsSelected(pageId)) {
                        showToast("Please complete all multiple-choice questions before continuing");
                        return;
                    }
                    
                    // 如果有特殊动作，执行它
                    if (buttonData.action) {
                        buttonData.action();
                    }
                    
                    // 跳转到目标页面
                    if (buttonData.target) {
                        navigateTo(buttonData.target);
                    }
                });
                
                screen.appendChild(button);
            });
        }
        
        // 对于得分屏幕，添加特殊布局
        if (pageData.type === "score") {
            const scoreImage = document.createElement('img');
            scoreImage.className = 'score-image';
            scoreImage.id = 'score-image';
            screen.appendChild(scoreImage);
            
            const scoreText = document.createElement('div');
            scoreText.className = 'score-text';
            scoreText.id = 'score-text';
            screen.appendChild(scoreText);
            
            const scoreButtons = document.createElement('div');
            scoreButtons.className = 'score-buttons';
            
            pageData.buttons.forEach(buttonData => {
                const button = document.createElement('button');
                button.className = 'score-button';
                button.textContent = buttonData.text;
                
                // 特殊处理"Next Chapter"按钮
                if (buttonData.text === "Next Chapter") {
                    button.id = "next-chapter-btn";
                    if (gameState.testScore < 60 && gameState.isFirstAttempt) {
                        button.disabled = true;
                    }
                }
                
                button.addEventListener('click', function() {
                    if (buttonData.action) {
                        buttonData.action();
                    }
                });
                
                scoreButtons.appendChild(button);
            });
            
            screen.appendChild(scoreButtons);
        }
        
        container.appendChild(screen);
    }
}

// 格式化带占位符的文本
function formatTextWithPlaceholders(text) {
    return text.replace(/①|②|③|④/g, match => {
        return `<span style="color: yellow; font-weight: bold;">${match}</span>`;
    });
}

// 获取数字符号
function getNumberSymbol(index) {
    const symbols = ["①", "②", "③", "④"];
    return symbols[index] || "①";
}

// 选择选项
function selectOption(groupId, choiceIndex, pageId) {
    // 保存选择
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    gameState.selectedOptions[pageId][groupId] = choiceIndex;
    
    // 更新UI
    const buttons = document.querySelectorAll(`#screen-${pageId} .option-button[data-group-id="${groupId}"]`);
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    
    const selectedButton = document.querySelector(`#screen-${pageId} .option-button[data-group-id="${groupId}"][data-choice-index="${choiceIndex}"]`);
    selectedButton.classList.add('selected');
}

// 检查是否所有选项都已选择
function areAllOptionsSelected(pageId) {
    const pageData = gameData[pageId];
    if (!pageData.options) return true;
    
    if (!gameState.selectedOptions[pageId]) {
        return false;
    }
    
    for (const optionGroup of pageData.options) {
        if (gameState.selectedOptions[pageId][optionGroup.id] === undefined) {
            return false;
        }
    }
    
    return true;
}

// 导航到指定页面
function navigateTo(pageId) {
    // 隐藏所有屏幕
    const screens = document.getElementsByClassName('game-screen');
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
    }
    
    // 显示目标屏幕
    const targetScreen = document.getElementById(`screen-${pageId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // 更新进度条
        updateProgressBar(pageId);
        
        // 如果是得分屏幕，更新得分显示
        if (pageId == 2121) {
            updateScoreScreen();
        }
    }
    
    // 更新当前页面状态
    gameState.currentPage = pageId;
}

// 更新进度条
function updateProgressBar(pageId) {
    const pageData = gameData[pageId];
    if (!pageData || pageData.type === "start" || pageData.type === "score") {
        return;
    }
    
    const progressBar = document.getElementById(`progress-${pageId}`);
    if (!progressBar) return;
    
    let progress = 0;
    
    if (pageData.type === "practice") {
        // 计算练习进度 (1-12页)
        const practicePages = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
        const currentIndex = practicePages.indexOf(parseInt(pageId));
        if (currentIndex !== -1) {
            progress = ((currentIndex + 1) / practicePages.length) * 100;
        }
    } else if (pageData.type === "test") {
        // 计算测试进度 (13-20页)
        const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
        const currentIndex = testPages.indexOf(parseInt(pageId));
        if (currentIndex !== -1) {
            progress = ((currentIndex + 1) / testPages.length) * 100;
        }
    }
    
    progressBar.style.width = `${progress}%`;
}

// 计算得分
function calculateScore() {
    let correctCount = 0;
    const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
    
    testPages.forEach(pageId => {
        const pageData = gameData[pageId];
        if (pageData.options && gameState.selectedOptions[pageId]) {
            pageData.options.forEach(optionGroup => {
                const selectedChoiceIndex = gameState.selectedOptions[pageId][optionGroup.id];
                if (selectedChoiceIndex !== undefined) {
                    const selectedChoice = optionGroup.choices[selectedChoiceIndex];
                    if (selectedChoice.correct) {
                        correctCount++;
                    }
                }
            });
        }
    });
    
    // 计算得分 (每个正确选项得4.55分，保留到个位)
    gameState.testScore = Math.round(correctCount * 4.55);
    return gameState.testScore;
}

// 保存得分到数据库
function saveScoreToDatabase() {
    const scoreData = {
        score: gameState.testScore,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        isFirstAttempt: gameState.isFirstAttempt
    };
    
    database.ref('scores/' + gameState.roomId).set(scoreData)
        .catch(error => {
            console.error("Error saving score to database: ", error);
        });
}

// 更新得分屏幕
function updateScoreScreen() {
    const scoreImage = document.getElementById('score-image');
    const scoreText = document.getElementById('score-text');
    const nextChapterBtn = document.getElementById('next-chapter-btn');
    
    if (scoreImage) {
        scoreImage.src = gameState.testScore >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    }
    
    if (scoreText) {
        scoreText.textContent = `Your score is : ${gameState.testScore}`;
    }
    
    if (nextChapterBtn) {
        if (gameState.testScore < 60 && gameState.isFirstAttempt) {
            nextChapterBtn.disabled = true;
        } else {
            nextChapterBtn.disabled = false;
        }
    }
}

// 显示答案
function showAnswers() {
    const answersText = document.getElementById('answers-text');
    const answersModal = document.getElementById('answers-modal');
    
    if (answersText) {
        answersText.textContent = `My name's Nick. My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 
she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    }
    
    if (answersModal) {
        answersModal.style.display = 'block';
    }
}

// 重置测试
function resetTest() {
    // 清除测试页面的选择
    const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
    testPages.forEach(pageId => {
        if (gameState.selectedOptions[pageId]) {
            delete gameState.selectedOptions[pageId];
        }
    });
    
    // 重置UI选择状态
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // 标记不是第一次尝试
    gameState.isFirstAttempt = false;
    gameState.testScore = 0;
}

// 显示提示信息
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = 'toast show';
        
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 确认答案按钮
    const confirmAnswersBtn = document.getElementById('confirm-answers');
    if (confirmAnswersBtn) {
        confirmAnswersBtn.addEventListener('click', function() {
            const answersModal = document.getElementById('answers-modal');
            if (answersModal) {
                answersModal.style.display = 'none';
            }
        });
    }
}

// 当页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
