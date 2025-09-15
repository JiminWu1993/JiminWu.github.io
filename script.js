<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>英语时态之旅</title>
    <link href="https://fonts.googleapis.com/css2?family=Microsoft+YaHei&display=swap" rel="stylesheet">
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Microsoft YaHei', sans-serif;
            background-color: black;
            color: white;
            overflow: hidden;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #game-container {
            width: 100%;
            max-width: 500px;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
        }

        .game-screen {
            width: 100%;
            height: 100%;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
        }

        .game-screen.active {
            display: flex;
        }

        .page-title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            margin-bottom: 10px;
        }

        .title-text {
            font-family: 'Microsoft YaHei', sans-serif;
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
        }

        .progress-bar {
            width: 60%;
            height: 10px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background-color: #4CAF50;
            transition: width 0.3s ease;
        }

        .game-image {
            width: 100%;
            max-height: 40%;
            object-fit: contain;
            border-radius: 5px;
        }

        .text-content {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            font-size: 1.1rem;
            line-height: 1.5;
        }

        .buttons-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 10px 0;
        }

        .button-row {
            display: flex;
            justify-content: space-around;
            width: 100%;
            position: relative;
            border: 1px solid white;
            border-radius: 5px;
            padding: 10px 5px;
        }

        .button-row-number {
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-size: 1.2rem;
        }

        .choice-button {
            background-color: #1E90FF;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            flex: 1;
            margin: 0 5px;
        }

        .choice-button.selected {
            background-color: #0066CC;
            font-weight: bold;
        }

        .continue-button {
            background-color: #1E90FF;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 5px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            width: 100%;
        }

        .continue-button:disabled {
            background-color: #666;
            cursor: not-allowed;
        }

        .score-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin-top: 20px;
        }

        .score-button {
            background-color: #1E90FF;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 5px;
            font-size: 1.1rem;
            cursor: pointer;
        }

        .score-button.disabled {
            background-color: #666;
            cursor: not-allowed;
        }

        #alert-box {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            background-color: yellow;
            color: black;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            z-index: 1000;
            display: none;
        }

        #alert-box.show {
            display: block;
            animation: fadeOut 3s forwards;
        }

        @keyframes fadeOut {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; display: none; }
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: #222;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-height: 80%;
            overflow-y: auto;
        }

        .modal h3 {
            margin-bottom: 15px;
            text-align: center;
        }

        #correct-answers {
            margin-bottom: 20px;
            line-height: 1.6;
        }

        #confirm-answers {
            background-color: #1E90FF;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }

        .hidden {
            display: none !important;
        }

        .score-display {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <!-- 游戏内容将通过JavaScript动态生成 -->
    </div>

    <!-- 提示框 -->
    <div id="alert-box" class="hidden">
        <div id="alert-content"></div>
    </div>

    <!-- 答案显示框 -->
    <div id="answers-modal" class="modal hidden">
        <div class="modal-content">
            <h3>正确答案</h3>
            <div id="correct-answers">
                <p>My name's Nick. My girlfriend's name is Karen.</p>
                <p>We're students. I go to university in Oxford.</p>
                <p>Karen doesn't go to university in Oxford; she goes to university in Cambridge.</p>
                <p>She lives in Cambridge. I live with my parents in Woodstock, which is a small town near Oxford.</p>
                <p>It's difficult sometimes because we see each other only on weekends.</p>
                <p>Karen studies history, and she loves her course. She says the architecture in Cambridge is beautiful.</p>
                <p>I study philosophy and politics, so my courses are very different from hers.</p>
                <p>I like living in Woodstock because my family is there and it's quiet, but I miss Karen a lot.</p>
                <p>We talk on the phone every night and we visit each other whenever we can.</p>
            </div>
            <button id="confirm-answers">Confirm</button>
        </div>
    </div>

    <script>
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
            scores: {},
            selectedAnswers: {},
            testAttempts: 0
        };

        // 页面配置
        const pageConfigs = {
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "is", correct: true },
                            { text: "am", correct: false },
                            { text: "are", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "lives", correct: true },
                            { text: "live", correct: false },
                            { text: "living", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "loves", correct: false },
                            { text: "love", correct: true },
                            { text: "loving", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "is", correct: true },
                            { text: "am", correct: false },
                            { text: "are", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
                            { text: "loves", correct: true },
                            { text: "love", correct: false },
                            { text: "loving", correct: false }
                        ]
                    },
                    {
                        id: "4",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "is", correct: true },
                            { text: "are", correct: false },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "is", correct: false },
                            { text: "are", correct: true },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "is", correct: false },
                            { text: "are", correct: true },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "studies", correct: true },
                            { text: "study", correct: false },
                            { text: "studying", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "says", correct: true },
                            { text: "say", correct: false },
                            { text: "saying", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
                            { text: "is", correct: false },
                            { text: "are", correct: true },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "4",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "is", correct: true },
                            { text: "are", correct: false },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "is", correct: false },
                            { text: "are", correct: true },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "don't", correct: false },
                            { text: "isn't", correct: false },
                            { text: "doesn't", correct: true }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "go", correct: false },
                            { text: "goes", correct: true },
                            { text: "going", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
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
                text: "I ① with my parents in Woodstock, which ② a small town near Oxford.",
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "lives", correct: false },
                            { text: "live", correct: true },
                            { text: "living", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "is", correct: true },
                            { text: "are", correct: false },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                choices: [
                    {
                        id: "1",
                        options: [
                           极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。
                            { text: "studies", correct: true },
                            { text: "study", correct: false },
                            { text: "studying", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "love", correct: false },
                            { text: "loves", correct: true },
                            { text: "loving", correct: false }
                        ]
                    },
                    {
                        id: "极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。3",
                        options: [
                            { text: "says", correct: true },
                            { text: "say", correct: false },
                            { text: "saying",极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。 correct: false }
                        ]
                    },
                    {
                        id: "4",
                        options: [
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
                text: "I ① philosophy and politics, so my courses ② very different from hers.",
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "studies", correct: false },
                            { text: "study", correct: true },
                            { text: "studying", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。is", correct: false },
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "like", correct: true },
                            { text: "likes", correct: false },
                            { text: "liking", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
                            { text: "is", correct: true },
                            { text: "are", correct: false },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "3",
                        options: [
                            { text: "is", correct: true },
                            { text: "are", correct: false },
                            { text: "am", correct: false }
                        ]
                    },
                    {
                        id: "4",
                        options: [
                            { text: "miss", correct: true },
                            { text: "misses", correct: false },
                            { text: "missing", correct:极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。 false }
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
                choices: [
                    {
                        id: "1",
                        options: [
                            { text: "talk", correct: true },
                            { text: "talks", correct: false },
                            { text: "talking", correct: false }
                        ]
                    },
                    {
                        id: "2",
                        options: [
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
                image: (score) => score >= 60 ? "及格.jpg" : "不及格.jpg",
                text: (score) => `Your score is: ${score}`,
                buttons: [
                    { 
                        text: "Next Chapter", 
                        target: null, 
                        condition: (score, attempts) => attempts > 1 || score >= 60 
                    },
                    { text: "Show the answers", target: "show_answers" },
                    { text: "Try Again", target: 2113 }
                ]
            }
        };

        // 初始化游戏
        function initGame() {
            loadPage(2100);
            setupEventListeners();
        }

        // 加载页面
        function loadPage(pageId) {
            const config = pageConfigs[pageId];
            if (!config) return;
            
            gameState.currentPage = pageId;
            
            // 隐藏所有页面
            document.querySelectorAll('.game-screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            // 创建或获取页面元素
            let pageElement = document.getElementById(`page-${pageId}`);
            if (!pageElement) {
                pageElement = createPageElement(pageId, config);
                document.getElementById('game-container').appendChild(pageElement);
            }
            
            // 显示当前页面
            pageElement.classList.add('active');
            
            // 更新进度条
            updateProgressBar(config.type, pageId);
            
            // 如果是得分页面，保存分数到Firebase
            if (pageId === 2121) {
                saveScoreToFirebase();
            }
        }

        // 创建页面元素
        function createPageElement(pageId, config) {
            const pageElement = document.createElement('div');
            pageElement.id = `page-${pageId}`;
            pageElement.className = 'game-screen';
            
            // 创建页面标题和进度条
            if (config.type !== "start" && config.type !== "score") {
                const titleDiv = document.createElement('div');
                titleDiv.className = 'page-title';
                
                const titleText = document.createElement('div');
                titleText.className = 'title-text';
                titleText.textContent = config.type === "practice" ? "Practice" : "Test";
                
                const progressDiv = document.createElement('div');
                progressDiv.className = 'progress-bar';
                
                const progressFill = document.createElement('div');
                progressFill.className = 'progress-fill';
                progressFill.id = `progress-${pageId}`;
                
                progressDiv.appendChild(progressFill);
                titleDiv.appendChild(titleText);
                titleDiv.appendChild(progressDiv);
                
                pageElement.appendChild(titleDiv);
            }
            
            // 创建图片
            if (config.image) {
                const img = document.createElement('img');
                img.className = 'game-image';
                // 如果是得分页面，根据分数选择图片
                if (typeof config.image === 'function') {
                    img.src = `images/${config.image(calculateScore())}`;
                } else {
                    img.src = `images/${config.image}`;
                }
                img.alt = `Page ${pageId} image`;
                pageElement.appendChild(img);
            }
            
            // 创建文本内容
            if (config.text) {
                const textDiv = document.createElement('div');
                textDiv.className = 'text-content';
                // 如果是得分页面，显示分数
                if (typeof config.text === 'function') {
                    textDiv.innerHTML = config.text(calculateScore());
                } else {
                    textDiv.innerHTML = config.text;
                }
                pageElement.appendChild(textDiv);
            }
            
            // 创建选择题（如果有）
            if (config.choices) {
                const choicesContainer = document.createElement('div');
                choicesContainer.className = 'buttons-container';
                
                config.choices.forEach((choiceGroup, index) => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'button-row';
                    
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'button-row-number';
                    numberSpan.textContent = String.fromCharCode(9312 + index); // ①, ②, ③, ④
                    
                    rowDiv.appendChild(numberSpan);
                    
                    choiceGroup.options.forEach((option, optIndex) => {
                        const button = document.createElement('button');
                        button.className = 'choice-button';
                        button.textContent = option.text;
                        button.dataset.group = choiceGroup.id;
                        button.dataset.correct = option.correct;
                        button.addEventListener('click', () => selectAnswer(pageId, choiceGroup.id, optIndex, button));
                        
                        // 检查是否已选择此选项
                        if (gameState.selectedAnswers[pageId] && 
                            gameState.selectedAnswers[pageId][choiceGroup.id] === optIndex) {
                            button.classList.add('selected');
                        }
                        
                        rowDiv.appendChild(button);
                    });
                    
                    choicesContainer.appendChild(rowDiv);
                });
                
                pageElement.appendChild(choicesContainer);
            }
            
            // 创建按钮
            if (config.buttons) {
                config.buttons.forEach(buttonConfig => {
                    const button = document.createElement('button');
                    button.className = buttonConfig.text === "Next Chapter" ? 'score-button' : 'continue-button';
                    button.textContent = buttonConfig.text;
                    
                    if (buttonConfig.condition) {
                        const score = calculateScore();
                        const canProceed = buttonConfig.condition(score, gameState.testAttempts);
                        if (!canProceed) {
                            button.classList.add('disabled');
                            button.disabled = true;
                        }
                    }
                    
                    button.addEventListener('click', () => handleButtonClick(buttonConfig.target));
                    
                    if (buttonConfig.text === "Next Chapter" || 
                        buttonConfig.text === "Show the answers" || 
                        buttonConfig.text === "Try Again") {
                        const buttonContainer = document.createElement('div');
                        buttonContainer.className = 'score-buttons';
                        buttonContainer.appendChild(button);
                        pageElement.appendChild(buttonContainer);
                    } else {
                        pageElement.appendChild(button);
                    }
                });
            }
            
            return pageElement;
        }

        // 更新进度条
        function updateProgressBar(type, pageId) {
            const progressFill = document.getElementById(`progress-${pageId}`);
            if (!progressFill) return;
            
            let progress = 0;
            
            if (type === "practice") {
                const practicePages = [2101, 2102, 2103, 极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112];
                const currentIndex = practicePages.indexOf(pageId);
                if (currentIndex !== -1) {
                    progress = (currentIndex + 1) / practicePages.length * 100;
                }
            } else if (type === "test") {
                const testPages = [2113, 2114, 2115, 2116, 2117, 2118, 2119];
                const currentIndex = testPages.indexOf(pageId);
                if (currentIndex !== -1) {
                    progress = (currentIndex + 1) / testPages.length * 100;
                }
            }
            
            progressFill.style.width = `${progress}%`;
        }

        // 选择答案
        function selectAnswer(pageId, groupId, optionIndex, button) {
            // 初始化页面选择记录
            if (!gameState.selectedAnswers[pageId]) {
                gameState.selectedAnswers[pageId] = {};
            }
            
            // 移除同组其他按钮的选中状态
            const groupButtons = document.querySelectorAll(`#page-${pageId} button[data-group="${groupId}"]`);
            groupButtons.forEach(btn => btn.classList.remove('selected'));
            
            // 设置当前按钮为选中状态
            button.classList.add('selected');
            
            // 记录选择
            gameState.selectedAnswers[pageId][groupId] = optionIndex;
        }

        // 处理按钮点击
        function handleButtonClick(target) {
            if (target === "show_answers") {
                showAnswers();
                return;
            }
            
            const currentConfig = pageConfigs[gameState.currentPage];
            
            // 检查是否所有选择题都已作答
            if (currentConfig.choices) {
                const allAnswered = currentConfig.choices.every(choiceGroup => {
                    return gameState.selectedAnswers[gameState.currentPage] && 
                           gameState.selectedAnswers[gameState.currentPage][choiceGroup.id] !== undefined;
                });
                
                if (!allAnswered) {
                    showAlert("Please complete all multiple-choice questions before continuing");
                    return;
                }
            }
            
            // 如果是测试页面，记录得分
            if (currentConfig.type === "test" && currentConfig.choices) {
                recordScores();
            }
            
            // 处理"Try Again"按钮
            if (gameState.currentPage === 2121 && target === 2113) {
                gameState.testAttempts++;
                resetTestAnswers();
            }
            
            // 跳转到目标页面
            if (typeof target === 'number') {
                loadPage(target);
            }
        }

        // 显示提示框
        function showAlert(message) {
            const alertBox = document.getElementById('alert-box');
            const alertContent = document.getElementById('alert-content');
            
            alertContent.textContent = message;
            alertBox.classList.add('show');
            
            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 3000);
        }

        // 记录得分
        function recordScores() {
            const pageId = game极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。State.currentPage;
            const config = pageConfigs[pageId];
            
            if (!config.choices || !gameState.selectedAnswers[pageId]) return;
            
            // 初始化得分记录
            if (!gameState.scores[page极简主义风格是一种设计风格，其核心是"极简主义风格是一种设计风格，其核心是"少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。少即是多"的理念。它强调功能性和简洁性，避免不必要的装饰和元素。Id]) {
                gameState.scores[pageId] = {};
            }
            
            // 计算本页得分
            config.choices.forEach(choiceGroup => {
                const selectedIndex = gameState.selectedAnswers[pageId][choiceGroup.id];
                if (selectedIndex !== undefined) {
                    const isCorrect = choiceGroup.options[selectedIndex].correct;
                    gameState.scores[pageId][choiceGroup.id] = isCorrect;
                }
            });
        }

        // 计算总分
        function calculateScore() {
            let correctCount = 0;
            let totalCount = 0;
            
            // 只计算测试页面的得分（2113-2119）
            for (let pageId = 2113; pageId <= 2119; pageId++) {
                if (gameState.scores[pageId]) {
                    Object.values(gameState.scores[pageId]).forEach(isCorrect => {
                        totalCount++;
                        if (isCorrect) correctCount++;
                    });
                }
            }
            
            // 计算得分（每个正确选项得4.55分）
            const score = Math.round(correctCount * 4.55);
            return Math.min(score, 100); // 确保分数不超过100
        }

        // 重置测试答案
        function resetTestAnswers() {
            for (let pageId = 2113; pageId <= 2119; pageId++) {
                delete gameState.scores[pageId];
                delete gameState.selectedAnswers[pageId];
            }
        }

        // 显示答案
        function showAnswers() {
            const answersModal = document.getElementById('answers-modal');
            answersModal.classList.remove('hidden');
        }

        // 设置事件监听器
        function setupEventListeners() {
            // 确认答案按钮
            document.getElementById('confirm-answers').addEventListener('click', () => {
                document.getElementById('answers-modal').classList.add('hidden');
            });
        }

        // 保存分数到Firebase
        function saveScoreToFirebase() {
            const score = calculateScore();
            const now = new Date();
            const roomId = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
            
            database.ref('scores/' + roomId).set({
                score: score,
                timestamp: now.toString()
            }).catch(error => {
                console.error("Error saving score to Firebase:", error);
            });
        }

        // 初始化游戏
        document.addEventListener('DOMContentLoaded', initGame);
    </script>
</body>
</html>
