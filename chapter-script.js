// 游戏章节脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    const playerId = urlParams.get('player');
    const isTeacher = urlParams.get('role') === 'teacher';
    
    // 游戏状态
    let gameState = {
        currentScreen: 2101,
        selectedAnswers: {},
        startTime: null,
        timeSpent: 0,
        score: 0,
        correctAnswers: 0
    };
    
    // 如果玩家加入房间，开始计时
    if (playerId) {
        gameState.startTime = Date.now();
        startTimer();
    }
    
    // 如果是老师，只显示排行榜
    if (isTeacher) {
        showRankingScreen(roomId);
        return;
    }
    
    // 加载第一个游戏画面
    loadScreen(2101);
    
    // 开始计时器
    function startTimer() {
        setInterval(() => {
            if (gameState.startTime) {
                gameState.timeSpent = Math.floor((Date.now() - gameState.startTime) / 1000);
                // 更新数据库中的时间
                updatePlayerData();
            }
        }, 1000);
    }
    
    // 更新玩家数据
    function updatePlayerData() {
        if (!roomId || !playerId) return;
        
        const playerRef = database.ref('rooms/' + roomId + '/players/' + playerId);
        const progress = Math.floor((gameState.currentScreen - 2100) / 21 * 100);
        
        playerRef.update({
            score: gameState.score,
            correctAnswers: gameState.correctAnswers,
            progress: progress,
            timeSpent: gameState.timeSpent,
            status: gameState.currentScreen === 2113 ? 'finished' : 'playing'
        });
    }
    
    // 加载游戏画面
    function loadScreen(screenId) {
        gameState.currentScreen = screenId;
        updatePlayerData();
        
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        
        if (screenId === 2113) {
            // 显示排行榜
            showRankingScreen(roomId);
            return;
        }
        
        // 创建屏幕元素
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.id = `screen-${screenId}`;
        
        // 添加背景图片
        const img = document.createElement('img');
        img.src = `images/画面${screenId.toString().substring(1)}.jpg`;
        img.alt = `Scene ${screenId}`;
        img.className = 'background-image fade-in';
        screen.appendChild(img);
        
        // 添加文字内容
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        const textContent = getTextContent(screenId);
        textContainer.innerHTML = formatTextWithPlaceholders(textContent, screenId);
        screen.appendChild(textContainer);
        
        // 添加选项按钮
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        const buttonConfig = getButtonConfig(screenId);
        for (const row of buttonConfig) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'option-row';
            
            for (const btn of row) {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = btn.name;
                button.dataset.correct = btn.correct;
                button.addEventListener('click', function() {
                    handleOptionClick(this, screenId, btn.id);
                });
                
                // 如果已经选择过这个选项，标记为已选择
                if (gameState.selectedAnswers[screenId] === btn.id) {
                    button.classList.add('selected');
                }
                
                rowDiv.appendChild(button);
            }
            
            optionsContainer.appendChild(rowDiv);
        }
        
        screen.appendChild(optionsContainer);
        
        // 添加Continue按钮
        const continueContainer = document.createElement('div');
        continueContainer.className = 'continue-btn-container';
        
        const continueBtn = document.createElement('button');
        continueBtn.className = 'primary-btn';
        continueBtn.textContent = 'Continue';
        continueBtn.addEventListener('click', function() {
            goToNextScreen(screenId);
        });
        
        continueContainer.appendChild(continueBtn);
        screen.appendChild(continueContainer);
        
        gameContainer.appendChild(screen);
        
        // 预加载下一张图片
        if (screenId < 2112) {
            preloadImage(screenId + 1);
        }
    }
    
    // 获取文本内容
    function getTextContent(screenId) {
        const texts = {
            2101: "Arturo: Hello, I'm Arturo Valdez.",
            2102: "Alexa: Hi. My name (1) Alexandra Costa, but please (2) me Alexa.",
            2103: "Arturo: OK. Where (3) you from, Alexa?",
            2104: "Alexa: Brazil. How about you?",
            2105: "Arturo: I'm from Mexico. I (4) here in the city now, but my family (5) in a small town near Guadalajara.",
            2106: "Alexa: Oh, I (6) Mexico! It (7) really beautiful. My brother (8) Mexico, too. Oh, good. Soo-jin (9) here.",
            2107: "Arturo: Who (10) Soo-jin? She (11) familiar.",
            2108: "Alexa: She (12) my classmate. We (13) in the same business class. We (14) our class every Monday and Wednesday.",
            2109: "Arturo: Where (15) she from?",
            2110: "Alexa: South Korea. She (16) marketing. She (17) the classes (18) very interesting. Let's go and say hello. Sorry, what (19) your last name again? Vargas?",
            2111: "Arturo: Actually, it (20) Valdez",
            2112: "Alexa: How (21) you spell that?"
        };
        
        return texts[screenId] || "";
    }
    
    // 格式化文本，处理占位符
    function formatTextWithPlaceholders(text, screenId) {
        if (!gameState.selectedAnswers[screenId]) return text;
        
        // 根据屏幕ID和选择的答案替换占位符
        // 这里需要根据具体题目实现替换逻辑
        return text;
    }
    
    // 获取按钮配置
    function getButtonConfig(screenId) {
        const configs = {
            2102: [
                [
                    { id: "1-1", name: "is", correct: true },
                    { id: "1-2", name: "am", correct: false },
                    { id: "1-3", name: "are", correct: false }
                ],
                [
                    { id: "2-1", name: "calls", correct: false },
                    { id: "2-2", name: "call", correct: true },
                    { id: "2-3", name: "calling", correct: false }
                ]
            ],
            // 其他屏幕的按钮配置...
            2103: [
                [
                    { id: "3-1", name: "is", correct: false },
                    { id: "3-2", name: "are", correct: true },
                    { id: "3-3", name: "am", correct: false }
                ]
            ],
            // 更多配置...
        };
        
        return configs[screenId] || [];
    }
    
    // 处理选项点击
    function handleOptionClick(button, screenId, optionId) {
        // 移除同一行的其他选项的选择状态
        const row = button.parentElement;
        const buttons = row.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        // 标记当前选项为已选择
        button.classList.add('selected');
        
        // 保存选择
        gameState.selectedAnswers[screenId] = optionId;
        
        // 如果选择正确，更新分数
        if (button.dataset.correct === "true") {
            gameState.score += 6.7;
            gameState.correctAnswers++;
            updatePlayerData();
        }
    }
    
    // 前往下一个屏幕
    function goToNextScreen(currentScreenId) {
        const nextScreenId = currentScreenId + 1;
        loadScreen(nextScreenId);
    }
    
    // 预加载图片
    function preloadImage(screenId) {
        const img = new Image();
        img.src = `images/画面${screenId.toString().substring(1)}.jpg`;
    }
    
    // 显示排行榜
    function showRankingScreen(roomId) {
        const gameContainer = document.getElementById('game-container');
        const rankingScreen = document.getElementById('ranking-screen');
        
        gameContainer.style.display = 'none';
        rankingScreen.classList.add('active');
        
        // 显示房间信息
        document.getElementById('room-id-display').textContent = roomId;
        
        // 监听排行榜数据变化
        if (roomId) {
            listenForRankingUpdates(roomId);
        }
    }
    
    // 监听排行榜更新
    function listenForRankingUpdates(roomId) {
        const playersRef = database.ref('rooms/' + roomId + '/players');
        
        playersRef.on('value', (snapshot) => {
            const players = snapshot.val() || {};
            updateRankingTable(players);
            updatePlayerCount(players);
        });
    }
    
    // 更新玩家数量
    function updatePlayerCount(players) {
        const playerCount = Object.keys(players).length;
        document.getElementById('player-count').textContent = playerCount;
    }
    
    // 更新排行榜表格
    function updateRankingTable(players) {
        const rankingBody = document.getElementById('ranking-body');
        rankingBody.innerHTML = '';
        
        // 转换玩家对象为数组并计算总分
        const playersArray = Object.entries(players).map(([id, data]) => {
            // 计算时间分数（每分钟2分，不满一分钟按1分计算）
            const timeMinutes = Math.floor(data.timeSpent / 60);
            const timeSeconds = data.timeSpent % 60;
            const timeScore = timeMinutes * 2 + (timeSeconds > 0 ? 1 : 0);
            
            // 计算总分（正确数*6.7 - 时间分数），不超过100
            let totalScore = (data.correctAnswers || 0) * 6.7 - timeScore;
            totalScore = Math.max(0, Math.min(100, Math.round(totalScore)));
            
            // 计算正确率
            const accuracy = data.correctAnswers ? ((data.correctAnswers / 15) * 100).toFixed(1) : "0.0";
            
            // 格式化时间
            const timeFormatted = `${Math.floor(data.timeSpent / 60)}:${(data.timeSpent % 60).toString().padStart(2, '0')}`;
            
            return {
                id,
                nickname: data.nickname,
                score: totalScore,
                accuracy,
                time: timeFormatted,
                rawScore: totalScore // 用于排序
            };
        });
        
        // 按分数排序
        playersArray.sort((a, b) => b.rawScore - a.rawScore);
        
        // 只显示前10名
        const topPlayers = playersArray.slice(0, 10);
        
        // 填充表格
        topPlayers.forEach((player, index) => {
            const row = document.createElement('tr');
            
            // 如果是当前玩家，高亮显示
            if (playerId && player.id === playerId) {
                row.classList.add('highlight');
            }
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.nickname}</td>
                <td>${player.score}</td>
                <td>${player.accuracy}%</td>
                <td>${player.time}</td>
            `;
            
            rankingBody.appendChild(row);
        });
    }
});
