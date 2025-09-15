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
    selectedOptions: {},
    testScore: 0,
    isFirstAttempt: true,
    roomId: null
};

// 页面定义
const pages = {
    2100: {
        type: "start",
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            {
                text: "Begin",
                action: () => navigateTo(2101)
            }
        ]
    },
    2101: {
        type: "practice",
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2102)
            }
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
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "2",
                buttons: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2103),
                validate: () => validateOptions(2102)
            }
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
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2104),
                validate: () => validateOptions(2103)
            }
        ]
    },
    2104: {
        type: "practice",
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2105)
            }
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
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "5",
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2106),
                validate: () => validateOptions(2105)
            }
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
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "7",
                buttons: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "8",
                buttons: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "9",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2107),
                validate: () => validateOptions(2106)
            }
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
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "11",
                buttons: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2108),
                validate: () => validateOptions(2107)
            }
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
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "13",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "14",
                buttons: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2109),
                validate: () => validateOptions(2108)
            }
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
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2110),
                validate: () => validateOptions(2109)
            }
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
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "17",
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "18",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "19",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2111),
                validate: () => validateOptions(2110)
            }
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
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2112),
                validate: () => validateOptions(2111)
            }
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
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => navigateTo(2113),
                validate: () => validateOptions(2112)
            }
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
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "23",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "24",
                buttons: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2113);
                    navigateTo(2114);
                },
                validate: () => validateOptions(2113)
            }
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
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                id: "26",
                buttons: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                id: "27",
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2114);
                    navigateTo(2115);
                },
                validate: () => validateOptions(2114)
            }
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
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "29",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2115);
                    navigateTo(2116);
                },
                validate: () => validateOptions(2115)
            }
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
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "31",
                buttons: [
                    { text: "see", correct: true },
                    { text: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2116);
                    navigateTo(2117);
                },
                validate: () => validateOptions(2116)
            }
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
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "33",
                buttons: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "34",
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "35",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2117);
                    navigateTo(2118);
                },
                validate: () => validateOptions(2117)
            }
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
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "37",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2118);
                    navigateTo(2119);
                },
                validate: () => validateOptions(2118)
            }
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
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                id: "39",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "40",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "41",
                buttons: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2119);
                    navigateTo(2120);
                },
                validate: () => validateOptions(2119)
            }
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
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                id: "43",
                buttons: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            {
                text: "Continue",
                action: () => {
                    calculateScore(2120);
                    saveScoreToFirebase();
                    navigateTo(2121);
                },
                validate: () => validateOptions(2120)
            }
        ]
    },
    2121: {
        type: "score",
        buttons: [
            {
                text: "Next Chapter",
                action: () => {},
                condition: () => gameState.testScore >= 60 || !gameState.isFirstAttempt
            },
            {
                text: "Show the answers",
                action: () => showAnswers()
            },
            {
                text: "Try Again",
                action: () => {
                    resetTest();
                    navigateTo(2113);
                }
            }
        ]
    }
};

// 初始化游戏
function initGame() {
    // 创建所有页面
    createAllPages();
    
    // 显示开始页面
    showPage(2100);
    
    // 添加事件监听器
    document.getElementById('confirm-answers').addEventListener('click', hideAnswers);
    
    // 生成房间ID
    generateRoomId();
}

