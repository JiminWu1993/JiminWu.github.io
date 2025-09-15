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

// 游戏状态和配置
let currentPageId = 2100; // 从开始画面开始
let score = 0;
let selectedAnswers = {};
let isFirstTest = true;
let roomId = generateRoomId();

// 生成房间ID（当前时间格式：MMDDHHmm）
function generateRoomId() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return month + day + hours + minutes;
}

// 游戏页面配置
const gamePages = {
    // 开始画面
    2100: {
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            {
                text: "Begin",
                action: () => navigateTo(2101)
            }
        ],
        isStartPage: true
    },
    
    // 练习页面
    2101: {
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2102)
            }
        ],
        isPractice: true,
        practiceNumber: 1
    },
    
    2102: {
        image: "画面02.jpg",
        text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "am", correct: false },
                    { id: "1-3", text: "are", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "calls", correct: false },
                    { id: "2-2", text: "call", correct: true },
                    { id: "2-3", text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2103),
                validate: () => validateOptions(2102)
            }
        ],
        isPractice: true,
        practiceNumber: 2
    },
    
    2103: {
        image: "画面03.jpg",
        text: "Arturo: OK. Where ① you from, Alexa?",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-极", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigate极(2104),
                validate: () => validateOptions(2103)
            }
        ],
        isPractice: true,
        practiceNumber: 3
    },
    
    2104: {
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2105)
            }
        ],
        isPractice: true,
        practiceNumber: 4
    },
    
    2105: {
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "lives", correct: true },
                    { id: "1-2", text: "live", correct: false },
                    { id: "1-3", text: "living", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "lives", correct: true },
                    { id: "2-2", text: "live", correct: false },
                    { id: "2-3", text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2106),
                validate: () => validateOptions(2105)
            }
        ],
        isPractice极: true,
        practiceNumber: 5
    },
    
    2106: {
        image: "画面06.jpg",
        text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "loves", correct: false },
                    { id: "1-2", text: "love", correct: true },
                    { id: "1-3", text: "loving", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "am", correct: false },
                    { id: "2-3", text: "are", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "loves", correct: true },
                    { id: "3-2", text: "love", correct: false },
                    { id: "3-3", text: "loving", correct: false }
                ]
            },
            {
                group: 4,
                number: "④",
                buttons: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2107),
                validate: () => validateOptions(2106)
            }
        ],
        isPractice: true,
        practiceNumber: 6
    },
    
    2107: {
        image: "画面07.jpg",
        text: "Arturo: Who ① Soo-jin? She ② familiar.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "looks", correct: true },
                    { id: "2-2", text: "look", correct: false },
                    { id: "2-3", text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2108),
                validate: () => validateOptions(2107)
            }
        ],
        isPractice: true,
        practiceNumber: 7
    },
    
    2108: {
        image: "画面08.jpg",
        text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    {极 id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "has", correct: false },
                    { id: "3-2", text: "have", correct: true },
                    { id: "3-3", text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2109),
                validate: () => validateOptions(2108)
            }
        ],
        isPractice: true,
        practiceNumber: 8
    },
    
    2109: {
        image: "画面09.jpg",
        text: "Arturo: Where ① she from?",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2110),
                validate: () => validateOptions(2109)
            }
        ],
        isPractice: true,
        practiceNumber: 9
    },
    
    2110: {
        image: "画面10.jpg",
        text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "says", correct: true },
                    { id: "2-2", text: "say", correct: false },
                    { id: "2-3", text极: "saying", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "is", correct: false },
                    { id: "3-2", text: "are", correct: true },
                    { id: "3-3", text: "am", correct: false }
                ]
            },
            {
                group: 4,
                number: "④",
                buttons: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am",极 correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2111),
                validate: () => validateOptions(2110)
            }
        ],
        isPractice: true,
        practiceNumber: 10
    },
    
    2111: {
        image: "画面11.jpg",
        text: "Arturo: Actually, it ① Valdez",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2112),
                validate: () => validateOptions(2111)
            }
        ],
        isPractice: true,
        practiceNumber: 11
    },
    
    2112: {
        image: "画面12.jpg",
        text: "Alexa: How ① you spell that?",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2113),
                validate: () => validateOptions(2112)
            }
        ],
        isPractice: true,
        practiceNumber: 12
    },
    
    // 测试页面
    2113: {
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "极1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "go", correct: true },
                    { id: "3-2", text: "go极s", correct: false },
                    { id: "3-3", text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2114);
                },
                validate: () => validateOptions(2113)
            }
        ],
        isTest: true,
        testNumber: 1
    },
    
    2114: {
        image: "画面14.jpg",
        text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "don't", correct: false },
                    { id: "1-2", text: "isn't", correct: false },
                    { id: "1-3", text: "doesn't", correct: true }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "go", correct: false },
                    { id: "2-2", text: "goes", correct: true },
                    { id: "2-3", text: "going", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "lives", correct: true },
                    { id: "3-2", text: "live", correct: false },
                    { id: "3-3", text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2115);
                },
                validate: () => validateOptions(2114)
            }
        ],
        isTest: true,
        testNumber: 2
    },
    
    2115: {
        image: "画面15.jpg",
        text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
        options: [
            {
                group: 极1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "lives", correct: false },
                    { id: "1-2", text: "live", correct: true },
                    { id: "1-3", text: "living", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
极           ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2116);
                },
                validate: () => validateOptions(2115)
            }
        ],
        isTest: true,
        testNumber: 3
    },
    
    2116: {
        image: "画面16.jpg",
        text: "It ① difficult sometimes because we ② each other only on weekends.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "see", correct: true },
                    { id: "2-2", text: "sees", correct: false },
                    { id: "2-3", text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2117);
                },
                validate: () => validateOptions(2116)
            }
        ],
        isTest: true,
        testNumber: 4
    },
    
    2117: {
        image: "画面17.jpg",
        text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "love", correct: false },
                    { id: "2-2", text: "loves", correct: true },
                    { id: "2-3", text: "loving", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "says", correct: true },
                    { id: "3-2", text: "say", correct: false },
                    { id: "3-3", text: "saying", correct: false }
                ]
            },
            {
                group: 4,
                number: "④",
                buttons: [
                    { id: "4-1", text: "极is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2118);
                },
                validate: () => validateOptions(2117)
            }
        ],
        isTest: true,
        testNumber: 5
    },
    
    2118: {
        image: "画面18.jpg",
        text: "I ① philosophy and politics, so my courses ② very different from hers.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "studies", correct: false },
                    { id: "1-2", text: "study", correct: true },
                    { id: "1-3", text: "studying", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2119);
                },
                validate: () => validateOptions(2118)
            }
        ],
        isTest: true,
        testNumber: 6
    },
    
    2119: {
        image: "画面19.jpg",
        text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "like", correct: true },
                    { id: "1-2", text: "likes", correct: false },
                    { id: "1-3", text: "liking", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
                ]
            },
            {
                group: 3,
                number: "③",
                buttons: [
                    { id: "3-1", text: "is", correct: true },
                    { id: "3-2", text: "are", correct: false },
                    { id: "3-3", text: "am", correct: false }
                ]
            },
            {
                group: 4,
                number: "④",
                buttons: [
                    { id: "4-1", text: "miss", correct: true },
                    { id: "4-2", text: "misses", correct: false },
                    { id: "4-3", text: "missing", correct:极 false }
                ]
            }
        ],
        buttons: [
            {
                text: "极Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2120);
                },
                validate: () => validateOptions(2119)
            }
        ],
        isTest: true,
        testNumber: 7
    },
    
    2120: {
        image: "画面20.jpg",
        text: "We ① on the phone every night and we ② each other whenever we can.",
        options: [
            {
                group: 1,
                number: "①",
                buttons: [
                    { id: "1-1", text: "talk", correct: true },
                    { id: "1-2", text: "talks", correct: false },
                    { id: "1-3", text: "talking", correct: false }
                ]
            },
            {
                group: 2,
                number: "②",
                buttons: [
                    { id: "2-1", text: "visit", correct: true },
                    { id: "2-2", text: "visits", correct: false },
                    { id: "2-3", text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore();
                    navigateTo(2121);
                },
                validate: () => validateOptions(2120)
            }
        ],
        isTest: true,
        testNumber: 8
    },
    
    // 得分页面
    2121: {
        isScorePage: true,
        buttons: [
            {
                id: "next-chapter",
                text: "Next Chapter",
                action: () => { /* 暂无交互结果 */ },
                validate: () => {
                    if (isFirstTest && score >= 60) return true;
                    if (!isFirstTest) return true;
                    return false;
                }
            },
            {
                id: "show-answers",
                text: "Show the answers",
                action: () => showAnswers(),
                validate: () => {
                    if (isFirstTest && score >= 60) return true;
                    if (!isFirstTest) return true;
                    return false;
                }
            },
            {
                id: "try-again",
                text: "Try Again",
                action: () => {
                    score = 0;
                    isFirstTest = false;
                    navigateTo(2113);
                }
            }
        ]
    }
};

