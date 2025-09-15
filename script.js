// script.js
// 英语时态之旅游戏主逻辑

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
    currentPage: 2100, // 当前页面ID
    score: 0, // 当前得分
    totalCorrect: 0, // 正确选项总数
    selectedOptions: {}, // 存储每页选择的选项
    testStarted: false, // 测试是否开始
    practicePages: [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112], // 练习页面
    testPages: [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120], // 测试页面
    roomId: null // Firebase房间ID
};

// 页面配置数据
const pageConfigs = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [{ text: "Begin", action: "nextPage", target: 2101 }]
    },
    2101: {
        type: "practice",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [{ text: "Continue", action: "nextPage", target: 2102 }]
    },
    2102: {
        type: "practice",
        image: "画面02.jpg",
        text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
        options: [
            {
                id: "group1",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "am", correct: false },
                    { id: "1-3", text: "are", correct: false }
                ]
            },
            {
                id: "group2",
                label: "②",
                buttons: [
                    { id: "2-1", text: "calls", correct: false },
                    { id: "2-2", text: "call", correct: true },
                    { id: "2-3", text: "calling", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2103 }]
    },
    2103: {
        type: "practice",
        image: "画面03.jpg",
        text: "Arturo: OK. Where ① you from, Alexa?",
        options: [
            {
                id: "group3",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2104 }]
    },
    2104: {
        type: "practice",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [{ text: "Continue", action: "nextPage", target: 2105 }]
    },
    2105: {
        type: "practice",
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
        options: [
            {
                id: "group4",
                label: "①",
                buttons: [
                    { id: "1-1", text: "lives", correct: true },
                    { id: "1-2", text: "live", correct: false },
                    { id: "1-3", text: "living", correct: false }
                ]
            },
            {
                id: "group5",
                label: "②",
                buttons: [
                    { id: "2-1", text: "lives", correct: true },
                    { id: "2-2", text: "live", correct: false },
                    { id: "2-3", text: "are living", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2106 }]
    },
    2106: {
        type: "practice",
        image: "画面06.jpg",
        text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
        options: [
            {
                id: "group6",
                label: "①",
                buttons: [
                    { id: "1-1", text: "loves", correct: false },
                    { id: "1-2", text: "love", correct: true },
                    { id: "1-3", text: "loving", correct: false }
                ]
            },
            {
                id: "group7",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "am", correct: false },
                    { id: "2-3", text: "are", correct: false }
                ]
            },
            {
                id: "group8",
                label: "③",
                buttons: [
                    { id: "3-1", text: "loves", correct: true },
                    { id: "3-2", text: "love", correct: false },
                    { id: "3-3", text: "loving", correct: false }
                ]
            },
            {
                id: "group9",
                label: "④",
                buttons: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2107 }]
    },
    2107: {
        type: "practice",
        image: "画面07.jpg",
        text: "Arturo: Who ① Soo-jin? She ② familiar.",
        options: [
            {
                id: "group10",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                id: "group11",
                label: "②",
                buttons: [
                    { id: "2-1", text: "looks", correct: true },
                    { id: "2-2", text: "look", correct: false },
                    { id: "2-3", text: "looking", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2108 }]
    },
    2108: {
        type: "practice",
        image: "画面08.jpg",
        text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
        options: [
            {
                id: "group12",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                id: "group13",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                id: "group14",
                label: "③",
                buttons: [
                    { id: "3-1", text: "has", correct: false },
                    { id: "3-2", text: "have", correct: true },
                    { id: "3-3", text: "having", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2109 }]
    },
    2109: {
        type: "practice",
        image: "画面09.jpg",
        text: "Arturo: Where ① she from?",
        options: [
            {
                id: "group15",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2110 }]
    },
    2110: {
        type: "practice",
        image: "画面10.jpg",
        text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
        options: [
            {
                id: "group16",
                label: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                id: "group17",
                label: "②",
                buttons: [
                    { id: "2-1", text: "says", correct: true },
                    { id: "2-2", text: "say", correct: false },
                    { id: "2-3", text: "saying", correct: false }
                ]
            },
            {
                id: "group18",
                label: "③",
                buttons: [
                    { id: "3-1", text: "is", correct: false },
                    { id: "3-2", text: "are", correct: true },
                    { id: "3-3", text: "am", correct: false }
                ]
            },
            {
                id: "group19",
                label: "④",
                buttons: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2111 }]
    },
    2111: {
        type: "practice",
        image: "画面11.jpg",
        text: "Arturo: Actually, it ① Valdez",
        options: [
            {
                id: "group20",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2112 }]
    },
    2112: {
        type: "practice",
        image: "画面12.jpg",
        text: "Alexa: How ① you spell that?",
        options: [
            {
                id: "group21",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2113 }]
    },
    2113: {
        type: "test",
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
        options: [
            {
                id: "group22",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                id: "group23",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                id: "group24",
                label: "③",
                buttons: [
                    { id: "3-1", text: "go", correct: true },
                    { id: "3-2", text: "goes", correct: false },
                    { id: "3-3", text: "going", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2114 }]
    },
    2114: {
        type: "test",
        image: "画面14.jpg",
        text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
        options: [
            {
                id: "group25",
                label: "①",
                buttons: [
                    { id: "1-1", text: "don't", correct: false },
                    { id: "1-2", text: "isn't", correct: false },
                    { id: "1-3", text: "doesn't", correct: true }
                ]
            },
            {
                id: "group26",
                label: "②",
                buttons: [
                    { id: "2-1", text: "go", correct: false },
                    { id: "2-2", text: "goes", correct: true },
                    { id: "2-3", text: "going", correct: false }
                ]
            },
            {
                id: "group27",
                label: "③",
                buttons: [
                    { id: "3-1", text: "lives", correct: true },
                    { id: "3-2", text: "live", correct: false },
                    { id: "3-3", text: "living", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2115 }]
    },
    2115: {
        type: "test",
        image: "画面15.jpg",
        text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
        options: [
            {
                id: "group28",
                label: "①",
                buttons: [
                    { id: "1-1", text: "lives", correct: false },
                    { id: "1-2", text: "live", correct: true },
                    { id: "1-3", text: "living", correct: false }
                ]
            },
            {
                id: "group29",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2116 }]
    },
    2116: {
        type: "test",
        image: "画面16.jpg",
        text: "It ① difficult sometimes because we ② each other only on weekends.",
        options: [
            {
                id: "group30",
                label: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                id: "group31",
                label: "②",
                buttons: [
                    { id: "2-1", text: "see", correct: true },
                    { id: "2-2", text: "sees", correct: false },
                    { id: "2-3", text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2117 }]
    },
    2117: {
        type: "test",
        image: "画面17.jpg",
        text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
        options: [
            {
                id: "group32",
                label: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                id: "group33",
                label: "②",
                buttons: [
                    { id: "2-1", text: "love", correct: false },
                    { id: "2-2", text: "loves", correct: true },
                    { id: "2-3", text: "loving", correct: false }
                ]
            },
            {
                id: "group34",
                label: "③",
                buttons: [
                    { id: "3-1", text: "says", correct: true },
                    { id: "3-2", text: "say", correct: false },
                    { id: "3-3", text: "saying", correct: false }
                ]
            },
            {
                id: "group35",
                label: "④",
                buttons: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2118 }]
    },
    2118: {
        type: "test",
        image: "画面18.jpg",
        text: "I ① philosophy and politics, so my courses ② very different from hers.",
        options: [
            {
                id: "group36",
                label: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: false },
                    { id: "1-2", text: "study", correct: true },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                id: "group37",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2119 }]
    },
    2119: {
        type: "test",
        image: "画面19.jpg",
        text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
        options: [
            {
                id: "group38",
                label: "①",
                buttons: [
                    { id: "1-1", text: "like", correct: true },
                    { id: "1-2", text: "likes", correct: false },
                    { id: "1-3", text: "liking", correct: false }
                ]
            },
            {
                id: "group39",
                label: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                id: "group40",
                label: "③",
                buttons: [
                    { id: "3-1", text: "is", correct: true },
                    { id: "3-2", text: "are", correct: false },
                    { id: "3-3", text: "am", correct: false }
                ]
            },
            {
                id: "group41",
                label: "④",
                buttons: [
                    { id: "4-1", text: "miss", correct: true },
                    { id: "4-2", text: "misses", correct: false },
                    { id: "4-3", text: "missing", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "nextPage", target: 2120 }]
    },
    2120: {
        type: "test",
        image: "画面20.jpg",
        text: "We ① on the phone every night and we ② each other whenever we can.",
        options: [
            {
                id: "group42",
                label: "①",
                buttons: [
                    { id: "1-1", text: "talk", correct: true },
                    { id: "1-2", text: "talks", correct: false },
                    { id: "1-3", text: "talking", correct: false }
                ]
            },
            {
                id: "group43",
                label: "②",
                buttons: [
                    { id: "2-1", text: "visit", correct: true },
                    { id: "2-2", text: "visits", correct: false },
                    { id: "2-3", text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [{ text: "Continue", action: "calculateScore", target: 2121 }]
    },
    2121: {
        type: "score",
        buttons: [
            { text: "Next Chapter", action: "nextChapter", enabled: false },
            { text: "Show the answers", action: "showAnswers" },
            { text: "Try Again", action: "tryAgain", target: 2113 }
        ]
    }
};

// 初始化游戏
function initGame() {
    // 创建房间ID（当前时间）
    const now = new Date();
    gameState.roomId = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    // 渲染初始页面
    renderPage(gameState.currentPage);
    
    // 添加事件监听
    document.addEventListener('click', handleGlobalClick);
}

// 渲染页面
function renderPage(pageId) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    
    const config = pageConfigs[pageId];
    if (!config) {
        console.error(`Page configuration not found for ID: ${pageId}`);
        return;
    }
    
    // 创建页面元素
    const pageElement = document.createElement('div');
    pageElement.id = `page-${pageId}`;
    pageElement.className = 'page active';
    
    // 添加标题栏（除了开始和得分页面）
    if (pageId !== 2100 && pageId !== 2121) {
        const titleBar = createTitleBar(pageId, config.type);
        pageElement.appendChild(titleBar);
    }
    
    // 添加图片区域（除了得分页面）
    if (pageId !== 2121) {
        const imageContainer = createImageContainer(config.image);
        pageElement.appendChild(imageContainer);
    }
    
    // 添加文本区域（除了开始页面）
    if (pageId !== 2100 && pageId !== 2121) {
        const textContainer = createTextContainer(config.text);
        pageElement.appendChild(textContainer);
    }
    
    // 添加选项区域（如果有选项）
    if (config.options) {
        const optionsContainer = createOptionsContainer(config.options, pageId);
        pageElement.appendChild(optionsContainer);
    }
    
    // 添加按钮区域
    const buttonsContainer = createButtonsContainer(config.buttons, pageId);
    pageElement.appendChild(buttonsContainer);
    
    // 如果是得分页面，特殊处理
    if (pageId === 2121) {
        createScorePage(pageElement);
    }
    
    // 如果是开始页面，特殊处理
    if (pageId === 2100) {
        createStartPage(pageElement, config);
    }
    
    gameContainer.appendChild(pageElement);
}

// 创建标题栏
function createTitleBar(pageId, pageType) {
    const titleBar = document.createElement('div');
    titleBar.className = 'page-title';
    
    const titleText = document.createElement('div');
    titleText.className = 'title-text';
    titleText.textContent = pageType === 'practice' ? 'Practice' : 'Test';
    titleBar.appendChild(titleText);
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // 计算进度
    let progress = 0;
    if (pageType === 'practice') {
        const index = gameState.practicePages.indexOf(pageId);
        progress = index >= 0 ? (index + 1) / gameState.practicePages.length : 0;
    } else if (pageType === 'test') {
        const index = gameState.testPages.indexOf(pageId);
        progress = index >= 0 ? (index + 1) / gameState.testPages.length : 0;
    }
    
    progressBar.style.width = `${progress * 100}%`;
    progressContainer.appendChild(progressBar);
    titleBar.appendChild(progressContainer);
    
    return titleBar;
}

// 创建图片容器
function createImageContainer(imageName) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    const image = document.createElement('img');
    image.className = 'game-image';
    image.src = `images/${imageName}`;
    image.alt = 'Game Image';
    
    // 添加错误处理
    image.onerror = function() {
        console.error(`Failed to load image: images/${imageName}`);
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
    };
    
    imageContainer.appendChild(image);
    return imageContainer;
}

// 创建文本容器
function createTextContainer(text) {
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.textContent = text;
    return textContainer;
}

// 创建选项容器
function createOptionsContainer(options, pageId) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    options.forEach((optionGroup, groupIndex) => {
        const groupElement = document.createElement('div');
        groupElement.className = 'option-group';
        groupElement.id = optionGroup.id;
        
        const groupLabel = document.createElement('div');
        groupLabel.className = 'group-label';
        groupLabel.textContent = optionGroup.label;
        groupElement.appendChild(groupLabel);
        
        const optionsRow = document.createElement('div');
        optionsRow.className = 'options-row';
        
        optionGroup.buttons.forEach((button, btnIndex) => {
            const buttonElement = document.createElement('button');
            buttonElement.className = 'option-button';
            buttonElement.id = `${pageId}-${button.id}`;
            buttonElement.textContent = button.text;
            buttonElement.dataset.correct = button.correct;
            buttonElement.dataset.group = optionGroup.id;
            
            // 检查是否已选择此选项
            if (gameState.selectedOptions[pageId] && 
                gameState.selectedOptions[pageId][optionGroup.id] === button.id) {
                buttonElement.classList.add('selected');
            }
            
            buttonElement.addEventListener('click', function() {
                selectOption(this, pageId, optionGroup.id);
            });
            
            optionsRow.appendChild(buttonElement);
        });
        
        groupElement.appendChild(optionsRow);
        optionsContainer.appendChild(groupElement);
    });
    
    return optionsContainer;
}

// 创建按钮容器
function createButtonsContainer(buttons, pageId) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    
    buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.className = buttonConfig.text === 'Continue' ? 'continue-button' : 'score-button';
        button.textContent = buttonConfig.text;
        button.dataset.action = buttonConfig.action;
        
        if (buttonConfig.target) {
            button.dataset.target = buttonConfig.target;
        }
        
        if (buttonConfig.enabled === false) {
            button.disabled = true;
        }
        
        buttonsContainer.appendChild(button);
    });
    
    return buttonsContainer;
}

// 创建开始页面
function createStartPage(pageElement, config) {
    pageElement.style.justifyContent = 'center';
    pageElement.style.textAlign = 'center';
    
    const title = document.createElement('div');
    title.className = 'start-title';
    title.textContent = config.text;
    pageElement.appendChild(title);
    
    const startButton = document.createElement('button');
    startButton.className = 'start-button';
    startButton.textContent = config.buttons[0].text;
    startButton.dataset.action = config.buttons[0].action;
    startButton.dataset.target = config.buttons[0].target;
    pageElement.appendChild(startButton);
}

// 创建得分页面
function createScorePage(pageElement) {
    pageElement.className = 'page active';
    pageElement.style.justifyContent = 'center';
    
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    // 根据得分选择背景图片
    const scoreImage = document.createElement('img');
    scoreImage.className = 'game-image';
    scoreImage.src = gameState.score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    scoreImage.alt = 'Score Image';
    scoreImage.style.marginBottom = '20px';
    
    // 添加错误处理
    scoreImage.onerror = function() {
        console.error(`Failed to load score image: ${this.src}`);
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TY29yZSBJbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
    };
    
    scoreContainer.appendChild(scoreImage);
    
    const scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    scoreText.textContent = `Your score is: ${Math.round(gameState.score)}`;
    scoreContainer.appendChild(scoreText);
    
    const scoreButtons = document.createElement('div');
    scoreButtons.className = 'score-buttons';
    
    // 添加按钮
    pageConfigs[2121].buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.className = 'score-button';
        button.textContent = buttonConfig.text;
        button.dataset.action = buttonConfig.action;
        
        if (buttonConfig.target) {
            button.dataset.target = buttonConfig.target;
        }
        
        // 根据得分设置Next Chapter按钮状态
        if (buttonConfig.text === 'Next Chapter') {
            button.disabled = gameState.score < 60 && !gameState.testStarted;
        }
        
        scoreButtons.appendChild(button);
    });
    
    scoreContainer.appendChild(scoreButtons);
    pageElement.appendChild(scoreContainer);
    
    // 保存分数到Firebase
    saveScoreToFirebase();
}

// 选择选项
function selectOption(button, pageId, groupId) {
    // 取消同组中其他按钮的选中状态
    const groupButtons = document.querySelectorAll(`[data-group="${groupId}"]`);
    groupButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 选中当前按钮
    button.classList.add('selected');
    
    // 保存选择
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    gameState.selectedOptions[pageId][groupId] = button.id;
}

// 处理全局点击事件
function handleGlobalClick(event) {
    const target = event.target;
    
    if (target.tagName === 'BUTTON') {
        const action = target.dataset.action;
        const targetPage = target.dataset.target;
        
        switch (action) {
            case 'nextPage':
                handleNextPage(targetPage);
                break;
            case 'calculateScore':
                calculateScore();
                break;
            case 'nextChapter':
                // 空操作，根据需求可以扩展
                break;
            case 'showAnswers':
                showAnswers();
                break;
            case 'tryAgain':
                tryAgain(targetPage);
                break;
        }
    }
}

// 处理下一页
function handleNextPage(targetPage) {
    const currentPage = gameState.currentPage;
    const config = pageConfigs[currentPage];
    
    // 检查是否所有选项都已选择（如果有选项）
    if (config.options) {
        const allSelected = config.options.every(group => {
            return gameState.selectedOptions[currentPage] && 
                   gameState.selectedOptions[currentPage][group.id];
        });
        
        if (!allSelected) {
            showToast('Please complete all multiple-choice questions before continuing');
            return;
        }
        
        // 如果是测试页面，计算得分
        if (config.type === 'test') {
            calculatePageScore(currentPage);
        }
    }
    
    // 跳转到目标页面
    gameState.currentPage = parseInt(targetPage);
    renderPage(gameState.currentPage);
}

// 计算页面得分
function calculatePageScore(pageId) {
    const config = pageConfigs[pageId];
    let pageCorrect = 0;
    
    config.options.forEach(group => {
        const selectedButtonId = gameState.selectedOptions[pageId][group.id];
        const selectedButton = document.getElementById(selectedButtonId);
        
        if (selectedButton && selectedButton.dataset.correct === 'true') {
            pageCorrect++;
        }
    });
    
    gameState.totalCorrect += pageCorrect;
}

// 计算总分
function calculateScore() {
    // 计算最后一页的得分
    calculatePageScore(gameState.currentPage);
    
    // 计算总分（正确选项数 * 4.55，四舍五入到整数）
    gameState.score = Math.round(gameState.totalCorrect * 4.55);
    
    // 标记测试已经开始（用于Next Chapter按钮状态）
    gameState.testStarted = true;
    
    // 跳转到得分页面
    gameState.currentPage = 2121;
    renderPage(gameState.currentPage);
}

// 显示答案
function showAnswers() {
    const answers = `
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
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const answerText = document.createElement('div');
    answerText.className = 'answer-text';
    answerText.textContent = answers;
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'confirm-button';
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(answerText);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

// 重试
function tryAgain(targetPage) {
    // 重置测试相关状态
    gameState.score = 0;
    gameState.totalCorrect = 0;
    
    // 清除测试页面的选择
    gameState.testPages.forEach(pageId => {
        if (gameState.selectedOptions[pageId]) {
            delete gameState.selectedOptions[pageId];
        }
    });
    
    // 跳转到目标页面
    gameState.currentPage = parseInt(targetPage);
    renderPage(gameState.currentPage);
}

// 保存分数到Firebase
function saveScoreToFirebase() {
    try {
        const scoreData = {
            score: gameState.score,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        database.ref(`scores/${gameState.roomId}`).set(scoreData)
            .then(() => {
                console.log('Score saved successfully');
            })
            .catch((error) => {
                console.error('Error saving score:', error);
            });
    } catch (error) {
        console.error('Firebase error:', error);
    }
}

// 显示提示信息
function showToast(message) {
    // 移除现有的提示框
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 显示提示框
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 3秒后隐藏并移除提示框
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 预加载图片
    preloadImages();
    
    // 初始化游戏
    initGame();
});

// 预加载图片
function preloadImages() {
    const imageUrls = [];
    
    // 收集所有图片URL
    for (const pageId in pageConfigs) {
        const config = pageConfigs[pageId];
        if (config.image) {
            imageUrls.push(`images/${config.image}`);
        }
    }
    
    // 添加得分页面图片
    imageUrls.push('images/及格.jpg');
    imageUrls.push('images/不及格.jpg');
    
    // 预加载图片
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
