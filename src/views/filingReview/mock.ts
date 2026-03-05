import type { EvidenceAnchor, FilingIssueGroup, RuleCheckItem, VerifyFieldMeta } from './config';

export const mockMaterials = [
  { id: 'f1', title: '仲裁申请书', fileType: 'PDF', status: 'normal', required: true, tip: '已提交原件扫描，签章完整' },
  { id: 'f2', title: '申请人身份证明', fileType: 'PDF', status: 'normal', required: true, tip: '营业执照与法定代表人信息一致' },
  { id: 'f3', title: '被申请人身份信息', fileType: 'PDF', status: 'missing', required: true },
  { id: 'f4', title: '仲裁协议/条款', fileType: 'PDF', status: 'normal', required: true, tip: '合同第12条约定提交北京仲裁委员会' },
  { id: 'f5', title: '证据清单', fileType: 'XLSX', status: 'normal', required: false, tip: '共10项证据，含银行流水与发货单' },
  { id: 'f6', title: '授权委托书', fileType: 'PDF', status: 'normal', required: false, tip: '授权事项包含立案与和解权限' },
  { id: 'f7', title: '发票开具与寄送凭证', fileType: 'JPG', status: 'missing', required: false }
];

export const mockVerifyData = {
  caseNo: '（2026）穗仲案字第01876号',
  caseType: '买卖合同纠纷',
  filingChannel: '线上立案',
  applicant: '北京科技有限公司',
  applicantCreditCode: '91110108MA01A2B3C9',
  applicantLegalRep: '王某',
  respondent: '上海贸易有限公司',
  respondentLegalRep: '赵某',
  arbitrationClause: '双方因本合同发生争议，提交北京仲裁委员会仲裁',
  court: '北京仲裁委员会',
  clauseValid: '有效（建议复核签署页完整性）',
  claimType: '货款+违约金',
  amount: '1,200,000.00',
  currency: '人民币',
  interestStartDate: '2024-01-11',
  claimDate: '2024-01-15',
  contractSignedDate: '2023-12-01',
  deliveryDate: '2023-12-08',
  defaultDate: '2024-01-10',
  contact: '北京市朝阳区某街道101号',
  postalCode: '100020',
  contactPerson: '李某（委托代理人）',
  contactPhone: '138-0000-7621',
  respondentCreditCode: '91310000MA1K23AB9X'
};

export const mockIssueGroups: FilingIssueGroup[] = [
  {
    id: 'g1',
    title: '材料缺失',
    type: 'missing_material',
    items: [
      {
        id: 'g1_i1',
        type: 'missing_material',
        desc: '缺少被申请人最新工商登记信息（近30天），主体存续状态无法确认',
        severity: 'high',
        fieldKey: 'respondentCreditCode'
      },
      {
        id: 'g1_i2',
        type: 'missing_material',
        desc: '缺少发票寄送凭证，影响付款条件是否成就的判断',
        severity: 'medium',
        fieldKey: 'claimDate'
      }
    ]
  },
  {
    id: 'g2',
    title: '信息不一致',
    type: 'inconsistent_info',
    items: [
      {
        id: 'g2_i1',
        type: 'inconsistent_info',
        desc: '申请书主张金额 120 万，与证据汇总 118 万存在差异',
        severity: 'high',
        fieldKey: 'amount'
      },
      {
        id: 'g2_i2',
        type: 'inconsistent_info',
        desc: '送达地址“101号”与合同“101号A座”不一致，建议统一口径',
        severity: 'medium',
        fieldKey: 'contact'
      }
    ]
  },
  {
    id: 'g3',
    title: '主体资格',
    type: 'subject_error',
    items: [
      {
        id: 'g3_i1',
        type: 'subject_error',
        desc: '被申请人统一社会信用代码末位校验失败，疑似录入错误',
        severity: 'high',
        fieldKey: 'respondentCreditCode'
      },
      {
        id: 'g3_i2',
        type: 'subject_error',
        desc: '申请人名称存在历史简称，建议统一为营业执照全称',
        severity: 'low',
        fieldKey: 'applicant'
      }
    ]
  },
  {
    id: 'g4',
    title: '请求事项',
    type: 'claim_error',
    items: [
      {
        id: 'g4_i1',
        type: 'claim_error',
        desc: '利息起算日早于违约日期，时间逻辑冲突需修正',
        severity: 'medium',
        fieldKey: 'interestStartDate'
      },
      {
        id: 'g4_i2',
        type: 'claim_error',
        desc: '请求事项存在“货款+违约金”与“仅货款”两种表述，需统一',
        severity: 'low',
        fieldKey: 'claimType'
      }
    ]
  }
];

