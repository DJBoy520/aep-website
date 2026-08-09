# AEP 官网 v0.1.0 — OpenClaw 执行手册 v2.0

> **执行模式**：OpenClaw 任务拆解 + Hermes 代码实现 + OpenClaw 审计
> **总步数**：10 个 Step（对应 10 个 Issue）
> **预计产出**：可 Docker 部署的完整静态官网
> **技术栈**：Astro 4.x + TypeScript + Tailwind CSS 3.x

---

## 全局约定

### 执行流程（每个 Step 都按此模式）

```
OpenClaw 拆解任务
    ↓
Hermes 写代码（通过 MCP 调用文件操作工具）
    ↓
OpenClaw 审计（对照【审计清单】逐项检查）
    ↓
通过 → 进入下一步
不通过 → 返回 Hermes 修改
```

### 项目根目录

所有操作都在 `aep-website/` 目录下执行。

### 命名规范

- 组件文件：PascalCase，如 `HeroSection.astro`
- 工具函数：camelCase，如 `getTranslation.ts`
- 目录：kebab-case 或小写，如 `src/components/layout/`
- Git Commit：Conventional Commits，如 `feat(home): add hero section`

### 禁止事项（全局红线）

1. ❌ 禁止引入 React / Vue / Svelte 等前端框架
2. ❌ 禁止使用图片代替 SVG 图表（架构图、流程图必须用 SVG）
3. ❌ 禁止硬编码中英文文案，必须从 i18n JSON 读取
4. ❌ 禁止出现「绝对安全」「不可破解」等夸大表述
5. ❌ 禁止在 v0.1.0 阶段添加后端逻辑、数据库、用户系统
6. ❌ 禁止大规模重构、随意增加依赖、修改目录结构（见 AI_RULES.md）

---

## AI_RULES.md（项目根目录必须存在）

> **作用**：所有 AI 助手（OpenClaw / Hermes / 其他）进入项目时，必须先读此文件。
> **位置**：`aep-website/AI_RULES.md`

```markdown
# AEP Website AI 开发规则

> 本文件是所有 AI 助手参与本项目的强制规则。
> 修改代码前必须完整阅读并遵守。

---

## 一、架构原则

### 1.1 禁止事项

- ❌ 禁止大规模重构现有代码结构
- ❌ 禁止随意增加新的 npm 依赖
- ❌ 禁止修改已约定的目录结构
- ❌ 禁止引入 React / Vue / Svelte 等前端框架
- ❌ 禁止添加后端逻辑、数据库、用户系统（v0.1 阶段）

### 1.2 允许事项

- ✅ 在现有组件基础上增加功能
- ✅ 修复 bug 和样式问题
- ✅ 新增页面和组件（遵循现有目录规范）
- ✅ 优化性能和可访问性

### 1.3 技术栈锁定

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Astro | 4.x |
| 语言 | TypeScript | strict 模式 |
| 样式 | Tailwind CSS | 3.x |
| 包管理 | pnpm | 8.x |
| 部署 | Docker + Nginx | - |

---

## 二、开发流程

每个任务必须按以下 5 步执行，禁止跳步：

### Step 1: 分析（Analyze）
- 阅读任务描述
- 查看当前项目结构
- 确认相关文件和依赖
- 输出：分析结论 + 影响范围

### Step 2: 计划（Plan）
- 列出需要新增/修改/删除的文件
- 说明实现思路
- 评估风险和依赖
- **等待确认后再执行**

### Step 3: 修改（Implement）
- 按计划逐一修改文件
- 保持代码风格与现有一致
- 每修改一个文件做一次自检

### Step 4: 测试（Test）
- 运行 `pnpm build` 确认无报错
- 检查 TypeScript 类型错误
- 验证功能是否正常
- 检查明暗主题适配
- 检查响应式布局

### Step 5: 总结（Summarize）
- 列出修改的文件清单
- 说明实现的功能
- 给出测试结果
- 建议 Git Commit 信息

---

## 三、代码要求

### 3.1 TypeScript
- 必须开启 strict 模式
- 所有组件 Props 必须定义类型
- 禁止使用 `any` 类型
- 禁止使用非空断言 `!`（除非绝对必要并加注释）

### 3.2 组件规范
- 单一职责：一个组件只做一件事
- Props 驱动：组件行为由 Props 控制，不依赖外部全局状态
- 命名：PascalCase，语义清晰
- 文件：一个组件一个文件

### 3.3 样式规范
- 优先使用 Tailwind utility class
- 复杂样式用 `<style>` 标签，scoped
- 颜色使用 CSS 变量（`var(--xxx)`）或主题色（`bg-aep-primary`）
- 禁止硬编码颜色值（除非是主题配置文件）

### 3.4 内容与代码分离
- 所有用户可见文本必须走 i18n
- 结构化内容（文档、博客）使用 Content Collections
- 禁止在组件中硬编码大段文本

---

## 四、Git 规范

### Commit Message 格式
```
<type>(<scope>): <subject>

类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 样式调整
- refactor: 重构
- chore: 构建/工具/依赖
- test: 测试
```

### 示例
```
feat(home): add hero section
fix(header): mobile menu overflow
chore(deps): upgrade astro to 4.5.0
```

---

## 五、目录结构约定

```
src/
├── components/       # 组件
│   ├── layout/       # 布局组件（Header、Footer）
│   ├── home/         # 首页组件
│   ├── common/       # 通用组件（Button、Card）
│   └── ...           # 按页面分组
├── layouts/          # 布局模板
├── pages/            # 页面路由
├── i18n/             # 国际化
├── config/           # 配置（主题等）
├── content/          # 内容集合
└── styles/           # 全局样式
```

新增组件必须放到对应目录，禁止随意乱放。

---

## 六、安全红线

- 禁止在代码中硬编码密钥、密码、Token
- 禁止引入已知有安全漏洞的依赖
- 用户输入必须做转义和验证（v0.1 阶段暂无用户输入）
- 第三方链接必须加 `rel="noopener noreferrer"`

---

**最后更新**：2026-08-09
**适用版本**：v0.1.x
```

---

## 版本路线图（调整后）

```
2026 Q3 ─── AEP v0.1 ─── 官网 + 文档 + 工具介绍
    │
    │  完成：
    │  • 静态官网（6个页面）
    │  • 中英文双语
    │  • MCP / CLI 介绍
    │  • Docker 部署
    │
2026 Q4 ─── AEP v0.2 ─── 在线验证 + API + 文档系统
    │
    │  完成：
    │  • 在线验证 Demo
    │  • 验证 API 接口
    │  • 验证报告生成
    │  • 文档系统升级（Content Collections）
    │  • SDK 展示页
    │
    │  暂缓：
    │  ❌ 用户系统
    │  ❌ 企业系统
    │  ❌ 数据库（先不引入）
    │
2027 ───── AEP v0.5 ─── 生态版
    │
    │  完成：
    │  • 3+ 个 SDK（Python / Go / Rust）
    │  • 第三方接入
    │  • 企业私有部署
    │  • 仓库拆分（aep-core / aep-cli / aep-validator）
    │  • 身份体系基础
    │
v1.0 ───── AEP v1.0 ─── 基础设施版
    │
    │  完成：
    │  • 协议规范稳定（1.0）
    │  • 公共验证网络
    │  • 时间戳服务
    │  • 区块链锚定（可选）
    │  • 标准化推进
    │  • 生态联盟
```

**核心理念**：协议项目不是做网站，而是做 Protocol + Toolchain + Ecosystem。网站只是入口。

---

## 仓库规划

### 当前（v0.1 - v0.4）：单仓

```
aep-website/          # 单一仓库，官网 + 文档 + 工具介绍
```

### v0.5 起：Organization 多仓

```
AEP Organization/
├── aep-website/      # 官网 + 文档站
├── aep-spec/         # 协议规范（CC BY 4.0）
├── aep-core/         # 核心验证库（Apache 2.0）
├── aep-cli/          # 命令行工具（Apache 2.0）
├── aep-mcp/          # MCP Server（Apache 2.0）
└── aep-validator/    # 验证服务（Apache 2.0）
```

### License 分层策略

