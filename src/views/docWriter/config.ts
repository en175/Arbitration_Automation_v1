export const WRITER_TABS = [
  { key: 'ai', label: '智能写作助手' },
  { key: 'check', label: '校对检查' },
  { key: 'comment', label: '人工批注' }
];

/* ========== 模块导航 ========== */
export const DOC_SECTIONS = [
  { key: 'sec-header', label: '首部' },
  { key: 'sec-claims', label: '仲裁请求' },
  { key: 'sec-facts', label: '案件事实' },
  { key: 'sec-defense', label: '答辩' },
  { key: 'sec-investigation', label: '查明' },
  { key: 'sec-analysis', label: '认为' },
  { key: 'sec-ruling', label: '裁决主文' }
];

/* ========== 模块感知 AI 推荐任务 ========== */
export const SECTION_AI_PRESETS: Record<string, { key: string; label: string; desc: string }[]> = {
  'sec-header': [
    { key: 'check-party', label: '核验当事人信息', desc: '比对申请书与答辩书中的主体信息' },
    { key: 'gen-header', label: '补全首部格式', desc: '按仲裁委文书规范补全首部信息' }
  ],
  'sec-claims': [
    { key: 'list-claims', label: '梳理请求事项', desc: '从申请书中提取并结构化请求事项' },
    { key: 'check-amount', label: '核验金额一致性', desc: '比对请求金额与证据材料中的金额' }
  ],
  'sec-facts': [
    { key: 'gen-timeline', label: '梳理事实时间线', desc: '根据证据材料生成时间轴' },
    { key: 'quote-evidence', label: '引用证据材料', desc: '为事实陈述插入对应证据引用' }
  ],
  'sec-defense': [
    { key: 'summarize-defense', label: '归纳答辩要点', desc: '从答辩书中提取核心抗辩主张' },
    { key: 'compare-claims', label: '对比申辩主张', desc: '将申请人主张与被申请人抗辩逐项对比' }
  ],
  'sec-investigation': [
    { key: 'gen-findings', label: '生成查明事实', desc: '综合双方证据生成查明段落' },
    { key: 'check-evidence-chain', label: '检查证据链', desc: '检验查明事实是否有充分证据支撑' }
  ],
  'sec-analysis': [
    { key: 'focus', label: '生成争议焦点', desc: '围绕请求事项提炼争议焦点与审查路径' },
    { key: 'reason', label: '生成裁决理由', desc: '形成"事实-规则-结论"说理段落' },
    { key: 'conflict', label: '检测证据冲突', desc: '扫描金额、时间线、主体信息冲突' }
  ],
  'sec-ruling': [
    { key: 'gen-ruling', label: '生成裁决条款', desc: '根据说理结论生成裁决主文条款' },
    { key: 'check-ruling', label: '检查裁决完整性', desc: '核验裁决条款是否覆盖全部请求' }
  ]
};

export const SECTION_AI_OPTIONS: Record<string, Record<string, { key: string; label: string }[]>> = {
  'sec-analysis': {
    focus: [
      { key: 'pay', label: '货款支付义务' },
      { key: 'interest', label: '利息起算节点' },
      { key: 'penalty', label: '违约金调减标准' }
    ],
    reason: [
      { key: 'support', label: '支持全部请求' },
      { key: 'partial', label: '部分支持请求' },
      { key: 'reject', label: '驳回请求' }
    ],
    conflict: [
      { key: 'amount', label: '金额一致性冲突' },
      { key: 'timeline', label: '时间线倒置冲突' },
      { key: 'subject', label: '主体信息冲突' }
    ]
  },
  'sec-facts': {
    'gen-timeline': [
      { key: 'contract', label: '合同签署至交付' },
      { key: 'payment', label: '付款与催告' }
    ],
    'quote-evidence': [
      { key: 'delivery', label: '交付事实' },
      { key: 'payment-fact', label: '付款事实' }
    ]
  }
};

