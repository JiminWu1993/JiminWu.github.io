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

// 游戏数据
const gameData = {
    currentScreen: 2100,
    scores: {},
    selectedOptions: {},
    startTime: null,
    roomId: null
};

// 所有游戏画面配置
const screensConfig = [
    // 开始画面 (ID:2100)
    {
        id: 2100,
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        options: [],
        continueTo: 2101
    },
    // 画面01 (ID:2101)
    {
        id: 2101,
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        options: [],
        continueTo: 2102
    },
    // 画面02 (ID:2102)
    {
        id: 2102,
        image: "画面02.jpg",
        text: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
        options: [
            [
                { text: "is", correct: true },
                { text: "am", correct: false },
                { text: "are", correct: false }
            ],
            [
                { text: "calls", correct: false },
                { text: "call", correct: true },
                { text: "calling", correct: false }
            ]
        ],
        continueTo: 2103
    },
    // 画面03 (ID:2103)
    {
        id: 2103,
        image: "画面03.jpg",
        text: "Arturo: OK. Where (3) you from, Alexa?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2104
    },
    // 画面04 (ID:2104)
    {
        id: 2104,
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        options: [],
        continueTo: 2105
    },
    // 画面05 (ID:2105)
    {
        id: 2105,
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I (4) here in the city now, but my family (5) in a small town near Guadalajara.",
        options: [
            [
                { text: "lives", correct: true },
                { text: "live", correct: false },
                { text: "living", correct: false }
            ],
            [
                { text: "lives", correct: true },
                { text: "live", correct: false },
                { text: "are living", correct: false }
            ]
        ],
        continueTo: 2106
    },
    // 画面06 (ID:2106)
    {
        id: 2106,
        image: "画面06.jpg",
        text: "Alexa: Oh, I (6) Mexico! It (7) really beautiful. My brother (8) Mexico, too. Oh, good. Soo-jin (9) here.",
        options: [
            [
                { text: "loves", correct: false },
                { text: "love", correct: true },
                { text: "loving", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "am", correct: false },
                { text: "are", correct: false }
            ],
            [
                { text: "loves", correct: true },
                { text: "love", correct: false },
                { text: "loving", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2107
    },
    // 画面07 (ID:2107)
    {
        id: 2107,
        image: "画面07.jpg",
        text: "Arturo: Who (10) Soo-jin? She (11) familiar.",
        options: [
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ],
            [
                { text: "looks", correct: true },
                { text: "look", correct: false },
                { text: "looking", correct: false }
            ]
        ],
        continueTo: 2108
    },
    // 画面08 (ID:2108)
    {
        id: 2108,
        image: "画面08.jpg",
        text: "Alexa: She (12) my classmate. We (13) in the same business class. We (14) our class every Monday and Wednesday.",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ],
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ],
            [
                { text: "has", correct: false },
                { text: "have", correct: true },
                { text: "having", correct: false }
            ]
        ],
        continueTo: 2109
    },
    // 画面09 (ID:2109)
    {
        id: 2109,
        image: "画面09.jpg",
        text: "Arturo: Where (15) she from?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2110
    },
    // 画面10 (ID:2110)
    {
        id: 2110,
        image: "画面10.jpg",
        text: "Alexa: South Korea. She (16) marketing. She (17) the classes (18) very interesting. Let's go and say hello. Sorry, what (19) your last name again? Vargas?",
        options: [
            [
                { text: "studies", correct: true },
                { text: "study", correct: false },
                { text: "studying", correct: false }
            ],
            [
                { text: "says", correct: true },
                { text: "say", correct: false },
                { text: "saying", correct: false }
            ],
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2111
    },
    // 画面11 (ID:2111)
    {
        id: 2111,
        image: "画面11.jpg",
        text: "Arturo: Actually, it (20) Valdez",
        options: [
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2112
    },
    // 画面12 (ID:2112)
    {
        id: 2112,
        image: "画面12.jpg",
        text: "Alexa: How (21) you spell that?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2113
    },
    // 画面13 (ID:2113) - 开始计分
    {
        id: 2113,
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.",
        options: [
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ],
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ],
            [
                { text: "go", correct: true },
                { text: "goes", correct: false },
                { text: "going", correct: false }
            ]
        ],
        continueTo: 2114
    },
    // 画面14 (ID:2114) - 计分
    {
        id: 2114,
        image: "画面14.jpg",
        text: "Karen (4) go to university in Oxford; she (5) to university in Cambridge. She (6) in Cambridge.",
        options: [
            [
                { text: "don't", correct: false },
                { text: "isn't", correct: false },
                { text: "doesn't", correct: true }
            ],
            [
                { text: "go", correct: false },
                { text: "goes", correct: true },
                { text: "going", correct: false }
            ],
            [
                { text: "lives", correct: true },
                { text: "live", correct: false },
                { text: "living", correct: false }
            ]
        ],
        continueTo: 2115
    },
    // 画面15 (ID:2115) - 计分
    {
        id: 2115,
        image: "画面15.jpg",
        text: "I (7) with my parents in Woodstock, which (8) a small town near Oxford.",
        options: [
            [
                { text: "lives", correct: false },
                { text: "live", correct: true },
                { text: "living", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2116
    },
    // 画面16 (ID:2116) - 计分
    {
        id: 2116,
        image: "画面16.jpg",
        text: "It (9) difficult sometimes because we (10) each other only on weekends.",
        options: [
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ],
            [
                { text: "see", correct: true },
                { text: "sees", correct: false },
                { text: "seeing", correct: false }
            ]
        ],
        continueTo: 2117
    },
    // 画面17 (ID:2117) - 计分
    {
        id: 2117,
        image: "画面17.jpg",
        text: "Karen (11) history, and she (12) her course. She (13) the architecture in Cambridge (14) beautiful.",
        options: [
            [
                { text: "studies", correct: true },
                { text: "study", correct: false },
                { text: "studying", correct: false }
            ],
            [
                { text: "love", correct: false },
                { text: "loves", correct: true },
                { text: "loving", correct: false }
            ],
            [
                { text: "says", correct: true },
                { text: "say", correct: false },
                { text: "saying", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2118
    },
    // 画面18 (ID:2118) - 计分
    {
        id: 2118,
        image: "画面18.jpg",
        text: "I (15) philosophy and politics, so my courses (16) very different from hers.",
        options: [
            [
                { text: "studies", correct: false },
                { text: "study", correct: true },
                { text: "studying", correct: false }
            ],
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        continueTo: 2119
    },
    // 画面19 (ID:2119) - 计分
    {
        id: 2119,
        image: "画面19.jpg",
        text: "I (17) living in Woodstock because my family (18) there and it (19) quiet, but I (20) Karen a lot.",
        options: [
            [
                { text: "like", correct: true },
                { text: "likes", correct: false },
                { text: "liking", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ],
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ],
            [
                { text: "miss", correct: true },
                { text: "misses", correct: false },
                { text: "missing", correct: false }
            ]
        ],
        continueTo: 2120
    },
    // 画面20 (ID:2120) - 计分
    {
        id: 2120,
        image: "画面20.jpg",
        text: "We (21) on the phone every night and we (22) each other whenever we can.",
        options: [
            [
                { text: "talk", correct: true },
                { text: "talks", correct: false },
                { text: "talking", correct: false }
            ],
            [
                { text: "visit", correct: true },
                { text: "visits", correct: false },
                { text: "visiting", correct: false }
            ]
        ],
        continueTo: 2121
    },
    // 得分画面 (ID:2121)
    {
        id: 2121,
        image: "", // 根据分数动态设置
        text: "",
        options: [],
        continueTo: null
    }
];

// 初始化游戏
function initGame() {
    // 创建所有游戏画面
    createAllScreens();
    
    // 显示开始画面
    showScreen(2100);
    
    // 设置游戏开始时间
    gameData.startTime = new Date();
    
    // 生成房间ID (月日小时分钟，例如08290825)
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    gameData.roomId = month + day + hours + minutes;
    
    console.log("游戏初始化完成，房间ID:", gameData.roomId);
}

// 创建所有游戏画面
function createAllScreens() {
    const gameContainer = document.getElementById('game-container');
    
    screensConfig.forEach(screenConfig => {
        // 跳过开始画面，因为它已经存在于HTML中
        if (screenConfig.id === 2100) return;
        
        const screen = document.createElement('div');
        screen.id = `screen-${screenConfig.id}`;
        screen.className = 'screen';
        
        // 图片容器
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const image = document.createElement('img');
        image.className = 'screen-image';
        image.alt = `画面${screenConfig.id}`;
        image.src = `images/${screenConfig.image}`;
        image.onerror = function() {
            console.error(`图片加载失败: images/${screenConfig.image}`);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWbvueJh+Wwj+ivt+i+k+WFpTwvdGV4dD48L3N2Zz4=';
        };
        
        imageContainer.appendChild(image);
        screen.appendChild(imageContainer);
        
        // 文本容器
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        textContainer.textContent = screenConfig.text;
        screen.appendChild(textContainer);
        
        // 选项容器（如果有选项）
        if (screenConfig.options && screenConfig.options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            screenConfig.options.forEach((optionRow, rowIndex) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'option-row';
                
                optionRow.forEach((option, optionIndex) => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option.text;
                    button.dataset.row = rowIndex;
                    button.dataset.index = optionIndex;
                    button.dataset.correct = option.correct;
                    
                    button.addEventListener('click', function() {
                        selectOption(screenConfig.id, rowIndex, optionIndex);
                    });
                    
                    rowDiv.appendChild(button);
                });
                
                optionsContainer.appendChild(rowDiv);
            });
            
            screen.appendChild(optionsContainer);
        }
        
        // 继续按钮
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-button';
        continueButton.textContent = 'Continue';
        
        continueButton.addEventListener('click', function() {
            // 检查是否所有行都已选择（如果有选项）
            if (screenConfig.options && screenConfig.options.length > 0) {
                const selectedOptions = gameData.selectedOptions[screenConfig.id] || {};
                const allRowsSelected = screenConfig.options.every((_, rowIndex) => {
                    return selectedOptions[rowIndex] !== undefined;
                });
                
                if (!allRowsSelected) {
                    showMessage('Please complete all multiple-choice questions before continuing');
                    return;
                }
                
                // 如果是计分画面（从2113开始），计算分数
                if (screenConfig.id >= 2113) {
                    calculateScore(screenConfig.id);
                }
            }
            
            navigateTo(screenConfig.continueTo);
        });
        
        screen.appendChild(continueButton);
        gameContainer.appendChild(screen);
    });
}

// 显示指定ID的画面
function showScreen(screenId) {
    // 隐藏所有画面
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 显示指定画面
    const screen = document.getElementById(`screen-${screenId}`);
    if (screen) {
        screen.classList.add('active');
        gameData.currentScreen = screenId;
        
        // 如果是得分画面，计算最终得分并显示
        if (screenId === 2121) {
            showFinalScore();
        }
    } else {
        console.error(`找不到ID为${screenId}的画面`);
    }
}

// 选择选项
function selectOption(screenId, rowIndex, optionIndex) {
    // 初始化该画面的选择记录（如果尚未存在）
    if (!gameData.selectedOptions[screenId]) {
        gameData.selectedOptions[screenId] = {};
    }
    
    // 取消选择同一行中的其他选项
    const optionButtons = document.querySelectorAll(`#screen-${screenId} .option-row:nth-child(${rowIndex + 1}) .option-button`);
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // 选择当前选项
    const selectedButton = document.querySelector(`#screen-${screenId} .option-row:nth-child(${rowIndex + 1}) .option-button:nth-child(${optionIndex + 1})`);
    selectedButton.classList.add('selected');
    
    // 记录选择
    gameData.selectedOptions[screenId][rowIndex] = optionIndex;
}

// 计算当前画面的得分
function calculateScore(screenId) {
    const screenConfig = screensConfig.find(screen => screen.id === screenId);
    const selectedOptions = gameData.selectedOptions[screenId];
    
    if (!screenConfig.options || !selectedOptions) return;
    
    // 初始化该画面的得分记录（如果尚未存在）
    if (!gameData.scores[screenId]) {
        gameData.scores[screenId] = {};
    }
    
    // 计算每一行的得分
    screenConfig.options.forEach((optionRow, rowIndex) => {
        const selectedOptionIndex = selectedOptions[rowIndex];
        if (selectedOptionIndex !== undefined) {
            const isCorrect = optionRow[selectedOptionIndex].correct;
            gameData.scores[screenId][rowIndex] = isCorrect;
            
            if (isCorrect) {
                showMessage('回答正确!');
            } else {
                // 找到正确答案
                const correctIndex = optionRow.findIndex(option => option.correct);
                showMessage(`回答错误。正确答案是: ${optionRow[correctIndex].text}`);
            }
        }
    });
}

// 显示最终得分
function showFinalScore() {
    // 计算总分（从2113画面开始）
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    for (let screenId = 2113; screenId <= 2120; screenId++) {
        const screenScores = gameData.scores[screenId];
        if (screenScores) {
            for (let rowIndex in screenScores) {
                totalQuestions++;
                if (screenScores[rowIndex]) {
                    totalCorrect++;
                }
            }
        }
    }
    
    // 计算得分（每个正确选项得4.55分，保留到个位）
    const score = Math.round(totalCorrect * 4.55);
    
    // 更新得分画面
    const scoreScreen = document.getElementById('screen-2121');
    if (scoreScreen) {
        // 设置背景图片
        const image = scoreScreen.querySelector('.screen-image');
        if (score >= 60) {
            image.src = 'images/及格.jpg';
        } else {
            image.src = 'images/不及格.jpg';
        }
        image.onerror = function() {
            console.error('得分图片加载失败');
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuacque7juWKoOWFpTwvdGV4dD48L3N2Zz4=';
        };
        
        // 设置得分文本
        const textContainer = scoreScreen.querySelector('.text-container');
        textContainer.innerHTML = `
            <div class="score-display">得分: ${score}</div>
            <div>正确题数: ${totalCorrect}/${totalQuestions}</div>
        `;
        
        // 移除继续按钮（最后一个画面没有继续按钮）
        const continueButton = scoreScreen.querySelector('.continue-button');
        if (continueButton) {
            continueButton.remove();
        }
    }
    
    // 保存得分到Firebase
    saveScoreToFirebase(score, totalCorrect, totalQuestions);
}

// 保存得分到Firebase
function saveScoreToFirebase(score, correctCount, totalQuestions) {
    try {
        const roomRef = database.ref('rooms/' + gameData.roomId);
        const scoreData = {
            score: score,
            correctCount: correctCount,
            totalQuestions: totalQuestions,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        roomRef.set(scoreData)
            .then(() => {
                console.log('得分已保存到Firebase');
            })
            .catch(error => {
                console.error('保存得分到Firebase时出错:', error);
            });
    } catch (error) {
        console.error('Firebase操作错误:', error);
    }
}

// 显示消息
function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    
    // 3秒后隐藏消息
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// 导航到指定画面
function navigateTo(screenId) {
    if (screenId) {
        showScreen(screenId);
    }
}

// 页面加载完成后初始化游戏
window.addEventListener('load', initGame);
