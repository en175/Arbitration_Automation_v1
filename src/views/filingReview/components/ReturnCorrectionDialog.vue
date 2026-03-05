<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="wb-card dialog-card">
      <h3 class="text-title" style="margin-top: 0; margin-bottom: 16px;">退回补正意见</h3>
      <div class="template-bar">
        <button class="wb-btn" @click="generateTemplate">一键生成模板</button>
        <span class="template-tip">自动填充问题分组、证据依据、修改要求与截止时间</span>
      </div>
      <textarea 
        v-model="comment"
        class="wb-input" 
        rows="10" 
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
  visible: Boolean,
  issueGroups: {
    type: Array,
    default: () => []
  },
  evidenceMap: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:visible', 'submit']);
const comment = ref('');

const handleSubmit = () => {
  emit('submit', comment.value);
  comment.value = '';
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateTemplate = () => {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);

  const sections = props.issueGroups
    .map((group, groupIndex) => {
      const issueLines = group.items
        .map((item, issueIndex) => {
          const evidence = props.evidenceMap[item.fieldKey];
          const evidenceLine = evidence
            ? `证据依据：${evidence.sourceName}（第${evidence.page}页，${evidence.anchor}）`
            : '证据依据：请补充对应材料原件或清晰扫描件';
          return `${issueIndex + 1}. ${item.desc}\n   ${evidenceLine}\n   修改要求：请核对并修正该字段，保证与证据材料一致。`;
        })
        .join('\n');
      return `${groupIndex + 1}）${group.title}\n${issueLines}`;
    })
    .join('\n\n');

  comment.value = `【补正意见模板】\n请于 ${formatDate(deadline)} 18:00 前完成以下补正并重新提交：\n\n${sections}\n\n说明：如无法在期限内补正，请提交延期说明及预计补正时间。`;
};
</script>

<style scoped>
.dialog-card {
  width: 680px;
  max-width: calc(100vw - 48px);
  padding: 24px;
}
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
.template-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.template-tip {
  color: var(--color-text-sub);
  font-size: 12px;
}
</style>
