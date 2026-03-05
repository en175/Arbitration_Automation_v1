import {
  MOCK_AI_CANDIDATES,
  MOCK_AI_MSGS,
  MOCK_CHECK_GROUPS,
  MOCK_COMMENTS,
  MOCK_EDITOR_CONTENT,
  MOCK_MATERIALS
} from './config';

export const mockMaterials = MOCK_MATERIALS;
export const mockAiMsgs = MOCK_AI_MSGS;
export const mockCheckGroups = MOCK_CHECK_GROUPS;
export const mockComments = MOCK_COMMENTS;
export const mockEditorContent = MOCK_EDITOR_CONTENT;

export const getMockCandidate = (type: string, prompt: string) => {
  if (type === 'custom') {
    return `${MOCK_AI_CANDIDATES.custom}（${prompt}）`;
  }
  return MOCK_AI_CANDIDATES[type as keyof typeof MOCK_AI_CANDIDATES] || MOCK_AI_CANDIDATES.custom;
};
