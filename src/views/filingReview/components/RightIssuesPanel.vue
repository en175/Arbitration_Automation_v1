<template>
  <div class="right-panel">
    <div class="panel-header">审核操作</div>
    <div class="panel-content">
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <button class="wb-btn wb-btn-primary" @click="handleApprove">通过立案</button>
        <button class="wb-btn" @click="$emit('return')">退回补正</button>
        <button class="wb-btn">暂存</button>
      </div>

      <div class="panel-header" style="padding: 12px 0; border-bottom: 1px solid var(--color-divider); margin-bottom: 12px;">
        问题清单
      </div>
      <div class="summary-bar">
        <span class="summary-chip high">红 {{ severityCount.high }}</span>
        <span class="summary-chip medium">橙 {{ severityCount.medium }}</span>
        <span class="summary-chip low">蓝 {{ severityCount.low }}</span>
      </div>

      <div v-for="group in issueGroups" :key="group.id" class="group-wrap">
        <div class="group-title">{{ group.title }}</div>
        <div
          v-for="issue in group.items"
          :key="issue.id"
          class="wb-card issue-card"
          :class="issue.severity"
          @click="emit('locate-field', issue.fieldKey)"
        >
          <div class="issue-head">
            <span>{{ severityLabelMap[issue.severity] }}</span>
            <span class="locate-tip">定位字段</span>
          </div>
          <div class="issue-desc">
            {{ issue.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FilingIssueGroup } from '../config';

const props = defineProps<{
  issueGroups: FilingIssueGroup[];
}>();

const emit = defineEmits<{
  (event: 'locate-field', fieldKey: string): void;
  (event: 'return'): void;
}>();

const severityLabelMap: Record<string, string> = {
  high: '红色优先',
  medium: '橙色关注',
  low: '蓝色提醒'
};

const severityCount = computed(() => {
  const count = { high: 0, medium: 0, low: 0 };
  props.issueGroups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.severity === 'high') count.high += 1;
      if (item.severity === 'medium') count.medium += 1;
      if (item.severity === 'low') count.low += 1;
    });
  });
  return count;
});

const handleApprove = () => {
  alert('通过立案操作已提交');
};
</script>

<style scoped>
.summary-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.summary-chip {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
}
.summary-chip.high {
  color: #c93f3f;
  background: #fff1f1;
  border-color: #ffd4d4;
}
.summary-chip.medium {
  color: #bc7710;
  background: #fff7ea;
  border-color: #ffe1bb;
}
.summary-chip.low {
  color: #2f5cf5;
  background: #edf3ff;
  border-color: #d4e0ff;
}
.group-wrap {
  margin-bottom: 14px;
}
.group-title {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 8px;
}
.issue-card {
  padding: 12px;
  margin-bottom: 8px;
  border-left: 4px solid #f59e0b;
  cursor: pointer;
}
.issue-card.high {
  border-left-color: #ef4444;
}
.issue-card.medium {
  border-left-color: #f59e0b;
}
.issue-card.low {
  border-left-color: #3b82f6;
}
.issue-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-body);
}
.locate-tip {
  color: var(--color-primary);
}
.issue-desc {
  font-size: 12px;
  color: var(--color-text-body);
  line-height: 1.5;
}
</style>
