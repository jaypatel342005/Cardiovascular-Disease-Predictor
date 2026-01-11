"use client";

import { useState } from "react";
import { 
  Database, 
  GitBranch, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  BarChart3,
  Microscope,
  Cpu,
  ArrowRight,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectRetrospective() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "data", label: "Data Prep", icon: Database },
    { id: "experimentation", label: "Models", icon: Cpu },
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "optimization", label: "Tuning", icon: Microscope },
    { id: "conclusion", label: "Conclusion", icon: Award },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Project Retrospective</h2>
        <p className="text-muted-foreground text-lg">
          A comprehensive analysis of our end-to-end journey to build a robust diagnostic AI.
        </p>
      </div>

      <Card className="border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Sidebar / Tabs */}
        <div className="md:w-64 bg-muted/30 border-r border-border/50 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap md:whitespace-normal",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">1.0 Project Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      This retrospective covers our complete lifecycle from initial data preparation to final model selection. 
                      Our primary objective was to build a robust classification model capable of accurately predicting cardiovascular disease using the <code className="bg-muted px-1 py-0.5 rounded text-sm">cardio_cleaned_week2.csv</code> dataset.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Card className="group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 hover:-translate-y-1 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <GitBranch className="h-24 w-24 text-indigo-500 dark:text-indigo-400" />
                        </div>
                       <CardContent className="pt-6 relative z-10">
                         <div className="flex items-center gap-2 mb-2">
                           <GitBranch className="w-5 h-5 text-indigo-500" />
                           <h4 className="font-semibold text-indigo-500">Goal</h4>
                         </div>
                         <p className="text-sm text-foreground/80">Systematically explore algorithms to maximize predictive performance and identify the most promising candidates.</p>
                       </CardContent>
                     </Card>
                     <Card className="group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 hover:-translate-y-1 bg-gradient-to-br from-purple-50 via-white to-white dark:from-purple-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <CheckCircle2 className="h-24 w-24 text-purple-500 dark:text-purple-400" />
                        </div>
                       <CardContent className="pt-6 relative z-10">
                         <div className="flex items-center gap-2 mb-2">
                           <CheckCircle2 className="w-5 h-5 text-purple-500" />
                           <h4 className="font-semibold text-purple-500">Outcome</h4>
                         </div>
                         <p className="text-sm text-foreground/80">Successfully deployed a detailed pipeline with ~73.6% cross-validation accuracy.</p>
                       </CardContent>
                     </Card>
                  </div>
                </div>
              )}

              {activeTab === "data" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">2.0 Data Preparation</h3>
                    <p className="text-muted-foreground mb-4">
                      A rigorous preparation phase ensured our data was clean, formatted, and scaled, directly impacting model generalizability.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-xl p-4 bg-muted/20">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4" /> Dataset Snapshot
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-background rounded-lg border">
                          <span className="text-muted-foreground block text-xs uppercase">Total Records</span>
                          <span className="font-mono text-lg font-bold">68,641</span>
                        </div>
                         <div className="p-3 bg-background rounded-lg border">
                          <span className="text-muted-foreground block text-xs uppercase">Split Strategy</span>
                          <span className="font-mono text-lg font-bold">80/20</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 uppercase tracking-wide text-muted-foreground">Features (X)</h4>
                        <ul className="space-y-2">
                          <li className="text-sm p-2 bg-muted/40 rounded flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 13 Core Features used
                          </li>
                          <li className="text-sm text-muted-foreground pl-4">
                            gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, age_years, bmi, MAP
                          </li>
                          <li className="text-sm text-muted-foreground pl-4 italic">
                            Excluded: id, age, bmi_cat
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 uppercase tracking-wide text-muted-foreground">Key Processes</h4>
                         <ul className="space-y-2">
                          <li className="text-sm p-2 bg-muted/40 rounded flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <strong>StandardScaler:</strong> Applied to remove mean and scale to unit variance.
                          </li>
                           <li className="text-sm p-2 bg-muted/40 rounded flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-blue-500" />
                            <strong>Partitioning:</strong> <br/>Train (54,912) / Test (13,729)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "experimentation" && (
                <div className="space-y-6">
                   <div>
                    <h3 className="text-2xl font-bold mb-4">3.0 Initial Experimentation</h3>
                    <p className="text-muted-foreground">
                      We evaluated a diverse range of 10 algorithms to establish a comprehensive baseline.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                     <Card className="md:col-span-1 group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 hover:-translate-y-1 bg-gradient-to-br from-blue-50 via-white to-white dark:from-blue-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <Cpu className="h-32 w-32 text-blue-500 dark:text-blue-400" />
                        </div>
                       <CardHeader className="relative z-10">
                         <CardTitle className="text-base text-blue-500">Ensemble Models</CardTitle>
                       </CardHeader>
                       <CardContent className="text-sm space-y-2 relative z-10">
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">RandomForest</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">GradientBoosting</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded border-l-2 border-green-500 font-medium backdrop-blur-sm">XGBoost (Top Pick)</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">StackingClassifier</div>
                       </CardContent>
                     </Card>

                     <Card className="md:col-span-1 group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 hover:-translate-y-1 bg-gradient-to-br from-purple-50 via-white to-white dark:from-purple-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <TrendingUp className="h-32 w-32 text-purple-500 dark:text-purple-400" />
                        </div>
                       <CardHeader className="relative z-10">
                         <CardTitle className="text-base text-purple-500">Linear Models</CardTitle>
                       </CardHeader>
                       <CardContent className="text-sm space-y-2 relative z-10">
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">LogisticRegression</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">LinearSVC</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">CalibratedClassifierCV</div>
                       </CardContent>
                     </Card>

                     <Card className="md:col-span-1 group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-500/50 hover:-translate-y-1 bg-gradient-to-br from-orange-50 via-white to-white dark:from-orange-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <Microscope className="h-32 w-32 text-orange-500 dark:text-orange-400" />
                        </div>
                       <CardHeader className="relative z-10">
                         <CardTitle className="text-base text-orange-500">Other Models</CardTitle>
                       </CardHeader>
                       <CardContent className="text-sm space-y-2 relative z-10">
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">KNeighborsClassifier</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">DecisionTreeClassifier</div>
                         <div className="p-2 bg-white/50 dark:bg-black/20 rounded backdrop-blur-sm">GaussianNB</div>
                       </CardContent>
                     </Card>
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">4.0 Performance Analysis</h3>
                    <p className="text-muted-foreground mb-6">
                      Quantitative comparison of all 10 candidate models. The top tier is dominated by ensemble methods.
                    </p>
                  </div>

                  <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b">
                      <div className="col-span-8 md:col-span-6">Model</div>
                      <div className="col-span-4 md:col-span-3 text-right">Test Accuracy</div>
                      <div className="hidden md:block col-span-3 text-right">Rank</div>
                    </div>
                    {[
                      { name: "XGBoost", score: "73.25%", top: true },
                      { name: "RandomForest", score: "73.19%", top: true },
                      { name: "StackingClassifier", score: "73.18%", top: true },
                      { name: "GradientBoosting", score: "73.14%", top: true },
                      { name: "DecisionTree", score: "72.60%", top: false },
                      { name: "CalibratedClassifierCV", score: "72.44%", top: false },
                      { name: "LogisticRegression", score: "72.34%", top: false },
                      { name: "LinearSVC", score: "72.30%", top: false },
                      { name: "GaussianNB", score: "71.48%", top: false },
                      { name: "KNeighbors", score: "70.70%", top: false },
                    ].map((m, i) => (
                      <div key={m.name} className={cn("grid grid-cols-12 p-3 items-center border-b last:border-0 hover:bg-muted/20 transition-colors", m.top ? "bg-green-500/5" : "")}>
                         <div className="col-span-8 md:col-span-6 font-medium flex items-center gap-2">
                           {m.top && <Award className="w-3 h-3 text-green-500" />} {m.name}
                         </div>
                         <div className={cn("col-span-4 md:col-span-3 text-right font-mono", m.top ? "text-green-600 font-bold" : "")}>
                           {m.score}
                         </div>
                         <div className="hidden md:block col-span-3 text-right">
                           <span className="text-muted-foreground text-xs">#{i + 1}</span>
                         </div>
                      </div>
                    ))}
                  </div>


                </div>
              )}

               {activeTab === "optimization" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">5.0 Optimization & Verification</h3>
                    <p className="text-muted-foreground">
                      We used GridSearchCV (5-fold) to fine-tune the champions.
                    </p>
                  </div>

                  <div className="grid gap-6">
                     <Card className="group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 hover:-translate-y-1 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <Award className="h-40 w-40 text-indigo-500 dark:text-indigo-400" />
                        </div>
                       <CardHeader className="pb-2 relative z-10">
                         <CardTitle className="text-lg flex justify-between">
                           <span className="flex items-center gap-2"><Award className="w-5 h-5 text-indigo-500" /> XGBoost Tuning</span>
                           <Badge className="bg-indigo-500 hover:bg-indigo-600">Selected</Badge>
                         </CardTitle>
                         <CardDescription>
                           <span className="flex gap-4 mt-1">
                             <span className="font-semibold text-indigo-600 dark:text-indigo-400">Best 5-fold CV: 73.63%</span>
                             <span className="text-muted-foreground/60">|</span>
                             <span>Test Accuracy: 73.12%</span>
                           </span>
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="relative z-10">
                         <div className="grid grid-cols-2 gap-2 text-sm">
                           <div className="p-2 bg-white/50 dark:bg-black/20 rounded flex justify-between backdrop-blur-sm">
                             <span className="text-muted-foreground">Learning Rate</span>
                             <span className="font-mono">0.05</span>
                           </div>
                           <div className="p-2 bg-white/50 dark:bg-black/20 rounded flex justify-between backdrop-blur-sm">
                             <span className="text-muted-foreground">Max Depth</span>
                             <span className="font-mono">3</span>
                           </div>
                           <div className="p-2 bg-white/50 dark:bg-black/20 rounded flex justify-between backdrop-blur-sm">
                             <span className="text-muted-foreground">n_estimators</span>
                             <span className="font-mono">200</span>
                           </div>
                            <div className="p-2 bg-white/50 dark:bg-black/20 rounded flex justify-between backdrop-blur-sm">
                             <span className="text-muted-foreground">Gamma</span>
                             <span className="font-mono">0</span>
                           </div>
                         </div>
                          <div className="mt-4 p-3 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm rounded-lg flex gap-2 border border-indigo-500/20">
                             <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                             <p><strong>Overfitting Check:</strong> Minimal delta between Train (~75%) and Test (~73%) indicates a robust "Good Fit".</p>
                         </div>
                       </CardContent>
                     </Card>

                     <Card className="group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-slate-500/20 hover:border-slate-500/50 hover:-translate-y-1 bg-gradient-to-br from-slate-50 via-white to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 opacity-90">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <Database className="h-40 w-40 text-slate-500 dark:text-slate-400" />
                        </div>
                       <CardHeader className="pb-2 relative z-10">
                         <CardTitle className="text-lg flex items-center gap-2">
                            <Database className="w-5 h-5 text-slate-500" />
                            Random Forest Tuning
                         </CardTitle>
                         <CardDescription>
                           <span className="flex gap-4 mt-1">
                             <span>Best 5-fold CV: 73.50%</span>
                             <span className="text-muted-foreground/60">|</span>
                             <span>Test Accuracy: 72.98%</span>
                           </span>
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="relative z-10">
                           <p className="text-sm text-muted-foreground mb-2">Slightly lower performance than XGBoost led to it being the runner-up.</p>
                           <div className="text-xs text-muted-foreground font-mono bg-white/50 dark:bg-black/20 p-2 rounded backdrop-blur-sm inline-block">
                             Params: max_depth=10, n_estimators=200, min_samples_split=2
                           </div>
                       </CardContent>
                     </Card>
                  </div>
                </div>
              )}

              {activeTab === "conclusion" && (
                <div className="space-y-6">
                   <Card className="group relative overflow-hidden transition-all duration-300 border hover:shadow-xl hover:shadow-amber-500/20 hover:border-amber-500/50 hover:-translate-y-1 bg-gradient-to-br from-amber-50 via-white to-white dark:from-amber-950 dark:via-slate-950 dark:to-slate-950">
                        {/* Background Decorator */}
                        <div className="absolute -right-2 -bottom-6 opacity-5 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                             <Award className="h-40 w-40 text-amber-500 dark:text-amber-400" />
                        </div>
                       <CardHeader className="relative z-10">
                         <CardTitle className="text-2xl font-bold flex items-center gap-3 text-amber-600 dark:text-amber-500">
                             <Award className="w-8 h-8" /> 7.0 Final Selection
                         </CardTitle>
                       </CardHeader>
                       <CardContent className="relative z-10">
                         <p className="text-lg leading-relaxed text-foreground">
                           The tuned <strong>XGBoost</strong> model identified as <code className="text-sm bg-white/60 dark:bg-black/30 px-2 py-1 rounded border border-amber-500/30">best_xgboost_cvd_model.pkl</code> was selected for deployment.
                         </p>
                          <p className="mt-4 text-muted-foreground">
                            It demonstrated the best balance of accuracy (73.63% CV) and generalization, making it the safest choice for unseen patient data.
                          </p>
                       </CardContent>
                   </Card>

                  <div>
                     <h4 className="font-bold text-lg mb-4">Key Learnings</h4>
                     <ul className="space-y-4">
                       <li className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 font-bold text-sm">1</div>
                         <div>
                           <strong className="block text-foreground">Broad Experimentation Works</strong>
                           <p className="text-sm text-muted-foreground">Evaluating 10+ models essentially guaranteed we started with the best possible architecture.</p>
                         </div>
                       </li>
                       <li className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 font-bold text-sm">2</div>
                         <div>
                           <strong className="block text-foreground">Performance Plateau</strong>
                           <p className="text-sm text-muted-foreground">Most top models hit a ceiling around 73%. To break this barrier, future work must focus on finding new data sources rather than just tuning hyperparameters.</p>
                         </div>
                       </li>
                     </ul>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
