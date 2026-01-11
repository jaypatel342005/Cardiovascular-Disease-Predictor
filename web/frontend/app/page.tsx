import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Settings, 
  ArrowRight,
  Github, 
  ExternalLink,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { ProjectRetrospective } from "@/components/project-retrospective";
import { CraftButton, CraftButtonLabel, CraftButtonIcon } from "@/components/ui/craft-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CardioAI - AI Heart Disease Prediction",
  description: "CardioAI uses advanced machine learning to predict cardiovascular disease risk based on clinical features. Test your heart health today.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
        
       {/* Hero Section Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0">
          <div className="absolute top-[-20%] left-0 w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-6xl space-y-16 animate-in fade-in duration-700">
        
        {/* Superior Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
           <Badge variant="outline" className="mb-4 border-blue-500/20 text-blue-600 bg-blue-500/5 uppercase tracking-widest text-[11px] py-1.5 px-4 rounded-full shadow-sm backdrop-blur-sm flex items-center gap-3 w-fit mx-auto">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             Machine Learning
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             Healthcare
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             AI
           </Badge>

           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
             Predicting the <br/>
             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
               Silent Killer
             </span>
           </h1>
           
           <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
             An end-to-end AI pipeline engineered to detect cardiovascular disease with 
             <span className="font-semibold text-foreground"> 73.6%+ accuracy</span> 
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Link href="/assessment">
                  <div className="rounded-full animate-heartbeat-action">
                    <CraftButton size="lg" className="h-14 px-8 text-lg gap-2 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 transition-all rounded-full">
                      <CraftButtonLabel>Start AI Assessment</CraftButtonLabel>
                      <CraftButtonIcon>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </CraftButtonIcon>
                    </CraftButton>
                  </div>
               </Link>
               <div className="flex gap-3">
                 <Link href="https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor" target="_blank">
                    <Button variant="outline" size="lg" className="h-12 px-6 rounded-full gap-2 hover:bg-zinc-900 hover:text-white transition-colors">
                        <Github className="w-5 h-5" /> GitHub
                    </Button>
                </Link>
                 <Link href="https://www.kaggle.com/code/jaypatel345/master-cardiovascular-disease-prediction" target="_blank">
                    <Button variant="outline" size="lg" className="h-12 px-6 rounded-full gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                        <ExternalLink className="w-5 h-5" /> Kaggle
                    </Button>
                </Link>
               </div>
           </div>

           {/* Quick Stats */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-border/40 mt-12">
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                  <div className="text-3xl font-bold text-blue-500">68.6k</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Patient Records</div>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                  <div className="text-3xl font-bold text-purple-500">13</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Clinical Features</div>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                  <div className="text-3xl font-bold text-green-500">0.73</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Macro F1-Score</div>
              </div>
               <div className="p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                  <div className="text-3xl font-bold text-orange-500">10</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Models Evaluated</div>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Card className="border-primary/10 bg-gradient-to-br from-card to-primary/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                        <BrainCircuit className="text-primary w-6 h-6" />
                        Our Mission
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                   Cardiovascular disease is a leading global risk. We built this tool to act as a <strong>Digital Second Opinion</strong>. It looks at your health numbers—like blood pressure and weight—to spot patterns that might be invisible to the naked eye.
                </CardContent>
            </Card>

            <Card className="border-border/60 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Database className="w-5 h-5 text-blue-500" />
                        How It Works
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Just like a doctor checks your vitals, our system cleans and organizes the data to ensure accuracy:</p>
                    <ul className="space-y-1.5 mt-2">
                         <li className="flex gap-2 items-start">
                            <span className="text-green-500 mt-0.5">✓</span> <strong>Smart Formatting:</strong> We convert all measurements into a standard format so nothing gets lost in translation.
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-green-500 mt-0.5">✓</span> <strong>Error Checking:</strong> We automatically filter out mistakes, like impossible blood pressure readings.
                        </li>
                         <li className="flex gap-2 items-start">
                            <span className="text-green-500 mt-0.5">✓</span> <strong>Fair Testing:</strong> We kept 20% of our data hidden to strictly test the AI's final performance.
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-border/60 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="w-5 h-5 text-orange-500" />
                        Smart Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>The AI doesn't just guess; it calculates new health indicators to get a better picture:</p>
                    <div className="space-y-2 mt-2">
                         <div className="p-2 bg-muted/50 rounded border flex justify-between items-center">
                            <span className="font-medium text-foreground">BMI & Blood Flow</span>
                            <span className="text-[10px] uppercase">Combined Health Signals</span>
                         </div>
                         <div className="p-2 bg-muted/50 rounded border flex justify-between items-center">
                            <span className="font-medium text-foreground">Optimization</span>
                            <span className="text-[10px] uppercase font-bold text-green-600">Verified Accuracy: 73.6%</span>
                         </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Results Section */}
        {/* Deep Technical Retrospective */}
        <ProjectRetrospective />

         <SiteFooter />
      </div>
    </div>
  );
}