| 项目 | License | 原因 |
|------|---------|------|
| aep-spec（协议规范） | CC BY 4.0 | 协议需要开放传播，保留署名 |
| aep-core（核心库） | Apache 2.0 | 企业愿意采用，生态友好 |
| aep-cli / aep-mcp | Apache 2.0 | 工具类，鼓励广泛使用 |
| aep-website（官网） | AGPL 3.0 | 网站代码，修改需开源 |
| 商业服务 / 企业版 | 闭源 | 商业化收入来源 |

---

## Docker 部署演进路线

### v0.1：单容器

```
aep-web (Astro + Nginx)
    ↓
  1 个容器
```

### v0.2：双容器

```
aep-web (前端)
    ↓
aep-api (验证 API)
    ↓
  2 个容器
```

### v0.5：多容器

```
aep-web (前端)
aep-api (API Gateway)
aep-verifier (验证服务)
postgres (数据库)
    ↓
  4 个容器
```

> **原则**：容器数量随功能逐步增加，不一上来就搞微服务。维护成本 > 架构优雅。

---

## Step 1：项目初始化与核心依赖配置

**对应 Issue**：AEP-WEB-001
**优先级**：P0
**预计耗时**：10 分钟

### 输入（当前状态）

```
当前：空目录
已有：无
依赖：无
```

### 输出（本步产出）

```
新增文件：
  - package.json
  - pnpm-lock.yaml
  - astro.config.ts
  - tailwind.config.ts
  - tsconfig.json
  - .gitignore
  - AI_RULES.md
  - src/pages/index.astro (默认)
  - src/components/{layout,home,common}/ (空目录)
  - src/layouts/ (空目录)
  - src/config/ (空目录)
  - src/i18n/locales/ (空目录)
  - src/content/ (空目录)
  - src/styles/ (空目录)
  - public/{images,icons}/ (空目录)
  - docker/ (空目录)

修改文件：无
删除文件：无

测试命令：
  - pnpm install
  - pnpm dev
  - pnpm build
```

### 本步目标

建立 Astro + TypeScript + Tailwind 的基础工程，配置路径别名，创建完整目录结构，添加 AI_RULES.md。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 1.1 | 创建项目目录，初始化 Astro 项目 | `package.json`、`astro.config.ts` |
| 1.2 | 安装 Tailwind CSS 集成 | `tailwind.config.ts` |
| 1.3 | 配置 TypeScript 路径别名 | `tsconfig.json` |
| 1.4 | 创建完整目录结构 | 各目录文件夹 |
| 1.5 | 创建 AI_RULES.md | `AI_RULES.md` |
| 1.6 | 初始化 Git 仓库 | `.gitignore` |

### 关键操作命令

```bash
# 1. 创建并进入目录
mkdir aep-website && cd aep-website

# 2. 初始化 Astro 项目（TypeScript 严格模式，基础模板）
pnpm create astro@latest . -- --template basics --typescript strict

# 3. 添加 Tailwind 集成
pnpm astro add tailwind

# 4. 创建目录结构
mkdir -p src/components/{layout,home,common}
mkdir -p src/layouts
mkdir -p src/config
mkdir -p src/i18n/locales
mkdir -p src/content
mkdir -p src/styles
mkdir -p public/{images,icons}
mkdir -p docker
```

### 关键配置文件

**tsconfig.json 必须包含：**
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**.gitignore 必须包含：**
```
node_modules/
dist/
.env
.DS_Store
*.log
```

### 开发关键说明

1. **必须使用 pnpm**，不要用 npm 或 yarn
2. **必须选 strict 模式**，TypeScript 类型检查要严格
3. **目录结构要一次性建好**，避免后续反复调整
4. **AI_RULES.md 必须放在项目根目录**，所有 AI 助手进来先读
5. `pnpm astro add tailwind` 会自动修改配置，确认 `astro.config.ts` 中有 `tailwind()` 集成

### 测试验证方法

```bash
# 验证 1：依赖安装正常
pnpm install
# 预期：无报错，node_modules 生成

# 验证 2：开发服务器启动
pnpm dev
# 预期：localhost:4321 显示 Astro 默认欢迎页

# 验证 3：生产构建成功
pnpm build
# 预期：dist/ 目录生成，无报错

# 验证 4：目录结构完整
ls src/components/layout src/components/home src/components/common src/layouts src/config src/i18n/locales src/styles
# 预期：所有目录存在

# 验证 5：AI_RULES.md 存在
ls AI_RULES.md
# 预期：文件存在
```

### 完成标准（DoD）

- [ ] `pnpm install` 无报错
- [ ] `pnpm dev` 启动成功，默认页可访问
- [ ] `pnpm build` 构建成功，dist/ 生成
- [ ] 所有目录已创建
- [ ] `@/` 路径别名配置完成
- [ ] AI_RULES.md 已创建，内容完整
- [ ] Git 仓库初始化，首个 commit：`chore: initialize astro project`

### OpenClaw 审计清单

- [ ] 检查 package.json 中无 React/Vue 等框架依赖
- [ ] 检查 tsconfig.json 路径别名配置正确
- [ ] 检查目录结构与设计一致
- [ ] 检查 AI_RULES.md 存在且内容完整
- [ ] 执行 pnpm build 确认无报错
- [ ] 确认 Git commit 信息符合规范

### 后续影响

本步建立的目录结构和配置是后续所有开发的基础。路径别名 `@/` 会在所有组件导入中使用。AI_RULES.md 是后续所有 AI 开发的行为准则。

---

## Step 2：全局视觉主题与设计系统

**对应 Issue**：AEP-WEB-002
**优先级**：P0
**前置依赖**：Step 1 完成
**预计耗时**：15 分钟

### 输入（当前状态）

```
当前：Astro 项目已初始化
已有：
  - 基础目录结构
  - Tailwind 集成
  - TypeScript 配置
依赖：Step 1 完成
```

### 输出（本步产出）

```
新增文件：
  - src/config/theme.ts
  - src/styles/global.css
  - src/pages/test-theme.astro (临时测试用，后续删除)

修改文件：
  - tailwind.config.ts (扩展主题色)
  - astro.config.ts (调整 Tailwind 配置)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 /test-theme 验证颜色
```

### 本步目标

建立 AEP 品牌色系统、CSS 变量、字体系统，为后续组件开发提供统一的设计原子。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 2.1 | 创建主题颜色配置 | `src/config/theme.ts` |
| 2.2 | 扩展 Tailwind 主题色 | `tailwind.config.ts` |
| 2.3 | 创建全局样式 + CSS 变量 | `src/styles/global.css` |
| 2.4 | 配置 Astro 全局样式注入 | `astro.config.ts` |
| 2.5 | 临时测试页面验证 | `src/pages/test-theme.astro` |

### 关键代码

**src/config/theme.ts：**
```typescript
export const theme = {
  // 主色
  primary: '#00B8D9',
  primaryDark: '#0099B8',
  primaryLight: '#33C6E0',
  
  // 辅助色
  navy: '#0B132B',
  blue: '#2563EB',
  purple: '#8B5CF6',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  
  // 中性色
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // 背景
  bgLight: '#FFFFFF',
  bgDark: '#0B132B',
  bgCardLight: '#F8FAFC',
  bgCardDark: '#1E293B',
} as const;
```

**tailwind.config.ts 核心配置：**
```typescript
import type { Config } from 'tailwindcss';
import { theme } from './src/config/theme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        aep: {
          primary: theme.primary,
          'primary-dark': theme.primaryDark,
          'primary-light': theme.primaryLight,
          navy: theme.navy,
          blue: theme.blue,
          purple: theme.purple,
          green: theme.green,
          amber: theme.amber,
          red: theme.red,
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

**src/styles/global.css 核心结构：**
```css
/* 字体引入 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* Light 模式变量 */
:root, [data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --border-color: #E5E7EB;
  --card-bg: #F8FAFC;
  --code-bg: #1E293B;
  --code-text: #F9FAFB;
}

/* Dark 模式变量 */
[data-theme="dark"] {
  --bg-primary: #0B132B;
  --bg-secondary: #1E293B;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --border-color: #334155;
  --card-bg: #1E293B;
  --code-bg: #0F172A;
  --code-text: #E2E8F0;
}

/* 基础重置 */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### 开发关键说明

