<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="visible" class="toast-container" :class="type">
        <span class="toast-icon" v-if="type === 'success'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="toast-icon" v-else-if="type === 'error'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </span>
        <span class="toast-icon" v-else>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </span>
        <span class="toast-text">{{ message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  show: boolean;
}>();

const emit = defineEmits<{ (e: 'update:show', v: boolean): void }>();

const visible = ref(false);
let timer: ReturnType<typeof setTimeout>;

watch(() => props.show, (val) => {
  if (val) {
    visible.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      visible.value = false;
      emit('update:show', false);
    }, props.duration || 2500);
  } else {
    visible.value = false;
  }
}, { immediate: true });
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  pointer-events: auto;
}
.toast-container.success {
  background: #ecfdf5;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
.toast-container.error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
.toast-container.warning {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}
.toast-container.info {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
.toast-icon {
  display: flex;
  align-items: center;
}
.toast-slide-enter-active { animation: toastIn 0.25s ease-out; }
.toast-slide-leave-active { animation: toastOut 0.2s ease-in; }
@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to { opacity: 0; transform: translateX(-50%) translateY(-12px); }
}
</style>
