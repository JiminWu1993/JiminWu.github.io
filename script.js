// Firebase配置和初始化
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
    currentScreen: 2100,
    score: 0,
    selectedOptions: {},
    roomId: null,
    totalCorrect: 0
};

// 问题数据定义（从第2组到第43组按钮）
const questions = {
    2102: {
        text: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
        options: [
            { 
                group: 1, 
                choices: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "am", correct: false },
                    { id: "1-3", text: "are", correct: false }
                ] 
            },
            { 
                group: 2, 
                choices: [
                    { id: "2-1", text: "calls", correct: false },
                    { id: "2-2", text: "call", correct: true },
                    { id: "2-3", text: "calling", correct: false }
                ] 
            }
        ]
    },
    2103: {
        text: "Arturo: OK. Where (1) you from, Alexa?",
        options: [
            { 
                group: 3, 
                choices: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2105: {
        text: "Arturo: I'm from Mexico. I (1) here in the city now, but my family (2) in a small town near Guadalajara.",
        options: [
            { 
                group: 4, 
                choices: [
                    { id: "1-1", text: "lives", correct: true },
                    { id: "1-2", text: "live", correct: false },
                    { id: "1-3", text: "living", correct: false }
                ] 
            },
            { 
                group: 5, 
                choices: [
                    { id: "2-1", text: "lives", correct: true },
                    { id: "2-2", text: "live", correct: false },
                    { id: "2-3", text: "are living", correct: false }
                ] 
            }
        ]
    },
    2106: {
        text: "Alexa: Oh, I (1) Mexico! It (2) really beautiful. My brother (3) Mexico, too. Oh, good. Soo-jin (4) here.",
        options: [
            { 
                group: 6, 
                choices: [
                    { id: "1-1", text: "loves", correct: false },
                    { id: "1-2", text: "love", correct: true },
                    { id: "1-3", text: "loving", correct: false }
                ] 
            },
            { 
                group: 7, 
                choices: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "am", correct: false },
                    { id: "2-3", text: "are", correct: false }
                ] 
            },
            { 
                group: 8, 
                choices: [
                    { id: "3-1", text: "loves", correct: true },
                    { id: "3-2", text: "love", correct: false },
                    { id: "3-3", text: "loving", correct: false }
                ] 
            },
            { 
                group: 9, 
                choices: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2107: {
        text: "Arturo: Who (1) Soo-jin? She (2) familiar.",
        options: [
            { 
                group: 10, 
                choices: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 11, 
                choices: [
                    { id: "2-1", text: "looks", correct: true },
                    { id: "2-2", text: "look", correct: false },
                    { id: "2-3", text: "looking", correct: false }
                ] 
            }
        ]
    },
    2108: {
        text: "Alexa: She (1) my classmate. We (2) in the same business class. We (3) our class every Monday and Wednesday.",
        options: [
            { 
                group: 12, 
                choices: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 13, 
                choices: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 14, 
                choices: [
                    { id: "3-1", text: "has", correct: false },
                    { id: "3-2", text: "have", correct: true },
                    { id: "3-3", text: "having", correct: false }
                ] 
            }
        ]
    },
    2109: {
        text: "Arturo: Where (1) she from?",
        options: [
            { 
                group: 15, 
                choices: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2110: {
        text: "Alexa: South Korea. She (1) marketing. She (2) the classes (3) very interesting. Let's go and say hello. Sorry, what (4) your last name again? Vargas?",
        options: [
            { 
                group: 16, 
                choices: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ] 
            },
            { 
                group: 17, 
                choices: [
                    { id: "2-1", text: "says", correct: true },
                    { id: "2-2", text: "say", correct: false },
                    { id: "2-3", text: "saying", correct: false }
                ] 
            },
            { 
                group: 18, 
                choices: [
                    { id: "3-1", text: "is", correct: false },
                    { id: "3-2", text: "are", correct: true },
                    { id: "3-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 19, 
                choices: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2111: {
        text: "Arturo: Actually, it (1) Valdez",
        options: [
            { 
                group: 20, 
                choices: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2112: {
        text: "Alexa: How (1) you spell that?",
        options: [
            { 
                group: 21, 
                choices: [
                    { id: "1-1", text: "is", correct: false },
                    { id: "1-2", text: "are", correct: true },
                    { id: "1-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2113: {
        text: "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.",
        options: [
            { 
                group: 22, 
                choices: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 23, 
                choices: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are", correct: true },
                    { id: "2-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 24, 
                choices: [
                    { id: "3-1", text: "go", correct: true },
                    { id: "3-2", text: "goes", correct: false },
                    { id: "3-3", text: "going", correct: false }
                ] 
            }
        ]
    },
    2114: {
        text: "Karen (1) go to university in Oxford; she (2) to university in Cambridge. She (3) in Cambridge.",
        options: [
            { 
                group: 25, 
                choices: [
                    { id: "1-1", text: "don't", correct: false },
                    { id: "1-2", text: "isn't", correct: false },
                    { id: "1-3", text: "doesn't", correct: true }
                ] 
            },
            { 
                group: 26, 
                choices: [
                    { id: "2-1", text: "go", correct: false },
                    { id: "2-2", text: "goes", correct: true },
                    { id: "2-3", text: "going", correct: false }
                ] 
            },
            { 
                group: 27, 
                choices: [
                    { id: "3-1", text: "lives", correct: true },
                    { id: "3-2", text: "live", correct: false },
                    { id: "3-3", text: "living", correct: false }
                ] 
            }
        ]
    },
    2115: {
        text: "I (1) with my parents in Woodstock, which (2) a small town near Oxford.",
        options: [
            { 
                group: 28, 
                choices: [
                    { id: "1-1", text: "lives", correct: false },
                    { id: "1-2", text: "live", correct: true },
                    { id: "1-3", text: "living", correct: false }
                ] 
            },
            { 
                group: 29, 
                choices: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2116: {
        text: "It (1) difficult sometimes because we (2) each other only on weekends.",
        options: [
            { 
                group: 30, 
                choices: [
                    { id: "1-1", text: "is", correct: true },
                    { id: "1-2", text: "are", correct: false },
                    { id: "1-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 31, 
                choices: [
                    { id: "2-1", text: "see", correct: true },
                    { id: "2-2", text: "sees", correct: false },
                    { id: "2-3", text: "seeing", correct: false }
                ] 
            }
        ]
    },
    2117: {
        text: "Karen (1) history, and she (2) her course. She (3) the architecture in Cambridge (4) beautiful.",
        options: [
            { 
                group: 32, 
                choices: [
                    { id: "1-1", text: "studies", correct: true },
                    { id: "1-2", text: "study", correct: false },
                    { id: "1-3", text: "studying", correct: false }
                ] 
            },
            { 
                group: 33, 
                choices: [
                    { id: "2-1", text: "love", correct: false },
                    { id: "2-2", text: "loves", correct: true },
                    { id: "2-极", text: "loving", correct: false }
                ] 
            },
            { 
                group: 34, 
                choices: [
                    { id: "3-1", text极 "says", correct: true },
                    { id: "3-2", text: "say", correct: false },
                    { id: "3-3", text: "saying", correct: false }
                ] 
            },
            { 
                group: 35, 
                choices: [
                    { id: "4-1", text: "is", correct: true },
                    { id: "4-2", text: "are", correct: false },
                    { id: "4-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2118: {
        text: "I (1) philosophy and politics, so my courses (2) very different from hers.",
        options: [
            { 
                group: 36, 
                choices: [
                    { id: "1-1", text: "studies", correct: false },
                    { id: "1-2", text: "study", correct: true },
                    { id: "1-3", text: "studying", correct: false }
                ] 
            },
            { 
                group: 37, 
                choices: [
                    { id: "2-1", text: "is", correct: false },
                    { id: "2-2", text: "are",极 true },
                    { id: "2-3", text: "am", correct: false }
                ] 
            }
        ]
    },
    2119: {
        text: "I (1) living in Woodstock because my family (2) there and it (3) quiet, but I (4) Karen a lot.",
        options: [
            { 
                group: 38, 
                choices: [
                    { id: "1-1", text: "like", correct: true },
                    { id: "1-2", text: "likes", correct: false },
                    { id: "1-3", text: "liking", correct: false }
                ] 
            },
            { 
                group: 39, 
                choices: [
                    { id: "2-1", text: "is", correct: true },
                    { id: "2-2", text: "are", correct: false },
                    { id: "2-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 40, 
                choices: [
                    { id: "3-1", text: "is", correct: true },
                    { id: "3-2", text: "are", correct: false },
                    { id: "3-3", text: "am", correct: false }
                ] 
            },
            { 
                group: 41, 
                choices: [
                    { id: "4-1", text: "miss", correct: true },
                    { id: "4-2", text: "misses", correct: false },
                    { id: "4-3", text: "missing", correct: false }
                ] 
            }
        ]
    },
    2120: {
        text: "We (1) on the phone every night and we (2) each other whenever we can.",
        options: [
            { 
                group: 42, 
                choices: [
                    { id: "1-1", text: "talk", correct: true },
                    { id: "1-2", text: "talks", correct: false },
                    { id: "1-3", text: "talking", correct: false }
                ] 
            },
            { 
                group: 43, 
                choices: [
                    { id: "2-1", text: "visit", correct: true },
                    { id: "2-2", text: "visits", correct: false },
                    { id: "2-3", text: "visiting", correct: false }
                ] 
            }
        ]
    }
};

// 无选项的画面文本
const screenTexts = {
    2100: "Welcome to the journey of English tenses",
    2101: "Arturo: Hello, I'm Arturo Valdez.",
    2104: "Alexa: Brazil. How about you?",
    2121: "" // 得分画面
};

// 初始化游戏
function initGame() {
    // 生成唯一的房间ID（基于当前时间）
    const now = new Date();
    gameState.roomId = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
    
    // 显示开始画面
    showScreen(2100);
    
    // 添加事件监听
    document.addEventListener('click', handleClickEvents);
}

// 显示指定画面
function showScreen(screenId) {
    // 隐藏所有画面
    const allScreens = document.querySelectorAll('.game-screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 显示指定画面
    const currentScreen = document.getElementById(`screen-${screenId}`);
    if (currentScreen) {
        currentScreen.classList.add('active');
        gameState.currentScreen = screenId;
    } else {
        createScreen(screenId);
    }
}

// 创建游戏画面
function createScreen(screenId) {
    const gameContainer = document.getElementById('game-container');
    
    // 创建画面元素
    const screen = document.createElement('div');
    screen.id = `screen-${screenId}`;
    screen.className = 'game-screen';
    
    // 根据画面ID创建不同内容
    if (screenId === 2100) {
        // 开始画面
        const img = document.createElement('img');
        img.src = 'images/开始画面.jpg';
        img.className = 'game-image';
        img.alt = 'Welcome image';
        img.onerror = () => handleImageError(img);
        
        const textDisplay = document.createElement('div');
        textDisplay.className = 'text-display';
        textDisplay.textContent = screenTexts[screenId];
        
        const beginBtn = document.createElement('button');
        beginBtn.className = 'begin-button';
        beginBtn.textContent = 'Begin';
        beginBtn.onclick = () => showScreen(2101);
        
        screen.appendChild(img);
        screen.appendChild(textDisplay);
        screen.appendChild(beginBtn);
    } 
    else if (screenId === 2121) {
        // 得分画面
        calculateScore();
        
        const scoreImg = document.createElement('img');
        scoreImg.className = 'game-image';
        scoreImg.alt = 'Score background';
        // 根据得分选择图片
        scoreImg.src = gameState.score >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
        scoreImg.onerror = () => handleImageError(scoreImg);
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = `得分: ${Math.round(gameState.score)}`;
        
        screen.appendChild(scoreImg);
        screen.appendChild(scoreDisplay);
        
        // 保存得分到Firebase
        saveScoreToFirebase();
    }
    else {
        // 常规对话画面
        const question = questions[screenId];
        const text = screenTexts[screenId];
        
        // 添加图片
        const img = document.createElement('img');
        // 计算图片序号（从画面01到画面20）
        const imageNumber = screenId - 2100;
        const imageName = imageNumber < 10 ? `画面0${imageNumber}` : `画面${imageNumber}`;
        img.src = `images/${imageName}.jpg`;
        img.className = 'game-image';
        img.alt = `Dialogue scene ${imageNumber}`;
        img.onerror = () => handleImageError(img);
        screen.appendChild(img);
        
        // 添加文字显示
        const textDisplay = document.createElement('div');
        textDisplay.className = 'text-display';
        textDisplay.textContent = text || (question ? question.text : '');
        screen.appendChild(textDisplay);
        
        // 添加选项按钮（如果有）
        if (question && question.options && question.options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            question.options.forEach(optionGroup => {
                const optionRow = document.createElement('div');
                optionRow.className = 'option-row';
                
                // 添加行编号
                const rowNumber = document.createElement('div');
                rowNumber.className = 'row-number';
                rowNumber.textContent = getGroupNumber(optionGroup.group);
                optionRow.appendChild(rowNumber);
                
                // 添加选项按钮
                optionGroup.choices.forEach(choice => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.dataset.id = choice.id;
                    button.dataset.correct = choice.correct;
                    button.dataset.group = optionGroup.group;
                    button.textContent = choice.text;
                    optionRow.appendChild(button);
                });
                
                optionsContainer.appendChild(optionRow);
            });
            
            screen.appendChild(optionsContainer);
        }
        
        // 添加Continue按钮
        const continueBtn = document.createElement('button');
        continueBtn.className = 'continue-button';
        continueBtn.textContent = 'Continue';
        continueBtn.onclick = () => handleContinue(screenId);
        screen.appendChild(continueBtn);
    }
    
    gameContainer.appendChild(screen);
    screen.classList.add('active');
    gameState.currentScreen = screenId;
}

// 处理点击事件
function handleClickEvents(e) {
    if (e.target.classList.contains('option-button')) {
        const button = e.target;
        const group = button.dataset.group;
        const row = button.parentElement;
        
        // 取消同行中其他按钮的选中状态
        const siblings = row.querySelectorAll('.option-button');
        siblings.forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 设置当前按钮为选中状态
        button.classList.add('selected');
        
        // 存储选择结果
        const screenId = gameState.currentScreen;
        if (!gameState.selectedOptions[screenId]) {
            gameState.selectedOptions[screenId] = {};
        }
        
        gameState.selectedOptions[screenId][group] = {
            id: button.dataset.id,
            value: button.textContent,
            correct: button.dataset.correct === 'true'
        };
    }
}

// 处理Continue按钮点击
function handleContinue(screenId) {
    const question = questions[screenId];
    
    // 检查是否所有选项都已选择（如果有选项的话）
    if (question && question.options && question.options.length > 0) {
        const selectedOptions = gameState.selectedOptions[screenId] || {};
        let allSelected = true;
        
        // 检查每组是否都有选择
        question.options.forEach(optionGroup => {
            if (!selectedOptions[optionGroup.group]) {
                allSelected = false;
            }
        });
        
        if (!allSelected) {
            showAlert('Please complete all multiple-choice questions before continuing');
            return;
        }
    }
    
    // 跳转到下一画面
    const nextScreenId = screenId + 1;
    if (nextScreenId <= 2121) {
        showScreen(nextScreenId);
    }
}

// 计算得分
function calculateScore() {
    let correctCount = 0;
    
    // 遍历所有已保存的选择
    for (const screenId in gameState.selectedOptions) {
        const options = gameState.selectedOptions[screenId];
        for (const group in options) {
            if (options[group].correct) {
                correctCount++;
            }
        }
    }
    
    // 计算得分：正确数量 * 4.55，然后四舍五入到整数
    gameState.totalCorrect = correctCount;
    gameState.score = correctCount * 4.55;
}

// 保存得分到Firebase
function saveScoreToFirebase() {
    if (gameState.roomId) {
        try {
            const scoresRef = database.ref('scores/' + gameState.roomId);
            scoresRef.set({
                score: Math.round(gameState.score),
                correctAnswers: gameState.totalCorrect,
                totalQuestions: 43, // 从第22组到第43组共22组按钮
                timestamp: new Date().toISOString()
            }).then(() => {
                console.log('Score saved to Firebase successfully');
            }).catch((error) => {
                console.error('Error saving score to Firebase:', error);
            });
        } catch (error) {
            console.error('Firebase error:', error);
        }
    }
}

// 显示提示框
function showAlert(message) {
    // 移除现有的提示框
    const existingAlert = document.querySelector('.alert-box');
    if (existingAlert) {
        document.body.removeChild(existingAlert);
    }
    
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    alertBox.style.display = 'block';
    
    // 3秒后隐藏提示框
    setTimeout(() => {
        alertBox.style.display = 'none';
        document.body.removeChild(alertBox);
    }, 3000);
}

// 获取组号标识
function getGroupNumber(groupIndex) {
    const groupNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
    return groupNumbers[groupIndex - 1] || groupIndex;
}

// 图片加载错误处理
function handleImageError(img) {
    console.error(`无法加载图片: ${img.src}`);
    img.style.display = 'none';
    
    // 创建替代文本
    const altText = document.createElement('div');
    altText.className = 'image-alt-text';
    altText.style.padding = '20px';
    altText.style.textAlign = 'center';
    altText.style.backgroundColor = '#333';
    altText.style.color = '#fff';
    altText.textContent = `图片加载失败: ${img.alt}`;
    img.parentNode.insertBefore(altText, img.nextSibling);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    // 预加载所有图片
    const imageUrls = [];
    for (let i = 0; i <= 20; i++) {
        const imageName = i === 0 ? '开始画面' : `画面${i < 10 ? '0' + i : i}`;
        imageUrls.push(`images/${imageName}.jpg`);
    }
    imageUrls.push('images/及格.jpg', 'images/不及格.jpg');
    
    // 图片预加载
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                console.log('所有图片预加载完成');
                initGame();
            }
        };
        img.onerror = () => {
            console.error(`图片预加载失败: ${url}`);
            loadedCount++;
            if (loadedCount === totalImages) {
                initGame();
            }
        };
    });
    
    // 如果所有图片加载失败，仍然初始化游戏
    setTimeout(() => {
        if (loadedCount < totalImages) {
            console.log('图片预加载超时，继续初始化游戏');
            initGame();
        }
    }, 5000);
});

// 防止浏览器默认行为
document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// 处理页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面被隐藏');
    } else {
        console.log('页面恢复可见');
    }
});

// 处理页面卸载
window.addEventListener('beforeunload', function(e) {
    // 可选：在用户离开前提示
    // const message = '确定要离开游戏吗？您的进度可能会丢失。';
    // e.returnValue = message;
    // return message;
});

// 全局错误处理
window.addEventListener('error', function(e) {
    console.error('全局错误捕获:', e.error);
    showAlert('发生了一个错误，请刷新页面重试。');
});

// Firebase错误处理
database.ref('.info/connected').on('value', function(snapshot) {
    if (snapshot.val() === true) {
        console.log('Connected to Firebase');
    } else {
        console.log('Disconnected from Firebase');
    }
});
