// script.js
// 英语时态学习游戏 - 完整实现

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
const db = firebase.firestore();

// 游戏状态管理
const gameState = {
    currentPageId: 2100,
    score: 0,
    selectedAnswers: {},
    correctAnswers: {},
    isRetry: false,
    roomId: null,
    testScore: 0
};

// 页面配置数据
const pageConfigs = {
    2100: {
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { text: "Begin", target: 2101, isCorrect: null }
        ],
        isPractice: false,
        isTest: false
    },
    2101: {
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { text: "Continue", target: 2102, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2102: {
        image: "画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "am", isCorrect: false },
                    { text: "are", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "calls", isCorrect: false },
                    { text: "call", isCorrect: true },
                    { text: "calling", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2103, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2103: {
        image: "画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2104, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2104: {
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { text: "Continue", target: 2105, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2105: {
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "lives", isCorrect: true },
                    { text: "live", isCorrect: false },
                    { text: "living", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "lives", isCorrect: true },
                    { text: "live", isCorrect: false },
                    { text: "are living", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2106, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2106: {
        image: "画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "loves", isCorrect: false },
                    { text: "love", isCorrect: true },
                    { text: "living", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "am", isCorrect: false },
                    { text: "are", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "loves", isCorrect: true },
                    { text: "love", isCorrect: false },
                    { text: "loving", isCorrect: false }
                ]
            },
            {
                id: "group4",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2107, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2107: {
        image: "画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "looks", isCorrect: true },
                    { text: "look", isCorrect: false },
                    { text: "looking", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2108, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2108: {
        image: "画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "has", isCorrect: false },
                    { text: "have", isCorrect: true },
                    { text: "having", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2109, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2109: {
        image: "画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2110, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2110: {
        image: "画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "studies", isCorrect: true },
                    { text: "study", isCorrect: false },
                    { text: "studying", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "says", isCorrect: true },
                    { text: "say", isCorrect: false },
                    { text: "saying", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group4",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2111, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2111: {
        image: "画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2112, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2112: {
        image: "画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2113, isCorrect: null }
        ],
        isPractice: true,
        isTest: false
    },
    2113: {
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "go", isCorrect: true },
                    { text: "goes", isCorrect: false },
                    { text: "going", is极不正确 }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2114, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2114: {
        image: "画面14.jpg",
        text: "Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "don't", isCorrect: false },
                    { text: "isn't", isCorrect: false },
                    { text: "doesn't", isCorrect: true }
                ]
            },
            {
                id: "极group2",
                choices: [
                    { text: "go", isCorrect: false },
                    { text: "goes", isCorrect: true },
                    { text: "going", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "lives", isCorrect: true },
                    { text极: "live", isCorrect: false },
                    { text: "living", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2115, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2115: {
        image: "画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "lives", isCorrect: false },
                    { text: "live", isCorrect: true },
                    { text: "living", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2116, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2116: {
        image: "画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "see", isCorrect: true },
                    { text: "sees", isCorrect: false },
                    { text: "seeing", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2117, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2117: {
        image: "画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "studies", isCorrect: true },
                    { text: "study", isCorrect: false },
                    { text: "studying", isCorrect: false }
                ]
极          },
            {
                id: "group2",
                choices: [
                    { text: "love", isCorrect: false },
                    { text: "loves", isCorrect: true },
                    { text: "loving", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "s极ays", isCorrect: true },
                    { text: "say", isCorrect: false },
                    { text: "saying", isCorrect: false }
                ]
            },
            {
                id: "group4",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2118, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2118: {
        image: "画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "studies", isCorrect: false },
                    { text: "study", isCorrect: true },
                    { text: "studying", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: false },
                    { text: "are", isCorrect: true },
                    { text: "am", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2119, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2119: {
        image: "画面19.jpg",
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "like", isCorrect: true },
                    { text: "likes", isCorrect: false },
                    { text: "liking", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group3",
                choices: [
                    { text: "is", isCorrect: true },
                    { text: "are", isCorrect: false },
                    { text: "am", isCorrect: false }
                ]
            },
            {
                id: "group4",
                choices: [
                    { text: "miss", isCorrect: true },
                    { text: "misses", isCorrect: false },
                    { text: "missing", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2120, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2120: {
        image: "画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        choiceGroups: [
            {
                id: "group1",
                choices: [
                    { text: "talk", isCorrect: true },
                    { text: "talks", isCorrect: false },
                    { text: "talking", isCorrect: false }
                ]
            },
            {
                id: "group2",
                choices: [
                    { text: "visit", isCorrect: true },
                   极 text: "visits", isCorrect: false },
                    { text: "visiting", isCorrect: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2121, isCorrect: null }
        ],
        isPractice: false,
        isTest: true
    },
    2121: {
        image: "",
        text: "",
        buttons: [
            { text: "Next Chapter", target: null, isCorrect: null },
            { text: "Show the answers", target: null, isCorrect: null },
            { text: "Try Again", target: 2113, isCorrect: null }
        ],
        isPractice: false,
        isTest: false,
        isScoreScreen: true
    }
};

// 初始化游戏
function initGame() {
    // 生成房间ID (当前时间)
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    gameState.roomId = `${month}${day}${hours}${minutes}`;
    
    // 加载当前页面
    loadPage(gameState.currentPageId);
    
    // 添加事件监听
    document.addEventListener('click', handleClickEvents);
}

// 加载页面
function loadPage(pageId) {
    const config = pageConfigs[pageId];
    if (!config) {
        console.error(`Page configuration not found for ID: ${pageId}`);
        return;
    }
    
    // 更新当前页面ID
    gameState.currentPageId = pageId;
    
    // 清空容器
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    // 创建页面元素
    const pageElement = document.createElement('div');
    pageElement.className = 'game-page';
    
    // 添加页面标题和进度条
    const titleBar = createTitleBar(config);
    pageElement.appendChild(titleBar);
    
    // 添加图片
    if (config.image) {
        const imageElement = createImageElement(config.image);
        pageElement.appendChild(imageElement);
    }
    
    // 添加文本内容
    if (config.text) {
        const textElement = createTextElement(config.text);
        pageElement.appendChild(textElement);
    }
    
    // 添加选择题（如果有）
    if (config.choiceGroups) {
        const choicesContainer = createChoiceGroups(config.choiceGroups, pageId);
        pageElement.appendChild(choicesContainer);
    }
    
    // 添加按钮
    const buttonsContainer = createButtons(config.buttons, pageId);
    pageElement.appendChild(buttonsContainer);
    
    // 如果是得分页面，特殊处理
    if (config.isScoreScreen) {
        createScoreScreen(pageElement);
    }
    
    // 添加到游戏容器
    container.appendChild(pageElement);
    
    // 恢复之前的选择（如果有）
    restoreSelections(pageId);
}

// 创建标题栏
function createTitleBar(config) {
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    
    // 页面类型标签
    const typeLabel = document.createElement('div');
    typeLabel.className = 'page-type';
    if (config.isPractice) {
        typeLabel.textContent = 'Practice';
    } else if (config.isTest) {
        typeLabel.textContent = 'Test';
    } else {
        typeLabel.textContent = '';
    }
    titleBar.appendChild(typeLabel);
    
    // 进度条
    const progressBar = createProgressBar(config);
    titleBar.appendChild(progressBar);
    
    return titleBar;
}

// 创建进度条
function createProgressBar(config) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    
    // 计算进度
    let progress = 0;
    if (config.isPractice) {
        const practicePages = [2101, 2102, 2103, 2104, 2105, 极2106, 2107, 2108, 2109, 2110, 2111, 2112];
        const currentIndex = practicePages.indexOf(gameState.currentPageId);
        progress = (currentIndex + 1) / practicePages.length;
    } else if (config.isTest) {
        const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
        const currentIndex = testPages.indexOf(gameState.currentPageId);
        progress = (currentIndex + 1) / testPages.length;
    }
    
    progressFill.style.width = `${progress * 100}%`;
    progressBar.appendChild(progressFill);
    
    return progressBar;
}

// 创建图片元素
function createImageElement(imageName) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';
    
    const img = document.createElement('img');
    img.src = `images/${imageName}`;
    img.alt = 'Game Image';
    img.className = 'game-image';
    
    imgContainer.appendChild(img);
    return imgContainer;
}

// 创建文本元素
function createTextElement(text) {
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    
    const textElement = document.createElement('p');
    textElement.textContent = text;
    
    textContainer.appendChild(textElement);
    return textContainer;
}

// 创建选择题组
function createChoiceGroups(choiceGroups, pageId) {
    const container = document.createElement('div');
    container.className = 'choices-container';
    
    choiceGroups.forEach((group, groupIndex) => {
        const groupElement = document.createElement('div');
        groupElement.className = 'choice-group';
        
        // 添加组编号 (①, ②, ③, ④)
        const groupLabel = document.createElement('div');
        groupLabel.className = 'group-label';
        
        // 使用Unicode圆圈数字符号
        const labelChars = ['①', '②', '③', '④'];
        groupLabel.textContent = labelChars[groupIndex];
        
        groupElement.appendChild(groupLabel);
        
        // 创建选择按钮
        const buttonsContainer = document.createElement('极div');
        buttonsContainer.className = 'choice-buttons';
        
        group.choices.forEach((choice, choiceIndex) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.dataset.pageId = pageId;
            button.dataset.groupId = groupIndex;
            button.dataset.choiceIndex = choiceIndex;
            
            buttonsContainer.appendChild(button);
        });
        
        groupElement.appendChild(buttonsContainer);
        container.appendChild(groupElement);
    });
    
    return container;
}

// 创建按钮
function createButtons(buttons, pageId) {
    const container = document.createElement('div');
    container.className = 'buttons-container';
    
    buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.className = 'action-button';
        button.textContent = buttonConfig.text;
        button.dataset.target = buttonConfig.target;
        button.dataset.pageId = pageId;
        
        container.appendChild(button);
    });
    
    return container;
}

// 创建得分页面
function createScoreScreen(pageElement) {
    // 计算得分
    const score = Math.round(gameState.testScore * 4.55);
    
    // 设置背景图片
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';
    
    const img = document.createElement('img');
    img.src = `images/${score >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    img.alt = 'Score Image';
    img.className = 'game-image';
    
    imgContainer.appendChild(img);
    pageElement.appendChild(imgContainer);
    
    // 显示得分
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    const scoreText = document.createElement('p');
    scoreText.textContent = `Your score is: ${score}`;
    scoreContainer.appendChild(scoreText);
    
    pageElement.appendChild(scoreContainer);
    
    // 创建按钮容器
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'score-buttons';
    
    // Next Chapter按钮
    const nextChapterBtn = document.createElement('button');
    nextChapterBtn.id = 'next-chapter-btn';
    nextChapterBtn.textContent = 'Next Chapter';
    nextChapterBtn.disabled = score < 60 && !gameState.isRetry;
    buttonsContainer.appendChild(nextChapterBtn);
    
    // Show the answers按钮
    const showAnswersBtn = document.createElement('button');
    showAnswersBtn.id = 'show-answers-btn';
    showAnswersBtn.textContent = 'Show the answers';
    buttonsContainer.appendChild(showAnswersBtn);
    
    // Try Again按钮
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.id = 'try-again-btn';
    tryAgainBtn.textContent = 'Try Again';
    buttonsContainer.appendChild(tryAgainBtn);
    
    pageElement.appendChild(buttonsContainer);
}

// 恢复之前的选择
function restoreSelections(pageId) {
    const selections = gameState.selectedAnswers[pageId];
    if (!selections) return;
    
    Object.keys(selections).forEach(groupId => {
        const choiceIndex = selections[groupId];
        const button = document.querySelector(
            `.choice-button[data-page-id="${pageId}"][data-group-id="${groupId}"][data-choice-index="${choiceIndex}"]`
        );
        
        if (button) {
            button.classList.add('selected');
        }
    });
}

// 处理点击事件
function handleClickEvents(event) {
    const target = event.target;
    
    // 处理选择题按钮点击
    if (target.classList.contains('choice-button')) {
        handleChoiceClick(target);
    }
    
    // 处理行动按钮点击 (Continue等)
    if (target.classList.contains('action-button')) {
        handleActionClick(target);
    }
    
    // 处理得分页面的特殊按钮
    if (target.id === 'show-answers-btn') {
        showAnswers();
    }
    
    if (target.id === 'try-again-btn') {
        tryAgain();
    }
    
    if (target.id === 'next-chapter-btn') {
        nextChapter();
    }
    
    if (target.id === 'confirm-answers-btn') {
        confirmAnswers();
    }
}

// 处理选择题点击
function handleChoiceClick(button) {
    const pageId = parseInt(button.dataset.pageId);
    const groupId = button.dataset.groupId;
    const choiceIndex = parseInt(button.dataset.choiceIndex);
    
    // 清除同组中其他按钮的选中状态
    const groupButtons = document.querySelectorAll(
        `.choice-button[data-page-id="${pageId}"][data-group-id="${groupId}"]`
    );
    
    groupButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 设置当前按钮为选中状态
    button.classList.add('selected');
    
    // 保存选择
    if (!gameState.selectedAnswers[pageId]) {
        gameState.selectedAnswers[pageId] = {};
    }
    
    gameState.selectedAnswers[pageId][groupId] = choiceIndex;
}

// 处理行动按钮点击
function handleActionClick(button) {
    const pageId = parseInt(button.dataset.pageId);
    const targetPageId = parseInt(button.dataset.target);
    
    // 检查是否是Continue按钮且需要验证选择题完成情况
    if (button.textContent === 'Continue' && pageConfigs[pageId].choiceGroups) {
        if (!validateChoicesComplete(pageId)) {
            showMessage('Please complete all multiple-choice questions before continuing');
            return;
        }
        
        // 如果是测试页面，计算得分
        if (pageConfigs[pageId].isTest) {
            calculateScore(pageId);
        }
    }
    
    // 导航到目标页面
    loadPage(targetPageId);
}

// 验证是否所有选择题都已完成
function validateChoicesComplete(pageId) {
    const selections = gameState.selectedAnswers[pageId];
    const choiceGroups = pageConfigs[pageId].choiceGroups;
    
    if (!selections || Object.keys(selections).length < choiceGroups.length) {
        return false;
    }
    
    return true;
}

// 计算得分（仅对测试页面）
function calculateScore(pageId) {
    const config = pageConfigs[pageId];
    const selections = gameState.selectedAnswers[pageId];
    
    if (!config.choiceGroups || !selections) return;
    
    // 计算本页得分
    let pageScore = 0;
    config.choiceGroups.forEach((group, groupIndex) => {
        const selectedIndex = selections[groupIndex];
        if (selectedIndex !== undefined && group.choices[selectedIndex].isCorrect) {
            pageScore++;
        }
    });
    
    // 更新测试得分
    gameState.testScore += pageScore;
    
    // 保存到Firebase
    saveScoreToFirebase();
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (!gameState.roomId) return;
    
    const score = Math.round(gameState.testScore * 4.55);
    
    db.collection('scores').doc(gameState.roomId).set({
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch(error => {
        console.error('Error saving score to Firebase:', error);
    });
}

// 从Firebase获取得分
async function getScoreFromFirebase() {
    if (!gameState.roomId) return 0;
    
    try {
        const doc = await db.collection('scores').doc(gameState.roomId).get();
        if (doc.exists) {
            return doc.data().score;
        }
        return 0;
    } catch (error) {
        console.error('Error getting score from Firebase:', error);
        return 0;
    }
}

// 显示消息提示
function showMessage(message) {
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = 'message-box';
    messageElement.textContent = message;
    
    // 添加到页面
    document.body.appendChild(messageElement);
    
    // 3秒后移除
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}

// 显示答案
function showAnswers() {
    // 创建答案显示模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const answerText = document.createElement('pre');
    answerText.className = 'answer-text';
    answerText.textContent = `The answer of test：
My name's Nick.My girlfriend's name is Karen. 
We're students. I go to university in Oxford. Karen doesn't go to university in Oxford; 
she goes to university in Cambridge. 
She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford. 
It's difficult sometimes because we see each other only on weekends. 
Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.
I study philosophy and politics, so my courses are very different from hers. 
I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot. 
We talk on the phone every night and we visit each other whenever we can.`;
    
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirm-answers-btn';
    confirmButton.textContent = 'Confirm';
    
    modalContent.appendChild(answerText);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

// 确认答案（关闭模态框）
function confirmAnswers() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// 重试
function tryAgain() {
    // 重置得分和选择
    gameState.testScore = 0;
    gameState.selectedAnswers = {};
    gameState.isRetry = true;
    
    // 跳转到测试开始页面
    loadPage(2113);
}

// 下一章
function nextChapter() {
    // 这里实现跳转到下一章的代码
    // 由于需求中没有指定具体跳转目标，这里只是示例
    showMessage('Next chapter is not implemented yet');
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
