// ==================== 城市网格脉冲渲染 ====================
const cityGridCanvas = document.getElementById('city-grid');
const gridCtx = cityGridCanvas.getContext('2d');

// 设置画布尺寸
function resizeCanvas() {
    cityGridCanvas.width = window.innerWidth;
    cityGridCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 网格交点数据
const gridPoints = [];
const gridSpacing = 50;
const cols = Math.ceil(cityGridCanvas.width / gridSpacing);
const rows = Math.ceil(cityGridCanvas.height / gridSpacing);

// 初始化网格交点
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        gridPoints.push({
            x: i * gridSpacing,
            y: j * gridSpacing,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        });
    }
}

// 绘制城市网格与脉冲
function drawCityGrid() {
    gridCtx.clearRect(0, 0, cityGridCanvas.width, cityGridCanvas.height);
    
    // 绘制网格线
    gridCtx.strokeStyle = 'rgba(0, 204, 255, 0.15)';
    gridCtx.lineWidth = 1;
    
    // 垂直线
    for (let i = 0; i < cols; i++) {
        gridCtx.beginPath();
        gridCtx.moveTo(i * gridSpacing, 0);
        gridCtx.lineTo(i * gridSpacing, cityGridCanvas.height);
        gridCtx.stroke();
    }
    
    // 水平线
    for (let j = 0; j < rows; j++) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, j * gridSpacing);
        gridCtx.lineTo(cityGridCanvas.width, j * gridSpacing);
        gridCtx.stroke();
    }
    
    // 绘制脉冲交点
    gridPoints.forEach(point => {
        point.pulsePhase += point.pulseSpeed;
        const pulseIntensity = (Math.sin(point.pulsePhase) + 1) / 2;
        const alpha = 0.3 + pulseIntensity * 0.5;
        const radius = 2 + pulseIntensity * 3;
        
        gridCtx.fillStyle = `rgba(0, 204, 255, ${alpha})`;
        gridCtx.beginPath();
        gridCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        gridCtx.fill();
        
        // 光晕
        gridCtx.shadowBlur = 10;
        gridCtx.shadowColor = 'rgba(0, 204, 255, 0.8)';
        gridCtx.fillStyle = `rgba(0, 204, 255, ${alpha * 0.3})`;
        gridCtx.beginPath();
        gridCtx.arc(point.x, point.y, radius * 2, 0, Math.PI * 2);
        gridCtx.fill();
        gridCtx.shadowBlur = 0;
    });
    
    requestAnimationFrame(drawCityGrid);
}

drawCityGrid();

// ==================== 数字时钟更新 ====================
function updateDigitalClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    document.getElementById('digitalClock').textContent = timeString;
}

updateDigitalClock();
setInterval(updateDigitalClock, 1000);

// ==================== 3D全息人像渲染 ====================
const avatar3dCanvas = document.getElementById('avatar3d');
const avatarCtx = avatar3dCanvas.getContext('2d');

let avatarRotation = 0;

