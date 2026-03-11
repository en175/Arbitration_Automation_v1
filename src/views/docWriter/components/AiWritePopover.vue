<template>
  <div 
    v-if="visible"
    class="ai-popover"
    :style="{ top: `${position.top}px`, left: `${position.left}px` }"
    @mousedown.stop
  >
    <!-- Header Input -->
    <div class="popover-header">
      <div class="input-wrapper">
        <span class="prefix-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
        </span>
        <input 
          v-model="inputValue"
          type="text" 
          class="ai-input" 
          placeholder="告诉 AI 下一步应该如何？比如：帮我扩展这段论述"
          @keydown.enter="handleSend"
        />
        <button class="send-btn" @click="handleSend" :disabled="!inputValue">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

    <div class="popover-body">
      <div class="hint-text">提示：您可以在上面输入文字或者选择下方的操作</div>
      
      <div class="action-list">
        <div 
          v-for="action in actions" 
          :key="action.key"
          class="action-item"
          @click="handleAction(action)"
        >
          <span class="action-icon" v-html="action.icon"></span>
          <span class="action-label">{{ action.label }}</span>
          <span v-if="action.children" class="arrow-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AI_ACTIONS } from '../config';

const props = defineProps({
  visible: Boolean,
  position: {
    type: Object,
    default: () => ({ top: 0, left: 0 })
  }
});

const emit = defineEmits(['close', 'action', 'send']);

const inputValue = ref('');
const actions = AI_ACTIONS;

const handleSend = () => {
  if (!inputValue.value) return;
  emit('send', inputValue.value);
  inputValue.value = '';
};

const handleAction = (action) => {
  if (action.children) {
    // Handle submenu logic if needed, for now just emit the first child for simplicity or expand
    // Simplified: emit parent action, parent component handles specific logic
    emit('action', action);
  } else {
    emit('action', action);
  }
};
</script>

<style scoped>
.ai-popover {
  position: fixed;
  z-index: 1001;
  width: 320px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.2s ease-out;
}

.popover-header {
  padding: 12px;
  border-bottom: 1px solid var(--color-divider);
  background: var(--color-bg-body);
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 4px 8px;
  transition: border-color 0.2s;
}

.input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.prefix-icon {
  font-size: 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  color: var(--color-primary);
}

.ai-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  padding: 4px 0;
  color: var(--color-text-body);
}

.send-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
}

.send-btn:disabled {
  background: var(--color-text-disabled);
  cursor: not-allowed;
}

.popover-body {
  padding: 8px 0;
}

.hint-text {
  font-size: 12px;
  color: var(--color-text-sub);
  padding: 0 12px 8px 12px;
  border-bottom: 1px solid var(--color-divider);
}

.action-list {
  padding: 4px 0;
}

.action-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.action-item:hover {
  background: var(--color-bg-body);
}

.action-icon {
  margin-right: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: var(--color-text-sub);
}

.action-item:hover .action-icon {
  color: var(--color-primary);
}

.action-label {
  flex: 1;
  font-size: 13px;
  color: var(--color-text-body);
}

.arrow-icon {
  color: var(--color-text-sub);
  font-size: 14px;
  display: flex;
  align-items: center;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
