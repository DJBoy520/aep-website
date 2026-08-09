# ============================================================
# AEP Website - Production Dockerfile (multi-stage build)
# ============================================================
# Stage 1: builder — 构建静态站点产物 dist/
#   使用 Node 22（满足 engines node>=22.12.0）+ pnpm 9（与 lockfile v9 一致），
#   在隔离环境安装依赖并执行 pnpm build，产出 /app/dist。
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# 安装 pnpm 9（锁定大版本，与本地 lockfile 版本一致）
RUN npm install -g pnpm@9

# 先拷贝依赖清单，利用 Docker 层缓存：package.json / lockfile 未变化时跳过 install
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 再拷贝源码并构建（.dockerignore 已排除 node_modules / dist 等）
COPY . .
RUN pnpm build

# ============================================================
# Stage 2: runtime — Nginx 托管静态产物
#   仅包含 dist/ 与 Nginx 配置，最终镜像体积最小化。
# ============================================================
FROM nginx:alpine

# 从 builder 阶段拷贝构建产物
COPY --from=builder /app/dist /usr/share/nginx/html
# 覆盖默认站点配置（Gzip / 静态缓存 / SPA 路由回退）
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