1. **颜色双轨制**：Tailwind 扩展色（用于 utility class）+ CSS 变量（用于动态主题）
2. **darkMode 配置**：必须用 `['class', '[data-theme="dark"]']`，通过 data-theme 属性切换
3. **字体**：Inter（无衬线）+ JetBrains Mono（等宽），从 Google Fonts 引入
4. **过渡动画**：body 的背景色和文字色要有 0.3s 过渡，切换主题时更自然
5. **测试页用完可以删**：`test-theme.astro` 只是验证用，确认没问题后可以删除

### 测试验证方法

1. 创建临时测试页 `src/pages/test-theme.astro`：
```astro
---
import '@/styles/global.css';
---
<div class="p-8 space-y-4">
  <div class="bg-aep-primary text-white p-4 rounded-lg">AEP Primary 主色测试</div>
  <div class="bg-aep-purple text-white p-4 rounded-lg">AEP Purple 紫色测试</div>
  <div class="bg-aep-green text-white p-4 rounded-lg">AEP Green 绿色测试</div>
  <div class="bg-[var(--bg-secondary)] text-[var(--text-primary)] p-4 rounded-lg border border-[var(--border-color)]">
    CSS 变量测试：次级背景 + 边框
  </div>
  <pre class="bg-[var(--code-bg)] text-[var(--code-text)] p-4 rounded-lg"><code>代码块测试</code></pre>
</div>
```

2. 访问 `/test-theme`，检查所有颜色正确显示
3. 手动在浏览器 DevTools 给 `<html>` 加 `data-theme="dark"`，验证深色模式颜色切换

### 完成标准（DoD）

- [ ] `src/config/theme.ts` 颜色字典完整
- [ ] `tailwind.config.ts` 扩展了 aep 色系
- [ ] `src/styles/global.css` 包含 light/dark 两套 CSS 变量
- [ ] 字体正确加载（Inter + JetBrains Mono）
- [ ] 测试页颜色显示正确
- [ ] 手动切换 data-theme 深色模式生效
- [ ] Commit：`feat(theme): add aep design system`

### OpenClaw 审计清单

- [ ] 检查 theme.ts 颜色值与设计文档一致
- [ ] 检查 tailwind.config.ts 中 darkMode 配置正确
- [ ] 检查 global.css 中 light/dark 变量一一对应
- [ ] 检查字体引入 URL 可访问
- [ ] 访问测试页，视觉确认颜色正确
- [ ] 切换深色模式，确认 CSS 变量生效
- [ ] 确认没有引入额外的 npm 依赖

### 后续影响

所有后续组件的颜色、字体、背景都将基于本步建立的系统。组件开发时直接用 `bg-aep-primary`、`text-[var(--text-secondary)]` 等。

---

## Step 3：全局布局系统与核心导航

**对应 Issue**：AEP-WEB-003
**优先级**：P0
**前置依赖**：Step 2 完成
**预计耗时**：25 分钟

### 输入（当前状态）

```
当前：主题系统已建立
已有：
  - theme.ts 颜色配置
  - Tailwind 主题扩展
  - global.css 全局样式
依赖：Step 2 完成
```

### 输出（本步产出）

```
新增文件：
  - src/components/layout/Header.astro
  - src/components/layout/Footer.astro
  - src/components/layout/ThemeToggle.astro
  - src/components/layout/LanguageSwitcher.astro (占位)
  - src/layouts/MainLayout.astro

修改文件：
  - src/pages/index.astro (改用 MainLayout)

删除文件：
  - src/pages/test-theme.astro (测试页用完删除)

测试命令：
  - pnpm dev
  - 访问 / 验证布局
```

### 本步目标

创建 Header、Footer、ThemeToggle、MainLayout，建立全站统一的页面框架。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 3.1 | 创建 ThemeToggle 组件 | `src/components/layout/ThemeToggle.astro` |
| 3.2 | 创建 LanguageSwitcher 占位组件 | `src/components/layout/LanguageSwitcher.astro` |
| 3.3 | 创建 Header 组件（含响应式菜单） | `src/components/layout/Header.astro` |
| 3.4 | 创建 Footer 组件 | `src/components/layout/Footer.astro` |
| 3.5 | 创建 MainLayout 布局模板 | `src/layouts/MainLayout.astro` |
| 3.6 | 更新首页测试布局 | `src/pages/index.astro` |
| 3.7 | 删除临时测试页 | `test-theme.astro` |

### 关键实现要点

**ThemeToggle.astro 核心逻辑：**
- 客户端脚本：初始化时从 localStorage 读主题，没有则跟随系统
- 点击按钮：切换 data-theme 属性，写入 localStorage
- 图标：太阳（浅色模式显示）+ 月亮（深色模式显示），用 CSS 控制显隐

**Header.astro 响应式设计：**
- 桌面端（≥768px）：横向导航菜单 + 右侧操作区
- 移动端（<768px）：汉堡菜单按钮（v0.1 可先只显示按钮，展开功能可选）
- sticky 定位 + 毛玻璃背景（backdrop-blur）

**MainLayout.astro 结构：**
```
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
  <head>
    <!-- meta、title、favicon -->
  </head>
  <body class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <slot />  <!-- 页面内容插槽 -->
    </main>
    <Footer />
  </body>
</html>
```

### 开发关键说明

1. **ThemeToggle 的脚本位置**：初始化脚本要放在 `<head>` 或页面顶部，避免闪烁（FOUC）。v0.1 可先放在组件内的 `<script is:inline>` 中
2. **Header 导航项**：先用硬编码中文，Step 4 国际化时再替换
3. **body 布局**：用 `flex flex-col min-h-screen` 保证 Footer 始终在底部
4. **sticky Header**：`sticky top-0 z-50` + 半透明背景 + backdrop-blur
5. **LanguageSwitcher 先占位**：放两个按钮的壳，功能在 Step 4 实现

### 测试验证方法

```bash
pnpm dev
```

1. 访问 `/`，确认 Header 和 Footer 正常显示
2. **主题切换测试**：
   - 点击太阳/月亮按钮，背景色变化
   - 刷新页面，主题保持不变（localStorage 生效）
   - 检查按钮图标随主题切换
3. **响应式测试**：
   - 窗口宽度 ≥768px：横向菜单显示
   - 窗口宽度 <768px：汉堡按钮出现
4. **Footer 位置测试**：内容很少时，Footer 仍在页面底部

### 完成标准（DoD）

- [ ] Header 组件：Logo + 导航 + 右侧操作区，响应式正常
- [ ] Footer 组件：版权 + 底部链接
- [ ] ThemeToggle：点击切换主题，刷新记忆
- [ ] MainLayout：统一页面框架，slot 正常
- [ ] 移动端汉堡菜单按钮显示（展开功能 v0.1 可选）
- [ ] 测试页已删除
- [ ] Commit：`feat(layout): create website layout system`

### OpenClaw 审计清单

- [ ] 检查 Header 在 PC 和 Mobile 下的布局切换
- [ ] 检查主题切换功能：点击切换 + 刷新记忆
- [ ] 检查 Footer 是否始终在底部
- [ ] 检查 MainLayout 的 slot 是否正确传递内容
- [ ] 检查 sticky Header 的毛玻璃效果
- [ ] 检查所有颜色使用 CSS 变量，适配明暗主题
- [ ] 确认 test-theme.astro 已删除
- [ ] 确认没有新增 npm 依赖

### 后续影响

所有页面都将使用 MainLayout 包裹。Step 4 的国际化会替换 Header 中的硬编码文案。

---

## Step 4：双语国际化（i18n）路由系统

**对应 Issue**：AEP-WEB-004
**优先级**：P0
**前置依赖**：Step 3 完成
**预计耗时**：20 分钟

### 输入（当前状态）

```
当前：布局系统已完成
已有：
  - Header / Footer / MainLayout
  - ThemeToggle 主题切换
  - 导航栏硬编码中文
依赖：Step 3 完成
```

### 输出（本步产出）

```
新增文件：
  - src/i18n/config.ts
  - src/i18n/utils.ts
  - src/i18n/locales/zh-cn.json
  - src/i18n/locales/en.json
  - src/pages/en/index.astro

修改文件：
  - astro.config.ts (添加 i18n 配置)
  - src/components/layout/Header.astro (改用 i18n 文案)
  - src/components/layout/LanguageSwitcher.astro (实现功能)
  - src/components/layout/Footer.astro (改用 i18n 文案)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 / 和 /en 验证双语
```

