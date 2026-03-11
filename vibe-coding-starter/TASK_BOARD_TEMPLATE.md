# 当前任务板

## 当前目标

三个核心模块（立案审核、智能阅卷、文书写作助手）已完成深度优化。文书写作助手已完成第二轮优化（模块导航、手风琴面板、脚注引用、AI模块感知、校对侧标、Word导入导出等）。下一步重点是文书审核模块优化，以及对已完成模块的持续打磨。

## 模块完成度

| 模块 | 路由 | 完成度 | 上轮主要改动 |
| --- | --- | --- | --- |
| 立案审核 | `/filing-review` | 95% | 材料清单点击预览、✅❌与必填图标换位、真实文件内容 |
| 智能阅卷 | `/dossier-reading` | 95% | 抗辩条数移入上方、角色标签精简、卷宗材料预览弹窗、查看原文真实数据 |
| 文书写作助手 | `/doc-writer` | 95% | **第二轮优化**：模块导航条（7模块横向标签+滚动跟随）、左侧手风琴式证据面板（提交方筛选+已引用标记）、脚注式证据引用（正文上标[证N]+文末注释区）、AI模块感知（当前编辑模块显示+动态推荐任务）、校对检查侧边标记（红/橙竖线）、浮动工具栏精简（去掉翻译和拼写检查）、自动保存指示器、Toast提示替代alert、Word导入导出（mammoth+docx） |
| 文书审核 | `/doc-review` | 20% | 基础骨架，待深度优化 |

## 下一轮待做任务

| ID | 任务 | 优先级 | 状态 |
| --- | --- | --- | --- |
| T1 | 文书审核模块深度优化 | P0 | 待启动 |
| T2 | 文书写作助手持续打磨（批注与选中文本位置精确关联、脚注hover预览增强） | P1 | 待继续 |
| T3 | 各模块视觉一致性走查 | P2 | 待启动 |
| T4 | 修复历史 TS 基线问题（npm run build） | P2 | 暂缓 |

## 上轮已完成任务（文书写作助手第二轮优化）

| 任务 | 涉及文件 |
| --- | --- |
| 模块导航条：7模块横向标签+点击跳转+滚动跟随高亮 | `components/editor/EditorArea.vue` |
| 左侧面板重构：手风琴式+提交方筛选+已引用标记 | `docWriter/components/LeftMaterialPanel.vue`、`config.ts` |
| 脚注式证据引用：正文上标[证N]+文末脚注区 | `docWriter/index.vue`、`EditorArea.vue` |
| AI模块感知：当前编辑模块显示+动态推荐任务 | `docWriter/components/RightPanel.vue`、`config.ts` |
| 校对检查侧边标记：段落左侧红/橙竖线 | `EditorArea.vue`、`config.ts`（severity字段） |
| 浮动工具栏精简：去掉翻译和检查拼写 | `docWriter/components/FloatingSelectionToolbar.vue`、`config.ts` |
| 自动保存指示器 | `EditorArea.vue` |
| alert全部替换为Toast | `docWriter/index.vue`、`components/ToastMessage.vue`（新增） |
| Word导入（mammoth）+导出（docx） | `docWriter/index.vue`、`EditorArea.vue` |
| config/mock数据重构 | `docWriter/config.ts`、`docWriter/mock.ts` |
| AiWritePopover占位文本更新 | `docWriter/components/AiWritePopover.vue` |

## 暂不处理

- AI 直接给出裁判结论
- 真实接口接入
- 权限和埋点系统
- 全局 TS 基线修复（不影响 dev）

## 风险

- 文书审核模块尚为基础骨架，需要尽快补齐
- mock 数据需持续保持专业自洽
- 历史 TS 类型问题仍存在，`npm run build` 不能通过
