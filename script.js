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
    selectedOptions: {},
    isFirstAttempt: true,
    roomId: generateRoomId()
};

// 屏幕配置数据
const screenConfigs = {
    2100: { // 开始画面
        image: "开始画面.jpg",
        text: "Welcome to the journey of English tenses",
        buttons: [
            { text: "Begin", target: 2101 }
        ],
        isPractice: false
    },
    2101: { // 画面01
        image: "画面01.jpg",
        text: "Arturo: Hello, I'm Arturo Valdez.",
        buttons: [
            { text: "Continue", target: 2102 }
        ],
        isPractice: true
    },
    2102: { // 画面02
        image: "画面02.jpg",
        text: "Alexa: Hi. My name   ①   Alexandra Costa, but please   ②   me Alexa.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "calls", correct: false },
                    { text: "call", correct: true },
                    { text: "calling", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2103 }
        ],
        isPractice: true
    },
    2103: { // 画面03
        image: "画面03.jpg",
        text: "Arturo: OK. Where    ①    you from, Alexa?",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2104 }
        ],
        isPractice: true
    },
    2104: { // 画面04
        image: "画面04.jpg",
        text: "Alexa: Brazil. How about you?",
        buttons: [
            { text: "Continue", target: 2105 }
        ],
        isPractice: true
    },
    2105: { // 画面05
        image: "画面05.jpg",
        text: "Arturo: I'm from Mexico. I   ①   here in the city now, but my family   ②   in a small town near Guadalajara.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "are living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2106 }
        ],
        isPractice: true
    },
    2106: { // 画面06
        image: "画面06.jpg",
        text: "Alexa: Oh, I   ①   Mexico! It   ②   really beautiful. My brother   ③   Mexico, too. Oh, good. Soo-jin   ④   here.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "loves", correct: false },
                    { text: "love", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: true },
                    { text: "am", correct: false },
                    { text: "are", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "loves", correct: true },
                    { text: "love", correct: false },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: "④",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2107 }
        ],
        isPractice: true
    },
    2107: { // 画面07
        image: "画面07.jpg",
        text: "Arturo: Who   ①   Soo-jin? She   ②   familiar.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "looks", correct: true },
                    { text: "look", correct: false },
                    { text: "looking", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2108 }
        ],
        isPractice: true
    },
    2108: { // 画面08
        image: "画面08.jpg",
        text: "Alexa: She   ①   my classmate. We   ②   in the same business class. We   ③   our class every Monday and Wednesday.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "has", correct: false },
                    { text: "have", correct: true },
                    { text: "having", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2109 }
        ],
        isPractice: true
    },
    2109: { // 画面09
        image: "画面09.jpg",
        text: "Arturo: Where   ①   she from?",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2110 }
        ],
        isPractice: true
    },
    2110: { // 画面10
        image: "画面10.jpg",
        text: "Alexa: South Korea. She   ①   marketing. She   ②   the classes   ③   very interesting. Let's go and say hello. Sorry, what  ④  your last name again? Vargas?",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "④",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2111 }
        ],
        isPractice: true
    },
    2111: { // 画面11
        image: "画面11.jpg",
        text: "Arturo: Actually, it   ①   Valdez",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2112 }
        ],
        isPractice: true
    },
    2112: { // 画面12
        image: "画面12.jpg",
        text: "Alexa: How   ①   you spell that?",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2113 }
        ],
        isPractice: true
    },
    2113: { // 画面13 - 测试开始
        image: "画面13.jpg",
        text: "My name's Nick. My girlfriend's name  ①  Karen. We  ②  students. I  ③  to university in Oxford.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "go", correct: true },
                    { text: "goes", correct: false },
                    { text: "going", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2114 }
        ],
        isPractice: false
    },
    2114: { // 画面14
        image: "画面14.jpg",
        text: "Karen  ①  go to university in Oxford；she  ②  to university in Cambridge. She  ③  in Cambridge.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "don't", correct: false },
                    { text: "isn't", correct: false },
                    { text: "doesn't", correct: true }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "go", correct: false },
                    { text: "goes", correct: true },
                    { text: "going", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "lives", correct: true },
                    { text: "live", correct: false },
                    { text: "living", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2115 }
        ],
        isPractice: false
    },
    2115: { // 画面15
        image: "画面15.jpg",
        text: "I  ①  with my parents in Woodstock, which  ②  a small town near Oxford.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "lives", correct: false },
                    { text: "live", correct: true },
                    { text: "living", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2116 }
        ],
        isPractice: false
    },
    2116: { // 画面16
        image: "画面16.jpg",
        text: "It  ①  difficult sometimes because we  ②  each other only on weekends.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "see", correct: true },
                    { text: "sees", correct: false },
                    { text: "seeing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2117 }
        ],
        isPractice: false
    },
    2117: { // 画面17
        image: "画面17.jpg",
        text: "Karen  ①  history, and she  ②  her course. She  ③  the architecture in Cambridge  ④  beautiful.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "studies", correct: true },
                    { text: "study", correct: false },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "love", correct: false },
                    { text: "loves", correct: true },
                    { text: "loving", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "says", correct: true },
                    { text: "say", correct: false },
                    { text: "saying", correct: false }
                ]
            },
            {
                number: "④",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2118 }
        ],
        isPractice: false
    },
    2118: { // 画面18
        image: "画面18.jpg",
        text: "I  ①  philosophy and politics, so my courses  ②  very different from hers.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "studies", correct: false },
                    { text: "study", correct: true },
                    { text: "studying", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: false },
                    { text: "are", correct: true },
                    { text: "am", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2119 }
        ],
        isPractice: false
    },
    2119: { // 画面19
        image: "画面19.jpg",
        text: "I  ①  living in Woodstock because my family  ②  there and it  ③  quiet, but I  ④  Karen a lot.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "like", correct: true },
                    { text: "likes", correct: false },
                    { text: "liking", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "③",
                buttons: [
                    { text: "is", correct: true },
                    { text: "are", correct: false },
                    { text: "am", correct: false }
                ]
            },
            {
                number: "④",
                buttons: [
                    { text: "miss", correct: true },
                    { text: "misses", correct: false },
                    { text: "missing", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2120 }
        ],
        isPractice: false
    },
    2120: { // 画面20
        image: "画面20.jpg",
        text: "We  ①  on the phone every night and we  ②  each other whenever we can.",
        options: [
            {
                number: "①",
                buttons: [
                    { text: "talk", correct: true },
                    { text: "talks", correct: false },
                    { text: "talking", correct: false }
                ]
            },
            {
                number: "②",
                buttons: [
                    { text: "visit", correct: true },
                    { text: "visits", correct: false },
                    { text: "visiting", correct: false }
                ]
            }
        ],
        buttons: [
            { text: "Continue", target: 2121 }
        ],
        isPractice: false
    },
    2121: { // 得分画面
        isPractice: false
    }
};

