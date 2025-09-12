// script.js
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
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase初始化成功");
} catch (error) {
    console.error("Firebase初始化失败:", error);
}

// 游戏状态管理
const GameState = {
    currentScreen: 2100,
    score: 0,
    selectedOptions: {}, // 存储每页选项 {pageId: {groupIndex: selectedValue}}
    roomId: null // Firebase房间ID
};

// 问题数据定义
const questions = {
    // 画面02 (ID:2102)
    2102: [
        {
            groupIndex: 0,
            options: ["is", "am", "are"],
            correctAnswer: "is"
        },
        {
            groupIndex: 1,
            options: ["calls", "call", "calling"],
            correctAnswer: "call"
        }
    ],
    // 画面03 (ID:2103)
    2103: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "are"
        }
    ],
    // 画面05 (ID:2105)
    2105: [
        {
            groupIndex: 0,
            options: ["lives", "live", "living"],
            correctAnswer: "live"
        },
        {
            groupIndex: 1,
            options: ["lives", "live", "are living"],
            correctAnswer: "lives"
        }
    ],
    // 画面06 (ID:2106)
    2106: [
        {
            groupIndex: 0,
            options: ["loves", "love", "loving"],
            correctAnswer: "love"
        },
        {
            groupIndex: 1,
            options: ["is", "am", "are"],
            correctAnswer: "is"
        },
        {
            groupIndex: 2,
            options: ["loves", "love", "loving"],
            correctAnswer: "loves"
        },
        {
            groupIndex: 3,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面07 (ID:2107)
    2107: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 1,
            options: ["looks", "look", "looking"],
            correctAnswer: "looks"
        }
    ],
    // 画面08 (ID:2108)
    2108: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 1,
            options: ["is", "are", "am"],
            correctAnswer: "are"
        },
        {
            groupIndex: 2,
            options: ["has", "have", "having"],
            correctAnswer: "have"
        }
    ],
    // 画面09 (ID:2109)
    2109: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面10 (ID:2110)
    2110: [
        {
            groupIndex: 0,
            options: ["studies", "study", "studying"],
            correctAnswer: "studies"
        },
        {
            groupIndex: 1,
            options: ["says", "say", "saying"],
            correctAnswer: "says"
        },
        {
            groupIndex: 2,
            options: ["is", "are", "am"],
            correctAnswer: "are"
        },
        {
            groupIndex: 3,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面11 (ID:2111)
    2111: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面12 (ID:2112)
    2112: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "do"
        }
    ],
    // 画面13 (ID:2113) - 计分
    2113: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 1,
            options: ["is", "are", "am"],
            correctAnswer: "are"
        },
        {
            groupIndex: 2,
            options: ["go", "goes", "going"],
            correctAnswer: "go"
        }
    ],
    // 画面14 (ID:2114) - 计分
    2114: [
        {
            groupIndex: 0,
            options: ["don't", "isn't", "doesn't"],
            correctAnswer: "doesn't"
        },
        {
            groupIndex: 1,
            options: ["go", "goes", "going"],
            correctAnswer: "goes"
        },
        {
            groupIndex: 2,
            options: ["lives", "live", "living"],
            correctAnswer: "lives"
        }
    ],
    // 画面15 (ID:2115) - 计分
    2115: [
        {
            groupIndex: 0,
            options: ["lives", "live", "living"],
            correctAnswer: "live"
        },
        {
            groupIndex: 1,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面16 (ID:2116) - 计分
    2116: [
        {
            groupIndex: 0,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 1,
            options: ["see", "sees", "seeing"],
            correctAnswer: "see"
        }
    ],
    // 画面17 (ID:2117)
    2117: [
        {
            groupIndex: 0,
            options: ["studies", "study", "studying"],
            correctAnswer: "studies"
        },
        {
            groupIndex: 1,
            options: ["love", "loves", "loving"],
            correctAnswer: "loves"
        },
        {
            groupIndex: 2,
            options: ["says", "say", "saying"],
            correctAnswer: "says"
        },
        {
            groupIndex: 3,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        }
    ],
    // 画面18 (ID:2118)
    2118: [
        {
            groupIndex: 0,
            options: ["studies", "study", "studying"],
            correctAnswer: "study"
        },
        {
            groupIndex: 1,
            options: ["is", "are", "am"],
            correctAnswer: "are"
        }
    ],
    // 画面19 (ID:2119)
    2119: [
        {
            groupIndex: 0,
            options: ["like", "likes", "liking"],
            correctAnswer: "like"
        },
        {
            groupIndex: 1,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 2,
            options: ["is", "are", "am"],
            correctAnswer: "is"
        },
        {
            groupIndex: 3,
            options: ["miss", "misses", "missing"],
            correctAnswer: "miss"
        }
    ],
    // 画面20 (ID:2120)
    2120: [
        {
            groupIndex: 0,
            options: ["talk", "talks", "talking"],
            correctAnswer: "talk"
        },
        {
            groupIndex: 1,
            options: ["visit", "visits", "visiting"],
            correctAnswer: "visit"
        }
    ]
};

// 显示提示框
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    if (!alertBox) {
        console.error("提示框元素未找到");
        return;
    }
    
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    
    // 3秒后隐藏提示框
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// 创建选项按钮
function createOptionButton(text, groupIndex, optionIndex, pageId) {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = text;
    button.dataset.groupIndex = groupIndex;
    button.dataset.optionIndex = optionIndex;
    
    button.addEventListener('click', () => {
        // 取消同组中其他按钮的选中状态
        const groupButtons = document.querySelectorAll(`.option-btn[data-group-index="${groupIndex}"]`);
        groupButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 设置当前按钮为选中状态
        button.classList.add('selected');
        
        // 保存选择
        if (!GameState.selectedOptions[pageId]) {
            GameState.selectedOptions[pageId] = {};
        }
        GameState.selectedOptions[pageId][groupIndex] = text;
    });
    
    return button;
}

// 加载问题页面
function loadQuestionPage(pageId) {
    const screen = document.getElementById(`screen-${pageId}`);
    if (!screen) {
        console.error(`页面ID ${pageId} 未找到`);
        return;
    }
    
    // 显示当前页面，隐藏其他页面
    document.querySelectorAll('.game-screen').forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
    
    // 如果是问题页面，设置选项按钮
    if (questions[pageId]) {
        const optionsContainer = screen.querySelector('.options-container');
        if (!optionsContainer) {
            console.error(`选项容器在页面 ${pageId} 中未找到`);
            return;
        }
        
        // 清空现有选项
        optionsContainer.innerHTML = '';
        
        // 创建选项按钮组
        questions[pageId].forEach((question, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'button-group';
            
            // 添加组标签 (①, ②, ③...)
            const label = document.createElement('span');
            label.className = 'group-label';
            // 使用Unicode圆圈数字符号
            label.textContent = String.fromCharCode(0x2460 + groupIndex);
            groupDiv.appendChild(label);
            
            const rowDiv = document.createElement('div');
            rowDiv.className = 'options-row';
            
            // 创建每个选项的按钮
            question.options.forEach((option, optionIndex) => {
                const button = createOptionButton(option, groupIndex, optionIndex, pageId);
                rowDiv.appendChild(button);
            });
            
            groupDiv.appendChild(rowDiv);
            optionsContainer.appendChild(groupDiv);
        });
        
        // 设置继续按钮事件
        const continueBtn = screen.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.onclick = () => {
                // 检查是否所有组都已选择
                const allSelected = questions[pageId].every((_, groupIndex) => {
                    return GameState.selectedOptions[pageId] && 
                           GameState.selectedOptions[pageId][groupIndex] !== undefined;
                });
                
                if (!allSelected) {
                    showAlert("Please complete all multiple-choice questions before continuing");
                    return;
                }
                
                // 计算得分（仅对计分页面）
                if (pageId >= 2113 && pageId <= 2116) {
                    calculateScore(pageId);
                }
                
                // 跳转到下一页
                const nextPageId = parseInt(pageId) + 1;
                loadQuestionPage(nextPageId);
            };
        }
    }
}

