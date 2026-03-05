<template>
  <div class="middle-panel">
    <div class="panel-header panel-header-themed">
      <span class="module-title">信息提取核验</span>
    </div>
    <div class="panel-content">
      <div class="wb-card verify-card">
        <h3 class="text-title form-title">基础信息核验</h3>
        <div class="rule-engine-box">
          <div class="rule-engine-head">
            <span>金额/日期规则引擎</span>
            <span class="rule-engine-hit">命中 {{ hitRuleCount }} 条</span>
          </div>
          <div class="rule-list">
            <div v-for="rule in ruleChecks" :key="rule.id" class="rule-item" :class="[rule.level, rule.result]">
              <div class="rule-title-row">
                <span class="rule-title">{{ rule.title }}</span>
                <span class="rule-level">{{ levelTextMap[rule.level] }}</span>
              </div>
              <div class="rule-formula">{{ rule.formula }}</div>
              <div class="rule-conclusion">{{ rule.conclusion }}</div>
            </div>
          </div>
        </div>

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
                <label class="wb-label field-label">
                  <span v-if="field.required" class="required-star">*</span>
                  <span>{{ field.label }}</span>
                </label>
                <span class="status-pill" :class="getFieldStatus(field.key)">{{ statusTextMap[getFieldStatus(field.key)] }}</span>
              </div>
              <input :type="field.inputType" class="wb-input" v-model="data[field.key]" :readonly="!field.editable" />
              <div class="field-meta">
                <button
                  type="button"
                  class="source-link"
                  :class="{ enabled: !!evidenceMap[field.key] }"
                  :disabled="!evidenceMap[field.key]"
                  :ref="(el) => setSourceRef(field.key, el)"
                  @click="toggleEvidence(field.key)"
                >
                  来源：{{ field.source }}
                </button>
                <span v-if="evidenceMap[field.key]" class="anchor-badge">证据第{{ evidenceMap[field.key].page }}页</span>
              </div>
              <div class="field-note">{{ fieldMeta[field.key]?.note || '待人工复核' }}</div>
            </div>
          </div>
        </div>

        <div
          v-if="activeEvidenceKey && evidenceMap[activeEvidenceKey]"
          ref="popoverRef"
          class="evidence-popover"
          :style="{ top: `${popoverStyle.top}px`, left: `${popoverStyle.left}px` }"
        >
          <div class="popover-head">
            <span>{{ evidenceMap[activeEvidenceKey].sourceName }}</span>
            <button type="button" class="popover-close" @click="closeEvidence">关闭</button>
          </div>
          <div class="evidence-anchor">{{ evidenceMap[activeEvidenceKey].anchor }}</div>
          <div class="evidence-snippet">{{ evidenceMap[activeEvidenceKey].snippet }}</div>
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EvidenceAnchor, RuleCheckItem, VerifyFieldDef, VerifyFieldMeta } from '../config';

const props = defineProps<{
  data: Record<string, string>;
  fields: VerifyFieldDef[];
  fieldMeta: Record<string, VerifyFieldMeta>;
  activeFieldKey: string;
  evidenceMap: Record<string, EvidenceAnchor>;
  ruleChecks: RuleCheckItem[];
}>();

const statusTextMap: Record<string, string> = {
  match: '通过',
  risk: '关注',
  missing: '缺失'
};
const levelTextMap: Record<string, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险'
};
const activeEvidenceKey = ref('');
const sourceRefMap = ref<Record<string, HTMLElement | null>>({});
const popoverRef = ref<HTMLElement | null>(null);
const popoverStyle = ref({ top: 0, left: 0 });

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
const hitRuleCount = computed(() => props.ruleChecks.filter((item) => item.result === 'hit').length);

const setSourceRef = (fieldKey: string, el: unknown) => {
  sourceRefMap.value[fieldKey] = (el as HTMLElement | null) || null;
};