### 本步目标

建立中英文双语系统，配置 i18n 路由，实现语言切换功能。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 4.1 | 配置 Astro i18n | `astro.config.ts` |
| 4.2 | 创建 i18n 配置文件 | `src/i18n/config.ts` |
| 4.3 | 创建 i18n 工具函数 | `src/i18n/utils.ts` |
| 4.4 | 创建中文语言包 | `src/i18n/locales/zh-cn.json` |
| 4.5 | 创建英文语言包 | `src/i18n/locales/en.json` |
| 4.6 | 完善 LanguageSwitcher 组件 | `src/components/layout/LanguageSwitcher.astro` |
| 4.7 | 更新 Header 使用 i18n 文案 | `src/components/layout/Header.astro` |
| 4.8 | 更新 Footer 使用 i18n 文案 | `src/components/layout/Footer.astro` |
| 4.9 | 创建英文首页 | `src/pages/en/index.astro` |

### 关键实现要点

**astro.config.ts i18n 配置：**
```typescript
i18n: {
  defaultLocale: 'zh-cn',
  locales: ['zh-cn', 'en'],
  routing: {
    prefixDefaultLocale: false, // 中文默认不加前缀
  },
}
```

**i18n 工具函数核心：**
- `getLangFromPath(pathname)`：从 URL 路径判断当前语言
- `getTranslation(pathname)`：返回当前语言的翻译对象
- `getAlternatePath(pathname, targetLang)`：计算切换语言后的目标 URL

**语言 JSON 结构：**
```json
{
  "nav": { "home": "首页", "protocol": "协议", ... },
  "hero": { "title": "AEP", "slogan": "...", ... },
  "footer": { "copyright": "..." },
  "common": { "getStarted": "开始使用", ... }
}
```

**LanguageSwitcher 逻辑：**
- 显示「中文 / English」两个按钮
- 当前语言高亮（aep-primary 背景）
- 点击跳转到对应语言的当前页面

### 开发关键说明

1. **路由规则**：中文默认 `/`，英文 `/en/xxx`，不要搞反
2. **文案提取原则**：所有用户可见的文本都要进 JSON，包括按钮、导航、标题
3. **工具函数的通用性**：`getTranslation(Astro.url.pathname)` 在任何组件都能用
4. **英文页面创建**：`src/pages/en/index.astro` 内容和中文首页一样，引用相同组件，路由自动处理语言判断
5. **Footer 也要改**：版权文字走 i18n，不要漏了

### 测试验证方法

1. **路由测试**：
   - 访问 `/` → 显示中文导航
   - 访问 `/en` → 显示英文导航
2. **语言切换测试**：
   - 在首页点击「English」→ 跳转到 `/en`，内容变英文
   - 在英文页点击「中文」→ 跳回 `/`，内容变中文
3. **Header 文案测试**：
   - 所有导航项、按钮文字都来自 JSON，无硬编码
4. **Footer 文案测试**：
   - 版权文字随语言切换

### 完成标准（DoD）

- [ ] astro.config.ts 配置了 i18n
- [ ] 两个语言 JSON 文件（zh-cn / en），包含 nav、hero、footer、common 模块
- [ ] 工具函数：getLangFromPath、getTranslation、getAlternatePath
- [ ] LanguageSwitcher 组件正常工作
- [ ] Header 导航使用 i18n 文案
- [ ] Footer 使用 i18n 文案
- [ ] `/` 和 `/en` 均可访问，内容对应语言
- [ ] Commit：`feat(i18n): add bilingual support`

### OpenClaw 审计清单

- [ ] 检查 i18n 路由配置：中文不加前缀，英文加 /en
- [ ] 检查两个语言 JSON 结构一致，key 一一对应
- [ ] 检查 getTranslation 函数在不同路径下返回正确语言
- [ ] 检查 Header 中无硬编码中文/英文文案
- [ ] 检查 Footer 中无硬编码文案
- [ ] 实际访问 `/` 和 `/en`，确认语言切换
- [ ] 检查 LanguageSwitcher 高亮当前语言
- [ ] 确认没有新增 npm 依赖

### 后续影响

后续所有组件开发都必须使用 `t.xxx.yyy` 从语言包获取文案，禁止硬编码。首页和子页面都要支持双语。

---

## Step 5：首页核心视觉组件（Hero + EvidenceFlow + CryptoOverview）

**对应 Issue**：AEP-WEB-005（前半部分）
**优先级**：P0
**前置依赖**：Step 4 完成
**预计耗时**：30 分钟

### 输入（当前状态）

```
当前：国际化系统已完成
已有：
  - MainLayout 布局
  - i18n 双语系统
  - 主题系统
依赖：Step 4 完成
```

### 输出（本步产出）

```
新增文件：
  - src/components/common/Button.astro
  - src/components/common/SectionTitle.astro
  - src/components/common/Card.astro
  - src/components/home/Hero.astro
  - src/components/home/EvidenceFlow.astro
  - src/components/home/CryptoOverview.astro

修改文件：
  - src/pages/index.astro (引入新组件)
  - src/pages/en/index.astro (同步)
  - src/i18n/locales/zh-cn.json (补充 hero、crypto 文案)
  - src/i18n/locales/en.json (补充英文文案)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 / 验证首页组件
```

### 本步目标

创建首页前三个核心 Section：Hero 首屏、证据流程图、密码学能力卡片。同时沉淀通用组件（Button、SectionTitle、Card）。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 5.1 | 创建 Button 通用组件 | `src/components/common/Button.astro` |
| 5.2 | 创建 SectionTitle 通用组件 | `src/components/common/SectionTitle.astro` |
| 5.3 | 创建 Card 通用组件 | `src/components/common/Card.astro` |
| 5.4 | 开发 Hero 首屏组件 | `src/components/home/Hero.astro` |
| 5.5 | 开发 EvidenceFlow 证据流程组件 | `src/components/home/EvidenceFlow.astro` |
| 5.6 | 开发 CryptoOverview 密码学卡片组件 | `src/components/home/CryptoOverview.astro` |
| 5.7 | 更新首页引入三个组件 | `src/pages/index.astro` |
| 5.8 | 同步英文首页 | `src/pages/en/index.astro` |
| 5.9 | 补充 i18n 文案 | 语言 JSON 文件 |

### 关键实现要点

**Hero 组件结构：**
- 左右布局（PC）/ 上下布局（Mobile）
- 左侧：大标题（AEP + AI Evidence Protocol）+ Slogan + 描述 + 三个按钮
- 右侧：装饰性图形（可用简单 SVG 或渐变圆形占位）
- 背景：淡渐变（from-aep-primary/5 to-aep-purple/5）

**EvidenceFlow 组件：**
- 垂直时间线布局
- 8 个节点：AI Content → Artifact → SM3 → SM2 → Merkle → Timestamp → .aep Package → Independent Verification
- 节点用圆点，连接线带流动感（CSS 动画可选，v0.1 静态也可）
- 左右交替排列（偶数左、奇数右，或全部居中）

**CryptoOverview 组件：**
- 4 个卡片横向排列（PC）/ 单列（Mobile）
- 每个卡片：图标色 + 标题 + 描述
- 悬停效果：上浮 + 阴影增强
- 四个卡片颜色：蓝（SM3）、绿（SM2）、紫（Merkle）、青（Evidence Graph）

**通用组件规范：**
- Button：支持 primary / secondary / outline 三种 variant，sm / md / lg 三种尺寸
- SectionTitle：标题 + 可选副标题，支持居中
- Card：基础容器，带圆角、边框、背景、悬停效果

### 开发关键说明

1. **所有文案走 i18n**：Hero 的标题、按钮文字等全部从 `t.hero.xxx` 获取
2. **响应式优先**：先写移动端样式，再用 md: lg: 增强桌面端
3. **EvidenceFlow 动画**：v0.1 可以先做静态，流动动画是加分项，不是必须
4. **颜色使用**：卡片背景用 `var(--card-bg)`，边框用 `var(--border-color)`，确保明暗主题适配
5. **英文首页同步**：`en/index.astro` 和中文首页引用完全相同的组件，组件内部自动根据路径判断语言
6. **通用组件要通用**：Button、Card 等组件不要写死业务逻辑，通过 Props 控制

