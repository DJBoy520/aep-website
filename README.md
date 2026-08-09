# AEP 官方网站

AEP（AI Evidence Protocol）官方门户，承载协议展示、开发者入口与生态起点。v0.1 为纯静态站，共 6 个页面 × 中英双语 = 12 条路由，支持明暗主题切换。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Astro 4.x | 静态站点生成 |
| 语言 | TypeScript | strict 模式 |
| 样式 | Tailwind CSS 3.x | 主题系统 + 响应式 |
| 国际化 | Astro i18n | zh-cn / en，key 编译期校验 |
| 包管理 | pnpm | lockfile v9 |
| 部署 | Docker + Nginx | 多阶段构建，单容器 |

## 目录结构

```text
/
├── docker/                  # 生产部署配置
│   ├── Dockerfile           # 多阶段构建（builder + nginx runtime）
│   ├── nginx.conf           # Gzip / 静态缓存 / 路由回退
│   └── docker-compose.yml   # 一键启动
├── docs/                    # 文档（PRD / 执行手册 / 设计文档）
├── public/                  # 静态资源（favicon 等）
├── src/
│   ├── components/          # 组件
│   │   ├── layout/          # Header、Footer、LanguageSwitcher、ThemeToggle
│   │   ├── common/          # Button、Card、CodeBlock、SectionTitle、ToolCard
│   │   ├── home/            # 首页组件（Hero、EvidenceFlow 等）
│   │   └── architecture/    # 架构页组件（LayerDiagram、EvidenceGraph）
│   ├── layouts/             # 布局模板（MainLayout）
│   ├── pages/               # 页面路由（含 en/ 英文版）
│   ├── i18n/                # 国际化（locales/zh-cn.json、en.json、utils.ts）
│   ├── config/              # 主题配置
│   ├── styles/              # 全局样式
│   └── assets/              # 图片资源
├── astro.config.ts          # Astro 配置（含 i18n）
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TS strict 配置
└── AI_RULES.md              # AI 开发规则（项目宪法）
```

## 本地开发

```bash
pnpm install     # 安装依赖
pnpm dev         # 开发服务器（localhost:4321）
pnpm build       # 生产构建到 dist/
pnpm preview     # 本地预览构建产物
```

## Docker 部署

### 方式一：docker compose（推荐）

```bash
docker compose -f docker/docker-compose.yml up -d
```

### 方式二：docker build + run

```bash
docker build -f docker/Dockerfile -t aep-website .
docker run -p 8080:80 aep-website
```

构建说明：Dockerfile 使用多阶段构建，builder 阶段（node:20-alpine + pnpm 9）安装依赖并生成 dist/，runtime 阶段（nginx:alpine）仅包含静态产物与 Nginx 配置，镜像体积最小。Nginx 已开启 Gzip 压缩、静态资源 30 天长缓存（immutable）、SPA 路由回退。

### 访问

部署完成后访问 <http://localhost:8080>

## 页面清单

| 页面 | 中文 | English |
|------|------|---------|
| 首页 | `/` | `/en/` |
| 协议 | `/protocol` | `/en/protocol` |
| 架构 | `/architecture` | `/en/architecture` |
| 安全 | `/security` | `/en/security` |
| 开发者 | `/developer` | `/en/developer` |
| 下载 | `/downloads` | `/en/downloads` |

## 文档索引

- [01-PRD-需求文档](docs/01-PRD-需求文档.md)
- [02-OpenClaw执行手册-v2](docs/02-OpenClaw执行手册-v2.md)
- [03-开发设计文档](docs/03-开发设计文档.md)
- [AI_RULES.md](AI_RULES.md) — 所有 AI 助手参与本项目前必须阅读
