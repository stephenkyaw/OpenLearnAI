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
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-600">Complete the following questions to check your understanding.</p>
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
                                <span className="font-bold text-slate-400 flex-shrink-0 mt-1 text-base">{idx + 1}.</span>
                                <div className="flex-1 space-y-5">
                                    <p className="text-slate-900 text-base leading-7">{q.text}</p>

                                    {/* --- MULTIPLE CHOICE --- */}
                                    {q.type === 'multiple-choice' && q.options && (
                                        <div className="space-y-2.5">
                                            {q.options.map((opt, optIdx) => (
                                                <div
                                                    key={optIdx}
                                                    onClick={() => handleAnswerChange(q.id, optIdx)}
                                                    className={cn(
                                                        "flex items-start gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all",
                                                        !submitted && userAns === optIdx && "bg-indigo-50",
                                                        !submitted && userAns !== optIdx && "hover:bg-slate-50",
                                                        submitted && q.correctAnswer === optIdx && "bg-green-50",
                                                        submitted && userAns === optIdx && userAns !== q.correctAnswer && "bg-red-50",
                                                        submitted && userAns !== optIdx && q.correctAnswer !== optIdx && "opacity-40"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                                                        !submitted && userAns === optIdx ? "border-indigo-600 bg-indigo-600" : "border-slate-300",
                                                        submitted && q.correctAnswer === optIdx && "border-green-600 bg-green-600",
                                                        submitted && userAns === optIdx && userAns !== q.correctAnswer && "border-red-600 bg-red-600"
                                                    )}>
                                                        {(!submitted && userAns === optIdx) && <div className="w-2 h-2 bg-white rounded-full" />}
                                                    </div>
                                                    <span className="text-slate-800 text-sm leading-6">{opt}</span>
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
                                                    "border-slate-200 focus:border-indigo-500 text-slate-900",
                                                    submitted && isCorrect && "border-green-500 bg-green-50/50",
                                                    submitted && !isCorrect && "border-red-500 bg-red-50/50"
                                                )}
                                            />
                                            {submitted && !isCorrect && (
                                                <p className="text-xs text-slate-600 mt-2">Correct answer: <span className="font-medium text-slate-900">{q.correctAnswer}</span></p>
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
                                                        <div className="text-slate-900 text-sm font-medium">{pair.left}</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shuffledOptionsMap[q.id]?.map((opt, oIdx) => (
                                                                <button
                                                                    key={oIdx}
                                                                    disabled={submitted}
                                                                    onClick={() => handleMatchingChange(q.id, pair.left, opt)}
                                                                    className={cn(
                                                                        "px-4 py-2 text-sm rounded-md border transition-all",
                                                                        !submitted && currentSelection === opt && "bg-indigo-50 border-indigo-600 text-indigo-700",
                                                                        !submitted && currentSelection !== opt && "border-slate-200 text-slate-700 hover:bg-slate-50",
                                                                        submitted && currentSelection === opt && isPairCorrect && "bg-green-50 border-green-600 text-green-700",
                                                                        submitted && currentSelection === opt && !isPairCorrect && "bg-red-50 border-red-600 text-red-700",
                                                                        submitted && currentSelection !== opt && "border-slate-200 text-slate-400 opacity-50"
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
                                                    "w-full min-h-[120px] p-3 rounded-md border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                    submitted && "border-green-500 bg-green-50/50"
                                                )}
                                            />
                                            {submitted && (
                                                <div className="flex items-center text-xs text-slate-600">
                                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-600" /> Submitted for review
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- MULTIMEDIA (AUDIO/VIDEO) --- */}
                                    {(q.type === 'audio' || q.type === 'video') && (
                                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center hover:border-slate-300 transition-colors">
                                            {userAns ? (
                                                <div className="text-center space-y-2">
                                                    <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
                                                    <p className="font-medium text-slate-900">File Uploaded</p>
                                                    <button
                                                        onClick={() => handleAnswerChange(q.id, "")}
                                                        disabled={submitted}
                                                        className="text-sm text-slate-600 hover:text-slate-900 underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center space-y-4">
                                                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto">
                                                        {q.type === 'audio' ? <Mic className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-medium text-sm text-slate-900">
                                                            {q.type === 'audio' ? "Record Audio Response" : "Record Video Response"}
                                                        </h4>
                                                        <p className="text-xs text-slate-500">or upload a file</p>
                                                    </div>
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "mock_file.mp3")}
                                                            className="px-4 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-2"
                                                        >
                                                            <UploadCloud className="w-4 h-4" /> Upload
                                                        </button>
                                                        <button
                                                            onClick={() => handleAnswerChange(q.id, "mock_recording.mp3")}
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

                            {submitted && q.explanation && (
                                <div className="ml-9 pl-4 border-l-2 border-indigo-200 text-sm text-slate-700">
                                    <span className="font-semibold text-slate-900 block mb-1">Explanation:</span>
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        Submit Answers
                    </Button>
                </div>
            )}

            {submitted && (
                <div className="pt-8">
                    <div className="flex items-center justify-between text-base">
                        <span className="flex items-center text-slate-700 font-medium">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Quiz Completed
                        </span>
                        <span className="text-indigo-700 font-bold text-lg">
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
