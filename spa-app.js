// ==================== 单页应用控制器 ====================

// 模块内容模板
const moduleTemplates = {
    // 个人中心模块 - 双栏布局，外框固定，内容滚动
    personal: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                    <span class="title-icon">🔐</span>
                    你的数字档案
                </h2>

                <div class="hologram-avatar-container" style="margin-bottom: 18px; position: relative;">
                    <div class="avatar-hologram" style="width: 140px; height: 140px; margin: 0 auto; position: relative; cursor: pointer;" id="avatarContainer">
                        <img id="userAvatar" src="" alt="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: none; position: relative; z-index: 2;" />
                        <canvas id="avatar3d" width="140" height="140" style="position: relative; z-index: 2;"></canvas>
                        <canvas id="particleCanvas" width="140" height="140" style="position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;"></canvas>
                        <div class="upload-hint" id="uploadHint" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; color: var(--pulse-blue); white-space: nowrap; text-align: center; z-index: 3; pointer-events: none; text-shadow: 0 0 10px var(--pulse-blue); font-weight: 600;">上传个人头像</div>
                    </div>
                    <input type="file" id="avatarUpload" accept="image/*" style="display: none;" />
                </div>

                <div class="personal-data">
                    <div class="data-row">
                        <span class="data-label">姓名：</span>
                        <span class="data-value">张三</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">学号：</span>
                        <span class="data-value">2024001001</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">专业：</span>
                        <span class="data-value">计算机科学与技术</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">班级：</span>
                        <span class="data-value">计科2401班</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">学院：</span>
                        <span class="data-value">信息工程学院</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">入学年份：</span>
                        <span class="data-value">2024</span>
                    </div>
                </div>

                <h2 class="panel-title" style="margin-top: 22px;">
                    <span class="title-icon">📋</span>
                    今日课程安排
                </h2>

                <div class="data-matrix-table" style="overflow-x: auto; max-width: 100%;">
                    <table class="cyber-schedule" style="min-width: 100%; width: 100%; table-layout: fixed;">
                        <thead>
                            <tr class="matrix-header">
                                <th style="width: 15%;">时间</th>
                                <th style="width: 17%;">周一</th>
                                <th style="width: 17%;">周二</th>
                                <th style="width: 17%;">周三</th>
                                <th style="width: 17%;">周四</th>
                                <th style="width: 17%;">周五</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="time-slot">08:00<br>10:00</td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">数据结构</span>
                                    <span class="course-info" style="font-size: 11px;">A101</span>
                                </td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">算法设计</span>
                                    <span class="course-info" style="font-size: 11px;">B203</span>
                                </td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">操作系统</span>
                                    <span class="course-info" style="font-size: 11px;">C305</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="time-slot">10:20<br>12:00</td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">计算机网络</span>
                                    <span class="course-info" style="font-size: 11px;">A102</span>
                                </td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">数据库原理</span>
                                    <span class="course-info" style="font-size: 11px;">B205</span>
                                </td>
                                <td class="course-cell empty"></td>
                            </tr>
                            <tr>
                                <td class="time-slot">14:00<br>16:00</td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">软件工程</span>
                                    <span class="course-info" style="font-size: 11px;">C301</span>
                                </td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">人工智能</span>
                                    <span class="course-info" style="font-size: 11px;">A105</span>
                                </td>
                                <td class="course-cell empty"></td>
                                <td class="course-cell">
                                    <span class="course-name" style="font-size: 12px;">云计算技术</span>
                                    <span class="course-info" style="font-size: 11px;">B208</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow: hidden; max-width: 100%; height: 100%; display: flex; flex-direction: column;">
                <h3 class="panel-title" style="font-size: 16px; margin-bottom: 15px;">
                    <span class="title-icon">⚡</span>
                    快捷功能
                </h3>

                <div class="function-buttons" style="display: grid; grid-template-columns: 1fr; gap: 10px; max-width: 100%; margin-bottom: 25px;">
                    <button class="industrial-button" onclick="loadModule('learning')" style="width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;">
                        <span class="button-surface">
                            <span class="button-text" style="font-size: 13px;">学习管理</span>
                            <div class="charge-animation"></div>
                        </span>
                    </button>
                    <button class="industrial-button" onclick="loadModule('consult')" style="width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;">
                        <span class="button-surface">
                            <span class="button-text" style="font-size: 13px;">在线咨询</span>
                            <div class="charge-animation"></div>
                        </span>
                    </button>
                    <button class="industrial-button" onclick="loadModule('resources')" style="width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;">
                        <span class="button-surface">
                            <span class="button-text" style="font-size: 13px;">资源下载</span>
                            <div class="charge-animation"></div>
                        </span>
                    </button>
                    <button class="industrial-button" onclick="loadModule('settings')" style="width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box;">
                        <span class="button-surface">
                            <span class="button-text" style="font-size: 13px;">系统设置</span>
                            <div class="charge-animation"></div>
                        </span>
                    </button>
                </div>

                <h3 class="panel-title" style="font-size: 16px; margin-bottom: 15px;">
                    <span class="title-icon">📊</span>
                    本学期概况
                </h3>

                <div class="stats-overview">
                    <div class="stat-box">
                        <div class="stat-number">📚 16</div>
                        <div class="stat-label">在修课程</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">💯 89.3</div>
                        <div class="stat-label">平均成绩</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">⭐ 4.06</div>
                        <div class="stat-label">平均绩点</div>
                    </div>
                </div>
            </div>
        </aside>
    `,

    // 系统设置模块 - 外框固定，内容滚动
    settings: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                <span class="title-icon">⚙️</span>
                个性化设置
            </h2>

            <div class="settings-section" style="margin-top: 20px; padding: 18px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid var(--pulse-blue); border-radius: 8px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--pulse-blue); margin-bottom: 16px; text-shadow: 0 0 10px rgba(0, 204, 255, 0.5);">📢 通知设置</h3>
                <div style="padding: 10px 0; border-bottom: 1px solid rgba(0, 204, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">课程提醒</span>
                    <div class="toggle-switch active" data-setting="courseReminder"></div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid rgba(0, 204, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">作业截止提醒</span>
                    <div class="toggle-switch" data-setting="homeworkReminder"></div>
                </div>
                <div style="padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">成绩发布通知</span>
                    <div class="toggle-switch active" data-setting="gradeNotification"></div>
                </div>
            </div>

            <div class="settings-section" style="margin-top: 20px; padding: 18px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid var(--amber-glow); border-radius: 8px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--amber-glow); margin-bottom: 16px; text-shadow: 0 0 10px rgba(255, 140, 0, 0.5);">🎨 界面设置</h3>
                <div style="padding: 10px 0; border-bottom: 1px solid rgba(0, 204, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">主题模式</span>
                    <select id="themeSelect" style="padding: 6px 10px; background: rgba(0, 0, 0, 0.5); border: 2px solid var(--steel-blue); border-radius: 5px; color: #FFFFFF; font-size: 12px; cursor: pointer;">
                        <option value="cyberpunk">赛博朋克(默认)</option>
                        <option value="classic">经典蓝色</option>
                        <option value="dark">暗黑模式</option>
                    </select>
                </div>
                <div style="padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">动画效果</span>
                    <div class="toggle-switch active" data-setting="animationEffects"></div>
                </div>
            </div>

            <div class="settings-section" style="margin-top: 20px; padding: 18px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid var(--crt-green); border-radius: 8px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--crt-green); margin-bottom: 16px; text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);">🔒 隐私设置</h3>
                <div style="padding: 10px 0; border-bottom: 1px solid rgba(0, 204, 255, 0.2); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">显示在线状态</span>
                    <div class="toggle-switch" data-setting="showOnlineStatus"></div>
                </div>
                <div style="padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 13px; color: #FFFFFF;">允许消息推送</span>
                    <div class="toggle-switch active" data-setting="allowNotifications"></div>
                </div>
            </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h3 class="panel-title">
                <span class="title-icon">👤</span>
                账户信息
            </h3>

            <div class="task-list">
                <div class="task-item" style="cursor: pointer;" onclick="if(window.editAccountInfo) editAccountInfo('用户名', 'username');">
                    <div class="task-status" style="background: var(--crt-green);"></div>
                    <div class="task-content">
                        <h4 class="task-title" style="font-size: 13px;">用户名</h4>
                        <p class="task-time" style="font-size: 11px;" id="username">张三</p>
                    </div>
                </div>

                <div class="task-item" style="cursor: pointer;" onclick="if(window.editAccountInfo) editAccountInfo('学号', 'studentId');">
                    <div class="task-status" style="background: var(--crt-green);"></div>
                    <div class="task-content">
                        <h4 class="task-title" style="font-size: 13px;">学号</h4>
                        <p class="task-time" style="font-size: 11px;" id="studentId">2024001001</p>
                    </div>
                </div>

                <div class="task-item" style="cursor: pointer;" onclick="if(window.editAccountInfo) editAccountInfo('邮箱', 'email');">
                    <div class="task-status" style="background: var(--crt-green);"></div>
                    <div class="task-content">
                        <h4 class="task-title" style="font-size: 13px;">邮箱</h4>
                        <p class="task-time" style="font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" id="email">zhangsan@gdut.edu.cn</p>
                    </div>
                </div>
            </div>

            <h3 class="panel-title" style="margin-top: 25px;">
                <span class="title-icon">🔑</span>
                快捷操作
            </h3>

            <div class="function-buttons" style="grid-template-columns: 1fr; gap: 10px;">
                <button class="industrial-button" onclick="window.openChangePasswordModal && window.openChangePasswordModal()">
                    <span class="button-surface">
                        <span class="button-text" style="font-size: 13px;">修改密码</span>
                        <div class="charge-animation"></div>
                    </span>
                </button>
                <button class="industrial-button" onclick="window.openBindEmailModal && window.openBindEmailModal()">
                    <span class="button-surface">
                        <span class="button-text" style="font-size: 13px;">绑定邮箱</span>
                        <div class="charge-animation"></div>
                    </span>
                </button>
                <button class="industrial-button" onclick="window.handleLogout && window.handleLogout()">
                    <span class="button-surface">
                        <span class="button-text" style="font-size: 13px;">退出登录</span>
                        <div class="charge-animation"></div>
                    </span>
                </button>
            </div>
            </div>
        </aside>
    `,

    // 学习管理模块 - 外框固定，内容滚动
    learning: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                    <span class="title-icon">📚</span>
                    学习管理中心
                </h2>

                <div class="course-progress-grid">
                <div class="progress-card" data-course="data-structure">
                    <div class="card-glow"></div>
                    <h3 class="course-title">数据结构</h3>
                    <div class="progress-info">
                        <span class="label">学习进度</span>
                        <span class="percentage">75%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                        <div class="progress-pulse"></div>
                    </div>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-icon">📖</span>
                            <span class="stat-value">12/16 章节</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">✅</span>
                            <span class="stat-value">8/10 作业</span>
                        </div>
                    </div>
                    <button class="enter-course-btn">进入课程</button>
                </div>

                <div class="progress-card" data-course="algorithm">
                    <div class="card-glow"></div>
                    <h3 class="course-title">算法设计</h3>
                    <div class="progress-info">
                        <span class="label">学习进度</span>
                        <span class="percentage">60%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 60%"></div>
                        <div class="progress-pulse"></div>
                    </div>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-icon">📖</span>
                            <span class="stat-value">9/15 章节</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">✅</span>
                            <span class="stat-value">6/8 作业</span>
                        </div>
                    </div>
                    <button class="enter-course-btn">进入课程</button>
                </div>

                <div class="progress-card" data-course="os">
                    <div class="card-glow"></div>
                    <h3 class="course-title">操作系统</h3>
                    <div class="progress-info">
                        <span class="label">学习进度</span>
                        <span class="percentage">45%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 45%"></div>
                        <div class="progress-pulse"></div>
                    </div>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-icon">📖</span>
                            <span class="stat-value">7/14 章节</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">✅</span>
                            <span class="stat-value">5/10 作业</span>
                        </div>
                    </div>
                    <button class="enter-course-btn">进入课程</button>
                </div>

                <div class="progress-card" data-course="network">
                    <div class="card-glow"></div>
                    <h3 class="course-title">计算机网络</h3>
                    <div class="progress-info">
                        <span class="label">学习进度</span>
                        <span class="percentage">88%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 88%"></div>
                        <div class="progress-pulse"></div>
                    </div>
                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-icon">📖</span>
                            <span class="stat-value">14/16 章节</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">✅</span>
                            <span class="stat-value">7/7 作业</span>
                        </div>
                    </div>
                    <button class="enter-course-btn">进入课程</button>
                </div>
            </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow: hidden; max-width: 100%; height: 100%; display: flex; flex-direction: column;">
                <h3 class="panel-title">
                <span class="title-icon">⚡</span>
                待办任务
            </h3>

            <div class="task-list">
                <div class="task-item urgent">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">数据结构作业提交</h4>
                        <p class="task-time">截止时间: 10-28 23:59</p>
                    </div>
                    <button class="task-action">开始</button>
                </div>

                <div class="task-item normal">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">算法设计章节测试</h4>
                        <p class="task-time">截止时间: 10-30 23:59</p>
                    </div>
                    <button class="task-action">开始</button>
                </div>

                <div class="task-item normal">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">操作系统实验报告</h4>
                        <p class="task-time">截止时间: 11-05 23:59</p>
                    </div>
                    <button class="task-action">开始</button>
                </div>

                <div class="task-item completed">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">计算机网络课后练习</h4>
                        <p class="task-time">已完成</p>
                    </div>
                    <button class="task-action disabled">已完成</button>
                </div>
            </div>

            <h3 class="panel-title" style="margin-top: 30px;">
                <span class="title-icon">📊</span>
                学习统计
            </h3>

            <div class="stats-overview">
                <div class="stat-box">
                    <div class="stat-number">128</div>
                    <div class="stat-label">学习时长(h)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">26</div>
                    <div class="stat-label">完成作业</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">92</div>
                    <div class="stat-label">平均分</div>
                </div>
            </div>
            </div>
        </aside>
    `,

    //课程表模块 - 外框固定，内容滚动
    schedule: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                <span class="title-icon">📅</span>
                本周课程安排
            </h2>

            <div class="data-matrix-table">
                <table class="cyber-schedule">
                    <thead>
                        <tr class="matrix-header">
                            <th>时间</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="time-slot">08:00-10:00</td>
                            <td class="course-cell">
                                <span class="course-name">数据结构</span>
                                <span class="course-info">A101 | 李教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">算法设计</span>
                                <span class="course-info">B203 | 王教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">操作系统</span>
                                <span class="course-info">C305 | 张教授</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="time-slot">10:20-12:00</td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">计算机网络</span>
                                <span class="course-info">A102 | 刘教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">数据库原理</span>
                                <span class="course-info">B205 | 陈教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                        </tr>
                        <tr>
                            <td class="time-slot">14:00-16:00</td>
                            <td class="course-cell">
                                <span class="course-name">软件工程</span>
                                <span class="course-info">C301 | 赵教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">人工智能</span>
                                <span class="course-info">A105 | 孙教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">云计算技术</span>
                                <span class="course-info">B208 | 周教授</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="time-slot">16:20-18:00</td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">Web开发</span>
                                <span class="course-info">D401 | 吴教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">移动开发</span>
                                <span class="course-info">D402 | 郑教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                        </tr>
                        <tr>
                            <td class="time-slot">19:00-21:00</td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell">
                                <span class="course-name">专业讲座</span>
                                <span class="course-info">大礼堂 | 多位教授</span>
                            </td>
                            <td class="course-cell empty"></td>
                            <td class="course-cell empty"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h3 class="panel-title">
                    <span class="title-icon">📌</span>
                    课程提醒
                </h3>

            <div class="task-list">
                <div class="task-item urgent">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">下节课提醒</h4>
                        <p class="task-time">数据结构 - A101教室</p>
                    </div>
                </div>

                <div class="task-item normal">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">明日课程</h4>
                        <p class="task-time">计算机网络 - A102教室</p>
                    </div>
                </div>

                <div class="task-item normal">
                    <div class="task-status"></div>
                    <div class="task-content">
                        <h4 class="task-title">本周讲座</h4>
                        <p class="task-time">周三晚上 - 大礼堂</p>
                    </div>
                </div>
            </div>

            <h3 class="panel-title" style="margin-top: 25px;">
                <span class="title-icon">📊</span>
                课程统计
            </h3>

            <div class="stats-overview">
                <div class="stat-box">
                    <div class="stat-number">16</div>
                    <div class="stat-label">本学期总课程</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">24</div>
                    <div class="stat-label">每周总课时</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">92%</div>
                    <div class="stat-label">出勤率</div>
                </div>
            </div>
            </div>
        </aside>
    `,

    // 成绩查询模块 - 外框固定，内容滚动
    grades: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                <span class="title-icon">📊</span>
                学期成绩单
            </h2>

            <div class="grade-table-container" style="overflow-x: auto; max-width: 100%;">
                <table class="grade-table" style="min-width: 100%; width: 100%; table-layout: fixed;">
                    <thead>
                        <tr>
                            <th style="width: 20%;">课程名称</th>
                            <th style="width: 10%;">学分</th>
                            <th style="width: 12%;">平时</th>
                            <th style="width: 12%;">期末</th>
                            <th style="width: 12%;">总评</th>
                            <th style="width: 10%;">绩点</th>
                            <th style="width: 14%;">状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">数据结构</td>
                            <td>4.0</td>
                            <td>88</td>
                            <td>92</td>
                            <td><span class="grade-score excellent">91</span></td>
                            <td>4.1</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">算法设计</td>
                            <td>3.5</td>
                            <td>85</td>
                            <td>89</td>
                            <td><span class="grade-score excellent">88</span></td>
                            <td>3.8</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">操作系统</td>
                            <td>4.0</td>
                            <td>90</td>
                            <td>95</td>
                            <td><span class="grade-score excellent">93</span></td>
                            <td>4.3</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">计算机网络</td>
                            <td>3.0</td>
                            <td>92</td>
                            <td>96</td>
                            <td><span class="grade-score excellent">95</span></td>
                            <td>4.5</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">数据库原理</td>
                            <td>3.5</td>
                            <td>78</td>
                            <td>82</td>
                            <td><span class="grade-score good">80</span></td>
                            <td>3.0</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">软件工程</td>
                            <td>3.0</td>
                            <td>86</td>
                            <td>88</td>
                            <td><span class="grade-score excellent">87</span></td>
                            <td>3.7</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">人工智能</td>
                            <td>4.0</td>
                            <td>94</td>
                            <td>98</td>
                            <td><span class="grade-score excellent">97</span></td>
                            <td>4.7</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                        <tr>
                            <td style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">云计算技术</td>
                            <td>3.0</td>
                            <td>82</td>
                            <td>85</td>
                            <td><span class="grade-score good">84</span></td>
                            <td>3.4</td>
                            <td><span style="color: var(--crt-green); font-size: 12px;">✓ 通过</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow: hidden; max-width: 100%; height: 100%; display: flex; flex-direction: column;">
                <h3 class="panel-title" style="font-size: 17px; margin-bottom: 18px;">
                    <span class="title-icon">📈</span>
                    成绩分析
                </h3>

                <div class="stats-overview" style="margin-bottom: 30px;">
                    <div class="stat-box">
                        <div class="stat-number">💯 89.3</div>
                        <div class="stat-label">平均分</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">⭐ 4.06</div>
                        <div class="stat-label">平均绩点</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">✅ 8/8</div>
                        <div class="stat-label">通过率</div>
                    </div>
                </div>

                <h3 class="panel-title" style="font-size: 17px; margin-bottom: 18px;">
                    <span class="title-icon">🏆</span>
                    成绩排名
                </h3>

                <div class="task-list">
                    <div class="task-item">
                        <div class="task-status" style="background: gold;"></div>
                        <div class="task-content">
                            <h4 class="task-title">专业排名</h4>
                            <p class="task-time">第 12 名 / 共 180 人</p>
                        </div>
                    </div>

                    <div class="task-item">
                        <div class="task-status" style="background: silver;"></div>
                        <div class="task-content">
                            <h4 class="task-title">班级排名</h4>
                            <p class="task-time">第 3 名 / 共 45 人</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    `,

    // 在线咨询模块 - 外框固定，内容滚动
    consult: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px; display: flex; flex-direction: column;">
                <h2 class="panel-title">
                    <span class="title-icon">💬</span>
                    智能助手对话
                </h2>

                <div class="chat-container" style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
                    <div class="chat-messages" id="chatMessages" style="flex: 1; overflow-y: auto; max-height: calc(100vh - 490px); padding: 18px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; margin-bottom: 18px;">
                        <div class="message assistant">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <div class="message-text" style="word-wrap: break-word; overflow-wrap: break-word;">
                                    您好！我是广东理工学院智能助手。我可以帮您解答关于课程、成绩、选课等问题。请问有什么可以帮助您的？
                                </div>
                                <div class="message-time">14:30:15</div>
                            </div>
                        </div>
                    </div>

                    <div class="chat-input-area" style="flex-shrink: 0;">
                        <input type="text" class="chat-input" id="chatInput" placeholder="输入您的问题..." style="width: 100%;">
                        <button class="send-btn" onclick="sendMessage()">发送</button>
                    </div>
                </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 240px); padding-right: 5px; max-width: 100%;">
                <h3 class="panel-title" style="font-size: 16px; margin-bottom: 15px;">
                    <span class="title-icon">❓</span>
                    常见问题
                </h3>

                <div class="task-list">
                    <div class="task-item" onclick="document.getElementById('chatInput').value='如何查询成绩？';" style="cursor: pointer;">
                        <div class="task-status" style="background: var(--pulse-blue);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px;">如何查询成绩？</h4>
                            <p class="task-time" style="font-size: 11px;">点击快速发送</p>
                        </div>
                    </div>

                    <div class="task-item" onclick="document.getElementById('chatInput').value='怎么下载课程资料？';" style="cursor: pointer;">
                        <div class="task-status" style="background: var(--pulse-blue);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px;">怎么下载课程资料？</h4>
                            <p class="task-time" style="font-size: 11px;">点击快速发送</p>
                        </div>
                    </div>

                    <div class="task-item" onclick="document.getElementById('chatInput').value='如何修改个人信息？';" style="cursor: pointer;">
                        <div class="task-status" style="background: var(--pulse-blue);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px;">如何修改个人信息？</h4>
                            <p class="task-time" style="font-size: 11px;">点击快速发送</p>
                        </div>
                    </div>

                    <div class="task-item" onclick="document.getElementById('chatInput').value='如何联系教务处？';" style="cursor: pointer;">
                        <div class="task-status" style="background: var(--pulse-blue);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px;">如何联系教务处？</h4>
                            <p class="task-time" style="font-size: 11px;">点击快速发送</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    `,

    // 资源库模块 - 外框固定，内容滚动
    resources: `
        <section class="main-panel">
            <div class="led-border-cyan"></div>
            
            <div style="overflow-y: auto; max-height: calc(100vh - 240px); padding-right: 5px;">
                <h2 class="panel-title">
                <span class="title-icon">📦</span>
                课程资源中心
            </h2>

            <div class="resource-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; margin-top: 20px;">
                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">📄</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">数据结构课件</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: PDF文档</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 15.6 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-10-20</p>
                    <button class="download-btn" onclick="downloadResource('数据结构课件')">⬇ 下载</button>
                </div>

                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">🎥</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">算法设计视频教程</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: MP4视频</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 256 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-10-18</p>
                    <button class="download-btn" onclick="downloadResource('算法设计视频教程')">⬇ 下载</button>
                </div>

                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">💻</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">操作系统实验代码</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: ZIP压缩包</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 8.2 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-10-22</p>
                    <button class="download-btn" onclick="downloadResource('操作系统实验代码')">⬇ 下载</button>
                </div>

                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">📚</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">计算机网络教材</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: PDF电子书</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 42.8 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-09-15</p>
                    <button class="download-btn" onclick="downloadResource('计算机网络教材')">⬇ 下载</button>
                </div>

                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">🔬</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">数据库实验指导</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: DOCX文档</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 5.4 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-10-15</p>
                    <button class="download-btn" onclick="downloadResource('数据库实验指导')">⬇ 下载</button>
                </div>

                <div class="resource-card">
                    <div class="resource-icon" style="font-size: 36px;">🤖</div>
                    <h3 class="resource-title" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">人工智能课程资料</h3>
                    <p class="resource-info" style="font-size: 11px;">📁 类型: PDF文档</p>
                    <p class="resource-info" style="font-size: 11px;">📏 大小: 38.5 MB</p>
                    <p class="resource-info" style="font-size: 11px;">🕐 更新: 2025-10-23</p>
                    <button class="download-btn" onclick="downloadResource('人工智能课程资料')">⬇ 下载</button>
                </div>
            </div>
            </div>
        </section>

        <aside class="side-panel">
            <div class="led-border-amber"></div>
            
            <div style="overflow: hidden; max-width: 100%; height: 100%; display: flex; flex-direction: column;">
                <h3 class="panel-title" style="font-size: 17px; margin-bottom: 18px;">
                    <span class="title-icon">🔥</span>
                    热门资源
                </h3>

                <div class="task-list" style="margin-bottom: 30px;">
                    <div class="task-item">
                        <div class="task-status" style="background: var(--neon-pink);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">数据结构课件</h4>
                            <p class="task-time" style="font-size: 11px;">下载量: 1,234 次</p>
                        </div>
                    </div>

                    <div class="task-item">
                        <div class="task-status" style="background: var(--neon-pink);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">算法设计视频</h4>
                            <p class="task-time" style="font-size: 11px;">下载量: 987 次</p>
                        </div>
                    </div>

                    <div class="task-item">
                        <div class="task-status" style="background: var(--neon-pink);"></div>
                        <div class="task-content">
                            <h4 class="task-title" style="font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">人工智能课程</h4>
                            <p class="task-time" style="font-size: 11px;">下载量: 856 次</p>
                        </div>
                    </div>
                </div>

                <h3 class="panel-title" style="font-size: 17px; margin-bottom: 18px;">
                    <span class="title-icon">📊</span>
                    资源统计
                </h3>

                <div class="stats-overview">
                    <div class="stat-box">
                        <div class="stat-number">💾 1.2TB</div>
                        <div class="stat-label">总大小</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">📚 580+</div>
                        <div class="stat-label">资源数</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">🕐 24/7</div>
                        <div class="stat-label">在线服务</div>
                    </div>
                </div>
            </div>
        </aside>
    `
};