// 创建所有页面
function createAllPages() {
    const gameContainer = document.getElementById('game-container');
    
    for (const pageId in pages) {
        const page = document.createElement('div');
        page.id = `page-${pageId}`;
        page.className = 'page';
        
        const pageData = pages[pageId];
        
        // 添加页面标题和进度条（非开始和得分页面）
        if (pageId != 2100 && pageId != 2121) {
            const titleBar = document.createElement('div');
            titleBar.className = 'page-title';
            
            const pageType = document.createElement('div');
            pageType.className = 'page-type';
            pageType.textContent = pageData.type === 'practice' ? 'Practice' : 'Test';
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.id = `progress-${pageId}`;
            
            progressContainer.appendChild(progressBar);
            titleBar.appendChild(pageType);
            titleBar.appendChild(progressContainer);
            
            page.appendChild(titleBar);
        }
        
        // 添加图片
        if (pageData.image) {
            const img = document.createElement('img');
            img.className = 'page-image';
            img.src = `images/${pageData.image}`;
            img.alt = 'Game scene';
            page.appendChild(img);
        }
        
        // 添加文本容器
        if (pageData.text) {
            const textContainer = document.createElement('div');
            textContainer.className = 'text-container';
            textContainer.innerHTML = formatTextWithPlaceholders(pageData.text);
            page.appendChild(textContainer);
        }
        
        // 添加选项按钮（如果有）
        if (pageData.options) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            
            pageData.options.forEach((optionGroup, index) => {
                const buttonRow = document.createElement('div');
                buttonRow.className = 'button-row';
                
                optionGroup.buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.className = 'option-btn';
                    button.textContent = btn.text;
                    button.dataset.correct = btn.correct;
                    button.dataset.groupId = optionGroup.id;
                    
                    button.addEventListener('click', () => {
                        selectOption(pageId, optionGroup.id, button);
                    });
                    
                    buttonRow.appendChild(button);
                });
                
                buttonsContainer.appendChild(buttonRow);
            });
            
            page.appendChild(buttonsContainer);
        }
        
        // 添加继续按钮（如果有）
        if (pageData.buttons) {
            const buttonsContainer = pageData.options ? 
                document.createElement('div') : 
                document.createElement('div');
            
            if (!pageData.options) {
                buttonsContainer.className = 'buttons-container';
            }
            
            pageData.buttons.forEach(btnData => {
                const button = document.createElement('button');
                button.className = 'continue-btn';
                button.textContent = btnData.text;
                
                if (btnData.condition) {
                    button.disabled = !btnData.condition();
                }
                
                button.addEventListener('click', () => {
                    if (btnData.validate && !btnData.validate()) {
                        showToast("Please complete all multiple-choice questions before continuing");
                        return;
                    }
                    
                    if (btnData.action) {
                        btnData.action();
                    }
                });
                
                buttonsContainer.appendChild(button);
            });
            
            page.appendChild(buttonsContainer);
        }
        
        // 得分页面特殊处理
        if (pageId == 2121) {
            const scoreContainer = document.createElement('div');
            scoreContainer.className = 'score-container';
            
            const scoreImage = document.createElement('img');
            scoreImage.className = 'page-image';
            scoreImage.id = 'score-image';
            scoreImage.alt = 'Score result';
            
            const scoreText = document.createElement('div');
            scoreText.className = 'score-text';
            scoreText.id = 'score-text';
            
            const scoreButtons = document.createElement('div');
            scoreButtons.className = 'score-buttons';
            
            pageData.buttons.forEach(btnData => {
                const button = document.createElement('button');
                button.className = 'score-btn';
                button.textContent = btnData.text;
                
                if (btnData.condition) {
                    button.disabled = !btnData.condition();
                }
                
                button.addEventListener('click', () => {
                    if (btnData.action) {
                        btnData.action();
                    }
                });
                
                scoreButtons.appendChild(button);
            });
            
            scoreContainer.appendChild(scoreImage);
            scoreContainer.appendChild(scoreText);
            scoreContainer.appendChild(scoreButtons);
            
            page.appendChild(scoreContainer);
        }
        
        gameContainer.appendChild(page);
    }
}

// 格式化带占位符的文本
function formatTextWithPlaceholders(text) {
    return text.replace(/①|②|③|④/g, match => {
        return `<span style="color: yellow; font-weight: bold;">${match}</span>`;
    });
}

// 显示指定页面
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示当前页面
    const currentPage = document.getElementById(`page-${pageId}`);
    currentPage.classList.add('active');
    
    // 更新进度条
    updateProgressBar(pageId);
    
    gameState.currentPage = pageId;
}

