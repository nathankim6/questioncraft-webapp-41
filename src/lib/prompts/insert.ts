export const getInsertPrompt = (text: string) => `글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳을 고르시오.

${text}`;