### 测试验证方法

1. **视觉测试**：
   - PC 端（1920px）：Hero 左右布局，卡片 4 列
   - 平板（768px）：Hero 上下布局，卡片 2 列
   - 手机（375px）：单列布局，无横向滚动条
2. **交互测试**：
   - 卡片悬停：上浮 + 阴影变化
   - 按钮悬停：颜色变化
3. **主题测试**：
   - 切换深色模式，所有背景、文字、边框颜色正确
4. **双语测试**：
   - `/` 显示中文，`/en` 显示英文
5. **按钮跳转测试**：
   - 「开始使用」→ `/developer`（404 正常，页面后续开发）
   - 「查看协议」→ `/protocol`
   - 「下载工具」→ `/downloads`

### 完成标准（DoD）

- [ ] 3 个通用组件：Button、SectionTitle、Card
- [ ] 3 个首页组件：Hero、EvidenceFlow、CryptoOverview
- [ ] 首页引入全部组件，布局正常
- [ ] 响应式：PC / 平板 / 手机均正常显示，无溢出
- [ ] 明暗主题适配
- [ ] 中英文切换正常
- [ ] i18n 文案补充完整
- [ ] Commit：`feat(home): add hero, evidence flow and crypto sections`

### OpenClaw 审计清单

- [ ] 检查通用组件 Props 定义是否完整（variant、size 等）
- [ ] 检查 Hero 布局：PC 左右、Mobile 上下
- [ ] 检查 EvidenceFlow 8 个节点完整，顺序正确
- [ ] 检查 CryptoOverview 4 个卡片，颜色对应正确
- [ ] 检查所有文案是否来自 i18n，无硬编码
- [ ] 检查响应式：375px 宽度下无横向滚动
- [ ] 切换深色模式，检查所有元素颜色
- [ ] 检查卡片悬停动画是否流畅
- [ ] 确认没有新增 npm 依赖
- [ ] 确认没有修改目录结构

### 后续影响

通用组件（Button、Card、SectionTitle、CodeBlock）将在后续子页面中大量复用。首页还有 5 个 Section 在 Step 6 完成。

---

## Step 6：首页剩余组件（PackagePreview + Verification + DeveloperEntry + UseCases + ComingSoon）

**对应 Issue**：AEP-WEB-005（后半部分）
**优先级**：P0
**前置依赖**：Step 5 完成
**预计耗时**：30 分钟

### 输入（当前状态）

```
当前：首页前 3 个 Section 已完成
已有：
  - Hero / EvidenceFlow / CryptoOverview
  - 通用组件 Button / Card / SectionTitle
依赖：Step 5 完成
```

### 输出（本步产出）

```
新增文件：
  - src/components/common/CodeBlock.astro
  - src/components/home/PackagePreview.astro
  - src/components/home/VerificationProcess.astro
  - src/components/home/DeveloperEntry.astro
  - src/components/home/UseCases.astro
  - src/components/home/ComingSoon.astro

修改文件：
  - src/pages/index.astro (引入剩余组件)
  - src/pages/en/index.astro (同步)
  - src/i18n/locales/zh-cn.json (补充文案)
  - src/i18n/locales/en.json (补充文案)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 / 验证完整首页
```

### 本步目标

完成首页剩余 5 个 Section，组装完整首页。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 6.1 | 创建 CodeBlock 通用组件 | `src/components/common/CodeBlock.astro` |
| 6.2 | 开发 PackagePreview 证据包结构组件 | `src/components/home/PackagePreview.astro` |
| 6.3 | 开发 VerificationProcess 验证流程组件 | `src/components/home/VerificationProcess.astro` |
| 6.4 | 开发 DeveloperEntry 开发者入口组件 | `src/components/home/DeveloperEntry.astro` |
| 6.5 | 开发 UseCases 应用场景组件 | `src/components/home/UseCases.astro` |
| 6.6 | 开发 ComingSoon 即将推出组件 | `src/components/home/ComingSoon.astro` |
| 6.7 | 组装完整首页 | `src/pages/index.astro` |
| 6.8 | 同步英文首页 | `src/pages/en/index.astro` |
| 6.9 | 补充 i18n 文案 | 语言 JSON 文件 |

### 关键实现要点

**CodeBlock 组件：**
- 深色背景（`var(--code-bg)`）
- 等宽字体（font-mono）
- 支持横向滚动（overflow-x-auto）
- Props：code（代码内容）、language（语言标识）

**PackagePreview 组件：**
- 左右布局：左侧目录树，右侧代码示例
- 目录树：用等宽字体 + 缩进模拟树形结构，颜色区分文件/目录
- 代码示例：展示 manifest.json 和 signature.json 两个示例
- 用 CodeBlock 组件渲染代码

**VerificationProcess 组件：**
- 左右布局：左侧 7 个步骤列表，右侧结果展示
- 步骤列表：带序号的圆形徽章 + 步骤名称
- 结果展示：绿色盾牌/对勾图标 + 「验证通过」+ 证据等级 L3
- v0.1 纯静态展示，不需要真实验证逻辑

**DeveloperEntry 组件：**
- 3 个卡片：MCP 集成（Available）、CLI 工具（Available）、Agent Skills（Coming Soon）
- 每个卡片：标题 + 状态标签 + 描述
- 状态标签颜色：Available → 绿色，Coming Soon → 琥珀色

**UseCases 组件：**
- 6 个场景图标横向排列：AI 写作、代码生成、图像生成、视频生成、智能体执行、企业审计
- v0.1 可用 emoji 或简单 SVG 图标
- 悬停效果：轻微上浮 + 阴影

**ComingSoon 组件：**
- 标签云/胶囊排列
- 每个标签：名称 + Coming Soon 标识
- 内容：Python SDK、Rust SDK、Go SDK、Java SDK、在线验证服务、企业平台、更多集成

### 开发关键说明

1. **代码内容硬编码**：PackagePreview 中的 JSON 示例是静态展示，可以直接写在组件里，不需要进 i18n（代码本身是英文的）
2. **状态标签统一**：Available / Coming Soon 的样式要统一，建议做成通用 Badge 组件（可选，v0.1 可直接内联）
3. **UseCases 图标**：v0.1 用 emoji 占位即可，后续再换成专业 SVG 图标
4. **首页完整顺序**：Hero → EvidenceFlow → CryptoOverview → PackagePreview → VerificationProcess → DeveloperEntry → UseCases → ComingSoon
5. **Section 间距**：每个 Section 之间要有足够的上下 padding（py-16 或 py-20）
6. **i18n 补充**：所有新增的说明文字都要加到语言 JSON 里

### 测试验证方法

1. **完整性检查**：
   - 首页从上到下依次有 8 个 Section
   - 每个 Section 内容完整，无缺失
2. **响应式测试**：
   - 375px 宽度下所有内容正常显示，无横向滚动
   - PackagePreview 左右布局在手机端变上下布局
3. **代码块测试**：
   - 代码字体正确（等宽）
   - 长代码可以横向滚动
   - 深色模式下代码块背景和文字颜色正确
4. **状态标签测试**：
   - Available 显示绿色，Coming Soon 显示琥珀色
5. **双语测试**：
   - 所有说明文字中英文切换正常
   - 代码内容保持英文（不需要翻译）

### 完成标准（DoD）

- [ ] CodeBlock 通用组件
- [ ] 5 个首页组件全部完成
- [ ] 首页 8 个 Section 完整组装
- [ ] 英文首页同步完成
- [ ] 响应式正常（PC / 平板 / 手机）
- [ ] 明暗主题适配
- [ ] i18n 文案补充完整
- [ ] Commit：`feat(home): complete all homepage sections`

### OpenClaw 审计清单

- [ ] 检查 8 个 Section 顺序和完整性
- [ ] 检查 PackagePreview 目录树和代码块
- [ ] 检查 VerificationProcess 7 个步骤 + 结果展示
- [ ] 检查 DeveloperEntry 3 个卡片状态标签
- [ ] 检查 UseCases 6 个场景
- [ ] 检查 ComingSoon 标签列表
- [ ] 检查代码块在明暗主题下的可读性
- [ ] 检查移动端 375px 下无横向溢出
- [ ] 检查所有说明文字走 i18n
- [ ] 确认没有新增 npm 依赖

