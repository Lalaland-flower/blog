import type { PostFrontmatter } from '../types';

/**
 * 简单的 YAML-like frontmatter 解析器，不依赖 Node.js API，可在浏览器中运行。
 * 支持的格式：
 * - key: value
 * - key: "value"
 * - key: 123
 * - key: true / false
 * - key:
 *     - item1
 *     - item2
 */
export function parseFrontmatter(raw: string): {
  frontmatter: PostFrontmatter;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    // 无 frontmatter，整个文件作为内容
    return {
      frontmatter: {
        title: '',
        date: new Date().toISOString().slice(0, 10),
        description: '',
        category: '',
        tags: [],
        draft: false,
      },
      content: raw.trim(),
    };
  }

  const [, fmRaw, body] = match;

  const data: Record<string, unknown> = {};
  let currentArrayKey: string | null = null;

  for (const line of fmRaw.split('\n')) {
    const arrayItemMatch = line.match(/^\s+-\s+(.+)/);
    if (arrayItemMatch && currentArrayKey) {
      const val = arrayItemMatch[1].trim().replace(/^["']|["']$/g, '');
      (data[currentArrayKey] as string[]).push(val);
      continue;
    }

    const kvMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)/);
    if (!kvMatch) continue;

    const key = kvMatch[1];
    let val = kvMatch[2].trim();

    if (val === '') {
      // 可能是数组的开始
      currentArrayKey = key;
      data[key] = [];
      continue;
    }

    currentArrayKey = null;

    // 移除引号
    val = val.replace(/^["']|["']$/g, '');

    // 解析布尔和数字
    if (val === 'true') {
      data[key] = true;
    } else if (val === 'false') {
      data[key] = false;
    } else if (/^-?\d+(\.\d+)?$/.test(val)) {
      // 保持日期字符串格式
      data[key] = val;
    } else {
      data[key] = val;
    }
  }

  return {
    frontmatter: {
      title: (data.title as string) || '',
      date: (data.date as string) || new Date().toISOString().slice(0, 10),
      description: (data.description as string) || '',
      category: (data.category as string) || '',
      tags: (data.tags as string[]) || [],
      draft: (data.draft as boolean) || false,
    },
    content: body.trim(),
  };
}
