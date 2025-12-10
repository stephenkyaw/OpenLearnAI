import { CourseLayout } from "@/layouts/CourseLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, Video, FileText, ImageIcon, Link as LinkIcon, ExternalLink, Globe, Award, LayoutDashboard, Flag, Clock, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { QuizBlock } from "@/components/QuizBlock";
import { CourseOverview } from "@/components/CourseOverview";
import { FinalExam } from "@/components/FinalExam";
import { useCourse } from "@/context/CourseContext";

export function CoursePage() {
    const { course, isLoading, error, fetchCourse, completeLesson } = useCourse();

    // 1. Initialize view state
    const [viewMode, setViewMode] = useState<'overview' | 'learning' | 'module-quiz' | 'exam'>('overview');

    // 2. Initialize selection state handling potential undefined data
    const [selectedLessonId, setSelectedLessonId] = useState<string>("");

    // Track selected module quiz
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    // Fetch course on mount
    useEffect(() => {
        fetchCourse('english-101');
    }, []);

    // Set initial lesson when course loads
    useEffect(() => {
        if (course && !selectedLessonId) {
            const firstLesson = course.modules?.[0]?.lessons?.[0];
            if (firstLesson) setSelectedLessonId(firstLesson.id);
        }
    }, [course]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Loading course content...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-center max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                    <h3 className="text-xl font-bold">Unable to load course</h3>
                    <p className="text-muted-foreground">{error || "Course data not available."}</p>
                    <Button onClick={() => fetchCourse('english-101')} variant="outline">Retry</Button>
                </div>
            </div>
        );
    }

    const COURSE_CONTENT = course;

    // 3. Helper to find current lesson data
    const currentLesson = COURSE_CONTENT.modules
        .flatMap(m => m.lessons)
        .find(l => l.id === selectedLessonId);

    // 4. Helper to find current selected module (for quiz)
    const currentModule = COURSE_CONTENT.modules.find(m => m.id === selectedModuleId);

    const handleStartCourse = () => {
        setViewMode('learning');
    };

    const handleEnterExam = () => {
        setViewMode('exam');
    };

    return (
        <CourseLayout title={COURSE_CONTENT.title}>
            <div className="flex h-[calc(100vh-7rem)] gap-6">

                {/* =========================================================
                    SIDEBAR NAVIGATION (Floating Glass)
                   ========================================================= */}
                {/* =========================================================
                    SIDEBAR NAVIGATION (Clean Solid White)
                   ========================================================= */}
                <div className="w-96 flex-shrink-0 bg-white rounded-3xl hidden md:flex flex-col overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">

                    {/* Sidebar Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-primary mb-3 uppercase tracking-wider bg-primary/5 border border-primary/10 w-fit px-3 py-1.5 rounded-full">
                            <Globe className="w-3 h-3" />
                            <span>Language Learning</span>
                        </div>
                        <h2 className="font-bold text-xl leading-snug mb-4 text-slate-900 cursor-pointer hover:text-primary transition-colors" onClick={() => setViewMode('overview')}>
                            {COURSE_CONTENT.title}
                        </h2>

                        <div className="mb-6">
                            <Button
                                variant={viewMode === 'overview' ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start h-11 text-sm rounded-xl font-medium transition-all",
                                    viewMode === 'overview'
                                        ? "bg-slate-100 text-slate-900 border border-slate-200"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                )}
                                onClick={() => setViewMode('overview')}
                            >
                                <LayoutDashboard className="h-4 w-4 mr-3" /> Course Overview
                            </Button>
                        </div>

                        <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                            <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span className="flex items-center"><Award className="h-3 w-3 mr-1.5 text-amber-500" /> Progress</span>
                                <span className="text-slate-900">{COURSE_CONTENT.progress}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-100">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-sm"
                                    style={{ width: `${COURSE_CONTENT.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Content (Modules List) */}
                    <ScrollArea className="flex-1 min-h-0 px-6 py-4">
                        <div className="space-y-6">
                            {COURSE_CONTENT.modules.map((module, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        {module.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {/* LESSONS */}
                                        {module.lessons.map((lesson) => {
                                            const hasQuiz = lesson.blocks.some(b => b.type === 'quiz');
                                            const isSelected = viewMode === 'learning' && selectedLessonId === lesson.id;

                                            return (
                                                <Button
                                                    key={lesson.id}
                                                    variant="ghost"
                                                    className={cn(
                                                        "w-full justify-start text-sm h-auto py-3.5 px-4 relative rounded-xl transition-all duration-300 border border-transparent",
                                                        isSelected
                                                            ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 border-primary/50"
                                                            : "text-muted-foreground hover:bg-black/5 hover:text-foreground hover:border-black/5"
                                                    )}
                                                    onClick={() => {
                                                        setViewMode('learning');
                                                        setSelectedLessonId(lesson.id);
                                                    }}
                                                >
                                                    {lesson.completed ? (
                                                        <CheckCircle className={cn("h-4 w-4 mr-3 flex-shrink-0", isSelected ? "text-white" : "text-emerald-500")} />
                                                    ) : (
                                                        <PlayCircle className={cn("h-4 w-4 mr-3 flex-shrink-0", isSelected ? "text-white" : "text-muted-foreground")} />
                                                    )}
                                                    <div className="flex-1 text-left leading-snug">
                                                        <span className="block font-medium">
                                                            {lesson.title}
                                                        </span>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className={cn("text-[9px] flex items-center px-1.5 py-0.5 rounded border opacity-90", isSelected ? "bg-white/20 border-white/20 text-white" : "bg-black/5 border-black/5 text-muted-foreground")}>
                                                                <Clock className="h-2 w-2 mr-1" /> {lesson.duration || "20m"}
                                                            </span>
                                                            {hasQuiz && (
                                                                <span className={cn("text-[9px] flex items-center px-1.5 py-0.5 rounded border font-bold", isSelected ? "bg-white/20 border-white/20 text-white" : "bg-orange-50 text-orange-600 border-orange-200")}>
                                                                    QUIZ
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Button>
                                            );
                                        })}

                                        {/* MODULE QUIZ */}
                                        {module.quiz && (
                                            <div className="mt-3">
                                                <button
                                                    className={cn(
                                                        "w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center border-2 border-dashed",
                                                        viewMode === 'module-quiz' && selectedModuleId === module.id
                                                            ? "bg-indigo-50 text-indigo-700 border-indigo-300"
                                                            : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                                                    )}
                                                    onClick={() => {
                                                        setViewMode('module-quiz');
                                                        setSelectedModuleId(module.id);
                                                    }}
                                                >
                                                    <Flag className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span className="text-xs font-semibold">{module.quiz.title}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Final Exam Link */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <button
                                    className={cn(
                                        "w-full px-4 py-4 rounded-lg text-sm font-bold transition-all flex items-center border-2",
                                        viewMode === 'exam'
                                            ? "bg-red-50 text-red-700 border-red-300"
                                            : "text-red-700 border-red-200 hover:bg-red-50 hover:border-red-300"
                                    )}
                                    onClick={handleEnterExam}
                                >
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                        <Award className="h-4 w-4 text-red-600" />
                                    </div>
                                    Final Exam
                                </button>
                            </div>

                        </div>
                    </ScrollArea>
                </div>

                {/* =========================================================
                    MAIN CONTENT AREA (Solid Premium White)
                   ========================================================= */}
                <div className="flex-1 bg-white rounded-3xl flex flex-col overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">

                    {/* --- VIEW: OVERVIEW --- */}
                    {viewMode === 'overview' && (
                        <CourseOverview
                            title={COURSE_CONTENT.title}
                            description={COURSE_CONTENT.description}
                            objectives={COURSE_CONTENT.objectives}
                            syllabus={COURSE_CONTENT.syllabusOverview}
                            onStartCourse={handleStartCourse}
                        />
                    )}

                    {/* --- VIEW: FINAL EXAM --- */}
                    {viewMode === 'exam' && (
                        <ScrollArea className="flex-1 h-full">
                            <div className="p-10">
                                <FinalExam
                                    title="Final Course Assessment"
                                    description="This comprehensive exam covers First Impressions, Email Etiquette, Negotiation, and Presentation Skills. You have 60 minutes."
                                    durationMinutes={60}
                                    questions={COURSE_CONTENT.finalExam.questions}
                                    passingScore={70}
                                    onComplete={(score, passed) => console.log("Exam done", score, passed)}
                                />
                            </div>
                        </ScrollArea>
                    )}

                    {/* --- VIEW: MODULE QUIZ --- */}
                    {viewMode === 'module-quiz' && currentModule?.quiz && (
                        <ScrollArea className="flex-1 h-full">
                            <div className="px-12 lg:px-20 py-12 max-w-4xl mx-auto">
                                {/* Quiz Header */}
                                <div className="mb-12 text-center">
                                    <h1 className="text-4xl font-bold text-slate-900 mb-3">{currentModule.quiz.title}</h1>
                                    <p className="text-lg text-slate-600">
                                        Test your knowledge of {currentModule.title}
                                    </p>
                                </div>

                                {/* Quiz Content */}
                                <QuizBlock
                                    title={currentModule.quiz.title}
                                    questions={currentModule.quiz.questions}
                                    onComplete={(score) => console.log("Module Quiz completed with score:", score)}
                                />
                            </div>
                        </ScrollArea>
                    )}

                    {/* --- VIEW: LEARNING (LESSON) --- */}
                    {viewMode === 'learning' && (
                        <>
                            {/* Lesson Header */}
                            <div className="px-12 lg:px-20 py-8 bg-white border-b border-slate-100">
                                <div className="max-w-4xl">
                                    <h1 className="text-3xl font-bold text-slate-900 mb-3">{currentLesson?.title}</h1>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-slate-500 flex items-center">
                                            <Clock className="w-4 h-4 mr-1.5" />
                                            {currentLesson?.duration || "20 min"}
                                        </span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-sm text-slate-500">{currentLesson?.difficulty || "Beginner"}</span>
                                        {currentLesson?.completed && (
                                            <>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-sm text-green-600 flex items-center font-medium">
                                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                                    Completed
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    {currentLesson?.description && (
                                        <p className="text-slate-600 leading-relaxed max-w-3xl">
                                            {currentLesson.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <ScrollArea className="flex-1 bg-white">
                                <div className="px-12 lg:px-20 py-12 space-y-10 pb-32 max-w-4xl mx-auto">
                                    {currentLesson?.blocks.map((block) => (
                                        <div key={block.id} className="space-y-4">

                                            {/* Render Title */}
                                            {block.title && block.type !== 'quiz' && (
                                                <h3 className="text-xl font-bold flex items-center text-foreground mt-8 first:mt-0">
                                                    {block.type === 'video' || block.type === 'youtube' ? <Video className="h-6 w-6 mr-3 text-primary" /> : null}
                                                    {block.type === 'image' ? <ImageIcon className="h-6 w-6 mr-3 text-purple-500" /> : null}
                                                    {block.type === 'text' ? <FileText className="h-6 w-6 mr-3 text-primary" /> : null}
                                                    {block.title}
                                                </h3>
                                            )}

                                            {/* MARKDOWN TEXT BLOCK */}
                                            {block.type === 'text' && (
                                                <div className="prose prose-slate max-w-3xl 
                                                    prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                                                    prose-p:text-slate-800 prose-p:leading-7 prose-p:mb-5
                                                    prose-strong:text-slate-900 prose-strong:font-bold
                                                    prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                                                    prose-ul:list-disc prose-ul:pl-5 prose-li:text-slate-800 prose-li:marker:text-slate-400
                                                    prose-img:rounded-xl prose-img:shadow-sm">
                                                    <Markdown>{block.content}</Markdown>
                                                </div>
                                            )}

                                            {/* IMAGE BLOCK */}
                                            {block.type === 'image' && (
                                                <div className="my-8">
                                                    <img
                                                        src={block.content}
                                                        alt={block.title}
                                                        className="w-full h-auto object-cover rounded-xl shadow-md"
                                                    />
                                                    {block.title && (
                                                        <div className="mt-2 text-sm text-center text-slate-500 italic">
                                                            {block.title}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* YOUTUBE BLOCK */}
                                            {block.type === 'youtube' && (
                                                <div className="my-8 aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={block.content}
                                                        title={block.title || "Video"}
                                                        frameBorder="0"
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            )}

                                            {/* NATIVE VIDEO BLOCK */}
                                            {block.type === 'video' && (
                                                <div className="my-8 rounded-xl overflow-hidden bg-black shadow-lg">
                                                    <video
                                                        controls
                                                        className="w-full h-auto max-h-[500px]"
                                                        src={block.content}
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* External Learning Resources Section */}
                                    {currentLesson?.resources && currentLesson.resources.length > 0 && (
                                        <div className="mt-12">
                                            <h3 className="text-lg font-bold mb-6 text-slate-900">
                                                Further Reading
                                            </h3>
                                            <div className="space-y-4">
                                                {currentLesson.resources.map((res, idx) => (
                                                    <div key={idx} className="group">
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-1 flex-shrink-0 text-slate-400">
                                                                {res.type === 'video' ? <Video className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <a
                                                                    href={res.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="font-medium text-slate-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-2"
                                                                >
                                                                    {res.title}
                                                                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </a>
                                                                {res.description && (
                                                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{res.description}</p>
                                                                )}
                                                                <a
                                                                    href={res.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
                                                                >
                                                                    Visit resource →
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Render all quiz blocks at the end */}
                                    {currentLesson?.blocks.filter(block => block.type === 'quiz').map((block) => (
                                        <div key={block.id} className="mt-16">
                                            <QuizBlock
                                                title={block.title || "Knowledge Check"}
                                                questions={block.content}
                                                onComplete={(score) => console.log("Formative Quiz completed:", score)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Navigation Footer */}
                            <div className="bg-white border-t border-slate-100 px-12 lg:px-20 py-6 flex justify-between items-center">
                                <button className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </button>

                                <div className="hidden md:flex items-center gap-2 text-sm">
                                    <span className="text-slate-400">Module:</span>
                                    <span className="text-slate-700 font-medium">{currentModule?.title}</span>
                                </div>

                                <button
                                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                                    onClick={() => currentLesson && completeLesson(currentLesson.id)}
                                >
                                    {currentLesson?.completed ? "Next Lesson" : "Complete & Continue"}
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </CourseLayout>
    );
}
