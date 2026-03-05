export const ANALYSIS_METRICS = [
  { key: 'logic', label: '论证逻辑完整度', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' },
  { key: 'focus', label: '争议焦点覆盖度', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>' },
  { key: 'discretion', label: '自由裁量阐释程度', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"></path></svg>' },
  { key: 'fact', label: '事实认定归纳度', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>' },
  { key: 'standard', label: '裁决文书规范度', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6"></path><path d="M12 2v6"></path><path d="M12 8a2 2 0 0 1-2 2H6"></path><path d="M12 8a2 2 0 0 0 2 2h4"></path></svg>' }
];

export const MOCK_CASE_SUMMARY = {
  caseNo: '（2024）京仲案字第01234号',
  parties: '申请人：北京科技 / 被申请人：上海贸易',
  secretary: '王小明',
  hearingDate: '2024-03-01'
};

export const MOCK_MATERIALS_REVIEW = [
  { id: 'r1', title: '裁决书草稿_v1.docx', page: 12 },
  { id: 'r2', title: '庭审笔录.pdf', page: 45 },
  { id: 'r3', title: '证据目录.xlsx', page: 2 },
];

export const MOCK_ANALYSIS_RESULTS = [
  { 
    metric: 'logic', 
    score: 95, 
    desc: '逻辑链条完整，请求权基础引用准确。', 
    status: 'success' 
  },
  { 
    metric: 'focus', 
    score: 88, 
    desc: '主要争议焦点已覆盖，但关于违约金调整的论述略显单薄。', 
    status: 'warning' 
  },
  { 
    metric: 'discretion', 
    score: 92, 
    desc: '自由裁量部分引用了相关指导案例，说理充分。', 
    status: 'success' 
  },
  { 
    metric: 'fact', 
    score: 90, 
    desc: '事实认定部分与庭审笔录一致。', 
    status: 'success' 
  },
  { 
    metric: 'standard', 
    score: 98, 
    desc: '符合裁决书制作规范。', 
    status: 'success' 
  }
];
