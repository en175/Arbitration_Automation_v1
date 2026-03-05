<template>
  <div class="right-panel">
    <div class="panel-header">AI 智能分析</div>
    <div class="panel-content">
      <div v-for="(item, idx) in results" :key="idx" class="wb-card" style="padding: 16px; margin-bottom: 16px; border: 1px solid transparent; cursor: pointer; transition: all 0.2s;" @click="$emit('locate', item.metric)">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px; display: flex;" v-html="getIcon(item.metric)"></span>
            {{ getLabel(item.metric) }}
          </div>
          <div :style="{ color: item.score >= 90 ? 'var(--color-success)' : '#FF7D00', fontWeight: 'bold' }">
            {{ item.score }}分
          </div>
        </div>
        
        <div style="font-size: 13px; color: var(--color-text-body); line-height: 1.5; margin-bottom: 8px;">
          {{ item.desc }}
        </div>

        <div style="display: flex; gap: 4px;">
          <span class="wb-badge" :class="item.status === 'success' ? 'wb-badge-success' : 'wb-badge-warning'">
            {{ item.status === 'success' ? '符合' : '需关注' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ANALYSIS_METRICS } from '../config';

defineProps({
  results: Array
});

const getLabel = (key) => ANALYSIS_METRICS.find(m => m.key === key)?.label || key;
const getIcon = (key) => ANALYSIS_METRICS.find(m => m.key === key)?.icon || '📄';
</script>

<style scoped>
.wb-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-base);
}
</style>
