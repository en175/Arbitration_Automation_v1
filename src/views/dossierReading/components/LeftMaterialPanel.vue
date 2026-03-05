<template>
  <div class="left-panel">
    <div class="panel-header">材料目录</div>
    <div class="panel-content" style="padding: 0;">
      <ul class="wb-list">
        <li v-for="item in materials" :key="item.id" class="wb-list-item">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </span>
            <div style="flex: 1;">
              <div style="font-size: 13px; font-weight: 500;">{{ item.title }}</div>
              <div style="font-size: 12px; color: var(--color-text-sub);">共 {{ item.pageCount }} 页</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  materials: {
    type: Array,
    required: true
  }
});

const { materials } = toRefs(props);
</script>
