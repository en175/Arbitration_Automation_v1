<template>
  <div class="three-column-layout">
    <LeftMaterialPanel :materials="materials" />
    <MainTabs :caseInfo="caseInfo" :claims="claims" :defense="defense" :originalAnchors="originalAnchors" />
    <RightAssistPanel :items="assistItems" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import MainTabs from './components/MainTabs.vue';
import RightAssistPanel from './components/RightAssistPanel.vue';

import { mockMaterials, mockCaseInfo, mockClaims, mockDefense, mockAssistItems, mockOriginalAnchors } from './mock';

const materials = reactive(mockMaterials);
const caseInfo = reactive(mockCaseInfo);
const claims = reactive(mockClaims);
const defense = reactive(mockDefense);
const assistItems = reactive(mockAssistItems);
const originalAnchors = reactive(mockOriginalAnchors);
</script>
