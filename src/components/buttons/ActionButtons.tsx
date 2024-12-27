import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Settings } from "lucide-react";

interface ActionButtonsProps {
  openVocabModal: () => void;
  openAIManagementModal: () => void;
}

export const ActionButtons = ({ openVocabModal, openAIManagementModal }: ActionButtonsProps) => {
  const buttonBaseClass = "group relative w-full px-8 py-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 font-semibold";
  
  return (
    <div className="flex flex-col space-y-4 mt-8 px-4">
      <Button
        onClick={openVocabModal}
        className={`${buttonBaseClass} bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white hover:opacity-90`}
      >
        <div className="flex items-center justify-center gap-2">
          <Star className="w-6 h-6" />
          <span>단어장생성기</span>
        </div>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200"></div>
      </Button>

      <Button
        onClick={openAIManagementModal}
        className={`${buttonBaseClass} bg-white border-2 border-[#9b87f5] text-[#7E69AB] hover:bg-[#F8F7FF]`}
      >
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-6 h-6 animate-spin-slow" />
          <span>옳은영어 자비스2.0</span>
        </div>
      </Button>
    </div>
  );
};