// 加载模块内容
function loadModule(moduleName) {
    const content = moduleTemplates[moduleName];
    if (!content) {
        console.error(`模块 ${moduleName} 不存在`);
        return;
    }

    const contentArea = document.getElementById('dynamicContent');
    
    // 淡出效果
    contentArea.style.transition = 'opacity 0.3s ease';
    contentArea.style.opacity = '0';
    
    setTimeout(() => {
        // 更新内容
        contentArea.innerHTML = content;
        
        // 淡入效果
        setTimeout(() => {
            contentArea.style.opacity = '1';
        }, 50);
        
        // 重新初始化交互功能
        initModuleInteractions();
        
        // 如果是个人中心，加载保存的个人数据并绘制3D头像
        if (moduleName === 'personal') {
            if (window.loadPersonalData) {
                loadPersonalData();
            }
            setTimeout(drawHologramAvatar, 100);
            setTimeout(() => {
                if (window.initAvatarUpload) {
                    initAvatarUpload();
                }
            }, 150);
        }
        
        // 如果是系统设置，初始化设置功能
        if (moduleName === 'settings') {
            setTimeout(() => {
                console.log('🔧 开始初始化系统设置...');
                if (window.initSettings) {
                    initSettings();
                    // 确保在初始化后加载保存的设置
                    if (window.loadSettings) {
                        setTimeout(() => {
                            loadSettings();
                            console.log('✅ 已加载保存的设置');
                        }, 100);
                    }
                } else {
                    console.error('⚠️ initSettings 函数未定义！');
                }
            }, 300);
        }
    }, 300);
    
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-module') === moduleName) {
            item.classList.add('active');
        }
    });
    
    // 显示通知
    const moduleNames = {
        'personal': '个人中心',
        'learning': '学习管理',
        'schedule': '课程表',
        'grades': '成绩查询',
        'consult': '在线咨询',
        'resources': '资源库',
        'settings': '系统设置'
    };
    
    // 模块切换时不显示通知
}

