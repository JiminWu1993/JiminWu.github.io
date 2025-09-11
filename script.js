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
    score: 0,
    selectedOptions: {},
    roomId: null
};

// 页面配置数据
const pageConfigs = {
    2100: {
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { content: "Begin", target: 2101 }
        ]
    },
    2101: {
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { content: "Continue", target: 2102 }
        ]
    },
    2102: {
        image: "画面02.jpg",
        text: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: true },
                    { name: "am", correct: false },
                    { name: "are", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "calls", correct: false },
                    { name: "call", correct: true },
                    { name: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target极简风格，专注于核心功能实现: 2103 }
        ]
    },
    2103: {
        image: "画面03.jpg",
        text: "Arturo: OK. Where (1) you from, Alexa?",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2104 }
        ]
    },
    2104: {
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { content: "Continue", target: 2105 }
极简风格，专注于核心功能实现        ]
    },
    2105: {
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I (1) here in the city now, but my family (极简风格，专注于核心功能实现2) in a small town near Guadalajara.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "living", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2106 }
        ]
    },
    2106: {
        image: "画面06.jpg",
        text: "Alexa: Oh, I (1) Mexico! It (2) really beautiful. My brother (3) Mexico, too. Oh, good. Soo-jin (4) here.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "loves", correct: false },
                    { name: "love", correct: true },
                    { name: "loving", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: true },
                    { name: "am", correct: false },
                    { name: "are", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "loves", correct: true },
                    { name: "love", correct: false },
                    { name: "loving", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2107 }
        ]
    },
    2107: {
        image: "画面07.jpg",
        text: "Arturo: Who (1) Soo-jin? She (2) familiar.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "极简风格，专注于核心功能实现is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct:极简风格，专注于核心功能实现 false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "looks", correct: true },
                    { name: "look", correct: false },
                    { name: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2108 }
        ]
    },
    2108: {
        image: "画面08.jpg",
        text: "Alexa: She (1) my classmate. We (2) in the same business class. We (3) our class every Monday and Wednesday.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "has", correct: false },
                    { name: "have", correct: true },
                    { name: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2109 }
        ]
    },
    2109: {
        image: "画面09.jpg",
        text: "Arturo: Where (1) she from?",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
极简风格，专注于核心功能实现            }
        ],
        buttons极简风格，专注于核心功能实现: [
            { content: "Continue", target: 2110 }
        ]
    },
    2110: {
        image: "画面10.jpg",
        text: "Alexa: South Korea. She (1) marketing. She (2) the classes (3) very interesting. Let's go and say hello. Sorry, what (4) your last name again? Vargas?",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "studies", correct: true },
                    { name: "study", correct: false },
                    { name: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name极简风格，专注于核心功能实现: "says", correct: true },
                    { name: "say", correct: false },
                    { name: "saying", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2111 }
        ]
    },
    2111: {
        image: "画面11.jpg",
        text: "Arturo: Actually, it (1) Valdez",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2112 }
        ]
    },
    2112: {
        image: "画面12.jpg",
        text: "Alexa: How (1极简风格，专注于核心功能实现) you spell that?",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2113 }
        ]
    },
    2113: {
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: false },
                    { name: "极简风格，专注于核心功能实现are", correct: true },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "go", correct: true },
                    { name: "go极简风格，专注于核心功能实现es", correct: false },
                    { name: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2114 }
        ]
    },
    211极简风格，专注于核心功能实现4: {
        image: "画面14.jpg",
        text: "Karen (1) go to university in Oxford; she (2) to university in Cambridge. She (3) in Cambridge.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "don't", correct: false },
                    { name: "isn't", correct: false },
                    { name: "doesn't", correct: true }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "go", correct: false },
                    { name: "goes", correct: true },
                    { name: "going", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "lives", correct: true },
                    { name: "live", correct: false },
                    { name: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2115 }
        ]
    },
    2115: {
        image: "画面15.jpg",
        text: "I (1) with my parents in Woodstock, which (2) a small town near Oxford.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "lives", correct: false },
                    { name: "live", correct: true },
                    { name: "living", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2116 }
        ]
    },
    2116: {
        image: "画面16.jpg",
        text: "It (1) difficult sometimes because we (2) each other only on weekends.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "see", correct: true },
                    { name: "sees", correct: false },
                    { name: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2117 }
        ]
    },
    2117: {
        image: "画面17.jpg",
        text: "Karen (1) history, and she (2) her course. She (3极简风格，专注于核心功能实现) the architecture in Cambridge (4) beautiful.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "studies", correct: true },
                    { name: "study", correct: false },
                    { name: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons极简风格，专注于核心功能实现: [
                    { name: "love", correct: false },
                    { name: "loves", correct: true },
                   极简风格，专注于核心功能实现 { name: "loving", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "says", correct: true },
                    { name: "say", correct: false },
                    { name: "saying", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2118 }
        ]
    },
    2118: {
        image: "画面18.jpg",
        text: "I (1) philosophy and politics, so my courses (2) very different from hers.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "studies", correct: false },
                    { name: "study", correct: true },
                    { name: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: false },
                    { name: "are", correct: true },
                    { name: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2119 }
        ]
    },
    2119: {
        image: "画面19.jpg",
        text: "I (1) living in Woodstock because my family (2) there and it (3) quiet, but I (4) Karen a lot.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "like", correct: true },
                    { name: "likes", correct: false },
                    { name: "liking", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { name: "is", correct: true },
                    { name: "are", correct: false },
                    { name: "am", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
                    { name: "miss", correct: true },
                    { name: "misses", correct: false },
                    { name: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2120 }
        ]
    },
    2120: {
        image: "画面20.jpg",
        text: "We (1) on the phone every night and we (2) each other whenever we can.",
        options: [
            {
                number: 1,
                buttons: [
                    { name: "talk", correct: true },
                    { name: "talks", correct: false },
                    { name: "talking", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { name: "visit", correct: true },
                    { name: "visits", correct: false },
                    { name: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { content: "Continue", target: 2121 }
        ]
    },
    2121: {
        // 得分页面，根据得分显示不同图片
        buttons: []
    }
};

// 显示提示框
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    // 3秒后自动移除提示框
    setTimeout(() => {
        if (document.body.contains(alertBox)) {
            document.body.removeChild(alertBox);
        }
    }, 3000);
}

// 创建页面
function createPage(pageId) {
    const config = pageConfigs[pageId];
    if (!config) {
        console.error(`No configuration found for page ${pageId}`);
        return;
    }
    
    const page = document.createElement('div');
    page.className = 'page';
    page.id = `page-${pageId}`;
    
    // 添加图片
    if (config.image) {
        const img = document.createElement('img');
        img.className = 'page-image';
        img.src = `images/${config.image}`;
        img.alt = 'Scene image';
        page.appendChild(img);
    }
    
    // 添加文本内容
    if (config.text) {
        const textDiv = document.createElement('div');
        textDiv.className = 'text-content';
        textDiv.textContent = config.text;
        page.appendChild(textDiv);
    }
    
    // 添加选项（如果有）
    if (config.options) {
        const optionsContainer = document.createElement('极简风格，专注于核心功能实现div');
        optionsContainer.className = 'options-container';
        
        config.options.forEach(optionGroup => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'option-group';
            groupDiv.dataset.number = optionGroup.number;
            
            const rowDiv = document.createElement('div');
            rowDiv.className = 'option-row';
            
            optionGroup.buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = button.name;
                btn.dataset.correct = button.correct;
                btn.dataset.group = optionGroup.number;
                
                // 检查是否已选择此选项
                if (gameState.selectedOptions[pageId] && 
                    gameState.selectedOptions[pageId][optionGroup.number] === button.name) {
                    btn.classList.add('selected');
                }
                
                btn.addEventListener('click', () => {
                    // 取消同组其他按钮的选择状态
                    const allButtonsInGroup = rowDiv.querySelectorAll('.option-btn');
                    allButtonsInGroup.forEach(b => b.classList.remove('selected'));
                    
                    // 设置当前按钮为选中状态
                    btn.classList.add('selected');
                    
                    // 保存选择
                    if (!gameState.selectedOptions[pageId]) {
                        gameState.selectedOptions[pageId] = {};
                    }
                    gameState.selectedOptions[pageId][optionGroup.number] = button.name;
                });
                
                rowDiv.appendChild(btn);
            });
            
            groupDiv.appendChild(rowDiv);
            optionsContainer.appendChild(groupDiv);
        });
        
        page.appendChild(optionsContainer);
    }
    
    // 添加按钮（Continue等）
    if (config.buttons) {
        config.buttons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.className = 'continue-btn';
            button.textContent = buttonConfig.content;
            
            button.addEventListener('click', () => {
                // 检查是否所有选项都已选择（如果有选项）
                if (config.options) {
                    const allSelected = config.options.every(optionGroup => {
                        return gameState.selectedOptions[pageId] && 
                               gameState.selectedOptions[page极简风格，专注于核心功能实现Id][optionGroup.number];
                    });
                    
                    if (!allSelected) {
                        showAlert("Please complete all multiple-choice questions before continuing");
                        return;
                    }
                    
                    // 计算得分（从第22组按钮开始）
                    if (pageId >= 2113) {
                        calculateScore(pageId);
                    }
                }
                
                // 跳转到目标页面
                navigateTo(buttonConfig.target);
            });
            
            page.appendChild(button);
        });
    }
    
    // 如果是得分页面，特殊处理
    if (pageId === 2121) {
        createScorePage(page);
    }
    
    return page;
}