// 生成房间ID（当前时间）
function generateRoomId() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return month + day + hours + minutes;
}

// 初始化游戏
function initGame() {
    // 创建所有屏幕
    createAllScreens();
    
    // 设置事件监听器
    document.getElementById('begin-button').addEventListener('click', () => navigateTo(2101));
    document.getElementById('next-chapter-button').addEventListener('click', () => {
        // 下一章逻辑
        alert('Next Chapter functionality would be implemented here');
    });
    document.getElementById('show-answers-button').addEventListener('click', showAnswers);
    document.getElementById('try-again-button').addEventListener('click', tryAgain);
    document.getElementById('confirm-answers-button').addEventListener('click', hideAnswers);
    
    // 初始化Firebase房间
    initializeFirebaseRoom();
}

// 创建所有屏幕
function createAllScreens() {
    const gameContainer = document.getElementById('game-container');
    
    // 为每个屏幕配置创建DOM元素
    for (const [screenId, config] of Object.entries(screenConfigs)) {
        if (screenId === '2100' || screenId === '2121') continue; // 跳过已存在的屏幕
        
        const screen = document.createElement('div');
        screen.id = `screen-${screenId}`;
        screen.className = 'screen';
        
        // 添加标题栏
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        
        const screenType = document.createElement('div');
        screenType.className = 'screen-type';
        screenType.textContent = config.isPractice ? 'Practice' : 'Test';
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = '0%';
        
        progressContainer.appendChild(progressBar);
        titleBar.appendChild(screenType);
        titleBar.appendChild(progressContainer);
        
        screen.appendChild(titleBar);
        
        // 添加图片容器
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const image = document.createElement('img');
        image.className = 'screen-image';
        image.src = `images/${config.image}`;
        image.alt = `Screen ${screenId}`;
        // 添加错误处理，防止图片加载失败
        image.onerror = function() {
            console.error(`Failed to load image: images/${config.image}`);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
        };
        
        imageContainer.appendChild(image);
        screen.appendChild(imageContainer);
        
        // 添加文本容器
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        textContainer.textContent = config.text;
        screen.appendChild(textContainer);
        
        // 添加选项按钮（如果有）
        if (config.options) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            
            config.options.forEach((optionGroup, index) => {
                const buttonRow = document.createElement('div');
                buttonRow.className = 'button-row';
                buttonRow.dataset.number = optionGroup.number;
                
                optionGroup.buttons.forEach((button, btnIndex) => {
                    const optionButton = document.createElement('button');
                    optionButton.className = 'option-button';
                    optionButton.textContent = button.text;
                    optionButton.dataset.correct = button.correct;
                    optionButton.dataset.group = index;
                    optionButton.addEventListener('click', () => selectOption(screenId, index, btnIndex));
                    buttonRow.appendChild(optionButton);
                });
                
                buttonsContainer.appendChild(buttonRow);
            });
            
            screen.appendChild(buttonsContainer);
        }
        
        // 添加继续按钮
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-button';
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => handleContinue(screenId, config));
        screen.appendChild(continueButton);
        
        gameContainer.appendChild(screen);
    }
}

