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
    currentPage: 2100, // 当前页面ID
    selectedOptions: {}, // 存储用户选择的选项
    score: 0, // 得分
    isFirstTest: true, // 是否是第一次测试
    roomId: null // Firebase房间ID
};

// 页面数据
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
                choices: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "2",
                choices: [
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
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                id: "3",
                choices: [
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
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                id: "4",
                choices: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "5",
                choices: [
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
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                id: "6",
                choices: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "7",
                choices: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                id: "8",
                choices: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "9",
                choices: [
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
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                id: "10",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "11",
                choices: [
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
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                id: "12",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "13",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "14",
                choices: [
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
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                id: "15",
                choices: [
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
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                id: "16",
                choices: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "17",
                choices: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "18",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "19",
                choices: [
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
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                id: "20",
                choices: [
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
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                id: "21",
                choices: [
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
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                id: "22",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "23",
                choices: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "24",
                choices: [
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
        text: "Karen  ①  go to university in Oxford; she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                id: "25",
                choices: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                id: "26",
                choices: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                id: "27",
                choices: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
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
                choices: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                id: "29",
                choices: [
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
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                id: "30",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "31",
                choices: [
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
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                id: "32",
                choices: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "33",
                choices: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                id: "34",
                choices: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                id: "35",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
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
                choices: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                id: "37",
                choices: [
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
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                id: "38",
                choices: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                id: "39",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "40",
                choices: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                id: "41",
                choices: [
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
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                id: "42",
                choices: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                id: "43",
                choices: [
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

// 正确答案文本
const correctAnswersText = `My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 	she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near 	Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge 	is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a 	lot. 
We talk on the phone every night and we visit each other whenever we can.`;

// 初始化游戏
function initGame() {
    // 创建所有页面
    createAllPages();
    
    // 显示初始页面
    showPage(2100);
    
    // 生成房间ID
    generateRoomId();
}

// 创建所有页面
function createAllPages() {
    const gameContainer = document.getElementById('game-container');
    
    // 创建所有页面元素
    for (const pageId in pages) {
        const page = pages[pageId];
        const pageElement = document.createElement('div');
        pageElement.id = `page-${pageId}`;
        pageElement.className = 'game-page';
        
        // 创建页面内容
        if (pageId == 2121) {
            // 得分页面特殊处理
            pageElement.innerHTML = createScorePage();
        } else {
            pageElement.innerHTML = createNormalPage(pageId, page);
        }
        
        gameContainer.appendChild(pageElement);
    }
    
    // 创建答案模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'answers-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-text">${correctAnswersText}</div>
            <button class="modal-button" onclick="closeModal()">Confirm</button>
        </div>
    `;
    gameContainer.appendChild(modal);
}

// 创建普通页面
function createNormalPage(pageId, page) {
    let html = '';
    
    // 添加标题栏（开始页面没有标题栏）
    if (pageId != 2100) {
        const pageType = page.type === 'practice' ? 'Practice' : 'Test';
        const progress = calculateProgress(pageId, page.type);
        
        html += `
            <div class="page-title">
                <div class="title-text">${pageType}</div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    }
    
    // 添加图片
    html += `<img class="page-image" src="images/${page.image}" alt="Game Image">`;
    
    // 添加文本
    html += `<div class="text-container">${page.text}</div>`;
    
    // 添加选项（如果有）
    if (page.options) {
        html += '<div class="options-container">';
        
        page.options.forEach((optionGroup, index) => {
            html += `
                <div class="option-group">
                    <span class="group-number">${getGroupNumber(index)}</span>
                    <div class="options-row">
            `;
            
            optionGroup.choices.forEach((choice, choiceIndex) => {
                html += `
                    <button class="option-button" 
                            data-page="${pageId}" 
                            data-group="${optionGroup.id}" 
                            data-choice="${choiceIndex}"
                            onclick="selectOption(this, ${pageId}, '${optionGroup.id}', ${choiceIndex})">
                        ${choice.text}
                    </button>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    // 添加继续按钮
    if (page.buttons) {
        page.buttons.forEach(button => {
            html += `
                <button class="continue-button" 
                        onclick="handleButtonClick(${button.target || 'null'}, '${button.action || ''}')">
                    ${button.text}
                </button>
            `;
        });
    }
    
    return html;
}

// 创建得分页面
function createScorePage() {
    return `
        <div class="score-page">
            <img class="score-image" id="score-background" src="" alt="Score Background">
            <div class="score-text" id="score-display">Your score is: </div>
            <div class="score-buttons">
                <button class="score-button" id="next-chapter-btn" onclick="handleButtonClick(null, 'nextChapter')">Next Chapter</button>
                <button class="score-button" id="show-answers-btn" onclick="handleButtonClick(null, 'showAnswers')">Show the answers</button>
                <button class="score-button" id="try-again-btn" onclick="handleButtonClick(null, 'tryAgain')">Try Again</button>
            </div>
        </div>
    `;
}

// 计算进度
function calculateProgress(pageId, pageType) {
    if (pageType === 'practice') {
        const practicePages = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
        const currentIndex = practicePages.indexOf(parseInt(pageId));
        return currentIndex >= 0 ? Math.round((currentIndex + 1) / practicePages.length * 100) : 0;
    } else if (pageType === 'test') {
        const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
        const currentIndex = testPages.indexOf(parseInt(pageId));
        return currentIndex >= 0 ? Math.round((currentIndex + 1) / testPages.length * 100) : 0;
    }
    return 0;
}

// 获取组号符号
function getGroupNumber(index) {
    const groupNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
    return groupNumbers[index] || (index + 1);
}

// 显示页面
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.game-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // 显示当前页面
    const currentPage = document.getElementById(`page-${pageId}`);
    if (currentPage) {
        currentPage.style.display = 'flex';
        gameState.currentPage = pageId;
    }
}

// 选择选项
function selectOption(button, pageId, groupId, choiceIndex) {
    // 移除同组中其他按钮的选中状态
    document.querySelectorAll(`.option-button[data-page="${pageId}"][data-group="${groupId}"]`).forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前按钮为选中状态
    button.classList.add('selected');
    
    // 保存选择
    if (!gameState.selectedOptions[pageId]) {
        gameState.selectedOptions[pageId] = {};
    }
    gameState.selectedOptions[pageId][groupId] = choiceIndex;
}

// 处理按钮点击
function handleButtonClick(targetPage, action) {
    if (action) {
        // 处理特殊动作
        switch (action) {
            case 'nextChapter':
                // 下一章按钮逻辑
                alert("Next chapter is not implemented yet.");
                break;
            case 'showAnswers':
                // 显示答案
                showModal();
                break;
            case 'tryAgain':
                // 重试
                resetTest();
                showPage(2113);
                break;
        }
    } else if (targetPage) {
        // 检查是否所有选项都已选择（如果有选项）
        const currentPage = pages[gameState.currentPage];
        if (currentPage.options) {
            const selectedOptions = gameState.selectedOptions[gameState.currentPage] || {};
            const allSelected = currentPage.options.every(option => selectedOptions[option.id] !== undefined);
            
            if (!allSelected) {
                showAlert("Please complete all multiple-choice questions before continuing");
                return;
            }
            
            // 如果是测试页面，计算得分
            if (currentPage.type === 'test') {
                calculateScoreForPage(gameState.currentPage);
            }
        }
        
        // 跳转到目标页面
        showPage(targetPage);
        
        // 如果是得分页面，显示得分
        if (targetPage === 2121) {
            showScore();
        }
    }
}

// 计算当前页面得分
function calculateScoreForPage(pageId) {
    const page = pages[pageId];
    if (!page.options) return;
    
    const selectedOptions = gameState.selectedOptions[pageId] || {};
    
    page.options.forEach(optionGroup => {
        const selectedChoiceIndex = selectedOptions[optionGroup.id];
        if (selectedChoiceIndex !== undefined) {
            const selectedChoice = optionGroup.choices[selectedChoiceIndex];
            if (selectedChoice.correct) {
                gameState.score++;
            }
        }
    });
    
    // 保存得分到Firebase
    saveScoreToFirebase();
}

// 显示得分
function showScore() {
    // 计算最终得分（选择正确的按钮数 * 4.55，保留到个位）
    const finalScore = Math.round(gameState.score * 4.55);
    
    // 设置背景图片
    const scoreBackground = document.getElementById('score-background');
    if (scoreBackground) {
        scoreBackground.src = `images/${finalScore >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    }
    
    // 显示得分
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Your score is: ${finalScore}`;
    }
    
    // 设置按钮状态
    const nextChapterBtn = document.getElementById('next-chapter-btn');
    const showAnswersBtn = document.getElementById('show-answers-btn');
    
    if (gameState.isFirstTest) {
        if (finalScore < 60) {
            nextChapterBtn.classList.add('disabled');
            nextChapterBtn.disabled = true;
            showAnswersBtn.classList.add('disabled');
            showAnswersBtn.disabled = true;
        }
    }
}

// 重置测试
function resetTest() {
    // 重置测试相关状态
    for (let i = 2113; i <= 2120; i++) {
        if (gameState.selectedOptions[i]) {
            delete gameState.selectedOptions[i];
        }
    }
    gameState.score = 0;
    gameState.isFirstTest = false;
}

// 显示提示框
function showAlert(message) {
    // 创建提示框
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    // 添加到页面
    document.getElementById('game-container').appendChild(alertBox);
    
    // 3秒后移除
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// 显示模态框
function showModal() {
    const modal = document.getElementById('answers-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('answers-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 生成房间ID
function generateRoomId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    gameState.roomId = `${month}${day}${hours}${minutes}`;
    return gameState.roomId;
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (!gameState.roomId) {
        generateRoomId();
    }
    
    // 计算最终得分
    const finalScore = Math.round(gameState.score * 4.55);
    
    // 保存到Firebase
    database.ref('scores/' + gameState.roomId).set({
        score: finalScore,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).catch(error => {
        console.error("Error saving score to Firebase:", error);
    });
}

// 从Firebase获取得分
function getScoreFromFirebase() {
    if (!gameState.roomId) return Promise.resolve(0);
    
    return database.ref('scores/' + gameState.roomId).once('value').then(snapshot => {
        const data = snapshot.val();
        return data ? data.score : 0;
    }).catch(error => {
        console.error("Error getting score from Firebase:", error);
        return 0;
    });
}

// 预加载图片函数
function preloadImages() {
    const imageUrls = [];
    
    // 收集所有需要的图片
    for (const pageId in pages) {
        if (pages[pageId].image) {
            imageUrls.push(`images/${pages[pageId].image}`);
        }
    }
    
    // 添加得分页面图片
    imageUrls.push('images/及格.jpg');
    imageUrls.push('images/不及格.jpg');
    
    // 预加载所有图片
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后初始化游戏
window.addEventListener('load', function() {
    // 预加载图片
    preloadImages();
    
    // 初始化游戏
    initGame();
    
    // 添加触摸事件处理，防止移动端延迟
    document.addEventListener('touchstart', function() {}, {passive: true});
});

// 防止右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 处理浏览器返回按钮
window.addEventListener('popstate', function(e) {
    // 阻止用户使用浏览器返回按钮
    if (gameState.currentPage !== 2100) {
        history.pushState(null, null, window.location.href);
    }
});

// 初始化历史状态
history.pushState(null, null, window.location.href);

// 确保所有函数都在全局作用域中可用
window.selectOption = selectOption;
window.handleButtonClick = handleButtonClick;
window.closeModal = closeModal;
window.initGame = initGame;

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showAlert('An error occurred. Please refresh the page.');
});

// 添加未处理的Promise拒绝处理
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showAlert('An error occurred. Please refresh the page.');
    e.preventDefault();
});
