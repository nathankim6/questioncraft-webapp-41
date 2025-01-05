export const getTopicWritingPrompt = (text: string) => `다음 글의 주제문을 우리말로 주어진 단어들을 순서대로 배열하여 영작하시오.

${text}

[우리말]
(본문의 주제를 담은 한국어 문장)

[단어]
(본문에서 사용된 단어들을 / 로 구분하여 나열)

[정답]
(주어진 단어들을 순서대로 배열한 영어 문장)`;