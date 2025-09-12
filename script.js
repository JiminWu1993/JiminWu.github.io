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
    currentScreen: 2100, // 从开始画面开始
    score: 0,
    selectedOptions: {}, // 存储每页的选择
    startTime: null
};

// 游戏画面数据
const screens = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { text: "Begin", action: { type: "navigate", target: 2101 } }
        ]
    },
    2101: {
        type: "dialogue",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2102 } }
        ]
    },
    2102: {
        type: "question",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2103 } }
        ]
    },
    2103: {
        type: "question",
        image: "画面03.jpg",
        text: "Arturo: OK. Where (1) you from, Alexa?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2104 } }
        ]
    },
    2104: {
        type: "dialogue",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2105 } }
        ]
    },
    2105: {
        type: "question",
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I (1) here in the city now, but my family (2) in a small town near Guadalajara.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2106 } }
        ]
    },
    2106: {
        type: "question",
        image: "画面06.jpg",
        text: "Alexa: Oh, I (1) Mexico! It (2) really beautiful. My brother (3) Mexico, too. Oh, good. Soo-jin (4) here.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2107 } }
        ]
    },
    2107: {
        type: "question",
        image: "画面07.jpg",
        text: "Arturo: Who (1) Soo-jin? She (2) familiar.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2108 } }
        ]
    },
    2108: {
        type: "question",
        image: "画面08.jpg",
        text: "Alexa: She (1) my classmate. We (2) in the same business class. We (3) our class every Monday and Wednesday.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2109 } }
        ]
    },
    2109: {
        type: "question",
        image: "画面09.jpg",
        text: "Arturo: Where (1) she from?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2110 } }
        ]
    },
    2110: {
        type: "question",
        image: "画面10.jpg",
        text: "Alexa: South Korea. She (1) marketing. She (2) the classes (3) very interesting. Let's go and say hello. Sorry, what (4) your last name again? Vargas?",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2111 } }
        ]
    },
    2111: {
        type: "question",
        image: "画面11.jpg",
        text: "Arturo: Actually, it (1) Valdez",
        options: [
            [
                { text: "is", correct: true },
                { text: "are", correct: false },
                { text: "am", correct: false }
            ]
        ],
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2112 } }
        ]
    },
    2112: {
        type: "question",
        image: "画面12.jpg",
        text: "Alexa: How (1) you spell that?",
        options: [
            [
                { text: "is", correct: false },
                { text: "are", correct: true },
                { text: "am", correct: false }
            ]
        ],
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2113 } }
        ]
    },
    2113: {
        type: "scoring",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2114 } }
        ]
    },
    2114: {
        type: "scoring",
        image: "画面14.jpg",
        text: "Karen (1) go to university in Oxford; she (2) to university in Cambridge. She (3) in Cambridge.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2115 } }
        ]
    },
    2115: {
        type: "scoring",
        image: "画面15.jpg",
        text: "I (1) with my parents in Woodstock, which (2) a small town near Oxford.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2116 } }
        ]
    },
    2116: {
        type: "scoring",
        image: "画面16.jpg",
        text: "It (1) difficult sometimes because we (2) each other only on weekends.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2117 } }
        ]
    },
    2117: {
        type: "scoring",
        image: "画面17.jpg",
        text: "Karen (1) history, and she (2) her course. She (3) the architecture in Cambridge (4) beautiful.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2118 } }
        ]
    },
    2118: {
        type: "scoring",
        image: "画面18.jpg",
        text: "I (1) philosophy and politics, so my courses (2) very different from hers.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2119 } }
        ]
    },
    2119: {
        type: "scoring",
        image: "画面19.jpg",
        text: "I (1) living in Woodstock because my family (2) there and it (3) quiet, but I (4) Karen a lot.",
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
        buttons: [
            { text: "Continue", action: { type: "navigate", target: 2120 } }
        ]
    },
    2120: {
        type: "scoring",
        image: "画面20.jpg",
        text: "We (1) on the phone every night and we (2) each other whenever we can.",
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
        buttons: [
            { 
                text: "Continue", 
                action: { 
                    type: "calculateScore", 
                    target: 2121 
                } 
            }
        ]
    },
    2121: {
        type: "score",
        image: "", // 将根据分数动态设置
        text: "",
        buttons: []
    }
};

