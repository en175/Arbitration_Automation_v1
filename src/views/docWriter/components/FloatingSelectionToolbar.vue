<template>
  <div 
    v-if="visible"
    class="floating-toolbar" 
    :style="{ top: `${position.top}px`, left: `${position.left}px` }"
    @mousedown.stop
  >
    <div 
      v-for="action in filteredActions" 
      :key="action.key"
      class="toolbar-item" 
      :style="{ '--hover-color': action.color }"
      @click="handleClick(action)"
    >
      <span class="icon" v-html="action.icon" :style="{ color: action.color }"></span>
      <span>{{ action.label }}</span>
    </div>
    <div class="divider"></div>
    <div class="toolbar-item comment-btn" @click="$emit('add-comment')">
      <span class="icon" style="color: #F59E0B;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </span>
      <span>批注</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { AI_ACTIONS } from '../config';

defineProps({
  visible: Boolean,
  position: {
    type: Object,
    default: () => ({ top: 0, left: 0 })
  }
});

const emit = defineEmits(['action', 'add-comment']);

const filteredActions = computed(() =>
  AI_ACTIONS.filter(a => !['translate', 'check'].includes(a.key))
);

const handleClick = (action) => {
  emit('action', action);
};
</script>

<style scoped>
.floating-toolbar {
  position: fixed;
  z-index: 1000;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 4px;
  border: 1px solid var(--color-border);
  animation: fadeIn 0.2s ease-out;
}

.toolbar-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-body);
  transition: all 0.2s;
  height: 32px;
  line-height: 1;
}
.toolbar-item:hover {
  background: var(--color-bg-body);
  color: var(--hover-color);
}
.toolbar-item:active {
  transform: translateY(1px);
}

.comment-btn:hover {
  background: #FFFBEB;
  color: #F59E0B;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.divider {
  width: 1px;
  height: 20px;
  background: var(--color-divider);
  margin: 0 4px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
