<template>
  <div class="three-column-layout" @click="handleGlobalClick">
    <LeftMaterialPanel
      :materials="materials"
      @quote-evidence="handleQuoteEvidence"
    />
    <EditorArea 
      ref="editorRef"
      v-model="content" 
      :sections="docSections"
      :check-paragraph-ids="checkParagraphMarkers"
      @selection-change="handleSelectionChange"
      @section-change="handleSectionChange"
      @import-word="handleImportWord"
      @export-word="handleExportWord"
    />
    <RightPanel
      ref="rightPanelRef"
      :aiMsgs="aiMsgs"
      :checkGroups="checkGroups"
      :comments="comments"
      :currentSection="currentSection"
      @locate-paragraph="handleLocateParagraph"
      @ai-preset-select="handleAiPresetSelect"
      @update-comment="handleUpdateComment"
      @add-comment="handleAddComment"
      @delete-comment="handleDeleteComment"
    />

    <FloatingSelectionToolbar 
      :visible="toolbarVisible" 
      :position="toolbarPosition"
      @action="handleAiAction"
      @add-comment="handleToolbarAddComment"
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

    <!-- Word import hidden input -->
    <input
      ref="wordFileInput"
      type="file"
      accept=".docx,.doc"
      style="display: none"
      @change="handleWordFileSelected"
    />

    <ToastMessage
      :message="toastMsg"
      :type="toastType"
      :show="toastShow"
      @update:show="toastShow = $event"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import LeftMaterialPanel from './components/LeftMaterialPanel.vue';
import EditorArea from '@/components/editor/EditorArea.vue';
import RightPanel from './components/RightPanel.vue';
import FloatingSelectionToolbar from './components/FloatingSelectionToolbar.vue';
import AiWritePopover from './components/AiWritePopover.vue';
import CandidateResultCard from './components/CandidateResultCard.vue';
import ToastMessage from '@/components/ToastMessage.vue';
import { DOC_SECTIONS } from './config';

import {
  getMockCandidate,
  getPresetReply,
  mockAiMsgs,
  mockCheckGroups,
  mockComments,
  mockEditorContent,
  mockMaterials
} from './mock';

const materials = ref(JSON.parse(JSON.stringify(mockMaterials)));
const aiMsgs = ref([...mockAiMsgs]);
const checkGroups = mockCheckGroups;
const comments = ref([...mockComments]);
const content = ref(mockEditorContent);
const docSections = DOC_SECTIONS;

const currentSection = ref('');
const footnotes = ref([]);
let footnoteCounter = 0;

const editorRef = ref(null);
const rightPanelRef = ref(null);
const wordFileInput = ref(null);

const toolbarVisible = ref(false);
const toolbarPosition = ref({ top: 0, left: 0 });
const popoverVisible = ref(false);
const popoverPosition = ref({ top: 0, left: 0 });
const resultVisible = ref(false);
const resultPosition = ref({ top: 0, left: 0 });
const candidateText = ref('');
const currentSelectionRange = ref(null);

/* Toast */
const toastShow = ref(false);
const toastMsg = ref('');
const toastType = ref('success');
const showToast = (msg, type = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  toastShow.value = true;
};

/* 校对检查段落标记 */
const checkParagraphMarkers = computed(() => {
  const markers = [];
  for (const group of checkGroups) {
    for (const item of group.items) {
      markers.push({ paragraphId: item.paragraphId, severity: item.severity || 'warning' });
    }
  }
  return markers;
});

/* Section change */
const handleSectionChange = (sectionKey) => {
  currentSection.value = sectionKey;
};

/* Selection */
const handleSelectionChange = ({ range, position }) => {
  if (!range || range.empty) {
    toolbarVisible.value = false;
    popoverVisible.value = false;
    return;
  }
  currentSelectionRange.value = range;
  toolbarPosition.value = { top: position.top - 50, left: position.left };
  toolbarVisible.value = true;
  popoverVisible.value = false;
};