### 后续影响

首页全部完成。接下来 Step 7-9 开发 5 个子页面，复用首页沉淀的通用组件。

---

## Step 7：协议页（Protocol）与架构页（Architecture）

**对应 Issue**：AEP-WEB-006 + AEP-WEB-007
**优先级**：P1
**前置依赖**：Step 6 完成
**预计耗时**：35 分钟

### 输入（当前状态）

```
当前：首页全部完成
已有：
  - 首页 8 个 Section
  - 通用组件：Button / Card / SectionTitle / CodeBlock
  - i18n 双语系统
依赖：Step 6 完成
```

### 输出（本步产出）

```
新增文件：
  - src/pages/protocol.astro
  - src/pages/en/protocol.astro
  - src/pages/architecture.astro
  - src/pages/en/architecture.astro

修改文件：
  - src/i18n/locales/zh-cn.json (补充 protocol、architecture 模块)
  - src/i18n/locales/en.json (补充英文文案)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 /protocol 和 /architecture
```

### 本步目标

开发协议介绍页和技术架构页，其中架构页的五层架构图必须用 SVG 实现。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 7.1 | 创建协议页（中文） | `src/pages/protocol.astro` |
| 7.2 | 创建协议页（英文） | `src/pages/en/protocol.astro` |
| 7.3 | 创建架构页（中文） | `src/pages/architecture.astro` |
| 7.4 | 创建架构页（英文） | `src/pages/en/architecture.astro` |
| 7.5 | 绘制五层架构 SVG 图 | 内联在 architecture 页 |
| 7.6 | 绘制证据图谱 SVG 示意图 | 内联在 architecture 页 |
| 7.7 | 补充 i18n 文案 | 语言 JSON 文件 |

### 关键实现要点

**协议页内容结构：**
1. 页面标题 + 副标题
2. 协议概述 — AEP 是什么、解决什么问题
3. 设计原则 — 开放、安全、可验证、可扩展（4 个卡片）
4. 核心概念 — Evidence、Artifact、Event、Identity、Evidence Graph（5 个条目）
5. 证据等级 — L0-L7 简介（列表或表格）
6. 与其他标准关系 — C2PA、W3C PROV、MCP（简要说明）

**架构页内容结构：**
1. 页面标题 + 副标题
2. 五层架构图（SVG，核心）
   - AI Application Layer（应用层）
   - Evidence Capture Layer（证据采集层）
   - Evidence Model Layer（证据模型层）
   - Cryptographic Layer（密码学层）
   - Verification Layer（验证层）
3. 证据图谱结构 — 节点与关系示意图（SVG）
4. 数据流说明 — 从生成到验证的完整流程
5. 包格式说明 — .aep 文件结构（可复用首页的 PackagePreview 组件）

**SVG 实现要求（极度关键）：**
- 必须内联 SVG 代码，不能用 `<img>` 引用图片
- 颜色使用 `currentColor` 或 CSS 变量，适配明暗主题
- 使用 `viewBox` 确保响应式缩放
- 架构图要有箭头，表示层级关系
- 文字要清晰，字号合理

### 开发关键说明

1. **SVG 是红线**：架构图绝对不能用 PNG/JPG 图片，必须用 SVG。这是技术可信度的体现
2. **SVG 颜色适配**：填充色用 `fill="currentColor"` 或 `fill="var(--aep-primary)"`，确保明暗主题都清晰
3. **协议页内容**：v0.1 内容可以相对简洁，重点是结构完整。详细的协议规范文档后续迭代
4. **证据等级 L0-L7**：简要说明每个等级的含义，不需要太深入
5. **i18n 补充**：协议页和架构页的文案要加到语言 JSON 中，按模块组织（protocol、architecture）
6. **英文页同步**：两个页面都要有中英文版本
7. **复用组件**：卡片、标题、代码块等通用组件直接复用，不要重复造轮子

### 测试验证方法

1. **页面访问测试**：
   - `/protocol` → 协议页正常显示
   - `/en/protocol` → 英文协议页
   - `/architecture` → 架构页正常显示
   - `/en/architecture` → 英文架构页
2. **SVG 测试**：
   - 架构图完整显示，5 层结构清晰
   - 箭头方向正确（从上到下）
   - 缩放浏览器窗口，SVG 随容器宽度自适应
   - 切换深色模式，SVG 线条和文字清晰可见（颜色自动适配）
3. **内容测试**：
   - 协议页 6 个内容区块完整
   - 架构页 5 个内容区块完整
4. **导航测试**：
   - 从首页点击「查看协议」按钮，正确跳转到协议页
   - Header 导航点击「架构」，正确跳转到架构页

### 完成标准（DoD）

- [ ] 协议页（中/英）完成，内容结构完整
- [ ] 架构页（中/英）完成，内容结构完整
- [ ] 五层架构图使用内联 SVG 实现
- [ ] 证据图谱示意图使用 SVG 实现
- [ ] SVG 在明暗主题下均清晰可见
- [ ] SVG 响应式缩放正常
- [ ] i18n 文案补充完整
- [ ] Commit：`feat(protocol): add protocol and architecture pages`

### OpenClaw 审计清单

- [ ] **重点检查**：架构图是否为内联 SVG，不是图片
- [ ] 检查 SVG viewBox 设置，确认响应式
- [ ] 切换深色模式，检查 SVG 颜色是否适配
- [ ] 检查协议页 6 个内容区块
- [ ] 检查架构页 5 个内容区块
- [ ] 检查中英文版本都可访问
- [ ] 检查导航跳转正确
- [ ] 检查页面使用 MainLayout 包裹
- [ ] 确认没有新增 npm 依赖

### 后续影响

两个技术页面完成，增强了网站的技术可信度。接下来开发安全页、开发者页、下载页。

---

## Step 8：安全页（Security）

**对应 Issue**：AEP-WEB-008
**优先级**：P1
**前置依赖**：Step 7 完成
**预计耗时**：20 分钟

### 输入（当前状态）

```
当前：协议页和架构页已完成
已有：
  - 首页 + 协议页 + 架构页
  - 通用组件库
依赖：Step 7 完成
```

### 输出（本步产出）

```
新增文件：
  - src/pages/security.astro
  - src/pages/en/security.astro

修改文件：
  - src/i18n/locales/zh-cn.json (补充 security 模块)
  - src/i18n/locales/en.json (补充英文文案)

删除文件：无

测试命令：
  - pnpm dev
  - 访问 /security
```

### 本步目标

开发安全模型页面，展示 AEP 的安全设计和密码学基础。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 8.1 | 创建安全页（中文） | `src/pages/security.astro` |
| 8.2 | 创建安全页（英文） | `src/pages/en/security.astro` |
| 8.3 | 补充 i18n 文案 | 语言 JSON 文件 |

### 页面内容结构

1. **页面标题 + 副标题**
2. **安全模型概述** — AEP 提供什么样的安全保证
3. **密码学基础**（4 个卡片，可复用 CryptoOverview 的样式）
   - SM2 数字签名算法
   - SM3 哈希算法
   - Merkle 树证明
   - 时间戳机制
4. **威胁模型（Threat Model）**
   - 内容篡改检测
   - 身份伪造防护
   - 重放攻击防护
   - （每个威胁 + 对应防护机制）
5. **验证流程详解** — 七阶段验证的简要说明
6. **安全声明** — 客观、严谨的表述

### 开发关键说明（安全页特有）

1. **用词严谨是红线**：
   - ❌ 禁止：「绝对安全」「不可破解」「100% 可信」「完全保证」
   - ✅ 应该：「提供密码学证据能力」「在计算上不可行」「降低篡改风险」「基于密码学假设」「提供可验证的完整性保证」
2. **技术准确**：SM2、SM3、Merkle Tree 的描述要准确，不能出错
3. **不夸大承诺**：AEP 提供的是「证据」和「可验证性」，不是「保证绝对真实」
4. **威胁模型部分**：要客观列出能防护什么，不能防护什么（v0.1 可以只列能防护的）
5. **复用组件**：密码学基础的 4 个卡片可以直接复用首页的样式或组件

