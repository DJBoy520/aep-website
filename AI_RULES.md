# AEP Website AI 开发规则

> **版本**：v1.0
> **适用版本**：v0.1.x
> **最后更新**：2026-08-09
> **重要性**：所有 AI 助手参与本项目前，必须完整阅读并遵守本文件

---

## 一、架构原则

### 1.1 禁止事项

以下行为严格禁止，除非有明确授权：

- ❌ **禁止大规模重构**现有代码结构
- ❌ **禁止随意增加**新的 npm 依赖
- ❌ **禁止修改**已约定的目录结构
- ❌ **禁止引入** React / Vue / Svelte 等前端框架
- ❌ **禁止添加**后端逻辑、数据库、用户系统（v0.1 阶段）
- ❌ **禁止用图片代替** SVG 架构图、流程图
- ❌ **禁止硬编码**中英文文案（必须走 i18n）
- ❌ **禁止使用** `any` 类型（TypeScript strict 模式）
- ❌ **禁止出现**「绝对安全」「不可破解」等夸大表述

### 1.2 允许事项

- ✅ 在现有组件基础上增加功能
- ✅ 修复 bug 和样式问题
- ✅ 新增页面和组件（遵循现有目录规范）
- ✅ 优化性能和可访问性
- ✅ 补充文档和注释
- ✅ 重构单个组件内部实现（不改变对外接口）

### 1.3 技术栈锁定

| 层级 | 技术 | 版本 | 状态 |
|------|------|------|------|
| 框架 | Astro | 4.x | 锁定 |
| 语言 | TypeScript | strict 模式 | 锁定 |
| 样式 | Tailwind CSS | 3.x | 锁定 |
| 国际化 | Astro i18n | 官方 | 锁定 |
| 包管理 | pnpm | 8.x | 锁定 |
| 部署 | Docker + Nginx | - | 锁定 |

**锁定原则**：v0.1 阶段技术栈保持稳定，不新增框架和库。需要引入新依赖时，必须先评估并获得确认。

### 1.4 设计哲学

> **先最小化运行，逐步迭代，不做过度设计**

- 能用简单方案解决的，不用复杂方案
- 能复用现有组件的，不造新轮子
- 能静态实现的，不加运行时逻辑
- 能晚做的，不提前做（YAGNI 原则）

---

## 二、开发流程

每个任务必须按以下 5 步执行，**禁止跳步**。

### Step 1: 分析（Analyze）

**做什么**：
- 阅读任务描述，理解需求
- 查看当前项目结构和相关文件
- 确认依赖关系和影响范围
- 识别潜在风险和坑点

**输出**：
- 任务理解确认
- 影响范围评估
- 相关文件列表

**检查项**：
- [ ] 我理解了任务要做什么
- [ ] 我知道改哪些文件
- [ ] 我知道依赖什么
- [ ] 我识别了潜在风险

---

### Step 2: 计划（Plan）

**做什么**：
- 列出需要新增的文件
- 列出需要修改的文件
- 列出需要删除的文件
- 说明实现思路和技术方案
- 评估工作量和复杂度

**输出**：
- 新增文件清单
- 修改文件清单
- 删除文件清单
- 实现思路说明

**重要**：计划完成后，**等待确认**再执行修改。

**检查项**：
- [ ] 新增文件都列出来了
- [ ] 修改文件都列出来了
- [ ] 实现思路清晰
- [ ] 没有超出任务范围

---

### Step 3: 修改（Implement）

**做什么**：
- 按计划逐一修改文件
- 保持代码风格与现有一致
- 每修改一个文件做一次自检
- 遇到问题及时反馈，不硬扛

**自检清单**（每个文件修改后）：
- [ ] 代码能正常运行
- [ ] 类型定义完整
- [ ] 没有硬编码文案
- [ ] 颜色使用主题系统
- [ ] 响应式布局正常
- [ ] 注释清晰（必要时）

**注意**：
- 一次只改一个文件，改完自检
- 不要同时改很多文件再一起测
- 发现计划有问题及时调整，不要硬按计划走