/* 通用 AI 任务（不随模块切换） */
export const AI_COMMON_ACTIONS = [
  { key: 'focus', label: '生成争议焦点', desc: '围绕请求事项提炼争议焦点与审查路径' },
  { key: 'quote', label: '生成证据引用段落', desc: '按主张输出事实+证据悬浮脚注' },
  { key: 'conflict', label: '检测证据冲突', desc: '扫描金额、时间线、主体信息冲突' },
  { key: 'reason', label: '生成裁决理由', desc: '形成"事实-规则-结论"说理段落' }
];

export const AI_PRESET_ACTIONS = AI_COMMON_ACTIONS;

export const AI_PRESET_OPTIONS: Record<string, { key: string; label: string }[]> = {
  focus: [
    { key: 'pay', label: '货款支付义务' },
    { key: 'interest', label: '利息起算节点' },
    { key: 'penalty', label: '违约金调减标准' }
  ],
  quote: [
    { key: 'pay', label: '货款支付请求' },
    { key: 'quality', label: '质量抗辩' },
    { key: 'penalty', label: '违约金争议' }
  ],
  conflict: [
    { key: 'amount', label: '金额一致性冲突' },
    { key: 'timeline', label: '时间线倒置冲突' },
    { key: 'subject', label: '主体信息冲突' }
  ],
  reason: [
    { key: 'support', label: '支持全部请求' },
    { key: 'partial', label: '部分支持请求' },
    { key: 'reject', label: '驳回请求' }
  ]
};

export const AI_PRESET_RESPONSES: Record<string, Record<string, string>> = {
  focus: {
    pay: '争议焦点建议：1）申请人是否已完成合同项下供货义务；2）被申请人拒付是否具备合同或法定依据；3）逾期付款责任承担范围如何确定。',
    interest: '争议焦点建议：1）利息起算日应以约定付款期限届满日还是催告日计算；2）申请日期与合同日期矛盾是否影响起算逻辑；3）利息计算区间是否与证据一致。',
    penalty: '争议焦点建议：1）违约金条款效力是否成立；2）约定比例是否明显高于实际损失；3）是否需要基于行业利润率与损失证据进行调减。'
  },
  quote: {
    pay: '证据引用段落：申请人提交《购销合同》与《发货签收回执》能够相互印证其已完成交付义务，且《对账邮件》进一步确认应付货款余额。故对货款支付请求具备事实基础。',
    quality: '证据引用段落：被申请人以《质量异议说明》主张型号不符，但其提交时间与签收后异议期限是否一致仍需复核。现有材料尚不足以完全否定申请人履约事实。',
    penalty: '证据引用段落：合同违约条款明确约定违约金计算方式，同时被申请人提交调减意见及行业利润率材料。建议在确认实际损失后，对违约金幅度作比例审查。'
  },
  conflict: {
    amount: '冲突检测结果：高风险。诉请本金与分项汇总存在 12,000 元差异，建议先补齐计算明细，否则阻断对应段落入稿。',
    timeline: '冲突检测结果：高风险。申请日期早于合同签署日期，时间线倒置，建议先复核日期字段并保留校验记录。',
    subject: '冲突检测结果：高风险。庭审陈述主体与答辩书落款主体不一致，需先完成主体信息统一后再采纳该证据结论。'
  },
  reason: {
    support: '裁决理由建议：在申请人履约事实充分、被申请人抗辩证据不足的前提下，依据合同约定及民法典相关条款，对申请人请求予以支持。',
    partial: '裁决理由建议：对货款本金请求予以支持；对利息及违约金部分，结合起算依据和损失证明程度，酌情部分支持。',
    reject: '裁决理由建议：申请人关键证据在金额与主体信息上存在未消除冲突，尚不足以达到高度盖然性标准，故对相应请求不予支持。'
  },
  'check-party': { _default: '当事人信息核验结果：申请人全称、被申请人全称、法定代表人姓名与申请书一致。建议确认被申请人住所地是否为最新工商登记地址。' },
  'gen-header': { _default: '首部格式已按照仲裁委标准补全：案号居中、当事人信息分段、委托代理人独立段落。' },
  'list-claims': { _default: '请求事项梳理：1）支付货款 1,180,000 元；2）支付违约金 20,000 元；3）仲裁费用由被申请人承担。共 3 项请求。' },
  'check-amount': { _default: '金额核验：合同总价 1,200,000 元，已付 20,000 元，请求金额 1,180,000 元，差额计算一致。' },
  'gen-timeline': { contract: '时间线：2023-12-01 签订合同 → 2023-12-08 交付货物 → 2024-01-05 对账确认 → 2024-01-08 支付 20,000 元 → 2024-01-10 发出催款函 → 2024-01-11 催款函签收。', payment: '付款时间线：约定付款期限 2024-01-07（收货后30日）→ 实际付款 2024-01-08（20,000元）→ 催告 2024-01-10 → 至今未付剩余 1,180,000 元。' },
  'quote-evidence': { delivery: '交付事实证据引用：发货单载明 2023-12-08 发出全部货物，签收回执有被申请人签章确认，载明"货物数量与合同一致，型号待进一步验收"。', 'payment-fact': '付款事实证据引用：银行流水显示 2024-01-08 支付 20,000 元，备注"货款"；对账邮件确认尚欠 1,180,000 元。' },
  'summarize-defense': { _default: '答辩要点归纳：1）质量异议——约 20% 货物型号不符；2）违约金过高请求调减；3）主体责任抗辩——实际签收方为关联公司。' },
  'compare-claims': { _default: '申辩对比：货款请求 vs 质量异议（被申请人庭审已弱化）；违约金请求 vs 调减主张（被申请人未举证"明显过高"）；仲裁费用 vs 主体抗辩（签收回执有被申请人公章）。' },
  'gen-findings': { _default: '查明事实草稿已生成，涵盖合同签订、货物交付、部分付款、催告送达及庭审陈述五个事实节点。' },
  'check-evidence-chain': { _default: '证据链检查：交付→签收→对账→催告 链条完整；质量异议缺少退换货凭证；主体抗辩与签收回执公章矛盾。' },
  'gen-ruling': { _default: '裁决条款草稿：一、支付货款 1,180,000 元；二、支付违约金 20,000 元；三、仲裁费 25,000 元由被申请人承担。' },
  'check-ruling': { _default: '裁决完整性检查：3 项请求均已在裁决主文中回应。建议补充履行期限表述（"自本裁决书送达之日起十五日内"）。' }
};

