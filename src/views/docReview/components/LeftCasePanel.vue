<template>
  <div class="left-panel">
    <div class="panel-header">案件概览</div>
    <div class="panel-content" style="padding: 16px;">
      <div class="wb-card" style="padding: 16px; margin-bottom: 20px; background: #F7F8FA;">
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 8px;">{{ summary.caseNo }}</div>
        <div style="font-size: 12px; color: var(--color-text-sub); margin-bottom: 4px;">{{ summary.parties }}</div>
        <div style="font-size: 12px; color: var(--color-text-sub);">秘书：{{ summary.secretary }} | 庭审：{{ summary.hearingDate }}</div>
      </div>

      <div style="margin-bottom: 12px; font-weight: 600; font-size: 14px;">案件材料</div>
      <ul class="wb-list">
        <li v-for="item in materials" :key="item.id" class="wb-list-item" style="padding: 8px 0; border: none;">
          <div style="display: flex; justify-content: space-between; font-size: 13px;">
            <span>{{ item.title }}</span>
            <span style="color: var(--color-text-sub);">{{ item.page }}页</span>
          </div>
        </li>
      </ul>

      <div style="margin-top: 24px; border-top: 1px solid var(--color-divider); padding-top: 16px;">
        <div class="wb-btn" style="width: 100%; justify-content: flex-start; margin-bottom: 8px; gap: 8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          庭审核心诉求认定
        </div>
        <div class="wb-btn" style="width: 100%; justify-content: flex-start; gap: 8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          无争议事实认定
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  summary: Object,
  materials: Array
});
</script>
