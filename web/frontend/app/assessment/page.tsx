import { PredictionForm } from '@/components/prediction-form';
import { ModeToggle } from '@/components/mode-toggle';
import { SiteFooter } from '@/components/site-footer';

export default function AssessmentPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start pt-0 px-4 pb-4 overflow-hidden bg-background">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center space-y-4 flex-grow">
        <div className="w-full">
             <PredictionForm />
        </div>
      </div>
    
      <SiteFooter className="mt-12 border-none bg-transparent relative z-10" />
    </div>
  );
}