// 计算得分
function calculateScore(pageId) {
    if (!questions[pageId] || !GameState.selectedOptions[pageId]) return;
    
    questions[pageId].forEach((question, groupIndex) => {
        const selectedOption = GameState.selectedOptions[pageId][groupIndex];
        if (selectedOption === question.correctAnswer) {
            GameState.score += 1;
        }
    });
}

// 显示最终得分
function showFinalScore() {
    // 计算最终得分 = 正确数量 * 4.55，保留整数
    const finalScore = Math.round(GameState.score * 4.55);
    
    // 保存分数到Firebase
    saveScoreToFirebase(finalScore);
    
    // 显示得分页面
    const scoreScreen = document.getElementById('screen-2121');
    if (!scoreScreen) {
        console.error("得分页面未找到");
        return;
    }
    
    // 设置背景图片
    const backgroundImg = scoreScreen.querySelector('.screen-image');
    if (backgroundImg) {
        backgroundImg.src = finalScore >= 60 ? 'images/及格.jpg' : 'images/不及格.jpg';
        // 添加加载错误处理
        backgroundImg.onerror = function() {
            console.error(`无法加载图片: ${this.src}`);
            this.style.display = 'none';
        };
    }
    
    // 显示得分
    const scoreDisplay = scoreScreen.querySelector('.score-value');
    if (scoreDisplay) {
        scoreDisplay.textContent = finalScore;
    }
    
    // 显示得分页面
    document.querySelectorAll('.game-screen').forEach(s => {
        s.classList.remove('active');
    });
    scoreScreen.classList.add('active');
}

// 保存分数到Firebase
function saveScoreToFirebase(score) {
    try {
        // 生成基于时间的房间ID (MMDDHHmm格式)
        const now = new Date();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        GameState.roomId = `${month}${day}${hours}${minutes}`;
        
        // 获取数据库引用
        const database = firebase.database();
        const scoresRef = database.ref('scores/' + GameState.roomId);
        
        // 保存分数
        scoresRef.set({
            score: score,
            timestamp: now.getTime()
        }).then(() => {
            console.log("分数已保存到Firebase");
        }).catch(error => {
            console.error("保存分数到Firebase失败:", error);
        });
    } catch (error) {
        console.error("Firebase操作错误:", error);
    }
}