// 初始化游戏
function initGame() {
    navigateTo(currentPageId);
    
    // 添加事件监听器
    document.addEventListener('click', handleButtonClicks);
}

// 页面导航
function navigateTo(pageId) {
    currentPageId = pageId;
    renderPage(pageId);
}

// 渲染页面
function renderPage(pageId) {
    const page = gamePages[pageId];
    const container = document.getElementById('game-container');
    
    // 清空容器
    container.innerHTML = '';
    
    if (page.isStartPage) {
        renderStartPage(page);
    } else if (page.isScorePage) {
        renderScorePage(page);
    } else {
        renderGamePage(page);
    }
}

// 渲染开始页面
function renderStartPage(page) {
    const container = document.getElementById('game-container');
    
    // 创建图片
    const img = document.createElement('img');
    img.src = `images/${page.image}`;
    img.alt = "Start Page";
    img.className = 'game-image';
    
    // 创建文字内容
    const textDiv = document.createElement('div');
    textDiv.className = '极text-display';
    textDiv.textContent = page.text;
    
    // 创建按钮
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttons-container';
    
    page.buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.className = 'continue-button';
        button.textContent = buttonConfig.text;
        button.onclick = buttonConfig.action;
        buttonDiv.appendChild(button);
    });
    
    // 组装页面
    container.appendChild(img);
    container.appendChild(textDiv);
    container.appendChild(buttonDiv);
}