function drawHologramAvatar() {
    const width = avatar3dCanvas.width;
    const height = avatar3dCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 清空画布
    avatarCtx.clearRect(0, 0, width, height);
    
    // 绘制头部轮廓（蓝色光丝）
    const headRadius = 60;
    avatarCtx.strokeStyle = 'rgba(0, 204, 255, 0.8)';
    avatarCtx.lineWidth = 2;
    avatarCtx.shadowBlur = 15;
    avatarCtx.shadowColor = '#00CCFF';
    
    // 头部圆形
    avatarCtx.beginPath();
    avatarCtx.arc(centerX, centerY - 20, headRadius, 0, Math.PI * 2);
    avatarCtx.stroke();
    
    // 面部网格线
    for (let i = -3; i <= 3; i++) {
        const offsetX = Math.sin(avatarRotation + i * 0.5) * 10;
        avatarCtx.beginPath();
        avatarCtx.moveTo(centerX - headRadius + offsetX, centerY - 20 + i * 15);
        avatarCtx.lineTo(centerX + headRadius + offsetX, centerY - 20 + i * 15);
        avatarCtx.strokeStyle = `rgba(0, 204, 255, ${0.3 + Math.abs(i) * 0.1})`;
        avatarCtx.stroke();
    }
    
    // 垂直网格线
    for (let i = -3; i <= 3; i++) {
        const offsetY = Math.cos(avatarRotation + i * 0.5) * 10;
        avatarCtx.beginPath();
        avatarCtx.moveTo(centerX + i * 15, centerY - 20 - headRadius + offsetY);
        avatarCtx.lineTo(centerX + i * 15, centerY - 20 + headRadius + offsetY);
        avatarCtx.strokeStyle = `rgba(0, 204, 255, ${0.3 + Math.abs(i) * 0.1})`;
        avatarCtx.stroke();
    }
    
    // 眼睛发光点
    avatarCtx.shadowBlur = 20;
    avatarCtx.fillStyle = '#00FFFF';
    avatarCtx.beginPath();
    avatarCtx.arc(centerX - 20, centerY - 30, 4, 0, Math.PI * 2);
    avatarCtx.fill();
    avatarCtx.beginPath();
    avatarCtx.arc(centerX + 20, centerY - 30, 4, 0, Math.PI * 2);
    avatarCtx.fill();
    
    // 身体框架
    avatarCtx.shadowBlur = 10;
    avatarCtx.strokeStyle = 'rgba(0, 204, 255, 0.6)';
    avatarCtx.lineWidth = 2;
    
    // 颈部
    avatarCtx.beginPath();
    avatarCtx.moveTo(centerX - 10, centerY + 40);
    avatarCtx.lineTo(centerX - 10, centerY + 60);
    avatarCtx.stroke();
    avatarCtx.beginPath();
    avatarCtx.moveTo(centerX + 10, centerY + 40);
    avatarCtx.lineTo(centerX + 10, centerY + 60);
    avatarCtx.stroke();
    
    // 肩部
    avatarCtx.beginPath();
    avatarCtx.moveTo(centerX - 40, centerY + 60);
    avatarCtx.lineTo(centerX + 40, centerY + 60);
    avatarCtx.stroke();
    
    // 数据流粒子
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
        const angle = (avatarRotation + (i / particleCount) * Math.PI * 2);
        const distance = 70 + Math.sin(avatarRotation * 2 + i) * 10;
        const px = centerX + Math.cos(angle) * distance;
        const py = centerY - 20 + Math.sin(angle) * distance;
        
        avatarCtx.fillStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(avatarRotation * 3 + i) * 0.3})`;
        avatarCtx.beginPath();
        avatarCtx.arc(px, py, 2, 0, Math.PI * 2);
        avatarCtx.fill();
    }
    
    avatarCtx.shadowBlur = 0;
    avatarRotation += 0.02;
    
    requestAnimationFrame(drawHologramAvatar);
}

drawHologramAvatar();

// ==================== 导航栏交互 ====================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // 移除所有激活状态
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // 添加当前激活状态
        this.classList.add('active');
        
        // 可以在这里添加模块切换逻辑
        const moduleName = this.getAttribute('data-module');
        console.log(`切换到模块: ${moduleName}`);
    });
});

// ==================== 导航栏数据粒子生成 ====================
function createNavParticles() {
    const navContainer = document.querySelector('.nav-data-particles');
    if (!navContainer) return;
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(0, 204, 255, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.boxShadow = '0 0 8px rgba(0, 204, 255, 0.8)';
            particle.style.pointerEvents = 'none';
            
            navContainer.appendChild(particle);
            
            // 粒子动画
            const animation = particle.animate([
                { opacity: 0, transform: 'translate(0, 0) scale(0)' },
                { opacity: 1, transform: 'translate(0, 0) scale(1)' },
                { opacity: 0, transform: `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(0)` }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }, 300);
}

createNavParticles();

// ==================== 面板数据尘埃效果 ====================
function createPanelDust() {
    const dustContainers = document.querySelectorAll('.panel-data-dust');
    
    dustContainers.forEach(container => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '1px';
                particle.style.height = '1px';
                particle.style.background = Math.random() > 0.5 ? 'rgba(0, 204, 255, 0.6)' : 'rgba(255, 0, 128, 0.6)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.boxShadow = '0 0 5px currentColor';
                particle.style.pointerEvents = 'none';
                
                container.appendChild(particle);
                
                const animation = particle.animate([
                    { opacity: 0, transform: 'translate(0, 0)' },
                    { opacity: 1, transform: 'translate(0, 0)' },
                    { opacity: 0, transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)` }
                ], {
                    duration: 3000,
                    easing: 'ease-in-out'
                });
                
                animation.onfinish = () => particle.remove();
            }
        }, 200);
    });
}

