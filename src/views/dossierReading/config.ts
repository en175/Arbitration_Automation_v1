export interface DossierTab {
  key: string;
  label: string;
}

export const TABS: DossierTab[] = [
  { key: 'overview', label: '案卷整体概览' },
  { key: 'claims', label: '请求/事实/证据' },
  { key: 'defense', label: '抗辩对抗视图' }
];

export interface MaterialItem {
  id: string;
  title: string;
  type: string;
  pageCount: number;
}

export interface CaseInfo {
  caseNo: string;
  caseReason: string;
  claimant: string;
  respondent: string;
  amount: string;
  status: string;
  mediator: string;
  filingDate: string;
  summary: string;
  risks: string[];
  todos: string[];
}

export interface ClaimRequest {
  id: string;
  title: string;
  elements: Array<{ label: string; content: string }>;
  facts: string[];
  evidence: string[];
}

export interface ClaimFocusGroup {
  id: string;
  focus: string;
  requests: ClaimRequest[];
}

export interface ViewpointItem {
  id: string;
  text: string;
  anchorId: string;
}

export interface DefenseFocusGroup {
  id: string;
  focus: string;
  applicantViews: ViewpointItem[];
  respondentViews: ViewpointItem[];
}

export interface OriginalAnchorText {
  id: string;
  title: string;
  content: string;
}