// 初始化模块交互
function initModuleInteractions() {
    // 重新绑定所有交互事件
    if (window.initInteractions) {
        window.initInteractions();
    }
    
    // 1. 进入课程按钮
    document.querySelectorAll('.enter-course-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.progress-card');
            const courseName = card.querySelector('.course-title').textContent;
            // 课程卡片点击时不显示通知
            /*
            if (window.showNotification) {
                showNotification(`📚 正在进入课程：${courseName}`, 'info');
            }
            */
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // 2. 任务操作按钮
    document.querySelectorAll('.task-action:not(.disabled)').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskTitle = this.closest('.task-item').querySelector('.task-title').textContent;
            // 学习管理模块中任务操作按钮点击时不显示通知
            /*
            if (window.showNotification) {
                showNotification(`✅ 开始任务：${taskTitle}`, 'success');
            }
            */
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // 3. 课程卡片点击
    document.querySelectorAll('.progress-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.enter-course-btn')) return;
            const courseName = this.querySelector('.course-title').textContent;
            const progress = this.querySelector('.percentage').textContent;
            // 课程卡片点击时不显示通知
        });
    });
    
    // 4. 成绩表格行点击
    document.querySelectorAll('.grade-table tbody tr').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            const courseName = this.cells[0].textContent;
            const credit = this.cells[1].textContent;
            const regular = this.cells[2].textContent;
            const final = this.cells[3].textContent;
            const total = this.cells[4].textContent.replace(/[^0-9]/g, '');
            const gpa = this.cells[5].textContent;
            
            showGradeDetails(courseName, credit, regular, final, total, gpa);
        });
    });
    
    // 5. 课程单元格点击 - 显示课程详情
    document.querySelectorAll('.course-name').forEach(courseName => {
        const cell = courseName.closest('.course-cell');
        if (cell && !cell.classList.contains('empty')) {
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = this.querySelector('.course-name').textContent;
                const infoText = this.querySelector('.course-info') ? this.querySelector('.course-info').textContent : '暂无详情';
                const infoParts = infoText.split('|').map(s => s.trim());
                const location = infoParts[0] || '未指定';
                const teacher = infoParts[1] || '未指定';
                const row = this.closest('tr');
                const timeSlot = row ? row.querySelector('.time-slot').textContent : '未知';
                const cellIndex = row ? Array.from(row.cells).indexOf(this) : 0;
                const weekdays = ['周一', '周二', '周三', '周四', '周五'];
                const weekday = weekdays[cellIndex - 1] || '未知';
                
                showCourseDetails(name, location, teacher, weekday, timeSlot);
            });
        }
    });
    
    // 6. 个人档案数据行点击 - 支持编辑
    document.querySelectorAll('.data-row').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            editPersonalData(this);
        });
    });
    
    // 7. 统计框点击
    document.querySelectorAll('.stat-box').forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', function() {
            const number = this.querySelector('.stat-number').textContent;
            const label = this.querySelector('.stat-label').textContent;
            // 统计框点击时不显示通知
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // 8. 工业按钮点击（个人中心的功能按钮）
    document.querySelectorAll('.industrial-button').forEach(btn => {
        // 如果没有onclick属性，手动添加点击效果
        if (!btn.hasAttribute('onclick')) {
            btn.addEventListener('click', function() {
                const btnText = this.querySelector('.button-text').textContent;
                // 工业按钮点击时不显示通知
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
        // 添加视觉反馈
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // 9. 下载资源按钮
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.style.cursor = 'pointer';
        if (!btn.hasAttribute('onclick')) {
            btn.addEventListener('click', function() {
                const resourceTitle = this.closest('.resource-card').querySelector('.resource-title').textContent;
                if (window.downloadResource) {
                    downloadResource(resourceTitle);
                }
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
    
    // 10. 聊天发送按钮
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn && !sendBtn.hasAttribute('onclick')) {
        sendBtn.addEventListener('click', function() {
            const input = document.getElementById('chatInput');
            if (input && input.value.trim()) {
                sendMessage();
            } else {
                // 聊天发送按钮点击时不显示通知
            }
        });
    }
    
    // 11. 聊天输入框回车发送
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                sendMessage();
            }
        });
    }
    
    // 12. 开关切换按钮
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        if (!toggle.hasAttribute('onclick')) {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
                const isActive = this.classList.contains('active');
                // 开关切换按钮点击时不显示通知
            });
        }
    });
    
    // 13. 资源卡片点击
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.download-btn')) return;
            const title = this.querySelector('.resource-title').textContent;
            // 资源卡片点击时不显示通知
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(0, 204, 255, 0.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 300);
        });
    });
    
    // 14. 课程表时间段点击
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.style.cursor = 'pointer';
        slot.addEventListener('click', function() {
            const timeText = this.textContent;
            // 课程表时间段点击时不显示通知
        });
    });
}

