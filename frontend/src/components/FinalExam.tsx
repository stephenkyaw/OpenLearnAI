import { CheckCircle, Clock, AlertCircle, Mic, Video as VideoIcon, UploadCloud, Award } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { Question } from "@/data/mockCourse";

interface FinalExamProps {
    title: string;
    description: string;
    durationMinutes: number;
    questions: Question[];
    passingScore: number;
    onComplete: (score: number, passed: boolean) => void;
}

export function FinalExam({ title, description, durationMinutes, questions, passingScore, onComplete }: FinalExamProps) {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    // Answers are Record<qId, value>. 
    // Value is string | number | Record<string, string> (for matching).
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [score, setScore] = useState(0);

    // Memoize shuffled options for matching questions
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
                // Manual/Subjective types assume correct if answered in this mock
                if (val) correctCount++;
            }
        });

        const finalScore = Math.round((correctCount / questions.length) * 100);
        setScore(finalScore);
        setFinished(true);
        onComplete(finalScore, finalScore >= passingScore);
    };

    if (!started) {
        return (
            <div className="flex-1 overflow-y-auto bg-white h-full">
                <div className="px-8 py-16 max-w-4xl mx-auto">
                    <div className="text-center mb-16 space-y-6">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-50 text-red-600 mb-4 ring-1 ring-red-100">
                            <Award className="h-10 w-10" />
                        </div>

                        <div>
                            <div className="text-sm font-medium text-slate-400 mb-3 tracking-wide uppercase">
                                Final Assessment
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-serif italic">
                                "{description}"
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 pt-4">
                            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                {durationMinutes} Minutes
                            </span>
                            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <AlertCircle className="w-4 h-4 mr-2 text-slate-400" />
                                {questions.length} Questions
                            </span>
                            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <CheckCircle className="w-4 h-4 mr-2 text-slate-400" />
                                {passingScore}% Passing
                            </span>
                        </div>
                    </div>

                    <div className="max-w-xl mx-auto text-center border-t border-slate-100 pt-12">
                        <p className="text-slate-500 mb-8">Ready to begin? The timer will start immediately.</p>
                        <button
                            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                            onClick={() => setStarted(true)}
                        >
                            Start Final Exam
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (finished) {
        const passed = score >= passingScore;
        return (
            <div className="flex-1 overflow-y-auto bg-white h-full">
                <div className="max-w-2xl mx-auto text-center space-y-8 pt-16 pb-20">
                    <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4",
                        passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    )}>
                        <span className={cn(
                            "text-3xl font-bold",
                            passed ? "text-green-700" : "text-red-700"
                        )}>{score}%</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">{passed ? "Congratulations!" : "Keep Practicing"}</h2>
                        <p className="text-slate-600 text-base">
                            {passed ? "You have successfully passed the final exam." : "You did not meet the passing score. Review the course material and try again."}
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center mt-8">
                        <button
                            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                            onClick={() => {
                                setStarted(false);
                                setFinished(false);
                                setTimeLeft(durationMinutes * 60);
                                setAnswers({});
                                setScore(0);
                            }}
                        >
                            Retry Exam
                        </button>
                        <button
                            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                            onClick={() => window.location.reload()}
                        >
                            Return to Course
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-white h-full">
            <div className="max-w-4xl mx-auto px-8 py-16">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-6 mb-12 flex justify-between items-center -mx-8 px-8 border-b border-slate-100/50">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                        <p className="text-sm text-slate-500 mt-1">{questions.length} questions • {passingScore}% to pass</p>
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium",
                        timeLeft < 60 ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"
                    )}>
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="space-y-12 max-w-3xl">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="space-y-5">
                            <div className="flex gap-4">
                                <span className="font-bold text-slate-400 flex-shrink-0 mt-1 text-base">{idx + 1}.</span>
                                <div className="flex-1 space-y-5">
                                    <p className="text-slate-900 text-base leading-7">{q.text}</p>

                                    {/* MULTIPLE CHOICE */}
                                    {q.type === 'multiple-choice' && q.options && (
                                        <div className="space-y-2.5">
                                            {q.options.map((opt, optIdx) => (
                                                <div
                                                    key={optIdx}
                                                    onClick={() => handleAnswerChange(q.id, optIdx)}
                                                    className={cn(
                                                        "flex items-start gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all",
                                                        answers[q.id] === optIdx && "bg-indigo-50",
                                                        answers[q.id] !== optIdx && "hover:bg-slate-50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                                                        answers[q.id] === optIdx ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                                                    )}>
                                                        {answers[q.id] === optIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                                                    </div>
                                                    <span className="text-slate-800 text-sm leading-6">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* MATCHING */}
                                    {q.type === 'matching' && q.matchingPairs && (
                                        <div className="space-y-6 max-w-2xl">
                                            {q.matchingPairs.map((pair, pIdx) => {
                                                const currentSelection = answers[q.id]?.[pair.left] || "";

                                                return (
                                                    <div key={pIdx} className="space-y-2">
                                                        <div className="text-slate-900 text-sm font-medium">{pair.left}</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shuffledOptionsMap[q.id]?.map((opt, oIdx) => (
                                                                <button
                                                                    key={oIdx}
                                                                    onClick={() => handleMatchingChange(q.id, pair.left, opt)}
                                                                    className={cn(
                                                                        "px-4 py-2 text-sm rounded-md border transition-all",
                                                                        currentSelection === opt && "bg-indigo-50 border-indigo-600 text-indigo-700",
                                                                        currentSelection !== opt && "border-slate-200 text-slate-700 hover:bg-slate-50"
                                                                    )}
                                                                >
                                                                    {opt}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* FILL BLANK */}
                                    {q.type === 'fill-blank' && (
                                        <Input
                                            placeholder={q.placeholder || "Type answer..."}
                                            value={answers[q.id] as string || ""}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                            className="max-w-md border-slate-200 focus:border-indigo-500 text-slate-900"
                                        />
                                    )}

                                    {/* WRITING */}
                                    {q.type === 'writing' && (
                                        <textarea
                                            className="w-full min-h-[120px] p-3 rounded-md border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                                            placeholder={q.placeholder || "Write here..."}
                                            value={answers[q.id] as string || ""}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        />
                                    )}

                                    {/* MULTIMEDIA */}
                                    {(q.type === 'audio' || q.type === 'video') && (
                                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center hover:border-slate-300 transition-colors">
                                            {answers[q.id] ? (
                                                <div className="text-center space-y-2">
                                                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                                                    <p className="font-medium text-sm text-slate-900">Response Recorded</p>
                                                    <button
                                                        onClick={() => handleAnswerChange(q.id, "")}
                                                        className="text-sm text-slate-600 hover:text-slate-900 underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center space-y-4">
                                                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto">
                                                        {q.type === 'audio' ? <Mic className="h-5 w-5" /> : <VideoIcon className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm text-slate-900">
                                                            {q.type === 'audio' ? "Record Audio" : "Record Video"}
                                                        </p>
                                                        <p className="text-xs text-slate-500">Upload or record directly</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "file.mp3")}
                                                            className="px-4 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-2"
                                                        >
                                                            <UploadCloud className="h-4 w-4" /> Upload
                                                        </button>
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "rec.mp3")}
                                                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                                        >
                                                            Record
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="mt-16 flex justify-center pb-20">
                    <button
                        className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length < questions.length}
                    >
                        Submit Final Exam
                    </button>
                </div>
            </div>
        </div>
    );
}