// 预加载图片资源
function preloadImages() {
    const imageUrls = [];
    
    for (const screenId in screens) {
        if (screens[screenId].image) {
            imageUrls.push(`images/${screens[screenId].image}`);
        }
    }
    
    // 添加及格和不及格图片
    imageUrls.push('images/及格.jpg');
    imageUrls.push('images/不及格.jpg');
    
    // 预加载所有图片
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 显示通知
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// 渲染当前屏幕
function renderScreen(screenId) {
    const screen = screens[screenId];
    const container = document.getElementById('game-container');
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建屏幕元素
    const screenElement = document.createElement('div');
    screenElement.className = 'game-screen';
    
    // 添加图片
    if (screen.image) {
        const img = document.createElement('img');
        img.src = `images/${screen.image}`;
        img.className = 'screen-image';
        img.alt = 'Game Scene';
        screenElement.appendChild(img);
    }
    
    // 添加文本
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.textContent = screen.text;
    screenElement.appendChild(textContainer);
    
    // 添加选项按钮（如果是问题屏幕）
    if (screen.type === 'question' || screen.type === 'scoring') {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        screen.options.forEach((optionGroup, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'button-group';
            
            // 添加组号
            const groupNumber = document.createElement('span');
            groupNumber.className = 'group-number';
            groupNumber.textContent = getGroupNumberSymbol(groupIndex);
            groupDiv.appendChild(groupNumber);
            
            const buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';
            
            optionGroup.forEach((option, optionIndex) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option.text;
                button.dataset.group = groupIndex;
                button.dataset.option = optionIndex;
                
                // 检查是否已选择此选项
                if (gameState.selectedOptions[screenId] && 
                    gameState.selectedOptions[screenId][groupIndex] === optionIndex) {
                    button.classList.add('selected');
                }
                
                button.addEventListener('click', () => selectOption(screenId, groupIndex, optionIndex));
                buttonRow.appendChild(button);
            });
            
            groupDiv.appendChild(buttonRow);
            buttonsContainer.appendChild(groupDiv);
        });
        
        screenElement.appendChild(buttonsContainer);
    }
    
    // 添加继续按钮
    if (screen.buttons && screen.buttons.length > 0) {
        screen.buttons.forEach(buttonData => {
            const button = document.createElement('button');
            button.className = 'continue-button';
            button.textContent = buttonData.text;
            
            button.addEventListener('click', () => {
                handleButtonAction(buttonData.action, screenId);
            });
            
            screenElement.appendChild(button);
        });
    }
    
    // 添加屏幕到容器
    container.appendChild(screenElement);
    
    // 记录开始时间（如果是开始屏幕）
    if (screenId === 2100) {
        gameState.startTime = new Date();
    }
}

// 获取组号符号
function getGroupNumberSymbol(index) {
    const symbols = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
    return symbols[index] || (index + 1).toString();
}

// 选择选项
function selectOption(screenId, groupIndex, optionIndex) {
    // 初始化选择对象（如果不存在）
    if (!gameState.selectedOptions[screenId]) {
        gameState.selectedOptions[screenId] = {};
    }
    
    // 取消同组中其他选项的选择状态
    const buttons = document.querySelectorAll(`.option-button[data-group="${groupIndex}"]`);
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // 设置当前选项为选中状态
    const selectedButton = document.querySelector(
        `.option-button[data-group="${groupIndex}"][data-option="${optionIndex}"]`
    );
    selectedButton.classList.add('selected');
    
    // 保存选择
    gameState.selectedOptions[screenId][groupIndex] = optionIndex;
}

// 处理按钮动作
function handleButtonAction(action, screenId) {
    switch (action.type) {
        case 'navigate':
            // 检查是否已完成所有选择题（如果是问题屏幕）
            if ((screens[screenId].type === 'question' || screens[screenId].type === 'scoring') && 
                !areAllOptionsSelected(screenId)) {
                showNotification("Please complete all multiple-choice questions before continuing");
                return;
            }
            
            // 计算分数（如果是计分屏幕）
            if (screens[screenId].type === 'scoring') {
                calculateScreenScore(screenId);
            }
            
            // 导航到目标屏幕
            gameState.currentScreen = action.target;
            renderScreen(action.target);
            break;
            
        case 'calculateScore':
            // 检查是否已完成所有选择题
            if (!areAllOptionsSelected(screenId)) {
                showNotification("Please complete all multiple-choice questions before continuing");
                return;
            }
            
            // 计算最后一屏的分数
            calculateScreenScore(screenId);
            
            // 计算总分并保存到数据库
            const totalScore = Math.round(gameState.score * 4.55);
            saveScoreToDatabase(totalScore);
            
            // 导航到得分屏幕
            gameState.currentScreen = action.target;
            renderScoreScreen(action.target, totalScore);
            break;
    }
}

// 检查是否所有选项都已选择
function areAllOptionsSelected(screenId) {
    const screen = screens[screenId];
    
    if (screen.type !== 'question' && screen.type !== 'scoring') {
        return true;
    }
    
    if (!gameState.selectedOptions[screenId]) {
        return false;
    }
    
    return Object.keys(gameState.selectedOptions[screenId]).length === screen.options.length;
}

// 计算当前屏幕的分数
function calculateScreenScore(screenId) {
    const screen = screens[screenId];
    const selectedOptions = gameState.selectedOptions[screenId];
    
    if (!selectedOptions) return;
    
    for (const groupIndex in selectedOptions) {
        const optionIndex = selectedOptions[groupIndex];
        const option = screen.options[groupIndex][optionIndex];
        
        if (option.correct) {
            gameState.score++;
        }
    }
}

// 渲染得分屏幕
function renderScoreScreen(screenId, totalScore) {
    const container = document.getElementById('game-container');
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建屏幕元素
    const screenElement = document.createElement('div');
    screenElement.className = 'game-screen';
    
    // 添加图片（根据分数选择）
    const img = document.createElement('img');
    img.src = `images/${totalScore >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    img.className = 'screen-image';
    img.alt = 'Score Result';
    screenElement.appendChild(img);
    
    // 添加分数文本
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'text-container';
    scoreContainer.textContent = `您的得分: ${totalScore}`;
    screenElement.appendChild(scoreContainer);
    
    // 添加屏幕到容器
    container.appendChild(screenElement);
}

// 保存分数到数据库
function saveScoreToDatabase(score) {
    // 生成房间号（当前时间，格式：MMDDHHmm）
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const roomId = `${month}${day}${hours}${minutes}`;
    
    // 保存到数据库
    database.ref('scores/' + roomId).set({
        score: score,
        timestamp: now.toISOString()
    }).catch(error => {
        console.error("保存分数到数据库时出错: ", error);
    });
}

// 初始化游戏
function initGame() {
    // 预加载图片
    preloadImages();
    
    // 渲染初始屏幕
    renderScreen(gameState.currentScreen);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