### 测试验证方法

1. **内容审核**：
   - 通读安全页全文，检查是否有夸大、绝对化表述
   - 搜索关键词：「绝对」「100%」「不可破解」「完全」，确认没有
   - 检查密码学术语使用是否正确
2. **页面访问测试**：
   - `/security` 和 `/en/security` 均可访问
3. **主题测试**：
   - 明暗主题下文字和背景对比度足够
4. **导航测试**：
   - Header 点击「安全」正确跳转

### 完成标准（DoD）

- [ ] 安全页（中/英）完成
- [ ] 6 个内容区块完整
- [ ] 无夸大、绝对化表述
- [ ] 密码学描述准确
- [ ] 明暗主题适配
- [ ] Commit：`feat(security): add security page`

### OpenClaw 审计清单

- [ ] **重点检查**：全文搜索「绝对」「100%」「不可破解」「完全」等词，确认没有
- [ ] 检查 SM2/SM3/Merkle 的技术描述是否准确
- [ ] 检查威胁模型部分的表述是否客观
- [ ] 检查中英文版本内容对应
- [ ] 检查页面布局和样式一致性
- [ ] 检查导航跳转
- [ ] 确认没有新增 npm 依赖

### 后续影响

安全页完成，技术类页面全部搞定。接下来开发开发者页和下载页，是 v0.1.0 最后两个页面。

---

## Step 9：开发者页（Developer）与下载页（Downloads）

**对应 Issue**：AEP-WEB-009
**优先级**：P0
**前置依赖**：Step 8 完成
**预计耗时**：25 分钟

### 输入（当前状态）

```
当前：安全页已完成
已有：
  - 首页 + 协议页 + 架构页 + 安全页
  - 通用组件库
依赖：Step 8 完成
```

### 输出（本步产出）

```
新增文件：
  - src/pages/developer.astro
  - src/pages/en/developer.astro
  - src/pages/downloads.astro
  - src/pages/en/downloads.astro
  - src/components/common/ToolCard.astro (可选，可内联)

修改文件：
  - src/i18n/locales/zh-cn.json (补充 developer、downloads 模块)
  - src/i18n/locales/en.json (补充英文文案)

删除文件：无

测试命令：
  - pnpm build
  - 访问 /developer 和 /downloads
```

### 本步目标

开发开发者入口页和工具下载页，完成 v0.1.0 所有页面。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 9.1 | 创建开发者页（中文） | `src/pages/developer.astro` |
| 9.2 | 创建开发者页（英文） | `src/pages/en/developer.astro` |
| 9.3 | 创建下载页（中文） | `src/pages/downloads.astro` |
| 9.4 | 创建下载页（英文） | `src/pages/en/downloads.astro` |
| 9.5 | 创建 ToolCard / SDKCard 组件 | `src/components/common/` |
| 9.6 | 补充 i18n 文案 | 语言 JSON 文件 |

### 开发者页内容结构

1. **页面标题 + 副标题** — 开发者中心
2. **快速开始（Quick Start）**
   - 三步上手：安装 → 初始化 → 存证
   - 每个步骤配代码示例（用 CodeBlock 组件）
3. **工具矩阵**
   - MCP Server（Available）— 17 个工具，AI Agent 原生支持
   - CLI Tool（Available）— 命令行工具
   - Python SDK（Coming Soon）
   - Rust SDK（Coming Soon）
   - Go SDK（Coming Soon）
4. **示例代码**
   - CLI 存证示例
   - MCP 调用示例
5. **文档入口** — 链接到文档（v0.1 可先指向 GitHub 或 #）

### 下载页内容结构

1. **页面标题 + 副标题** — 下载中心
2. **AEP CLI**
   - 版本号（v0.1.0）
   - 更新日期
   - 各平台下载按钮（Linux / macOS / Windows）
   - 安装命令示例（curl ...）
3. **AEP MCP Server**
   - 安装方式（npm install / pip install）
   - 配置说明简要
4. **AEP Skill**
   - 下载链接
   - 使用说明
5. **历史版本** — 入口链接（v0.1 可占位）

> **注意**：v0.1.0 所有下载链接可先指向 `#` 或 GitHub Releases 页面占位，不需要真实的安装包。

### 开发关键说明

1. **下载链接占位**：v0.1 不需要真实文件，按钮 href 可以是 `#`，或者写 `https://github.com/aep-protocol/aep-cli/releases` 占位
2. **代码示例**：安装命令、使用示例要用 CodeBlock 组件渲染，保持样式统一
3. **状态标签**：Available / Coming Soon 复用首页的样式，保持一致
4. **工具卡片**：可创建一个通用的 ToolCard 组件，包含图标、名称、状态、描述、链接
5. **版本信息**：v0.1 可以硬编码版本号，后续再从 content collection 读取
6. **全站构建测试**：这一步完成后要跑一次完整的 `pnpm build`，确认零错误

### 测试验证方法

1. **页面访问测试**：
   - `/developer` 和 `/en/developer` 均可访问
   - `/downloads` 和 `/en/downloads` 均可访问
2. **内容完整性**：
   - 开发者页：快速开始 + 工具矩阵 + 示例代码
   - 下载页：CLI + MCP Server + Skill 三个下载区块
3. **代码块测试**：
   - 所有命令示例用 CodeBlock 渲染
   - 样式统一，明暗主题适配
4. **按钮测试**：
   - 下载按钮可点击（即使是 # 占位，也不能有 JS 报错）
5. **导航测试**：
   - Header 点击「开发者」「下载」正确跳转
   - 首页 Hero 区三个按钮跳转正确
6. **全站构建测试**：
   ```bash
   pnpm build
   ```
   确认无类型错误、无死链接警告

### 完成标准（DoD）

- [ ] 开发者页（中/英）完成
- [ ] 下载页（中/英）完成
- [ ] 工具卡片组件复用
- [ ] 所有代码示例样式统一
- [ ] 下载链接占位正常，无报错
- [ ] `pnpm build` 全站构建成功
- [ ] 6 个页面全部可访问
- [ ] Commit：`feat(developer): add developer and downloads pages`

### OpenClaw 审计清单

- [ ] 检查开发者页 4 个内容区块
- [ ] 检查下载页 3 个下载区块
- [ ] 检查代码块样式一致性
- [ ] 检查所有下载按钮可点击（无 JS 报错）
- [ ] 执行 pnpm build，确认零错误零警告
- [ ] 遍历所有 6 个页面 + 英文版，确认都能访问
- [ ] 检查 Header 导航高亮当前页（可选，v0.1 可不做）
- [ ] 检查中英文切换在所有页面正常
- [ ] 确认没有新增 npm 依赖

### 后续影响

所有页面开发完成，v0.1.0 功能开发阶段结束。接下来 Step 10 做 Docker 部署配置。

---

## Step 10：Docker 生产部署

**对应 Issue**：AEP-WEB-010
**优先级**：P0
**前置依赖**：Step 9 完成，所有页面开发完毕
**预计耗时**：20 分钟

### 输入（当前状态）

```
当前：所有页面开发完成
已有：
  - 6 个页面（中/英）
  - pnpm build 成功
依赖：Step 9 完成
```

### 输出（本步产出）

```
新增文件：
  - docker/Dockerfile
  - docker/nginx.conf
  - docker/docker-compose.yml
  - .dockerignore
  - README.md (更新部署说明)

修改文件：
  - README.md (如果已存在)

删除文件：无

测试命令：
  - docker build -f docker/Dockerfile -t aep-website .
  - docker run -p 8080:80 aep-website
  - 访问 http://localhost:8080
```

### 本步目标

配置 Docker 多阶段构建、Nginx 配置、docker-compose，实现一键部署。v0.1 只有一个容器。

### 详细任务清单

| 子任务 | 操作 | 产出文件 |
|--------|------|----------|
| 10.1 | 创建 Dockerfile（多阶段构建） | `docker/Dockerfile` |
| 10.2 | 创建 Nginx 配置 | `docker/nginx.conf` |
| 10.3 | 创建 docker-compose.yml | `docker/docker-compose.yml` |
| 10.4 | 创建 .dockerignore | `.dockerignore` |
| 10.5 | 更新 README 部署说明 | `README.md` |
| 10.6 | 测试 Docker 构建和运行 | 验证 |

