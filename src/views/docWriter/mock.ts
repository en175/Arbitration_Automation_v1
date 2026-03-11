import {
  AI_PRESET_ACTIONS,
  AI_PRESET_OPTIONS,
  AI_PRESET_RESPONSES,
  MOCK_AI_CANDIDATES,
  MOCK_AI_MSGS,
  MOCK_CHECK_GROUPS,
  MOCK_COMMENTS,
  MOCK_EDITOR_CONTENT,
  MOCK_MATERIALS,
  SECTION_AI_PRESETS,
  SECTION_AI_OPTIONS
} from './config';

export const mockMaterials = MOCK_MATERIALS;
export const mockAiMsgs = MOCK_AI_MSGS;
export const mockAiPresetActions = AI_PRESET_ACTIONS;
export const mockAiPresetOptions = AI_PRESET_OPTIONS;
export const mockCheckGroups = MOCK_CHECK_GROUPS;
export const mockComments = MOCK_COMMENTS;
export const mockEditorContent = MOCK_EDITOR_CONTENT;
export const mockSectionAiPresets = SECTION_AI_PRESETS;
export const mockSectionAiOptions = SECTION_AI_OPTIONS;

export const getMockCandidate = (type: string, prompt: string) => {
  if (type === 'custom') {
    return `${MOCK_AI_CANDIDATES.custom}（${prompt}）`;
  }
  return MOCK_AI_CANDIDATES[type as keyof typeof MOCK_AI_CANDIDATES] || MOCK_AI_CANDIDATES.custom;
};

export const getPresetReply = (actionKey: string, optionKey: string) => {
  const group = AI_PRESET_RESPONSES[actionKey as keyof typeof AI_PRESET_RESPONSES];
  if (!group) {
    return '当前预选任务暂无返回内容，请选择其他任务。';
  }
  return group[optionKey as keyof typeof group] || group['_default' as keyof typeof group] || '当前选项暂无返回内容，请更换选项。';
};