createPanelDust();

// ==================== 工业按钮交互增强 ====================
const industrialButtons = document.querySelectorAll('.industrial-button');

industrialButtons.forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        console.log(`执行操作: ${action}`);
        
        // 触发按钮反馈动画
        this.style.transform = 'translateY(0)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);
        
        // 可以在这里添加实际功能逻辑
        alert(`功能"${this.querySelector('.button-text').textContent}"即将启动...`);
    });
});

// ==================== 课程单元格交互 ====================
const courseCells = document.querySelectorAll('.course-name');

courseCells.forEach(cell => {
    cell.addEventListener('click', function() {
        const courseName = this.textContent;
        const courseInfo = this.nextElementSibling.textContent;
        console.log(`选择课程: ${courseName} - 教室: ${courseInfo}`);
        alert(`课程详情

课程名称: ${courseName}
上课地点: ${courseInfo}

点击查看更多信息...`);
    });
});

// ==================== 加密锁动态切换 ====================
const encryptLocks = document.querySelectorAll('.encrypt-lock');
let lockToggleInterval;

function toggleLocks() {
    encryptLocks.forEach(lock => {
        if (Math.random() > 0.95) {
            if (lock.classList.contains('locked')) {
                lock.classList.remove('locked');
                lock.classList.add('unlocked');
                lock.textContent = '🔓';
            } else {
                lock.classList.remove('unlocked');
                lock.classList.add('locked');
                lock.textContent = '🔒';
            }
        }
    });
}

lockToggleInterval = setInterval(toggleLocks, 3000);

// ==================== 流光线条动画 ====================
function createStreamingLines() {
    const background = document.querySelector('.neural-background');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.width = '2px';
            line.style.height = Math.random() * 100 + 50 + 'px';
            line.style.background = 'linear-gradient(to bottom, transparent, rgba(0, 204, 255, 0.6), transparent)';
            line.style.left = Math.random() * 100 + '%';
            line.style.top = '0';
            line.style.filter = 'blur(1px)';
            line.style.pointerEvents = 'none';
            
            background.appendChild(line);
            
            const animation = line.animate([
                { top: '0%', opacity: 0 },
                { top: '20%', opacity: 1 },
                { top: '100%', opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'ease-in'
            });
            
            animation.onfinish = () => line.remove();
        }
    }, 500);
}

createStreamingLines();

// ==================== 数据行悬停音效模拟 ====================
const dataRows = document.querySelectorAll('.data-row');

dataRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        // 这里可以添加音效
        console.log('数据行激活');
    });
});

// ==================== 响应式菜单切换 ====================
let mobileMenuOpen = false;

function createMobileMenuToggle() {
    if (window.innerWidth <= 968) {
        // 可以添加移动端菜单按钮
        console.log('移动端模式');
    }
}

window.addEventListener('resize', createMobileMenuToggle);
createMobileMenuToggle();

// ==================== 控制台启动信息 ====================
console.log('%c🌐 广东理工学院 · 数字神经中枢', 'color: #00CCFF; font-size: 20px; font-weight: bold;');
console.log('%c⚡ 教学一体化服务平台 v2.0', 'color: #FF0080; font-size: 16px;');
console.log('%c✓ 所有系统模块已上线', 'color: #39FF14; font-size: 14px;');
console.log('%c🔐 神经中枢已连接', 'color: #FF8C00; font-size: 14px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4A7B9D;');
console.log('%c👁️ 欢迎进入赛博朋克数字时代', 'color: #C0C0C0; font-size: 12px;');
