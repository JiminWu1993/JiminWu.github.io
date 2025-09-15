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
    currentPage: 2100, // 从开始画面开始
    score: 0,
    selectedOptions: {}, // 存储用户选择的选项
    isFirstAttempt: true, // 标记是否是第一次尝试测试部分
    testScore: 0 // 测试部分的得分
};

// 页面数据定义 - 完整版
const pageData = {
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
        text: "Alexa: Hi. My name ① Alexandra Costa, but please ② me Alexa.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "Arturo: OK. Where ① you from, Alexa?",
        options: [
            {
                number: 1,
                buttons: [
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
        text: "Arturo: I'm from Mexico. I ① here in the city now, but my family ② in a small town near Guadalajara.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "Alexa: Oh, I ① Mexico! It ② really beautiful. My brother ③ Mexico, too. Oh, good. Soo-jin ④ here.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
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
        text: "Arturo: Who ① Soo-jin? She ② familiar.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "Alexa: She ① my classmate. We ② in the same business class. We ③ our class every Monday and Wednesday.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
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
        text: "Arturo: Where ① she from?",
        options: [
            {
                number: 1,
                buttons: [
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
        text: "Alexa: South Korea. She ① marketing. She ② the classes ③ very interesting. Let's go and say hello. Sorry, what ④ your last name again? Vargas?",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
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
        text: "Arturo: Actually, it ① Valdez",
        options: [
            {
                number: 1,
                buttons: [
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
        text: "Alexa: How ① you spell that?",
        options: [
            {
                number: 1,
                buttons: [
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
        text: "My name's Nick. My girlfriend's name ① Karen. We ② students. I ③ to university in Oxford.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
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
        text: "Karen ① go to university in Oxford; she ② to university in Cambridge. She ③ in Cambridge.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                   极速模式
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 极速模式 }
        ]
    },
    2115: {
        type: "test",
        image: "画面15.jpg",
        text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "It ① difficult sometimes because we ② each other only on weekends.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "is", correct: true },
                    { text极速模式 }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "Karen ① history, and she ② her course. She ③ the architecture in Cambridge ④ beautiful.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct:极速模式 }
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
        text: "I ① philosophy and politics, so my courses ② very different from hers.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
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
        text: "I ① living in Woodstock because my family ② there and it ③ quiet, but I ④ Karen a lot.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
极速模式 },
            {
                number: 2,
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 3,
                buttons: [
                    { text: "极速模式", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: 4,
                buttons: [
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
        text: "We ① on the phone every night and we ② each other whenever we can.",
        options: [
            {
                number: 1,
                buttons: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                number: 2,
                buttons: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2121 }
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
    loadPage(gameState.currentPage);
    
    // 预加载所有图片
    preloadImages();
}

// 预加载图片函数
function preloadImages() {
    const images = [];
    for (let i = 2100; i <= 2121; i++) {
        if (pageData[i] && pageData[i].image) {
            const img = new Image();
            img.src = `images/${pageData[i].image}`;
            images.push(img);
        }
    }
}

// 加载页面函数
function loadPage(pageId) {
    gameState.currentPage = pageId;
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    const page = pageData[pageId];
    if (!page) {
        console.error(`Page ${pageId} not found`);
        return;
    }
    
    // 创建页面标题和进度条
    if (pageId !== 2100 && pageId !== 2121) {
        createHeader(pageId, page.type);
    }
    
    // 创建内容区域
    const contentDiv = document.createElement('div');
    contentDiv.className = 'game-content';
    container.appendChild(contentDiv);
    
    // 添加图片
    if (page.image) {
        const img = document.createElement('img');
        img.className = 'game-image';
        img.src = `images/${page.image}`;
        img.alt = 'Game scene';
        contentDiv.appendChild(img);
        
        // 图片加载错误处理
        img.onerror = function() {
            console.error(`Failed to load image: images/${page.image}`);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
        };
    }
    
    // 添加文本内容
    if (page.text) {
        const textDiv = document.createElement('div');
        textDiv.className = 'text-display';
        textDiv.textContent = page.text;
        contentDiv.appendChild(textDiv);
    }
    
    // 添加选项按钮
    if (page.options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.class极速模式 = 'options-container';
        
        page.options.forEach((optionGroup, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'option-group';
            
            // 添加组编号
            const numberSpan = document.createElement('span');
            numberSpan.className = 'option-group-number';
            numberSpan.textContent = String.fromCharCode(9312 + groupIndex); // ①, ②, ③, ④
            groupDiv.appendChild(numberSpan);
            
            // 添加选项按钮
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'option-buttons';
            
            optionGroup.buttons.forEach((btn, btnIndex) => {
                const button = document.createElement('button');
                button.className = 'btn';
                button.textContent = btn.text;
                button.dataset.correct = btn.correct;
                button.dataset.group = groupIndex;
                button.dataset.index = btnIndex;
                
                // 检查是否已选择此选项
                if (gameState.selectedOptions[pageId] && 
                    gameState.selectedOptions[pageId][groupIndex] === btnIndex) {
                    button.classList.add('selected');
                }
                
                button.addEventListener('click', () => {
                    selectOption(pageId, groupIndex, btnIndex);
                });
                
                buttonsDiv.appendChild(button);
            });
            
            groupDiv.appendChild(buttonsDiv);
            optionsContainer.appendChild(groupDiv);
        });
        
        contentDiv.appendChild(optionsContainer);
    }
    
    // 添加继续按钮
    if (page.buttons) {
        page.buttons.forEach(btnData => {
            const button = document.createElement('button');
            button.className = 'btn continue-btn';
            button.textContent = btnData.text;
            
            if (btnData.target) {
                button.addEventListener('click', () => {
                    // 检查是否所有选项都已选择
                    if (page.options && !areAllOptionsSelected(pageId, page.options.length)) {
                        showAlert('Please complete all multiple-choice questions before continuing');
                        return;
                    }
                    
                    // 如果是测试页面，计算得分
                    if (pageId >= 2113 && pageId <= 2120) {
                        calculateScore(pageId);
                    }
                    
                    loadPage(btnData.target);
                });
            } else if (btnData.action) {
                button.addEventListener('click', () => {
                    handleScorePageAction(btnData.action);
                });
                
                // 根据得分情况禁用按钮
                if (btnData.action === 'nextChapter' || btnData.action === 'showAnswers') {
                    if (gameState.isFirstAttempt && gameState.score < 60) {
                        button.disabled = true;
                    }
                }
            }
            
            contentDiv.appendChild(button);
        });
    }
    
    // 如果是得分页面，特殊处理
    if (pageId === 2121) {
        renderScorePage();
    }
}

// 创建页面标题和进度条
function createHeader(pageId, pageType) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'page-header';
    
    // 页面标题
    const titleDiv = document.createElement('div');
    titleDiv.className = 'page-title';
    titleDiv.textContent = pageType === 'practice' ? 'Practice' : 'Test';
    headerDiv.appendChild(titleDiv);
    
    // 进度条
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    // 计算进度
    let progress = 0;
    if (pageType === 'practice') {
        const practicePageIndex = pageId - 2100; // 2101是第一个练习页面
        progress = practicePageIndex / 13 * 100;
    } else {
        const testPageIndex = pageId - 2112; // 2113是第一个测试页面
        progress = testPageIndex / 7 * 100;
    }
    
    progressBar.style.width = `${progress}%`;
    progressContainer.appendChild(progressBar);
    headerDiv.appendChild(progressContainer);
    
    document.getElementById('game-container').appendChild(headerDiv);
}

// 选择选项处理
function selectOption(pageId, groupIndex, optionIndex) {
    // 初始化页面选项存储
    if (!gameState.selectedOptions[page极速模式]) {
        gameState.selectedOptions[pageId] = {};
    }
    
    // 取消同组中其他选项的选择状态
    const optionButtons = document.querySelectorAll(`.option-buttons button[data-group="${groupIndex}"]`);
    optionButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前选项为选中状态
    const selectedButton = document.querySelector(`.option-buttons button[data-group="${groupIndex}"][data-index="${optionIndex}"]`);
    selectedButton.classList.add('selected');
    
    // 存储选择
    gameState.selectedOptions[pageId][groupIndex] = optionIndex;
}

// 检查是否所有选项都已选择
function areAllOptionsSelected(pageId, optionGroupCount) {
    if (!gameState.selectedOptions[pageId] || 
        Object.keys(gameState.selectedOptions[pageId]).length < optionGroupCount) {
        return false;
    }
    return true;
}

// 计算得分
function calculateScore(pageId) {
    const page = pageData[pageId];
    if (!page || !page.options) return;
    
    page.options.forEach((optionGroup, groupIndex) => {
        const selectedIndex = gameState.selectedOptions[pageId][groupIndex];
        if (selectedIndex !== undefined) {
            const isCorrect = optionGroup.buttons[selectedIndex].correct;
            if (isCorrect) {
                gameState.testScore++;
            }
        }
    });
    
    // 如果是最后一个测试页面，计算最终得分并保存
    if (pageId === 2120) {
        gameState.score = Math.round(gameState.testScore * 4.55);
        saveScoreToFirebase();
    }
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    // 生成房间号（当前时间）
    const now = new Date();
    const roomId = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    // 保存到数据库
    database.ref('scores/' + roomId).set({
        score: gameState.score,
        timestamp: now.toISOString()
    }).catch(error => {
        console.error('Error saving score to Firebase:', error);
    });
}

// 显示提示框
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    document.getElementById('game-container').appendChild(alertBox);
    
    // 3秒后移除提示框
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// 渲染得分页面
function renderScorePage() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    const scorePageDiv = document.createElement('div');
    scorePageDiv.className = 'score-page';
    
    // 根据得分显示不同图片
    const scoreImage = document.createElement('img');
    scoreImage.className = 'score-image';
    scoreImage.src = `images/${gameState.score >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    scoreImage.alt = 'Score result';
    scorePageDiv.appendChild(scoreImage);
    
    // 显示得分
    const scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    scoreText.textContent = `Your score is: ${gameState.score}`;
    scorePageDiv.appendChild(scoreText);
    
    // 添加按钮
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'score-buttons';
    
    const page = pageData[2121];
    page.buttons.forEach(btnData => {
        const button = document.createElement('极速模式');
        button.className = 'btn';
        button.textContent = btnData.text;
        
        button.addEventListener('click', () => {
            handleScorePageAction(btnData.action);
        });
        
        // 根据得分情况禁用按钮
        if ((btnData.action === 'nextChapter' || btnData.action === 'showAnswers') && 
            gameState.isFirstAttempt && gameState.score < 60) {
            button.disabled = true;
        }
        
        buttonsDiv.appendChild(button);
    });
    
    scorePageDiv.appendChild(buttonsDiv);
    container.appendChild(scorePageDiv);
}

// 处理得分页面按钮动作
function handleScorePageAction(action) {
    switch (action) {
        case 'nextChapter':
            // 暂无交互结果
            showAlert('Next chapter is coming soon!');
            break;
        case 'showAnswers':
            showAnswers();
            break;
        case 'tryAgain':
            // 重置测试部分的状态
            gameState.testScore = 0;
            gameState.selectedOptions = {};
            gameState.isFirstAttempt = false;
            loadPage(2113); // 跳转到第一个测试页面
            break;
    }
}

// 显示答案
function showAnswers() {
    const modal = document.createElement('div');
    modal.className = 'answers-modal';
    
    const content = document.createElement('div');
    content.className = 'answers-content';
    content.innerHTML = `
        <p>My name's Nick. My girlfriend's name is Karen.</p>
        <p>We're students. I go to university in Oxford.</p>
        <p>Karen doesn't go to university in Oxford; she goes to university in Cambridge.</p>
        <p>She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford.</p>
        <p>It's difficult sometimes because we see each other only on weekends.</p>
        <p>Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.</p>
        <p>I study philosophy and politics, so my courses are very different from hers.</p>
        <p>I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot.</p>
        <p>We talk on the phone every night and we visit each other whenever we can.</p>
    `;
    modal.appendChild(content);
    
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn confirm-btn';
    confirmBtn.textContent = 'Confirm';
    confirmBtn.addEventListener('click', () => {
        modal.remove();
    });
    modal.appendChild(confirmBtn);
    
    document.getElementById('game-container').appendChild(modal);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
