<template>
  <div class="right-panel">
    <div class="wb-tabs" role="tablist">
      <div 
        v-for="tab in tabs" 
        :key="tab.key" 
        class="wb-tab-item" 
        :class="{ active: currentTab === tab.key }"
        role="tab"
        :aria-selected="currentTab === tab.key"
        :tabindex="currentTab === tab.key ? 0 : -1"
        @click="currentTab = tab.key"
      >{{ tab.label }}</div>
    </div>
    
    <div class="panel-content">
      <!-- AI 写作助手 -->
      <div v-if="currentTab === 'ai'" style="display: flex; flex-direction: column; height: 100%;">
        <!-- 当前编辑模块提示 -->
        <div v-if="currentSectionLabel" class="section-context-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          当前编辑：<strong>{{ currentSectionLabel }}</strong>
        </div>

        <div class="preset-area">
          <div class="preset-title">
            {{ sectionPresets.length > 0 ? '推荐任务' : '快捷任务' }}
          </div>
          <div class="preset-grid">
            <button
              v-for="item in displayPresets"
              :key="item.key"
              type="button"
              class="preset-card"
              :class="{ active: activePresetKey === item.key, recommended: sectionPresetKeys.has(item.key) }"
              @click="activePresetKey = item.key"
            >
              <div class="preset-label">
                {{ item.label }}
                <span v-if="sectionPresetKeys.has(item.key)" class="rec-dot"></span>
              </div>
              <div class="preset-desc">{{ item.desc }}</div>
            </button>
          </div>
          <div v-if="currentPresetOptions.length > 0" class="option-row">
            <button
              v-for="option in currentPresetOptions"
              :key="option.key"
              type="button"
              class="option-chip"
              @click="emit('ai-preset-select', { actionKey: activePresetKey, optionKey: option.key, actionLabel: activePresetLabel, optionLabel: option.label })"
            >{{ option.label }}</button>
          </div>
          <div v-else-if="activePresetKey" class="option-row">
            <button type="button" class="option-chip primary-chip" @click="emit('ai-preset-select', { actionKey: activePresetKey, optionKey: '_default', actionLabel: activePresetLabel, optionLabel: '执行' })">
              执行此任务
            </button>
          </div>
        </div>

        <div style="flex: 1; overflow-y: auto; padding-bottom: 12px;">
          <div v-for="msg in aiMsgs" :key="msg.id" style="margin-bottom: 12px; display: flex;" :style="{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }">
            <div 
              style="max-width: 85%; padding: 8px 12px; border-radius: 8px; font-size: 13px; line-height: 1.6;"
              :style="{ 
                background: msg.role === 'user' ? 'var(--color-primary)' : '#F2F3F5',
                color: msg.role === 'user' ? '#fff' : 'var(--color-text-body)'
              }"
            >{{ msg.content }}</div>
          </div>
        </div>
      </div>

      <!-- 校对检查 -->
      <div v-if="currentTab === 'check'">
        <div v-for="group in checkGroups" :key="group.id" style="margin-bottom: 12px;">
          <div class="group-title">{{ group.title }}</div>
          <div
            v-for="issue in group.items"
            :key="issue.id"
            class="wb-card check-card"
            :class="{ 'severity-error': issue.severity === 'error' }"
            @click="emit('locate-paragraph', issue.paragraphId)"
          >
            <div class="check-head">
              <span class="check-type">
                <span class="severity-dot" :class="issue.severity || 'warning'"></span>
                {{ checkTypeText(issue.type) }}
              </span>
              <span v-if="issue.paragraphLabel" class="check-anchor">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                {{ issue.paragraphLabel }}
              </span>
            </div>
            <div style="font-size: 13px;">{{ issue.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 人工批注 -->
      <div v-if="currentTab === 'comment'">
        <div class="comment-filter">
          <button
            v-for="item in commentFilters"
            :key="item.key"
            type="button"
            class="filter-chip"
            :class="{ active: commentFilter === item.key }"
            @click="commentFilter = item.key"
          >{{ item.label }}</button>
        </div>

        <div v-if="filteredComments.length === 0" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <div style="margin-top: 8px;">选中正文文字，点击工具栏「批注」添加</div>
        </div>

        <div
          v-for="comment in filteredComments"
          :key="comment.id"
          class="comment-card"
          :class="{ active: activeCommentId === comment.id, editing: editingCommentId === comment.id }"
          @click="handleCommentClick(comment)"
        >
          <div v-if="comment.selectedText" class="comment-quote">
            <div class="quote-bar"></div>
            <div class="quote-text">{{ comment.selectedText }}</div>
          </div>

          <div v-if="editingCommentId === comment.id" class="comment-edit-area">
            <textarea
              ref="editTextareaRef"
              v-model="editingContent"
              class="comment-edit-input"
              placeholder="输入批注内容..."
              rows="3"
              @keydown.enter.meta="saveEdit(comment)"
              @keydown.enter.ctrl="saveEdit(comment)"
            />
            <div class="edit-actions">
              <button class="edit-btn cancel" @click.stop="cancelEdit">取消</button>
              <button class="edit-btn save" @click.stop="saveEdit(comment)">保存</button>
            </div>
          </div>

          <div v-else>
            <div class="comment-body">{{ comment.content || '暂无批注内容' }}</div>
            <div class="comment-meta-row">
              <span class="meta-left">
                <span v-if="comment.author" class="meta-author">{{ comment.author }}</span>
                <span v-if="comment.createdAt" class="meta-time">{{ comment.createdAt }}</span>
              </span>
              <span class="meta-right">
                <span class="comment-status-dot" :class="comment.status"></span>
                <span class="comment-status-text" :class="comment.status">{{ comment.status === 'pending' ? '待处理' : '已解决' }}</span>
              </span>
            </div>
          </div>

          <div v-if="editingCommentId !== comment.id" class="comment-action-bar">
            <button class="action-icon-btn" title="编辑" @click.stop="startEdit(comment)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
            </button>
            <button v-if="comment.status === 'pending'" class="action-icon-btn resolve-btn" title="标记已解决" @click.stop="resolveComment(comment)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            <button class="action-icon-btn delete-btn" title="删除" @click.stop="deleteComment(comment)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';
import { COMMENT_FILTERS, WRITER_TABS, DOC_SECTIONS, SECTION_AI_PRESETS, SECTION_AI_OPTIONS, AI_COMMON_ACTIONS, AI_PRESET_OPTIONS } from '../config';

interface CommentItem {
  id: string;
  title: string;
  content: string;
  status: string;
  paragraphId: string;
  author?: string;
  createdAt?: string;
  selectedText?: string;
}

interface CheckItem {
  id: string;
  type: string;
  desc: string;
  paragraphId: string;
  paragraphLabel?: string;
  severity?: string;
}

const props = defineProps<{
  aiMsgs: Array<{ id: string; role: string; content: string }>;
  checkGroups: Array<{ id: string; title: string; items: CheckItem[] }>;
  comments: CommentItem[];
  currentSection?: string;
}>();

const emit = defineEmits<{
  (event: 'locate-paragraph', paragraphId: string): void;
  (event: 'ai-preset-select', payload: { actionKey: string; optionKey: string; actionLabel: string; optionLabel: string }): void;
  (event: 'update-comment', comment: CommentItem): void;
  (event: 'delete-comment', commentId: string): void;
}>();

const currentTab = ref('ai');
const tabs = WRITER_TABS;
const commentFilters = COMMENT_FILTERS;
const commentFilter = ref('all');
const activeCommentId = ref('');

/* 模块感知 */
const currentSectionLabel = computed(() => {
  if (!props.currentSection) return '';
  const sec = DOC_SECTIONS.find(s => s.key === props.currentSection);
  return sec ? sec.label : '';
});

const sectionPresets = computed(() => {
  if (!props.currentSection) return [];
  return SECTION_AI_PRESETS[props.currentSection] || [];
});

const sectionPresetKeys = computed(() => new Set(sectionPresets.value.map(p => p.key)));

const displayPresets = computed(() => {
  if (sectionPresets.value.length > 0) {
    const sectionKeys = new Set(sectionPresets.value.map(p => p.key));
    const common = AI_COMMON_ACTIONS.filter(a => !sectionKeys.has(a.key));
    return [...sectionPresets.value, ...common];
  }
  return AI_COMMON_ACTIONS;
});

const activePresetKey = ref(displayPresets.value[0]?.key || 'focus');

watch(displayPresets, (presets) => {
  if (presets.length > 0 && !presets.find(p => p.key === activePresetKey.value)) {
    activePresetKey.value = presets[0].key;
  }
});

const currentPresetOptions = computed(() => {
  const section = props.currentSection || '';
  const sectionOpts = SECTION_AI_OPTIONS[section];
  if (sectionOpts && sectionOpts[activePresetKey.value]) {
    return sectionOpts[activePresetKey.value];
  }
  return AI_PRESET_OPTIONS[activePresetKey.value] || [];
});

const activePresetLabel = computed(() => {
  const item = displayPresets.value.find(p => p.key === activePresetKey.value);
  return item ? item.label : '快捷任务';
});

const checkTypeText = (value: string) => {
  if (value === 'format') return '格式';
  if (value === 'logic') return '逻辑';
  if (value === 'evidence') return '证据';
  return '审查项';
};

const filteredComments = computed(() => {
  if (commentFilter.value === 'all') return props.comments;
  return props.comments.filter(item => item.status === commentFilter.value);
});

const editingCommentId = ref('');
const editingContent = ref('');
const editTextareaRef = ref<HTMLTextAreaElement[] | null>(null);

const handleCommentClick = (comment: CommentItem) => {
  activeCommentId.value = comment.id;
  if (comment.paragraphId) emit('locate-paragraph', comment.paragraphId);
};

const startEdit = (comment: CommentItem) => {
  editingCommentId.value = comment.id;
  editingContent.value = comment.content;
  nextTick(() => {
    if (editTextareaRef.value && editTextareaRef.value[0]) editTextareaRef.value[0].focus();
  });
};

const cancelEdit = () => { editingCommentId.value = ''; };

const saveEdit = (comment: CommentItem) => {
  emit('update-comment', { ...comment, content: editingContent.value });
  editingCommentId.value = '';
};

const resolveComment = (comment: CommentItem) => {
  emit('update-comment', { ...comment, status: 'resolved' });
};

const deleteComment = (comment: CommentItem) => {
  emit('delete-comment', comment.id);
};

const switchToCommentAndEdit = (commentId: string) => {
  currentTab.value = 'comment';
  editingCommentId.value = commentId;
  const target = props.comments.find(c => c.id === commentId);
  editingContent.value = target?.content || '';
  activeCommentId.value = commentId;
  nextTick(() => {
    if (editTextareaRef.value && editTextareaRef.value[0]) editTextareaRef.value[0].focus();
  });
};

defineExpose({ switchToCommentAndEdit });
</script>

<style scoped>
.section-context-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
  background: #f0f4ff;
  border-radius: 8px;
  font-size: 12px;
  color: var(--color-primary);
  border: 1px solid #d5def8;
}
.section-context-bar strong {
  font-weight: 600;
}

.group-title {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 8px;
}
.preset-area {
  border: 1px solid var(--color-divider);
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
.preset-title {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 8px;
}
.preset-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.preset-card {
  text-align: left;
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.15s;
}
.preset-card.active {
  border-color: #b9ccff;
  background: #f5f8ff;
}
.preset-card.recommended {
  border-color: #93c5fd;
}
.preset-label {
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}
.rec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}
.preset-desc {
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-text-sub);
}
.option-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.option-chip {
  border: 1px solid #d5def8;
  background: #f8faff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.option-chip:hover {
  border-color: #b9ccff;
  background: #eef3ff;
}
.primary-chip {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.primary-chip:hover {
  opacity: 0.9;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

/* Check cards */
.check-card {
  padding: 12px;
  margin-bottom: 8px;
  border-left: 4px solid var(--color-warning);
  cursor: pointer;
  transition: background 0.15s;
}
.check-card.severity-error {
  border-left-color: #EF4444;
}
.check-card:hover {
  background: #fafbff;
}
.check-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.check-type {
  font-size: 12px;
  color: var(--color-text-sub);
  display: flex;
  align-items: center;
  gap: 4px;
}
.severity-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.severity-dot.error { background: #EF4444; }
.severity-dot.warning { background: #F59E0B; }
.check-anchor {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: var(--color-primary);
  cursor: pointer;
}
.check-anchor:hover {
  text-decoration: underline;
}

/* Comment tab */
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
.empty-state {
  text-align: center;
  color: var(--color-text-sub);
  margin-top: 48px;
  font-size: 13px;
}

/* Comment card */
.comment-card {
  position: relative;
  border: 1px solid var(--color-divider);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: #fff;
}
.comment-card:hover {
  border-color: #c7d2fe;
  background: #fafbff;
}
.comment-card.active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}
.comment-card.editing {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}
.comment-quote {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-divider);
}
.quote-bar {
  width: 3px;
  min-height: 16px;
  background: #F59E0B;
  border-radius: 2px;
  flex-shrink: 0;
}
.quote-text {
  font-size: 12px;
  color: var(--color-text-sub);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.comment-body {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-body);
}
.comment-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.meta-left {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-sub);
}
.meta-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.comment-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.comment-status-dot.pending { background: #F59E0B; }
.comment-status-dot.resolved { background: #10B981; }
.comment-status-text { font-size: 11px; }
.comment-status-text.pending { color: #b45309; }
.comment-status-text.resolved { color: #15803d; }

.comment-edit-area { margin-top: 4px; }
.comment-edit-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 13px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.5;
  background: #fafbff;
}
.comment-edit-input:focus {
  border-color: var(--color-primary);
  background: #fff;
}
.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
}
.edit-btn {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--color-border);
  background: #fff;
  color: var(--color-text-body);
}
.edit-btn.save {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.edit-btn.cancel:hover { background: #f5f5f5; }
.edit-btn.save:hover { opacity: 0.9; }

.comment-action-bar {
  position: absolute;
  top: 8px;
  right: 8px;
  display: none;
  gap: 2px;
  background: #fff;
  border: 1px solid var(--color-divider);
  border-radius: 6px;
  padding: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.comment-card:hover .comment-action-bar { display: flex; }
.action-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-sub);
  transition: all 0.15s;
}
.action-icon-btn:hover { background: #f0f4ff; color: var(--color-primary); }
.action-icon-btn.delete-btn:hover { background: #fef2f2; color: #EF4444; }
.action-icon-btn.resolve-btn:hover { background: #ecfdf5; color: #10B981; }
</style>
