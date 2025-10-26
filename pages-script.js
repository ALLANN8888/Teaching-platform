// ==================== 页面通用交互功能 ====================

// 显示通知函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '30px';
    notification.style.padding = '20px 30px';
    notification.style.borderRadius = '10px';
    notification.style.color = '#FFF';
    notification.style.fontWeight = '700';
    notification.style.fontSize = '15px';
    notification.style.zIndex = '10000';
    notification.style.minWidth = '300px';
    notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.animation = 'slideIn 0.3s ease';
    
    if (type === 'success') {
        notification.style.background = 'rgba(57, 255, 20, 0.9)';
        notification.style.border = '2px solid var(--crt-green)';
        notification.style.boxShadow += ', 0 0 20px rgba(57, 255, 20, 0.6)';
        notification.innerHTML = `<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 24px;">✓</span><span>${message}</span></div>`;
    } else if (type === 'warning') {
        notification.style.background = 'rgba(255, 140, 0, 0.9)';
        notification.style.border = '2px solid var(--amber-glow)';
        notification.style.boxShadow += ', 0 0 20px rgba(255, 140, 0, 0.6)';
        notification.innerHTML = `<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 24px;">⚠</span><span>${message}</span></div>`;
    } else {
        notification.style.background = 'rgba(0, 204, 255, 0.9)';
        notification.style.border = '2px solid var(--pulse-blue)';
        notification.style.boxShadow += ', 0 0 20px rgba(0, 204, 255, 0.6)';
        notification.innerHTML = `<div style="display: flex; align-items: center; gap: 15px;"><span style="font-size: 24px;">ℹ</span><span>${message}</span></div>`;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transition = 'all 0.5s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// 添加通知动画CSS
if (!document.getElementById('notification-animation-style')) {
    const style = document.createElement('style');
    style.id = 'notification-animation-style';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// 进入课程
document.querySelectorAll('.enter-course-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.progress-card');
        const courseName = card.querySelector('.course-title').textContent;
        showNotification(`正在进入课程：${courseName}`, 'info');
        
        // 按钮点击效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// 任务操作
document.querySelectorAll('.task-action:not(.disabled)').forEach(btn => {
    if (!btn.onclick) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskTitle = this.closest('.task-item').querySelector('.task-title').textContent;
            showNotification(`开始任务：${taskTitle}`, 'success');
            
            // 按钮点击反馈
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// 课程卡片点击
document.querySelectorAll('.progress-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是按钮，不触发卡片点击
        if (e.target.closest('.enter-course-btn')) return;
        
        const courseName = this.querySelector('.course-title').textContent;
        const progress = this.querySelector('.percentage').textContent;
        showNotification(`课程：${courseName} | 进度：${progress}`, 'info');
    });
});

// 资源卡片点击和悬停
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', function(e) {
        // 如果点击的是下载按钮，不触发卡片点击
        if (e.target.closest('.download-btn')) return;
        
        const resourceName = this.querySelector('.resource-title').textContent;
        showNotification(`查看资源：${resourceName}`, 'info');
    });
});