// 创建得分页面
function createScorePage(container) {
    container.className = 'score-page';
    
    // 计算总分
    const totalScore = Math.round(gameState.score * 4.55);
    
    // 选择图片
    const img = document.createElement('img');
    img.className = 'score-image';
    img.src = `images/${totalScore >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    img.alt = 'Score result';
    container.appendChild(img);
    
    // 显示得分
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.textContent = `得分: ${totalScore}`;
    container.appendChild(scoreDisplay);
    
    // 保存得分到数据库
    saveScoreToDatabase(totalScore);
}

// 计算得分
function calculateScore(pageId) {
    const config = pageConfigs[pageId];
    if (!config || !config.options) return;
    
    config.options.forEach(optionGroup => {
        const selectedOption = gameState.selectedOptions[pageId][optionGroup.number];
        const correctOption = optionGroup.buttons.find(btn => btn.correct);
        
        if (selectedOption === correctOption.name) {
            gameState.score += 1;
        }
    });
}

// 保存得分到数据库
function saveScoreToDatabase(score) {
    if (!gameState.roomId) {
        // 创建基于时间的房间ID
        const now = new Date();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        gameState.roomId = `${month}${day}${hours}${minutes}`;
    }
    
    // 保存到Firebase
    database.ref('scores/' + gameState.roomId).set({
        score: score,
        timestamp: new Date().toString()
    }).catch(error => {
        console.error("Error saving score to database:", error);
    });
}

// 导航到指定页面
function navigateTo(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    
    // 检查页面是否已存在
    let page = document.getElementById(`page-${pageId}`);
    
    if (!page) {
        // 创建新页面
        page = createPage(pageId);
        document.getElementById('game-container').appendChild(page);
    } else {
        // 显示已存在的页面
        page.style.display = 'flex';
    }
    
    // 更新当前页面状态
    gameState.currentPage = pageId;
}

// 初始化游戏
function initGame() {
    // 预加载图片
    preloadImages();
    
    // 创建初始页面
    navigateTo(2100);
}

// 预加载图片
function preloadImages() {
    Object.values(pageConfigs).forEach(config => {
        if (config.image) {
            const img = new Image();
            img.src = `images/${config.image}`;
        }
    });
    
    // 预加载得分图片
    const passImg = new Image();
    passImg.src = 'images/及格.jpg';
    
    const failImg = new Image();
    failImg.src = 'images/不及格.jpg';
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 防止缩放和默认行为
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});