// 选择选项
function selectOption(screenId, groupIndex, buttonIndex) {
    // 清除同组中其他按钮的选择状态
    const buttons = document.querySelectorAll(`#screen-${screenId} .button-row:nth-child(${groupIndex + 1}) .option-button`);
    buttons.forEach(button => button.classList.remove('selected'));
    
    // 设置当前按钮为选中状态
    buttons[buttonIndex].classList.add('selected');
    
    // 保存选择
    if (!gameData.selectedOptions[screenId]) {
        gameData.selectedOptions[screenId] = {};
    }
    gameData.selectedOptions[screenId][groupIndex] = buttonIndex;
}

// 处理继续按钮点击
function handleContinue(screenId, config) {
    // 检查是否所有选项都已选择（如果有选项）
    if (config.options) {
        const allSelected = config.options.every((_, index) => {
            return gameData.selectedOptions[screenId] && gameData.selectedOptions[screenId][index] !== undefined;
        });
        
        if (!allSelected) {
            showAlert();
            return;
        }
        
        // 如果是测试屏幕，计算得分
        if (!config.isPractice && screenId >= 2113 && screenId <= 2120) {
            calculateScore(screenId);
        }
    }
    
    // 导航到下一个屏幕
    navigateTo(config.buttons[0].target);
}

// 显示提示
function showAlert() {
    const alertBox = document.getElementById('alert-box');
    alertBox.classList.add('active');
    
    setTimeout(() => {
        alertBox.classList.remove('active');
    }, 3000);
}

// 计算得分
function calculateScore(screenId) {
    const config = screenConfigs[screenId];
    let correctCount = 0;
    
    config.options.forEach((optionGroup, groupIndex) => {
        const selectedIndex = gameData.selectedOptions[screenId][groupIndex];
        if (optionGroup.buttons[selectedIndex].correct) {
            correctCount++;
        }
    });
    
    gameData.score += correctCount;
}

