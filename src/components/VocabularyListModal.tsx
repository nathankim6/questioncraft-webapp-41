import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VocabularyEntry {
  word: string;
  meaning: string;
  synonyms: Array<{word: string; meaning: string}>;
  antonyms: Array<{word: string; meaning: string}>;
}

interface VocabularyListModalProps {
  content: string;
}

export const VocabularyListModal = ({ content }: VocabularyListModalProps) => {
  // Parse the content to extract vocabulary entries
  const parseContent = (text: string): VocabularyEntry[] => {
    const entries: VocabularyEntry[] = [];
    const lines = text.split('\n');
    let currentEntry: Partial<VocabularyEntry> = {};
    
    lines.forEach(line => {
      if (line.includes('|')) {
        const cells = line.split('|').map(cell => cell.trim()).filter(Boolean);
        if (cells.length >= 2 && !line.includes('표제어')) {
          const entry: VocabularyEntry = {
            word: cells[0],
            meaning: cells[1],
            synonyms: [],
            antonyms: []
          };

          // Process synonyms (cells[2] and cells[3])
          if (cells[2] && cells[3]) {
            entry.synonyms.push({
              word: cells[2],
              meaning: cells[3]
            });
          }

          // Process antonyms (cells[4] and cells[5])
          if (cells[4] && cells[5]) {
            entry.antonyms.push({
              word: cells[4],
              meaning: cells[5]
            });
          }

          entries.push(entry);
        }
      }
    });
    
    return entries;
  };

  const vocabularyList = parseContent(content);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-white hover:from-[#8E9196] hover:to-[#D6BCFA] transition-all duration-300"
        >
          <Book className="w-4 h-4" />
          단어장 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
            Vocabulary List
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-lg border border-[#D6BCFA]/30 overflow-hidden">
          <Table>
            <TableHeader className="bg-gradient-to-r from-[#F1F0FB] to-[#E5DEFF] sticky top-0 z-10">
              <TableRow>
                <TableHead className="font-bold text-[#222222] w-[15%]">표제어</TableHead>
                <TableHead className="font-bold text-[#222222] w-[15%]">표제어 뜻</TableHead>
                <TableHead className="font-bold text-[#222222] w-[15%]">동의어</TableHead>
                <TableHead className="font-bold text-[#222222] w-[15%]">동의어 뜻</TableHead>
                <TableHead className="font-bold text-[#222222] w-[15%]">반의어</TableHead>
                <TableHead className="font-bold text-[#222222] w-[15%]">반의어 뜻</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vocabularyList.map((entry, index) => (
                <TableRow 
                  key={index}
                  className={index % 2 === 0 ? 'bg-white hover:bg-[#F8F7FF] transition-colors' : 'bg-[#F8F7FF] hover:bg-[#F1F0FB] transition-colors'}
                >
                  <TableCell className="font-medium border-r border-[#D6BCFA]/10">{entry.word}</TableCell>
                  <TableCell className="border-r border-[#D6BCFA]/10">{entry.meaning}</TableCell>
                  <TableCell className="border-r border-[#D6BCFA]/10">
                    {entry.synonyms.map((syn, i) => (
                      <div key={i} className="mb-1 text-[#7E69AB]">{syn.word}</div>
                    ))}
                  </TableCell>
                  <TableCell className="border-r border-[#D6BCFA]/10">
                    {entry.synonyms.map((syn, i) => (
                      <div key={i} className="mb-1">{syn.meaning}</div>
                    ))}
                  </TableCell>
                  <TableCell className="border-r border-[#D6BCFA]/10">
                    {entry.antonyms.map((ant, i) => (
                      <div key={i} className="mb-1 text-[#9b87f5]">{ant.word}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {entry.antonyms.map((ant, i) => (
                      <div key={i} className="mb-1">{ant.meaning}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};