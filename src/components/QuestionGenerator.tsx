import { useState } from "react";
import { TypeSelector } from "./TypeSelector";
import { TextInput } from "./TextInput";
import { GeneratedQuestion } from "./GeneratedQuestion";
import { generateQuestion } from "@/lib/claude";
import { QuestionType } from "@/types/question";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Plus, Trash2 } from "lucide-react";

interface PassageEntry {
  id: string;
  text: string;
  result: string;
}

interface TypeEntry {
  type: QuestionType;
  passages: PassageEntry[];
}

export const QuestionGenerator = () => {
  const [selectedTypes, setSelectedTypes] = useState<TypeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTypeSelect = (type: QuestionType) => {
    if (!selectedTypes.find(entry => entry.type.id === type.id)) {
      setSelectedTypes(prev => [...prev, { type, passages: [{ id: crypto.randomUUID(), text: "", result: "" }] }]);
    }
  };

  const handleRemoveType = (typeId: string) => {
    setSelectedTypes(prev => prev.filter(entry => entry.type.id !== typeId));
  };

  const handleAddPassage = (typeId: string) => {
    setSelectedTypes(prev => prev.map(entry => 
      entry.type.id === typeId 
        ? { ...entry, passages: [...entry.passages, { id: crypto.randomUUID(), text: "", result: "" }] }
        : entry
    ));
  };

  const handleRemovePassage = (typeId: string, passageId: string) => {
    setSelectedTypes(prev => prev.map(entry => 
      entry.type.id === typeId 
        ? { ...entry, passages: entry.passages.filter(p => p.id !== passageId) }
        : entry
    ));
  };

  const handleTextChange = (typeId: string, passageId: string, newText: string) => {
    setSelectedTypes(prev => prev.map(entry => 
      entry.type.id === typeId 
        ? {
            ...entry,
            passages: entry.passages.map(p => 
              p.id === passageId ? { ...p, text: newText } : p
            )
          }
        : entry
    ));
  };

  const handleGenerateAll = async () => {
    const hasEmptyPassages = selectedTypes.some(type => 
      type.passages.some(passage => !passage.text.trim())
    );

    if (hasEmptyPassages) {
      toast({
        title: "입력 확인",
        description: "모든 지문을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedTypes = [...selectedTypes];
      
      for (let typeIndex = 0; typeIndex < updatedTypes.length; typeIndex++) {
        const typeEntry = updatedTypes[typeIndex];
        for (let passageIndex = 0; passageIndex < typeEntry.passages.length; passageIndex++) {
          const passage = typeEntry.passages[passageIndex];
          const result = await generateQuestion(typeEntry.type, passage.text);
          if (typeof result === 'string') {
            updatedTypes[typeIndex].passages[passageIndex].result = result;
          }
        }
      }
      
      setSelectedTypes(updatedTypes);
      toast({
        title: "문제 생성 완료",
        description: "모든 문제가 생성되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "문제 생성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="w-72 flex-shrink-0">
        <TypeSelector 
          selectedTypes={selectedTypes.map(entry => entry.type)} 
          onSelect={handleTypeSelect}
          onRemove={handleRemoveType}
        />
      </div>
      <div className="flex-1 space-y-8">
        {selectedTypes.map((typeEntry) => (
          <div key={typeEntry.type.id} className="space-y-6 p-6 rounded-lg border-2 border-primary/20 relative">
            <h3 className="text-xl font-bold text-primary">{typeEntry.type.name}</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {typeEntry.passages.map((passage, index) => (
                <div key={passage.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">지문 {index + 1}</h4>
                    {typeEntry.passages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePassage(typeEntry.type.id, passage.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <TextInput 
                    value={passage.text} 
                    onChange={(text) => handleTextChange(typeEntry.type.id, passage.id, text)}
                    onEnterPress={() => handleAddPassage(typeEntry.type.id)}
                  />
                  {passage.result && <GeneratedQuestion content={passage.result} />}
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => handleAddPassage(typeEntry.type.id)}
              className="w-full mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              지문 추가하기
            </Button>
          </div>
        ))}

        {selectedTypes.length > 0 && (
          <div className="flex justify-center w-full">
            <Button
              onClick={handleGenerateAll}
              disabled={isLoading}
              className="max-w-md w-full bg-gradient-to-r from-primary via-primary/90 to-primary relative group overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              <div className="relative flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="font-semibold tracking-wide">
                  {isLoading ? "문제 생성 중..." : "문제 생성하기"}
                </span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