// 显示成绩详情弹窗
function showGradeDetails(courseName, credit, regular, final, total, gpa) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;';
    
    modal.innerHTML = `
        <div style="background:rgba(15,15,40,0.98);border:3px solid var(--pulse-blue);border-radius:15px;padding:40px;max-width:550px;width:90%;box-shadow:0 0 50px rgba(0,204,255,0.8);backdrop-filter:blur(25px);animation:scaleIn 0.3s ease;">
            <h2 style="color:var(--pulse-blue);text-shadow:0 0 20px var(--pulse-blue);margin-bottom:30px;font-size:26px;text-align:center;">📊 ${courseName}</h2>
            <div style="margin-bottom:25px;">
                <div style="display:flex;justify-content:space-between;padding:15px;background:rgba(0,0,0,0.3);border-radius:8px;margin-bottom:10px;">
                    <span style="color:var(--ice-blue);">学分：</span>
                    <span style="color:#FFF;font-weight:700;">${credit}</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:15px;background:rgba(0,0,0,0.3);border-radius:8px;margin-bottom:10px;">
                    <span style="color:var(--ice-blue);">平时成绩：</span>
                    <span style="color:#FFF;font-weight:700;">${regular} 分</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:15px;background:rgba(0,0,0,0.3);border-radius:8px;margin-bottom:10px;">
                    <span style="color:var(--ice-blue);">期末成绩：</span>
                    <span style="color:#FFF;font-weight:700;">${final} 分</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:15px;background:rgba(0,102,255,0.2);border:2px solid var(--pulse-blue);border-radius:8px;margin-bottom:10px;">
                    <span style="color:var(--pulse-blue);font-weight:700;">总评成绩：</span>
                    <span style="color:var(--crt-green);font-weight:900;font-size:24px;text-shadow:0 0 10px var(--crt-green);">${total} 分</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:15px;background:rgba(0,0,0,0.3);border-radius:8px;">
                    <span style="color:var(--ice-blue);">绩点：</span>
                    <span style="color:#FFF;font-weight:700;">${gpa}</span>
                </div>
            </div>
            <button id="closeGradeDetail" style="width:100%;padding:15px;background:linear-gradient(135deg,var(--molten-orange),var(--amber-glow));border:none;border-radius:8px;color:#FFF;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 0 20px rgba(255,69,0,0.5);">✖ 关闭</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // 添加关闭按钮事件
    const closeBtn = document.getElementById('closeGradeDetail');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
    }
    
    // 点击背景关闭
    modal.addEventListener('click', e => e.target === modal && modal.remove());
}

// 显示课程详情弹窗
function showCourseDetails(name, location, teacher, weekday, timeSlot) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;';
    
    modal.innerHTML = `
        <div style="background:rgba(15,15,40,0.98);border:3px solid var(--pulse-blue);border-radius:15px;padding:40px;max-width:550px;width:90%;box-shadow:0 0 50px rgba(0,204,255,0.8);backdrop-filter:blur(25px);animation:scaleIn 0.3s ease;">
            <h2 style="color:var(--pulse-blue);text-shadow:0 0 20px var(--pulse-blue);margin-bottom:30px;font-size:26px;text-align:center;display:flex;align-items:center;justify-content:center;gap:15px;"><span style="font-size:36px;">📚</span><span>${name}</span></h2>
            <div style="margin-bottom:25px;">
                <div style="display:flex;align-items:center;padding:18px;background:rgba(0,0,0,0.4);border-left:4px solid var(--crt-green);border-radius:8px;margin-bottom:12px;">
                    <span style="font-size:24px;margin-right:15px;">📍</span>
                    <div style="flex:1;">
                        <div style="color:var(--ice-blue);font-size:13px;margin-bottom:5px;">上课地点</div>
                        <div style="color:#FFF;font-weight:700;font-size:18px;">${location}</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;padding:18px;background:rgba(0,0,0,0.4);border-left:4px solid var(--amber-glow);border-radius:8px;margin-bottom:12px;">
                    <span style="font-size:24px;margin-right:15px;">👨‍🏫</span>
                    <div style="flex:1;">
                        <div style="color:var(--ice-blue);font-size:13px;margin-bottom:5px;">任课教师</div>
                        <div style="color:#FFF;font-weight:700;font-size:18px;">${teacher}</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;padding:18px;background:rgba(0,102,255,0.2);border:2px solid var(--pulse-blue);border-radius:8px;margin-bottom:12px;">
                    <span style="font-size:24px;margin-right:15px;">⏰</span>
                    <div style="flex:1;">
                        <div style="color:var(--pulse-blue);font-size:13px;margin-bottom:5px;">上课时间</div>
                        <div style="color:var(--crt-green);font-weight:700;font-size:18px;text-shadow:0 0 8px var(--crt-green);">${weekday} ${timeSlot}</div>
                    </div>
                </div>
            </div>
            <button id="closeCourseDetail" style="width:100%;padding:15px;background:linear-gradient(135deg,var(--molten-orange),var(--amber-glow));border:none;border-radius:8px;color:#FFF;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 0 20px rgba(255,69,0,0.5);">✖ 关闭</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // 添加关闭按钮事件
    const closeBtn = document.getElementById('closeCourseDetail');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
    }
    
    // 点击背景关闭
    modal.addEventListener('click', e => e.target === modal && modal.remove());
}

// 导航栏点击事件
document.addEventListener('DOMContentLoaded', function() {
    // 绑定导航项点击事件
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const moduleName = this.getAttribute('data-module');
            loadModule(moduleName);
        });
    });
    
    // 默认加载个人中心
    loadModule('personal');
    
    console.log('%c🌐 单页应用系统已启动', 'color: #00CCFF; font-size: 18px; font-weight: bold;');
    console.log('%c✓ 模块切换系统就绪', 'color: #39FF14; font-size: 14px;');
});

// ==================== 全局功能函数 ====================

