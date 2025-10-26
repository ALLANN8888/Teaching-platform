# GitHub Pages 网站排版问题排查指南

## 问题诊断步骤

### 1. 浏览器开发者工具检查
- 按F12打开开发者工具
- 检查Console选项卡是否有错误信息
- 在Network选项卡中确认以下文件是否成功加载：
  - style.css (状态码200)
  - script.js (状态码200)
- 查看Elements选项卡中元素是否应用了CSS样式

### 2. 直接访问文件验证
在浏览器中打开以下链接确认文件是否存在：
- https://allann8888.github.io/Teaching-platform/style.css
- https://allann8888.github.io/Teaching-platform/script.js

### 3. 检查GitHub仓库文件结构
确保仓库中包含以下文件：
```
Teaching-platform/
├── index.html
├── style.css
└── script.js
```

## 常见解决方案

### 方案一：修正文件路径
如果CSS文件路径不正确，请修改index.html中的链接：
```html
<!-- 确保使用正确的相对路径 -->
<link rel="stylesheet" href="style.css">
```

### 方案二：检查文件大小写
GitHub Pages区分大小写，确保文件名完全匹配：
- style.css (不是 Style.css 或 STYLE.CSS)
- script.js (不是 Script.js 或 SCRIPT.JS)

### 方案三：重新推送文件
如果文件缺失，请重新推送所有文件：
```bash
git add .
git commit -m "修复文件路径问题"
git push origin main
```

### 方案四：清除浏览器缓存
强制刷新页面以清除缓存：
- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

## 响应式设计检查

### 移动端显示问题
如果在移动设备上显示不正确，请检查：
1. viewport meta标签是否存在：
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. 媒体查询是否正常工作

## 进一步帮助

如果以上方法都无法解决问题，请提供以下信息：
1. 浏览器开发者工具Console中的错误信息截图
2. Network选项卡中CSS文件的加载状态
3. GitHub仓库的文件结构截图