### 关键配置

**Dockerfile（多阶段构建）：**
```dockerfile
# Stage 1: 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf 核心配置：**
- 监听 80 端口
- 开启 Gzip 压缩（text/css、application/javascript、image/svg+xml 等）
- 静态资源强缓存（30 天，immutable）
- 路由回退（try_files，对 Astro 静态站可选，但加上更安全）

**docker-compose.yml：**
```yaml
version: '3.8'
services:
  aep-web:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    container_name: aep-website
    restart: unless-stopped
    ports:
      - "8080:80"
```

**.dockerignore：**
```
node_modules
dist
.env
.git
.gitignore
*.log
.DS_Store
```

### 开发关键说明

1. **多阶段构建是必须的**：最终镜像只包含 Nginx + 静态文件，不包含 Node.js 和 node_modules，镜像体积小
2. **pnpm 安装**：builder 阶段要先全局安装 pnpm，因为 node:20-alpine 默认没有
3. **--frozen-lockfile**：确保构建时依赖版本和 lockfile 一致，可复现
4. **Nginx 缓存策略**：
   - HTML 页面：不缓存或短缓存（每次访问都可能更新）
   - JS/CSS/图片：强缓存 30 天（Astro 构建时会加 hash，文件名变了就失效）
5. **Gzip 压缩**：必须开启，显著减少传输体积
6. **context 路径**：docker-compose 中 build context 是 `..`，因为 docker-compose.yml 在 docker/ 目录下
7. **v0.1 单容器**：只有 aep-web 一个容器，不要引入数据库、Redis 等，保持简单

### 测试验证方法

1. **构建测试**：
   ```bash
   docker build -f docker/Dockerfile -t aep-website .
   ```
   预期：镜像构建成功，无报错

2. **运行测试**：
   ```bash
   docker run -d --name aep-test -p 8080:80 aep-website
   ```
   预期：容器启动成功

3. **访问测试**：
   - 浏览器打开 `http://localhost:8080`，网站正常显示
   - 所有页面路由正常（/、/protocol、/architecture、/security、/developer、/downloads、/en）
   - 刷新子页面不 404

4. **缓存测试**：
   - 打开浏览器 DevTools → Network
   - 刷新页面，检查 JS/CSS/图片响应头
   - 确认有 `Cache-Control: public, max-age=2592000, immutable`
   - 确认有 `Content-Encoding: gzip`

5. **docker-compose 测试**：
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```
   预期：服务启动成功，访问正常

6. **清理测试容器**：
   ```bash
   docker stop aep-test && docker rm aep-test
   ```

### 完成标准（DoD）

- [ ] Dockerfile 多阶段构建配置正确
- [ ] nginx.conf 包含 Gzip + 缓存策略
- [ ] docker-compose.yml 可一键启动
- [ ] .dockerignore 排除不必要文件
- [ ] README 有部署说明
- [ ] `docker build` 成功
- [ ] `docker run` 后网站可访问
- [ ] 静态资源缓存 + Gzip 生效
- [ ] Commit：`chore(docker): add production deployment`

### OpenClaw 审计清单

- [ ] 检查 Dockerfile 是否为多阶段构建（builder + nginx）
- [ ] 检查 builder 阶段是否安装了 pnpm
- [ ] 检查 nginx.conf 是否开启 Gzip
- [ ] 检查 nginx.conf 是否有静态资源缓存配置
- [ ] 检查 .dockerignore 是否排除了 node_modules、dist 等
- [ ] 实际执行 docker build，确认构建成功
- [ ] 实际运行容器，访问网站确认正常
- [ ] 检查 Network 面板确认 Gzip 和缓存生效
- [ ] 检查 docker-compose up -d 正常工作
- [ ] 确认只有 1 个容器（aep-web），没有多余服务

### 后续影响

v0.1.0 全部完成！网站可以部署到任何支持 Docker 的服务器（包括 Unraid + 阿里云反向代理）。v0.2 再增加在线验证 API，届时增加 aep-api 容器。

---

## 最终验收清单（v0.1.0 发布标准）

### 功能完整性

- [ ] 6 个页面：首页、协议、架构、安全、开发者、下载
- [ ] 每个页面都有中英文版本
- [ ] 首页 8 个 Section 完整
- [ ] 架构图使用 SVG 实现
- [ ] AI_RULES.md 已创建

### 交互功能

- [ ] 主题切换（明/暗）在所有页面正常
- [ ] 主题刷新后保持记忆
- [ ] 语言切换在所有页面正常
- [ ] 导航跳转正确
- [ ] 按钮、链接可点击，无 JS 报错

### 响应式

- [ ] 桌面端（1920px）布局正常
- [ ] 平板端（768px）布局正常
- [ ] 手机端（375px）布局正常，无横向滚动

### 视觉一致性

- [ ] 颜色使用统一的主题系统
- [ ] 明暗主题下所有元素清晰可读
- [ ] 卡片、按钮、代码块样式统一
- [ ] 字体正确加载（Inter + JetBrains Mono）

### 代码质量

- [ ] TypeScript 无类型错误
- [ ] `pnpm build` 零警告零错误
- [ ] 所有文案走 i18n，无硬编码
- [ ] 组件结构清晰，命名规范
- [ ] 遵守 AI_RULES.md 所有规则

### 部署能力

- [ ] Docker 镜像构建成功
- [ ] Docker 容器运行正常
- [ ] Nginx Gzip 开启
- [ ] 静态资源缓存策略正确
- [ ] docker-compose 一键启动
- [ ] 单容器（aep-web），无多余服务

### Git 规范

- [ ] 10 个 Commit，每个对应一个 Step
- [ ] Commit message 符合 Conventional Commits
- [ ] 代码可追溯，每步都有记录

### 文档

- [ ] README.md 有项目介绍和部署说明
- [ ] AI_RULES.md 完整且在根目录
- [ ] 目录结构清晰，符合约定

---

## 发布流程

当所有验收项都通过后：

```bash
# 1. 打 Tag
git tag v0.1.0

# 2. 推送
git push origin main --tags

# 3. 部署到服务器（Unraid）
# 在服务器上：
docker compose pull && docker compose up -d
```

---

## 版本路线图（完整版）

| 版本 | 时间 | 核心内容 | 容器数量 | 仓库 |
|------|------|----------|----------|------|
| **v0.1** | 2026 Q3 | 官网 + 文档 + 工具介绍 | 1 个（web） | 单仓 |
| **v0.2** | 2026 Q4 | 在线验证 + API + 验证报告 + 文档系统 | 2 个（web + api） | 单仓 |
| **v0.5** | 2027 | SDK 生态 + 企业部署 + 第三方接入 | 4 个（web + api + verifier + db） | 多仓拆分 |
| **v1.0** | 之后 | 协议稳定 + 公共验证网络 + 标准化 | N 个 | Organization |

### v0.2 规划（下个阶段，不在本次执行）

**做：**
- ✅ 在线验证 Demo
- ✅ 验证 API 接口
- ✅ 验证报告生成
- ✅ 文档系统升级（Content Collections）
- ✅ SDK 展示页

**不做（暂缓）：**
- ❌ 用户系统
- ❌ 企业系统
- ❌ 数据库（先不引入，用文件或内存）
- ❌ 支付 / 商业化

---

## License 策略（v0.5 拆仓时落地）

| 项目 | License | 说明 |
|------|---------|------|
| aep-spec（协议规范） | CC BY 4.0 | 开放传播，保留署名 |
| aep-core（核心库） | Apache 2.0 | 企业友好，生态优先 |
| aep-cli / aep-mcp | Apache 2.0 | 工具类，鼓励使用 |
| aep-website（官网） | AGPL 3.0 | 网站代码，修改需开源 |
| 商业版 / 企业服务 | 闭源 | 商业化收入 |

---

**文档版本**：v2.0
**适用版本**：AEP Website v0.1.0
**最后更新**：2026-08-09
**执行模式**：OpenClaw 拆解 + Hermes 编码 + OpenClaw 审计
**核心原则**：先最小化运行，逐步迭代，不做过度设计
