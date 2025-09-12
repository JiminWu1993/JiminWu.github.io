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
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// 游戏状态管理
class GameState {
    constructor() {
        this.currentScreenId = 2100; // 从开始画面开始
        this.userAnswers = {}; // 存储用户答案 {screenId: {groupIndex: selectedIndex}}
        this.score = 0; // 初始得分
        this.scoringScreens = new Set([2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120]); // 计分画面ID
        this.roomId = this.generateRoomId(); // 生成房间ID
    }

    // 生成基于时间的房间ID（月日时分）
    generateRoomId() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return month + day + hours + minutes;
    }

    // 保存答案
    setAnswer(screenId, groupIndex, answerIndex) {
        if (!this.userAnswers[screenId]) {
            this.userAnswers[screenId] = {};
        }
        this.userAnswers[screenId][groupIndex] = answerIndex;
    }

    // 检查是否完成当前页面的所有选择题
    isCurrentScreenComplete(screenId) {
        const screenData = gameScreens.find(screen => screen.id === screenId);
        if (!screenData || !screenData.questions) return true;
        
        const userScreenAnswers = this.userAnswers[screenId] || {};
        return screenData.questions.every((_, groupIndex) => 
            userScreenAnswers[groupIndex] !== undefined
        );
    }

    // 计算总分
    calculateTotalScore() {
        let correctCount = 0;
        
        // 只计算计分画面的正确答案
        this.scoringScreens.forEach(screenId => {
            const screenAnswers = this.userAnswers[screenId];
            const screenData = gameScreens.find(s => s.id === screenId);
            
            if (screenAnswers && screenData && screenData.questions) {
                screenData.questions.forEach((question, groupIndex) => {
                    const userAnswerIndex = screenAnswers[groupIndex];
                    if (userAnswerIndex !== undefined && question.correctIndex === userAnswerIndex) {
                        correctCount++;
                    }
                });
            }
        });

        // 计算得分：正确数量 * 4.55，四舍五入到个位
        this.score = Math.round(correctCount * 4.55);
        return this.score;
    }

    // 保存分数到Firebase
    async saveScoreToFirebase() {
        try {
            if (!db) {
                console.error("Firebase not initialized");
                return;
            }
            
            await db.collection('scores').doc(this.roomId).set({
                score: this.score,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                roomId: this.roomId
            });
            console.log("Score saved to Firebase:", this.score);
        } catch (error) {
            console.error("Error saving score to Firebase:", error);
        }
    }
}