/* ========== 证据材料 ========== */
export interface EvidenceItem {
  id: string;
  claim: string;
  excerpt: string;
  compliance: 'ok' | 'warning';
  conflictLevel: 'none' | 'medium' | 'high';
  conflictNote: string;
  quoted?: boolean;
  quoteCount?: number;
}

export interface MaterialItem {
  id: string;
  title: string;
  type: string;
  source: string;
  sourceParty: 'applicant' | 'respondent' | 'both' | 'tribunal';
  submittedAt: string;
  fileType?: string;
  fileSize?: string;
  evidenceItems: EvidenceItem[];
}

export const SOURCE_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'applicant', label: '申请方' },
  { key: 'respondent', label: '被申请方' },
  { key: 'tribunal', label: '仲裁庭' }
];

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    id: 'w1',
    title: '仲裁申请书',
    type: 'doc',
    source: '申请人提交',
    sourceParty: 'applicant',
    submittedAt: '2024-01-15',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    evidenceItems: [
      { id: 'w1-e1', claim: '货款支付请求', excerpt: '申请人主张被申请人应支付货款人民币 1,180,000 元及逾期利息。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w1-e2', claim: '利息起算日主张', excerpt: '申请人主张利息自 2024-01-11 起按全国银行间同业拆借中心公布的贷款市场报价利率计算。', compliance: 'warning', conflictLevel: 'high', conflictNote: '利息起算日早于违约日期 2024-01-10，时间逻辑冲突。' },
      { id: 'w1-e3', claim: '违约金请求', excerpt: '申请人依据合同第 8 条约定，主张被申请人支付逾期付款违约金人民币 20,000 元。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' }
    ]
  },
  {
    id: 'w2',
    title: '被申请人答辩书',
    type: 'doc',
    source: '被申请人提交',
    sourceParty: 'respondent',
    submittedAt: '2024-02-02',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    evidenceItems: [
      { id: 'w2-e1', claim: '质量抗辩主张', excerpt: '被申请人称到货后发现约 20% 货物型号与合同约定不符，已在 3 日内书面通知申请人。', compliance: 'ok', conflictLevel: 'medium', conflictNote: '与签收回执确认的数量和型号记录存在不一致。' },
      { id: 'w2-e2', claim: '违约金调减主张', excerpt: '被申请人认为合同约定违约金过高，请求仲裁庭依据实际损失酌情调减。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w2-e3', claim: '主体责任抗辩', excerpt: '被申请人称实际签收方为其关联公司，非答辩书落款主体，要求明确责任承担方。', compliance: 'warning', conflictLevel: 'high', conflictNote: '答辩书落款主体与庭审陈述主体存在差异，属高风险项。' }
    ]
  },
  {
    id: 'w3',
    title: '购销合同',
    type: 'contract',
    source: '双方签署',
    sourceParty: 'both',
    submittedAt: '2023-12-01',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    evidenceItems: [
      { id: 'w3-e1', claim: '合同价款约定', excerpt: '合同约定货物总价款人民币 1,200,000 元，付款期为收货验收后 30 日内一次性支付。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w3-e2', claim: '违约金条款', excerpt: '合同第 8 条约定：逾期付款的，买方应按未付金额每日万分之五向卖方支付违约金。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w3-e3', claim: '仲裁条款', excerpt: '合同第 12 条约定：因本合同发生争议，双方同意提交北京仲裁委员会仲裁。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' }
    ]
  },
  {
    id: 'w4',
    title: '发货单与签收回执',
    type: 'evidence',
    source: '申请人提交',
    sourceParty: 'applicant',
    submittedAt: '2023-12-08',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    evidenceItems: [
      { id: 'w4-e1', claim: '交付事实', excerpt: '发货单载明 2023 年 12 月 8 日发出全部合同货物，签收回执有被申请人签章确认。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w4-e2', claim: '签收数量确认', excerpt: '签收回执载明"货物数量与合同一致，型号待进一步验收"，被申请人经办人签字。', compliance: 'ok', conflictLevel: 'medium', conflictNote: '签收回执注明"型号待验收"，与被申请人质量抗辩存在关联。' }
    ]
  },
  {
    id: 'w5',
    title: '银行转账记录',
    type: 'evidence',
    source: '申请人提交',
    sourceParty: 'applicant',
    submittedAt: '2024-01-08',
    fileType: 'PDF',
    fileSize: '680 KB',
    evidenceItems: [
      { id: 'w5-e1', claim: '部分付款事实', excerpt: '银行流水显示被申请人于 2024-01-08 支付人民币 20,000 元，备注"货款"。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' }
    ]
  },
  {
    id: 'w6',
    title: '催款函及快递签收记录',
    type: 'evidence',
    source: '申请人提交',
    sourceParty: 'applicant',
    submittedAt: '2024-01-10',
    fileType: 'PDF',
    fileSize: '920 KB',
    evidenceItems: [
      { id: 'w6-e1', claim: '催告送达', excerpt: '催款函载明要求被申请人于 3 日内支付剩余货款 1,180,000 元，快递单显示已签收。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w6-e2', claim: '催告时间节点', excerpt: '催款函发出日为 2024-01-10，签收日为 2024-01-11，与利息起算日关联。', compliance: 'warning', conflictLevel: 'medium', conflictNote: '催告送达日期是否可作为利息起算节点，需结合合同约定判断。' }
    ]
  },
  {
    id: 'w7',
    title: '庭审笔录（第一次）',
    type: 'doc',
    source: '仲裁庭记录',
    sourceParty: 'tribunal',
    submittedAt: '2024-03-01',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    evidenceItems: [
      { id: 'w7-e1', claim: '对账事实确认', excerpt: '庭审中双方确认 2024-01-05 邮件曾就应付款余额进行对账，被申请人认可尚欠货款。', compliance: 'ok', conflictLevel: 'none', conflictNote: '' },
      { id: 'w7-e2', claim: '质量异议庭审陈述', excerpt: '被申请人庭审中称"型号不符仅涉及部分批次，不影响整体使用"，与答辩书立场存在差异。', compliance: 'warning', conflictLevel: 'medium', conflictNote: '被申请人庭审陈述弱化了答辩书中的质量抗辩主张。' },
      { id: 'w7-e3', claim: '主体身份陈述', excerpt: '被申请人庭审陈述"签收方为上海贸易有限公司"，与答辩书落款主体"上海贸易发展有限公司"存在差异。', compliance: 'warning', conflictLevel: 'high', conflictNote: '主体名称不一致，属于高风险必处理项。' }
    ]
  }
];

