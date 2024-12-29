import { QuestionType } from "@/types/question";
import { 
  getBlankPrompt, getBlankMultiplePrompt, getClaimPrompt,
  getDictionaryPrompt, getImplicationPrompt, getInsertPrompt,
  getIrrelevantPrompt, getLogicFlowPrompt, getMainPointPrompt,
  getMoodPrompt, getOrderPrompt, getOrderWritingAdvancedPrompt,
  getOrderWritingBasicPrompt, getPurposePrompt, getSummaryBlankPrompt,
  getSummaryPrompt, getSynonymAntonymPrompt, getTitlePrompt,
  getTopicPrompt, getTrueOrFalsePrompt, getVocabularyPrompt,
  getWeekendClinicPrompt,
} from "../prompts";

// Reading comprehension types
export const readingTypes: QuestionType[] = [
  {
    id: "purpose",
    name: "목적",
    description: "글의 목적을 묻는 문제",
    getPrompt: getPurposePrompt,
  },
  {
    id: "mood",
    name: "분위기/심경",
    description: "글의 분위기나 심경을 묻는 문제",
    getPrompt: getMoodPrompt,
  },
  {
    id: "claim",
    name: "주장",
    description: "글쓴이의 주장을 묻는 문제",
    getPrompt: getClaimPrompt,
  },
  {
    id: "implication",
    name: "함축",
    description: "글의 함축적 의미를 묻는 문제",
    getPrompt: getImplicationPrompt,
  },
  {
    id: "mainPoint",
    name: "요지",
    description: "글의 요지를 묻는 문제",
    getPrompt: getMainPointPrompt,
  },
  {
    id: "topic",
    name: "주제",
    description: "글의 주제를 묻는 문제",
    getPrompt: getTopicPrompt,
  },
  {
    id: "title",
    name: "제목",
    description: "글의 제목을 묻는 문제",
    getPrompt: getTitlePrompt,
  },
];

// School exam types
export const schoolTypes: QuestionType[] = [
  {
    id: "sungnamVocab",
    name: "성남외고 어휘",
    description: "성남외고 어휘 문제",
    getPrompt: getVocabularyPrompt,
  },
  {
    id: "sungExternal",
    name: "성남외고 외부지문",
    description: "성남외고 외부지문 문제",
    getPrompt: getVocabularyPrompt,
  },
  {
    id: "sungReference",
    name: "성남외고 지문참조",
    description: "성남외고 지문참조 문제",
    getPrompt: getVocabularyPrompt,
  },
  {
    id: "yeongExternal",
    name: "영신여고 외부지문",
    description: "영신여고 외부지문 문제",
    getPrompt: getVocabularyPrompt,
  },
  {
    id: "dangDict",
    name: "당곡고 사전활용",
    description: "당곡고 사전활용 문제",
    getPrompt: getDictionaryPrompt,
  },
  {
    id: "daeguGirls1",
    name: "[임시]대구여고1",
    description: "대구여고 문제 유형 1",
    getPrompt: getVocabularyPrompt,
  },
  {
    id: "daeguGirls2", 
    name: "[임시]대구여고2",
    description: "대구여고 문제 유형 2", 
    getPrompt: getVocabularyPrompt,
  },
];

// Writing types
export const writingTypes: QuestionType[] = [
  {
    id: "orderWritingBasic",
    name: "우리말 순서 배열 (기본)",
    description: "우리말을 영작하여 순서 배열하기 (기본)",
    getPrompt: getOrderWritingBasicPrompt,
  },
  {
    id: "orderWritingAdvanced",
    name: "우리말 순서 배열 (심화)",
    description: "우리말을 영작하여 순서 배열하기 (심화)",
    getPrompt: getOrderWritingAdvancedPrompt,
  },
  {
    id: "summaryBlank",
    name: "요약문 빈칸",
    description: "요약문의 빈칸 채우기",
    getPrompt: getSummaryBlankPrompt,
  },
];

// Content types
export const contentTypes: QuestionType[] = [
  {
    id: "synonymAntonym",
    name: "동의어/반의어",
    description: "동의어/반의어 찾기",
    getPrompt: getSynonymAntonymPrompt,
  },
  {
    id: "trueOrFalse",
    name: "참/거짓",
    description: "참/거짓 판단하기",
    getPrompt: getTrueOrFalsePrompt,
  },
  {
    id: "logicFlow",
    name: "논리 전개",
    description: "논리 전개 파악하기",
    getPrompt: getLogicFlowPrompt,
  },
  {
    id: "weekendClinic",
    name: "주말진료소",
    description: "주말진료소 문제",
    getPrompt: getWeekendClinicPrompt,
  },
];