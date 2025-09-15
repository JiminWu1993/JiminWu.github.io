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
const gameState = {
    currentPageId: 2100, // 从开始画面开始
    selectedOptions: {}, // 存储每页选择的选项
    score: 0, // 测试得分
    testAttempts: 0, // 测试尝试次数
    roomId: null // Firebase房间ID
};

// 游戏页面数据
const pages = {
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
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "am", correct: false },
                    { id: "1-3", text: "are", correct: false }
                ]
            },
            {
                id: "2",
                buttons: [
                    { id: "2-1", text: "calls", correct: false },
                    { id: "2-2", text: "call", correct: true },
                    { id: "2-3", text: "calling", correct: false }
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
                buttons: [
                    { id: "3-1", text: "is", correct: false },
                    { id: "3-2", text: "are", correct: true },
                    { id: "3-3", text: "am", correct: false }
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
                buttons: [
                    { id: "4-1", text: "lives", correct: true },
                    { id: "4-2", text: "live", correct: false },
                    { id: "4-3", text: "living", correct: false }
                ]
            },
            {
                id: "5",
                buttons: [
                    { id: "5-1", text: "lives", correct: true },
                    { id: "5-2", text: "live", correct: false },
                    { id: "5-3", text: "are living", correct: false }
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
                buttons: [
                    { id: "6-1", text: "loves", correct: false },
                    { id: "6-2", text: "love", correct: true },
                    { id: "6-3", text: "loving", correct: false }
                ]
            },
            {
                id: "7",
                buttons: [
                    { id: "7-1", text: "is", correct: true },
                    { id: "7-2", text: "am", correct: false },
                    { id: "7-3", text: "are", correct: false }
                ]
            },
            {
                id: "8",
                buttons: [
                    { id: "8-1", text: "loves", correct: true },
                    { id: "8-2", text: "love", correct: false },
                    { id: "8-3", text: "loving", correct: false }
                ]
            },
            {
                id: "9",
                buttons: [
                    { id: "9-1", text: "is", correct: true },
                    { id: "9-2", text: "are", correct: false },
                    { id: "9-3", text: "am", correct: false }
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
                buttons: [
                    { id: "10-1", text: "is", correct: true },
                    { id: "10-2", text: "are", correct: false },
                    { id: "10-3", text: "am", correct: false }
                ]
            },
            {
                id: "11",
                buttons: [
                    { id: "11-1", text: "looks", correct: true },
                    { id: "11-2", text: "look", correct: false },
                    { id: "11-3", text: "looking", correct: false }
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
                buttons: [
                    { id: "12-1", text: "is", correct: false },
                    { id: "12-2", text: "are", correct: true },
                    { id: "12-3", text: "am", correct: false }
                ]
            },
            {
                id: "13",
                buttons: [
                    { id: "13-1", text: "is", correct: false },
                    { id: "13-2", text: "are", correct: true },
                    { id: "13-3", text: "am", correct: false }
                ]
            },
            {
                id: "14",
                buttons: [
                    { id: "14-1", text: "has", correct: false },
                    { id: "14-2", text: "have", correct: true },
                    { id: "14-3", text: "having", correct: false }
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
                buttons: [
                    { id: "15-1", text: "is", correct: false },
                    { id: "15-2", text: "are", correct: true },
                    { id: "15-3", text: "am", correct: false }
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
                buttons: [
                    { id: "16-1", text: "studies", correct: true },
                    { id: "16-2", text: "study", correct: false },
                    { id: "16-3", text: "studying", correct: false }
                ]
            },
            {
                id: "17",
                buttons: [
                    { id: "17-1", text: "says", correct: true },
                    { id: "17-2", text: "say", correct: false },
                    { id: "17-3", text: "saying", correct: false }
                ]
            },
            {
                id: "18",
                buttons: [
                    { id: "18-1", text: "is", correct: false },
                    { id: "18-2", text: "are", correct: true },
                    { id: "18-3", text: "am", correct: false }
                ]
            },
            {
                id: "19",
                buttons: [
                    { id: "19-1", text: "is", correct: true },
                    { id: "19-2", text: "are", correct: false },
                    { id: "19-3", text: "am", correct: false }
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
                buttons: [
                    { id: "20-1", text: "is", correct: true },
                    { id: "20-2", text: "are", correct: false },
                    { id: "20-3", text: "am", correct: false }
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
                buttons: [
                    { id: "21-1", text: "is", correct: false },
                    { id: "21-2", text: "are", correct: true },
                    { id: "21-3", text: "am", correct: false }
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
                buttons: [
                    { id: "22-1", text: "is", correct: true },
                    { id: "22-2", text: "are", correct: false },
                    { id: "22-3", text: "am", correct: false }
                ]
            },
            {
                id: "23",
                buttons: [
                    { id: "23-1", text: "is", correct: false },
                    { id: "23-2", text: "are", correct: true },
                    { id: "23-3", text: "am", correct: false }
                ]
            },
            {
                id: "24",
                buttons: [
                    { id: "24-1", text: "go", correct: true },
                    { id: "24-2", text: "goes", correct: false },
                    { id: "24-3", text: "going", correct: false }
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
                buttons: [
                    { id: "25-1", text: "don't", correct: false },
                    { id: "25-2", text: "isn't", correct: false },
                    { id: "25-3", text: "doesn't", correct: true }
                ]
            },
            {
                id: "26",
                buttons: [
                    { id: "26-1", text: "go", correct: false },
                    { id: "26-2", text: "goes", correct: true },
                    { id: "26-3", text: "going", correct: false }
                ]
            },
            {
                id: "27",
                buttons: [
                    { id: "27-1", text: "lives", correct: true },
                    { id: "27-2", text: "live", correct: false },
                    { id: "27-3", text: "living", correct: false }
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
                buttons: [
                    { id: "28-1", text: "lives", correct: false },
                    { id: "28-2", text: "live", correct: true },
                    { id: "28-3", text: "living", correct: false }
                ]
            },
            {
                id: "29",
                buttons: [
                    { id: "29-1", text: "is", correct: true },
                    { id: "29-2", text: "are", correct: false },
                    { id: "29-3", text: "am", correct: false }
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
                buttons: [
                    { id: "30-1", text: "is", correct: true },
                    { id: "30-2", text: "are", correct: false },
                    { id: "30-3", text: "am", correct: false }
                ]
            },
            {
                id: "31",
                buttons: [
                    { id: "31-1", text: "see", correct: true },
                    { id: "31-2", text: "sees", correct: false },
                    { id: "31-3", text: "seeing", correct: false }
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
                buttons: [
                    { id: "32-1", text: "studies", correct: true },
                    { id: "32-2", text: "study", correct: false },
                    { id: "32-3", text: "studying", correct: false }
                ]
            },
            {
                id: "33",
                buttons: [
                    { id: "33-1", text: "love", correct: false },
                    { id: "33-2", text: "loves", correct: true },
                    { id: "33-3", text: "loving", correct: false }
                ]
            },
            {
                id: "34",
                buttons: [
                    { id: "34-1", text: "says", correct: true },
                    { id: "34-2", text: "say", correct: false },
                    { id: "34-3", text: "saying", correct: false }
                ]
            },
            {
                id: "35",
                buttons: [
                    { id: "35-1", text: "is", correct: true },
                    { id: "35-2", text: "are", correct: false },
                    { id: "35-3", text: "am", correct: false }
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
                buttons: [
                    { id: "36-1", text: "studies", correct: false },
                    { id: "36-2", text: "study", correct: true },
                    { id: "36-3", text: "studying", correct: false }
                ]
            },
            {
                id: "37",
                buttons: [
                    { id: "37-1", text: "is", correct: false },
                    { id: "37-2", text: "are", correct: true },
                    { id: "37-3", text: "am", correct: false }
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
                buttons: [
                    { id: "38-1", text: "like", correct: true },
                    { id: "38-2", text: "likes", correct: false },
                    { id: "38-3", text: "liking", correct: false }
                ]
            },
            {
                id: "39",
                buttons: [
                    { id: "39-1", text: "is", correct: true },
                    { id: "39-2", text: "are", correct: false },
                    { id: "39-3", text: "am", correct: false }
                ]
            },
            {
                id: "40",
                buttons: [
                    { id: "40-1", text: "is", correct: true },
                    { id: "40-2", text: "are", correct: false },
                    { id: "40-3", text: "am", correct: false }
                ]
            },
            {
                id: "41",
                buttons: [
                    { id: "41-1", text: "miss", correct: true },
                    { id: "41-2", text: "misses", correct: false },
                    { id: "41-3", text: "missing", correct: false }
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
                buttons: [
                    { id: "42-1", text: "talk", correct: true },
                    { id: "42-2", text: "talks", correct: false },
                    { id: "42-3", text: "talking", correct: false }
                ]
            },
            {
                id: "43",
                buttons: [
                    { id: "43-1", text: "visit", correct: true },
                    { id: "43-2", text: "visits", correct: false },
                    { id: "43-3", text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { 
                text: "Continue", 
                action: "calculateFinalScore" 
            }
        ]
    },
    2121: {
        type: "score",
        buttons: [
            { text: "Next Chapter", action: "nextChapter" },
            { text: "Show the answers", action: "showAnswers" },
            { text: "Try Again", action: "tryAgain" }
        ]
    }
};

// 初始化游戏
function initGame() {
    createRoom();
    renderPage(gameState.currentPageId);
    
    // 添加答案模态框确认按钮事件
    document.getElementById('confirm-answer').addEventListener('click', () => {
        document.getElementById('answer-modal').classList.add('hidden');
    });
}

// 创建Firebase房间
function createRoom() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    gameState.roomId = month + day + hours + minutes;
    console.log("Created room:", gameState.roomId);
}

// 渲染页面
function renderPage(pageId) {
    const page = pages[pageId];
    if (!page) {
        console.error(`Page with ID ${pageId} not found`);
        return;
    }
    
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    // 添加页面标题和进度条（开始画面和得分画面除外）
    if (pageId !== 2100 && pageId !== 2121) {
        const header = document.createElement('div');
        header.className = 'page-header';
        
        const title = document.createElement('div');
        title.className = 'page-title';
        title.textContent = page.type === 'practice' ? 'Practice' : 'Test';
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        // 计算进度
        let progress = 0;
        if (page.type === 'practice') {
            const practicePages = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
            const currentIndex = practicePages.indexOf(parseInt(pageId));
            if (currentIndex !== -1) {
                progress = (currentIndex + 1) / 12 * 100;
            }
        } else if (page.type === 'test') {
            const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
            const currentIndex = testPages.indexOf(parseInt(pageId));
            if (currentIndex !== -1) {
                progress = (currentIndex + 1) / 8 * 100;
            }
        }
        
        progressBar.style.width = `${progress}%`;
        progressContainer.appendChild(progressBar);
        
        header.appendChild(title);
        header.appendChild(progressContainer);
        container.appendChild(header);
    }
    
    // 创建游戏画面
    const screen = document.createElement('div');
    screen.className = 'game-screen';
    screen.id = `page-${pageId}`;
    
    // 添加图片
    if (page.image) {
        const img = document.createElement('img');
        img.className = 'screen-image';
        img.src = `images/${page.image}`;
        img.alt = 'Game scene';
        img.onerror = function() {
            console.error(`Failed to load image: images/${page.image}`);
            this.style.display = 'none';
        };
        screen.appendChild(img);
    }
    
    // 添加文本内容
    if (page.text) {
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        const text = document.createElement('p');
        text.className = 'dialogue-text';
        text.innerHTML = formatTextWithPlaceholders(page.text);
        textContainer.appendChild(text);
        
        screen.appendChild(textContainer);
    }
    
    // 添加选项按钮
    if (page.options) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        page.options.forEach((optionGroup, index) => {
            const row = document.createElement('div');
            row.className = 'button-row';
            
            optionGroup.buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = btn.text;
                button.dataset.id = btn.id;
                button.dataset.group = optionGroup.id;
                button.dataset.correct = btn.correct;
                
                // 检查是否已选择此选项
                if (gameState.selectedOptions[pageId] && 
                    gameState.selectedOptions[pageId][optionGroup.id] === btn.id) {
                    button.classList.add('selected');
                }
                
                button.addEventListener('click', () => handleOptionClick(pageId, optionGroup.id, btn.id));
                row.appendChild(button);
            });
            
            buttonsContainer.appendChild(row);
        });
        
        screen.appendChild(buttonsContainer);
    }
    
    // 添加继续按钮
    if (page.buttons) {
        page.buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'continue-button';
            button.textContent = btn.text;
            
            if (btn.target) {
                button.addEventListener('click', () => handleContinueClick(btn.target, pageId));
            } else if (btn.action) {
                button.addEventListener('click', () => handleActionClick(btn.action, pageId));
            }
            
            screen.appendChild(button);
        });
    }
    
    // 对于得分页面，添加特殊布局
    if (pageId === 2121) {
        renderScorePage(screen);
    }
    
    container.appendChild(screen);
}

// 渲染得分页面
function renderScorePage(screen) {
    // 清除可能存在的继续按钮
    screen.innerHTML = '';
    
    // 添加背景图片
    const img = document.createElement('img');
    img.className = 'screen-image';
    img.src = gameState.score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    img.alt = 'Score background';
    img.onerror = function() {
        console.error('Failed to load score image');
        this.style.display = 'none';
    };
    screen.appendChild(img);
    
    // 添加得分文本
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    const scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    scoreText.textContent = `Your score is: ${Math.round(gameState.score * 4.55)}`;
    scoreContainer.appendChild(scoreText);
    
    // 添加按钮容器
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'score-buttons';
    
    // 添加Next Chapter按钮
    const nextChapterBtn = document.createElement('button');
    nextChapterBtn.className = 'score-button';
    nextChapterBtn.textContent = 'Next Chapter';
    nextChapterBtn.addEventListener('click', () => handleActionClick('nextChapter'));
    
    // 根据条件禁用Next Chapter按钮
    if (gameState.score < 60 && gameState.testAttempts === 0) {
        nextChapterBtn.disabled = true;
        nextChapterBtn.classList.add('disabled');
    }
    
    buttonsContainer.appendChild(nextChapterBtn);
    
    // 添加Show Answers按钮
    const showAnswersBtn = document.createElement('button');
    showAnswersBtn.className = 'score-button';
    showAnswersBtn.textContent = 'Show the answers';
    showAnswersBtn.addEventListener('click', () => handleActionClick('showAnswers'));
    buttonsContainer.appendChild(showAnswersBtn);
    
    // 添加Try Again按钮
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.className = 'score-button';
    tryAgainBtn.textContent = 'Try Again';
    tryAgainBtn.addEventListener('click', () => handleActionClick('tryAgain'));
    buttonsContainer.appendChild(tryAgainBtn);
    
    scoreContainer.appendChild(buttonsContainer);
    screen.appendChild(scoreContainer);
}

// 格式化带有占位符的文本
function formatTextWithPlaceholders(text) {
    return text.replace(/①|②|③|④/g, match => {
        return `<span class="placeholder">${match}</span>`;
    });
}

// 处理选项点击
function handleOptionClick(pageId, groupId, optionId) {
    // 初始化页面选择记录
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    
    // 取消同组中其他选项的选中状态
    const buttons = document.querySelectorAll(`#page-${pageId} .option-button[data-group="${groupId}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前选项为选中状态
    const selectedButton = document.querySelector(`#page-${pageId} .option-button[data-id="${optionId}"]`);
    selectedButton.classList.add('selected');
    
    // 保存选择
    gameState.selectedOptions[pageId][groupId] = optionId;
}

// 处理继续按钮点击
function handleContinueClick(targetPageId, currentPageId) {
    // 检查是否所有选项都已选择（如果有选项的话）
    const page = pages[currentPageId];
    if (page.options) {
        const selectedOptions = gameState.selectedOptions[currentPageId] || {};
        const allGroupsSelected = page.options.every(group => selectedOptions[group.id]);
        
        if (!allGroupsSelected) {
            showToast("Please complete all multiple-choice questions before continuing");
            return;
        }
        
        // 如果是测试页面，计算得分
        if (page.type === 'test') {
            calculateScore(currentPageId);
        }
    }
    
    // 跳转到目标页面
    gameState.currentPageId = targetPageId;
    renderPage(targetPageId);
}

// 计算得分
function calculateScore(pageId) {
    const page = pages[pageId];
    if (!page.options) return;
    
    const selectedOptions = gameState.selectedOptions[pageId] || {};
    
    page.options.forEach(group => {
        const selectedOptionId = selectedOptions[group.id];
        if (selectedOptionId) {
            const selectedOption = group.buttons.find(btn => btn.id === selectedOptionId);
            if (selectedOption && selectedOption.correct) {
                gameState.score++;
            }
        }
    });
    
    console.log(`Current score: ${gameState.score}`);
}

// 计算最终得分并保存到Firebase
function calculateFinalScore() {
    // 保存得分到Firebase
    saveScoreToFirebase();
    
    // 跳转到得分页面
    gameState.currentPageId = 2121;
    renderPage(2121);
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (!gameState.roomId) {
        console.error("No room ID available for saving score");
        return;
    }
    
    const finalScore = Math.round(gameState.score * 4.55);
    
    database.ref('scores/' + gameState.roomId).set({
        score: finalScore,
        timestamp: Date.now()
    }).then(() => {
        console.log("Score saved to Firebase:", finalScore);
    }).catch(error => {
        console.error("Error saving score to Firebase:", error);
    });
}

// 处理动作按钮点击
function handleActionClick(action, pageId) {
    switch (action) {
        case "nextChapter":
            // 下一章逻辑 - 这里可以根据需要实现
            console.log("Next Chapter clicked");
            break;
        case "showAnswers":
            showAnswers();
            break;
        case "tryAgain":
            tryAgain();
            break;
        case "calculateFinalScore":
            calculateFinalScore();
            break;
    }
}

// 显示答案
function showAnswers() {
    const answers = `The answer of test：
My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 	she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near 	Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge 	is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a 	lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    
    document.getElementById('correct-answers').textContent = answers;
    document.getElementById('answer-modal').classList.remove('hidden');
}

// 重试
function tryAgain() {
    // 重置测试得分
    gameState.score = 0;
    gameState.testAttempts++;
    
    // 清除测试页面的选择
    const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
    testPages.forEach(pageId => {
        if (gameState.selectedOptions[pageId]) {
            delete gameState.selectedOptions[pageId];
        }
    });
    
    // 跳转到第一个测试页面
    gameState.currentPageId = 2113;
    renderPage(2113);
}

// 显示提示信息
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    // 3秒后隐藏提示
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 防止页面缩放和滚动
document.addEventListener('touchmove', function (e) {
    if (e.scale !== 1) { e.preventDefault(); }
}, { passive: false });

// 防止双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