export const MOCK_AI_MSGS = [
  { id: 'm1', role: 'ai', content: '您好，我是文书写作助手。请选择下方任务卡和预选项，我将按仲裁委文书规范生成建议。' }
];

export const MOCK_EDITOR_CONTENT = `
  <h1 style="text-align: center">裁 决 书</h1>
  <p data-paragraph-id="p-caseno" style="text-align: center">（2026）京仲裁字第01876号</p>

  <h2 data-paragraph-id="sec-header">一、首部</h2>
  <p data-paragraph-id="p-applicant"><strong>申请人：</strong>北京科技有限公司，住所地北京市朝阳区某街道101号。法定代表人王某，执行董事兼总经理。</p>
  <p data-paragraph-id="p-agent1"><strong>委托代理人：</strong>李某，北京某律师事务所律师。</p>
  <p data-paragraph-id="p-respondent"><strong>被申请人：</strong>上海贸易有限公司，住所地上海市浦东新区某路200号。法定代表人赵某，总经理。</p>

  <h2 data-paragraph-id="sec-claims">二、仲裁请求</h2>
  <p data-paragraph-id="p-claim1">申请人向本委提出如下仲裁请求：</p>
  <p data-paragraph-id="p-claim2">1. 裁决被申请人向申请人支付货款人民币 1,180,000.00 元；</p>
  <p data-paragraph-id="p-claim3">2. 裁决被申请人向申请人支付逾期付款违约金人民币 20,000.00 元；</p>
  <p data-paragraph-id="p-claim4">3. 裁决本案仲裁费用由被申请人承担。</p>

  <h2 data-paragraph-id="sec-facts">三、案件事实</h2>
  <p data-paragraph-id="p-fact1">申请人诉称：2023年12月1日，申请人与被申请人签订《购销合同》（合同编号：BJ2023-1201），约定由申请人向被申请人供应电子元器件一批，合同总价款人民币 1,200,000.00 元，付款期限为被申请人收货验收后30日内一次性支付。</p>
  <p data-paragraph-id="p-fact2">申请人已于 2023年12月8日 完成全部货物交付，被申请人经办人在签收回执上签字确认，载明"货物数量与合同一致，型号待进一步验收"。</p>
  <p data-paragraph-id="p-fact3">被申请人于 2024年1月8日 支付货款人民币 20,000.00 元，此后经申请人多次催告，被申请人未再支付剩余货款 1,180,000.00 元。申请人于 2024年1月10日 发出书面催款函，快递签收记录显示被申请人已于次日签收。</p>

  <h2 data-paragraph-id="sec-defense">四、被申请人答辩</h2>
  <p data-paragraph-id="p-defense1">被申请人辩称：</p>
  <p data-paragraph-id="p-defense2">1. 到货后发现约 20% 货物型号与合同约定不符，被申请人已在签收后 3 日内书面通知申请人，构成有效质量异议；</p>
  <p data-paragraph-id="p-defense3">2. 合同约定违约金标准为未付金额每日万分之五，该比例明显过高，请求仲裁庭酌情调减；</p>
  <p data-paragraph-id="p-defense4">3. 实际签收方为被申请人关联公司，并非答辩书落款主体，请求仲裁庭明确责任承担方。</p>

  <h2 data-paragraph-id="sec-investigation">五、仲裁庭查明</h2>
  <p data-paragraph-id="p-inv1">经审理查明：</p>
  <p data-paragraph-id="p-inv2">2023年12月1日，申请人与被申请人签订《购销合同》，约定货物规格、数量、总价款 1,200,000.00 元及付款方式。合同第 8 条约定逾期付款违约金按未付金额每日万分之五计算；合同第 12 条约定因履行争议提交北京仲裁委员会仲裁。</p>
  <p data-paragraph-id="p-inv3">2023年12月8日，申请人完成全部货物交付，签收回执有被申请人经办人签字并加盖公章。签收回执载明货物数量与合同一致，但注明"型号待进一步验收"。</p>
  <p data-paragraph-id="p-inv4">2024年1月5日，双方通过电子邮件确认应付货款余额为 1,180,000.00 元。2024年1月8日，被申请人支付 20,000.00 元。此后经催告未再支付。</p>
  <p data-paragraph-id="p-inv5">庭审中被申请人称"型号不符仅涉及部分批次，不影响整体使用"，该陈述与答辩书中的质量抗辩立场存在明显差异。</p>

  <h2 data-paragraph-id="sec-analysis">六、仲裁庭认为</h2>
  <p data-paragraph-id="p-focus-title"><strong>争议焦点一：被申请人是否应支付剩余货款</strong></p>
  <p data-paragraph-id="p-focus1">仲裁庭认为，申请人已提交发货单、签收回执和对账邮件形成完整证据链，足以证明其已按合同约定完成交付义务。被申请人虽提出质量异议，但其庭审陈述已弱化答辩立场，且未提交充分的退换货或减价依据。综合考量，被申请人应支付剩余货款 1,180,000.00 元。</p>
  <p data-paragraph-id="p-focus-title2"><strong>争议焦点二：违约金是否应予调减</strong></p>
  <p data-paragraph-id="p-focus2">关于违约金标准，合同约定为未付金额每日万分之五。仲裁庭注意到该比例折合年化约 18.25%，结合当前市场利率水平及申请人实际损失情况，该比例尚在合理范围内。被申请人未能举证证明约定违约金"明显过高"，故仲裁庭对被申请人的调减请求不予支持。</p>
  <p data-paragraph-id="p-focus-title3"><strong>争议焦点三：责任主体认定</strong></p>
  <p data-paragraph-id="p-focus3">关于被申请人提出的主体抗辩，仲裁庭认为合同签署方为被申请人，签收回执亦加盖被申请人公章，对账邮件确认方为被申请人经办人。被申请人关于"关联公司签收"的主张缺乏充分证据支持，不足以免除其合同项下的付款义务。</p>

  <h2 data-paragraph-id="sec-ruling">七、裁决主文</h2>
  <p data-paragraph-id="p-ruling1">综上，仲裁庭裁决如下：</p>
  <p data-paragraph-id="p-ruling2">一、被申请人上海贸易有限公司于本裁决书送达之日起十五日内，向申请人北京科技有限公司支付货款人民币 1,180,000.00 元；</p>
  <p data-paragraph-id="p-ruling3">二、被申请人上海贸易有限公司于本裁决书送达之日起十五日内，向申请人北京科技有限公司支付逾期付款违约金人民币 20,000.00 元；</p>
  <p data-paragraph-id="p-ruling4">三、本案仲裁费用人民币 25,000.00 元，由被申请人承担。</p>
  <p data-paragraph-id="p-ruling5" style="text-align: right">首席仲裁员：王某某</p>
  <p data-paragraph-id="p-ruling6" style="text-align: right">仲裁员：李某某　张某某</p>
  <p data-paragraph-id="p-ruling7" style="text-align: right">二〇二六年三月十日</p>
`;

