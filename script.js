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

// 游戏状态
let gameState = {
    currentScreen: 2100,
    selectedOptions: {},
    score: 0
};

// 游戏数据
const gameData = {
    2100: {
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { content: "Begin", correct: null, action: () => navigateTo(2101) }
        ]
    },
    2101: {
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2102) }
        ]
    },
    2102: {
        image: "画面02.jpg",
        text: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
        optionGroups: [
            {
                id: "1",
                options: [
                    { content: "is", correct: true },
                    { content: "am", correct: false },
                    { content: "are", correct: false }
                ]
            },
            {
                id: "2",
                options: [
                    { content: "calls", correct: false },
                    { content: "call", correct: true },
                    { content: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2103) }
        ]
    },
    2103: {
        image: "画面03.jpg",
        text: "Arturo: OK. Where (3) you from, Alexa?",
        optionGroups: [
            {
                id: "3",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2104) }
        ]
    },
    2104: {
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2105) }
        ]
    },
    2105: {
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I (4) here in the city now, but my family (5) in a small town near Guadalajara.",
        optionGroups: [
            {
                id: "4",
                options: [
                    { content: "lives", correct: true },
                    { content: "live", correct: false },
                    { content: "living", correct: false }
                ]
            },
            {
                id: "5",
                options: [
                    { content: "lives", correct: true },
                    { content: "live", correct: false },
                    { content: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2106) }
        ]
    },
    2106: {
        image: "画面06.jpg",
        text: "Alexa: Oh, I (6) Mexico! It (7) really beautiful. My brother (8) Mexico, too. Oh, good. Soo-jin (9) here.",
        optionGroups: [
            {
                id: "6",
                options: [
                    { content: "loves", correct: false },
                    { content: "love", correct: true },
                    { content: "loving", correct: false }
                ]
            },
            {
                id: "7",
                options: [
                    { content: "is", correct: true },
                    { content: "am", correct: false },
                    { content: "are", correct: false }
                ]
            },
            {
                id: "8",
                options: [
                    { content: "loves", correct: true },
                    { content: "love", correct: false },
                    { content: "loving", correct: false }
                ]
            },
            {
                id: "9",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2107) }
        ]
    },
    2107: {
        image: "画面07.jpg",
        text: "Arturo: Who (10) Soo-jin? She (11) familiar.",
        optionGroups: [
            {
                id: "10",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "11",
                options: [
                    { content: "looks", correct: true },
                    { content: "look", correct: false },
                    { content: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2108) }
        ]
    },
    2108: {
        image: "画面08.jpg",
        text: "Alexa: She (12) my classmate. We (13) in the same business class. We (14) our class every Monday and Wednesday.",
        optionGroups: [
            {
                id: "12",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "13",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "14",
                options: [
                    { content: "has", correct: false },
                    { content: "have", correct: true },
                    { content: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2109) }
        ]
    },
    2109: {
        image: "画面09.jpg",
        text: "Arturo: Where (15) she from?",
        optionGroups: [
            {
                id: "15",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2110) }
        ]
    },
    2110: {
        image: "画面10.jpg",
        text: "Alexa: South Korea. She (16) marketing. She (17) the classes (18) very interesting. Let's go and say hello. Sorry, what (19) your last name again? Vargas?",
        optionGroups: [
            {
                id: "16",
                options: [
                    { content: "studies", correct: true },
                    { content: "study", correct: false },
                    { content: "studying", correct: false }
                ]
            },
            {
                id: "17",
                options: [
                    { content: "says", correct: true },
                    { content: "say", correct: false },
                    { content: "saying", correct: false }
                ]
            },
            {
                id: "18",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "19",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2111) }
        ]
    },
    2111: {
        image: "画面11.jpg",
        text: "Arturo: Actually, it (20) Valdez",
        optionGroups: [
            {
                id: "20",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2112) }
        ]
    },
    2112: {
        image: "画面12.jpg",
        text: "Alexa: How (21) you spell that?",
        optionGroups: [
            {
                id: "21",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2113) }
        ]
    },
    2113: {
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.",
        optionGroups: [
            {
                id: "22",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "23",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "24",
                options: [
                    { content: "go", correct: true },
                    { content: "goes", correct: false },
                    { content: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2114) }
        ]
    },
    2114: {
        image: "画面14.jpg",
        text: "Karen (4) go to university in Oxford; she (5) to university in Cambridge. She (6) in Cambridge.",
        optionGroups: [
            {
                id: "25",
                options: [
                    { content: "don't", correct: false },
                    { content: "isn't", correct: false },
                    { content: "doesn't", correct: true }
                ]
            },
            {
                id: "26",
                options: [
                    { content: "go", correct: false },
                    { content: "goes", correct: true },
                    { content: "going", correct: false }
                ]
            },
            {
                id: "27",
                options: [
                    { content: "lives", correct: true },
                    { content: "live", correct: false },
                    { content: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2115) }
        ]
    },
    2115: {
        image: "画面15.jpg",
        text: "I (7) with my parents in Woodstock, which (8) a small town near Oxford.",
        optionGroups: [
            {
                id: "28",
                options: [
                    { content: "lives", correct: false },
                    { content: "live", correct: true },
                    { content: "living", correct: false }
                ]
            },
            {
                id: "29",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2116) }
        ]
    },
    2116: {
        image: "画面16.jpg",
        text: "It (9) difficult sometimes because we (10) each other only on weekends.",
        optionGroups: [
            {
                id: "30",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "31",
                options: [
                    { content: "see", correct: true },
                    { content: "sees", correct: false },
                    { content: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2117) }
        ]
    },
    2117: {
        image: "画面17.jpg",
        text: "Karen (11) history, and she (12) her course. She (13) the architecture in Cambridge (14) beautiful.",
        optionGroups: [
            {
                id: "32",
                options: [
                    { content: "studies", correct: true },
                    { content: "study", correct: false },
                    { content: "studying", correct: false }
                ]
            },
            {
                id: "33",
                options: [
                    { content: "love", correct: false },
                    { content: "loves", correct: true },
                    { content: "loving", correct: false }
                ]
            },
            {
                id: "34",
                options: [
                    { content: "says", correct: true },
                    { content: "say", correct: false },
                    { content: "saying", correct: false }
                ]
            },
            {
                id: "35",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2118) }
        ]
    },
    2118: {
        image: "画面18.jpg",
        text: "I (15) philosophy and politics, so my courses (16) very different from hers.",
        optionGroups: [
            {
                id: "36",
                options: [
                    { content: "studies", correct: false },
                    { content: "study", correct: true },
                    { content: "studying", correct: false }
                ]
            },
            {
                id: "37",
                options: [
                    { content: "is", correct: false },
                    { content: "are", correct: true },
                    { content: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2119) }
        ]
    },
    2119: {
        image: "画面19.jpg",
        text: "I (17) living in Woodstock because my family (18) there and it (19) quiet, but I (20) Karen a lot.",
        optionGroups: [
            {
                id: "38",
                options: [
                    { content: "like", correct: true },
                    { content: "likes", correct: false },
                    { content: "liking", correct: false }
                ]
            },
            {
                id: "39",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "40",
                options: [
                    { content: "is", correct: true },
                    { content: "are", correct: false },
                    { content: "am", correct: false }
                ]
            },
            {
                id: "41",
                options: [
                    { content: "miss", correct: true },
                    { content: "misses", correct: false },
                    { content: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => navigateTo(2120) }
        ]
    },
    2120: {
        image: "画面20.jpg",
        text: "We (21) on the phone every night and we (22) each other whenever we can.",
        optionGroups: [
            {
                id: "42",
                options: [
                    { content: "talk", correct: true },
                    { content: "talks", correct: false },
                    { content: "talking", correct: false }
                ]
            },
            {
                id: "43",
                options: [
                    { content: "visit", correct: true },
                    { content: "visits", correct: false },
                    { content: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", correct: null, action: () => showScoreScreen() }
        ]
    }
};

// 初始化游戏
function initGame() {
    createScreens();
    showScreen(2100);
    
    // 预加载所有图片
    preloadImages();
}

// 预加载所有图片
function preloadImages() {
    const imagePaths = Object.values(gameData).map(page => page.image);
    
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = `images/${encodeURIComponent(path)}`;
    });
}

// 创建所有游戏画面
function createScreens() {
    const container = document.getElementById('game-container');
    
    Object.keys(gameData).forEach(screenId => {
        const screen = document.createElement('div');
        screen.id = `screen-${screenId}`;
        screen.className = 'game-screen';
        
        const pageData = gameData[screenId];
        
        // 创建图片
        const img = document.createElement('img');
        img.src = `images/${encodeURIComponent(pageData.image)}`;
        img.alt = `Screen ${screenId}`;
        img.className = 'screen-image';
        screen.appendChild(img);
        
        // 创建文字内容
        const textDiv = document.createElement('div');
        textDiv.className = 'text-content';
        textDiv.textContent = pageData.text;
        screen.appendChild(textDiv);
        
        // 创建选项按钮（如果有）
        if (pageData.optionGroups) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            
            pageData.optionGroups.forEach(group => {
                const row = document.createElement('div');
                row.className = 'button-row';
                
                group.options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option.content;
                    button.dataset.group = group.id;
                    button.dataset.correct = option.correct;
                    
                    button.addEventListener('click', () => {
                        handleOptionSelect(screenId, group.id, option.content, option.correct, button);
                    });
                    
                    row.appendChild(button);
                });
                
                buttonsContainer.appendChild(row);
            });
            
            screen.appendChild(buttonsContainer);
        }
        
        // 创建Continue按钮
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-button';
        continueButton.textContent = pageData.buttons[0].content;
        
        continueButton.addEventListener('click', () => {
            if (pageData.buttons[0].action) {
                // 对于计分页面，在继续前计算分数
                if (screenId >= 2113 && screenId <= 2116) {
                    calculateScore();
                }
                pageData.buttons[0].action();
            }
        });
        
        screen.appendChild(continueButton);
        
        container.appendChild(screen);
    });
    
    // 创建得分画面
    createScoreScreen();
}

// 创建得分画面
function createScoreScreen() {
    const container = document.getElementById('game-container');
    
    const screen = document.createElement('div');
    screen.id = 'screen-2121';
    screen.className = 'game-screen score-screen';
    
    const img = document.createElement('img');
    img.className = 'score-image';
    img.alt = 'Score Background';
    screen.appendChild(img);
    
    const scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    screen.appendChild(scoreText);
    
    container.appendChild(screen);
}

// 显示指定画面
function showScreen(screenId) {
    // 隐藏所有画面
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 显示指定画面
    const screen = document.getElementById(`screen-${screenId}`);
    if (screen) {
        screen.classList.add('active');
        gameState.currentScreen = parseInt(screenId);
    }
}

// 处理选项选择
function handleOptionSelect(screenId, groupId, content, isCorrect, button) {
    // 禁用同一组的其他按钮
    const groupButtons = document.querySelectorAll(`#screen-${screenId} button[data-group="${groupId}"]`);
    groupButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('selected');
    });
    
    // 标记选中的按钮
    button.classList.add('selected');
    
    // 存储选择
    if (!gameState.selectedOptions[screenId]) {
        gameState.selectedOptions[screenId] = {};
    }
    gameState.selectedOptions[screenId][groupId] = {
        content: content,
        correct: isCorrect
    };
    
    // 显示提示
    showAlert(isCorrect ? "Correct!" : "Incorrect!");
}