---

### Step 4: 测试（Test）

**做什么**：
- 运行构建命令，确认无报错
- 检查 TypeScript 类型错误
- 验证功能是否正常
- 检查明暗主题适配
- 检查响应式布局
- 检查中英文切换

**测试命令**：
```bash
# 构建测试
pnpm build

# 开发服务器（手动验证）
pnpm dev
```

**测试清单**：
- [ ] `pnpm build` 无报错
- [ ] TypeScript 无类型错误
- [ ] 功能正常工作
- [ ] 明暗主题适配
- [ ] 响应式布局（375px / 768px / 1920px）
- [ ] 中英文切换正常
- [ ] 没有控制台报错

---

### Step 5: 总结（Summarize）

**做什么**：
- 列出修改的文件清单
- 说明实现的功能
- 给出测试结果
- 建议 Git Commit 信息
- 说明已知问题和后续建议

**输出模板**：
```
## 修改文件清单
- 新增：xxx.ts, yyy.astro
- 修改：aaa.ts, bbb.astro
- 删除：ccc.ts

## 实现功能
- 功能1：xxx
- 功能2：xxx

## 测试结果
- pnpm build：✅ 通过
- 类型检查：✅ 通过
- 功能验证：✅ 通过
- 主题适配：✅ 通过

## Commit 建议
feat(scope): description

## 备注
- 已知问题：xxx
- 后续建议：xxx
```

---

## 三、代码要求

### 3.1 TypeScript 规范

**必须**：
- ✅ 开启 strict 模式
- ✅ 所有组件 Props 定义类型
- ✅ 所有函数参数和返回值有类型
- ✅ 常量有明确类型（必要时）

**禁止**：
- ❌ 使用 `any` 类型
- ❌ 使用非空断言 `!`（除非绝对必要并加注释说明原因）
- ❌ 隐式 any
- ❌ 忽略类型错误

**示例**：

```typescript
// ✅ 正确
interface ButtonProps {
 variant?: 'primary' | 'secondary' | 'outline';
 size?: 'sm' | 'md' | 'lg';
 href?: string;
}

// ❌ 错误
function Button(props: any) { ... }
```

---

### 3.2 组件规范

**设计原则**：
- 单一职责：一个组件只做一件事
- Props 驱动：组件行为由 Props 控制，不依赖外部全局状态
- 可复用：通用组件不包含业务逻辑
- 可组合：小组件组合成大组件

**命名规范**：
- 组件文件名：PascalCase（`HeroSection.astro`）
- Props 接口：`ComponentNameProps`
- 事件处理函数：`onXxx`
- 布尔 Props：`isXxx` / `hasXxx` / `showXxx`

**组件结构**：
```astro
---
// 1. 导入
import ...

// 2. Props 定义
interface Props {
 title: string;
 subtitle?: string;
}

// 3. Props 解构
const { title, subtitle } = Astro.props;

// 4. 计算逻辑
const computedValue = ...
---

<!-- 5. 模板 -->
<div class="...">
 <h2>{title}</h2>
 {subtitle && <p>{subtitle}</p>}
</div>

<style>
 /* 6. 样式（scoped） */
</style>

<script>
 // 7. 客户端脚本（必要时）
</script>
```

---

### 3.3 样式规范

**优先顺序**：
1. Tailwind utility class（首选）
2. scoped style（复杂样式）
3. 全局 CSS（极少用）

**颜色使用**：
- 主题色：`bg-aep-primary`、`text-aep-green` 等
- 动态色（明暗主题）：`bg-[var(--bg-primary)]`、`text-[var(--text-secondary)]`
- 禁止硬编码颜色值（除非是主题配置文件）

**响应式**：
- 移动端优先（Mobile First）
- 先写基础样式，再用 `md:` `lg:` `xl:` 增强
- 断点：sm(640) / md(768) / lg(1024) / xl(1280)

**示例**：

