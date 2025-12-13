import { Button } from "@/components/ui/button";
import { CheckCircle, Mic, Video as VideoIcon, UploadCloud, HelpCircle, RefreshCw, Check, X, ArrowRight, Flag } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Question } from "@/data/mockCourse";

interface QuizBlockProps {
    title: string;
    questions: Question[];
    onComplete?: (score: number) => void;
    isEmbedded?: boolean;
}

export function QuizBlock({ title, questions, onComplete, isEmbedded = false }: QuizBlockProps) {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);

    // Memoize shuffled options
    const shuffledOptionsMap = useMemo(() => {
        const map: Record<string, string[]> = {};
        questions.forEach(q => {
            if (q.type === 'matching' && q.matchingPairs) {
                const rights = q.matchingPairs.map(p => p.right);
                map[q.id] = [...rights].sort(() => Math.random() - 0.5);
            }
        });
        return map;
    }, [questions]);

    const handleAnswerChange = (qId: string, value: any) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const handleMatchingChange = (qId: string, leftItem: string, selectedValue: string) => {
        if (submitted) return;
        setAnswers(prev => {
            const currentMap = prev[qId] || {};
            return {
                ...prev,
                [qId]: { ...currentMap, [leftItem]: selectedValue }
            };
        });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        let correctCount = 0;

        questions.forEach(q => {
            const userAns = answers[q.id];
            if (q.type === 'multiple-choice') {
                if (userAns === q.correctAnswer) correctCount++;
            } else if (q.type === 'fill-blank') {
                if (String(userAns).toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim()) correctCount++;
            } else if (q.type === 'matching') {
                if (q.matchingPairs && userAns) {
                    const allCorrect = q.matchingPairs.every(pair => userAns[pair.left] === pair.right);
                    if (allCorrect) correctCount++;
                }
            } else {
                if (userAns) correctCount++;
            }
        });

        if (onComplete) onComplete(correctCount);
    };

    const isAnswered = (q: Question) => {
        const val = answers[q.id];
        if (q.type === 'matching' && q.matchingPairs) {
            if (!val) return false;
            return q.matchingPairs.every(p => val[p.left]);
        }
        return val !== undefined && val !== "";
    };

    const allAnswered = questions.every(isAnswered);

    return (
        <div className="w-full animate-fade-in group/quiz">
            {!isEmbedded && (
                <div className="mb-6 flex items-center gap-3 pb-2">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                        <Flag className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                </div>
            )}

            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const userAns = answers[q.id];
                    let isCorrect = false;

                    if (q.type === 'multiple-choice') {
                        isCorrect = userAns === q.correctAnswer;
                    } else if (q.type === 'fill-blank') {
                        isCorrect = String(userAns || "").toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim();
                    } else if (q.type === 'matching') {
                        isCorrect = q.matchingPairs?.every(pair => userAns && userAns[pair.left] === pair.right) ?? false;
                    } else {
                        isCorrect = !!userAns;
                    }

                    return (
                        <div key={q.id} className="py-6 first:pt-0 last:pb-0 relative group/item">
                            {/* Decorative Indicator for Correct/Incorrect on left border */}
                            {submitted && (
                                <div className={cn(
                                    "absolute left-[-20px] top-10 bottom-10 w-1 rounded-full",
                                    isCorrect ? "bg-emerald-500" : "bg-destructive"
                                )} />
                            )}

                            {/* Question Header */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-none">
                                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground border border-border/50">
                                        {idx + 1}
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-foreground leading-snug pt-0.5">
                                    {q.text}
                                </h4>
                            </div>

                            <div className="pl-0 md:pl-12">
                                {/* MULTIPLE CHOICE */}
                                {q.type === 'multiple-choice' && q.options && (
                                    <div className="space-y-2">
                                        {q.options.map((opt, optIdx) => (
                                            <div
                                                key={optIdx}
                                                onClick={() => handleAnswerChange(q.id, optIdx)}
                                                className={cn(
                                                    "flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer group/opt",
                                                    !submitted && answers[q.id] === optIdx
                                                        ? "border-primary bg-primary/5 text-foreground shadow-sm"
                                                        : "border-transparent bg-secondary/30 hover:bg-secondary/60 hover:border-border/50 text-muted-foreground hover:text-foreground",

                                                    submitted && "cursor-default",

                                                    submitted && q.correctAnswer === optIdx && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium",
                                                    submitted && answers[q.id] === optIdx && answers[q.id] !== q.correctAnswer && "border-destructive bg-destructive/10 text-destructive"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                                    !submitted && answers[q.id] === optIdx ? "border-primary" : "border-muted-foreground/40",
                                                    submitted && q.correctAnswer === optIdx && "border-emerald-500 bg-emerald-500 text-white",
                                                    submitted && answers[q.id] === optIdx && answers[q.id] !== q.correctAnswer && "border-destructive bg-destructive text-white"
                                                )}>
                                                    {(submitted && (q.correctAnswer === optIdx || answers[q.id] === optIdx)) && (
                                                        q.correctAnswer === optIdx ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />
                                                    )}
                                                    {!submitted && answers[q.id] === optIdx && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                                </div>
                                                <span className="text-sm font-medium flex-1">{opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* FILL BLANK */}
                                {q.type === 'fill-blank' && (
                                    <div className="max-w-md">
                                        <div className="relative">
                                            <Input
                                                disabled={submitted}
                                                placeholder="Type your answer..."
                                                value={userAns as string || ""}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className={cn(
                                                    "h-10 rounded-xl text-base border-border/60 bg-muted/20 focus:bg-background focus:border-primary transition-all shadow-sm",
                                                    submitted && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
                                                    submitted && !isCorrect && "border-destructive bg-destructive/5 text-destructive"
                                                )}
                                            />
                                        </div>
                                        {submitted && !isCorrect && (
                                            <div className="mt-2 text-sm font-medium text-emerald-600 animate-in fade-in flex items-center gap-1 bg-emerald-500/10 w-fit px-3 py-1 rounded-xl border border-emerald-500/20">
                                                <CheckCircle className="w-3 h-3" /> Correct Answer: <span className="font-bold ml-1">{q.correctAnswer}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* MATCHING */}
                                {q.type === 'matching' && q.matchingPairs && (
                                    <div className="space-y-4 pt-2">
                                        {q.matchingPairs.map((pair, pIdx) => {
                                            const currentSelection = userAns?.[pair.left] || "";
                                            const isPairCorrect = currentSelection === pair.right;

                                            return (
                                                <div key={pIdx} className="bg-secondary/20 p-4 rounded-xl border border-dashed border-border/60">
                                                    <div className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wide">{pair.left}</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {shuffledOptionsMap[q.id]?.map((opt, oIdx) => (
                                                            <Button
                                                                key={oIdx}
                                                                disabled={submitted}
                                                                variant={!submitted && currentSelection === opt ? "default" : "outline"}
                                                                onClick={() => handleMatchingChange(q.id, pair.left, opt)}
                                                                className={cn(
                                                                    "rounded-xl border-border/50 text-sm h-9",
                                                                    !submitted && currentSelection === opt && "shadow-md shadow-primary/20",
                                                                    submitted && currentSelection === opt && isPairCorrect && "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600",
                                                                    submitted && currentSelection === opt && !isPairCorrect && "bg-destructive border-destructive text-white hover:bg-destructive"
                                                                )}
                                                            >
                                                                {opt}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* WRITING */}
                                {q.type === 'writing' && (
                                    <Textarea
                                        disabled={submitted}
                                        placeholder="Type your response..."
                                        value={userAns as string || ""}
                                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        className={cn(
                                            "min-h-[140px] text-lg rounded-xl border-border/60 bg-muted/20 focus:bg-background focus:border-primary transition-all resize-y shadow-sm p-4",
                                            submitted && "border-emerald-500"
                                        )}
                                    />
                                )}

                                {/* MEDIA (AUDIO/VIDEO) */}
                                {(q.type === 'audio' || q.type === 'video') && (
                                    <div className="pt-2">
                                        {userAns ? (
                                            <div className="flex items-center gap-4 text-emerald-600 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 max-w-sm">
                                                <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-foreground">Response Recorded</p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">Ready to submit</p>
                                                    <button
                                                        onClick={() => handleAnswerChange(q.id, "")}
                                                        disabled={submitted}
                                                        className="text-xs font-semibold text-destructive hover:underline mt-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-3">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleAnswerChange(q.id, "mock_file.mp3")}
                                                    className="rounded-xl border-dashed border-2 h-14 px-6 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-muted-foreground"
                                                >
                                                    <UploadCloud className="w-5 h-5 mr-2" /> Upload File
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleAnswerChange(q.id, "mock_recording.mp3")}
                                                    className="rounded-xl h-14 px-6 bg-secondary/80 hover:bg-secondary text-foreground"
                                                >
                                                    {q.type === 'audio' ? <Mic className="w-5 h-5 mr-2" /> : <VideoIcon className="w-5 h-5 mr-2" />}
                                                    Record {q.type === 'audio' ? 'Audio' : 'Video'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* EXPLANATION */}
                                {submitted && q.explanation && (
                                    <div className="mt-8 p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-4 animate-in fade-in slide-in-from-top-2">
                                        <HelpCircle className="w-6 h-6 text-blue-600 shrink-0" />
                                        <div>
                                            <span className="font-bold text-blue-700 dark:text-blue-300 block text-sm uppercase tracking-wider mb-1">Explanation</span>
                                            <p className="text-blue-900 dark:text-blue-100 leading-relaxed text-sm">
                                                {q.explanation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!submitted ? (
                <div className="pt-4 mt-4 flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={!allAnswered}
                        size="lg"
                        variant="premium"
                        className={cn(
                            "rounded-xl px-8 h-12 text-base font-bold shadow-lg shadow-indigo-500/20 transition-all duration-300",
                            allAnswered ? "hover:scale-105" : "opacity-70 grayscale"
                        )}
                    >
                        Check Answers <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            ) : (
                <Card className="mt-12 border-border/60 shadow-xl shadow-black/5 bg-gradient-to-br from-card to-secondary/20 overflow-hidden">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner border",
                                questions.reduce((acc, q) => {
                                    const ans = answers[q.id];
                                    if (q.type === 'multiple-choice' && ans === q.correctAnswer) return acc + 1;
                                    if (ans) return acc + 1;
                                    return acc;
                                }, 0) / questions.length > 0.7
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-primary/10 text-primary border-primary/20"
                            )}>
                                {Math.round((questions.reduce((acc, q) => {
                                    const ans = answers[q.id];
                                    if (q.type === 'multiple-choice') return acc + (ans === q.correctAnswer ? 1 : 0);
                                    if (q.type === 'fill-blank') return acc + (String(ans || "").toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim() ? 1 : 0);
                                    if (q.type === 'matching') return acc + (q.matchingPairs?.every(p => ans?.[p.left] === p.right) ? 1 : 0);
                                    return acc + (ans ? 1 : 0);
                                }, 0) / questions.length) * 100)}%
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">Quiz Completed</h3>
                                <p className="text-muted-foreground">
                                    You answered {questions.reduce((acc, q) => {
                                        const ans = answers[q.id];
                                        if (q.type === 'multiple-choice') return acc + (ans === q.correctAnswer ? 1 : 0);
                                        return acc + (ans ? 1 : 0);
                                    }, 0)} out of {questions.length} questions correctly.
                                </p>
                            </div>
                        </div>

                        {onComplete && (
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => { setSubmitted(false); setAnswers({}); }} className="gap-2 rounded-xl h-12 px-6 border-border/60 bg-background hover:bg-secondary">
                                    <RefreshCw className="w-4 h-4" /> Reset
                                </Button>
                                <Button className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Continue Learning
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
