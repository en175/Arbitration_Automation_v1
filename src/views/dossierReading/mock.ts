import type {
  CaseInfo,
  ClaimFocusGroup,
  DefenseFocusGroup,
  MaterialItem,
  OriginalAnchorText
} from './config';

export const mockMaterials: MaterialItem[] = [
  { id: 'm1', title: '仲裁申请书', type: 'doc', pageCount: 5 },
  { id: 'm2', title: '被申请人答辩书', type: 'doc', pageCount: 3 },
  { id: 'm3', title: '证据清单（申请人）', type: 'list', pageCount: 1 },
  { id: 'm4', title: '证据 1：购销合同', type: 'evidence', pageCount: 12 },
  { id: 'm5', title: '证据 2：银行转账记录', type: 'evidence', pageCount: 2 },
  { id: 'm6', title: '庭审笔录（第一次）', type: 'transcript', pageCount: 20 },
  { id: 'm7', title: '庭审笔录（第二次）', type: 'transcript', pageCount: 15 },
];

export const mockCaseInfo: CaseInfo = {
  caseNo: '（2024）京仲案字第01234号',
  caseReason: '买卖合同纠纷',
  claimant: '北京科技有限公司',
  respondent: '上海贸易有限公司',
  amount: '1,200,000.00 元',
  status: '组庭审理中',
  mediator: '张三（首席）、李四、王五',
  filingDate: '2024-01-15',
  summary: '申请人主张被申请人未按期支付货款，并要求支付违约金。被申请人抗辩称货物存在质量问题，且已过保修期。',
  risks: ['被申请人主体资格可能存在存疑（曾变更名称）', '申请人发货节点与签收节点存在 2 日时间差', '违约金计算期间与付款宽限期条款可能冲突'],
  todos: ['需确认被申请人送达地址与最新年报地址一致', '核对证据 3 原件与扫描件签章一致性', '补充发票开具时间与货款到期时间对应关系']
};

export const mockClaims: ClaimFocusGroup[] = [
  {
    id: 'focus_1',
    focus: '争议焦点一：货款支付义务是否成立',
    requests: [
      {
        id: 'r1',
        title: '请求支付货款 1,000,000 元',
        elements: [
          { label: '合同基础', content: '《购销合同》第 5 条约定付款期限与验收条件' },
          { label: '履行要件', content: '申请人完成发货并提交签收回执' },
          { label: '违约触发', content: '被申请人逾期 30 日未付款' }
        ],
        facts: ['2023-12-01 双方签订购销合同', '2023-12-08 完成第一批货物签收', '2024-01-10 到期仍未收到货款'],
        evidence: ['证据 1：购销合同', '证据 4：发货单及签收回执', '证据 6：往来对账邮件']
      },
      {
        id: 'r2',
        title: '请求支付逾期利息 86,000 元',
        elements: [
          { label: '计息依据', content: '合同约定逾期按日万分之三计息' },
          { label: '期间范围', content: '2024-01-11 至 2024-02-28' },
          { label: '计算方式', content: '本金 × 日利率 × 实际逾期天数' }
        ],
        facts: ['付款宽限期截止 2024-01-10', '被申请人未提交已付款凭证'],
        evidence: ['证据 1：购销合同', '证据 7：利息计算明细表']
      }
    ]
  },
  {
    id: 'focus_2',
    focus: '争议焦点二：违约金标准与减免条件是否成立',
    requests: [
      {
        id: 'r3',
        title: '请求支付违约金 200,000 元',
        elements: [
          { label: '条款来源', content: '《购销合同》第 9 条违约责任约定' },
          { label: '触发条件', content: '逾期付款超过 15 日即触发违约金' },
          { label: '金额口径', content: '按合同总价 15% 一次性计收' }
        ],
        facts: ['被申请人逾期付款超过 45 日', '双方未签署任何减免补充协议'],
        evidence: ['证据 1：购销合同', '证据 8：催款函与送达回证']
      },
      {
        id: 'r4',
        title: '备选请求：如调减违约金，按实际损失补偿',
        elements: [
          { label: '法律基础', content: '违约责任应覆盖合理损失与追偿成本' },
          { label: '损失构成', content: '资金占用成本、履约融资成本、催收成本' },
          { label: '替代方案', content: '法院调减后按实际损失核算补偿' }
        ],
        facts: ['申请人提交融资利息流水与催收费用凭证', '损失金额高于已主张违约金下限'],
        evidence: ['证据 9：银行融资利息流水', '证据 10：律师函及差旅票据']
      }
    ]
  }
];

