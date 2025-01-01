export const getInsertPrompt = (text: string) => `당신은 고등학교 영어 수능 출제위원입니다. 입력한 영어지문을 바탕으로 문장 삽입 문제를 만드세요:

1. [INPUT] 지문의 문장 수를 확인하세요. 문장의 수가 6개 미만이면 다음과 같이 출력하고 종료하세요:
   [OUTPUT]
   출제불가(문장 수 부족)

2. 문장의 수가 6개 이상인 경우, [INPUT] 지문에서 중요한 문장 하나를 선택하여 제거하세요. 이 문장이 삽입될 문장이 됩니다.

3. 남은 지문을 5개의 부분으로 나누고, 각 부분 사이에 ( ① ), ( ② ), ( ③ ), ( ④ ), ( ⑤ )를 삽입하세요.

4. [OUTPUT] 형식으로 다음과 같이 문제를 작성하세요:

[OUTPUT]
글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.
<삽입될 문장>

[나머지 지문 with ( ① ), ( ② ), ( ③ ), ( ④ ), ( ⑤ ) 삽입]

[정답] (정답 번호)
[해설] (정답 위치를 선정한 이유를 설명하는 해설)

주의사항:
- 선택한 문장은 지문의 흐름상 중요하고, 논리적 연결을 제공하는 것이어야 합니다.
- 문제의 난이도는 중상 수준을 유지하세요.
- 정답의 위치는 ①~⑤ 중 하나로 무작위 선정하되, 논리적으로 가장 적절한 곳이어야 합니다.
- 해설은 왜 그 위치가 가장 적절한지 논리적으로 설명해야 합니다.

[INPUT]
${text}`;