export const VERIFY_FIELDS = [
  { key: 'caseNo', label: '案件编号', required: true, editable: false, section: '案件基础', inputType: 'text', source: '立案登记表' },
  { key: 'caseType', label: '案件类型', required: true, editable: true, section: '案件基础', inputType: 'text', source: '申请书首页' },
  { key: 'filingChannel', label: '立案渠道', required: true, editable: true, section: '案件基础', inputType: 'text', source: '受理登记系统' },
  { key: 'applicant', label: '申请人名称', required: true, editable: true, section: '主体资格', inputType: 'text', source: '申请书正文' },
  { key: 'applicantCreditCode', label: '申请人统一社会信用代码', required: true, editable: true, section: '主体资格', inputType: 'text', source: '营业执照' },
  { key: 'applicantLegalRep', label: '申请方法定代表人', required: true, editable: true, section: '主体资格', inputType: 'text', source: '营业执照' },
  { key: 'respondent', label: '被申请人名称', required: true, editable: true, section: '主体资格', inputType: 'text', source: '申请书正文' },
  { key: 'respondentCreditCode', label: '被申请人统一社会信用代码', required: true, editable: true, section: '主体资格', inputType: 'text', source: '企业信息公示材料' },
  { key: 'respondentLegalRep', label: '被申请方法定代表人', required: false, editable: true, section: '主体资格', inputType: 'text', source: '企业信息公示材料' },
  { key: 'arbitrationClause', label: '仲裁条款摘要', required: true, editable: true, section: '仲裁条款', inputType: 'text', source: '合同条款第12条' },
  { key: 'court', label: '约定管辖机构', required: true, editable: true, section: '仲裁条款', inputType: 'text', source: '合同条款第12条' },
  { key: 'clauseValid', label: '条款效力初判', required: true, editable: true, section: '仲裁条款', inputType: 'text', source: '规则引擎判断' },
  { key: 'claimType', label: '请求类型', required: true, editable: true, section: '请求事项', inputType: 'text', source: '申请请求项' },
  { key: 'amount', label: '请求金额（元）', required: true, editable: true, section: '请求事项', inputType: 'text', source: '申请请求项' },
  { key: 'currency', label: '币种', required: true, editable: true, section: '请求事项', inputType: 'text', source: '申请请求项' },
  { key: 'interestStartDate', label: '利息起算日', required: false, editable: true, section: '请求事项', inputType: 'date', source: '申请请求项' },
  { key: 'claimDate', label: '请求发生日期', required: true, editable: true, section: '请求事项', inputType: 'date', source: '申请书事实部分' },
  { key: 'contractSignedDate', label: '合同签订日期', required: true, editable: true, section: '关键日期', inputType: 'date', source: '购销合同' },
  { key: 'deliveryDate', label: '首次交付日期', required: false, editable: true, section: '关键日期', inputType: 'date', source: '发货单' },
  { key: 'defaultDate', label: '首次违约日期', required: true, editable: true, section: '关键日期', inputType: 'date', source: '催告函与对账记录' },
  { key: 'contact', label: '送达地址', required: true, editable: true, section: '送达信息', inputType: 'text', source: '申请书联系信息' },
  { key: 'postalCode', label: '邮政编码', required: false, editable: true, section: '送达信息', inputType: 'text', source: '申请书联系信息' },
  { key: 'contactPerson', label: '送达联系人', required: true, editable: true, section: '送达信息', inputType: 'text', source: '授权委托书' },
  { key: 'contactPhone', label: '送达联系电话', required: true, editable: true, section: '送达信息', inputType: 'text', source: '授权委托书' }
];

export const ISSUE_TYPES = [
  { key: 'missing_material', label: '材料缺失' },
  { key: 'inconsistent_info', label: '信息不一致' },
  { key: 'subject_error', label: '主体信息异常' },
  { key: 'claim_error', label: '金额/请求异常' },
];

export interface VerifyFieldDef {
  key: string;
  label: string;
  required: boolean;
  editable: boolean;
  section: string;
  inputType: string;
  source: string;
}

export interface FilingIssueItem {
  id: string;
  type: string;
  desc: string;
  severity: string;
  fieldKey: string;
}

export interface FilingIssueGroup {
  id: string;
  title: string;
  type: string;
  items: FilingIssueItem[];
}

export interface VerifyFieldMeta {
  status: 'match' | 'risk' | 'missing';
  note: string;
}

export interface EvidenceAnchor {
  sourceName: string;
  page: number;
  anchor: string;
  snippet: string;
}

export interface RuleCheckItem {
  id: string;
  title: string;
  level: 'high' | 'medium' | 'low';
  result: 'hit' | 'pass';
  formula: string;
  conclusion: string;
  relatedFields: string[];
}