export const MOCK_CHECK_GROUPS = [
  {
    id: 'cg1',
    title: '格式与术语',
    items: [
      { id: 'c1', type: 'format', desc: '案号格式建议核对是否与仲裁委登记系统一致', paragraphId: 'p-caseno', paragraphLabel: '案号', severity: 'warning' },
      { id: 'c2', type: 'format', desc: '裁决主文金额需与事实查明段金额严格一致', paragraphId: 'p-ruling2', paragraphLabel: '裁决主文第一项', severity: 'error' },
      { id: 'c3', type: 'format', desc: '"本委"与"仲裁庭"称谓需全文统一', paragraphId: 'p-claim1', paragraphLabel: '仲裁请求首段', severity: 'warning' }
    ]
  },
  {
    id: 'cg2',
    title: '逻辑与论证',
    items: [
      { id: 'c4', type: 'logic', desc: '争议焦点二应引用《民法典》第585条关于违约金调整的裁判依据', paragraphId: 'p-focus2', paragraphLabel: '争议焦点二', severity: 'error' },
      { id: 'c5', type: 'logic', desc: '被申请人质量抗辩的庭审陈述变化需更充分说理', paragraphId: 'p-inv5', paragraphLabel: '查明·庭审陈述', severity: 'warning' },
      { id: 'c6', type: 'logic', desc: '主体认定需引用签收回执和对账邮件具体内容', paragraphId: 'p-focus3', paragraphLabel: '争议焦点三', severity: 'warning' }
    ]
  },
  {
    id: 'cg3',
    title: '证据引用',
    items: [
      { id: 'c7', type: 'evidence', desc: '签收回执"型号待进一步验收"注明应在查明段完整引述', paragraphId: 'p-inv3', paragraphLabel: '查明·签收回执', severity: 'warning' },
      { id: 'c8', type: 'evidence', desc: '对账邮件的发送人、收件人岗位信息建议补充', paragraphId: 'p-inv4', paragraphLabel: '查明·对账邮件', severity: 'warning' },
      { id: 'c9', type: 'evidence', desc: '催款函签收时间与利息起算关联需在说理段明确', paragraphId: 'p-fact3', paragraphLabel: '事实·催告送达', severity: 'error' }
    ]
  }
];