```astro
<!-- ✅ 正确：使用主题色 + 响应式 -->
<div class="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-6 md:p-8">
 <h3 class="text-lg font-semibold text-aep-primary">标题</h3>
</div>

<!-- ❌ 错误：硬编码颜色 -->
<div style="background-color: #00B8D9; color: white;">
 ...
</div>
```

---

### 3.4 内容与代码分离

**原则**：所有用户可见的文本必须走 i18n，禁止在组件中硬编码。

**正确做法**：
```astro
---
import { getTranslation } from '@/i18n/utils';
const t = getTranslation(Astro.url.pathname);
---

<h1>{t.hero.title}</h1>
<p>{t.hero.description}</p>
<button>{t.common.getStarted}</button>
```

**禁止做法**：
```astro
<!-- ❌ 禁止硬编码中文 -->
<h1>AEP 协议</h1>
<p>为 AI 生成内容提供可信证明</p>
<button>开始使用</button>
```

**例外**：
- 代码示例（代码本身是英文的）
- 技术术语（如 SM2、SM3、Merkle Tree）
- Logo 文字
- 纯装饰性文字（极少）

---

### 3.5 可访问性（A11y）

**必须**：
- ✅ 图片有 `alt` 属性
- ✅ 按钮有明确的文字或 aria-label
- ✅ 链接有意义的文字
- ✅ 颜色对比度符合 WCAG AA
- ✅ 语义化 HTML 标签（nav、main、footer 等）

**建议**：
- focus 状态可见
- 键盘可导航
- 表单有 label
- ARIA 属性（必要时）

---

## 四、Git 规范

### 4.1 Commit Message 格式

```
<type>(<scope>): <subject>
```

### 4.2 Type 类型

| type | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | `feat(home): add hero section` |
| fix | 修复 bug | `fix(header): mobile menu overflow` |
| docs | 文档更新 | `docs(readme): add deployment guide` |
| style | 样式调整（不影响功能） | `style(button): adjust hover color` |
| refactor | 重构（不新增功能，不修 bug） | `refactor(i18n): extract utils` |
| chore | 构建/工具/依赖 | `chore(deps): upgrade astro to 4.5.0` |
| test | 测试相关 | `test(utils): add unit tests` |

### 4.3 Scope 范围

常用 scope：
- `home` — 首页相关
- `layout` — 布局相关
- `theme` — 主题相关
- `i18n` — 国际化相关
- `protocol` — 协议页
- `architecture` — 架构页
- `security` — 安全页
- `developer` — 开发者页
- `downloads` — 下载页
- `docker` — 部署相关
- `deps` — 依赖相关

### 4.4 Subject 要求

- 简洁明了，不超过 50 字符
- 用动词开头（add / fix / update / remove / refactor）
- 不用句号结尾
- 英文小写（技术术语除外）

**示例**：
```
✅ feat(home): add evidence flow section
✅ fix(header): resolve mobile menu z-index issue
✅ chore(deps): upgrade tailwind to 3.4.0

❌ feat(home): Added new section.
❌ FIX BUG!!!
❌ update stuff
```

---

## 五、目录结构约定

### 5.1 标准结构

```
src/
├── components/ # 组件
│ ├── layout/ # 布局组件（Header、Footer）
│ ├── home/ # 首页组件
│ ├── common/ # 通用组件（Button、Card）
│ └── ... # 按页面分组（protocol/、security/ 等）
├── layouts/ # 布局模板
├── pages/ # 页面路由
├── i18n/ # 国际化
├── config/ # 配置（主题等）
├── content/ # 内容集合
└── styles/ # 全局样式
```

### 5.2 新增组件放哪里

| 组件类型 | 目录 | 示例 |
|----------|------|------|
| 布局相关 | `components/layout/` | Header.astro, Footer.astro |
| 首页专用 | `components/home/` | Hero.astro, EvidenceFlow.astro |
| 通用组件 | `components/common/` | Button.astro, Card.astro |
| 某页面专用 | `components/{page}/` | components/security/ThreatModel.astro |
| 布局模板 | `layouts/` | MainLayout.astro |

