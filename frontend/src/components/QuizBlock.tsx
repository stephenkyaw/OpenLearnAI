import { Button } from "@/components/ui/button";
import { CheckCircle, Mic, Video as VideoIcon, UploadCloud } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { Question } from "@/data/mockCourse";

interface QuizBlockProps {
    title: string;
    questions: Question[];
    onComplete?: (score: number) => void;
    isEmbedded?: boolean;
}

export function QuizBlock({ title, questions, onComplete, isEmbedded = false }: QuizBlockProps) {
    // Store answers. 
    // For Matching: answers[qId] = { "leftItem1": "selectedRight1", "leftItem2": "selectedRight2" } (stored as JSON string or handled via separate state? Let's use any for flexibility here)
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);
    // If embedded, run minimalist mode (no outer card styling)
    const containerClasses = isEmbedded
        ? "w-full space-y-6"
        : "w-full max-w-3xl space-y-6";

    // Memoize shuffled options for matching questions so they don't re-shuffle on render
    const shuffledOptionsMap = useMemo(() => {
        const map: Record<string, string[]> = {};
        questions.forEach(q => {
            if (q.type === 'matching' && q.matchingPairs) {
                // Get all 'right' sides and shuffle them
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
                // Check if every pair is correct
                if (q.matchingPairs && userAns) {
                    const allCorrect = q.matchingPairs.every(pair => userAns[pair.left] === pair.right);
                    if (allCorrect) correctCount++;
                }
            } else {
                // Manual Grading (Writing, etc) - Assume correct if exists
                if (userAns) correctCount++;
            }
        });

        if (onComplete) onComplete(correctCount);
    };

    const isAnswered = (q: Question) => {
        const val = answers[q.id];
        if (q.type === 'matching' && q.matchingPairs) {
            // Must have selected a value for EVERY left item
            if (!val) return false;
            return q.matchingPairs.every(p => val[p.left]);
        }
        return val !== undefined && val !== "";
    };

    const allAnswered = questions.every(isAnswered);

    return (
        <div className={containerClasses}>
            {!isEmbedded && (
                <div className="mb-8 mt-12">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">Complete the following questions to check your understanding.</p>
                </div>
            )}

            <div className="space-y-10">
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
                        <div key={q.id} className="space-y-4">
                            <div className="flex gap-4">
                                <span className="font-bold text-muted-foreground flex-shrink-0 mt-1 text-base">{idx + 1}.</span>
                                <div className="flex-1 space-y-5">
                                    <p className="text-foreground text-base leading-7 font-medium">{q.text}</p>

                                    {/* --- MULTIPLE CHOICE --- */}
                                    {q.type === 'multiple-choice' && q.options && (
                                        <div className="space-y-2.5">
                                            {q.options.map((opt, optIdx) => (
                                                <div
                                                    key={optIdx}
                                                    onClick={() => handleAnswerChange(q.id, optIdx)}
                                                    className={cn(
                                                        "flex items-start gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all border border-transparent",
                                                        !submitted && userAns === optIdx && "bg-primary/10 border-primary/20",
                                                        !submitted && userAns !== optIdx && "bg-muted/30 hover:bg-muted border-border/30",
                                                        submitted && q.correctAnswer === optIdx && "bg-green-500/10 border-green-500/20",
                                                        submitted && userAns === optIdx && userAns !== q.correctAnswer && "bg-destructive/10 border-destructive/20",
                                                        submitted && userAns !== optIdx && q.correctAnswer !== optIdx && "opacity-50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                                                        !submitted && userAns === optIdx ? "border-primary bg-primary" : "border-muted-foreground/30",
                                                        submitted && q.correctAnswer === optIdx && "border-green-600 bg-green-600",
                                                        submitted && userAns === optIdx && userAns !== q.correctAnswer && "border-destructive bg-destructive"
                                                    )}>
                                                        {(!submitted && userAns === optIdx) && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm leading-6",
                                                        !submitted && userAns === optIdx ? "text-foreground font-medium" : "text-muted-foreground",
                                                        submitted && q.correctAnswer === optIdx ? "text-green-700" : ""
                                                    )}>{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* --- FILL IN THE BLANK --- */}
                                    {q.type === 'fill-blank' && (
                                        <div className="max-w-md">
                                            <Input
                                                disabled={submitted}
                                                placeholder={q.placeholder || "Type your answer..."}
                                                value={userAns as string || ""}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className={cn(
                                                    "border-input focus:border-primary text-foreground bg-background",
                                                    submitted && isCorrect && "border-green-500 bg-green-500/10",
                                                    submitted && !isCorrect && "border-destructive bg-destructive/10"
                                                )}
                                            />
                                            {submitted && !isCorrect && (
                                                <p className="text-xs text-muted-foreground mt-2">Correct answer: <span className="font-medium text-foreground">{q.correctAnswer}</span></p>
                                            )}
                                        </div>
                                    )}

                                    {/* --- MATCHING --- */}
                                    {q.type === 'matching' && q.matchingPairs && (
                                        <div className="space-y-6 max-w-2xl">
                                            {q.matchingPairs.map((pair, pIdx) => {
                                                const currentSelection = userAns?.[pair.left] || "";
                                                const isPairCorrect = currentSelection === pair.right;

                                                return (
                                                    <div key={pIdx} className="space-y-2">
                                                        <div className="text-foreground text-sm font-medium">{pair.left}</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shuffledOptionsMap[q.id]?.map((opt, oIdx) => (
                                                                <button
                                                                    key={oIdx}
                                                                    disabled={submitted}
                                                                    onClick={() => handleMatchingChange(q.id, pair.left, opt)}
                                                                    className={cn(
                                                                        "px-4 py-2 text-sm rounded-lg border transition-all",
                                                                        !submitted && currentSelection === opt && "bg-primary/10 border-primary text-primary font-medium",
                                                                        !submitted && currentSelection !== opt && "border-border text-muted-foreground hover:bg-muted",
                                                                        submitted && currentSelection === opt && isPairCorrect && "bg-green-500/10 border-green-600 text-green-700",
                                                                        submitted && currentSelection === opt && !isPairCorrect && "bg-destructive/10 border-destructive text-destructive",
                                                                        submitted && currentSelection !== opt && "border-border text-muted-foreground opacity-50"
                                                                    )}
                                                                >
                                                                    {opt}
                                                                    {submitted && currentSelection === opt && (
                                                                        <span className="ml-2">
                                                                            {isPairCorrect ? "✓" : "✗"}
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* --- WRITING --- */}
                                    {q.type === 'writing' && (
                                        <div className="space-y-2">
                                            <textarea
                                                disabled={submitted}
                                                placeholder={q.placeholder || "Write your response here..."}
                                                value={userAns as string || ""}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className={cn(
                                                    "w-full min-h-[120px] p-3 rounded-xl border border-input bg-background/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                                                    submitted && "border-green-500 bg-green-500/5"
                                                )}
                                            />
                                            {submitted && (
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Submitted for review
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- MULTIMEDIA (AUDIO/VIDEO) --- */}
                                    {(q.type === 'audio' || q.type === 'video') && (
                                        <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors bg-muted/10">
                                            {userAns ? (
                                                <div className="text-center space-y-2">
                                                    <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
                                                    <p className="font-medium text-foreground">File Uploaded</p>
                                                    <button
                                                        onClick={() => handleAnswerChange(q.id, "")}
                                                        disabled={submitted}
                                                        className="text-sm text-muted-foreground hover:text-destructive underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center space-y-4">
                                                    <div className="w-12 h-12 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center mx-auto">
                                                        {q.type === 'audio' ? <Mic className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-medium text-sm text-foreground">
                                                            {q.type === 'audio' ? "Record Audio Response" : "Record Video Response"}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground">or upload a file</p>
                                                    </div>
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "mock_file.mp3")}
                                                            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-foreground"
                                                        >
                                                            <UploadCloud className="w-4 h-4" /> Upload
                                                        </button>
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "mock_recording.mp3")}
                                                            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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

                            {submitted && q.explanation && (
                                <div className="ml-9 pl-4 border-l-2 border-primary/20 text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground block mb-1">Explanation:</span>
                                    {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {!submitted && (
                <div className="pt-8 flex justify-start">
                    <Button
                        onClick={handleSubmit}
                        disabled={!allAnswered}
                        className="px-8 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        Submit
                    </Button>
                </div>
            )}

            {submitted && (
                <div className="pt-8">
                    <div className="flex items-center justify-between text-base">
                        <span className="flex items-center text-foreground font-medium">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Quiz Completed
                        </span>
                        <span className="text-primary font-bold text-lg">
                            {questions.reduce((acc, q) => {
                                const ans = answers[q.id];
                                if (q.type === 'multiple-choice') return acc + (ans === q.correctAnswer ? 1 : 0);
                                if (q.type === 'fill-blank') return acc + (String(ans || "").toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim() ? 1 : 0);
                                if (q.type === 'matching') return acc + (q.matchingPairs?.every(p => ans?.[p.left] === p.right) ? 1 : 0);
                                return acc + (ans ? 1 : 0);
                            }, 0)} / {questions.length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
