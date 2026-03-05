<template>
  <div class="editor-container">
    <!-- Toolbar -->
    <div class="editor-toolbar" v-if="editor">
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

      <!-- Lists -->
      <div class="toolbar-group">
        <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()" title="无序列表">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </button>
        <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()" title="有序列表">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Insert -->
      <div class="toolbar-group">
        <button class="toolbar-btn" :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()" title="引用">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
        </button>
        <button class="toolbar-btn" @click="editor.chain().focus().setHorizontalRule().run()" title="分割线">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Clear -->
      <div class="toolbar-group">
        <button class="toolbar-btn" @click="editor.chain().focus().unsetAllMarks().clearNodes().run()" title="清除格式">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content-wrapper">
      <editor-content :editor="editor" class="wb-paper" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, computed, watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  editable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'selection-change']);

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
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
  onSelectionUpdate: ({ editor }) => {
    // Get absolute position of selection
    const { from, to } = editor.state.selection;
    const domSelection = window.getSelection();
    
    if (domSelection && domSelection.rangeCount > 0 && !domSelection.isCollapsed) {
      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      emit('selection-change', {
        range: { from, to, empty: false },
        position: {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        }
      });
    } else {
      emit('selection-change', {
        range: { from, to, empty: true },
        position: null
      });
    }
  }
});

// Sync modelValue changes from parent
watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, false);
  }
});

// Sync editable prop
watch(() => props.editable, (newValue) => {
  if (editor.value) {
    editor.value.setEditable(newValue);
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

// Computed for current heading state
const currentHeading = computed(() => {
  if (!editor.value) return 'p';
  if (editor.value.isActive('heading', { level: 1 })) return '1';
  if (editor.value.isActive('heading', { level: 2 })) return '2';
  if (editor.value.isActive('heading', { level: 3 })) return '3';
  return 'p';
});

// Set Heading
const setHeading = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (!editor.value) return;
  
  if (value === 'p') {
    editor.value.chain().focus().setParagraph().run();
  } else {
    editor.value.chain().focus().toggleHeading({ level: parseInt(value) as 1|2|3 }).run();
  }
};

// Expose methods
const scrollToParagraph = (paragraphId: string) => {
  if (!editor.value) return;
  
  // Find node with data-paragraph-id
  // Tiptap doesn't natively support easy querying of DOM nodes by attributes without a custom extension.
  // However, we can use standard DOM API since Tiptap renders to DOM.
  const el = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightParagraph(paragraphId);
  } else {
    // If we're using IDs from mock data, we might need to manually insert them or 
    // simply text match if IDs aren't in the HTML.
    // For this implementation, we assume the HTML content has these IDs or we find by text.
    console.warn(`Paragraph with ID ${paragraphId} not found.`);
  }
};

const highlightParagraph = (paragraphId: string) => {
  const el = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
  if (el) {
    el.classList.add('temp-highlight');
    setTimeout(() => {
      el.classList.remove('temp-highlight');
    }, 2000);
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

defineExpose({
  scrollToParagraph,
  highlightParagraph,
  getSelectionRange,
  replaceSelectionText,
  editor // Expose full editor instance if needed
});
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #F2F3F5;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid var(--color-divider);
  flex-shrink: 0;
  overflow-x: auto;
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

.editor-content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
}

/* Override Tiptap default styles within wb-paper */
:deep(.ProseMirror) {
  outline: none;
  min-height: 100%;
}

:deep(.ProseMirror p) {
  margin-bottom: 1em;
  line-height: 1.8;
  text-indent: 2em; /* 文书风格 */
}

:deep(.ProseMirror h1), :deep(.ProseMirror h2), :deep(.ProseMirror h3) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  line-height: 1.4;
  text-align: center; /* 默认居中标题 */
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

/* Highlight Animation */
:deep(.temp-highlight) {
  animation: highlight-fade 2s ease-out forwards;
}

@keyframes highlight-fade {
  0% { background-color: rgba(255, 255, 0, 0.5); }
  100% { background-color: transparent; }
}
</style>
