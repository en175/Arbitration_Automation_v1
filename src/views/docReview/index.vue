<template>
  <div class="three-column-layout">
    <LeftCasePanel :summary="summary" :materials="materials" />
    <DocEditor ref="editorRef" v-model="content" />
    <RightAiAnalysis :results="analysisResults" @locate="handleLocate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LeftCasePanel from './components/LeftCasePanel.vue';
import DocEditor from './components/DocEditor.vue';
import RightAiAnalysis from './components/RightAiAnalysis.vue';

import { mockCaseSummary, mockMaterials, mockAnalysisResults } from './mock';

const summary = mockCaseSummary;
const materials = mockMaterials;
const analysisResults = mockAnalysisResults;

const editorRef = ref(null);
const content = ref(`
  <h1 style="text-align: center">仲裁裁决书</h1>
  <p data-paragraph-id="p1">本案现已审理终结。仲裁庭现对本案的事实认定及裁决意见陈述如下：</p>
  <p data-paragraph-id="fact">关于货款金额的认定，仲裁庭核对了申请人提交的《购销合同》及《发货单》。虽然被申请人主张货物存在质量瑕疵，但并未在合同约定的验收期内提出异议。</p>
  <p data-paragraph-id="p3">综上，仲裁庭对申请人主张的货款 1,200,000.00 元予以支持。</p>
  <p data-paragraph-id="discretion">关于违约金的调整，被申请人提出的标准调整请求，仲裁庭经查明合同约定的标准（日万分之五）符合行业惯例，且被申请人违约行为显著。</p>
  <p data-paragraph-id="logic">综上所述，申请人的仲裁请求具有事实和法律依据，本庭予以支持。</p>
`);

const handleLocate = (key) => {
  // key 对应 mockAnalysisResults 中的 metric，如 'logic', 'fact'
  // 我们假设段落ID与这些key有对应关系，或者通过映射
  // 简单起见，mock数据里的段落ID直接使用了这些key
  if (editorRef.value) {
    editorRef.value.scrollToParagraph(key);
  }
};
</script>