// 初始化游戏
function initGame() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error("游戏容器未找到");
        return;
    }
    
    // 创建提示框
    const alertBox = document.createElement('div');
    alertBox.id = 'alert-box';
    alertBox.className = 'alert-box';
    gameContainer.appendChild(alertBox);
    
    // 创建开始画面 (ID:2100)
    const startScreen = document.createElement('div');
    startScreen.id = 'screen-2100';
    startScreen.className = 'game-screen active';
    startScreen.innerHTML = `
        <img src="images/开始画面.jpg" class="screen-image" alt="Welcome">
        <button id="start-btn" class="continue-btn">Begin</button>
    `;
    gameContainer.appendChild(startScreen);
    
    // 设置开始按钮事件
    const startBtn = startScreen.querySelector('#start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            loadQuestionPage(2101);
        });
    }
    
    // 创建所有问题画面
    for (let i = 2101; i <= 2120; i++) {
        const screen = document.createElement('div');
        screen.id = `screen-${i}`;
        screen.className = 'game-screen';
        
        // 构建画面内容
        screen.innerHTML = `
            <img src="images/画面${i.toString().substring(2)}.jpg" class="screen-image" alt="Scene ${i}">
            <div class="text-container">
                ${getTextContentForScreen(i)}
            </div>
            <div class="options-container"></div>
            <button class="continue-btn">Continue</button>
        `;
        
        gameContainer.appendChild(screen);
    }
    
    // 创建得分画面 (ID:2121)
    const scoreScreen = document.createElement('div');
    scoreScreen.id = 'screen-2121';
    scoreScreen.className = 'game-screen';
    scoreScreen.innerHTML = `
        <img src="" class="screen-image" alt="Result">
        <div class="score-container">
            <div class="score-value">0</div>
        </div>
    `;
    gameContainer.appendChild(scoreScreen);
    
    // 预加载图片处理
    preloadImages();
}

// 获取各画面的文本内容
function getTextContentForScreen(screenId) {
    switch(screenId) {
        case 2101: return "Arturo: Hello, I'm Arturo Valdez.";
        case 2102: return "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.";
        case 2103: return "Arturo: OK. Where (1) you from, Alexa?";
        case 2104: return "Alexa: Brazil. How about you?";
        case 2105: return "Arturo: I'm from Mexico. I (1) here in the city now, but my family (2) in a small town near Guadalajara.";
        case 2106: return "Alexa: Oh, I (1) Mexico! It (2) really beautiful. My brother (3) Mexico, too. Oh, good. Soo-jin (4) here.";
        case 2107: return "Arturo: Who (1) Soo-jin? She (2) familiar.";
        case 2108: return "Alexa: She (1) my classmate. We (2) in the same business class. We (3) our class every Monday and Wednesday.";
        case 2109: return "Arturo: Where (1) she from?";
        case 2110: return "Alexa: South Korea. She (1) marketing. She (2) the classes (3) very interesting. Let's go and say hello. Sorry, what (4) your last name again? Vargas?";
        case 2111: return "Arturo: Actually, it (1) Valdez";
        case 2112: return "Alexa: How (1) you spell that?";
        case 2113: return "My name's Nick. My girlfriend's name (1) Karen. We (2) students. I (3) to university in Oxford.";
        case 2114: return "Karen (1) go to university in Oxford; she (2) to university in Cambridge. She (3) in Cambridge.";
        case 2115: return "I (1) with my parents in Woodstock, which (2) a small town near Oxford.";
        case 2116: return "It (1) difficult sometimes because we (2) each other only on weekends.";
        case 2117: return "Karen (1) history, and she (2) her course. She (3) the architecture in Cambridge (4) beautiful.";
        case 2118: return "I (1) philosophy and politics, so my courses (2) very different from hers.";
        case 2119: return "I (1) living in Woodstock because my family (2) there and it (3) quiet, but I (4) Karen a lot.";
        case 2120: return "We (1) on the phone every night and we (2) each other whenever we can.";
        default: return "";
    }
}

// 预加载图片
function preloadImages() {
    const imageUrls = [
        'images/开始画面.jpg'
    ];
    
    // 添加所有画面图片
    for (let i = 1; i <= 20; i++) {
        const num = i < 10 ? `0${i}` : i;
        imageUrls.push(`images/画面${num}.jpg`);
    }
    
    // 添加结果图片
    imageUrls.push('images/及格.jpg');
    imageUrls.push('images/不及格.jpg');
    
    // 预加载所有图片
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        // 添加错误处理
        img.onerror = function() {
            console.error(`无法加载图片: ${url}`);
        };
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    try {
        initGame();
        console.log("游戏初始化完成");
    } catch (error) {
        console.error("游戏初始化失败:", error);
        showAlert("游戏初始化失败，请刷新页面重试");
    }
});

// 防止页面滚动和缩放
document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// 处理键盘事件（防止缩放）
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});