// 显示提示
function showAlert(message) {
    let alertBox = document.querySelector('.alert-box');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        document.body.appendChild(alertBox);
    }
    
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 1500);
}

// 计算得分
function calculateScore() {
    let correctCount = 0;
    
    // 计算从22到43组的正确选择
    for (let i = 22; i <= 43; i++) {
        const screenId = Object.keys(gameState.selectedOptions).find(id => {
            return gameState.selectedOptions[id][i] !== undefined;
        });
        
        if (screenId && gameState.selectedOptions[screenId][i] && gameState.selectedOptions[screenId][i].correct) {
            correctCount++;
        }
    }
    
    gameState.score = Math.round(correctCount * 4.55);
    
    // 保存得分到Firebase
    saveScoreToFirebase(gameState.score);
}

// 保存得分到Firebase
function saveScoreToFirebase(score) {
    const now = new Date();
    const roomId = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    database.ref('scores/' + roomId).set({
        score: score,
        timestamp: now.toISOString()
    });
}

// 导航到指定画面
function navigateTo(screenId) {
    showScreen(screenId);
}

// 显示得分画面
function showScoreScreen() {
    const screen = document.getElementById('screen-2121');
    const img = screen.querySelector('.score-image');
    const scoreText = screen.querySelector('.score-text');
    
    // 设置背景图片
    img.src = `images/${gameState.score >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    
    // 设置得分文本
    scoreText.textContent = `您的得分: ${gameState.score}`;
    
    showScreen(2121);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
