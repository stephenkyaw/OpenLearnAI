import { CheckCircle, Mic, Video as VideoIcon, Award, PlayCircle, RefreshCw, ArrowLeft, Timer, HelpCircle, UploadCloud, Flag, Clock, ChevronLeft, Send, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { Question } from "@/data/mockCourse";

interface FinalExamProps {
    title: string;
    description: string;
    durationMinutes: number;
    questions: Question[];
    passingScore: number;
    onComplete: (score: number, passed: boolean) => void;
}

const QUESTIONS_PER_PAGE = 5;

export function FinalExam({ title, description, durationMinutes, questions, passingScore, onComplete }: FinalExamProps) {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [score, setScore] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

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


    useEffect(() => {
        if (!started || finished) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [started, finished]);

    // Reset pagination when starting/restarting
    useEffect(() => {
        if (started && !finished) {
            setCurrentPage(0);
            window.scrollTo(0, 0);
        }
    }, [started, finished]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (qId: string, value: any) => {
        if (finished) return;
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const handleMatchingChange = (qId: string, leftItem: string, selectedValue: string) => {
        if (finished) return;
        setAnswers(prev => {
            const currentMap = prev[qId] || {};
            return {
                ...prev,
                [qId]: { ...currentMap, [leftItem]: selectedValue }
            };
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach(q => {
            const val = answers[q.id];
            if (q.type === 'multiple-choice') {
                if (val === q.correctAnswer) correctCount++;
            } else if (q.type === 'fill-blank') {
                if (String(val || "").toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim()) correctCount++;
            } else if (q.type === 'matching') {
                if (q.matchingPairs && val) {
                    const allCorrect = q.matchingPairs.every(pair => val[pair.left] === pair.right);
                    if (allCorrect) correctCount++;
                }
            } else {
                if (val) correctCount++;
            }
        });

        const finalScore = Math.round((correctCount / questions.length) * 100);
        setScore(finalScore);
        setFinished(true);
        onComplete(finalScore, finalScore >= passingScore);
    };

    const goNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Calculate Progress for Circle
    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / questions.length) * 100;
    const circleRadius = 18;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circleCircumference - (progressPercentage / 100) * circleCircumference;

    // Get current page questions
    const currentQuestions = questions.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE);

    // ------------------------------------------------------------------------
    // RENDER: NOT STARTED (Hero Card)
    // ------------------------------------------------------------------------
    if (!started) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-12 animate-fade-in relative z-10">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                <div className="max-w-2xl w-full text-center space-y-10 relative z-10 px-4">
                    <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-2 shadow-sm border border-primary/10">
                        <Award className="w-20 h-20" />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full border border-border/50">Final Assessment</span>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">{title}</h1>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">{description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 md:gap-8 py-4">
                        <div className="flex flex-col items-center p-5 rounded-2xl bg-secondary/20 border border-border/40 backdrop-blur-sm">
                            <Clock className="w-6 h-6 text-primary mb-2 opacity-80" />
                            <div className="text-2xl font-bold font-mono text-foreground">{durationMinutes}m</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">Time Limit</div>
                        </div>
                        <div className="flex flex-col items-center p-5 rounded-2xl bg-secondary/20 border border-border/40 backdrop-blur-sm">
                            <HelpCircle className="w-6 h-6 text-primary mb-2 opacity-80" />
                            <div className="text-2xl font-bold font-mono text-foreground">{questions.length}</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">Questions</div>
                        </div>
                        <div className="flex flex-col items-center p-5 rounded-2xl bg-secondary/20 border border-border/40 backdrop-blur-sm">
                            <Flag className="w-6 h-6 text-primary mb-2 opacity-80" />
                            <div className="text-2xl font-bold font-mono text-foreground">{passingScore}%</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">Pass Score</div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setStarted(true)}
                        size="lg"
                        variant="premium"
                        className="px-16 h-16 text-xl rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 w-full md:w-auto hover:scale-105 transition-all duration-300 font-bold"
                    >
                        Start Final Exam <PlayCircle className="ml-3 w-6 h-6" />
                    </Button>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------------------
    // RENDER: FINISHED (Results Card)
    // ------------------------------------------------------------------------
    if (finished) {
        const passed = score >= passingScore;
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-12 animate-fade-in relative z-10">
                <div className={cn(
                    "w-full h-2 absolute top-0 inset-x-0 opacity-50",
                    passed ? "bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" : "bg-gradient-to-r from-destructive/0 via-destructive/50 to-destructive/0"
                )} />

                <div className="max-w-xl w-full text-center relative z-10 px-4">
                    <div className={cn(
                        "w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-10 shadow-3xl border-8 relative transition-all duration-500",
                        passed ? "bg-card text-emerald-600 border-emerald-500/20 shadow-emerald-500/20" : "bg-card text-destructive border-destructive/20 shadow-destructive/20"
                    )}>
                        <span className="text-5xl font-black tracking-tighter">{score}%</span>
                        <div className={cn(
                            "absolute -bottom-4 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg border",
                            passed ? "bg-emerald-500 text-white border-emerald-400" : "bg-destructive text-white border-destructive"
                        )}>
                            {passed ? "Passed" : "Failed"}
                        </div>
                    </div>

                    <h2 className="text-4xl font-black mb-6 text-foreground tracking-tight">{passed ? "Excellent Work!" : "Keep Practicing"}</h2>
                    <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-md mx-auto">
                        {passed ? "You've demonstrated mastery of the course material." : `You missed the passing score of ${passingScore}%. Review the material and try again.`}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 rounded-xl border-border/60 hover:bg-secondary/50 text-base font-semibold"
                            onClick={() => { setStarted(false); setFinished(false); setScore(0); setAnswers({}); setTimeLeft(durationMinutes * 60); setCurrentPage(0); }}
                        >
                            <RefreshCw className="mr-2 w-5 h-5" /> Rewrite Exam
                        </Button>
                        <Button
                            variant={passed ? "premium" : "secondary"}
                            size="lg"
                            className="h-14 px-10 rounded-xl shadow-lg text-base font-bold"
                            onClick={() => window.location.reload()}
                        >
                            <ArrowLeft className="mr-2 w-5 h-5" /> Return Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------------------
    // RENDER: IN PROGRESS (Pagination)
    // ------------------------------------------------------------------------

    return (
        <div className="flex-1 flex flex-col h-full relative">

            {/* Floating Glass Header */}
            <div className="sticky top-2 z-40 mb-10">
                <div className="bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-2xl p-4 flex items-center justify-between mx-auto max-w-4xl ring-1 ring-black/5">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-violet-600 rounded-xl flex items-center justify-center text-white shadow-md">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-base text-foreground leading-tight">Final Exam</h2>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-0.5">Page {currentPage + 1} of {totalPages}</p>
                        </div>
                    </div>

                    {/* Integrated Progress & Timer */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center gap-4 px-6 border-r border-border/50 mr-6">
                            <div className="text-right">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</div>
                                <div className="text-sm font-bold text-foreground">
                                    <span className="text-primary">{answeredCount}</span> / {questions.length}
                                </div>
                            </div>

                            {/* SVG Progress Circle */}
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                                    {/* Track */}
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={circleRadius}
                                        fill="none"
                                        className="stroke-muted/30"
                                        strokeWidth="4"
                                    />
                                    {/* Indicator */}
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={circleRadius}
                                        fill="none"
                                        className="stroke-primary transition-all duration-500 ease-out"
                                        strokeWidth="4"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className={cn(
                            "pl-0 md:pl-0 flex items-center gap-3 font-mono text-xl font-bold transition-colors",
                            timeLeft < 300 ? "text-destructive custom-pulse" : "text-foreground"
                        )}>
                            <div className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50",
                                timeLeft < 300 && "bg-destructive/10 border-destructive/20"
                            )}>
                                <Timer className={cn("w-5 h-5", timeLeft < 300 ? "text-destructive" : "text-primary")} />
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Container (Unified Card/List) */}
            <div className="pb-32 max-w-3xl mx-auto w-full flex-1">

                <div className="space-y-8">
                    {currentQuestions.map((q, idx) => {
                        const actualIndex = (currentPage * QUESTIONS_PER_PAGE) + idx;
                        return (
                            <div key={q.id} className="py-2 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>

                                <div className="flex items-start gap-5 mb-8">
                                    <div className="flex-none pt-1">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-sm font-bold text-foreground border border-border/50 shadow-sm">
                                            {actualIndex + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground leading-tight pt-1">
                                        {q.text}
                                    </h3>
                                </div>

                                <div className="pl-0 md:pl-14">
                                    {/* MULTIPLE CHOICE */}
                                    {q.type === 'multiple-choice' && q.options && (
                                        <div className="space-y-2.5">
                                            {q.options.map((opt, optIdx) => (
                                                <div
                                                    key={optIdx}
                                                    onClick={() => handleAnswerChange(q.id, optIdx)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer group/opt",
                                                        answers[q.id] === optIdx
                                                            ? "border-primary bg-primary/5 text-foreground shadow-sm"
                                                            : "border-transparent bg-secondary/20 hover:bg-secondary/40 hover:border-border/50 text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                                        answers[q.id] === optIdx ? "border-primary" : "border-muted-foreground/30"
                                                    )}>
                                                        {answers[q.id] === optIdx && <div className="w-3 h-3 bg-primary rounded-full animate-in zoom-in" />}
                                                    </div>
                                                    <span className="text-sm font-medium">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* FILL BLANK */}
                                    {q.type === 'fill-blank' && (
                                        <div className="max-w-md">
                                            <Input
                                                placeholder={q.placeholder || "Type your answer..."}
                                                value={answers[q.id] as string || ""}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className="h-11 px-4 rounded-lg text-base border-2 border-border/40 bg-muted/10 focus:bg-background focus:border-primary transition-all shadow-sm"
                                            />
                                        </div>
                                    )}

                                    {/* MATCHING */}
                                    {q.type === 'matching' && q.matchingPairs && (
                                        <div className="space-y-6 pt-2">
                                            {q.matchingPairs.map((pair, pIdx) => {
                                                const currentSelection = answers[q.id]?.[pair.left] || "";
                                                return (
                                                    <div key={pIdx} className="bg-secondary/10 p-5 rounded-2xl border-2 border-dashed border-border/40">
                                                        <div className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                                            {pair.left}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shuffledOptionsMap[q.id]?.map((opt, oIdx) => (
                                                                <Button
                                                                    key={oIdx}
                                                                    variant={currentSelection === opt ? "default" : "outline"}
                                                                    onClick={() => handleMatchingChange(q.id, pair.left, opt)}
                                                                    className={cn(
                                                                        "rounded-lg border-2 text-sm h-10 px-4",
                                                                        currentSelection === opt
                                                                            ? "border-primary shadow-md shadow-primary/20"
                                                                            : "border-transparent bg-card hover:border-border/50"
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
                                            placeholder={q.placeholder || "Write your response here..."}
                                            value={answers[q.id] as string || ""}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                            className="min-h-[200px] text-lg rounded-xl border-2 border-border/40 bg-muted/10 focus:bg-background focus:border-primary transition-all resize-y shadow-sm p-6 leading-relaxed"
                                        />
                                    )}

                                    {/* MEDIA (AUDIO/VIDEO) */}
                                    {(q.type === 'audio' || q.type === 'video') && (
                                        <div className="pt-2">
                                            {answers[q.id] ? (
                                                <div className="flex items-center gap-4 text-emerald-600 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 max-w-sm">
                                                    <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                                        <CheckCircle className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-foreground text-lg">Response Recorded</p>
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "")}
                                                            className="text-sm font-semibold text-destructive hover:underline mt-2"
                                                        >
                                                            Remove & Re-record
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleAnswerChange(q.id, "mock_file.mp3")}
                                                        className="rounded-xl border-dashed border-2 h-16 px-8 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-muted-foreground text-lg"
                                                    >
                                                        <UploadCloud className="w-6 h-6 mr-3" /> Upload File
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => handleAnswerChange(q.id, "mock_recording.mp3")}
                                                        className="rounded-xl h-16 px-8 bg-secondary/80 hover:bg-secondary text-foreground text-lg"
                                                    >
                                                        {q.type === 'audio' ? <Mic className="w-6 h-6 mr-3" /> : <VideoIcon className="w-6 h-6 mr-3" />}
                                                        Record {q.type === 'audio' ? 'Audio' : 'Video'}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FLOATING NAVIGATION PILL */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="bg-foreground/5 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-full p-2 pl-3 flex items-center gap-2 ring-1 ring-black/5">

                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={currentPage === 0}
                            onClick={goPrevPage}
                            className="w-12 h-12 rounded-full hover:bg-white/20 text-foreground transition-all disabled:opacity-30"
                            title="Previous Page"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <div className="h-8 w-px bg-foreground/10 mx-1" />

                        {/* Show Submit button ONLY on last PAGE */}
                        {currentPage === totalPages - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={Object.keys(answers).length < questions.length}
                                size="lg"
                                variant="premium"
                                className={cn(
                                    "rounded-full px-8 h-12 text-base font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300",
                                    Object.keys(answers).length < questions.length ? "opacity-70 grayscale" : "hover:scale-105"
                                )}
                            >
                                Submit Exam <Send className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={goNextPage}
                                size="lg"
                                className="rounded-full px-8 h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-105"
                            >
                                Next Page <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
