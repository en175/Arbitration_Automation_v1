<template>
  <div class="three-column-layout filing-review-page">
    <LeftMaterialPanel :materials="materials" />
    <MiddleVerifyPanel
      :data="verifyData"
      :fields="verifyFields"
      :fieldMeta="verifyFieldMeta"
      :activeFieldKey="activeFieldKey"
      :evidenceMap="evidenceAnchors"
      :ruleChecks="ruleChecks"
    />
    <RightIssuesPanel :issueGroups="issueGroups" @locate-field="handleLocateField" @return="showReturnDialog = true" />
    
    <ReturnCorrectionDialog 
      v-model:visible="showReturnDialog" 
      :issueGroups="issueGroups"
      :evidenceMap="evidenceAnchors"
      @submit="handleReturnSubmit" 
    />
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import MiddleVerifyPanel from './components/MiddleVerifyPanel.vue';
import RightIssuesPanel from './components/RightIssuesPanel.vue';
import ReturnCorrectionDialog from './components/ReturnCorrectionDialog.vue';

import { VERIFY_FIELDS } from './config';
import { mockMaterials, mockVerifyData, mockIssueGroups, mockVerifyFieldMeta, mockEvidenceAnchors, mockRuleChecks } from './mock';

const materials = ref(mockMaterials);
const verifyData = ref(mockVerifyData);
const verifyFieldMeta = ref(mockVerifyFieldMeta);
const issueGroups = ref(mockIssueGroups);
const evidenceAnchors = ref(mockEvidenceAnchors);
const ruleChecks = ref(mockRuleChecks);
const verifyFields = VERIFY_FIELDS;
const activeFieldKey = ref('');
const showReturnDialog = ref(false);

const handleLocateField = async (fieldKey) => {
  if (activeFieldKey.value === fieldKey) {
    activeFieldKey.value = '';
    await nextTick();
  }
  activeFieldKey.value = fieldKey;
};

const handleReturnSubmit = (comment) => {
  console.log('补正意见:', comment);
  alert('已退回补正');
  showReturnDialog.value = false;
};
</script>

<style scoped>
.filing-review-page :deep(.panel-header-themed) {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 62%, #2563eb 100%);
  border-bottom: 1px solid rgba(147, 197, 253, 0.35);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
}

.filing-review-page :deep(.module-title) {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.filing-review-page :deep(.module-title::before) {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #bfdbfe;
  box-shadow: 0 0 0 4px rgba(191, 219, 254, 0.2);
}
</style>
