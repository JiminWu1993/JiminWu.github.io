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

// 游戏数据
const gameData = {
    currentScreen: 2100,
    score: 0,
    testScore: 0,
    selectedOptions: {},
    isFirstAttempt: true,
    // 所有屏幕数据
    screens: {
        2100: { // 开始画面
            image: "开始画面.jpg",
            text: "Welcome to the journey of English tenses",
            buttons: [
                { content: "Begin", target: 2101 }
            ]
        },
        2101: { // 画面01
            image: "画面01.jpg",
            text: "Arturo: Hello, I'm Arturo Valdez.",
            buttons: [
                { content: "Continue", target: 2102 }
            ],
            isPractice: true,
            practiceIndex: 1
        },
        2102: { // 画面02
            image: "画面02.jpg",
            text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
            options: [
                {
                    id: "group1",
                    choices: [
                        { id: "1-1", content: "is", correct: true },
                        { id: "1-2", content: "am", correct: false },
                        { id: "1-3", content: "are", correct: false }
                    ]
                },
                {
                    id: "group2",
                    choices: [
                        { id: "2-1", content: "calls", correct: false },
                        { id: "2-2", content: "call", correct: true },
                        { id: "2-3", content: "calling", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2103 }
            ],
            isPractice: true,
            practiceIndex: 2
        },
        2103: { // 画面03
            image: "画面03.jpg",
            text: "Arturo: OK. Where ① you from, Alexa?",
            options: [
                {
                    id: "group3",
                    choices: [
                        { id: "1-1", content: "is", correct: false },
                        { id: "1-2", content: "are", correct: true },
                        { id: "1-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2104 }
            ],
            isPractice: true,
            practiceIndex: 3
        },
        2104: { // 画面04
            image: "画面04.jpg",
            text: "Alexa: Brazil. How about you?",
            buttons: [
                { content: "Continue", target: 2105 }
            ],
            isPractice: true,
            practiceIndex: 4
        },
        2105: { // 画面05
            image: "画面05.jpg",
            text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
            options: [
                {
                    id: "group4",
                    choices: [
                        { id: "1-1", content: "lives", correct: true },
                        { id: "1-2", content: "live", correct: false },
                        { id: "1-3", content: "living", correct: false }
                    ]
                },
                {
                    id: "group5",
                    choices: [
                        { id: "2-1", content: "lives", correct: true },
                        { id: "2-2", content: "live", correct: false },
                        { id: "2-3", content: "are living", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2106 }
            ],
            isPractice: true,
            practiceIndex: 5
        },
        2106: { // 画面06
            image: "画面06.jpg",
            text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
            options: [
                {
                    id: "group6",
                    choices: [
                        { id: "1-1", content: "loves", correct: false },
                        { id: "1-2", content: "love", correct: true },
                        { id: "1-3", content: "living", correct: false }
                    ]
                },
                {
                    id: "group7",
                    choices: [
                        { id: "2-1", content: "is", correct: true },
                        { id: "2-2", content: "am", correct: false },
                        { id: "2-3", content: "are", correct: false }
                    ]
                },
                {
                    id: "group8",
                    choices: [
                        { id: "3-1", content: "loves", correct: true },
                        { id: "3-2", content: "love", correct: false },
                        { id: "3-3", content: "living", correct: false }
                    ]
                },
                {
                    id: "group9",
                    choices: [
                        { id: "4-1", content: "is", correct: true },
                        { id: "4-2", content: "are", correct: false },
                        { id: "4-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2107 }
            ],
            isPractice: true,
            practiceIndex: 6
        },
        2107: { // 画面07
            image: "画面07.jpg",
            text: "Arturo: Who ① Soo-jin? She ② familiar.",
            options: [
                {
                    id: "group10",
                    choices: [
                        { id: "1-1", content: "is", correct: true },
                        { id: "1-2", content: "are", correct: false },
                        { id: "1-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group11",
                    choices: [
                        { id: "2-1", content: "looks", correct: true },
                        { id: "2-2", content: "look", correct: false },
                        { id: "2-3", content: "looking", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2108 }
            ],
            isPractice: true,
            practiceIndex: 7
        },
        2108: { // 画面08
            image: "画面08.jpg",
            text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
            options: [
                {
                    id: "group12",
                    choices: [
                        { id: "1-1", content: "is", correct: false },
                        { id: "1-2", content: "are", correct: true },
                        { id: "1-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group13",
                    choices: [
                        { id: "2-1", content: "is", correct: false },
                        { id: "2-2", content: "are", correct: true },
                        { id: "2-3", content: "am", answer: false }
                    ]
                },
                {
                    id: "group14",
                    choices: [
                        { id: "3-1", content: "has", correct: false },
                        { id: "3-2", content: "have", correct: true },
                        { id: "3-3", content: "having", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2109 }
            ],
            isPractice: true,
            practiceIndex: 8
        },
        2109: { // 画面09
            image: "画面09.jpg",
            text: "Arturo: Where ① she from?",
            options: [
                {
                    id: "group15",
                    choices: [
                        { id: "1-1", content: "is", correct: false },
                        { id: "1-2", content: "are", correct: true },
                        { id: "1-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2110 }
            ],
            isPractice: true,
            practiceIndex: 9
        },
        2110: { // 画面10
            image: "画面10.jpg",
            text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
            options: [
                {
                    id: "group16",
                    choices: [
                        { id: "1-1", content: "studies", correct: true },
                        { id: "1-2", content: "study", correct: false },
                        { id: "1-3", content: "studying", correct: false }
                    ]
                },
                {
                    id: "group17",
                    choices: [
                        { id: "2-1", content: "says", correct: true },
                        { id: "2-2", content: "say", correct: false },
                        { id: "2-3", content: "saying", correct: false }
                    ]
                },
                {
                    id: "group18",
                    choices: [
                        { id: "3-1", content: "is", correct: false },
                        { id: "3-2", content: "are", correct: true },
                        { id: "3-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group19",
                    choices: [
                        { id: "4-1", content: "is", correct: true },
                        { id: "4-2", content: "are", correct: false },
                        { id: "4-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2111 }
            ],
            isPractice: true,
            practiceIndex: 10
        },
        2111: { // 画面11
            image: "画面11.jpg",
            text: "Arturo: Actually, it ① Valdez",
            options: [
                {
                    id: "group20",
                    choices: [
                        { id: "1-1", content: "is", correct: true },
                        { id: "1-2", content: "are", correct: false },
                        { id: "1-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2112 }
            ],
            isPractice: true,
            practiceIndex: 11
        },
        2112: { // 画面12
            image: "画面12.jpg",
            text: "Alexa: How ① you spell that?",
            options: [
                {
                    id: "group21",
                    choices: [
                        { id: "1-1", content: "is", correct: false },
                        { id: "1-2", content: "are", correct: true },
                        { id: "1-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2113 }
            ],
            isPractice: true,
            practiceIndex: 12
        },
        2113: { // 画面13 - 测试开始
            image: "画面13.jpg",
            text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
            options: [
                {
                    id: "group22",
                    choices: [
                        { id: "1-1", content: "is", correct: true },
                        { id: "1-2", content: "are", correct: false },
                        { id: "1-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group23",
                    choices: [
                        { id: "2-1", content: "is", correct: false },
                        { id: "2-2", content: "are", correct: true },
                        { id: "2-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group24",
                    choices: [
                        { id: "3-1", content: "go", correct: true },
                        { id: "3-2", content: "goes", correct: false },
                        { id: "3-3", content: "going", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2114 }
            ],
            isPractice: false,
            testIndex: 1,
            isScoring: true
        },
        2114: { // 画面14
            image: "画面14.jpg",
            text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
            options: [
                {
                    id: "group25",
                    choices: [
                        { id: "1-1", content: "don't", correct: false },
                        { id: "1-2", content: "isn't", correct: false },
                        { id: "1-3", content: "doesn't", correct: true }
                    ]
                },
                {
                    id: "group26",
                    choices: [
                        { id: "2-1", content: "go", correct: false },
                        { id: "2-2", content: "goes", correct: true },
                        { id: "2-3", content: "going", correct: false }
                    ]
                },
                {
                    id: "group27",
                    choices: [
                        { id: "3-1", content: "lives", correct: true },
                        { id: "3-2", content: "live", correct: false },
                        { id: "3-3", content: "living", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2115 }
            ],
            isPractice: false,
            testIndex: 2,
            isScoring: true
        },
        2115: { // 画面15
            image: "画面15.jpg",
            text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
            options: [
                {
                    id: "group28",
                    choices: [
                        { id: "1-1", content: "lives", correct: false },
                        { id: "1-2", content: "live", correct: true },
                        { id: "1-3", content: "living", correct: false }
                    ]
                },
                {
                    id: "group29",
                    choices: [
                        { id: "2-1", content: "is", correct: true },
                        { id: "2-2", content: "are", correct: false },
                        { id: "2-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2116 }
            ],
            isPractice: false,
            testIndex: 3,
            isScoring: true
        },
        2116: { // 画面16
            image: "画面16.jpg",
            text: "It ① difficult sometimes because we ② each other only on weekends.",
            options: [
                {
                    id: "group30",
                    choices: [
                        { id: "1-1", content: "is", correct: true },
                        { id: "1-2", content: "are", correct: false },
                        { id: "1-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group31",
                    choices: [
                        { id: "2-1", content: "see", correct: true },
                        { id: "2-2", content: "sees", correct: false },
                        { id: "2-3", content: "seeing", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2117 }
            ],
            isPractice: false,
            testIndex: 4,
            isScoring: true
        },
        2117: { // 画面17
            image: "画面17.jpg",
            text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
            options: [
                {
                    id: "group32",
                    choices: [
                        { id: "1-1", content: "studies", correct: true },
                        { id: "1-2", content: "study", correct: false },
                        { id: "1-3", content: "studying", correct: false }
                    ]
                },
                {
                    id: "group33",
                    choices: [
                        { id: "2-1", content: "love", correct: false },
                        { id: "2-2", content: "loves", correct: true },
                        { id: "2-3", content: "loving", correct: false }
                    ]
                },
                {
                    id: "group34",
                    choices: [
                        { id: "3-1", content: "says", correct: true },
                        { id: "3-2", content: "say", correct: false },
                        { id: "3-3", content: "saying", correct: false }
                    ]
                },
                {
                    id: "group35",
                    choices: [
                        { id: "4-1", content: "is", correct: true },
                        { id: "4-2", content: "are", correct: false },
                        { id: "4-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2118 }
            ],
            isPractice: false,
            testIndex: 5,
            isScoring: true
        },
        2118: { // 画面18
            image: "画面18.jpg",
            text: "I ① philosophy and politics, so my courses ② very different from hers.",
            options: [
                {
                    id: "group36",
                    choices: [
                        { id: "1-1", content: "studies", correct: false },
                        { id: "1-2", content: "study", correct: true },
                        { id: "1-3", content: "studying", correct: false }
                    ]
                },
                {
                    id: "group37",
                    choices: [
                        { id: "2-1", content: "is", correct: false },
                        { id: "2-2", content: "are", correct: true },
                        { id: "2-3", content: "am", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2119 }
            ],
            isPractice: false,
            testIndex: 6,
            isScoring: true
        },
        2119: { // 画面19
            image: "画面19.jpg",
            text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
            options: [
                {
                    id: "group38",
                    choices: [
                        { id: "1-1", content: "like", correct: true },
                        { id: "1-2", content: "likes", correct: false },
                        { id: "1-3", content: "liking", correct: false }
                    ]
                },
                {
                    id: "group39",
                    choices: [
                        { id: "2-1", content: "is", correct: true },
                        { id: "2-2", content: "are", correct: false },
                        { id: "2-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group40",
                    choices: [
                        { id: "3-1", content: "is", correct: true },
                        { id: "3-2", content: "are", correct: false },
                        { id: "3-3", content: "am", correct: false }
                    ]
                },
                {
                    id: "group41",
                    choices: [
                        { id: "4-1", content: "miss", correct: true },
                        { id: "4-2", content: "misses", correct: false },
                        { id: "4-3", content: "missing", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2120 }
            ],
            isPractice: false,
            testIndex: 7,
            isScoring: true
        },
        2120: { // 画面20
            image: "画面20.jpg",
            text: "We ① on the phone every night and we ② each other whenever we can.",
            options: [
                {
                    id: "group42",
                    choices: [
                        { id: "1-1", content: "talk", correct: true },
                        { id: "1-2", content: "talks", correct: false },
                        { id: "1-3", content: "talking", correct: false }
                    ]
                },
                {
                    id: "group43",
                    choices: [
                        { id: "2-1", content: "visit", correct: true },
                        { id: "2-2", content: "visits", correct: false },
                        { id: "2-3", content: "visiting", correct: false }
                    ]
                }
            ],
            buttons: [
                { content: "Continue", target: 2121 }
            ],
            isPractice: false,
            testIndex: 8,
            isScoring: true
        },
        2121: { // 得分画面
            buttons: [
                { id: "next-chapter", content: "Next Chapter", target: null },
                { id: "show-answers", content: "Show the answers", target: null },
                { id: "try-again", content: "Try Again", target: 2113 }
            ]
        }
    }
};

// 初始化游戏
function initGame() {
    // 创建所有游戏屏幕
    createAllScreens();
    
    // 设置事件监听器
    document.getElementById('begin-button').addEventListener('click', () => {
        navigateTo(2101);
    });
    
    // 设置答案模态框的确认按钮事件
    document.getElementById('confirm-answers').addEventListener('click', () => {
        document.getElementById('answers-modal').style.display = 'none';
    });
    
    // 初始化Firebase
    initFirebase();
}

// 创建所有游戏屏幕
function createAllScreens() {
    const gameContainer = document.getElementById('game-container');
    
    // 遍历所有屏幕数据并创建屏幕
    for (const [screenId, screenData] of Object.entries(gameData.screens)) {
        if (screenId === "2100") continue; // 开始画面已存在
        
        const screen = document.createElement('div');
        screen.id = `screen-${screenId}`;
        screen.className = 'screen';
        
        // 添加屏幕内容
        let screenHTML = '';
        
        // 添加头部（进度条和标题）
        if (screenId > 2100) {
            screenHTML += `
                <div class="header">
                    <div class="screen-type">${screenData.isPractice ? 'Practice' : 'Test'}</div>
                    <div class="progress-container">
                        <div class="progress-bar" id="progress-${screenId}"></div>
                    </div>
                </div>
            `;
        }
        
        // 添加图片
        if (screenData.image) {
            screenHTML += `
                <div class="image-container">
                    <img src="images/${screenData.image}" alt="Screen ${screenId}" onerror="handleImageError(this, '${screenData.image}')">
                </div>
            `;
        }
        
        // 添加文本
        if (screenData.text) {
            screenHTML += `
                <div class="text-container">
                    <p>${screenData.text}</p>
                </div>
            `;
        }
        
        // 添加选项按钮
        if (screenData.options) {
            screenHTML += '<div class="buttons-container">';
            
            screenData.options.forEach((optionGroup, groupIndex) => {
                screenHTML += `
                    <div class="button-row" data-group="${optionGroup.id}">
                        ${optionGroup.choices.map(choice => `
                            <button class="option-button" data-id="${choice.id}" data-correct="${choice.correct}" data-group="${optionGroup.id}">
                                ${choice.content}
                            </button>
                        `).join('')}
                    </div>
                `;
            });
            
            screenHTML += '</div>';
        }
        
        // 添加继续按钮
        if (screenData.buttons) {
            screenData.buttons.forEach(button => {
                const disabledAttr = (button.id === 'next-chapter' && gameData.isFirstAttempt && gameData.score < 60) ? 'disabled' : '';
                screenHTML += `
                    <button class="action-button" data-target="${button.target}" 
                            ${button.id ? `id="${button.id}"` : ''} ${disabledAttr}>
                        ${button.content}
                    </button>
                `;
            });
        }
        
        // 设置屏幕HTML
        screen.innerHTML = screenHTML;
        gameContainer.appendChild(screen);
    }
    
    // 设置所有继续按钮的事件监听器
    document.querySelectorAll('.action-button').forEach(button => {
        if (button.id !== 'begin-button') {
            button.addEventListener('click', function() {
                const targetScreen = this.getAttribute('data-target');
                if (targetScreen) {
                    // 检查是否所有选项都已选择
                    if (isCurrentScreenHasOptions() && !areAllOptionsSelected()) {
                        showAlert("Please complete all multiple-choice questions before continuing");
                        return;
                    }
                    
                    // 如果是练习页面且不是开始画面
                    if (gameData.currentScreen >= 2101 && gameData.currentScreen <= 2112) {
                        // 检查答案并显示提示
                        checkAnswersAndShowHint(targetScreen);
                    } else {
                        // 测试页面直接跳转
                        navigateTo(parseInt(targetScreen));
                    }
                }
            });
        }
    });
    
    // 设置选项按钮的事件监听器
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const row = this.closest('.button-row');
            
            // 取消同组中其他按钮的选中状态
            row.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // 设置当前按钮为选中状态
            this.classList.add('selected');
            
            // 记录选择
            gameData.selectedOptions[groupId] = {
                id: this.getAttribute('data-id'),
                correct: this.getAttribute('data-correct') === 'true'
            };
        });
    });
    
    // 设置特殊按钮的事件
    document.getElementById('show-answers')?.addEventListener('click', showAnswers);
    document.getElementById('try-again')?.addEventListener('click', tryAgain);
    document.getElementById('next-chapter')?.addEventListener('click', nextChapter);
}

// 导航到指定屏幕
function navigateTo(screenId) {
    // 隐藏当前屏幕
    const currentScreen = document.getElementById(`screen-${gameData.currentScreen}`);
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    
    // 显示目标屏幕
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // 如果是得分屏幕，更新显示
        if (screenId == 2121) {
            updateScoreScreen();
        }
    }
    
    // 更新当前屏幕
    gameData.currentScreen = screenId;
    
    // 更新进度条
    updateProgressBar(screenId);
}

// 更新进度条
function updateProgressBar(screenId) {
    // 计算进度
    let progress = 0;
    const screenData = gameData.screens[screenId];
    
    if (screenData.isPractice) {
        // 练习屏幕进度计算
        const practiceScreens = Object.keys(gameData.screens)
            .filter(id => id >= 2101 && id <= 2112 && gameData.screens[id].isPractice)
            .sort((a, b) => a - b);
        
        const currentIndex = practiceScreens.indexOf(screenId.toString());
        progress = (currentIndex + 1) / practiceScreens.length;
    } else if (screenId >= 2113 && screenId <= 2120) {
        // 测试屏幕进度计算
        const testScreens = Object.keys(gameData.screens)
            .filter(id => id >= 2113 && id <= 2120)
            .sort((a, b) => a - b);
        
        const currentIndex = testScreens.indexOf(screenId.toString());
        progress = (currentIndex + 1) / testScreens.length;
    }
    
    // 更新进度条显示
    const progressBar = document.getElementById(`progress-${screenId}`);
    if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
    }
}

// 检查当前屏幕是否有选项
function isCurrentScreenHasOptions() {
    return gameData.screens[gameData.currentScreen]?.options !== undefined;
}

// 检查是否所有选项都已选择
function areAllOptionsSelected() {
    const screenData = gameData.screens[gameData.currentScreen];
    if (!screenData.options) return true;
    
    for (const optionGroup of screenData.options) {
        if (!gameData.selectedOptions[optionGroup.id]) {
            return false;
        }
    }
    
    return true;
}

// 计算得分
function calculateScore() {
    const screenData = gameData.screens[gameData.currentScreen];
    if (!screenData.options) return;
    
    for (const optionGroup of screenData.options) {
        const selectedOption = gameData.selectedOptions[optionGroup.id];
        if (selectedOption && selectedOption.correct) {
            gameData.testScore++;
        }
    }
}

// 显示提示框
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    
    // 3秒后隐藏提示框
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// 显示答案
function showAnswers() {
    const answersContent = document.getElementById('answers-content');
    answersContent.textContent = `The answer of test：
My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    
    document.getElementById('answers-modal').style.display = 'block';
}

// 更新得分屏幕
function updateScoreScreen() {
    // 计算最终得分
    gameData.score = Math.round(gameData.testScore * 4.55);
    
    // 保存分数到Firebase
    saveScoreToFirebase(gameData.score);
    
    // 更新屏幕显示
    const scoreScreen = document.getElementById('screen-2121');
    
    // 清空屏幕
    scoreScreen.innerHTML = '';
    
    // 1. 创建图片容器（不再是背景）
    const imageContainer = document.createElement('div');
    imageContainer.className = 'result-image-container';
    
    // 创建图片元素
    const resultImage = document.createElement('img');
    resultImage.src = `images/${gameData.score >= 60 ? "及格.jpg" : "不及格.jpg"}`;
    resultImage.alt = 'Result';
    resultImage.className = 'result-image';
    
    // 将图片添加到容器
    imageContainer.appendChild(resultImage);
    
    // 2. 创建得分显示
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.textContent = `Your score is : ${gameData.score}`;
    
    // 3. 创建按钮容器
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'result-buttons';
    
    // 添加按钮
    const nextChapterBtn = document.createElement('button');
    nextChapterBtn.id = 'next-chapter';
    nextChapterBtn.className = 'action-button';
    nextChapterBtn.textContent = 'Next Chapter';
    if (gameData.isFirstAttempt && gameData.score < 60) {
        nextChapterBtn.disabled = true;
    }
    nextChapterBtn.addEventListener('click', nextChapter);
    
    const showAnswersBtn = document.createElement('button');
    showAnswersBtn.id = 'show-answers';
    showAnswersBtn.className = 'action-button';
    showAnswersBtn.textContent = 'Show the answers';
    showAnswersBtn.addEventListener('click', showAnswers);
    
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.id = 'try-again';
    tryAgainBtn.className = 'action-button';
    tryAgainBtn.textContent = 'Try Again';
    tryAgainBtn.addEventListener('click', tryAgain);
    
    buttonsContainer.appendChild(nextChapterBtn);
    buttonsContainer.appendChild(showAnswersBtn);
    buttonsContainer.appendChild(tryAgainBtn);
    
    // 将元素按顺序添加到屏幕
    scoreScreen.appendChild(imageContainer);    // 图片在最上面
    scoreScreen.appendChild(scoreDisplay);      // 得分在中间
    scoreScreen.appendChild(buttonsContainer);   // 按钮在最下面
}

// 保存分数到Firebase
function saveScoreToFirebase(score) {
    try {
        // 生成基于时间的房间号
        const now = new Date();
        const roomId = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
        
        // 保存到Firebase
        database.ref('scores/' + roomId).set({
            score: score,
            timestamp: now.toString()
        });
    } catch (error) {
        console.error("Error saving score to Firebase:", error);
    }
}

// 下一章
function nextChapter() {
    alert("Next Chapter button clicked. This functionality would take you to the next chapter.");
}

// 再试一次
function tryAgain() {
    // 重置测试分数
    gameData.testScore = 0;
    gameData.isFirstAttempt = false;

    // 重置所有测试屏幕的按钮状态
    for (let i = 2113; i <= 2120; i++) {
        const screen = document.getElementById(`screen-${i}`);
        if (screen) {
            const buttons = screen.querySelectorAll('.option-button');
            buttons.forEach(button => {
                button.classList.remove('selected');
            });
        }
    }
    
    // 导航到测试开始画面
    navigateTo(2113);
}

// 初始化Firebase
function initFirebase() {
    try {
        // Firebase已经初始化，这里可以添加其他Firebase相关设置
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

// 处理图片加载错误
function handleImageError(img, imageName) {
    console.error(`Error loading image: ${imageName}`);
    img.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";
    img.alt = `Failed to load: ${imageName}`;
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', initGame);
