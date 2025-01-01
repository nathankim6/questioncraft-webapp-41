export const getOrderPrompt = (text: string) => `당신은 고등학교 영어 수능 출제위원입니다. 입력한 영어지문을 바탕으로 순서 문제를 만드세요:

1. 지문의 첫 문장 또는 첫 두 문장을 < > 기호 안에 넣어 문제의 시작 부분으로 사용하세요.

2. 지문의 나머지 부분을 세 개의 단락 (A), (B), (C)로 나누세요. 각 단락은 2-3문장으로 구성되어야 합니다. 원본 지문의 내용과 순서를 절대 변경하지 마세요.

3. 다음과 같은 형식으로 문제를 작성하세요:

주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.

<첫 문장 또는 첫 두 문장>
 
(A) [첫 번째 단락]

(B) [두 번째 단락]

(C) [세 번째 단락]

① (B)-(C)-(A)    ② (C)-(A)-(B)    ③ (A)-(B)-(C)
④ (C)-(B)-(A)    ⑤ (A)-(C)-(B)

[정답] (①~⑤ 중 무작위로 선택된 번호. 반드시 다양한 정답이 나오도록 할 것)
[해설] (선택된 정답이 가장 적절한 이유를 설명)

주의사항:
- 원본 지문의 내용과 순서를 절대 변경하지 마세요.
- 정답은 ①~⑤ 중에서 무작위로 선택하되, 선택된 순서가 논리적으로 타당해야 합니다.
- 해설은 선택된 순서가 왜 가장 적절한지 논리적으로 설명해야 합니다.
- 정답이 항상 ③번으로만 나오지 않도록 주의하세요. 다양한 정답(①~⑤)이 나올 수 있도록 하되, 논리적 타당성을 유지하세요.

[INPUT]
${text}`;