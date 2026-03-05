<template>
  <div class="right-panel">
    <div class="panel-header">辅助提示</div>
    <div class="panel-content">
      <div v-for="item in items" :key="item.id" class="wb-card" style="padding: 12px; margin-bottom: 12px; cursor: pointer;">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span v-if="item.type === 'ref'" class="wb-badge wb-badge-info">原文定位</span>
          <span v-if="item.type === 'hint'" class="wb-badge wb-badge-warning">关键提示</span>
          <span v-if="item.type === 'quote'" class="wb-badge wb-badge-success">引用片段</span>
        </div>
        <div style="margin-top: 8px; font-size: 13px; color: var(--color-text-body); line-height: 1.5;">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array
});
</script>