// 发送聊天消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) {
        // 聊天发送按钮点击时不显示通知
        return;
    }
    
    // 显示用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit', second: '2-digit'})}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // 清空输入框
    input.value = '';
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 模拟AI回复
    setTimeout(() => {
        const aiResponses = [
            '我已经收到您的问题，正在为您查询相关信息...',
            '根据您的问题，我建议您查看相关课程资料或联系任课教师。',
            '这是一个很好的问题！您可以在资源库中找到相关学习材料。',
            '感谢您的咨询，我会尽快为您提供帮助。如有紧急问题，请联系教务处。',
            '您的问题已记录，我们会在24小时内给予回复。'
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message assistant';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">${randomResponse}</div>
                <div class="message-time">${new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit', second: '2-digit'})}</div>
            </div>
        `;
        messagesContainer.appendChild(aiMessage);
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // AI助手回复时不显示通知
    }, 1000);
}

// 下载资源
function downloadResource(resourceName) {
    // 创建进度弹窗
    const progressAlert = document.createElement('div');
    progressAlert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 15, 40, 0.98);
        border: 3px solid var(--pulse-blue);
        border-radius: 15px;
        padding: 40px;
        min-width: 450px;
        box-shadow: 0 0 50px rgba(0, 204, 255, 0.8);
        backdrop-filter: blur(25px);
        z-index: 10000;
        animation: scaleIn 0.3s ease;
    `;
    
    progressAlert.innerHTML = `
        <h3 style="color: var(--pulse-blue); text-align: center; margin-bottom: 25px; font-size: 20px; text-shadow: 0 0 15px var(--pulse-blue);">
            📥 正在下载资源
        </h3>
        <div style="text-align: center; margin-bottom: 20px; font-size: 16px; color: #FFF;">
            ${resourceName}
        </div>
        <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; height: 30px; overflow: hidden; margin-bottom: 15px; border: 2px solid var(--steel-blue);">
            <div id="downloadProgress" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--pulse-blue), var(--crt-green)); transition: width 0.3s ease; box-shadow: 0 0 15px var(--pulse-blue);"></div>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--ice-blue); font-size: 14px;">
            <span id="downloadPercent">0%</span>
            <span id="downloadSpeed">0 MB/s</span>
        </div>
    `;
    
    document.body.appendChild(progressAlert);
    
    // 模拟下载进度
    let progress = 0;
    const progressBar = document.getElementById('downloadProgress');
    const percentText = document.getElementById('downloadPercent');
    const speedText = document.getElementById('downloadSpeed');
    
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        percentText.textContent = Math.floor(progress) + '%';
        speedText.textContent = (Math.random() * 8 + 2).toFixed(2) + ' MB/s';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressAlert.remove();
                // 资源下载完成时不显示通知
            }, 500);
        }
    }, 200);
}

// 将函数暴露到全局
window.sendMessage = sendMessage;
window.downloadResource = downloadResource;

// ==================== 个人信息编辑功能 ====================

// 编辑个人档案数据
function editPersonalData(dataRow) {
    const labelElem = dataRow.querySelector('.data-label');
    const valueElem = dataRow.querySelector('.data-value');
    
    if (!labelElem || !valueElem) return;
    
    const labelText = labelElem.textContent.replace('：', '').trim();
    const currentValue = valueElem.textContent.trim();
    
    // 创建编辑弹窗
    const editModal = document.createElement('div');
    editModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(10, 10, 40, 0.95), rgba(20, 20, 60, 0.95));
        border: 2px solid var(--pulse-blue);
        border-radius: 15px;
        padding: 35px;
        min-width: 450px;
        box-shadow: 0 0 50px rgba(0, 204, 255, 0.8);
        backdrop-filter: blur(25px);
        z-index: 10000;
        animation: scaleIn 0.3s ease;
    `;
    
    editModal.innerHTML = `
        <h3 style="color: var(--pulse-blue); text-align: center; margin-bottom: 25px; font-size: 22px; text-shadow: 0 0 15px var(--pulse-blue);">
            ✏️ 编辑${labelText}
        </h3>
        <div style="margin-bottom: 30px;">
            <label style="display: block; color: var(--ice-blue); margin-bottom: 10px; font-size: 14px;">${labelText}：</label>
            <input type="text" id="editValue" value="${currentValue}" style="
                width: 100%;
                padding: 14px;
                background: rgba(0, 0, 0, 0.5);
                border: 2px solid var(--steel-blue);
                border-radius: 8px;
                color: #FFF;
                font-size: 16px;
                outline: none;
                transition: all 0.3s ease;
                box-sizing: border-box;
            " />
        </div>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="saveBtn" style="
                padding: 12px 35px;
                background: linear-gradient(135deg, var(--electric-blue), var(--pulse-blue));
                border: none;
                border-radius: 8px;
                color: #FFF;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
                transition: all 0.3s ease;
            ">💾 保存</button>
            <button id="cancelBtn" style="
                padding: 12px 35px;
                background: rgba(100, 100, 100, 0.5);
                border: 2px solid var(--steel-blue);
                border-radius: 8px;
                color: #FFF;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
            ">❌ 取消</button>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    // 输入框聚焦效果
    const input = editModal.querySelector('#editValue');
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--pulse-blue)';
        this.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.5)';
    });
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--steel-blue)';
        this.style.boxShadow = 'none';
    });
    
    // 保存按钮
    const saveBtn = editModal.querySelector('#saveBtn');
    saveBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, var(--molten-orange), var(--amber-glow))';
        this.style.boxShadow = '0 0 25px rgba(255, 69, 0, 0.6)';
        this.style.transform = 'scale(1.05)';
    });
    saveBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, var(--electric-blue), var(--pulse-blue))';
        this.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.5)';
        this.style.transform = 'scale(1)';
    });
    saveBtn.addEventListener('click', function() {
        const newValue = input.value.trim();
        
        if (newValue) {
            valueElem.textContent = newValue;
            
            // 保存到localStorage
            savePersonalData(labelText, newValue);
            
            editModal.remove();
            
            // 个人中心数字档案修改时不显示通知
            /*
            if (window.showNotification) {
                showNotification(`✓ ${labelText}已更新为：${newValue}`, 'success');
            }
            */
            
            // 动画效果
            dataRow.style.boxShadow = '0 0 25px rgba(57, 255, 20, 0.6)';
            dataRow.style.borderLeft = '4px solid var(--crt-green)';
            setTimeout(() => {
                dataRow.style.boxShadow = '';
                dataRow.style.borderLeft = '';
            }, 800);
        } else {
            // 个人中心数字档案修改时不显示通知
            /*
            if (window.showNotification) {
                showNotification('⚠️ 请输入有效内容！', 'warning');
            }
            */
        }
    });
    
    // 取消按钮
    const cancelBtn = editModal.querySelector('#cancelBtn');
    cancelBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(150, 150, 150, 0.5)';
        this.style.borderColor = 'var(--ice-blue)';
        this.style.transform = 'scale(1.05)';
    });
    cancelBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(100, 100, 100, 0.5)';
        this.style.borderColor = 'var(--steel-blue)';
        this.style.transform = 'scale(1)';
    });
    cancelBtn.addEventListener('click', function() {
        editModal.remove();
    });
    
    // 聚焦输入框并全选
    setTimeout(() => {
        input.focus();
        input.select();
    }, 100);
    
    // 按Enter键保存
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });
}

// 保存个人数据到localStorage
function savePersonalData(label, value) {
    let personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
    personalData[label] = value;
    localStorage.setItem('personalData', JSON.stringify(personalData));
}

// 加载保存的个人数据
function loadPersonalData() {
    const personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
    
    document.querySelectorAll('.data-row').forEach(row => {
        const labelElem = row.querySelector('.data-label');
        const valueElem = row.querySelector('.data-value');
        
        if (labelElem && valueElem) {
            const labelText = labelElem.textContent.replace('：', '').trim();
            if (personalData[labelText]) {
                valueElem.textContent = personalData[labelText];
            }
        }
    });
}

// 将编辑功能暴露到全局
window.editPersonalData = editPersonalData;
window.loadPersonalData = loadPersonalData;

// ==================== 头像上传与粒子效果 ====================

// 初始化头像上传功能
function initAvatarUpload() {
    const avatarContainer = document.getElementById('avatarContainer');
    const avatarUpload = document.getElementById('avatarUpload');
    const userAvatar = document.getElementById('userAvatar');
    const avatar3d = document.getElementById('avatar3d');
    const uploadHint = document.getElementById('uploadHint');
    
    if (!avatarContainer || !avatarUpload || !userAvatar) return;
    
    // 加载保存的头像
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        userAvatar.src = savedAvatar;
        userAvatar.style.display = 'block';
        avatar3d.style.display = 'none';
        // 隐藏上传提示
        if (uploadHint) {
            uploadHint.style.display = 'none';
        }
    }
    
    // 点击容器触发文件选择
    avatarContainer.addEventListener('click', function() {
        avatarUpload.click();
    });
    
    // 文件选择后处理
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            if (window.showNotification) {
                showNotification('⚠️ 请选择图片文件！', 'warning');
            }
            return;
        }
        
        // 验证文件大小（限制2MB）
        if (file.size > 2 * 1024 * 1024) {
            if (window.showNotification) {
                showNotification('⚠️ 图片大小不能超过2MB！', 'warning');
            }
            return;
        }
        
        // 读取图片并打开裁切编辑器
        const reader = new FileReader();
        reader.onload = function(event) {
            openImageCropper(event.target.result);
        };
        reader.readAsDataURL(file);
    });
    
    // 如果有头像，启动粒子效果
    if (savedAvatar) {
        startParticleEffect();
    }
}

