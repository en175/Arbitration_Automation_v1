# 仲裁智能化项目 v1

本项目是“仲裁智能辅助办案”前端工作台原型，聚焦四个高频业务场景：

- 智能阅卷
- 立案审核
- 文书写作助手
- 文书审核

目标是让页面同时满足三类诉求：售前可演示、研发可落地、交互可持续迭代。

## 技术栈

- Vue 3
- Vite
- Vue Router
- TypeScript（项目中 TS/JS 混合）
- Tiptap（富文本编辑）

## 本地运行

```bash
npm install
npm run dev
```

构建命令：

```bash
npm run build
```

## 路由入口

- `/dossier-reading` 智能阅卷
- `/filing-review` 立案审核
- `/doc-writer` 文书写作助手
- `/doc-review` 文书审核

## 目录结构

```text
src/
  layouts/
    WorkbenchLayout.vue
  styles/
    design-tokens.css
    workbench.css
    arbitration-kit.css
  views/
    dossierReading/
      index.vue
      config.ts
      mock.ts
      components/
    filingReview/
      index.vue
      config.ts
      mock.ts
      components/
    docWriter/
      index.vue
      config.ts
      mock.ts
      components/
    docReview/
      index.vue
      config.ts
      mock.ts
      components/
```

## 当前实现进度（按模块）

### 1) 智能阅卷

- 已实现三大视图：案卷概览、请求-要件-事实-证据、抗辩对抗
- 已支持对抗观点点击定位正文片段（mock 级联动）
- 已补充高密度演示数据（风险、待确认、原文锚点）

### 2) 立案审核

- 已实现三栏工作台：材料清单 / 信息核验 / 问题清单+操作区
- 已实现四类问题分组：材料缺失、信息不一致、主体异常、金额/请求异常
- 已实现右侧问题点击定位中间字段高亮
- 已升级基础信息为“真实场景高密度字段”，覆盖：
  - 案件基础
  - 主体资格
  - 仲裁条款
  - 请求事项
  - 关键日期
  - 送达信息
- 已引入字段核验状态（通过/关注/缺失）与来源说明（mock）
- 已实现红橙蓝问题池计数概览与联动定位

### 3) 文书写作助手

- 已实现左材料 / 中编辑器 / 右侧多标签页布局
- 已集成 Tiptap 编辑器与基础工具栏
- 已实现选中文本后的 AI 操作流（mock 候选结果）
- 已实现校对分组、人工批注筛选与段落定位

### 4) 文书审核

- 已完成工作台基础布局与模块化骨架
- 已具备中区文书编辑、右侧分析面板、左侧材料导航基础能力（持续增强中）

## 全局视觉系统

已建立工作台风格样式分层：

- `design-tokens.css`：设计令牌（色彩、圆角、阴影、布局变量）
- `workbench.css`：通用组件原语（卡片、按钮、输入、tab、面板、三栏布局）
- `arbitration-kit.css`：偏业务化可复用样式（筛选条、表格壳、抽屉头、分区卡）

## 售前文档映射

产品方案文件：

- `仲裁智能辅助办案产品方案.pdf`

已完成的映射重点（第一批）：

- 立案审核“效率提速”主线
- 关键信息核对（主体+金额+日期）
- 问题集中归纳（红橙蓝分级）
- 材料完整性辅助检查

## 已知问题（当前基线）

`npm run build` 当前存在历史 TS 基线问题（非本轮 UI 改造引入）：

- `.vue` 类型声明缺失（多处）
- `EditorArea.vue` 里存在旧的 TS 类型报错

建议后续单独开一个“工程化修复”任务处理，不与业务演示迭代混做。

## 下一步建议

1. 立案审核增加“审核驾驶舱条”（规则命中、处理路径、风险摘要）
2. 补正意见草稿区升级为更强编辑体验与模板化输出
3. 文书审核模块补齐 AI 分析维度打分与定位联动闭环
4. 统一补齐 `.vue` 类型声明与 TS 构建基线
