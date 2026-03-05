<template>
  <div class="left-panel">
    <div class="panel-header panel-header-themed">
      <span class="module-title">材料清单</span>
    </div>
    <div class="panel-content material-content">
      <div class="material-overview">
        <span class="overview-chip normal">已收 {{ normalCount }} 项</span>
        <span class="overview-chip missing">缺失 {{ missingCount }} 项</span>
        <span class="overview-chip required">必传 {{ requiredCount }} 项</span>
      </div>
      <ul class="material-list">
        <li v-for="item in materials" :key="item.id" class="material-item">
          <div class="item-head">
            <div class="item-title-wrap">
              <span v-if="item.status === 'normal'" class="status-icon success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span v-else class="status-icon danger">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </span>
              <span class="item-title" :class="{ missing: item.status === 'missing' }">
                {{ item.title }}
              </span>
            </div>
            <span v-if="item.required" class="required-icon" title="必传材料">
              必
            </span>
          </div>
          <div class="file-meta-row">
            <span class="file-type-chip">{{ item.fileType }}</span>
            <span class="status-chip" :class="item.status">{{ item.status === 'normal' ? '已收齐' : '待补充' }}</span>
            <button class="preview-link" @click="openPreview(item)">预览</button>
          </div>
          <div v-if="item.status === 'missing'" class="upload-row">
            <label class="wb-btn upload-btn">
              上传补充材料
              <input type="file" class="file-input" @change="onFileChange(item.id, $event)" />
            </label>
            <span v-if="uploadedFiles[item.id]" class="upload-file-name">{{ uploadedFiles[item.id] }}</span>
            <span v-else class="upload-placeholder">未上传</span>
          </div>
          <div v-if="item.tip" class="material-tip">{{ item.tip }}</div>
        </li>
      </ul>
    </div>
    <div v-if="previewingItem" class="preview-overlay" @click="previewingItem = null">
      <div class="preview-card wb-card" @click.stop>
        <div class="preview-head">
          <span>{{ previewingItem.title }}（{{ previewingItem.fileType }}）</span>
          <button class="wb-btn" @click="previewingItem = null">关闭</button>
        </div>
        <div class="preview-body">
          <div>预览内容区</div>
          <div class="preview-hint">当前为演示预览，可对接实际文件流后展示真实文档内容。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  materials: Array<{ id: string; title: string; fileType: string; required: boolean; status: string; tip?: string }>;
}>();

const missingCount = computed(() => props.materials.filter((item) => item.status === 'missing').length);
const normalCount = computed(() => props.materials.filter((item) => item.status === 'normal').length);
const requiredCount = computed(() => props.materials.filter((item) => item.required).length);
const uploadedFiles = ref<Record<string, string>>({});
const previewingItem = ref<{ id: string; title: string; fileType: string } | null>(null);

const onFileChange = (id: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  uploadedFiles.value[id] = file.name;
};

const openPreview = (item: { id: string; title: string; fileType: string }) => {
  previewingItem.value = { id: item.id, title: item.title, fileType: item.fileType };
};
</script>

<style scoped>
.material-content {
  padding: 12px;
}
.material-overview {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.overview-chip {
  font-size: 12px;
  border-radius: 999px;
  padding: 3px 10px;
  border: 1px solid transparent;
}
.overview-chip.normal {
  color: #0f7d4d;
  background: #eaf8f1;
  border-color: #c8efd9;
}
.overview-chip.missing {
  color: #c93f3f;
  background: #fff0f0;
  border-color: #ffd1d1;
}
.overview-chip.required {
  color: #1f4ad8;
  background: #edf3ff;
  border-color: #d4e2ff;
}
.material-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.material-item {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 10px;
  background: #fff;
}
.item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.item-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.status-icon.success {
  color: var(--color-success);
}
.status-icon.danger {
  color: var(--color-danger);
}
.item-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-title);
}
.item-title.missing {
  color: var(--color-text-disabled);
}
.required-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 20px;
  border-radius: 999px;
  background: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecdd3;
  font-size: 11px;
  font-weight: 700;
  padding: 0 6px;
}
.file-meta-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.file-type-chip {
  font-size: 11px;
  line-height: 18px;
  border-radius: 999px;
  border: 1px solid #dbe4f5;
  background: #f8fbff;
  color: #486184;
  padding: 0 8px;
}
.status-chip {
  font-size: 11px;
  line-height: 18px;
  border-radius: 999px;
  padding: 0 8px;
  border: 1px solid transparent;
}
.status-chip.normal {
  color: #0f7d4d;
  background: #eaf8f1;
  border-color: #c8efd9;
}
.status-chip.missing {
  color: #c93f3f;
  background: #fff0f0;
  border-color: #ffd1d1;
}
.preview-link {
  margin-left: auto;
  border: none;
  padding: 0;
  background: transparent;
  color: #2f5cf5;
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.upload-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.upload-btn {
  min-height: 26px;
  padding: 0 10px;
  font-size: 12px;
}
.file-input {
  display: none;
}
.upload-file-name {
  font-size: 12px;
  color: #1d4ed8;
}
.upload-placeholder {
  font-size: 12px;
  color: var(--color-text-disabled);
}
.material-tip {
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-text-sub);
  line-height: 1.5;
}
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-card {
  width: 620px;
  max-width: calc(100vw - 48px);
  background: #fff;
}
.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-divider);
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-title);
}
.preview-body {
  min-height: 260px;
  padding: 16px 14px;
  font-size: 13px;
  color: var(--color-text-body);
}
.preview-hint {
  margin-top: 8px;
  color: var(--color-text-sub);
}
</style>
