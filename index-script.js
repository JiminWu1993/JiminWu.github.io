// 主页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const joinRoomBtn = document.getElementById('join-room-btn');
    const createRoomBtn = document.getElementById('create-room-btn');
    const roomInputModal = document.getElementById('room-input-modal');
    const nicknameInputModal = document.getElementById('nickname-input-modal');
    const messageModal = document.getElementById('message-modal');
    const roomNumberInput = document.getElementById('room-number-input');
    const nicknameInput = document.getElementById('nickname-input');
    const confirmRoomBtn = document.getElementById('confirm-room-btn');
    const cancelRoomBtn = document.getElementById('cancel-room-btn');
    const confirmNicknameBtn = document.getElementById('confirm-nickname-btn');
    const cancelNicknameBtn = document.getElementById('cancel-nickname-btn');
    const messageText = document.getElementById('message-text');
    
    let currentRoomId = null;
    
    // 加入房间按钮点击事件
    joinRoomBtn.addEventListener('click', function() {
        roomInputModal.classList.add('active');
    });
    
    // 创建房间按钮点击事件
    createRoomBtn.addEventListener('click', function() {
        createNewRoom();
    });
    
    // 确认房间号按钮点击事件
    confirmRoomBtn.addEventListener('click', function() {
        const roomId = roomNumberInput.value.trim();
        if (roomId.length === 6 && /^\d+$/.test(roomId)) {
            checkRoomExists(roomId);
        } else {
            showMessage('Please enter a valid 6-digit room number');
        }
    });
    
    // 取消房间号输入
    cancelRoomBtn.addEventListener('click', function() {
        roomInputModal.classList.remove('active');
        roomNumberInput.value = '';
    });
    
    // 确认昵称按钮点击事件
    confirmNicknameBtn.addEventListener('click', function() {
        const nickname = nicknameInput.value.trim();
        if (nickname.length > 0 && nickname.length <= 12) {
            joinRoom(currentRoomId, nickname);
        } else {
            showMessage('Nickname must be between 1 and 12 characters');
        }
    });
    
    // 取消昵称输入
    cancelNicknameBtn.addEventListener('click', function() {
        nicknameInputModal.classList.remove('active');
        nicknameInput.value = '';
        roomInputModal.classList.add('active');
    });
    
    // 检查房间是否存在
    function checkRoomExists(roomId) {
        const roomRef = database.ref('rooms/' + roomId);
        
        roomRef.once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    currentRoomId = roomId;
                    roomInputModal.classList.remove('active');
                    nicknameInputModal.classList.add('active');
                } else {
                    showMessage('Room number does not exist', 3000);
                }
            })
            .catch(error => {
                console.error('Error checking room:', error);
                showMessage('Error connecting to server');
            });
    }
    
    // 创建新房间
    function createNewRoom() {
        // 生成6位随机房间号
        const roomId = Math.floor(100000 + Math.random() * 900000).toString();
        const roomRef = database.ref('rooms/' + roomId);
        
        // 检查房间是否已存在
        roomRef.once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    // 如果房间已存在，递归调用创建新房间
                    createNewRoom();
                } else {
                    // 创建新房间
                    const roomData = {
                        createdAt: Date.now(),
                        createdBy: 'teacher',
                        players: {},
                        status: 'waiting'
                    };
                    
                    roomRef.set(roomData)
                        .then(() => {
                            // 设置24小时后自动删除房间
                            setTimeout(() => {
                                roomRef.remove();
                            }, 24 * 60 * 60 * 1000);
                            
                            // 跳转到排行榜页面
                            window.location.href = `chapter.html?room=${roomId}&role=teacher`;
                        })
                        .catch(error => {
                            console.error('Error creating room:', error);
                            showMessage('Failed to create room. Please try again.');
                        });
                }
            })
            .catch(error => {
                console.error('Error checking room:', error);
                showMessage('Error connecting to server');
            });
    }
    
    // 加入房间
    function joinRoom(roomId, nickname) {
        const playerId = generatePlayerId();
        const playerRef = database.ref('rooms/' + roomId + '/players/' + playerId);
        
        const playerData = {
            nickname: nickname,
            joinedAt: Date.now(),
            status: 'waiting',
            score: 0,
            correctAnswers: 0,
            progress: 0,
            timeSpent: 0
        };
        
        playerRef.set(playerData)
            .then(() => {
                nicknameInputModal.classList.remove('active');
                // 跳转到游戏页面
                window.location.href = `chapter.html?room=${roomId}&player=${playerId}`;
            })
            .catch(error => {
                console.error('Error joining room:', error);
                showMessage('Failed to join room. Please try again.');
            });
    }
    
    // 生成玩家ID
    function generatePlayerId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    // 显示消息
    function showMessage(message, duration = 0) {
        messageText.textContent = message;
        messageModal.classList.add('active');
        
        if (duration > 0) {
            setTimeout(() => {
                messageModal.classList.remove('active');
            }, duration);
        }
    }
    
    // 点击消息模态框外部关闭
    messageModal.addEventListener('click', function() {
        messageModal.classList.remove('active');
    });
});
