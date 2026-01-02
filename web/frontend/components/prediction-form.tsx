"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, User, Ruler, Activity, Cigarette, Wine, Dumbbell, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "./result-card";
import { HealthTips } from "./health-tips";
import { SelectCard } from "./select-card";
import { NumberInput } from "@/components/ui/number-input";
import { DOBInput } from "@/components/ui/dob-input";

// Form Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.coerce.number().min(50, "Height (cm) required").max(250),
  weight: z.coerce.number().min(20, "Weight (kg) required").max(300),
  ap_hi: z.coerce.number().min(50, "Systolic BP required").max(250),
  ap_lo: z.coerce.number().min(30, "Diastolic BP required").max(150),
  cholesterol: z.string(),
  gluc: z.string(),
  smoke: z.boolean().default(false),
  alco: z.boolean().default(false),
  active: z.boolean().default(true),
});

const formSteps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'vitals', title: 'Vital Signs', icon: Ruler },
    { id: 'lifestyle', title: 'Lifestyle', icon: Activity }
];

export function PredictionForm() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      height: 170,
      weight: 70,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: "1",
      gluc: "1",
      smoke: false,
      alco: false,
      active: true,
      gender: "female",
    },
  });

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const nextStep = async () => {
      const fieldGroups = [
          ['name', 'dob', 'gender', 'height', 'weight'],
          ['ap_hi', 'ap_lo', 'cholesterol', 'gluc'],
          ['smoke', 'alco', 'active']
      ];
      
      const isValid = await form.trigger(fieldGroups[currentStep] as any);
      if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const toastId = toast.loading("Analyzing health data...");

    try {
      const age = calculateAge(values.dob);
      
      const payload = {
        ...values,
        age,
        cholesterol: parseInt(values.cholesterol),
        gluc: parseInt(values.gluc),
        smoke: values.smoke ? 1 : 0,
        alco: values.alco ? 1 : 0,
        active: values.active ? 1 : 0,
      };

      const response = await fetch("https://cardiovascular-disease-predictor-3q.vercel.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      setResult(data);

      try {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...values,
            age,
            cholesterol: parseInt(values.cholesterol),
            gluc: parseInt(values.gluc),
            smoke: values.smoke ? 1 : 0, 
            alco: values.alco ? 1 : 0,
            active: values.active ? 1 : 0,
            prediction: data.prediction,
            probability: data.probability,
            risk_level: data.risk_level,
        };
        const existing = JSON.parse(localStorage.getItem('cardio_history') || '[]');
        const updated = [historyItem, ...existing].slice(0, 50); 
        localStorage.setItem('cardio_history', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history locally", e);
      }
      
      toast.dismiss(toastId);
      
      if (data.prediction === 0) {
        toast.success("Analysis Complete: Low Risk");
        triggerConfetti();
      } else {
        toast.warning("Analysis Complete: High Risk");
      }

    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Error", { description: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899']
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4">
      <AnimatePresence mode="wait">
      {result ? (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
        >
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
               {/* Column 1: Result Card */}
               <div className="lg:col-span-5 w-full">
                    <ResultCard 
                        prediction={result.prediction} 
                        probability={result.probability} 
                        riskLevel={result.risk_level} 
                    />
               </div>

               {/* Column 2: Health Tips */}
               <div className="lg:col-span-5 w-full h-full">
                    <HealthTips tips={result.tips} />
               </div>
                
                {/* Column 3: Actions */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="lg:col-span-2 flex flex-col gap-4 w-full sticky top-4"
                >
                    <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 hidden lg:block">
                        Actions
                    </div>
                    <Button 
                        size="lg"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all font-medium whitespace-normal leading-tight px-2"
                        onClick={() => { setResult(null); setCurrentStep(0); }}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> New Test
                        </span>
                    </Button>
                    
                    <Button 
                        size="lg"
                        variant="outline"
                        className="w-full h-12 rounded-xl border-border/50 hover:bg-muted/50 transition-all font-medium justify-start px-4"
                        onClick={() => window.location.href = '/history'}
                    >
                        <Activity className="mr-2 w-4 h-4 shrink-0" /> History
                    </Button>

                    <Button 
                        size="lg"
                        variant="ghost"
                        className="w-full h-auto py-2 rounded-xl text-muted-foreground hover:text-foreground justify-start px-4 text-xs"
                         onClick={() => window.open('https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor', '_blank')}
                    >
                        <span className="flex items-center gap-2">
                             Docs & Info
                        </span>
                    </Button>
                </motion.div>
           </div>
        </motion.div>
      ) : (
        <Card className="max-w-3xl mx-auto border-border/50 bg-card/40 backdrop-blur-xl shadow-xl relative overflow-hidden">
             {/* Progress Bar */}
             <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
                <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    animate={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

          <CardHeader className="pb-2 pt-6">
               <div className="flex justify-between items-center mb-6 px-4 md:px-12">
                 {formSteps.map((step, idx) => {
                     const Icon = step.icon;
                     const isActive = idx === currentStep;
                     const isCompleted = idx < currentStep;
                     return (
                         <div key={step.id} className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-primary' : isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/30'}`}>
                             <div className={`p-2.5 rounded-full border-2 transition-all duration-300 ${isActive ? 'border-primary bg-primary/10 scale-105 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : isCompleted ? 'border-primary/50 text-primary/50' : 'border-border/30 bg-muted/10'}`}>
                                 <Icon size={18} />
                             </div>
                             <span className="text-xs font-semibold hidden md:block">{step.title}</span>
                         </div>
                     );
                 })}
              </div>
              <CardTitle className="text-center text-2xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {formSteps[currentStep].title}
              </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-6">
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Your Name</FormLabel>
                                    <FormControl>
                                    <Input {...field} placeholder="Enter your name" className="h-10 bg-background/50 border-input/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Select Gender</FormLabel>
                                    <div className="grid grid-cols-2 gap-3">
                                        <SelectCard 
                                            id="gender-female"
                                            title="Female"
                                            selected={field.value === 'female'}
                                            onClick={() => field.onChange('female')}
                                            icon={User} 
                                        />
                                        <SelectCard 
                                            id="gender-male"
                                            title="Male" 
                                            selected={field.value === 'male'}
                                            onClick={() => field.onChange('male')}
                                            icon={User}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Date of Birth</FormLabel>
                                        <FormControl>
                                        <DOBInput value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Height (cm)</FormLabel>
                                        <FormControl>
                                        <NumberInput value={field.value as number} onChange={field.onChange} minValue={50} maxValue={250} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Weight (kg)</FormLabel>
                                        <FormControl>
                                        <NumberInput value={field.value as number} onChange={field.onChange} minValue={20} maxValue={300} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="ap_hi"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Systolic BP (High)</FormLabel>
                                        <FormControl>
                                        <NumberInput value={field.value as number} onChange={field.onChange} minValue={50} maxValue={250} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ap_lo"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Diastolic BP (Low)</FormLabel>
                                        <FormControl>
                                        <NumberInput value={field.value as number} onChange={field.onChange} minValue={30} maxValue={150} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name="cholesterol"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Cholesterol Level</FormLabel>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <SelectCard title="Normal" description="< 200 mg" selected={field.value === "1"} onClick={() => field.onChange("1")} id="chol-1" />
                                        <SelectCard title="Elevated" description="200-239" selected={field.value === "2"} onClick={() => field.onChange("2")} id="chol-2" />
                                        <SelectCard title="High" description="> 240 mg" selected={field.value === "3"} onClick={() => field.onChange("3")} id="chol-3" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="gluc"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Glucose Level</FormLabel>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <SelectCard title="Normal" description="< 100 mg" selected={field.value === "1"} onClick={() => field.onChange("1")} id="gluc-1" />
                                        <SelectCard title="Elevated" description="100-125" selected={field.value === "2"} onClick={() => field.onChange("2")} id="gluc-2" />
                                        <SelectCard title="High" description="> 126 mg" selected={field.value === "3"} onClick={() => field.onChange("3")} id="gluc-3" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-1 gap-4">
                             <FormField
                                control={form.control}
                                name="smoke"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Do you smoke?</FormLabel>
                                     <div className="grid grid-cols-2 gap-3">
                                        <SelectCard title="No" selected={field.value === false} onClick={() => field.onChange(false)} id="smoke-no" icon={Cigarette} />
                                        <SelectCard title="Yes" selected={field.value === true} onClick={() => field.onChange(true)} id="smoke-yes" icon={Cigarette} />
                                    </div>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alco"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Alcohol Intake?</FormLabel>
                                     <div className="grid grid-cols-2 gap-3">
                                        <SelectCard title="No" selected={field.value === false} onClick={() => field.onChange(false)} id="alco-no" icon={Wine} />
                                        <SelectCard title="Yes" selected={field.value === true} onClick={() => field.onChange(true)} id="alco-yes" icon={Wine} />
                                    </div>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="active"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium mb-2 block">Physical Activity?</FormLabel>
                                     <div className="grid grid-cols-2 gap-3">
                                        <SelectCard title="Inactive" selected={field.value === false} onClick={() => field.onChange(false)} id="active-no" icon={Dumbbell} />
                                        <SelectCard title="Active" selected={field.value === true} onClick={() => field.onChange(true)} id="active-yes" icon={Dumbbell} />
                                    </div>
                                </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border/50">
                    {currentStep > 0 && (
                        <Button type="button" variant="ghost" onClick={prevStep} disabled={loading} className="text-muted-foreground hover:text-foreground h-9">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}
                    
                    {currentStep < 2 ? (
                        <Button type="button" onClick={nextStep} className="ml-auto bg-primary hover:bg-primary/90 min-w-[100px] h-9">
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button 
                            type="button" 
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={loading}
                            className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all min-w-[120px] h-9"
                        >
                             {loading ? <Loader2 className="animate-spin" /> : "Analyze Risk"}
                        </Button>
                    )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      </AnimatePresence>
    </div>
  );
}
