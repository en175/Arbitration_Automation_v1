<template>
  <div class="three-column-layout">
    <LeftMaterialPanel :materials="materials" />
    <MiddleVerifyPanel :data="verifyData" :fields="verifyFields" :fieldMeta="verifyFieldMeta" :activeFieldKey="activeFieldKey" />
    <RightIssuesPanel :issueGroups="issueGroups" @locate-field="handleLocateField" @return="showReturnDialog = true" />
    
    <ReturnCorrectionDialog 
      v-model:visible="showReturnDialog" 
      @submit="handleReturnSubmit" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import MiddleVerifyPanel from './components/MiddleVerifyPanel.vue';
import RightIssuesPanel from './components/RightIssuesPanel.vue';
import ReturnCorrectionDialog from './components/ReturnCorrectionDialog.vue';

import { VERIFY_FIELDS } from './config';
import { mockMaterials, mockVerifyData, mockIssueGroups, mockVerifyFieldMeta } from './mock';

const materials = ref(mockMaterials);
const verifyData = ref(mockVerifyData);
const verifyFieldMeta = ref(mockVerifyFieldMeta);
const issueGroups = ref(mockIssueGroups);
const verifyFields = VERIFY_FIELDS;
const activeFieldKey = ref('');
const showReturnDialog = ref(false);

const handleLocateField = (fieldKey) => {
  activeFieldKey.value = fieldKey;
};

const handleReturnSubmit = (comment) => {
  console.log('补正意见:', comment);
  alert('已退回补正');
  showReturnDialog.value = false;
};
</script>