// 游戏屏幕数据定义
const gameScreens = [
    // 开始画面 (2100)
    {
        id: 2100,
        image: "images/开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        questions: [],
        buttons: [
            {
                text: "Begin",
                action: () => navigateToScreen(2101)
            }
        ]
    },
    
    // 画面01 (2101)
    {
        id: 2101,
        image: "images/画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        questions: [],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2102)
            }
        ]
    },
    
    // 画面02 (2102) - 第一组选择题
    {
        id: 2102,
        image: "images/画面02.jpg",
        text: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
        questions: [
            {
                options: ["is", "am", "are"],
                correctIndex: 0 // is
            },
            {
                options: ["calls", "call", "calling"],
                correctIndex: 1 // call
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2103)
            }
        ]
    },
    
    // 画面03 (2103)
    {
        id: 2103,
        image: "images/画面03.jpg",
        text: "Arturo: OK. Where (1) you from, Alexa?",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2104)
            }
        ]
    },
    
    // 画面04 (2104)
    {
        id: 2104,
        image: "images/画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        questions: [],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2105)
            }
        ]
    },
    
    // 画面05 (2105)
    {
        id: 2105,
        image: "images/画面05.jpg",
        text: "Arturo: I'm from Mexico. I (1) here in the city now, but my family (2) in a small town near Guadalajara.",
        questions: [
            {
                options: ["lives", "live", "living"],
                correctIndex: 0 // lives
            },
            {
                options: ["lives", "live", "are living"],
                correctIndex: 0 // lives
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2106)
            }
        ]
    },
    
    // 画面06 (2106)
    {
        id: 2106,
        image: "images/画面06.jpg",
        text: "Alexa: Oh, I (1) Mexico! It (2) really beautiful. My brother (3) Mexico, too. Oh, good. Soo-jin (4) here.",
        questions: [
            {
                options: ["loves", "love", "loving"],
                correctIndex: 1 // love
            },
            {
                options: ["is", "am", "are"],
                correctIndex: 0 // is
            },
            {
                options: ["loves", "love", "loving"],
                correctIndex: 0 // loves
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2107)
            }
        ]
    },
    
    // 画面07 (2107)
    {
        id: 2107,
        image: "images/画面07.jpg",
        text: "Arturo: Who (1) Soo-jin? She (2) familiar.",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            },
            {
                options: ["looks", "look", "looking"],
                correctIndex: 0 // looks
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2108)
            }
        ]
    },
    
    // 画面08 (2108)
    {
        id: 2108,
        image: "images/画面08.jpg",
        text: "Alexa: She (1) my classmate. We (2) in the same business class. We (3) our class every Monday and Wednesday.",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            },
            {
                options: ["has", "have", "having"],
                correctIndex: 1 // have
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2109)
            }
        ]
    },
    
    // 画面09 (2109)
    {
        id: 2109,
        image: "images/画面09.jpg",
        text: "Arturo: Where (1) she from?",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2110)
            }
        ]
    },
    
    // 画面10 (2110)
    {
        id: 2110,
        image: "images/画面10.jpg",
        text: "Alexa: South Korea. She (1) marketing. She (2) the classes (3) very interesting. Let's go and say hello. Sorry, what (4) your last name again? Vargas?",
        questions: [
            {
                options: ["studies", "study", "studying"],
                correctIndex: 0 // studies
            },
            {
                options: ["says", "say", "saying"],
                correctIndex: 0 // says
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2111)
            }
        ]
    },
    
    // 画面11 (2111)
    {
        id: 2111,
        image: "images/画面11.jpg",
        text: "Arturo: Actually, it (1) Valdez",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2112)
            }
        ]
    },
    
    // 画面12 (2112)
    {
        id: 2112,
        image: "images/画面12.jpg",
        text: "Alexa: How (1) you spell that?",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2113)
            }
        ]
    },
    
    // 画面13 (2113) - 开始计分
    {
        id: 2113,
        image: "images/画面13.jpg",
        text: "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            },
            {
                options: ["go", "goes", "going"],
                correctIndex: 0 // go
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2114)
            }
        ]
    },
    
    // 画面14 (2114) - 计分
    {
        id: 2114,
        image: "images/画面14.jpg",
        text: "Karen (1) go to university in Oxford; she (2) to university in Cambridge. She (3) in Cambridge.",
        questions: [
            {
                options: ["don't", "isn't", "doesn't"],
                correctIndex: 2 // doesn't
            },
            {
                options: ["go", "goes", "going"],
                correctIndex: 1 // goes
            },
            {
                options: ["lives", "live", "living"],
                correctIndex: 0 // lives
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2115)
            }
        ]
    },
    
    // 画面15 (2115) - 计分
    {
        id: 2115,
        image: "images/画面15.jpg",
        text: "I (1) with my parents in Woodstock, which (2) a small town near Oxford.",
        questions: [
            {
                options: ["lives", "live", "living"],
                correctIndex: 1 // live
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2116)
            }
        ]
    },
    
    // 画面16 (2116) - 计分
    {
        id: 2116,
        image: "images/画面16.jpg",
        text: "It (1) difficult sometimes because we (2) each other only on weekends.",
        questions: [
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            },
            {
                options: ["see", "sees", "seeing"],
                correctIndex: 0 // see
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2117)
            }
        ]
    },
    
    // 画面17 (2117) - 计分
    {
        id: 2117,
        image: "images/画面17.jpg",
        text: "Karen (1) history, and she (2) her course. She (3) the architecture in Cambridge (4) beautiful.",
        questions: [
            {
                options: ["studies", "study", "studying"],
                correctIndex: 0 // studies
            },
            {
                options: ["love", "loves", "loving"],
                correctIndex: 1 // loves
            },
            {
                options: ["says", "say", "saying"],
                correctIndex: 0 // says
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2118)
            }
        ]
    },
    
    // 画面18 (2118) - 计分
    {
        id: 2118,
        image: "images/画面18.jpg",
        text: "I (1) philosophy and politics, so my courses (2) very different from hers.",
        questions: [
            {
                options: ["studies", "study", "studying"],
                correctIndex: 1 // study
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 1 // are
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2119)
            }
        ]
    },
    
    // 画面19 (2119) - 计分
    {
        id: 2119,
        image: "images/画面19.jpg",
        text: "I (1) living in Woodstock because my family (2) there and it (3) quiet, but I (4) Karen a lot.",
        questions: [
            {
                options: ["like", "likes", "liking"],
                correctIndex: 0 // like
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            },
            {
                options: ["is", "are", "am"],
                correctIndex: 0 // is
            },
            {
                options: ["miss", "misses", "missing"],
                correctIndex: 0 // miss
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2120)
            }
        ]
    },
    
    // 画面20 (2120) - 计分
    {
        id: 2120,
        image: "images/画面20.jpg",
        text: "We (1) on the phone every night and we (2) each other whenever we can.",
        questions: [
            {
                options: ["talk", "talks", "talking"],
                correctIndex: 0 // talk
            },
            {
                options: ["visit", "visits", "visiting"],
                correctIndex: 0 // visit
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateToScreen(2121)
            }
        ]
    },
    
    // 得分画面 (2121)
    {
        id: 2121,
        image: "", // 根据分数动态设置
        text: "",
        questions: [],
        buttons: []
    }
];

// 全局游戏状态实例
const gameState = new GameState();

// DOM元素引用
const gameContainer = document.getElementById('game-container');

// 显示提示框
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    // 3秒后自动移除提示框
    setTimeout(() => {
        if (alertBox.parentNode) {
            alertBox.parentNode.removeChild(alertBox);
        }
    }, 3000);
}