const handleGlobalClick = (event) => {
  if (!currentSelectionRange.value || currentSelectionRange.value.empty) {
    toolbarVisible.value = false;
    popoverVisible.value = false;
  }
  const isEditorClick = event.target.closest('.editor-container');
  if (!isEditorClick) {
    toolbarVisible.value = false;
    popoverVisible.value = false;
  }
};

/* AI */
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

/* 脚注式证据引用 */
const handleQuoteEvidence = ({ material, evidence }) => {
  if (evidence.conflictLevel === 'high') {
    showToast(`当前证据存在高风险冲突：${evidence.conflictNote}，请先完成冲突处理后再入稿。`, 'error');
    return;
  }
  if (!editorRef.value) return;

  footnoteCounter++;
  const fnNum = footnoteCounter;
  const fnId = `fn-${fnNum}`;

  const footnoteRef = `<span class="footnote-ref" data-fn-id="${fnId}" title="${material.title}：${evidence.claim}">[证${fnNum}]</span>`;
  editorRef.value.replaceSelectionText(evidence.excerpt + ' ' + footnoteRef);

  footnotes.value.push({
    id: fnId,
    num: fnNum,
    materialTitle: material.title,
    claim: evidence.claim,
    excerpt: evidence.excerpt
  });

  updateFootnoteSection();
  markEvidenceQuoted(evidence.id);
  showToast(`已引用「${evidence.claim}」并添加脚注 [证${fnNum}]`);
};

const markEvidenceQuoted = (evidenceId) => {
  for (const mat of materials.value) {
    for (const ev of mat.evidenceItems) {
      if (ev.id === evidenceId) {
        ev.quoted = true;
        ev.quoteCount = (ev.quoteCount || 0) + 1;
        return;
      }
    }
  }
};

const updateFootnoteSection = () => {
  if (!editorRef.value || footnotes.value.length === 0) return;

  nextTick(() => {
    const fnSectionEl = document.querySelector('.footnote-section');
    if (fnSectionEl) fnSectionEl.remove();

    let fnHtml = '<div class="footnote-section" data-paragraph-id="sec-footnotes">';
    fnHtml += '<div class="footnote-title">证据引用注释</div>';
    for (const fn of footnotes.value) {
      fnHtml += `<div class="footnote-item" id="${fn.id}"><span class="fn-num">[证${fn.num}]</span>${fn.materialTitle}：${fn.claim} —— "${fn.excerpt}"</div>`;
    }
    fnHtml += '</div>';

    const currentHtml = editorRef.value.getHTML();
    const cleanedHtml = currentHtml.replace(/<div class="footnote-section"[\s\S]*?<\/div>\s*<\/div>/, '');
    editorRef.value.setContent(cleanedHtml + fnHtml);
  });
};

/* AI Preset */
const handleAiPresetSelect = ({ actionKey, optionKey, actionLabel, optionLabel }) => {
  const prompt = optionKey === '_default' ? `预选任务：${actionLabel}` : `预选任务：${actionLabel} / ${optionLabel}`;
  aiMsgs.value.push({ id: `u-${Date.now()}`, role: 'user', content: prompt });
  const reply = getPresetReply(actionKey, optionKey);
  aiMsgs.value.push({ id: `a-${Date.now()}`, role: 'ai', content: reply });
};

const handleLocateParagraph = (paragraphId) => {
  if (!editorRef.value) return;
  editorRef.value.scrollToParagraph(paragraphId);
};

/* Comments */
const handleUpdateComment = (updated) => {
  const idx = comments.value.findIndex(c => c.id === updated.id);
  if (idx !== -1) comments.value[idx] = { ...comments.value[idx], ...updated };
};

const handleAddComment = (newItem) => {
  comments.value.unshift(newItem);
};

const handleDeleteComment = (commentId) => {
  comments.value = comments.value.filter(c => c.id !== commentId);
};

const handleToolbarAddComment = () => {
  const selection = window.getSelection();
  const selectedText = selection ? selection.toString().trim() : '';
  const newId = 'cm-sel-' + Date.now();
  const newItem = {
    id: newId,
    title: selectedText ? (selectedText.length > 20 ? selectedText.slice(0, 20) + '...' : selectedText) : '新批注',
    content: '',
    status: 'pending',
    paragraphId: '',
    author: '当前用户',
    createdAt: new Date().toLocaleString('zh-CN'),
    selectedText: selectedText || ''
  };
  comments.value.unshift(newItem);
  toolbarVisible.value = false;
  nextTick(() => {
    if (rightPanelRef.value) rightPanelRef.value.switchToCommentAndEdit(newId);
  });
};

