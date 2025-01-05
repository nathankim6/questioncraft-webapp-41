import { APIConfig } from "@/components/APIConfig";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AppHeader } from "@/components/header/AppHeader";
import { LoginSection } from "@/components/auth/LoginSection";

const Index = () => {
  const [userName, setUserName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedExpiry = localStorage.getItem("subscriptionExpiry");
    if (storedExpiry) {
      const formattedDate = new Date(storedExpiry).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setExpiryDate(formattedDate);
    }

    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hasAccess");
    localStorage.removeItem("subscriptionExpiry");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    
    toast({
      title: "로그아웃 성공",
      description: "성공적으로 로그아웃되었습니다.",
    });
    
    navigate("/login");
  };

  const handleLogin = async () => {
    try {
      const { data: accessCodeData, error } = await supabase
        .from('access_codes')
        .select('*')
        .eq('code', accessCode)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (accessCodeData && new Date(accessCodeData.expiry_date) > new Date()) {
        localStorage.setItem("hasAccess", "true");
        localStorage.setItem("subscriptionExpiry", accessCodeData.expiry_date);
        localStorage.setItem("userName", accessCodeData.name);
        
        const formattedDate = new Date(accessCodeData.expiry_date).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        setExpiryDate(formattedDate);
        setUserName(accessCodeData.name);
        setShowLoginForm(false);
        setAccessCode("");
        
        toast({
          title: "로그인 성공",
          description: "엑세스 코드가 확인되었습니다.",
        });
      } else {
        toast({
          title: "로그인 실패",
          description: "유효하지 않은 엑세스 코드입니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "엑세스 코드 확인 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      console.error("Access code check error:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0FAFF] via-[#E5F6FF] to-[#BAE6FD] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col space-y-8">
          <AppHeader />

          <div className="metallic-border rounded-xl p-4 backdrop-blur-lg bg-gradient-to-b from-white/90 via-[#F0FAFF]/90 to-[#E5F6FF]/90">
            <LoginSection 
              showLoginForm={showLoginForm}
              userName={userName}
              expiryDate={expiryDate}
              accessCode={accessCode}
              setAccessCode={setAccessCode}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              setShowLoginForm={setShowLoginForm}
            />
            <APIConfig />
          </div>
          
          <div className="metallic-border rounded-xl p-8 bg-gradient-to-br from-white/95 via-[#F0FAFF]/90 to-[#E5F6FF]/95">
            <QuestionGenerator />
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center relative z-10">
        <p className="text-sm text-[#0EA5E9] hover:text-[#38BDF8] transition-colors">
          © 2025 ORUN AI QUIZ MAKER. desinged and developed by 옳은영어 김성진T
        </p>
      </footer>
    </div>
  );
};

export default Index;