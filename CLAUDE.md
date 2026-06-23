# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 项目概述

个人技术博客网站，基于 React 19 + Vite 6 + TypeScript + Tailwind CSS 4 构建的纯静态 SPA。
所有文章以 Markdown 格式存放在 `content/posts/` 目录中，构建时通过 `import.meta.glob` 打包。

## 常用命令

```bash
npm run dev       # 启动开发服务器 (http://localhost:5173)
npm run build     # 完整构建（类型检查 + Vite 构建 + RSS 生成）
npm run rss       # 单独生成 RSS (rss.xml + atom.xml)
npm run preview   # 预览生产构建 (http://localhost:4173)
npx tsc -b        # 仅类型检查
```

## 技术栈

| 类别 | 选型 |
|------|------|
| UI 框架 | React 19 + React Router 7 |
| 构建 | Vite 6 + TypeScript 5.8 |
| 样式 | Tailwind CSS 4 + @tailwindcss/typography |
| 内容解析 | gray-matter (frontmatter) + react-markdown (渲染) |
| 代码高亮 | rehype-highlight (highlight.js) |
| 搜索 | fuse.js (客户端模糊搜索) |
| 评论 | Giscus (GitHub Discussions) |
| RSS | feed (构建时脚本生成) |

## 架构要点

### 内容数据流

```
content/posts/*.md → import.meta.glob → gray-matter 解析 → postsCache → 查询函数 → React 组件
```

- `src/lib/posts.ts` — 核心数据层：加载并解析所有 .md 文件，导出 `getAllPosts`、`getPostBySlug`、`getPostsByCategory`、`getPostsByTag`、`getAllCategories`、`getAllTags`
- `src/lib/pages.ts` — 独立页面（about 等）的加载
- `src/lib/search.ts` — fuse.js 全文搜索索引
- 所有数据在模块作用域缓存，同步访问，无需 useEffect 请求

### 路由

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomePage | 文章列表（分页，10篇/页） |
| `/posts/:slug` | PostPage | 文章详情 + Giscus 评论 |
| `/categories` | CategoriesPage | 分类总览 |
| `/categories/:name` | CategoryPage | 分类下文章 |
| `/tags` | TagsPage | 标签云 |
| `/tags/:name` | TagPage | 标签下文章 |
| `/about` | AboutPage | 关于（渲染 content/pages/about.md） |
| `/search?q=` | SearchPage | 搜索结果 |

### 暗色模式

- `src/hooks/useTheme.ts` 管理 `dark` class 切换，写入 localStorage
- Tailwind 使用 `@custom-variant dark (&:where(.dark, .dark *))` 定义暗色变体
- Giscus 通过 `postMessage` API 同步主题，避免重新加载

### Markdown Frontmatter

```yaml
---
title: "文章标题"
date: 2026-06-23
description: "文章摘要"
category: "React"
tags: [react, vite]
draft: false  # true 时会从构建中排除
---
```

文件名格式：`YYYY-MM-DD-slug.md`

### 评论系统

Giscus 配置在 `src/lib/giscus-config.ts`。使用前需在 GitHub 仓库启用 Discussions，访问 https://giscus.app 获取 repoId 和 categoryId 并填入配置。

## 项目结构

```
project1/
├── content/              ← Markdown 内容（posts + pages）
├── scripts/
│   └── generate-rss.ts   ← 构建时 RSS 生成
├── public/               ← 静态资源 + 生成的 RSS
├── src/
│   ├── main.tsx          ← 入口，BrowserRouter
│   ├── App.tsx           ← 路由定义
│   ├── index.css         ← Tailwind 指令 + 暗色模式变体
│   ├── types/index.ts    ← Post 等接口
│   ├── lib/              ← 核心库（posts, pages, search, utils）
│   ├── hooks/            ← useTheme
│   ├── components/
│   │   ├── layout/       ← Layout, Header, Footer
│   │   ├── post/         ← PostCard, PostList, PostContent
│   │   ├── common/       ← TagBadge, SearchBar, ThemeToggle, SEO
│   │   └── comments/     ← CommentSection
│   └── pages/            ← 所有页面组件
└── dist/                 ← 构建输出
```

## 权限

本地 Claude Code 权限配置在 `.claude/settings.local.json` 中。