// 打开图片裁切编辑器
function openImageCropper(imageSrc) {
    // 创建裁切编辑器容器
    const cropperModal = document.createElement('div');
    cropperModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    cropperModal.innerHTML = `
        <h2 style="color: var(--pulse-blue); margin-bottom: 20px; text-shadow: 0 0 15px var(--pulse-blue); font-size: 24px;">✂️ 裁切头像</h2>
        <div style="position: relative; width: 400px; height: 400px; background: rgba(20, 20, 40, 0.8); border-radius: 10px; overflow: hidden; border: 2px solid var(--pulse-blue); box-shadow: 0 0 30px rgba(0, 204, 255, 0.5);">
            <canvas id="cropCanvas" width="400" height="400" style="display: block; cursor: move;"></canvas>
            <div id="cropCircle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 280px; height: 280px; border: 3px solid var(--crt-green); border-radius: 50%; pointer-events: none; box-shadow: 0 0 20px var(--crt-green), inset 0 0 20px rgba(57, 255, 20, 0.2);"></div>
        </div>
        <div style="margin-top: 25px; display: flex; gap: 15px; align-items: center;">
            <label style="color: var(--ice-blue); font-size: 14px;">缩放：</label>
            <input type="range" id="scaleSlider" min="50" max="200" value="100" style="width: 200px; cursor: pointer;" />
            <span id="scaleValue" style="color: #FFF; font-size: 14px; min-width: 50px;">100%</span>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 20px;">
            <button id="cropConfirm" style="padding: 12px 40px; background: linear-gradient(135deg, var(--electric-blue), var(--pulse-blue)); border: none; border-radius: 8px; color: #FFF; font-size: 16px; font-weight: 700; cursor: pointer; box-shadow: 0 0 20px rgba(0, 204, 255, 0.6);">✓ 确认</button>
            <button id="cropCancel" style="padding: 12px 40px; background: rgba(100, 100, 100, 0.5); border: 2px solid var(--steel-blue); border-radius: 8px; color: #FFF; font-size: 16px; font-weight: 700; cursor: pointer;">✗ 取消</button>
        </div>
    `;
    
    document.body.appendChild(cropperModal);
    
    // 初始化裁切画布
    const canvas = document.getElementById('cropCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    img.onload = function() {
        // 计算初始缩放以适应画布
        const initialScale = Math.min(400 / img.width, 400 / img.height);
        scale = initialScale;
        document.getElementById('scaleSlider').value = 100;
        
        // 居中图片
        offsetX = (400 - img.width * scale) / 2;
        offsetY = (400 - img.height * scale) / 2;
        
        drawImage();
    };
    img.src = imageSrc;
    
    // 绘制图片
    function drawImage() {
        ctx.clearRect(0, 0, 400, 400);
        ctx.save();
        ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
        ctx.restore();
    }
    
    // 缩放滑块
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleValue = document.getElementById('scaleValue');
    scaleSlider.addEventListener('input', function() {
        const initialScale = Math.min(400 / img.width, 400 / img.height);
        scale = initialScale * (this.value / 100);
        scaleValue.textContent = this.value + '%';
        
        // 重新居中
        offsetX = (400 - img.width * scale) / 2;
        offsetY = (400 - img.height * scale) / 2;
        
        drawImage();
    });
    
    // 鼠标拖动
    canvas.addEventListener('mousedown', function(e) {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left - offsetX;
        startY = e.clientY - rect.top - offsetY;
    });
    
    canvas.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        const rect = canvas.getBoundingClientRect();
        offsetX = e.clientX - rect.left - startX;
        offsetY = e.clientY - rect.top - startY;
        drawImage();
    });
    
    canvas.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
        isDragging = false;
    });
    
    // 确认按钮
    document.getElementById('cropConfirm').addEventListener('click', function() {
        // 创建圆形裁切
        const cropSize = 280;
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropSize;
        cropCanvas.height = cropSize;
        const cropCtx = cropCanvas.getContext('2d');
        
        // 绘制圆形裁切
        cropCtx.beginPath();
        cropCtx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2);
        cropCtx.closePath();
        cropCtx.clip();
        
        // 计算裁切区域
        const centerX = 200;
        const centerY = 200;
        const sourceX = centerX - cropSize / 2 - offsetX;
        const sourceY = centerY - cropSize / 2 - offsetY;
        const sourceWidth = cropSize;
        const sourceHeight = cropSize;
        
        cropCtx.drawImage(
            img,
            sourceX / scale, sourceY / scale, sourceWidth / scale, sourceHeight / scale,
            0, 0, cropSize, cropSize
        );
        
        // 保存裁切后的图片
        const croppedImage = cropCanvas.toDataURL('image/png');
        
        const userAvatar = document.getElementById('userAvatar');
        const avatar3d = document.getElementById('avatar3d');
        const uploadHint = document.getElementById('uploadHint');
        
        userAvatar.src = croppedImage;
        userAvatar.style.display = 'block';
        avatar3d.style.display = 'none';
        
        // 隐藏上传提示文字
        if (uploadHint) {
            uploadHint.style.display = 'none';
        }
        
        // 保存到localStorage
        localStorage.setItem('userAvatar', croppedImage);
        
        if (window.showNotification) {
            showNotification('✓ 头像设置成功！', 'success');
        }
        
        // 启动粒子效果
        startParticleEffect();
        
        // 关闭编辑器
        cropperModal.remove();
    });
    
    // 取消按钮
    document.getElementById('cropCancel').addEventListener('click', function() {
        cropperModal.remove();
    });
    
    // ESC键关闭
    function handleEscKey(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            cropperModal.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    document.addEventListener('keydown', handleEscKey);
}