export const COMMENT_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'resolved', label: '已处理' }
];

export const MOCK_COMMENTS = [
  { id: 'cm1', title: '补充违约金裁判依据', content: '争议焦点二应引用《民法典》第五百八十五条第二款关于违约金调整的规定，增强说理充分性。', status: 'pending', paragraphId: 'p-focus2', author: '张仲裁员', createdAt: '2026-03-08 14:30' },
  { id: 'cm2', title: '统一主体全称', content: '"申请人"首次出现时建议写全称"申请人北京科技有限公司"，此后可简称"申请人"。', status: 'resolved', paragraphId: 'p-applicant', author: '李秘书', createdAt: '2026-03-07 10:15' },
  { id: 'cm3', title: '签收回执引述不完整', content: '查明段引述签收回执时应包含"型号待进一步验收"这一关键注明，该内容与被申请人质量抗辩直接相关。', status: 'pending', paragraphId: 'p-inv3', author: '张仲裁员', createdAt: '2026-03-08 15:00' },
  { id: 'cm4', title: '对账邮件细节待补充', content: '对账邮件的发送人岗位、收件人确认回复内容建议在查明段补充，增强证据采信说服力。', status: 'pending', paragraphId: 'p-inv4', author: '王首席', createdAt: '2026-03-09 09:20' },
  { id: 'cm5', title: '仲裁费用金额核实', content: '仲裁费用25,000元需与立案缴费凭证核对，确认金额准确后再写入裁决主文。', status: 'pending', paragraphId: 'p-ruling4', author: '李秘书', createdAt: '2026-03-09 11:00' }
];

