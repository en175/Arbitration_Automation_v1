<template>
  <div class="middle-panel">
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
      <div v-if="currentTab === 'overview'">
        <div class="wb-card section-card">
          <h2 class="text-title" style="margin-top: 0; font-size: 18px;">{{ caseInfo.caseNo }}</h2>
          <div class="overview-grid">
            <div class="info-row"><span class="wb-label">案由</span>{{ caseInfo.caseReason }}</div>
            <div class="info-row"><span class="wb-label">标的额</span>{{ caseInfo.amount }}</div>
            <div class="info-row"><span class="wb-label">申请人</span>{{ caseInfo.claimant }}</div>
            <div class="info-row"><span class="wb-label">被申请人</span>{{ caseInfo.respondent }}</div>
            <div class="info-row"><span class="wb-label">程序状态</span><span class="wb-badge wb-badge-info">{{ caseInfo.status }}</span></div>
            <div class="info-row"><span class="wb-label">立案时间</span>{{ caseInfo.filingDate }}</div>
            <div class="info-row" style="grid-column: span 2;"><span class="wb-label">调解员</span>{{ caseInfo.mediator }}</div>
          </div>
          <div class="case-summary">
            <strong>案情摘要：</strong>{{ caseInfo.summary }}
          </div>
        </div>

        <div class="wb-card section-card">
          <h3 class="text-title" style="margin-top: 0; font-size: 16px; margin-bottom: 12px;">风险提示</h3>
          <ul class="warn-list risk">
            <li v-for="(risk, idx) in caseInfo.risks" :key="idx">{{ risk }}</li>
          </ul>
        </div>

        <div class="wb-card section-card">
          <h3 class="text-title" style="margin-top: 0; font-size: 16px; margin-bottom: 12px;">待确认事项</h3>
          <ul class="warn-list todo">
            <li v-for="(todo, idx) in caseInfo.todos" :key="idx">{{ todo }}</li>
          </ul>
        </div>
      </div>

      <div v-if="currentTab === 'claims'">
        <div v-for="focus in claims" :key="focus.id" class="wb-card section-card">
          <h3 class="text-title focus-title">{{ focus.focus }}</h3>
          <div v-for="request in focus.requests" :key="request.id" class="request-block">
            <div class="request-head">
              <span>{{ request.title }}</span>
              <span class="wb-badge wb-badge-info">请求</span>
            </div>
            <div class="level-row">
              <div class="level-label">请求要件</div>
              <div class="level-content">
                <div v-for="(el, idx) in request.elements" :key="idx" class="content-line">
                  <span class="line-label">{{ el.label }}</span>
                  <span>{{ el.content }}</span>
                </div>
              </div>
            </div>
            <div class="level-row">
              <div class="level-label">事实</div>
              <div class="level-content">
                <div v-for="(fact, idx) in request.facts" :key="idx" class="content-line fact">{{ fact }}</div>
              </div>
            </div>
            <div class="level-row">
              <div class="level-label">证据</div>
              <div class="level-content tags">
                <span v-for="(ev, idx) in request.evidence" :key="idx" class="wb-badge wb-badge-success">{{ ev }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'defense'">
        <div v-for="(item, idx) in defense" :key="item.id" class="wb-card section-card">
          <h3 class="text-title focus-title">
            争议焦点 {{ idx + 1 }}：{{ item.focus }}
          </h3>
          <div class="defense-grid">
            <div class="view-col applicant">
              <div class="view-title">申请方观点</div>
              <div v-for="view in item.applicantViews" :key="view.id" class="view-item" @click="locateAnchor(view.anchorId)">
                <span>{{ view.text }}</span>
                <button type="button" class="locate-btn">定位正文</button>
              </div>
            </div>
            <div class="view-col respondent">
              <div class="view-title">被申请方观点</div>
              <div v-for="view in item.respondentViews" :key="view.id" class="view-item" @click="locateAnchor(view.anchorId)">
                <span>{{ view.text }}</span>
                <button type="button" class="locate-btn">定位正文</button>
              </div>
            </div>
          </div>
        </div>
        <div class="wb-card section-card">
          <h3 class="text-title focus-title">正文定位片段</h3>
          <div v-for="anchor in originalAnchors" :id="anchor.id" :key="anchor.id" class="anchor-row" :class="{ active: currentAnchor === anchor.id }">
            <div class="anchor-title">{{ anchor.title }}</div>
            <div class="anchor-content">{{ anchor.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TABS, type CaseInfo, type ClaimFocusGroup, type DefenseFocusGroup, type OriginalAnchorText } from '../config';

defineProps<{
  caseInfo: CaseInfo;
  claims: ClaimFocusGroup[];
  defense: DefenseFocusGroup[];
  originalAnchors: OriginalAnchorText[];
}>();

const currentTab = ref('overview');
const tabs = TABS;
const currentAnchor = ref('');

const locateAnchor = (anchorId: string) => {
  currentAnchor.value = anchorId;
  const target = document.getElementById(anchorId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
</script>

<style scoped>
.info-row {
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.case-summary {
  background: var(--color-bg-body);
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.6;
}
.section-card {
  padding: 20px;
  margin-bottom: 20px;
}
.warn-list {
  padding-left: 20px;
  margin: 0;
}
.warn-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}
.warn-list.risk {
  color: var(--color-danger);
}
.warn-list.todo {
  color: var(--color-warning);
}
.focus-title {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
}
.request-block {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
}
.request-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
}
.level-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  margin-bottom: 10px;
}
.level-label {
  color: var(--color-text-sub);
  font-size: 12px;
  padding-top: 2px;
}
.level-content {
  font-size: 13px;
  line-height: 1.6;
}
.content-line {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}
.line-label {
  color: var(--color-text-sub);
  min-width: 58px;
}
.content-line.fact {
  position: relative;
  padding-left: 10px;
}
.content-line.fact::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}
.level-content.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.defense-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.view-col {
  padding: 12px;
  border-radius: 8px;
}
.view-col.applicant {
  background: #e8f3ff;
}
.view-col.respondent {
  background: #fff7e8;
}
.view-title {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
}
.view-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  line-height: 1.5;
  cursor: pointer;
}
.locate-btn {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: #fff;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--color-primary);
  flex-shrink: 0;
}
.anchor-row {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}
.anchor-row.active {
  border-color: #bfdbfe;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.12);
  background: #f5f9ff;
}
.anchor-title {
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: 4px;
}
.anchor-content {
  font-size: 13px;
  line-height: 1.6;
}
</style>