// 粒子效果 - 有机能量场版本
function startParticleEffect() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 45;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let frameCount = 0;
    
    // 噪声函数 - 模拟自然随机性
    function noise(x, y) {
        return Math.sin(x * 0.1) * Math.cos(y * 0.1) * Math.sin((x + y) * 0.05);
    }
    
    // 粒子类 - 模拟能量粒子
    class EnergyParticle {
        constructor() {
            this.reset();
            // 每个粒子的独特"个性"
            this.personality = Math.random();
            this.energyLevel = 0.5 + Math.random() * 0.5;
        }
        
        reset() {
            // 从中心或边缘随机生成
            if (Math.random() > 0.5) {
                // 从中心向外
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 20;
                this.x = centerX + Math.cos(angle) * dist;
                this.y = centerY + Math.sin(angle) * dist;
            } else {
                // 从边缘向内
                const angle = Math.random() * Math.PI * 2;
                const dist = 65 + Math.random() * 10;
                this.x = centerX + Math.cos(angle) * dist;
                this.y = centerY + Math.sin(angle) * dist;
            }
            
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = 0.8 + Math.random() * 1.5;
            this.alpha = Math.random();
            this.hue = Math.random() * 60 + 180; // 180-240度，青蓝色范围
            this.brightness = 50 + Math.random() * 50;
            this.life = 100 + Math.random() * 100;
            this.maxLife = this.life;
        }
        
        update(frame) {
            // 使用噪声场影响粒子运动
            const noiseX = noise(this.x * 0.01 + frame * 0.01, this.y * 0.01);
            const noiseY = noise(this.x * 0.01, this.y * 0.01 + frame * 0.01);
            
            // 计算到中心的距离和角度
            const dx = this.x - centerX;
            const dy = this.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            // 混沌运动：噪声 + 切向力 + 径向力
            const tangentialForce = 0.3 * this.personality;
            const radialForce = (dist > 60 ? -0.1 : 0.05) * (1 - this.personality);
            
            this.vx += noiseX * 0.5 + Math.cos(angle + Math.PI/2) * tangentialForce + Math.cos(angle) * radialForce;
            this.vy += noiseY * 0.5 + Math.sin(angle + Math.PI/2) * tangentialForce + Math.sin(angle) * radialForce;
            
            // 速度限制和衰减
            this.vx *= 0.95;
            this.vy *= 0.95;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 3) {
                this.vx = (this.vx / speed) * 3;
                this.vy = (this.vy / speed) * 3;
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            // 软边界 - 像磁场一样推回
            if (dist > 70) {
                this.vx -= Math.cos(angle) * 0.2;
                this.vy -= Math.sin(angle) * 0.2;
            } else if (dist < 10) {
                this.vx += Math.cos(angle) * 0.1;
                this.vy += Math.sin(angle) * 0.1;
            }
            
            // 不规则的alpha变化
            this.alpha += (Math.random() - 0.5) * 0.05;
            this.alpha = Math.max(0.1, Math.min(0.9, this.alpha));
            
            // 色相微调
            this.hue += (Math.random() - 0.5) * 2;
            
            // 生命周期
            this.life--;
            if (this.life <= 0 || dist > 80) {
                this.reset();
            }
        }
        
        draw() {
            const lifeRatio = this.life / this.maxLife;
            const finalAlpha = this.alpha * lifeRatio * this.energyLevel;
            
            // 使用HSL颜色，更自然
            const color = `hsla(${this.hue}, 100%, ${this.brightness}%, ${finalAlpha})`;
            
            // 绘制柔和的光晕
            const glowSize = this.size * (3 + Math.sin(frameCount * 0.1 + this.personality * 10) * 0.5);
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, glowSize
            );
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, ${this.brightness}%, ${finalAlpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // 核心亮点
            if (this.energyLevel > 0.7 && Math.random() > 0.8) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.8})`;
                ctx.fill();
            }
        }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new EnergyParticle());
    }
    
    // 绘制能量流连线
    function drawEnergyFlow() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // 只连接很近的粒子，且概率性连接
                if (dist < 30 && Math.random() > 0.7) {
                    const alpha = (1 - dist / 30) * 0.1 * p1.alpha * p2.alpha;
                    const avgHue = (p1.hue + p2.hue) / 2;
                    
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `hsla(${avgHue}, 100%, 60%, ${alpha})`;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            });
        });
    }
    
    // 绘制中心能量源
    function drawEnergyCore() {
        const coreSize = 5 + Math.sin(frameCount * 0.03) * 2;
        const coreAlpha = 0.05 + Math.sin(frameCount * 0.05) * 0.03;
        
        const coreGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, 40
        );
        coreGradient.addColorStop(0, `rgba(100, 200, 255, ${coreAlpha})`);
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
    }
    
    // 动画循环
    function animate() {
        // 完全清除画布，不留黑色背景
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        frameCount++;
        
        // 绘制中心能量源
        drawEnergyCore();
        
        // 更新和绘制粒子
        particles.forEach(p => {
            p.update(frameCount);
            p.draw();
        });
        
        // 绘制能量流
        drawEnergyFlow();
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 将函数暴露到全局
window.initSettings = initSettings;
window.initAvatarUpload = initAvatarUpload;

// ==================== 系统设置功能 ====================

// 初始化系统设置
function initSettings() {
    console.log('🔧 initSettings 函数被调用');
    
    // 添加必要的CSS样式（如果不存在）
    if (!document.getElementById('settings-styles')) {
        console.log('📝 添加CSS样式...');
        const styleSheet = document.createElement('style');
        styleSheet.id = 'settings-styles';
        styleSheet.textContent = `
            .toggle-switch {
                width: 50px;
                height: 24px;
                background: rgba(100, 100, 100, 0.5);
                border: 2px solid var(--steel-blue);
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
                border-color: var(--pulse-blue);
                box-shadow: 0 0 10px rgba(0, 204, 255, 0.3);
            }
            .toggle-switch.active {
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.5), rgba(0, 204, 255, 0.6));
                border-color: var(--pulse-blue);
                box-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
            }
            .toggle-switch.active::after {
                left: 26px;
                background: var(--pulse-blue);
                box-shadow: 0 0 10px var(--pulse-blue), 0 2px 6px rgba(0, 0, 0, 0.4);
            }
            .industrial-button {
                position: relative;
                width: 100%;
                padding: 0;
                background: transparent;
                border: 2px solid var(--electric-blue);
                border-radius: 8px;
                overflow: visible;
                cursor: pointer !important;
                transition: all 0.3s ease;
                z-index: 100;
            }
            .industrial-button:hover {
                border-color: var(--pulse-blue);
                box-shadow: 0 0 20px rgba(0, 204, 255, 0.5);
                transform: translateY(-2px);
            }
            .button-surface {
                display: block;
                padding: 12px 20px;
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(0, 204, 255, 0.2));
                position: relative;
                overflow: hidden;
            }
            .button-text {
                position: relative;
                z-index: 2;
                color: #FFF;
                font-weight: 600;
            }
            .charge-animation {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0, 204, 255, 0.3), transparent);
                transition: left 0.5s ease;
            }
            .industrial-button:hover .charge-animation {
                left: 100%;
            }
        `;
        document.head.appendChild(styleSheet);
        console.log('✅ CSS样式已添加');
    }
    
    // 加载保存的设置
    loadSettings();
    loadAccountInfo();
    
    // 绑定主题选择下拉框
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            console.log('🎨 主题切换为:', this.value);
            applyTheme(this.value);
            // 自动保存设置
            saveSettings(false);
        });
    }
    
    // 保存按钮已移除
    
    // 绑定开关按钮
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    console.log(`📍 找到 ${toggleSwitches.length} 个开关按钮`);
    
    if (toggleSwitches.length === 0) {
        console.warn('⚠️ 没有找到任何开关按钮！');
    }
    
    toggleSwitches.forEach((toggle, index) => {
        // 清除可能存在的旧事件监听器
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // 添加点击事件
        newToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log(`🔘 点击了开关按钮 ${index + 1}`);
            const wasBefore = this.classList.contains('active');
            this.classList.toggle('active');
            const isAfter = this.classList.contains('active');
            console.log(`  状态: ${wasBefore ? 'ON' : 'OFF'} → ${isAfter ? 'ON' : 'OFF'}`);
            
            // 自动保存设置
            saveSettings(false);
        });
        
        // 添加鼠标悬停测试
        newToggle.addEventListener('mouseenter', function() {
            console.log(`🖱️ 鼠标进入开关 ${index + 1}`);
        });
        
        // 显示初始状态
        const isActive = newToggle.classList.contains('active');
        const settingKey = newToggle.getAttribute('data-setting');
        console.log(`  开关 ${index + 1} (${settingKey}): ${isActive ? 'ON' : 'OFF'}`);
    });
    
    // 确保所有快捷操作按钮都有正确的事件绑定
    const industrialButtons = document.querySelectorAll('.industrial-button');
    industrialButtons.forEach(button => {
        // 如果按钮没有onclick属性，添加默认点击效果
        if (!button.hasAttribute('onclick')) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const btnText = this.querySelector('.button-text')?.textContent || '按钮';
                console.log(`⚡ 点击了工业按钮: ${btnText}`);
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
    
    console.log('✅ 系统设置已初始化完成');
    console.log('💡 提示：快捷操作按钮使用onclick内联事件');
}

// 将函数暴露到全局
window.initSettings = initSettings;
window.editAccountInfo = editAccountInfo;

// 加载设置
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('systemSettings') || '{}');
    
    // 加载开关状态
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        const settingKey = toggle.getAttribute('data-setting');
        if (settingKey) {
            // 先移除所有开关的active类
            toggle.classList.remove('active');
            // 如果设置中保存为true，则添加active类
            if (settings[settingKey]) {
                toggle.classList.add('active');
            }
        }
    });
    
    // 加载主题
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect && settings.theme) {
        themeSelect.value = settings.theme;
        applyTheme(settings.theme);
    }
}

// 保存设置
function saveSettings(showNotification = true) {
    const settings = {};
    
    // 保存开关状态
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        const settingKey = toggle.getAttribute('data-setting');
        if (settingKey) {
            settings[settingKey] = toggle.classList.contains('active');
        }
    });
    
    // 保存主题
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        settings.theme = themeSelect.value;
        applyTheme(themeSelect.value);
    }
    
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    
    // 只有在系统设置模块中点击保存按钮时才显示通知
    if (showNotification && window.showNotification) {
        showNotification('✓ 设置已保存！', 'success');
    }
}

// 应用主题
function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'classic') {
        // 经典蓝色主题
        root.style.setProperty('--pulse-blue', '#1E90FF');
        root.style.setProperty('--electric-blue', '#4169E1');
        root.style.setProperty('--crt-green', '#32CD32');
        root.style.setProperty('--neon-pink', '#FF1493');
        root.style.setProperty('--amber-glow', '#FFA500');
        root.style.setProperty('--deep-space', '#000033');
    } else if (theme === 'dark') {
        // 暗黑模式
        root.style.setProperty('--pulse-blue', '#4A90E2');
        root.style.setProperty('--electric-blue', '#2E5C8A');
        root.style.setProperty('--crt-green', '#50C878');
        root.style.setProperty('--neon-pink', '#C71585');
        root.style.setProperty('--amber-glow', '#FF8C00');
        root.style.setProperty('--deep-space', '#0A0A0A');
    } else {
        // 赛博朋克默认主题
        root.style.setProperty('--pulse-blue', '#00CCFF');
        root.style.setProperty('--electric-blue', '#0066FF');
        root.style.setProperty('--crt-green', '#39FF14');
        root.style.setProperty('--neon-pink', '#FF0080');
        root.style.setProperty('--amber-glow', '#FF8C00');
        root.style.setProperty('--deep-space', '#0A0A20');
    }
}

// 加载账户信息
function loadAccountInfo() {
    const personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
    
    const usernameElem = document.getElementById('username');
    const studentIdElem = document.getElementById('studentId');
    const emailElem = document.getElementById('email');
    
    if (usernameElem && personalData['姓名']) {
        usernameElem.textContent = personalData['姓名'];
    }
    if (studentIdElem && personalData['学号']) {
        studentIdElem.textContent = personalData['学号'];
    }
    
    const accountInfo = JSON.parse(localStorage.getItem('accountInfo') || '{}');
    if (emailElem && accountInfo.email) {
        emailElem.textContent = accountInfo.email;
    }
}

// 编辑账户信息
function editAccountInfo(label, fieldId) {
    const currentValue = document.getElementById(fieldId).textContent;
    
    const editModal = document.createElement('div');
    editModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(10, 10, 40, 0.95), rgba(20, 20, 60, 0.95));
        border: 2px solid var(--pulse-blue);
        border-radius: 15px;
        padding: 35px;
        min-width: 450px;
        box-shadow: 0 0 50px rgba(0, 204, 255, 0.8);
        backdrop-filter: blur(25px);
        z-index: 10000;
    `;
    
    const isEmail = fieldId === 'email';
    const inputHtml = isEmail ? `
        <select id="emailDomain" style="width: 100%; padding: 14px; background: rgba(0, 0, 0, 0.5); border: 2px solid var(--steel-blue); border-radius: 8px; color: #FFF; font-size: 16px; outline: none; margin-bottom: 10px;">
            <option value="@gdut.edu.cn">@gdut.edu.cn</option>
            <option value="@qq.com">@qq.com</option>
            <option value="@163.com">@163.com</option>
            <option value="@gmail.com">@gmail.com</option>
        </select>
        <input type="text" id="editValue" value="${currentValue.split('@')[0]}" style="width: 100%; padding: 14px; background: rgba(0, 0, 0, 0.5); border: 2px solid var(--steel-blue); border-radius: 8px; color: #FFF; font-size: 16px; outline: none; box-sizing: border-box;" />
    ` : `
        <input type="text" id="editValue" value="${currentValue}" style="width: 100%; padding: 14px; background: rgba(0, 0, 0, 0.5); border: 2px solid var(--steel-blue); border-radius: 8px; color: #FFF; font-size: 16px; outline: none; box-sizing: border-box;" />
    `;
    
    editModal.innerHTML = `
        <h3 style="color: var(--pulse-blue); text-align: center; margin-bottom: 25px; font-size: 22px; text-shadow: 0 0 15px var(--pulse-blue);">
            ✏️ 编辑${label}
        </h3>
        <div style="margin-bottom: 30px;">
            <label style="display: block; color: var(--ice-blue); margin-bottom: 10px; font-size: 14px;">${label}：</label>
            ${inputHtml}
        </div>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="saveBtn" style="padding: 12px 35px; background: linear-gradient(135deg, var(--electric-blue), var(--pulse-blue)); border: none; border-radius: 8px; color: #FFF; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 0 15px rgba(0, 204, 255, 0.5);">💾 保存</button>
            <button id="cancelBtn" style="padding: 12px 35px; background: rgba(100, 100, 100, 0.5); border: 2px solid var(--steel-blue); border-radius: 8px; color: #FFF; font-size: 15px; font-weight: 700; cursor: pointer;">❌ 取消</button>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    const input = document.getElementById('editValue');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    saveBtn.addEventListener('click', function() {
        let newValue = input.value.trim();
        
        if (isEmail) {
            const domain = document.getElementById('emailDomain').value;
            newValue = newValue + domain;
        }
        
        if (newValue) {
            document.getElementById(fieldId).textContent = newValue;
            
            // 保存到localStorage
            if (fieldId === 'email') {
                const accountInfo = JSON.parse(localStorage.getItem('accountInfo') || '{}');
                accountInfo.email = newValue;
                localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
            } else {
                const personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
                personalData[label] = newValue;
                localStorage.setItem('personalData', JSON.stringify(personalData));
                
                // 同步更新个人中心的数据
                const dataRows = document.querySelectorAll('.data-row');
                dataRows.forEach(row => {
                    const dataLabel = row.querySelector('.data-label');
                    if (dataLabel && dataLabel.textContent.replace('：', '').trim() === label) {
                        const dataValue = row.querySelector('.data-value');
                        if (dataValue) {
                            dataValue.textContent = newValue;
                        }
                    }
                });
            }
            
            editModal.remove();
        }
    });
    
    cancelBtn.addEventListener('click', function() {
        editModal.remove();
    });
    
    setTimeout(() => input.focus(), 100);
}

// 将函数暴露到全局
window.initSettings = initSettings;
window.editAccountInfo = editAccountInfo;

// 修改密码功能
function openChangePasswordModal() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    modal.innerHTML = `
        <div style="background:rgba(15,15,40,0.98);border:3px solid var(--pulse-blue);border-radius:15px;padding:40px;max-width:500px;width:90%;box-shadow:0 0 50px rgba(0,204,255,0.8);">
            <h2 style="color:var(--pulse-blue);text-shadow:0 0 20px var(--pulse-blue);margin-bottom:30px;font-size:24px;text-align:center;">🔑 修改密码</h2>
            <div style="margin-bottom:20px;">
                <label style="display:block;color:var(--ice-blue);margin-bottom:8px;font-size:13px;">旧密码：</label>
                <input type="password" id="oldPassword" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:20px;">
                <label style="display:block;color:var(--ice-blue);margin-bottom:8px;font-size:13px;">新密码：</label>
                <input type="password" id="newPassword" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:30px;">
                <label style="display:block;color:var(--ice-blue);margin-bottom:8px;font-size:13px;">确认新密码：</label>
                <input type="password" id="confirmPassword" style="width:100%;padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;box-sizing:border-box;" />
            </div>
            <div style="display:flex;gap:15px;">
                <button id="confirmChangePassword" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--electric-blue),var(--pulse-blue));border:none;border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 0 15px rgba(0,204,255,0.5);">✓ 确认修改</button>
                <button id="cancelChangePassword" style="flex:1;padding:12px;background:rgba(100,100,100,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;">✖ 取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('confirmChangePassword').addEventListener('click', function() {
        const oldPwd = document.getElementById('oldPassword').value;
        const newPwd = document.getElementById('newPassword').value;
        const confirmPwd = document.getElementById('confirmPassword').value;
        
        if (!oldPwd || !newPwd || !confirmPwd) {
            return;
        }
        
        if (newPwd !== confirmPwd) {
            return;
        }
        
        if (newPwd.length < 6) {
            return;
        }
        
        // 保存新密码
        localStorage.setItem('userPassword', newPwd);
        modal.remove();
    });
    
    document.getElementById('cancelChangePassword').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', e => e.target === modal && modal.remove());
}

