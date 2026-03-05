<template>
  <div class="three-column-layout" @click="handleGlobalClick">
    <LeftMaterialPanel :materials="materials" />
    <EditorArea 
      ref="editorRef"
      v-model="content" 
      @selection-change="handleSelectionChange"
    />
    <RightPanel
      :aiMsgs="aiMsgs"
      :checkGroups="checkGroups"
      :comments="comments"
      @locate-paragraph="handleLocateParagraph"
    />

    <!-- AI 交互组件 -->
    <FloatingSelectionToolbar 
      :visible="toolbarVisible" 
      :position="toolbarPosition"
      @action="handleAiAction"
    />

    <AiWritePopover 
      :visible="popoverVisible"
      :position="popoverPosition"
      @close="popoverVisible = false"
      @action="handleAiAction"
      @send="handleAiSend"
    />

    <CandidateResultCard 
      :visible="resultVisible"
      :content="candidateText"
      :position="resultPosition"
      @close="resultVisible = false"
      @copy="handleCopyResult"
      @replace="handleReplaceResult"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import EditorArea from '@/components/editor/EditorArea.vue';
import RightPanel from './components/RightPanel.vue';
import FloatingSelectionToolbar from './components/FloatingSelectionToolbar.vue';
import AiWritePopover from './components/AiWritePopover.vue';
import CandidateResultCard from './components/CandidateResultCard.vue';

import { getMockCandidate, mockAiMsgs, mockCheckGroups, mockComments, mockEditorContent, mockMaterials } from './mock';

const materials = mockMaterials;
const aiMsgs = mockAiMsgs;
const checkGroups = mockCheckGroups;
const comments = mockComments;

const content = ref(mockEditorContent);

// State
const editorRef = ref(null);
const toolbarVisible = ref(false);
const toolbarPosition = ref({ top: 0, left: 0 });
const popoverVisible = ref(false);
const popoverPosition = ref({ top: 0, left: 0 });
const resultVisible = ref(false);
const resultPosition = ref({ top: 0, left: 0 });
const candidateText = ref('');
const currentSelectionRange = ref(null);

// Handlers
const handleSelectionChange = ({ range, position }) => {
  // Hide all panels when selection changes (except if interacting with them, handled by @mousedown.stop)
  if (!range || range.empty) {
    toolbarVisible.value = false;
    popoverVisible.value = false;
    // Keep result visible if it exists, until explicit close or new action
    return;
  }

  // Update selection range
  currentSelectionRange.value = range;

  // Only show toolbar if it wasn't already visible or if selection changed significantly
  // But here we just update position and ensure visibility
  // Calculate position relative to viewport
  // Note: EditorArea needs to emit viewport coordinates
  toolbarPosition.value = {
    top: position.top - 50, // Above selection
    left: position.left
  };
  toolbarVisible.value = true;
  // Don't hide popover if already open, unless selection changes drastically? 
  // For now, let's keep popover separate. If toolbar shows, maybe we don't auto-hide popover?
  // User requirement: "选中文本后，功能栏固定在页面上，点击非工具栏的其他区域/未选中文本时工具栏才消失。"
  // This implies persistence.
  
  // popoverVisible.value = false; // Hide popover if new selection - actually maybe we want to keep it if refining?
  // Let's stick to standard behavior: new selection -> new toolbar context -> hide old popover
  popoverVisible.value = false;
};