const handleCopyResult = async () => {
  try {
    await navigator.clipboard.writeText(candidateText.value);
    showToast('已复制到剪贴板');
  } catch (err) {
    showToast('复制失败，请手动复制', 'error');
  }
};

const handleReplaceResult = () => {
  if (editorRef.value) {
    editorRef.value.replaceSelectionText(candidateText.value);
    resultVisible.value = false;
    showToast('已替换选中文本');
  }
};

/* Word Import */
const handleImportWord = () => {
  if (wordFileInput.value) wordFileInput.value.click();
};

const handleWordFileSelected = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  showToast('正在导入文档...', 'info');

  try {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    let html = result.value;

    html = autoTagSections(html);

    if (editorRef.value) {
      editorRef.value.setContent(html);
      content.value = html;
    }
    showToast(`已导入「${file.name}」`);
  } catch (err) {
    console.error('Import failed:', err);
    showToast('导入失败，请检查文件格式', 'error');
  }

  if (wordFileInput.value) wordFileInput.value.value = '';
};

const autoTagSections = (html) => {
  const sectionMap = [
    { pattern: /一[、．.]?\s*首部/, id: 'sec-header' },
    { pattern: /二[、．.]?\s*仲裁请求/, id: 'sec-claims' },
    { pattern: /三[、．.]?\s*案件事实/, id: 'sec-facts' },
    { pattern: /四[、．.]?\s*(被申请人)?答辩/, id: 'sec-defense' },
    { pattern: /五[、．.]?\s*仲裁庭查明/, id: 'sec-investigation' },
    { pattern: /六[、．.]?\s*仲裁庭认为/, id: 'sec-analysis' },
    { pattern: /七[、．.]?\s*裁决主文/, id: 'sec-ruling' }
  ];

  for (const sec of sectionMap) {
    html = html.replace(
      new RegExp(`(<h[12][^>]*)(>\\s*${sec.pattern.source})`),
      `$1 data-paragraph-id="${sec.id}"$2`
    );
  }
  return html;
};

/* Word Export */
const handleExportWord = async () => {
  if (!editorRef.value) return;

  showToast('正在生成 Word 文档...', 'info');

  try {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');
    const htmlContent = editorRef.value.getHTML();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const elements = tempDiv.querySelectorAll('h1, h2, h3, p');

    const docParagraphs = [];
    for (const el of elements) {
      const text = el.textContent?.trim() || '';
      if (!text) continue;

      if (el.tagName === 'H1') {
        docParagraphs.push(new Paragraph({
          children: [new TextRun({ text, bold: true, size: 36, font: '仿宋' })],
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        }));
      } else if (el.tagName === 'H2') {
        docParagraphs.push(new Paragraph({
          children: [new TextRun({ text, bold: true, size: 28, font: '黑体' })],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 200 }
        }));
      } else {
        const style = el.getAttribute('style') || '';
        const alignment = style.includes('text-align: right') ? AlignmentType.RIGHT
          : style.includes('text-align: center') ? AlignmentType.CENTER
          : AlignmentType.JUSTIFIED;
        const isBold = el.querySelector('strong') !== null;

        docParagraphs.push(new Paragraph({
          children: [new TextRun({ text, bold: isBold, size: 24, font: '仿宋' })],
          alignment,
          indent: alignment === AlignmentType.JUSTIFIED ? { firstLine: 480 } : undefined,
          spacing: { line: 360 }
        }));
      }
    }

    const doc = new Document({
      sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        children: docParagraphs
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '裁决书.docx';
    a.click();
    URL.revokeObjectURL(url);
    showToast('裁决书已导出为 Word 文档');
  } catch (err) {
    console.error('Export failed:', err);
    showToast('导出失败，请稍后重试', 'error');
  }
};
</script>
