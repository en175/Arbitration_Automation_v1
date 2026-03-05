<template>
  <div class="right-panel">
    <div class="wb-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key" 
        class="wb-tab-item" 
        :class="{ active: currentTab === tab.key }"
        @click="currentTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>
    
    <div class="panel-content">
      <div v-if="currentTab === 'ai'" style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1; overflow-y: auto; padding-bottom: 12px;">
          <div v-for="msg in aiMsgs" :key="msg.id" style="margin-bottom: 12px; display: flex;" :style="{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }">
            <div 
              style="max-width: 80%; padding: 8px 12px; border-radius: 8px; font-size: 13px; line-height: 1.5;"
              :style="{ 
                background: msg.role === 'user' ? 'var(--color-primary)' : '#F2F3F5',
                color: msg.role === 'user' ? '#fff' : 'var(--color-text-body)'
              }"
            >
              {{ msg.content }}
            </div>
          </div>
        </div>
        <div style="margin-top: auto; border-top: 1px solid var(--color-divider); padding-top: 12px;">
          <textarea class="wb-input" rows="3" placeholder="输入指令..."></textarea>
          <button class="wb-btn wb-btn-primary" style="width: 100%; margin-top: 8px;">发送</button>
        </div>
      </div>

      <div v-if="currentTab === 'check'">
        <div v-for="group in checkGroups" :key="group.id" style="margin-bottom: 12px;">
          <div class="group-title">{{ group.title }}</div>
          <div
            v-for="issue in group.items"
            :key="issue.id"
            class="wb-card check-card"
            @click="emit('locate-paragraph', issue.paragraphId)"
          >
            <div class="check-type">{{ issue.type }}</div>
            <div style="font-size: 13px;">{{ issue.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'comment'">
        <div class="comment-filter">
          <button
            v-for="item in commentFilters"
            :key="item.key"
            type="button"
            class="filter-chip"
            :class="{ active: commentFilter === item.key }"
            @click="commentFilter = item.key"
          >
            {{ item.label }}
          </button>
        </div>
        <div v-if="filteredComments.length === 0" style="text-align: center; color: var(--color-text-sub); margin-top: 40px;">
          当前筛选暂无批注
        </div>
        <div
          v-for="comment in filteredComments"
          :key="comment.id"
          class="wb-card comment-card"
          @click="emit('locate-paragraph', comment.paragraphId)"
        >
          <div class="comment-head">
            <span class="comment-title">{{ comment.title }}</span>
            <span class="comment-status" :class="comment.status">{{ comment.status === 'pending' ? '待处理' : '已处理' }}</span>
          </div>
          <div class="comment-body">{{ comment.content }}</div>
          <div class="comment-foot">定位段落：{{ comment.paragraphId }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { COMMENT_FILTERS, WRITER_TABS } from '../config';

const props = defineProps<{
  aiMsgs: Array<{ id: string; role: string; content: string }>;
  checkGroups: Array<{ id: string; title: string; items: Array<{ id: string; type: string; desc: string; paragraphId: string }> }>;
  comments: Array<{ id: string; title: string; content: string; status: string; type: string; paragraphId: string }>;
}>();

const emit = defineEmits<{
  (event: 'locate-paragraph', paragraphId: string): void;
}>();

const currentTab = ref('ai');
const tabs = WRITER_TABS;
const commentFilters = COMMENT_FILTERS;
const commentFilter = ref('all');

const filteredComments = computed(() => {
  if (commentFilter.value === 'all') {
    return props.comments;
  }
  return props.comments.filter((item) => item.status === commentFilter.value || item.type === commentFilter.value);
});
</script>

<style scoped>
.group-title {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 8px;
}
.check-card {
  padding: 12px;
  margin-bottom: 8px;
  border-left: 4px solid var(--color-warning);
  cursor: pointer;
}
.check-type {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 4px;
}
.comment-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.filter-chip {
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}
.filter-chip.active {
  border-color: #bfdbfe;
  color: var(--color-primary);
  background: #eff6ff;
}
.comment-card {
  padding: 12px;
  margin-bottom: 10px;
  cursor: pointer;
}
.comment-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}
.comment-title {
  font-size: 13px;
  font-weight: 600;
}
.comment-status {
  font-size: 12px;
}
.comment-status.pending {
  color: #b45309;
}
.comment-status.resolved {
  color: #15803d;
}
.comment-body {
  font-size: 13px;
  line-height: 1.5;
}
.comment-foot {
  margin-top: 8px;
  color: var(--color-text-sub);
  font-size: 12px;
}
</style>