// 绑定邮箱功能
function openBindEmailModal() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    modal.innerHTML = `
        <div style="background:rgba(15,15,40,0.98);border:3px solid var(--pulse-blue);border-radius:15px;padding:40px;max-width:500px;width:90%;box-shadow:0 0 50px rgba(0,204,255,0.8);">
            <h2 style="color:var(--pulse-blue);text-shadow:0 0 20px var(--pulse-blue);margin-bottom:30px;font-size:24px;text-align:center;">📧 绑定邮箱</h2>
            <div style="margin-bottom:20px;">
                <label style="display:block;color:var(--ice-blue);margin-bottom:8px;font-size:13px;">邮箱地址：</label>
                <div style="display:flex;gap:10px;">
                    <input type="text" id="emailPrefix" placeholder="请输入邮箱前缀" style="flex:1;padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;" />
                    <select id="emailDomainBind" style="padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;cursor:pointer;">
                        <option value="@gdut.edu.cn">@gdut.edu.cn</option>
                        <option value="@qq.com">@qq.com</option>
                        <option value="@163.com">@163.com</option>
                        <option value="@gmail.com">@gmail.com</option>
                    </select>
                </div>
            </div>
            <div style="margin-bottom:20px;">
                <label style="display:block;color:var(--ice-blue);margin-bottom:8px;font-size:13px;">验证码：</label>
                <div style="display:flex;gap:10px;">
                    <input type="text" id="verificationCode" placeholder="请输入验证码" style="flex:1;padding:12px;background:rgba(0,0,0,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:14px;" />
                    <button id="getCodeBtn" style="padding:12px 20px;background:linear-gradient(135deg,var(--amber-glow),var(--molten-orange));border:none;border-radius:8px;color:#FFF;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;">获取验证码</button>
                </div>
            </div>
            <div style="display:flex;gap:15px;margin-top:30px;">
                <button id="confirmBindEmail" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--electric-blue),var(--pulse-blue));border:none;border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 0 15px rgba(0,204,255,0.5);">✓ 确认绑定</button>
                <button id="cancelBindEmail" style="flex:1;padding:12px;background:rgba(100,100,100,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;">✖ 取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let countdown = 0;
    
    // 获取验证码
    document.getElementById('getCodeBtn').addEventListener('click', function() {
        const emailPrefix = document.getElementById('emailPrefix').value.trim();
        if (!emailPrefix) {
            return;
        }
        
        if (countdown > 0) return;
        
        // 模拟发送验证码
        const code = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('emailVerificationCode', code.toString());
        
        // 倒计时60秒
        countdown = 60;
        const btn = this;
        const timer = setInterval(() => {
            countdown--;
            btn.textContent = `${countdown}s 后重发`;
            if (countdown <= 0) {
                clearInterval(timer);
                btn.textContent = '获取验证码';
            }
        }, 1000);
    });
    
    // 确认绑定
    document.getElementById('confirmBindEmail').addEventListener('click', function() {
        const emailPrefix = document.getElementById('emailPrefix').value.trim();
        const domain = document.getElementById('emailDomainBind').value;
        const code = document.getElementById('verificationCode').value.trim();
        const savedCode = localStorage.getItem('emailVerificationCode');
        
        if (!emailPrefix || !code) {
            return;
        }
        
        if (code !== savedCode) {
            return;
        }
        
        const fullEmail = emailPrefix + domain;
        
        // 保存邮箱
        const accountInfo = JSON.parse(localStorage.getItem('accountInfo') || '{}');
        accountInfo.email = fullEmail;
        localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
        
        // 更新页面显示
        const emailElem = document.getElementById('email');
        if (emailElem) {
            emailElem.textContent = fullEmail;
        }
        
        localStorage.removeItem('emailVerificationCode');
        modal.remove();
    });
    
    document.getElementById('cancelBindEmail').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', e => e.target === modal && modal.remove());
}

// 退出登录功能
function handleLogout() {
    const confirmModal = document.createElement('div');
    confirmModal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    confirmModal.innerHTML = `
        <div style="background:rgba(15,15,40,0.98);border:3px solid var(--molten-orange);border-radius:15px;padding:40px;max-width:450px;width:90%;box-shadow:0 0 50px rgba(255,69,0,0.8);">
            <h2 style="color:var(--molten-orange);text-shadow:0 0 20px var(--molten-orange);margin-bottom:20px;font-size:24px;text-align:center;">⚠️ 退出确认</h2>
            <p style="color:#FFF;text-align:center;margin-bottom:30px;font-size:16px;">您确定要退出登录吗？</p>
            <div style="display:flex;gap:15px;">
                <button id="confirmLogout" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--molten-orange),var(--amber-glow));border:none;border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 0 15px rgba(255,69,0,0.5);">✓ 确认退出</button>
                <button id="cancelLogout" style="flex:1;padding:12px;background:rgba(100,100,100,0.5);border:2px solid var(--steel-blue);border-radius:8px;color:#FFF;font-size:15px;font-weight:700;cursor:pointer;">✖ 取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    
    document.getElementById('confirmLogout').addEventListener('click', function() {
        // 清除登录状态
        localStorage.removeItem('isLoggedIn');
        
        // 退出成功，正在跳转...
        
        // 延迟跳转到登录页面
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    });
    
    document.getElementById('cancelLogout').addEventListener('click', function() {
        confirmModal.remove();
    });
    
    confirmModal.addEventListener('click', e => e.target === confirmModal && confirmModal.remove());
}

// 将函数暴露到全局
window.initSettings = initSettings;
window.editAccountInfo = editAccountInfo;
window.openChangePasswordModal = openChangePasswordModal;
window.openBindEmailModal = openBindEmailModal;
window.handleLogout = handleLogout;
window.loadSettings = loadSettings;
window.saveSettings = saveSettings;
window.applyTheme = applyTheme;

// 通知函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 20px;
        background: rgba(15, 15, 40, 0.95);
        border-top: 3px solid ${type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF'};
        border-radius: 8px;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: normal;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        animation: slideInDown 0.3s ease, lightningFlash 0.2s ease 0.1s, fadeOut 0.5s ease 2s forwards;
        text-align: center;
        min-width: 200px;
        max-width: 60%;
    `;
    
    // 添加闪电图标
    const icon = type === 'success' ? '⚡✓' : type === 'warning' ? '⚡⚠' : type === 'error' ? '⚡✗' : '⚡ℹ';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 18px; text-shadow: 0 0 6px ${type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF'};">${icon}</span>
            <span style="text-shadow: 0 0 5px rgba(255,255,255,0.5);">${message}</span>
        </div>
        <div class="lightning-effect" style="
            position: absolute;
            top: -1px;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, ${type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF'}, transparent);
            opacity: 0;
            animation: lightningBolt 0.2s ease 0.1s;
        "></div>
    `;
    
    // 添加CSS动画样式（如果不存在）
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    transform: translate(-50%, -100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -100%);
                }
            }
            @keyframes lightningFlash {
                0% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); }
                50% { box-shadow: 0 4px 20px ${type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF'}, 0 0 25px ${type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF'}; }
                100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); }
            }
            @keyframes lightningBolt {
                0% { opacity: 0; width: 0; left: 50%; }
                50% { opacity: 1; width: 100%; left: 0; }
                100% { opacity: 0; width: 0; left: 50%; }
            }
        `;
        document.head.appendChild(style);
    } else {
        // 更新现有样式以匹配通知类型
        const style = document.getElementById('notification-styles');
        const color = type === 'success' ? '#39FF14' : type === 'warning' ? '#FF8C00' : type === 'error' ? '#FF0080' : '#00CCFF';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    transform: translate(-50%, -100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -100%);
                }
            }
            @keyframes lightningFlash {
                0% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); }
                50% { box-shadow: 0 4px 20px ${color}, 0 0 25px ${color}; }
                100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); }
            }
            @keyframes lightningBolt {
                0% { opacity: 0; width: 0; left: 50%; }
                50% { opacity: 1; width: 100%; left: 0; }
                100% { opacity: 0; width: 0; left: 50%; }
            }
        `;
    }
    
    document.body.appendChild(notification);
    
    // 2.5秒后自动移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2500);
}