// 渲染游戏页面
function renderGamePage(page) {
    const container = document.getElementById('game-container');
    
    // 创建页面标题和进度条
    const header = document.createElement('div');
    header.className = 'page-header';
    
    const title = document.createElement('div');
    title.className = 'page-title';
    title.textContent = page.isPractice ? 'Practice' : 'Test';
    
    const progressContainer = document.createElement('极div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // 计算进度
    if (page.isPractice) {
        progressBar.style.width = `${(page.practiceNumber / 12) * 100}%`;
    } else if (page.isTest) {
        progressBar.style.width = `${(page.testNumber / 8) * 100}%`;
    }
    
    progressContainer.appendChild(progressBar);
    header.appendChild(title);
    header.appendChild(progressContainer);
    
    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'game-content';
    
    // 创建图片
    const img = document.createElement('img');
    img.src = `images/${page.image}`;
    img.alt = "Game Page";
    img.className = 'game-image';
    
    // 创建文字内容
    const textDiv = document.createElement('div');
    textDiv.className = 'text-display';
    textDiv.textContent = page.text;
    
    // 创建选项按钮区域
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'buttons-container';
    
    if (page.options) {
        page.options.forEach(optionGroup => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'button-group';
            
            const groupNumber = document.createElement('span');
            groupNumber.className = 'group-number';
            groupNumber.textContent = optionGroup.number;
            
            const rowDiv = document.createElement('div');
            rowDiv.className = 'button-row';
            
            optionGroup.buttons.forEach(buttonConfig => {
                const button = document.createElement('button');
                button.className = 'option-button';
                if (selectedAnswers[pageId] && selectedAnswers[pageId][optionGroup.group] === buttonConfig.id) {
                    button.classList.add('selected');
                }
                button.textContent = buttonConfig.text;
                button.dataset.id = buttonConfig.id;
                button.dataset.group = optionGroup.group;
                button.dataset.page = pageId;
                button.onclick = () => selectOption(buttonConfig.id, optionGroup.group, pageId);
                rowDiv.appendChild(button);
            });
            
            groupDiv.appendChild(groupNumber);
            groupDiv.appendChild(rowDiv);
            optionsContainer.appendChild(groupDiv);
        });
    }
    
    // 创建Continue按钮
    const continueButton = document.createElement('button');
    continueButton.className = 'continue-button';
    continueButton.textContent = 'Continue';
    continueButton.onclick = () => {
        if (page.buttons[0].validate && !page.buttons[极0].validate()) {
            showToast('Please complete all multiple-choice questions before continuing');
            return;
        }
        page.buttons[0].action();
    };
    
    // 组装页面
    content.appendChild(img);
    content.appendChild(textDiv);
    content.appendChild(optionsContainer);
    content.appendChild(continueButton);
    
    container.appendChild(header);
    container.appendChild(content);
}

