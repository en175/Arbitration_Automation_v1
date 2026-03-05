<template>
  <div class="left-panel">
    <div class="panel-header">证据/材料引用</div>
    <div class="panel-content" style="padding: 0;">
      <ul class="wb-list">
        <li v-for="item in materials" :key="item.id" class="wb-list-item">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
            <span style="font-size: 16px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </span>
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  materials: Array
});
</script>
