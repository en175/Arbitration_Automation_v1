export const WRITER_TABS = [
  { key: 'ai', label: 'AI 对话' },
  { key: 'check', label: '校对检查' },
  { key: 'comment', label: '人工批注' }
];

export const MOCK_MATERIALS = [
  { id: 'w1', title: '仲裁申请书', type: 'doc' },
  { id: 'w2', title: '被申请人答辩书', type: 'doc' },
  { id: 'w3', title: '庭审笔录', type: 'doc' },
];

export const MOCK_AI_MSGS = [
  { id: 'm1', role: 'ai', content: '您好，我是文书写作助手。请问需要生成哪部分的段落？' },
  { id: 'm2', role: 'user', content: '帮我生成一段关于“管辖权异议”的裁决分析' },
  { id: 'm3', role: 'ai', content: '好的，根据案情，被申请人提出的管辖权异议不成立。理由如下：双方签订的《购销合同》第 12 条明确约定了仲裁条款...' }
];

export const MOCK_EDITOR_CONTENT = `
  <h1 style="text-align: center">裁决书</h1>
  <p data-paragraph-id="p1">申请人北京科技有限公司与被申请人上海贸易有限公司买卖合同纠纷一案，本委于2024年1月15日受理后，依法组成仲裁庭并完成证据交换。</p>
  <p data-paragraph-id="p2">仲裁庭查明：双方于2023年12月1日签订《购销合同》，约定价款120万元、付款期为收货后30日内。</p>
  <p data-paragraph-id="p3">申请人提交了发货单、签收单和对账邮件，被申请人则主张部分货物型号不符并提出质量异议。</p>
  <p data-paragraph-id="p4">关于争议焦点一，仲裁庭认为被申请人未能充分举证证明其拒付具有合法基础，逾期付款责任应由其承担。</p>
  <p data-paragraph-id="p5">关于争议焦点二，仲裁庭将结合违约金条款约定、履约背景和实际损失综合判断是否需要调减。</p>
`;

export const MOCK_CHECK_GROUPS = [
  {
    id: 'cg1',
    title: '格式与术语一致性',
    items: [
      { id: 'c1', type: 'format', desc: '金额“10000元”建议统一为“10,000.00 元”', paragraphId: 'p2' },
      { id: 'c2', type: 'format', desc: '“本委”与“仲裁庭”混用，建议按段落语境统一称谓', paragraphId: 'p1' }
    ]
  },
  {
    id: 'cg2',
    title: '逻辑与论证完整性',
    items: [
      { id: 'c3', type: 'logic', desc: '争议焦点二缺少“违约金是否显失公平”的裁判标准引述', paragraphId: 'p5' },
      { id: 'c4', type: 'logic', desc: '对被申请人质量抗辩的证据采信理由尚不充分', paragraphId: 'p3' }
    ]
  },
  {
    id: 'cg3',
    title: '证据引用准确性',
    items: [
      { id: 'c5', type: 'evidence', desc: '签收单证据编号应与证据目录保持一致（当前引用“证据4”）', paragraphId: 'p3' },
      { id: 'c6', type: 'evidence', desc: '建议补充对账邮件发送人与收件人的身份说明', paragraphId: 'p2' }
    ]
  }
];

export const COMMENT_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'resolved', label: '已处理' },
  { key: 'logic', label: '逻辑' },
  { key: 'evidence', label: '证据' }
];

export const MOCK_COMMENTS = [
  { id: 'cm1', title: '补充争议焦点二裁判规则', content: '建议补写《民法典》关于违约金调整的裁判依据。', status: 'pending', type: 'logic', paragraphId: 'p5' },
  { id: 'cm2', title: '核对主体简称', content: '“申请人公司”建议统一为“申请人北京科技有限公司”。', status: 'resolved', type: 'format', paragraphId: 'p1' },
  { id: 'cm3', title: '证据编号修正', content: '签收单应对应证据4-2，当前正文写成证据4。', status: 'pending', type: 'evidence', paragraphId: 'p3' },
  { id: 'cm4', title: '补充对账邮件说明', content: '可增加邮件时间、收件人岗位、回复确认信息。', status: 'pending', type: 'evidence', paragraphId: 'p2' }
];

export const MOCK_AI_CANDIDATES = {
  continue: '仲裁庭进一步认为，被申请人在收到催告后仍未主动履行付款义务，已构成持续违约。',
  rewrite: '仲裁庭审理后认为：申请人履行供货义务事实清楚，被申请人逾期付款事实成立，应承担违约责任。',
  expand: '结合双方提交的合同文本、签收记录及往来邮件，能够形成完整证据链，足以证明申请人已按约履约，被申请人未在约定期限内付款，违约责任应予确认。',
  simplify: '申请人已供货，被申请人逾期未付款，构成违约。',
  translate: 'The arbitral tribunal finds that the claimant has performed the delivery obligations, while the respondent failed to make payment on schedule and therefore breached the contract.',
  summarize: '本案核心结论为：履约事实成立、逾期付款成立、违约责任成立。',
  check: '建议修订：金额格式统一、术语统一、争议焦点二补充法律依据后再提交合议。',
  custom: '根据您的指令，建议将该段调整为“先述事实，再述规则，最后给出裁判结论”的三段式表述。'
};

export const AI_ACTIONS = [
  { key: 'continue', label: '续写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>', color: '#3B82F6' },
  { key: 'rewrite', label: '改写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>', color: '#8B5CF6' },
  { key: 'expand', label: '扩写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>', color: '#10B981' },
  { key: 'simplify', label: '精简', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6"/><path d="M4 18h6"/><path d="M4 10h16"/></svg>', color: '#F59E0B' },
  { key: 'translate', label: '翻译', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', color: '#6366F1' },
  { key: 'summarize', label: '总结', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>', color: '#EC4899' },
  { key: 'check', label: '检查拼写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 15 2 2 4-4"/><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>', color: '#EF4444' }
];