export const MOCK_AI_CANDIDATES: Record<string, string> = {
  continue: '仲裁庭进一步认为，被申请人在收到催告后仍未主动履行付款义务，已构成持续违约。',
  rewrite: '仲裁庭审理后认为：申请人履行供货义务事实清楚，被申请人逾期付款事实成立，应承担违约责任。',
  expand: '结合双方提交的合同文本、签收记录及往来邮件，能够形成完整证据链，足以证明申请人已按约履约，被申请人未在约定期限内付款，违约责任应予确认。',
  simplify: '申请人已供货，被申请人逾期未付款，构成违约。',
  summarize: '本案核心结论为：履约事实成立、逾期付款成立、违约责任成立。',
  custom: '根据您的指令，建议将该段调整为"先述事实，再述规则，最后给出裁判结论"的三段式表述。'
};

export const AI_ACTIONS = [
  { key: 'continue', label: '续写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>', color: '#3B82F6' },
  { key: 'rewrite', label: '改写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>', color: '#8B5CF6' },
  { key: 'expand', label: '扩写', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>', color: '#10B981' },
  { key: 'simplify', label: '精简', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6"/><path d="M4 18h6"/><path d="M4 10h16"/></svg>', color: '#F59E0B' },
  { key: 'summarize', label: '总结', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>', color: '#EC4899' }
];
