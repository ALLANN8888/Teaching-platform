// ============================================================
// 🔧 系统设置开关按钮终极修复脚本
// 使用方法：在浏览器Console中直接复制粘贴运行
// ============================================================

(function() {
    'use strict';
    
    console.log('🚀 开始执行终极修复脚本...');
    
    // ==================== 第1步：确保必要的函数已定义 ====================
    console.log('\n📝 步骤1：检查必要函数...');
    
    // 确保所有必需的函数都存在
    const requiredFunctions = [
        'initSettings',
        'openChangePasswordModal',
        'openBindEmailModal',
        'handleLogout'
    ];
    
    requiredFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`  ✅ ${funcName} 已定义`);
        } else {
            console.warn(`  ⚠️ ${funcName} 未定义`);
        }
    });
    
    // ==================== 第2步：添加核心CSS样式 ====================
    console.log('\n🎨 步骤2：添加核心CSS样式...');
    
    // 移除旧的样式（如果存在）
    const oldStyle = document.getElementById('toggle-fix-styles');
    if (oldStyle) {
        oldStyle.remove();
        console.log('  🗑️ 已移除旧样式');
    }
    
    // 添加新的样式
    const style = document.createElement('style');
    style.id = 'toggle-fix-styles';
    style.textContent = `
        /* ==================== 开关按钮核心样式 ==================== */
        .toggle-switch {
            width: 50px !important;
            height: 24px !important;
            background: rgba(100, 100, 100, 0.5) !important;
            border: 2px solid #4682B4 !important;
            border-radius: 20px !important;
            position: relative !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            display: inline-block !important;
            user-select: none !important;
            flex-shrink: 0 !important;
            box-sizing: border-box !important;
        }
        
        .toggle-switch::after {
            content: '' !important;
            position: absolute !important;
            width: 18px !important;
            height: 18px !important;
            background: #6B7280 !important;
            border-radius: 50% !important;
            top: 1px !important;
            left: 2px !important;
            transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
            box-sizing: border-box !important;
        }
        
        .toggle-switch:hover {
            border-color: #00CCFF !important;
            box-shadow: 0 0 10px rgba(0, 204, 255, 0.3) !important;
        }
        
        .toggle-switch.active {
            background: linear-gradient(135deg, rgba(0, 102, 255, 0.5), rgba(0, 204, 255, 0.6)) !important;
            border-color: #00CCFF !important;
            box-shadow: 0 0 15px rgba(0, 204, 255, 0.5) !important;
        }
        
        .toggle-switch.active::after {
            left: 26px !important;
            background: #00CCFF !important;
            box-shadow: 0 0 10px #00CCFF, 0 2px 6px rgba(0, 0, 0, 0.4) !important;
        }
        
        /* ==================== 确保工业按钮可点击 ==================== */
        .industrial-button {
            cursor: pointer !important;
            pointer-events: auto !important;
            z-index: 100 !important;
            position: relative !important;
        }
        
        .button-surface {
            pointer-events: none !important;
        }
        
        .button-text {
            pointer-events: none !important;
        }
        
        .charge-animation {
            pointer-events: none !important;
        }
    `;
    
    document.head.appendChild(style);
    console.log('  ✅ 核心CSS样式已添加');
    
    // ==================== 第3步：修复开关按钮 ====================
    console.log('\n🔧 步骤3：修复开关按钮...');
    
    // 查找所有开关按钮
    const toggles = document.querySelectorAll('.toggle-switch');
    console.log(`  找到 ${toggles.length} 个开关按钮`);
    
    if (toggles.length === 0) {
        console.error('  ❌ 未找到任何开关按钮！');
        console.log('  💡 请确保已进入"系统设置"页面');
        return;
    }
    
    // 为每个开关按钮重新绑定事件
    toggles.forEach((toggle, index) => {
        const settingKey = toggle.getAttribute('data-setting') || `toggle-${index + 1}`;
        
        // 清除可能存在的旧事件监听器
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // 添加新的事件监听器
        newToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // 切换active类
            this.classList.toggle('active');
            
            // 获取新状态
            const isActive = this.classList.contains('active');
            
            // 控制台输出
            console.log(`🔘 开关按钮 ${settingKey}: ${isActive ? 'ON' : 'OFF'}`);
            
            // 视觉反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        
        // 添加鼠标悬停效果
        newToggle.addEventListener('mouseenter', function() {
            console.log(`🖱️ 鼠标进入开关 ${settingKey}`);
        });
        
        // 显示初始状态
        const initialState = newToggle.classList.contains('active');
        console.log(`  开关 ${settingKey}: ${initialState ? 'ON' : 'OFF'}`);
    });
    
    console.log('  ✅ 开关按钮修复完成');
    
    // ==================== 第4步：修复快捷操作按钮 ====================
    console.log('\n🔧 步骤4：修复快捷操作按钮...');
    
    const actionButtons = document.querySelectorAll('.industrial-button');
    console.log(`  找到 ${actionButtons.length} 个快捷操作按钮`);
    
    actionButtons.forEach((button, index) => {
        // 确保按钮有cursor样式
        button.style.cursor = 'pointer';
        button.style.pointerEvents = 'auto';
        
        // 获取按钮文本
        const buttonText = button.querySelector('.button-text')?.textContent || `按钮${index + 1}`;
        
        // 添加点击事件（如果还没有的话）
        if (!button.onclick || button.onclick.toString().includes('[native code]')) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log(`⚡ 点击了 ${buttonText} 按钮`);
                
                // 视觉反馈
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // 根据按钮文本调用相应函数
                switch(buttonText) {
                    case '修改密码':
                        if (window.openChangePasswordModal) {
                            window.openChangePasswordModal();
                        }
                        break;
                    case '绑定邮箱':
                        if (window.openBindEmailModal) {
                            window.openBindEmailModal();
                        }
                        break;
                    case '退出登录':
                        if (window.handleLogout) {
                            window.handleLogout();
                        }
                        break;
                }
            });
        }
    });
    
    console.log('  ✅ 快捷操作按钮修复完成');
    
    // ==================== 第5步：验证修复结果 ====================
    console.log('\n✅ 步骤5：验证修复结果...');
    
    // 测试第一个开关
    const firstToggle = document.querySelector('.toggle-switch');
    if (firstToggle) {
        console.log('  🧪 测试第一个开关的样式:');
        const style = window.getComputedStyle(firstToggle);
        console.log(`    cursor: ${style.cursor}`);
        console.log(`    width: ${style.width}`);
        console.log(`    position: ${style.position}`);
        
        // 测试点击
        console.log('  🧪 测试点击功能...');
        const initialState = firstToggle.classList.contains('active');
        console.log(`    初始状态: ${initialState ? 'ON' : 'OFF'}`);
        
        setTimeout(() => {
            firstToggle.click();
            setTimeout(() => {
                const newState = firstToggle.classList.contains('active');
                console.log(`    点击后状态: ${newState ? 'ON' : 'OFF'}`);
                if (initialState !== newState) {
                    console.log('    ✅ 测试成功！开关状态已改变');
                } else {
                    console.warn('    ⚠️ 状态未改变，请手动测试');
                }
            }, 100);
        }, 500);
    }
    
    // ==================== 完成 ====================
    console.log('\n🎉 终极修复脚本执行完成！');
    console.log('💡 现在请手动测试以下功能：');
    console.log('   1. 点击开关按钮看是否滑动');
    console.log('   2. 点击"修改密码"按钮');
    console.log('   3. 点击"绑定邮箱"按钮');
    console.log('   4. 点击"退出登录"按钮');
    console.log('📋 如果还有问题，请截图Console的完整输出');
    
})();