export const mockDefense: DefenseFocusGroup[] = [
  {
    id: 'd1',
    focus: '货款支付义务',
    applicantViews: [
      { id: 'd1_a1', text: '签收单显示货物已由被申请人仓管签收并入库。', anchorId: 'anchor_delivery_receipt' },
      { id: 'd1_a2', text: '邮件对账记录中被申请人确认过应付余额。', anchorId: 'anchor_reconciliation_mail' }
    ],
    respondentViews: [
      { id: 'd1_r1', text: '主张型号不符，验收环节已提出异议并保留权利。', anchorId: 'anchor_quality_objection' },
      { id: 'd1_r2', text: '称未收到增值税发票，付款条件尚未成就。', anchorId: 'anchor_invoice_condition' }
    ]
  },
  {
    id: 'd2',
    focus: '违约金是否过高',
    applicantViews: [
      { id: 'd2_a1', text: '违约金条款系双方在同等地位下签署，具有约束力。', anchorId: 'anchor_penalty_clause' },
      { id: 'd2_a2', text: '逾期导致融资成本和项目停摆损失，违约金并未超出损失范围。', anchorId: 'anchor_finance_loss' }
    ],
    respondentViews: [
      { id: 'd2_r1', text: '主张 15% 固定违约金明显偏高，请求依法调减。', anchorId: 'anchor_penalty_reduce' },
      { id: 'd2_r2', text: '称申请人未尽减损义务，损失扩大不应由其承担。', anchorId: 'anchor_loss_mitigation' }
    ]
  }
];

export const mockOriginalAnchors: OriginalAnchorText[] = [
  {
    id: 'anchor_delivery_receipt',
    title: '原文片段-发货签收',
    content: '发货单与签收回执载明：2023年12月8日，被申请人仓储部完成签收，签收人王某，数量与合同约定一致。'
  },
  {
    id: 'anchor_reconciliation_mail',
    title: '原文片段-邮件对账',
    content: '2024年1月5日邮件中，被申请人财务确认应付货款余额 1,000,000 元，并表示春节前安排付款。'
  },
  {
    id: 'anchor_quality_objection',
    title: '原文片段-质量异议',
    content: '被申请人提交《到货检验记录》，主张其中 20% 型号与订单不一致，要求换货后再付款。'
  },
  {
    id: 'anchor_invoice_condition',
    title: '原文片段-发票条件',
    content: '被申请人答辩称合同约定“收票后十日付款”，申请人未在到期前完成发票寄送。'
  },
  {
    id: 'anchor_penalty_clause',
    title: '原文片段-违约条款',
    content: '合同第9条约定：逾期付款超过15日，违约方应按合同总价15%向守约方支付违约金。'
  },
  {
    id: 'anchor_finance_loss',
    title: '原文片段-融资损失',
    content: '申请人提交银行贷款利息流水，显示因应收账款回款延迟新增融资成本 96,500 元。'
  },
  {
    id: 'anchor_penalty_reduce',
    title: '原文片段-调减抗辩',
    content: '被申请人主张违约金已明显高于可能损失，请求参照同类案件水平进行比例调减。'
  },
  {
    id: 'anchor_loss_mitigation',
    title: '原文片段-减损义务',
    content: '被申请人称申请人可通过转售库存降低损失，未及时转售导致损失扩大。'
  }
];

export const mockAssistItems = [
  { id: 'a1', content: '原文定位：合同第 5 条“付款期限”', type: 'ref' },
  { id: 'a2', content: '关键提示：注意核查发票开具日期', type: 'hint' },
  { id: 'a3', content: '引用片段：“...若逾期付款，则按日万分之五...”', type: 'quote' }
];