// 创建游戏屏幕
function createGameScreen(screenData) {
    const screen = document.createElement('div');
    screen.className = 'game-screen';
    screen.id = `screen-${screenData.id}`;
    
    // 创建图片
    const img = document.createElement('img');
    img.className = 'screen-image';
    img.src = screenData.image;
    img.alt = `Screen ${screenData.id}`;
    img.onerror = function() {
        console.error(`Failed to load image: ${screenData.image}`);
        this.style.display = 'none';
    };
    screen.appendChild(img);
    
    // 创建文字显示框
    const textDisplay = document.createElement('div');
    textDisplay.className = 'text-display';
    textDisplay.textContent = screenData.text;
    screen.appendChild(textDisplay);
    
    // 创建选择题按钮（如果有）
    if (screenData.questions && screenData.questions.length > 0) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        screenData.questions.forEach((question, groupIndex) => {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'option-button-group';
            
            const groupLabel = document.createElement('div');
            groupLabel.className = 'group-label';
            groupLabel.textContent = `(${groupIndex + 1})`;
            groupContainer.appendChild(groupLabel);
            
            const buttonRow = document.createElement('div');
            buttonRow.className = 'button-row';
            
            question.options.forEach((option, optionIndex) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.dataset.groupIndex = groupIndex;
                button.dataset.optionIndex = optionIndex;
                
                button.addEventListener('click', () => {
                    // 取消同组其他按钮的选中状态
                    const groupButtons = buttonRow.querySelectorAll('.option-button');
                    groupButtons.forEach(btn => btn.classList.remove('selected'));
                    
                    // 设置当前按钮为选中状态
                    button.classList.add('selected');
                    
                    // 保存用户答案
                    gameState.setAnswer(screenData.id, groupIndex, optionIndex);
                });
                
                buttonRow.appendChild(button);
            });
            
            groupContainer.appendChild(buttonRow);
            buttonsContainer.appendChild(groupContainer);
        });
        
        screen.appendChild(buttonsContainer);
    }
    
    // 创建Continue按钮（如果有）
    if (screenData.buttons && screenData.buttons.length > 0) {
        screenData.buttons.forEach(buttonData => {
            const button = document.createElement('button');
            button.className = 'continue-button';
            button.textContent = buttonData.text;
            
            button.addEventListener('click', () => {
                // 检查是否完成所有选择题
                if (screenData.questions && screenData.questions.length > 0) {
                    if (!gameState.isCurrentScreenComplete(screenData.id)) {
                        showAlert("Please complete all multiple-choice questions before continuing");
                        return;
                    }
                }
                
                // 执行按钮动作
                buttonData.action();
            });
            
            screen.appendChild(button);
        });
    }
    
    return screen;
}

// 导航到指定屏幕
function navigateToScreen(screenId) {
    // 隐藏所有屏幕
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 显示目标屏幕
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        gameState.currentScreenId = screenId;
        
        // 如果是得分画面，特殊处理
        if (screenId === 2121) {
            showScoreScreen();
        }
    } else {
        console.error(`Screen ${screenId} not found`);
    }
}

// 显示得分画面
function showScoreScreen() {
    const score = gameState.calculateTotalScore();
    const scoreScreen = document.getElementById('screen-2121');
    
    // 清空原有内容
    scoreScreen.innerHTML = '';
    
    // 设置背景图片
    const img = document.createElement('img');
    img.className = 'score-image';
    img.src = score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    img.alt = score >= 60 ? 'Pass' : 'Fail';
    img.onerror = function() {
        console.error(`Failed to load score image: ${this.src}`);
        this.style.display = 'none';
    };
    
    // 显示得分
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.textContent = `Score: ${score}`;
    
    scoreScreen.appendChild(img);
    scoreScreen.appendChild(scoreDisplay);
    
    // 保存分数到Firebase
    gameState.saveScoreToFirebase();
}

// 初始化游戏
function initializeGame() {
    // 创建所有游戏屏幕
    gameScreens.forEach(screenData => {
        const screen = createGameScreen(screenData);
        gameContainer.appendChild(screen);
    });
    
    // 显示开始画面
    navigateToScreen(2100);
    
    // 添加全局错误处理
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showAlert('An error occurred. Please refresh the page.');
    });
}

// 预加载图片函数
function preloadImages() {
    const imageUrls = gameScreens
        .map(screen => screen.image)
        .filter(url => url) // 过滤空字符串
        .concat(['images/及格.jpg', 'images/不及格.jpg']);
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    try {
        preloadImages();
        initializeGame();
        console.log("Game initialized successfully");
    } catch (error) {
        console.error("Game initialization failed:", error);
        showAlert("Game initialization failed. Please check console for details.");
    }
});

// 防止浏览器后退
window.addEventListener('popstate', (event) => {
    event.preventDefault();
    history.pushState(null, document.title, location.href);
});

// 初始化历史记录
history.pushState(null, document.title, location.href);
