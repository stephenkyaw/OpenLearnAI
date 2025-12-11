import { CourseLayout } from "@/layouts/CourseLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, Video, FileText, ImageIcon, Link as LinkIcon, ExternalLink, Globe, Award, LayoutDashboard, Flag, Clock, Loader2, AlertCircle, LogOut, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
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
            <div className="flex h-[calc(100vh-3rem)] gap-4">

                {/* =========================================================
                    SIDEBAR NAVIGATION (Floating Glass)
                   ========================================================= */}
                {/* =========================================================
                    SIDEBAR NAVIGATION (Clean Solid White)
                   ========================================================= */}
                <div className="w-80 flex-shrink-0 bg-white rounded-2xl hidden md:flex flex-col overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">

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
                    <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
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
                                                <div
                                                    key={lesson.id}
                                                    className={cn(
                                                        "group flex w-full items-start gap-4 p-3 text-sm transition-all hover:bg-slate-50 duration-200 rounded-lg relative cursor-pointer",
                                                        isSelected ? "bg-primary/5" : ""
                                                    )}
                                                    onClick={() => {
                                                        setViewMode('learning');
                                                        setSelectedLessonId(lesson.id);
                                                    }}
                                                >
                                                    {/* Active Indicator Line */}
                                                    <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full transition-all duration-300", isSelected ? "bg-primary opacity-100" : "opacity-0")} />

                                                    {/* Icon Status */}
                                                    <div className="mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                                                        {lesson.completed ? (
                                                            <CheckCircle className={cn("h-4 w-4", isSelected ? "text-primary" : "text-emerald-500")} />
                                                        ) : (
                                                            <PlayCircle className={cn("h-4 w-4", isSelected ? "text-primary" : "text-slate-400")} />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={cn(
                                                            "font-medium leading-snug mb-1.5 break-words transition-colors",
                                                            isSelected ? "text-primary font-semibold" : "text-slate-700 group-hover:text-slate-900"
                                                        )}>
                                                            {lesson.title}
                                                        </h4>

                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="text-[10px] text-slate-400 flex items-center font-medium">
                                                                {lesson.duration || "20m"}
                                                            </span>
                                                            {hasQuiz && (
                                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-bold tracking-wide uppercase">
                                                                    Quiz
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* MODULE QUIZ */}
                                        {module.quiz && (
                                            <div className="mt-2">
                                                <div
                                                    className={cn(
                                                        "group flex w-full items-center gap-4 p-3 text-sm transition-all hover:bg-slate-50 duration-200 rounded-lg relative cursor-pointer",
                                                        viewMode === 'module-quiz' && selectedModuleId === module.id ? "bg-indigo-50/50" : ""
                                                    )}
                                                    onClick={() => {
                                                        setViewMode('module-quiz');
                                                        setSelectedModuleId(module.id);
                                                    }}
                                                >
                                                    {/* Active Indicator Line */}
                                                    <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full transition-all duration-300", viewMode === 'module-quiz' && selectedModuleId === module.id ? "bg-indigo-600 opacity-100" : "opacity-0")} />

                                                    <div className="shrink-0 transition-transform group-hover:scale-110">
                                                        <Flag className={cn("h-4 w-4", viewMode === 'module-quiz' && selectedModuleId === module.id ? "text-indigo-600" : "text-slate-400")} />
                                                    </div>

                                                    <span className={cn(
                                                        "font-medium transition-colors",
                                                        viewMode === 'module-quiz' && selectedModuleId === module.id ? "text-indigo-700 font-semibold" : "text-slate-600 group-hover:text-slate-900"
                                                    )}>
                                                        {module.quiz.title}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Final Exam Link */}
                            <div className="mt-8 pt-4 border-t border-slate-100">
                                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Final Assessment</h3>
                                <button
                                    type="button"
                                    className={cn(
                                        "group flex w-full items-center gap-4 p-3 text-sm transition-all hover:bg-slate-50 duration-200 rounded-lg relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-red-500/20 z-20",
                                        viewMode === 'exam' ? "bg-red-50/50" : ""
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("Final Exam Button Clicked");
                                        handleEnterExam();
                                    }}
                                >
                                    {/* Active Indicator Line */}
                                    <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full transition-all duration-300", viewMode === 'exam' ? "bg-red-600 opacity-100" : "opacity-0")} />

                                    <div className="shrink-0 transition-transform group-hover:scale-110">
                                        <Award className={cn("h-4 w-4", viewMode === 'exam' ? "text-red-600" : "text-slate-400")} />
                                    </div>

                                    <span className={cn(
                                        "font-medium transition-colors",
                                        viewMode === 'exam' ? "text-red-700 font-semibold" : "text-slate-600 group-hover:text-slate-900"
                                    )}>
                                        Final Exam
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Sidebar Footer - Exit Button */}
                    <div className="p-4 border-t border-slate-100 bg-white z-10">
                        <Link to="/dashboard">
                            <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-10 px-3 transition-colors font-medium text-sm">
                                <LogOut className="h-4 w-4 mr-3" />
                                Exit Course
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* =========================================================
                    MAIN CONTENT AREA (Solid Premium White)
                   ========================================================= */}
                {/* =========================================================
                    MAIN CONTENT AREA (Solid Premium White)
                   ========================================================= */}
                <div className="flex-1 bg-white rounded-2xl flex flex-col overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">

                    {/* --- VIEW: OVERVIEW --- */}
                    {viewMode === 'overview' && (
                        <ScrollArea key="overview" className="flex-1 bg-white">
                            <div className="px-8 py-10 max-w-5xl mx-auto">
                                <CourseOverview
                                    title={COURSE_CONTENT.title}
                                    description={COURSE_CONTENT.description}
                                    objectives={COURSE_CONTENT.objectives}
                                    syllabus={COURSE_CONTENT.syllabusOverview}
                                    onStartCourse={handleStartCourse}
                                />
                            </div>
                        </ScrollArea>
                    )}

                    {/* --- VIEW: FINAL EXAM --- */}
                    {viewMode === 'exam' && (
                        COURSE_CONTENT.finalExam ? (
                            <FinalExam
                                title="Final Course Exam"
                                description="Prove your mastery of the course material. This exam covers all modules and requires a passing score of 80%."
                                durationMinutes={60}
                                questions={COURSE_CONTENT.finalExam.questions}
                                passingScore={70}
                                onComplete={(score, passed) => {
                                    console.log(`Exam completed. Score: ${score}, Passed: ${passed}`);
                                    // TODO: Save progress logic here
                                }}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-slate-500">
                                Exam content not found.
                            </div>
                        )
                    )}

                    {/* --- VIEW: MODULE QUIZ --- */}
                    {viewMode === 'module-quiz' && currentModule?.quiz && (
                        <ScrollArea key="quiz" className="flex-1 bg-white">
                            <div className="px-8 py-16 max-w-4xl mx-auto">
                                {/* Quiz Header */}
                                <div className="mb-12 text-center">
                                    <div className="text-sm font-medium text-slate-400 mb-3 tracking-wide uppercase">
                                        {currentModule.title}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                        {currentModule.quiz.title}
                                    </h1>

                                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 font-medium">
                                            <Flag className="w-4 h-4 mr-2" />
                                            Knowledge Check
                                        </span>
                                        <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                            <HelpCircle className="w-4 h-4 mr-2 text-slate-400" />
                                            {currentModule.quiz.questions.length} Questions
                                        </span>
                                    </div>
                                </div>

                                {/* Quiz Content */}
                                <div className="mt-8">
                                    <QuizBlock
                                        title={currentModule.quiz.title}
                                        questions={currentModule.quiz.questions}
                                        onComplete={(score) => console.log("Module Quiz completed with score:", score)}
                                    />
                                </div>
                            </div>
                        </ScrollArea>
                    )}

                    {/* --- VIEW: LEARNING (LESSON) --- */}
                    {viewMode === 'learning' && (
                        <>
                            <ScrollArea className="flex-1 bg-white">
                                <div className="max-w-4xl mx-auto px-8 py-10">
                                    {/* Chapter Header */}
                                    <div className="mb-10 text-center">
                                        <div className="text-sm font-medium text-slate-400 mb-3 tracking-wide uppercase">
                                            {currentModule?.title}
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                            {currentLesson?.title}
                                        </h1>

                                        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                                {currentLesson?.duration || "20 min"}
                                            </span>
                                            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                                <Award className="w-4 h-4 mr-2 text-slate-400" />
                                                {currentLesson?.difficulty || "Beginner"}
                                            </span>
                                            {currentLesson?.completed && (
                                                <span className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 font-medium">
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Completed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description/Intro */}
                                    {currentLesson?.description && (
                                        <div className="text-xl text-slate-600 leading-relaxed font-serif mb-12 border-l-4 border-primary/20 pl-6 italic">
                                            {currentLesson.description}
                                        </div>
                                    )}

                                    {/* Content Blocks */}
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
                                        <span className="flex items-center">
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
                                                <div className="prose prose-slate max-w-5xl 
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
                                    {/* Inline Navigation (Book Style) */}
                                    <div className="mt-24 pt-10 border-t border-slate-100 flex items-center justify-between">
                                        <button className="flex items-center gap-2 px-6 py-4 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium group text-lg">
                                            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                            Previous
                                        </button>

                                        <button
                                            className="flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
                                            onClick={() => currentLesson && completeLesson(currentLesson.id)}
                                        >
                                            {currentLesson?.completed ? "Next Lesson" : "Complete & Continue"}
                                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </div>
            </div>
        </CourseLayout >
    );
}