const updatePopoverPosition = (fieldKey: string) => {
  const trigger = sourceRefMap.value[fieldKey];
  if (!trigger) return;
  const rect = trigger.getBoundingClientRect();
  const maxWidth = 460;
  const viewportPadding = 12;
  const left = Math.min(Math.max(rect.left, viewportPadding), window.innerWidth - maxWidth - viewportPadding);
  popoverStyle.value = {
    top: rect.bottom + 8,
    left
  };
};

const closeEvidence = () => {
  activeEvidenceKey.value = '';
};

const toggleEvidence = (fieldKey: string) => {
  if (!props.evidenceMap[fieldKey]) return;
  if (activeEvidenceKey.value === fieldKey) {
    closeEvidence();
    return;
  }
  activeEvidenceKey.value = fieldKey;
  updatePopoverPosition(fieldKey);
};

const handleOutsideClick = (event: MouseEvent) => {
  if (!activeEvidenceKey.value) return;
  const target = event.target as Node;
  if (popoverRef.value?.contains(target)) return;
  const currentTrigger = sourceRefMap.value[activeEvidenceKey.value];
  if (currentTrigger?.contains(target)) return;
  closeEvidence();
};

const handleViewportChange = () => {
  if (!activeEvidenceKey.value) return;
  updatePopoverPosition(activeEvidenceKey.value);
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick, true);
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick, true);
  window.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('scroll', handleViewportChange, true);
});

watch(
  () => props.activeFieldKey,
  (key) => {
    if (!key) return;
    closeEvidence();
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
  margin-bottom: 14px;
  font-size: 16px;
}
.rule-engine-box {
  margin-bottom: 16px;
  border: 1px solid #dbeafe;
  background: #f8fbff;
  border-radius: 10px;
  padding: 12px;
}
.rule-engine-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1f3f8f;
}
.rule-engine-hit {
  font-size: 12px;
  color: #2f5cf5;
  border: 1px solid #c8d7ff;
  background: #edf3ff;
  border-radius: 999px;
  padding: 1px 8px;
}
.rule-list {
  display: grid;
  gap: 8px;
}
.rule-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  padding: 8px 10px;
}
.rule-item.high {
  border-left: 3px solid #ef4444;
}
.rule-item.medium {
  border-left: 3px solid #f59e0b;
}
.rule-item.low {
  border-left: 3px solid #3b82f6;
}
.rule-title-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
.rule-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-title);
}
.rule-level {
  font-size: 11px;
  color: var(--color-text-sub);
}
.rule-formula {
  font-size: 12px;
  color: #334155;
}
.rule-conclusion {
  margin-top: 2px;
  font-size: 12px;
  color: #475569;
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
  border-color: #3b82f6;
  background: #eff6ff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  animation: locatePulse 1.1s ease;
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
.field-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-title);
}
.required-star {
  color: #ef4444;
  font-size: 14px;
  line-height: 1;
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
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-sub);
}
.source-link {
  border: none;
  padding: 0;
  background: transparent;
  color: var(--color-text-sub);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: default;
  font-size: 12px;
}
.source-link.enabled {
  color: #2f5cf5;
  cursor: pointer;
}
.anchor-badge {
  border: 1px solid #c8d7ff;
  background: #edf3ff;
  color: #1f4ad8;
  border-radius: 999px;
  padding: 0 8px;
  line-height: 20px;
  font-size: 11px;
}
.evidence-popover {
  position: fixed;
  z-index: 1200;
  width: 460px;
  max-width: calc(100vw - 24px);
  border: 1px solid #dbeafe;
  border-radius: 12px;
  background: #f8fbff;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.2);
  padding: 12px 14px;
}
.popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #1f3f8f;
}
.popover-close {
  border: none;
  background: transparent;
  color: #1f4ad8;
  cursor: pointer;
  font-size: 12px;
}
.evidence-anchor {
  margin-top: 4px;
  font-size: 12px;
  color: #1d4ed8;
}
.evidence-snippet {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #334155;
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
@keyframes locatePulse {
  0% {
    transform: scale(0.995);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
  }
  45% {
    transform: scale(1.008);
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.08);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
}
</style>
