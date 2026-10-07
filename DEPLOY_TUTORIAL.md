# 🎓 个人读博学习网站 — 部署教程

> 将你的个人学术网站免费部署到 GitHub Pages，获得专属域名 `yourname.github.io`

---

## 📋 网站功能一览

| 页面 | 内容 |
|------|------|
| **首页** | 个人简介、研究方向、最新动态、代表论文、学习笔记 |
| **关于我** | 详细学术背景、研究兴趣、联系方式 |
| **论文发表** | 已发表论文 + 工作论文，含摘要和链接 |
| **工作论文** | 每个项目的方法、动机、进展详情 |
| **学习笔记** | 分类过滤的学习笔记（概率论/论文精读/方法论/联邦学习） |
| **简历** | 结构化简历页，含技能条、标签、下载按钮 |

**附加功能：** 深色/浅色主题切换、移动端自适应、粒子动画背景、滚动入场动画、访问量计数器、笔记分类筛选。

---

## 🚀 部署步骤（使用 GitHub Desktop — 符合你的操作习惯）

### Step 1: 在 GitHub 上创建仓库

1. 浏览器打开 https://github.com/new
2. **仓库名必须为**：`Jingliang-Huai.github.io`
   - ⚠️ 注意：`Jingliang-Huai` 必须换成你的 GitHub 用户名
   - 例如你的用户名是 `Jingliang-Huai`，仓库名就是 `Jingliang-Huai.github.io`
3. 选择 **Public**（公开）
4. 不要勾选任何初始化选项（不要 README、不要 .gitignore、不要 license）
5. 点击 **Create repository**

### Step 2: 用 GitHub Desktop 上传本地网站文件

1. 打开 **GitHub Desktop**
2. 点击 `File → Clone repository`
3. 选择刚创建的 `Jingliang-Huai.github.io` 仓库，选择本地存放路径（例如 `~/Documents/Jingliang-Huai.github.io/`）
4. 克隆完成后，**暂时关掉 GitHub Desktop**
5. **打开终端（Terminal）**，执行以下命令：
   ```bash
   # 先删除 GitHub Desktop 自动生成的文件（只有一个 .git 目录）
   rm -rf ~/Documents/Jingliang-Huai.github.io/.git
   ```

6. **或者更简单的方法**：直接从我的工作区复制文件到你的 GitHub Pages 仓库目录：

   ```bash
   # 方案 A：直接用 GitHub Desktop 的仓库目录
   cp -r /Users/huaijingliang/WorkBuddy/2026-10-07-13-59-11/phd-website/* ~/Documents/Jingliang-Huai.github.io/
   ```

   **注意路径中的用户名替换成你自己的路径。**

7. 回到 **GitHub Desktop**，你会看到所有待提交的文件
8. 在左下角 Summary 处输入 `Initial commit - personal academic website`
9. 点击 **Commit to main**
10. 点击右上角 **Push origin** 推送到 GitHub

### Step 3: 开启 GitHub Pages

1. 浏览器打开你的仓库：`https://github.com/Jingliang-Huai/Jingliang-Huai.github.io`
2. 点击顶部 **Settings**
3. 左侧菜单找到 **Pages**
4. **Source** 选择 `Deploy from a branch`
5. **Branch** 选择 `main`，文件夹选 `/ (root)`
6. 点击 **Save**
7. 等待 1-2 分钟，页面顶部会出现绿色提示：
   > "Your site is published at https://Jingliang-Huai.github.io/"

### Step 4: 验证

浏览器打开 `https://Jingliang-Huai.github.io/`，确认网站正常运行。

---

## ✏️ 如何修改网站内容

### 修改个人简介

编辑 `about.html` 中的文本内容，找到对应的段落直接修改即可。

### 添加/修改论文

编辑 `publications.html`，找到 `pub-item` 区块：
```html
<div class="pub-item">
  <div class="pub-year">2025</div>
  <div class="pub-info">
    <h3 class="pub-title">论文标题</h3>
    <p class="pub-authors"><strong>作者名</strong></p>
    <p class="pub-journal"><em>期刊名</em></p>
    <div class="pub-links-bar">
      <a href="#" class="pub-link-btn"><i class="fas fa-file-pdf"></i> PDF</a>
    </div>
  </div>
</div>
```

### 更新最新动态

编辑 `index.html`，找到 `.news-timeline` 区块，按格式添加或修改条目。

### 添加学习笔记

编辑 `notes.html`，找到 `note-entry` 区块，参考现有格式添加新笔记。

### 更新简历

编辑 `cv.html`，找到对应的 `cv-section` 区块修改。

---

## 🎨 自定义外观

### 修改主题色

编辑 `css/style.css`，搜索 `--primary` 变量：
```css
:root {
  --primary: #4f46e5;  /* 改为你想要的颜色，如 #2563eb（蓝色）*/
  --primary-light: #818cf8;
  --primary-dark: #3730a3;
}
```

### 更换头像

1. 准备一张正方形照片（最好 200×200 以上）
2. 保存为 `images/avatar.jpg` 或 `images/avatar.png`
3. 编辑所有 HTML 文件中头像引用：
   ```html
   <img src="images/avatar-placeholder.svg" ... />
   ```
   改为：
   ```html
   <img src="images/avatar.jpg" alt="Jingliang Huai" />
   ```

---

## 📝 更新网站内容后如何同步

每次修改完本地文件后：

1. 打开 **GitHub Desktop**
2. 左侧会显示修改过的文件
3. 在 Summary 输入本次修改说明（如 "更新论文发表页面"）
4. 点击 **Commit to main**
5. 点击 **Push origin**
6. 等待约 30 秒 - 1 分钟，网站自动更新

---

## 🔗 绑定自定义域名（可选）

如果你有自己的域名（如 `jinglianghuai.com`）：

1. 仓库 → Settings → Pages
2. 在 "Custom domain" 输入你的域名
3. 在你的域名 DNS 设置中添加 CNAME 记录指向 `Jingliang-Huai.github.io`

---

## 🛟 常见问题

**Q: 网站部署后显示 404？**
A: 确保仓库名严格等于 `你的用户名.github.io`，且文件在 `main` 分支根目录下。

**Q: 修改网站后没看到更新？**
A: GitHub Pages 部署有约 30-60 秒延迟。可以用 `Ctrl+F5` 强制刷新浏览器缓存。

**Q: 如何添加 Google Scholar 链接？**
A: 在 `index.html` 和 `about.html` 中找到 Google Scholar 链接，将 `YOUR_SCHOLAR_ID` 替换为你的 Google Scholar ID。

---

> 💡 **网站文件位置**：`/Users/huaijingliang/WorkBuddy/2026-10-07-13-59-11/phd-website/`