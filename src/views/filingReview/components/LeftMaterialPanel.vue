<template>
  <div class="left-panel">
    <div class="panel-header">材料清单</div>
    <div class="panel-content" style="padding: 0;">
      <div class="material-overview">
        <span>已收 {{ normalCount }} 项</span>
        <span>缺失 {{ missingCount }} 项</span>
        <span>必传 {{ requiredCount }} 项</span>
      </div>
      <div v-if="missingCount > 0" class="missing-alert">
        当前缺失 {{ missingCount }} 项核心材料，请优先补齐后提交立案。
      </div>
      <ul class="wb-list">
        <li v-for="item in materials" :key="item.id" class="wb-list-item">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span v-if="item.status === 'normal'" style="color: var(--color-success);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span v-else style="color: var(--color-danger);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </span>
              <span :style="{ color: item.status === 'missing' ? 'var(--color-text-disabled)' : '' }">
                {{ item.title }}
              </span>
            </div>
            <span v-if="item.required" style="font-size: 12px; color: var(--color-danger); border: 1px solid var(--color-danger); padding: 0 4px; border-radius: 4px;">必</span>
          </div>
          <div v-if="item.tip" class="material-tip">{{ item.tip }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  materials: Array<{ id: string; title: string; required: boolean; status: string; tip?: string }>;
}>();

const missingCount = computed(() => props.materials.filter((item) => item.status === 'missing').length);
const normalCount = computed(() => props.materials.filter((item) => item.status === 'normal').length);
const requiredCount = computed(() => props.materials.filter((item) => item.required).length);
</script>

<style scoped>
.material-overview {
  margin: 10px 12px 0;
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-sub);
}
.missing-alert {
  margin: 10px 12px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.5;
}
.material-tip {
  margin-top: 6px;
  margin-left: 24px;
  font-size: 12px;
  color: var(--color-text-sub);
}
</style>
