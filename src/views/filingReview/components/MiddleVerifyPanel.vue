<template>
  <div class="middle-panel">
    <div class="panel-header">信息提取核验</div>
    <div class="panel-content">
      <div class="wb-card verify-card">
        <h3 class="text-title form-title">基础信息核验</h3>

        <div v-for="section in groupedSections" :key="section.name" class="section-block">
          <div class="section-title">{{ section.name }}</div>
          <div class="field-grid">
            <div
              v-for="field in section.items"
              :id="`field-${field.key}`"
              :key="field.key"
              class="wb-form-item field-item"
              :class="[{ active: activeFieldKey === field.key }, getFieldStatus(field.key)]"
            >
              <div class="field-head">
                <label class="wb-label">{{ field.label }}</label>
                <span class="status-pill" :class="getFieldStatus(field.key)">{{ statusTextMap[getFieldStatus(field.key)] }}</span>
              </div>
              <input :type="field.inputType" class="wb-input" v-model="data[field.key]" :readonly="!field.editable" />
              <div class="field-meta">
                <span>{{ field.source }}</span>
                <span v-if="field.required">必填</span>
              </div>
              <div class="field-note">{{ fieldMeta[field.key]?.note || '待人工复核' }}</div>
            </div>
          </div>
        </div>

        <div class="notice-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          注意：高亮字段表示当前问题定位项，请优先核验后再提交立案。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { VerifyFieldDef, VerifyFieldMeta } from '../config';

const props = defineProps<{
  data: Record<string, string>;
  fields: VerifyFieldDef[];
  fieldMeta: Record<string, VerifyFieldMeta>;
  activeFieldKey: string;
}>();

const statusTextMap: Record<string, string> = {
  match: '通过',
  risk: '关注',
  missing: '缺失'
};

const groupedSections = computed(() => {
  const bucket: Record<string, VerifyFieldDef[]> = {};
  props.fields.forEach((field) => {
    const sectionFields = bucket[field.section] || [];
    sectionFields.push(field);
    bucket[field.section] = sectionFields;
  });
  return Object.keys(bucket).map((name) => ({ name, items: bucket[name] || [] }));
});

const getFieldStatus = (fieldKey: string) => props.fieldMeta[fieldKey]?.status || 'risk';

watch(
  () => props.activeFieldKey,
  (key) => {
    if (!key) return;
    const el = document.getElementById(`field-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
);
</script>

<style scoped>
.verify-card {
  padding: 24px;
}
.form-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 16px;
}
.section-block {
  margin-bottom: 18px;
}
.section-title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-title);
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.field-item {
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: all 0.2s ease;
}
.field-item.active {
  border-color: #bfdbfe;
  background: #f6faff;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
}
.field-item.match {
  border-color: #b8e2cb;
}
.field-item.risk {
  border-color: #ffd79a;
}
.field-item.missing {
  border-color: #fecaca;
}
.field-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.status-pill {
  font-size: 11px;
  line-height: 1;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
}
.status-pill.match {
  color: #0f7d4d;
  background: #eaf8f1;
  border-color: #c8efd9;
}
.status-pill.risk {
  color: #c07a10;
  background: #fff6e8;
  border-color: #ffe2bd;
}
.status-pill.missing {
  color: #c93f3f;
  background: #fff0f0;
  border-color: #ffd1d1;
}
.field-meta {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-sub);
}
.field-note {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--color-text-body);
}
.notice-box {
  margin-top: 24px;
  padding: 16px;
  background: #fff7e8;
  border: 1px solid #ff7d00;
  border-radius: 4px;
  color: #ff7d00;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
