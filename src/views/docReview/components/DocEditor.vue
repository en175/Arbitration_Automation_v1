<template>
  <div class="middle-panel" style="background: #F2F3F5; overflow: hidden; display: flex; flex-direction: column;">
    <TimelineBar />
    
    <div style="padding: 12px 24px; border-bottom: 1px solid var(--color-divider); background: #fff; display: flex; justify-content: flex-end;">
       <button class="wb-btn wb-btn-primary" style="font-size: 13px;">✨ 智能校对</button>
    </div>

    <!-- 包装 EditorArea，添加额外 padding 等适配 DocReview 布局 -->
    <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
      <EditorArea 
        ref="editorRef"
        :modelValue="modelValue" 
        @update:modelValue="$emit('update:modelValue', $event)" 
        :editable="false" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TimelineBar from './TimelineBar.vue';
import EditorArea from '@/components/editor/EditorArea.vue';

defineProps({
  modelValue: String
});

defineEmits(['update:modelValue']);

const editorRef = ref(null);

const scrollToParagraph = (id) => {
  if (editorRef.value) {
    editorRef.value.scrollToParagraph(id);
  }
};

const highlightParagraph = (id) => {
  if (editorRef.value) {
    editorRef.value.highlightParagraph(id);
  }
};

defineExpose({
  scrollToParagraph,
  highlightParagraph
});
</script>