// 导航到指定屏幕
function navigateTo(screenId) {
    // 隐藏当前屏幕
    document.getElementById(`screen-${gameData.currentScreen}`).classList.remove('active');
    
    // 显示新屏幕
    document.getElementById(`screen-${screenId}`).classList.add('active');
    
    // 更新当前屏幕
    gameData.currentScreen = screenId;
    
    // 更新进度条
    updateProgressBar(screenId);
    
    // 如果是得分屏幕，显示最终得分
    if (screenId === 2121) {
        showFinalScore();
    }
}

// 更新进度条
function updateProgressBar(screenId) {
    const config = screenConfigs[screenId];
    if (!config) return;
    
    let progress = 0;
    if (config.isPractice) {
        // 练习屏幕进度：N/13
        const practiceScreens = [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
        const currentIndex = practiceScreens.indexOf(parseInt(screenId));
        if (currentIndex !== -1) {
            progress = (currentIndex + 1) / practiceScreens.length * 100;
        }
    } else if (screenId >= 2113 && screenId <= 2120) {
        // 测试屏幕进度：M/7
        const testScreens = [2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120];
        const currentIndex = testScreens.indexOf(parseInt(screenId));
        if (currentIndex !== -1) {
            progress = (currentIndex + 1) / testScreens.length * 100;
        }
    }
    
    const progressBar = document.querySelector(`#screen-${screenId} .progress-bar`);
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// 显示最终得分
function showFinalScore() {
    // 计算最终得分（选择"正确"按钮的个数 * 4.55，保留到个位）
    const finalScore = Math.round(gameData.score * 4.55);
    
    // 更新得分显示
    document.getElementById('final-score').textContent = finalScore;
    
    // 根据得分设置图片
    const resultImage = document.getElementById('result-image');
    resultImage.src = `images/${finalScore >= 60 ? '及格.jpg' : '不及格.jpg'}`;
    resultImage.onerror = function() {
        console.error(`Failed to load result image: images/${finalScore >= 60 ? '及格.jpg' : '不及格.jpg'}`);
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SZXN1bHQgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
    };
    
    // 设置Next Chapter按钮状态
    const nextChapterButton = document.getElementById('next-chapter-button');
    if (finalScore < 60 && gameData.isFirstAttempt) {
        nextChapterButton.disabled = true;
    } else {
        nextChapterButton.disabled = false;
    }
    
    // 保存得分到Firebase
    saveScoreToFirebase(finalScore);
}

// 保存得分到Firebase
function saveScoreToFirebase(score) {
    const roomRef = database.ref('rooms/' + gameData.roomId);
    roomRef.set({
        score: score,
        timestamp: new Date().toISOString()
    }).catch((error) => {
        console.error('Firebase save error:', error);
    });
}

// 初始化Firebase房间
function initializeFirebaseRoom() {
    const roomRef = database.ref('rooms/' + gameData.roomId);
    roomRef.once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                roomRef.set({
                    score: 0,
                    timestamp: new Date().toISOString()
                });
            }
        })
        .catch((error) => {
            console.error('Firebase initialization error:', error);
        });
}

// 显示答案
function showAnswers() {
    document.getElementById('answers-modal').classList.add('active');
}

// 隐藏答案
function hideAnswers() {
    document.getElementById('answers-modal').classList.remove('active');
}

// 重试
function tryAgain() {
    // 重置得分和相关状态
    gameData.score = 0;
    gameData.selectedOptions = {};
    gameData.isFirstAttempt = false;
    
    // 启用Next Chapter按钮
    document.getElementById('next-chapter-button').disabled = false;
    
    // 导航到测试开始屏幕
    navigateTo(2113);
}

// 页面加载完成后初始化游戏
window.addEventListener('load', initGame);
