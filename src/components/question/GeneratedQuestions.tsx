import { GeneratedQuestion } from "../GeneratedQuestion";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useState } from "react";
import { VocabularyModal } from "../VocabularyModal";

interface Question {
  id: string;
  content: string;
  questionNumber: number;
  originalText?: string;
}

interface GeneratedQuestionsProps {
  questions: Question[];
}

export const GeneratedQuestions = ({ questions }: GeneratedQuestionsProps) => {
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  
  // Sort questions by their content to maintain consistency
  const sortedQuestions = [...questions].sort((a, b) => {
    if (!a.content && !b.content) return 0;
    if (!a.content) return 1;
    if (!b.content) return -1;
    return a.questionNumber - b.questionNumber;
  });

  // Check if any questions are synonym/antonym type
  const hasSynonymAntonym = sortedQuestions.some(
    question => question.content.includes('| 표제어 |') || 
                question.content.includes('동의어') || 
                question.content.includes('반의어')
  );

  // Combine all vocabulary content with question numbers
  const getAllVocabularyContent = () => {
    const vocabContent = sortedQuestions
      .filter(question => 
        question.content.includes('| 표제어 |') || 
        question.content.includes('동의어') || 
        question.content.includes('반의어')
      )
      .map(question => {
        // Remove the explanatory text
        const content = question.content;
        const tableStart = content.indexOf('|');
        return tableStart !== -1 ? content.substring(tableStart) : content;
      })
      .join('\n\n');
    
    console.log('Vocabulary content:', vocabContent); // Debug log
    return vocabContent;
  };

  return (
    <div className="space-y-0 bg-[#F8F7FF] p-6 rounded-lg border border-[#D6BCFA]/30">
      {sortedQuestions.map((question, index) => (
        <GeneratedQuestion 
          key={question.id}
          content={question.content}
          questionNumber={index + 1}
          originalText={question.originalText}
          showVocabButton={false}
        />
      ))}
      
      {hasSynonymAntonym && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => setIsVocabModalOpen(true)}
            className="text-[#9b87f5] hover:text-[#7E69AB] border-[#9b87f5] hover:border-[#7E69AB]"
          >
            <Book className="w-4 h-4 mr-2" />
            단어장 생성
          </Button>
        </div>
      )}
      
      <VocabularyModal
        isOpen={isVocabModalOpen}
        onClose={() => setIsVocabModalOpen(false)}
        content={getAllVocabularyContent()}
      />
    </div>
  );
};