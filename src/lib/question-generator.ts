import { anthropic } from './claude-client';
import { QuestionType } from '@/types/question';

export const generateQuestion = async (type: QuestionType, text: string): Promise<string> => {
  const prompt = type.getPrompt(text);
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      messages: [{ 
        role: 'user', 
        content: prompt 
      }],
    });

    // Access the text content safely
    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }
    
    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
};