### 5.3 命名规范

- 目录：小写，多个单词用 kebab-case（`components/evidence-flow/`）
- 组件文件：PascalCase（`HeroSection.astro`）
- 工具函数：camelCase（`getTranslation.ts`）
- 配置文件：camelCase 或 kebab-case（`theme.ts`）

---

## 六、安全红线

### 6.1 绝对禁止

- ❌ 在代码中硬编码密钥、密码、Token
- ❌ 提交 `.env` 文件到 Git
- ❌ 引入已知有严重安全漏洞的依赖
- ❌ 执行用户输入的代码（eval 等）
- ❌ 在客户端存储敏感信息

### 6.2 必须做到

- ✅ 第三方外链加 `rel="noopener noreferrer"`
- ✅ 用户输入做转义和验证（v0.1 暂无用户输入）
- ✅ 敏感配置从环境变量读取
- ✅ 定期更新依赖（安全补丁）

### 6.3 内容安全

- ❌ 禁止出现「绝对安全」「不可破解」「100% 可信」等夸大表述
- ❌ 禁止虚假承诺
- ✅ 客观、严谨地描述安全能力
- ✅ 说明能力边界和假设

---

## 七、性能要求

### 7.1 构建性能

- `pnpm build` 时间 < 30 秒
- 无警告（或警告可解释）
- 产物体积合理

### 7.2 运行性能

- 首屏加载 < 2s（4G）
- LCP < 2.5s
- 页面体积 < 200KB（gzip 后）
- 无明显布局偏移（CLS < 0.1）

### 7.3 优化原则

- 能静态的不动态
- 能延迟加载的不首屏加载
- 能复用的不重复
- 减少不必要的 DOM 节点
- 图片懒加载

---

## 八、问题处理流程

### 8.1 遇到问题怎么办

1. **先自己排查**：看报错信息、查日志、搜文档
2. **缩小范围**：定位到具体文件和代码行
3. **尝试修复**：如果是小问题，尝试修复
4. **及时反馈**：如果问题复杂或不确定，及时反馈，不要硬扛

### 8.2 不确定的时候

- 不确定能不能改的 → 先问，不要擅自改
- 不确定方案对不对 → 提出方案，等待确认
- 不确定需求是什么 → 先澄清，不要猜
- 不确定会不会影响其他功能 → 先评估影响范围

### 8.3 发现 bug 怎么办

1. 记录 bug 现象和复现步骤
2. 尝试定位原因
3. 如果能修就修
4. 如果不能修，记录下来并反馈

---

## 九、代码审查清单

每次提交代码前，对照此清单自查：

### 功能正确性
- [ ] 功能实现符合需求
- [ ] 没有引入新的 bug
- [ ] 边界情况处理正确

### 代码质量
- [ ] TypeScript 类型完整，无 any
- [ ] 组件职责单一，Props 清晰
- [ ] 没有重复代码
- [ ] 命名规范，语义清晰

### 样式与 UI
- [ ] 明暗主题适配
- [ ] 响应式布局正常（375px / 768px / 1920px）
- [ ] 颜色使用主题系统，无硬编码
- [ ] 无视觉瑕疵

### 国际化
- [ ] 所有文案走 i18n
- [ ] 中英文都能正常显示
- [ ] 语言切换功能正常

### 性能
- [ ] 没有不必要的 DOM 节点
- [ ] 图片有懒加载（必要时）
- [ ] 没有引入大体积依赖

### 安全
- [ ] 没有硬编码密钥
- [ ] 外链有 noopener noreferrer
- [ ] 安全页无夸大表述

### Git
- [ ] Commit message 符合规范
- [ ] 一次提交只做一件事
- [ ] 没有提交无关文件

---

## 十、版本与维护

### 10.1 本文件维护

- 本文件是项目的「宪法」，所有 AI 助手必须遵守
- 修改本文件需要明确授权
- 重大规则变更要记录变更历史

### 10.2 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0 | 2026-08-09 | 初始版本 |

---