const handleGlobalClick = (event) => {
  // Check if click is inside toolbar or popover or result card
  // But since we use @mousedown.stop on those components, this event handler only fires for clicks OUTSIDE them.
  // EXCEPT: The click event might propagate from editor content wrapper if not stopped.
  // However, handleSelectionChange fires on selection change. 
  
  // If we click on the editor text to change cursor (without selection), handleSelectionChange will fire with empty range
  // which hides the toolbar.
  
  // If we click blank area in three-column-layout (outside editor text area but inside layout),
  // we should hide toolbar if selection is lost or just generally hide it.
  
  // But wait, if selection persists (e.g. user clicked but selection didn't clear? Unlikely in standard browser behavior),
  // usually click clears selection.
  
  // The user says: "点击非工具栏的其他区域/未选中文本时工具栏才消失"
  // If selection is cleared (empty range), handleSelectionChange already handles hiding.
  // If selection remains (e.g. maybe right click? or interaction with other inputs that don't clear selection?),
  // we should be careful.
  
  // With @mousedown.stop on toolbar/popover, clicks there won't reach here.
  // So any click reaching here is "outside".
  
  // We need to be careful not to hide if the click was actually part of a selection operation (drag select).
  // But handleSelectionChange handles the selection logic.
  
  // If user clicks "outside" (e.g. empty gray area), selection might be lost or not.
  // If selection is NOT lost (e.g. user clicked a button in another panel that doesn't clear focus?), 
  // we might still want to hide? 
  
  // Actually, standard behavior:
  // 1. Select text -> Toolbar shows.
  // 2. Click empty space -> Selection cleared -> Toolbar hides (via handleSelectionChange).
  // 3. Click toolbar -> Selection preserved (mousedown.stop) -> Toolbar stays.
  
  // The user requirement "选中文本后，功能栏固定在页面上" implies it shouldn't disappear automatically 
  // unless explicitly dismissed or selection lost.
  
  // Current logic in handleSelectionChange:
  // if (!range || range.empty) { toolbarVisible.value = false; ... }
  // This covers "未选中文本时工具栏才消失".
  
  // "点击非工具栏的其他区域" -> Usually clears selection, so covered.
  // But what if user clicks AI Popover? Popover is "part of toolbar interaction".
  // Popover has @mousedown.stop, so click doesn't bubble here.
  
  // So, what if user clicks the "RightPanel"? 
  // It might NOT clear editor selection if editor loses focus but selection remains?
  // Tiptap/ProseMirror usually keeps selection unless clicked elsewhere.
  
  // Let's ensure toolbar doesn't auto-hide on simple mouseup if selection is still there.
  // The current logic seems correct for "persistence": it's state-driven by `toolbarVisible`.
  // It only becomes false if range is empty.
  
  // However, `handleGlobalClick` is triggered on @click on `.three-column-layout`.
  // If I click on RightPanel, selection might remain in editor (blur event doesn't necessarily clear selection range object immediately or visually).
  // If selection remains, we shouldn't hide toolbar?
  // OR should we strictly hide it if clicking outside?
  // "点击非工具栏的其他区域...工具栏才消失"
  
  // Let's strictly hide on global click, UNLESS it was a selection action.
  // But click event happens after mouseup.
  // If I select text, mouseup happens, click happens.
  // If I drag select, click happens on release?
  
  // Wait, if I select text inside EditorArea, the click event bubbles to Layout.
  // If we hide on global click, we hide immediately after selecting!
  // We must stop propagation from EditorArea? 
  // Or check if selection is non-empty?
  
  if (!currentSelectionRange.value || currentSelectionRange.value.empty) {
     toolbarVisible.value = false;
     popoverVisible.value = false;
  }
  // If selection exists, we don't hide just because of a click, 
  // UNLESS that click was meant to dismiss (like clicking empty space).
  // But clicking empty space clears selection usually.
  
  // Issue: If I click "RightPanel" buttons, editor loses focus. 
  // Does selection clear? Browser dependent.
  // If selection clears, handleSelectionChange fires -> hides.
  // If selection persists, do we want to hide?
  // User says "点击非工具栏的其他区域...工具栏才消失".
  // So yes, clicking RightPanel should probably hide it even if selection technically persists (e.g. inactive selection).
  
  // So:
  // 1. Toolbar/Popover have @mousedown.stop -> clicks there don't bubble.
  // 2. EditorArea -> We should probably @click.stop or similar? 
  //    No, because we want clicks in editor to update selection/cursor.
  // 3. Layout @click -> Hides toolbar.
  
  // BUT: Selecting text involves clicking/dragging in editor.
  // If that bubbles to layout, it will hide toolbar immediately?
  // We need to ensure we don't hide if the click resulted in a valid selection.
  
  // Let's modify handleGlobalClick to only hide if target is NOT editor?
  // Or rely on selection state.
  
  // Actually, best way: 
  // If user clicks anywhere that is NOT toolbar/popover, we hide.
  // UNLESS it's the selection action itself.
  
  // If we rely on handleSelectionChange, it handles the "selection lost" case.
  // The "click outside but selection remains" case (e.g. clicking a non-focusable div) needs handling.
  
  // Let's try:
  // On Layout click:
  // If click originated from Editor, we check selection.
  // If selection is valid, KEEP toolbar.
  // If selection empty, HIDE.
  
  // If click originated outside Editor (and outside toolbar/popover), HIDE.
  
  // To do this:
  // Check event.target.closest('.editor-container')
  
  const isEditorClick = event.target.closest('.editor-container');
  if (!isEditorClick) {
    // Clicked outside editor (and outside toolbar/popover due to stopPropagation)
    toolbarVisible.value = false;
    popoverVisible.value = false;
  } else {
    // Clicked inside editor
    // handleSelectionChange will have fired if selection changed.
    // If selection is valid, we keep it.
    // If selection is empty, handleSelectionChange already hid it.
  }
};

const openAiPopover = () => {
  popoverPosition.value = { ...toolbarPosition.value };
  toolbarVisible.value = false;
  popoverVisible.value = true;
};

const handleAiAction = (action) => {
  generateCandidate(action.key, action.label);
};

const handleAiSend = (text) => {
  generateCandidate('custom', text);
};

const generateCandidate = (type, prompt) => {
  popoverVisible.value = false;
  toolbarVisible.value = false;
  
  setTimeout(() => {
    candidateText.value = getMockCandidate(type, prompt);
    resultPosition.value = { ...toolbarPosition.value, top: toolbarPosition.value.top + 20 };
    resultVisible.value = true;
  }, 500);
};

const handleLocateParagraph = (paragraphId) => {
  if (!editorRef.value) return;
  editorRef.value.scrollToParagraph(paragraphId);
};

const handleCopyResult = async () => {
  try {
    await navigator.clipboard.writeText(candidateText.value);
    alert('已复制到剪贴板');
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

const handleReplaceResult = () => {
  if (editorRef.value) {
    editorRef.value.replaceSelectionText(candidateText.value);
    resultVisible.value = false;
  }
};
</script>
