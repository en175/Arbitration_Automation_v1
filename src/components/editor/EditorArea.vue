<template>
  <div class="editor-container">
    <!-- Toolbar -->
    <div class="editor-toolbar" v-if="editor">
      <div class="toolbar-main">
        <!-- Undo/Redo -->
        <div class="toolbar-group">
          <button class="toolbar-btn" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()" title="撤销">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          <button class="toolbar-btn" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()" title="重做">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Heading -->
        <div class="toolbar-group">
          <select class="toolbar-select" @change="setHeading($event)" :value="currentHeading">
            <option value="p">正文</option>
            <option value="1">标题 1</option>
            <option value="2">标题 2</option>
            <option value="3">标题 3</option>
          </select>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Basic Formatting -->
        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()" title="加粗">
            <span style="font-weight: bold;">B</span>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()" title="斜体">
            <span style="font-style: italic;">I</span>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()" title="下划线">
            <span style="text-decoration: underline;">U</span>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('highlight') }" @click="editor.chain().focus().toggleHighlight().run()" title="高亮">
            <span style="background: yellow; padding: 0 2px;">H</span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Alignment -->
        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" @click="editor.chain().focus().setTextAlign('left').run()" title="左对齐">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" @click="editor.chain().focus().setTextAlign('center').run()" title="居中">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="10" x2="7" y2="10"/><line x1="19" y1="14" x2="5" y2="14"/><line x1="17" y1="18" x2="7" y2="18"/></svg>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" @click="editor.chain().focus().setTextAlign('right').run()" title="右对齐">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Lists & Quote -->
        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()" title="无序列表">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()" title="有序列表">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
          </button>
          <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()" title="引用">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
          </button>
        </div>

        <!-- Word Import/Export -->
        <div class="toolbar-divider"></div>
        <div class="toolbar-group">
          <button class="toolbar-btn" title="导入 Word" @click="$emit('import-word')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          <button class="toolbar-btn" title="导出 Word" @click="$emit('export-word')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </button>
        </div>
      </div>

      <!-- 自动保存指示 -->
      <div class="toolbar-right">
        <span class="auto-save-indicator">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          已自动保存 {{ autoSaveTime }}
        </span>
      </div>
    </div>

    <!-- 模块导航条 -->
    <div v-if="sections.length > 0" class="section-nav">
      <button
        v-for="sec in sections"
        :key="sec.key"
        type="button"
        class="section-nav-item"
        :class="{ active: activeSection === sec.key }"
        @click="handleSectionClick(sec.key)"
      >{{ sec.label }}</button>
    </div>

    <!-- Editor Content -->
    <div ref="editorScrollRef" class="editor-content-wrapper" @scroll="handleEditorScroll">
      <editor-content :editor="editor" class="wb-paper" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, computed, watch, onMounted, nextTick } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';

interface SectionItem {
  key: string;
  label: string;
}

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入内容...' },
  editable: { type: Boolean, default: true },
  sections: { type: Array as () => SectionItem[], default: () => [] },
  checkParagraphIds: { type: Array as () => { paragraphId: string; severity: string }[], default: () => [] }
});

const emit = defineEmits(['update:modelValue', 'selection-change', 'section-change', 'import-word', 'export-word']);

const editorScrollRef = ref<HTMLElement | null>(null);
const activeSection = ref('');
const autoSaveTime = ref('');

const updateAutoSaveTime = () => {
  const now = new Date();
  autoSaveTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

let autoSaveInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  updateAutoSaveTime();
  autoSaveInterval = setInterval(updateAutoSaveTime, 30000);
});

const editor = useEditor({
  content: props.modelValue,
  editable: props.editable,
  extensions: [
    StarterKit,
    Underline,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: props.placeholder }),
    Typography
  ],
  onUpdate: ({ editor: e }) => {
    emit('update:modelValue', e.getHTML());
    updateAutoSaveTime();
  },
  onSelectionUpdate: ({ editor: e }) => {
    const { from, to } = e.state.selection;
    const domSelection = window.getSelection();

    if (domSelection && domSelection.rangeCount > 0 && !domSelection.isCollapsed) {
      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      emit('selection-change', {
        range: { from, to, empty: false },
        position: { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }
      });
    } else {
      emit('selection-change', { range: { from, to, empty: true }, position: null });
    }
  }
});

watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, false);
  }
});

watch(() => props.editable, (newValue) => {
  if (editor.value) editor.value.setEditable(newValue);
});

onBeforeUnmount(() => {
  if (editor.value) editor.value.destroy();
  clearInterval(autoSaveInterval);
});

const currentHeading = computed(() => {
  if (!editor.value) return 'p';
  if (editor.value.isActive('heading', { level: 1 })) return '1';
  if (editor.value.isActive('heading', { level: 2 })) return '2';
  if (editor.value.isActive('heading', { level: 3 })) return '3';
  return 'p';
});

const setHeading = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (!editor.value) return;
  if (value === 'p') {
    editor.value.chain().focus().setParagraph().run();
  } else {
    editor.value.chain().focus().toggleHeading({ level: parseInt(value) as 1|2|3 }).run();
  }
};

/* 模块导航 */
const handleSectionClick = (key: string) => {
  activeSection.value = key;
  scrollToParagraph(key);
  emit('section-change', key);
};