// 课程表单元格点击（增强详细信息）
document.querySelectorAll('.course-name').forEach(courseName => {
    const cell = courseName.closest('.course-cell');
    if (!cell || cell.classList.contains('empty')) return;
    
    cell.style.cursor = 'pointer';
    
    cell.addEventListener('click', function(e) {
        e.stopPropagation();
        const name = this.querySelector('.course-name').textContent;
        const infoText = this.querySelector('.course-info') ? this.querySelector('.course-info').textContent : '暂无详情';
        const infoParts = infoText.split('|').map(s => s.trim());
        const location = infoParts[0] || '未指定';
        const teacher = infoParts[1] || '未指定';
        
        // 获取时间和星期
        const row = this.closest('tr');
        const timeSlot = row.querySelector('.time-slot').textContent;
        const cellIndex = Array.from(row.cells).indexOf(this);
        const weekdays = ['周一', '周二', '周三', '周四', '周五'];
        const weekday = weekdays[cellIndex - 1] || '未知';
        
        // 创建课程详情弹窗
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.85)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.animation = 'fadeIn 0.3s ease';
        
        modal.innerHTML = `
            <div style="
                background: rgba(15, 15, 40, 0.98);
                border: 3px solid var(--pulse-blue);
                border-radius: 15px;
                padding: 40px;
                max-width: 550px;
                width: 90%;
                box-shadow: 0 0 50px rgba(0, 204, 255, 0.8), inset 0 0 30px rgba(0, 204, 255, 0.1);
                backdrop-filter: blur(25px);
                animation: scaleIn 0.3s ease;
            ">
                <h2 style="
                    color: var(--pulse-blue);
                    text-shadow: 0 0 20px var(--pulse-blue);
                    margin-bottom: 30px;
                    font-size: 28px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                ">
                    <span style="font-size: 36px;">📚</span>
                    <span>${name}</span>
                </h2>
                
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; padding: 18px; background: rgba(0, 0, 0, 0.4); border-left: 4px solid var(--crt-green); border-radius: 8px; margin-bottom: 12px;">
                        <span style="font-size: 24px; margin-right: 15px;">📍</span>
                        <div style="flex: 1;">
                            <div style="color: var(--ice-blue); font-size: 13px; margin-bottom: 5px;">上课地点</div>
                            <div style="color: #FFF; font-weight: 700; font-size: 18px;">${location}</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; padding: 18px; background: rgba(0, 0, 0, 0.4); border-left: 4px solid var(--amber-glow); border-radius: 8px; margin-bottom: 12px;">
                        <span style="font-size: 24px; margin-right: 15px;">👨‍🏫</span>
                        <div style="flex: 1;">
                            <div style="color: var(--ice-blue); font-size: 13px; margin-bottom: 5px;">任课教师</div>
                            <div style="color: #FFF; font-weight: 700; font-size: 18px;">${teacher}</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; padding: 18px; background: rgba(0, 102, 255, 0.2); border: 2px solid var(--pulse-blue); border-radius: 8px; margin-bottom: 12px;">
                        <span style="font-size: 24px; margin-right: 15px;">⏰</span>
                        <div style="flex: 1;">
                            <div style="color: var(--pulse-blue); font-size: 13px; margin-bottom: 5px;">上课时间</div>
                            <div style="color: var(--crt-green); font-weight: 700; font-size: 18px; text-shadow: 0 0 8px var(--crt-green);">${weekday} ${timeSlot}</div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <div style="padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; text-align: center;">
                            <div style="color: var(--ice-blue); font-size: 12px; margin-bottom: 8px;">学分</div>
                            <div style="color: #FFF; font-weight: 900; font-size: 24px;">3.5</div>
                        </div>
                        <div style="padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; text-align: center;">
                            <div style="color: var(--ice-blue); font-size: 12px; margin-bottom: 8px;">课程类型</div>
                            <div style="color: var(--neon-pink); font-weight: 700; font-size: 16px;">必修</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button onclick="showNotification('课程详情功能开发中...', 'warning'); this.closest('div[style*=\"position: fixed\"]').remove();" style="
                        flex: 1;
                        padding: 15px;
                        background: rgba(0, 102, 255, 0.3);
                        border: 2px solid var(--electric-blue);
                        border-radius: 8px;
                        color: var(--pulse-blue);
                        font-size: 15px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='var(--electric-blue)'; this.style.color='#FFF';" onmouseout="this.style.background='rgba(0, 102, 255, 0.3)'; this.style.color='var(--pulse-blue)';">\ud83d\udcdd 查看详情</button>
                    
                    <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
                        flex: 1;
                        padding: 15px;
                        background: linear-gradient(135deg, var(--molten-orange), var(--amber-glow));
                        border: none;
                        border-radius: 8px;
                        color: #FFF;
                        font-size: 15px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
                    " onmouseover="this.style.boxShadow='0 0 30px rgba(255, 69, 0, 0.8)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 0 20px rgba(255, 69, 0, 0.5)'; this.style.transform='translateY(0)';">\u2716 关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // 添加点击波纹效果
        this.style.boxShadow = '0 0 25px rgba(0, 204, 255, 0.9), inset 0 0 15px rgba(0, 204, 255, 0.3)';
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 300);
    });
    
    // 悬停效果
    cell.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 204, 255, 0.2)';
        this.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.4)';
    });
    
    cell.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.boxShadow = '';
    });
});

// ==================== 在线咨询功能 ====================

// 发送消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) {
        return;
    }
    
    const messagesContainer = document.getElementById('chatMessages');
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    // 添加用户消息
    const userMessageHTML = `
        <div class="message user">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-text">${escapeHtml(message)}</div>
                <div class="message-time">${timeString}</div>
            </div>
        </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHTML);
    input.value = '';
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 模拟AI回复
    setTimeout(() => {
        const responses = [
            '我已经收到您的问题，正在为您查询相关信息...',
            '关于这个问题，建议您联系相关部门进行详细咨询。',
            '这个功能目前正在开发中，敬请期待！',
            '您可以在系统设置中找到相关选项。',
            '感谢您的咨询，如有其他问题请随时提问。'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const assistantTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds() + 3).padStart(2, '0')}`;
        
        const assistantMessageHTML = `
            <div class="message assistant">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">${randomResponse}</div>
                    <div class="message-time">${assistantTime}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', assistantMessageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 快捷问题
function askQuestion(question) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

// 回车发送
const chatInput = document.getElementById('chatInput');
if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ==================== 资源下载功能（增强） ====================

function downloadResource(resourceName) {
    console.log(`下载资源: ${resourceName}`);
    
    // 创建下载进度提示
    const progressAlert = document.createElement('div');
    progressAlert.style.position = 'fixed';
    progressAlert.style.top = '50%';
    progressAlert.style.left = '50%';
    progressAlert.style.transform = 'translate(-50%, -50%)';
    progressAlert.style.padding = '40px 60px';
    progressAlert.style.background = 'rgba(10, 10, 30, 0.98)';
    progressAlert.style.border = '3px solid var(--crt-green)';
    progressAlert.style.borderRadius = '15px';
    progressAlert.style.color = '#FFFFFF';
    progressAlert.style.fontSize = '18px';
    progressAlert.style.fontWeight = '700';
    progressAlert.style.zIndex = '10001';
    progressAlert.style.boxShadow = '0 0 40px rgba(57, 255, 20, 0.8), inset 0 0 20px rgba(57, 255, 20, 0.1)';
    progressAlert.style.backdropFilter = 'blur(20px)';
    progressAlert.style.animation = 'scaleIn 0.3s ease';
    progressAlert.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 64px; margin-bottom: 20px; animation: pulse 1.5s ease-in-out infinite;">📥</div>
            <div style="color: var(--crt-green); text-shadow: 0 0 15px var(--crt-green); font-size: 20px; margin-bottom: 10px;">
                正在下载
            </div>
            <div style="color: var(--ice-blue); font-size: 16px; margin-bottom: 25px; font-weight: 600;">
                ${resourceName}
            </div>
            <div style="margin-top: 20px; font-size: 15px; color: var(--ice-blue); margin-bottom: 12px;">
                下载进度：<span id="downloadProgress" style="color: var(--crt-green); font-size: 24px; font-weight: 900; text-shadow: 0 0 10px var(--crt-green);">0</span><span style="color: var(--crt-green); font-size: 18px;">%</span>
            </div>
            <div style="width: 400px; height: 12px; background: rgba(0,0,0,0.6); border-radius: 15px; margin-top: 15px; overflow: hidden; border: 2px solid rgba(57, 255, 20, 0.3);">
                <div id="progressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--crt-green), var(--pulse-blue)); border-radius: 15px; transition: width 0.3s ease; box-shadow: 0 0 15px var(--crt-green); position: relative;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); animation: progressShine 1.5s linear infinite;"></div>
                </div>
            </div>
            <div id="downloadSpeed" style="margin-top: 15px; font-size: 13px; color: var(--ice-blue); opacity: 0.8;">
                下载速度：<span style="color: var(--pulse-blue);">0 MB/s</span>
            </div>
        </div>
    `;
    
    // 添加背景遮罩
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.background = 'rgba(0, 0, 0, 0.7)';
    backdrop.style.zIndex = '10000';
    backdrop.style.animation = 'fadeIn 0.3s ease';
    
    document.body.appendChild(backdrop);
    document.body.appendChild(progressAlert);
    
    // 模拟下载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                progressAlert.style.transition = 'all 0.3s ease';
                progressAlert.style.opacity = '0';
                progressAlert.style.transform = 'translate(-50%, -50%) scale(0.8)';
                backdrop.style.transition = 'opacity 0.3s ease';
                backdrop.style.opacity = '0';
                
                setTimeout(() => {
                    progressAlert.remove();
                    backdrop.remove();
                    showNotification(`✓ ${resourceName} 下载完成！`, 'success');
                }, 300);
            }, 500);
        }
        
        const progressSpan = document.getElementById('downloadProgress');
        const progressBar = document.getElementById('progressBar');
        const speedSpan = document.getElementById('downloadSpeed');
        
        if (progressSpan && progressBar) {
            progressSpan.textContent = Math.floor(progress);
            progressBar.style.width = progress + '%';
        }
        
        if (speedSpan) {
            const speed = (Math.random() * 5 + 2).toFixed(2);
            speedSpan.innerHTML = `下载速度：<span style="color: var(--pulse-blue);">${speed} MB/s</span>`;
        }
    }, 200);
}

// 添加进度条动画
if (!document.getElementById('progress-shine-style')) {
    const style = document.createElement('style');
    style.id = 'progress-shine-style';
    style.textContent = `
        @keyframes progressShine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// ==================== 课程表周次切换 ====================

document.querySelectorAll('.week-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const weekNum = this.textContent;
        console.log(`切换到${weekNum}`);
        
        // 这里可以添加加载对应周次课程的逻辑
        // 暂时显示提示
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '30px';
        notification.style.padding = '15px 25px';
        notification.style.background = 'rgba(0, 204, 255, 0.9)';
        notification.style.border = '2px solid var(--pulse-blue)';
        notification.style.borderRadius = '8px';
        notification.style.color = '#000';
        notification.style.fontWeight = '700';
        notification.style.fontSize = '14px';
        notification.style.zIndex = '10000';
        notification.style.boxShadow = '0 0 20px rgba(0, 204, 255, 0.6)';
        notification.textContent = `已切换到${weekNum}课程表`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s ease';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    });
});

// ==================== 成绩表格交互（增强） ====================

document.querySelectorAll('.grade-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    
    row.addEventListener('click', function() {
        const courseName = this.cells[0].textContent;
        const credit = this.cells[1].textContent;
        const regular = this.cells[2].textContent;
        const final = this.cells[3].textContent;
        const total = this.cells[4].textContent.replace(/[^0-9]/g, '');
        const gpa = this.cells[5].textContent;
        
        // 创建详细信息弹窗
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.animation = 'fadeIn 0.3s ease';
        
        modal.innerHTML = `
            <div style="
                background: rgba(15, 15, 40, 0.95);
                border: 3px solid var(--pulse-blue);
                border-radius: 15px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 0 40px rgba(0, 204, 255, 0.6);
                backdrop-filter: blur(20px);
                animation: scaleIn 0.3s ease;
            ">
                <h2 style="
                    color: var(--pulse-blue);
                    text-shadow: 0 0 15px var(--pulse-blue);
                    margin-bottom: 30px;
                    font-size: 24px;
                    text-align: center;
                ">📊 ${courseName}</h2>
                
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; margin-bottom: 10px;">
                        <span style="color: var(--ice-blue);">学分：</span>
                        <span style="color: #FFF; font-weight: 700;">${credit}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; margin-bottom: 10px;">
                        <span style="color: var(--ice-blue);">平时成绩：</span>
                        <span style="color: #FFF; font-weight: 700;">${regular} 分</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; margin-bottom: 10px;">
                        <span style="color: var(--ice-blue);">期末成绩：</span>
                        <span style="color: #FFF; font-weight: 700;">${final} 分</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 102, 255, 0.2); border: 2px solid var(--pulse-blue); border-radius: 8px; margin-bottom: 10px;">
                        <span style="color: var(--pulse-blue); font-weight: 700;">总评成绩：</span>
                        <span style="color: var(--crt-green); font-weight: 900; font-size: 24px; text-shadow: 0 0 10px var(--crt-green);">${total} 分</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">
                        <span style="color: var(--ice-blue);">绩点：</span>
                        <span style="color: #FFF; font-weight: 700;">${gpa}</span>
                    </div>
                </div>
                
                <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, var(--electric-blue), var(--pulse-blue));
                    border: none;
                    border-radius: 8px;
                    color: #FFF;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
                " onmouseover="this.style.background='linear-gradient(135deg, var(--molten-orange), var(--amber-glow))'; this.style.boxShadow='0 0 25px rgba(255, 69, 0, 0.6)';" onmouseout="this.style.background='linear-gradient(135deg, var(--electric-blue), var(--pulse-blue))'; this.style.boxShadow='0 0 15px rgba(0, 204, 255, 0.5)';">\u2716 关闭</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
    
    // 悬停效果
    row.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 204, 255, 0.5)';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// 添加弹窗动画
if (!document.getElementById('modal-animation-style')) {
    const style = document.createElement('style');
    style.id = 'modal-animation-style';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== 工业按钮二进制代码流动效果 ====================

document.querySelectorAll('.industrial-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        // 创建二进制代码纹理层
        const binaryLayer = document.createElement('div');
        binaryLayer.className = 'binary-flow';
        binaryLayer.style.position = 'absolute';
        binaryLayer.style.top = '0';
        binaryLayer.style.left = '0';
        binaryLayer.style.width = '100%';
        binaryLayer.style.height = '100%';
        binaryLayer.style.overflow = 'hidden';
        binaryLayer.style.pointerEvents = 'none';
        binaryLayer.style.zIndex = '3';
        
        // 生成随机二进制字符
        const binaryChars = [];
        for (let i = 0; i < 20; i++) {
            const char = document.createElement('span');
            char.textContent = Math.random() > 0.5 ? '1' : '0';
            char.style.position = 'absolute';
            char.style.color = 'rgba(255, 140, 0, 0.8)';
            char.style.fontSize = '10px';
            char.style.fontFamily = 'monospace';
            char.style.left = Math.random() * 100 + '%';
            char.style.top = '-10px';
            char.style.animation = `binary-fall ${0.5 + Math.random() * 1}s linear infinite`;
            binaryLayer.appendChild(char);
        }
        
        this.appendChild(binaryLayer);
    });
    
    button.addEventListener('mouseleave', function() {
        const binaryLayer = this.querySelector('.binary-flow');
        if (binaryLayer) {
            binaryLayer.remove();
        }
    });
});

// 添加二进制下落动画CSS
if (!document.getElementById('binary-animation-style')) {
    const style = document.createElement('style');
    style.id = 'binary-animation-style';
    style.textContent = `
        @keyframes binary-fall {
            from {
                top: -10px;
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            to {
                top: 100%;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 添加个人信息行点击交互
document.querySelectorAll('.data-row').forEach(row => {
    row.style.cursor = 'pointer';
    
    row.addEventListener('click', function() {
        const label = this.querySelector('.data-label').textContent;
        const value = this.querySelector('.data-value').textContent;
        showNotification(`${label}${value}`, 'info');
        
        // 波纹效果
        this.style.boxShadow = '0 0 20px rgba(0, 204, 255, 0.6)';
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 500);
    });
});

// 统计框点击交互
document.querySelectorAll('.stat-box').forEach(box => {
    box.style.cursor = 'pointer';
    
    box.addEventListener('click', function() {
        const number = this.querySelector('.stat-number').textContent;
        const label = this.querySelector('.stat-label').textContent;
        showNotification(`${label}：${number}`, 'info');
        
        // 点击效果
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// 控制台信息
console.log('%c🌐 页面功能模块已加载', 'color: #00CCFF; font-size: 16px; font-weight: bold;');
console.log('%c✓ 交互功能就绪', 'color: #39FF14; font-size: 14px;');
