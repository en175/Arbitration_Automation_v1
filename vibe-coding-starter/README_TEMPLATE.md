# 仲裁智能化项目 v1

本项目是面向仲裁委办案场景的 B 端 AI 工作台原型，服务售前演示、产品迭代和后续研发承接。

## 项目目标

- 业务目标：把仲裁委办案中的阅卷、立案审核、文书起草与文书审核流程结构化，体现 AI 在真实工作流中的辅助价值
- 演示目标：让客户在 10 分钟内看清"AI 如何帮助秘书、承办人、仲裁员提升效率和判断质量"
- 交付目标：沉淀一套可持续迭代的前端工作台骨架、真实业务文案和可复用样式体系

## 用户与场景

- 目标用户：仲裁秘书、一线承办人、仲裁员
- 高频场景 1：秘书进行结构化阅卷，围绕请求、请求要件、事实、证据、抗辩完成整理
- 高频场景 2：立案审核人员进行材料完整性核验、字段核验、问题归纳和处理决策
- 高频场景 3：仲裁员/秘书撰写裁决书，引用证据材料，AI 辅助续写/改写/检查
- 不做的场景：不做泛化法律咨询产品，不做脱离仲裁委语境的通用 AI 助手

## 四个核心模块（当前状态）

| 模块 | 路由 | 状态 | 说明 |
| --- | --- | --- | --- |
| 立案审核 | `/filing-review` | ✅ 已完成深度优化 | 材料清单（点击预览）、案件信息核验、案情概览、建议结论 |
| 智能阅卷 | `/dossier-reading` | ✅ 已完成深度优化 | 请求导航、卷宗材料预览、案件摘要+时间轴、请求要件+事实证据+抗辩对照、查看原文 |
| 文书写作助手 | `/doc-writer` | ✅ 已完成深度优化（第二轮） | 模块导航条（7模块跳转+滚动跟随）、手风琴式证据材料面板（提交方筛选+已引用标记）、脚注式证据引用（正文上标+文末注释区）、AI模块感知写作助手（按当前编辑模块动态推荐任务）、校对检查侧边标记（红/橙竖线）、飞书风格批注、浮动工具栏（精简5项+批注）、自动保存指示器、Word导入导出、Toast提示替代alert |
| 文书审核 | `/doc-review` | 🔲 基础版 | 待后续优化 |

## 技术栈

- Vue 3 + Vite + Vue Router + TypeScript
- Tiptap（富文本编辑器）
- mammoth（Word 导入解析）+ docx（Word 导出生成）
- 纯 CSS 设计系统（design-tokens + workbench + arbitration-kit）
- 无 UI 框架依赖（非 Element Plus）

## 本地启动

```bash
npm install
npm run dev
# 默认访问 http://localhost:5173/
```

## 关键目录

```text
src/
  views/
    filingReview/      # 立案审核
    dossierReading/    # 智能阅卷
    docWriter/         # 文书写作助手
      index.vue        # 主页面（三栏布局+脚注引用+Word导入导出+Toast）
      config.ts        # 模块导航、模块感知AI任务、证据材料、校对检查、批注等配置
      mock.ts          # mock 数据导出
      components/
        LeftMaterialPanel.vue     # 手风琴式证据材料面板+提交方筛选
        RightPanel.vue            # AI助手（模块感知）+校对检查+人工批注
        FloatingSelectionToolbar.vue  # 浮动工具栏（5项AI+批注）
        AiWritePopover.vue        # AI自由输入弹窗
        CandidateResultCard.vue   # AI生成结果卡片
    docReview/         # 文书审核
  components/
    editor/            # EditorArea.vue（Tiptap富文本+模块导航条+自动保存+校对侧边标记+Word按钮）
    ToastMessage.vue   # 全局Toast消息组件
  layouts/             # WorkbenchLayout.vue（工作台总布局）
  styles/
    design-tokens.css  # 设计变量
    workbench.css      # 通用组件原语
    arbitration-kit.css # 仲裁业务样式
  router/index.ts      # 路由配置
vibe-coding-starter/   # 项目上下文文档（给 AI 衔接用）
PRD/                   # 产品需求文档
```

## 当前状态

- 已完成：立案审核深度优化、智能阅卷深度优化、文书写作助手深度优化（两轮）
- 待优化：文书审核模块
- 已知问题：`npm run build` 存在历史 TS 类型问题（不影响 dev 运行）
