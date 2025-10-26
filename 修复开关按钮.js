// ====================================================
// 🔧 开关按钮终极修复脚本
// 使用方法：在浏览器Console中直接复制粘贴运行
// ====================================================

console.log('🚀 开始修复开关按钮...');

// ==================== 第1步：检查和添加CSS ====================
console.log('\n📝 步骤1：检查CSS样式...');

let styleSheet = document.getElementById('settings-styles');
if (styleSheet) {
    console.log('  ⚠️ 发现已存在的CSS，删除并重新添加...');
    styleSheet.remove();
}

styleSheet = document.createElement('style');
styleSheet.id = 'settings-styles';
styleSheet.textContent = `
    .toggle-switch {
        width: 50px;
        height: 24px;
        background: rgba(100, 100, 100, 0.5);
        border: 2px solid #4682B4;
        border-radius: 20px;
        position: relative;
        cursor: pointer !important;
        transition: all 0.3s ease;
        display: inline-block;
        user-select: none;
        flex-shrink: 0;
    }
    
    .toggle-switch::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background: #6B7280;
        border-radius: 50%;
        top: 1px;
        left: 2px;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .toggle-switch:hover {
        border-color: #00CCFF;
        box-shadow: 0 0 10px rgba(0, 204, 255, 0.3);
    }
    
    .toggle-switch.active {
        background: linear-gradient(135deg, rgba(0, 102, 255, 0.5), rgba(0, 204, 255, 0.6));
        border-color: #00CCFF;
        box-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
    }
    
    .toggle-switch.active::after {
        left: 26px;
        background: #00CCFF;
        box-shadow: 0 0 10px #00CCFF, 0 2px 6px rgba(0, 0, 0, 0.4);
    }
`;

document.head.appendChild(styleSheet);
console.log('  ✅ CSS样式已添加');

// ==================== 第2步：查找开关按钮 ====================
console.log('\n🔍 步骤2：查找开关按钮...');

const toggles = document.querySelectorAll('.toggle-switch');
console.log(`  找到 ${toggles.length} 个开关按钮`);

if (toggles.length === 0) {
    console.error('  ❌ 没有找到任何开关按钮！');
    console.log('  💡 请确保已经进入"系统设置"页面');
} else {
    console.log('  ✅ 找到开关按钮');
    
    // ==================== 第3步：移除旧事件监听器 ====================
    console.log('\n🗑️ 步骤3：清除旧事件监听器...');
    
    // 通过克隆节点来移除所有事件监听器
    toggles.forEach((toggle, index) => {
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
    });
    
    console.log('  ✅ 已清除所有旧事件');
    
    // ==================== 第4步：重新绑定事件 ====================
    console.log('\n🔗 步骤4：重新绑定点击事件...');
    
    const newToggles = document.querySelectorAll('.toggle-switch');
    let successCount = 0;
    
    newToggles.forEach((toggle, index) => {
        // 方法1：使用addEventListener
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const before = this.classList.contains('active');
            this.classList.toggle('active');
            const after = this.classList.contains('active');
            
            console.log(`🔘 开关${index + 1}被点击：${before ? 'ON' : 'OFF'} → ${after ? 'ON' : 'OFF'}`);
        });
        
        // 方法2：同时使用onclick（双重保险）
        toggle.onclick = function() {
            const before = this.classList.contains('active');
            this.classList.toggle('active');
            const after = this.classList.contains('active');
            console.log(`🔘 onclick: 开关${index + 1}：${before ? 'ON' : 'OFF'} → ${after ? 'ON' : 'OFF'}`);
        };
        
        // 测试鼠标悬停
        toggle.addEventListener('mouseenter', function() {
            console.log(`🖱️ 鼠标进入开关 ${index + 1}`);
        });
        
        successCount++;
    });
    
    console.log(`  ✅ 成功绑定 ${successCount} 个开关的事件`);
    
    // ==================== 第5步：验证修复 ====================
    console.log('\n✅ 步骤5：验证修复结果...');
    
    const firstToggle = newToggles[0];
    if (firstToggle) {
        const style = window.getComputedStyle(firstToggle);
        const afterStyle = window.getComputedStyle(firstToggle, '::after');
        
        console.log('  开关样式检查：');
        console.log('    cursor:', style.cursor);
        console.log('    width:', style.width);
        console.log('    position:', style.position);
        console.log('    滑块left:', afterStyle.left);
        console.log('    滑块transition:', afterStyle.transition);
        
        // 自动测试点击
        console.log('\n  🧪 自动测试第一个开关...');
        const initialState = firstToggle.classList.contains('active');
        console.log(`    初始状态: ${initialState ? 'ON' : 'OFF'}`);
        
        setTimeout(() => {
            console.log('    执行模拟点击...');
            firstToggle.click();
            
            setTimeout(() => {
                const newState = firstToggle.classList.contains('active');
                console.log(`    点击后状态: ${newState ? 'ON' : 'OFF'}`);
                
                if (initialState !== newState) {
                    console.log('    ✅ 测试成功！开关状态已改变');
                } else {
                    console.error('    ❌ 测试失败！状态未改变');
                }
            }, 100);
        }, 500);
    }
}

// ==================== 完成 ====================
console.log('\n🎉 修复脚本执行完成！');
console.log('💡 现在请手动点击开关按钮测试效果');
console.log('💡 如果还是不能滑动，请截图Console的完整输出');