// 渲染得分页面
function renderScorePage(page) {
    const container = document.getElementById('game-container');
    
    // 创建背景图片
    const bgImg = document.createElement('img');
    bgImg.src = `images/${score >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    bgImg.alt = "Score Background";
    bgImg.className = 'score-background';
    
    // 创建得分显示
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `<h2>Your score is: ${Math.round(score)}</h2>`;
    
    // 创建按钮容器
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'score-b极uttons';
    
    // 创建按钮
    page.buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.className = 'score-button';
        button.textContent = buttonConfig.text;
        button.onclick = buttonConfig.action;
        
        // 验证按钮状态
        if (buttonConfig.validate && !buttonConfig.validate()) {
            button.classList.add('disabled');
            button.onclick = null;
        }
        
        buttonsDiv.appendChild(button);
    });
    
    scoreDisplay.appendChild(buttonsDiv);
    
    container.appendChild(bgImg);
    container.appendChild(scoreDisplay);
    
    // 保存得分到Firebase
    saveScoreToFirebase();
}

// 选择选项
function selectOption(buttonId, groupId, pageId) {
    // 保存选择
    if (!selectedAnswers[pageId]) {
        selectedAnswers[pageId] = {};
    }
    selectedAnswers[pageId][groupId] = buttonId;
    
    // 更新UI
    const buttons = document.querySelectorAll(`button[data-page="${pageId}"][data-group="${groupId}"]`);
    buttons.forEach(btn => {
        if (btn.dataset.id === buttonId) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

// 验证选项是否全部完成
function validateOptions(pageId) {
    const page = gamePages[pageId];
    if (!page.options) return true;
    
    for (const optionGroup of page.options) {
        if (!selectedAnswers[pageId] || !selectedAnswers[pageId][optionGroup.group]) {
            return false;
        }
    }
    return true;
}

// 计算得分
function calculateScore() {
    let correctCount = 0;
    
    // 只计算测试页面的得分（2113-2120）
    for (let pageId = 2113; pageId <= 2120; pageId++) {
        const page = gamePages[pageId];
        if (!page || !page.options || !selectedAnswers[pageId]) continue;
        
        for (const optionGroup of page.options) {
            const selectedId = selectedAnswers[pageId][optionGroup.group];
            const selectedOption = optionGroup.buttons.find(b => b.id === selectedId);
            
            if (selectedOption && selectedOption.correct) {
                correctCount++;
            }
        }
    }
    
    score = correctCount * 4.55;
}

// 显示提示框
function showToast(message) {
    const toast = document.getElementById('toast-container');
    const messageElement = document.getElementById('toast-message');
    
    messageElement.textContent = message;
    toast.classList.remove('toast-hidden');
    
    // 3秒后隐藏提示框
    setTimeout(() => {
        toast.classList.add('toast-hidden');
    }, 3000);
}

// 显示正确答案
function showAnswers() {
    const modal = document.getElementById('answers-modal');
    const answersText = document.getElementById('correct-answers-text');
    
    answersText.textContent = `
        My name's Nick. My girlfriend's name is Karen. 
        We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 
        she goes to university in Cambridge. 
        She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
        It's difficult sometimes because we see each other only on weekends. 
        Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
        I study philosophy and politics, so my courses are very different from hers. 
        I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
        We talk on the phone every night and we visit each other whenever we can.
    `;
    
    modal.classList.remove('modal-hidden');
    
    // 添加确认按钮事件
    document.getElementById('confirm-answers').onclick = () => {
        modal.classList.add('modal-hidden');
    };
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    const scoreData = {
        score: Math.round(score),
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        roomId: roomId
    };
    
    database.ref('scores/' + roomId).set(scoreData)
        .catch(error => {
            console.error('Error saving score to Firebase:', error);
        });
}

// 处理按钮点击事件
function handleButtonClicks(event) {
    // 这里可以添加全局按钮点击处理逻辑
}

// 页面加载完成后初始化游戏
window.onload = initGame;
