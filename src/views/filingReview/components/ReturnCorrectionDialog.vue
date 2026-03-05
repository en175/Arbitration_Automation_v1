<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="wb-card" style="width: 400px; padding: 24px;">
      <h3 class="text-title" style="margin-top: 0; margin-bottom: 16px;">退回补正意见</h3>
      <textarea 
        v-model="comment"
        class="wb-input" 
        rows="4" 
        placeholder="请输入需要补正的具体内容..." 
        style="resize: vertical; margin-bottom: 24px;"
      ></textarea>
      
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="wb-btn" @click="$emit('update:visible', false)">取消</button>
        <button class="wb-btn wb-btn-primary" @click="handleSubmit">提交</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(['update:visible', 'submit']);
const comment = ref('');

const handleSubmit = () => {
  emit('submit', comment.value);
  comment.value = '';
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