const handleEditorScroll = () => {
  if (!editorScrollRef.value || props.sections.length === 0) return;
  const containerTop = editorScrollRef.value.getBoundingClientRect().top + 60;

  let currentKey = props.sections[0]?.key || '';
  for (const sec of props.sections) {
    const el = document.querySelector(`[data-paragraph-id="${sec.key}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= containerTop) {
        currentKey = sec.key;
      }
    }
  }

  if (currentKey !== activeSection.value) {
    activeSection.value = currentKey;
    emit('section-change', currentKey);
  }
};

/* 校对标记注入 */
watch(() => props.checkParagraphIds, (items) => {
  nextTick(() => {
    document.querySelectorAll('.check-marker-error, .check-marker-warning').forEach(el => {
      el.classList.remove('check-marker-error', 'check-marker-warning');
    });
    for (const item of items) {
      const el = document.querySelector(`[data-paragraph-id="${item.paragraphId}"]`);
      if (el) {
        el.classList.add(item.severity === 'error' ? 'check-marker-error' : 'check-marker-warning');
      }
    }
  });
}, { immediate: true, deep: true });

/* Expose methods */
const scrollToParagraph = (paragraphId: string) => {
  if (!editor.value) return;
  const el = document.querySelector(`[data-paragraph-id="${paragraphId}"]`) || document.querySelector(`[data-section-id="${paragraphId}"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightParagraph(paragraphId);
  }
};

const highlightParagraph = (paragraphId: string) => {
  const el = document.querySelector(`[data-paragraph-id="${paragraphId}"]`) || document.querySelector(`[data-section-id="${paragraphId}"]`);
  if (el) {
    el.classList.add('temp-highlight');
    setTimeout(() => el.classList.remove('temp-highlight'), 2000);
  }
};

const getSelectionRange = () => {
  if (!editor.value) return null;
  return editor.value.state.selection;
};

const replaceSelectionText = (text: string) => {
  if (!editor.value) return;
  editor.value.chain().focus().insertContent(text).run();
};

const getHTML = () => {
  if (!editor.value) return '';
  return editor.value.getHTML();
};

const setContent = (html: string) => {
  if (!editor.value) return;
  editor.value.commands.setContent(html, false);
};

defineExpose({
  scrollToParagraph,
  highlightParagraph,
  getSelectionRange,
  replaceSelectionText,
  getHTML,
  setContent,
  editor
});
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #F2F3F5;
  overflow: hidden;
  min-height: 0;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
}
.toolbar-main {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
}
.toolbar-right {
  flex-shrink: 0;
  margin-left: 12px;
}
.auto-save-indicator {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #10B981;
  white-space: nowrap;
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-body);
  transition: all 0.2s;
}
.toolbar-btn:hover {
  background: var(--color-bg-body);
  color: var(--color-primary);
}
.toolbar-btn.is-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
.toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: var(--color-divider);
  margin: 0 4px;
}
.toolbar-select {
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0 8px;
  font-size: 13px;
  color: var(--color-text-body);
  outline: none;
}

/* 模块导航条 */
.section-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 16px;
  background: #fff;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
  overflow-x: auto;
}
.section-nav-item {
  padding: 4px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-sub);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.section-nav-item:hover {
  background: #f0f4ff;
  color: var(--color-primary);
}
.section-nav-item.active {
  background: var(--color-primary);
  color: #fff;
}

.editor-content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: block;
  min-height: 0;
}

/* Tiptap styles */
:deep(.ProseMirror) { outline: none; }
:deep(.ProseMirror p) {
  margin-bottom: 1em;
  line-height: 1.8;
  text-indent: 2em;
  position: relative;
}
:deep(.ProseMirror h1), :deep(.ProseMirror h2), :deep(.ProseMirror h3) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  line-height: 1.4;
  text-align: center;
  position: relative;
}
:deep(.ProseMirror ul), :deep(.ProseMirror ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}
:deep(.ProseMirror blockquote) {
  border-left: 3px solid var(--color-primary);
  padding-left: 1em;
  margin-left: 0;
  color: var(--color-text-sub);
}
:deep(.ProseMirror hr) {
  border: none;
  border-top: 1px solid var(--color-divider);
  margin: 2em 0;
}

/* Placeholder */
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Highlight */
:deep(.temp-highlight) {
  animation: highlight-fade 2s ease-out forwards;
}
@keyframes highlight-fade {
  0% { background-color: rgba(255, 255, 0, 0.5); }
  100% { background-color: transparent; }
}

/* 校对检查侧边标记 */
:deep(.check-marker-error) {
  border-left: 3px solid #EF4444;
  padding-left: 12px;
  margin-left: -15px;
}
:deep(.check-marker-warning) {
  border-left: 3px solid #F59E0B;
  padding-left: 12px;
  margin-left: -15px;
}

/* 脚注引用上标 */
:deep(.footnote-ref) {
  color: var(--color-primary);
  font-size: 0.8em;
  vertical-align: super;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  text-indent: 0;
}
:deep(.footnote-ref:hover) {
  text-decoration: underline;
}

/* 脚注区域 */
:deep(.footnote-section) {
  border-top: 1px solid var(--color-divider);
  margin-top: 2em;
  padding-top: 1em;
  text-indent: 0;
}
:deep(.footnote-section .footnote-title) {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-sub);
  margin-bottom: 0.5em;
  text-indent: 0;
  text-align: left;
}
:deep(.footnote-item) {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-sub);
  margin-bottom: 0.3em;
  text-indent: 0;
  text-align: left;
}
:deep(.footnote-item .fn-num) {
  color: var(--color-primary);
  font-weight: 600;
  margin-right: 4px;
}
</style>