// 更新进度条
function updateProgressBar(pageId) {
    const pageData = pages[pageId];
    if (!pageData || pageId == 2100 || pageId == 2121) return;
    
    let progress = 0;
    
    if (pageData.type === 'practice') {
        // 练习页面进度：N/13
        const practicePages = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
        const currentIndex = practicePages.indexOf(parseInt(pageId));
        progress = (currentIndex + 1) / 13;
    } else if (pageData.type === 'test') {
        // 测试页面进度：M/7
        const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
        const currentIndex = testPages.indexOf(parseInt(pageId));
        progress = (currentIndex + 1) / 8;
    }
    
    const progressBar = document.getElementById(`progress-${pageId}`);
    if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
    }
}

// 导航到指定页面
function navigateTo(pageId) {
    showPage(pageId);
}

// 选择选项
function selectOption(pageId, groupId, button) {
    // 取消同组中其他按钮的选中状态
    const buttons = document.querySelectorAll(`#page-${pageId} button[data-group-id="${groupId}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前按钮为选中状态
    button.classList.add('selected');
    
    // 保存选择
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    
    gameState.selectedOptions[pageId][groupId] = button.dataset.correct === 'true';
}

// 验证选项是否全部完成
function validateOptions(pageId) {
    const pageData = pages[pageId];
    if (!pageData.options) return true;
    
    for (const optionGroup of pageData.options) {
        if (!gameState.selectedOptions[pageId] || !gameState.selectedOptions[pageId][optionGroup.id]) {
            return false;
        }
    }
    
    return true;
}

// 计算得分（测试页面）
function calculateScore(pageId) {
    if (pageId < 2113 || pageId > 2120) return;
    
    const pageData = pages[pageId];
    if (!pageData.options) return;
    
    for (const optionGroup of pageData.options) {
        if (gameState.selectedOptions[pageId] && 
            gameState.selectedOptions[pageId][optionGroup.id] === true) {
            gameState.testScore++;
        }
    }
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (!gameState.roomId) {
        generateRoomId();
    }
    
    const finalScore = Math.round(gameState.testScore * 4.55);
    
    database.ref('scores/' + gameState.roomId).set({
        score: finalScore,
        timestamp: Date.now()
    }).then(() => {
        updateScoreDisplay(finalScore);
    }).catch(error => {
        console.error("Error saving score: ", error);
        updateScoreDisplay(finalScore);
    });
}

// 更新得分显示
function updateScoreDisplay(score) {
    const scoreImage = document.getElementById('score-image');
    const scoreText = document.getElementById('score-text');
    
    if (scoreImage) {
        scoreImage.src = score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
    }
    
    if (scoreText) {
        scoreText.textContent = `Your score is : ${score}`;
    }
    
    // 更新Next Chapter按钮状态
    const nextChapterBtn = document.querySelector('#page-2121 .score-btn:first-child');
    if (nextChapterBtn) {
        nextChapterBtn.disabled = !(score >= 60 || !gameState.isFirstAttempt);
    }
}

// 显示正确答案
function showAnswers() {
    const answersText = document.getElementById('answers-text');
    answersText.innerHTML = `The answer of test：
My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 	she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near 	Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge 	is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a 	lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    
    document.getElementById('answers-modal').style.display = 'block';
}

// 隐藏正确答案
function hideAnswers() {
    document.getElementById('answers-modal').style.display = 'none';
}

// 重置测试
function resetTest() {
    // 清除测试选项
    for (let i = 2113; i <= 2120; i++) {
        if (gameState.selectedOptions[i]) {
            delete gameState.selectedOptions[i];
        }
    }
    
    // 重置测试得分
    gameState.testScore = 0;
    gameState.isFirstAttempt = false;
    
    // 重置UI选项
    document.querySelectorAll('.option-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 生成房间ID
function generateRoomId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    gameState.roomId = month + day + hours + minutes;
}

// 显示提示信息
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