export const mockVerifyFieldMeta: Record<string, VerifyFieldMeta> = {
  caseNo: { status: 'match', note: '与登记系统一致' },
  caseType: { status: 'match', note: '与申请书案由一致' },
  filingChannel: { status: 'match', note: '线上受理流水完整' },
  applicant: { status: 'match', note: '名称与营业执照一致' },
  applicantCreditCode: { status: 'match', note: '通过18位校验' },
  applicantLegalRep: { status: 'match', note: '执照与授权书一致' },
  respondent: { status: 'risk', note: '存在历史简称，建议统一全称' },
  respondentCreditCode: { status: 'risk', note: '末位校验失败，建议复核原件' },
  respondentLegalRep: { status: 'missing', note: '缺少最新工商截图' },
  arbitrationClause: { status: 'match', note: '条款内容明确' },
  court: { status: 'match', note: '机构名称规范' },
  clauseValid: { status: 'risk', note: '签署页扫描件清晰度不足' },
  claimType: { status: 'risk', note: '不同材料口径不一致' },
  amount: { status: 'risk', note: '申请书120万，证据汇总118万' },
  currency: { status: 'match', note: '币种明确为人民币' },
  interestStartDate: { status: 'risk', note: '起算日早于违约日' },
  claimDate: { status: 'match', note: '事实段落可定位' },
  contractSignedDate: { status: 'match', note: '与合同原文一致' },
  deliveryDate: { status: 'match', note: '发货单可回溯' },
  defaultDate: { status: 'match', note: '催告函日期一致' },
  contact: { status: 'risk', note: '地址后缀存在A座差异' },
  postalCode: { status: 'missing', note: '申请书未填写邮编' },
  contactPerson: { status: 'match', note: '代理人信息完整' },
  contactPhone: { status: 'match', note: '联系电话格式正确' }
};

export const mockEvidenceAnchors: Record<string, EvidenceAnchor> = {
  amount: {
    sourceName: '证据汇总表',
    page: 5,
    anchor: '证据汇总-金额统计段',
    snippet: '证据汇总显示应付货款合计为 1,180,000.00 元，与申请书主张金额存在 20,000 元差异。'
  },
  interestStartDate: {
    sourceName: '申请书事实部分',
    page: 3,
    anchor: '事实与理由-利息主张段',
    snippet: '申请人主张自 2024/01/11 起计算利息，但违约事实描述为 2024/01/10 后持续逾期。'
  },
  respondentCreditCode: {
    sourceName: '工商信息截图',
    page: 2,
    anchor: '主体信息-统一社会信用代码',
    snippet: '截图中统一社会信用代码末位与录入值不一致，建议按原件复核后统一。'
  },
  contact: {
    sourceName: '合同首页',
    page: 4,
    anchor: '合同信息-送达地址',
    snippet: '合同记载地址为“101号A座”，申请书填写为“101号”，存在后缀差异。'
  },
  clauseValid: {
    sourceName: '购销合同',
    page: 6,
    anchor: '争议解决条款',
    snippet: '仲裁条款约定明确，但签署页印章边缘模糊，建议补充清晰扫描件。'
  }
};

export const mockRuleChecks: RuleCheckItem[] = [
  {
    id: 'r1',
    title: '金额口径一致性校验',
    level: 'high',
    result: 'hit',
    formula: '申请书金额(1,200,000) - 证据汇总金额(1,180,000) = 20,000',
    conclusion: '金额差异 20,000 元，超过容差阈值 1,000 元，触发高风险。',
    relatedFields: ['amount']
  },
  {
    id: 'r2',
    title: '利息起算日逻辑校验',
    level: 'medium',
    result: 'hit',
    formula: '利息起算日(2024/01/11) > 首次违约日(2024/01/10)',
    conclusion: '时间顺序满足“起算日晚于违约日”，但需补充违约起算依据材料。',
    relatedFields: ['interestStartDate', 'defaultDate']
  },
  {
    id: 'r3',
    title: '统一社会信用代码校验',
    level: 'high',
    result: 'hit',
    formula: '18位代码校验位计算结果 ≠ 当前录入末位',
    conclusion: '被申请人代码疑似录入错误，建议按最新工商信息回填。',
    relatedFields: ['respondentCreditCode']
  }
];
