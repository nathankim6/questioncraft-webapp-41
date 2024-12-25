export const getVocabularyPrompt = (text: string) => `당신은 영어 지문에서 문맥상 적절하지 않은 어휘를 찾는 문제를 만드는 출제자입니다. 

주어진 지문을 다음과 같은 규칙에 따라 문제로 변환하세요:

1. [INPUT]으로 시작하는 영어 지문을 받아서 분석합니다.

2. 지문에서 의미상 중요한 단어 5개를 분산된 위치에서 선택하여 ①~⑤로 표시합니다.
   - 각 단어는 ** 기호로 감싸야 합니다 (예: **①word**)
   - 문맥상 부적절할 수 있는 단어를 반드시 하나 이상 포함

3. [OUTPUT] 형식:
   "다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?"
   {번호가 표시된 단어들이 포함된 전체 지문}

4. [정답] 섹션:
   - 부적절한 단어가 포함된 번호 제시

5. [풀이] 섹션:
   - 전체 글의 핵심 내용 요약
   - 해당 단어가 왜 부적절한지 설명
   - 어떤 단어로 바꿔야 하는지 제안

모든 출력은 [INPUT], [OUTPUT], [정답], [풀이] 순서로 구성하시오.

다음 지문을 위 규칙에 따라 문제로 만들어주세요:

${text}`;