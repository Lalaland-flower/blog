---
title: "Tailwind CSS 4 实战：从配置到进阶"
date: 2026-06-18
description: "Tailwind CSS 4 带来了全新的 CSS 驱动配置方式，摒弃了传统的 tailwind.config.js。本文分享实际迁移和使用经验，帮助你快速上手新版本的 Tailwind CSS。"
category: "CSS"
tags:
  - tailwind
  - css
  - 前端
draft: false
---

## 前言

Tailwind CSS 4 是一次彻底的重新设计。最大的变化是：不再需要 `tailwind.config.js`，而是直接使用 CSS 进行配置。

## 安装与配置

```bash
npm install tailwindcss @tailwindcss/vite
```

在 `vite.config.ts` 中配置：

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

主 CSS 文件只需要一行：

```css
@import "tailwindcss";
```

## 暗色模式

Tailwind 4 使用 CSS 自定义变体替代了 `darkMode: "class"` 配置：

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

使用方式保持不变：

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  内容
</div>
```

## 响应式设计

Tailwind 4 的响应式断点仍然开箱即用：

| 断点 | 最小宽度 | 适用设备 |
|------|---------|---------|
| `sm` | 640px | 大屏手机 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 笔记本 |
| `xl` | 1280px | 桌面 |
| `2xl` | 1536px | 大屏桌面 |

## Typography 插件

文章排版可以使用 `@tailwindcss/typography` 插件：

```css
@plugin "@tailwindcss/typography";
```

```html
<article class="prose prose-gray dark:prose-invert max-w-none">
  <h1>标题</h1>
  <p>正文内容…</p>
</article>
```

`prose` 类会自动为文章内容提供优雅的排版样式，包括合适的字体大小、行高、间距等。

## 实用技巧

### 1. 自定义组件样式

不要写一大堆工具类来创建可复用的组件，而是使用 `@apply`：

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium
           hover:bg-indigo-700 transition-colors;
  }
}
```

### 2. 使用 CSS 变量

```css
@theme {
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
}
```

### 3. 性能优化

Tailwind 4 在构建时自动移除未使用的样式，生成的 CSS 文件通常只有几 KB。无需额外配置 PurgeCSS。

## 总结

Tailwind CSS 4 的 CSS 驱动配置方式更加现代和灵活。尽管 API 变化较大，但上手并不困难，而且构建速度和开发体验都有显著提升。
