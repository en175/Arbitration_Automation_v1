<template>
  <div class="dossier-page">
    <div class="three-column-layout">
      <LeftMaterialPanel
        :materials="materials"
        :requests="requests"
        :selectedRequestId="selectedRequestId"
        :selectedMaterialId="selectedMaterialId"
        @select-request="selectedRequestId = $event"
        @select-material="selectedMaterialId = $event"
      />

      <MainTabs
        :caseSummary="caseSummary"
        :timeline="timeline"
        :currentRequest="currentRequest"
        :activeTimelineId="activeTimelineId"
        :originalAnchors="originalAnchors"
        @select-timeline="activeTimelineId = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { RequestWorkbench } from './config';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import MainTabs from './components/MainTabs.vue';
import {
  mockCaseInfo,
  mockCaseSummary,
  mockMaterials,
  mockOriginalAnchors,
  mockRequests,
  mockTimeline,
  mockWorkbench
} from './mock';

const materials = reactive(mockMaterials);
const requests = reactive(mockRequests);
const caseInfo = reactive(mockCaseInfo);
const caseSummary = reactive(mockCaseSummary);
const timeline = reactive(mockTimeline);
const workbench = reactive(mockWorkbench);
const originalAnchors = reactive(mockOriginalAnchors);

const selectedRequestId = ref(requests[0]?.id || '');
const selectedMaterialId = ref(materials[0]?.id || '');
const activeTimelineId = ref(
  timeline.find((item) => item.requestIds.includes(selectedRequestId.value))?.id || timeline[0]?.id || ''
);

const currentRequest = computed<RequestWorkbench>(() => {
  const target = workbench.find((item) => item.id === selectedRequestId.value);
  return target || workbench[0]!;
});

watch(selectedRequestId, (requestId) => {
  const currentSummary = caseSummary.find((item) => item.label === '当前主审请求');
  if (currentSummary) {
    currentSummary.value = requests.find((item) => item.id === requestId)?.requestStatement || currentSummary.value;
  }
  caseInfo.currentRequest = currentSummary?.value || caseInfo.currentRequest;
  const nextTimeline = timeline.find((item) => item.requestIds.includes(requestId));
  if (nextTimeline) {
    activeTimelineId.value = nextTimeline.id;
  }
});

onMounted(() => {
  document.title = '仲裁智能化项目 v1';
});
</script>

<style scoped>
.dossier-page {
  height: 100%;
  background: var(--color-background);
}
.three-column-layout {
  height: 100%;
  padding: var(--layout-gap);
  gap: var(--layout-gap);
}
</style>
