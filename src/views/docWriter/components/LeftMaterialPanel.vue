<template>
  <div class="left-panel">
    <div class="panel-header">
      证据/材料引用
    </div>
    <div class="panel-content evidence-panel">
      <!-- 提交方筛选 -->
      <div class="source-filter">
        <button
          v-for="f in sourceFilters"
          :key="f.key"
          type="button"
          class="filter-chip"
          :class="{ active: activeFilter === f.key }"
          @click="activeFilter = f.key"
        >{{ f.label }}</button>
      </div>

      <!-- 手风琴材料列表 -->
      <div class="accordion-list">
        <div
          v-for="mat in filteredMaterials"
          :key="mat.id"
          class="accordion-item"
          :class="{ expanded: expandedIds.has(mat.id) }"
        >
          <!-- 材料标题行 -->
          <div class="accordion-header" @click="toggleExpand(mat.id)">
            <div class="header-left">
              <span class="expand-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline v-if="expandedIds.has(mat.id)" points="6 9 12 15 18 9"/>
                  <polyline v-else points="9 18 15 12 9 6"/>
                </svg>
              </span>
              <span class="mat-icon">📄</span>
              <span class="mat-title">{{ mat.title }}</span>
            </div>
            <div class="header-right">
              <span class="mat-source-tag" :class="mat.sourceParty">{{ mat.source }}</span>
              <span class="mat-count">{{ mat.evidenceItems.length }}条</span>
              <span v-if="getQuotedCount(mat) > 0" class="mat-quoted-tag">已引{{ getQuotedCount(mat) }}</span>
            </div>
          </div>

          <!-- 展开的证据列表 -->
          <div v-if="expandedIds.has(mat.id)" class="accordion-body">
            <div
              v-for="row in mat.evidenceItems"
              :key="row.id"
              class="evidence-card"
              :class="riskClass(row.conflictLevel)"
            >
              <div class="evidence-head">
                <span class="evidence-claim">{{ row.claim }}</span>
                <span class="evidence-tag" :class="riskClass(row.conflictLevel)">{{ riskText(row.conflictLevel) }}</span>
              </div>
              <div class="evidence-excerpt">{{ row.excerpt }}</div>
              <div v-if="row.conflictNote" class="evidence-note">冲突提示：{{ row.conflictNote }}</div>
              <div class="action-row">
                <span v-if="row.quoted" class="quoted-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  已引用{{ row.quoteCount && row.quoteCount > 1 ? ` ×${row.quoteCount}` : '' }}
                </span>
                <button class="wb-btn wb-btn-primary quote-btn" @click.stop="handleQuote(mat, row)">
                  引用到文书
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { SOURCE_FILTERS, type MaterialItem, type EvidenceItem } from '../config';

const props = defineProps<{
  materials: MaterialItem[];
}>();

const emit = defineEmits<{
  (event: 'quote-evidence', payload: { material: MaterialItem; evidence: EvidenceItem }): void;
}>();

const sourceFilters = SOURCE_FILTERS;
const activeFilter = ref('all');

const expandedIds = reactive(new Set<string>());
if (props.materials.length > 0) {
  expandedIds.add(props.materials[0].id);
}

const filteredMaterials = computed(() => {
  if (activeFilter.value === 'all') return props.materials;
  return props.materials.filter(m => {
    if (activeFilter.value === 'applicant') return m.sourceParty === 'applicant' || m.sourceParty === 'both';
    if (activeFilter.value === 'respondent') return m.sourceParty === 'respondent' || m.sourceParty === 'both';
    return m.sourceParty === activeFilter.value;
  });
});

const toggleExpand = (id: string) => {
  if (expandedIds.has(id)) {
    expandedIds.delete(id);
  } else {
    expandedIds.add(id);
  }
};

const getQuotedCount = (mat: MaterialItem) => {
  return mat.evidenceItems.filter(e => e.quoted).length;
};

const riskClass = (level: EvidenceItem['conflictLevel']) => {
  if (level === 'high') return 'danger';
  if (level === 'medium') return 'warning';
  return 'safe';
};

const riskText = (level: EvidenceItem['conflictLevel']) => {
  if (level === 'high') return '高风险';
  if (level === 'medium') return '需复核';
  return '通过';
};

const handleQuote = (mat: MaterialItem, ev: EvidenceItem) => {
  emit('quote-evidence', { material: mat, evidence: ev });
};
</script>

<style scoped>
.evidence-panel {
  padding: 12px;
}

/* 筛选 */
.source-filter {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.filter-chip {
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.filter-chip.active {
  border-color: #bfdbfe;
  color: var(--color-primary);
  background: #eff6ff;
}
.filter-chip:hover:not(.active) {
  border-color: #d5def8;
  background: #f8faff;
}

/* 手风琴 */
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.accordion-item {
  border: 1px solid var(--color-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.15s;
}
.accordion-item.expanded {
  border-color: #c7d2fe;
}
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.15s;
  gap: 8px;
}
.accordion-header:hover {
  background: #f7faff;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}
.expand-icon {
  display: flex;
  align-items: center;
  color: var(--color-text-sub);
  flex-shrink: 0;
}
.mat-icon {
  font-size: 14px;
  flex-shrink: 0;
}
.mat-title {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.mat-source-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
.mat-source-tag.applicant {
  color: #1d4ed8;
  background: #eff6ff;
}
.mat-source-tag.respondent {
  color: #b45309;
  background: #fffbeb;
}
.mat-source-tag.both {
  color: #6b7280;
  background: #f3f4f6;
}
.mat-source-tag.tribunal {
  color: #15803d;
  background: #f0fdf4;
}
.mat-count {
  font-size: 11px;
  color: var(--color-text-sub);
  white-space: nowrap;
}
.mat-quoted-tag {
  font-size: 11px;
  color: #15803d;
  background: #ecfdf5;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

/* 展开内容 */
.accordion-body {
  padding: 0 10px 10px;
  animation: slideDown 0.2s ease-out;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 证据卡片 */
.evidence-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 6px;
  background: #fff;
}
.evidence-card:last-child {
  margin-bottom: 0;
}
.evidence-card.warning {
  border-color: #f8d8a9;
}
.evidence-card.danger {
  border-color: #f6b5b5;
}
.evidence-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.evidence-claim {
  font-size: 13px;
  font-weight: 600;
}
.evidence-tag {
  font-size: 11px;
  border-radius: 999px;
  padding: 2px 8px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.evidence-tag.safe {
  color: #0f766e;
  background: #ecfeff;
  border-color: #a5f3fc;
}
.evidence-tag.warning {
  color: #b45309;
  background: #fffbeb;
  border-color: #fde68a;
}
.evidence-tag.danger {
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
}
.evidence-excerpt {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-body);
}
.evidence-note {
  margin-top: 4px;
  font-size: 11px;
  color: #b45309;
}
.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}
.quoted-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #15803d;
}
.quote-btn {
  font-size: 12px;
  padding: 4px 10px;
  min-height: 28px;
  margin-left: auto;
}
</style>
