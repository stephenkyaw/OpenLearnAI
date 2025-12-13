import { CourseLayout } from "@/layouts/CourseLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, Link as LinkIcon, ExternalLink, Award, Flag, Clock, Loader2, AlertCircle, LogOut, Menu, X, CheckCircle2, BookOpen, FileText, ArrowRight } from "lucide-react";
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

    // Track mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-muted-foreground font-medium">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
                    <h3 className="text-xl font-bold">Unable to load course</h3>
                    <Button onClick={() => fetchCourse('english-101')}>Retry</Button>
                </div>
            </div>
        );
    }

    const COURSE_CONTENT = course;

    // 3. Helper to find current lesson data
    const currentLesson = COURSE_CONTENT?.modules
        ?.flatMap((m: any) => m.lessons || [])
        .find((l: any) => l.id === selectedLessonId);

    // 4. Helper to find current selected module (for quiz)
    const currentModule = COURSE_CONTENT?.modules?.find((m: any) => m.id === selectedModuleId);

    const handleStartCourse = () => {
        setViewMode('learning');
    };

    return (
        <CourseLayout title={COURSE_CONTENT.title}>
            <div className="flex h-full w-full overflow-hidden">
                {/* =========================================================
                    SIDEBAR (DESKTOP) - FLUSH LEFT
                   ========================================================= */}
                <div className="hidden md:flex w-80 flex-col border-r border-border bg-muted/5 h-full">
                    <SidebarContent
                        course={COURSE_CONTENT}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        selectedLessonId={selectedLessonId}
                        setSelectedLessonId={setSelectedLessonId}
                        selectedModuleId={selectedModuleId}
                        setSelectedModuleId={setSelectedModuleId}
                    />
                </div>

                {/* =========================================================
                    MOBILE MENU (DRAWER)
                   ========================================================= */}
                <div className="md:hidden absolute top-4 left-4 z-50">
                    <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="bg-background shadow-md">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-50 flex">
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="relative w-[300px] bg-background h-full shadow-2xl flex flex-col border-r border-border animate-in slide-in-from-left">
                            <div className="p-4 flex items-center justify-between border-b border-border/50">
                                <span className="font-bold">Course Menu</span>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <SidebarContent
                                    course={COURSE_CONTENT}
                                    viewMode={viewMode}
                                    setViewMode={(m) => { setViewMode(m); setIsMobileMenuOpen(false); }}
                                    selectedLessonId={selectedLessonId}
                                    setSelectedLessonId={(id) => { setSelectedLessonId(id); setIsMobileMenuOpen(false); }}
                                    selectedModuleId={selectedModuleId}
                                    setSelectedModuleId={(id) => { setSelectedModuleId(id); setIsMobileMenuOpen(false); }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================
                    MAIN CONTENT AREA - FLUSH RIGHT
                   ========================================================= */}
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/10 relative">

                    {/* SCROLLABLE AREA CONTAINER */}
                    <div className="flex-1 overflow-y-auto scroll-smooth p-6 pb-40">

                        {/* --- VIEW: OVERVIEW --- */}
                        {viewMode === 'overview' && (
                            <div className="max-w-7xl mx-auto animate-fade-in">
                                <Card className="shadow-sm border-border/60 bg-card min-h-[85vh]">
                                    <CourseOverview
                                        title={COURSE_CONTENT.title}
                                        description={COURSE_CONTENT.description}
                                        objectives={COURSE_CONTENT.objectives}
                                        syllabus={COURSE_CONTENT.modules.map(m => ({
                                            title: m.title,
                                            description: `${m.lessons.length} Lessons • ${m.quiz ? 'Includes Assessment' : 'Practice Exercises'}`,
                                            duration: "1 Week"
                                        }))}
                                        onStartCourse={handleStartCourse}
                                    />
                                </Card>
                            </div>
                        )}

                        {/* --- VIEW: FINAL EXAM --- */}
                        {viewMode === 'exam' && (
                            <div className="max-w-5xl mx-auto animate-fade-in">
                                <Card className="shadow-sm border-border/60 bg-card min-h-[85vh] p-8">
                                    {COURSE_CONTENT.finalExam ? (
                                        <FinalExam
                                            title="Final Course Exam"
                                            description="Prove your mastery. Passing score: 80%."
                                            durationMinutes={60}
                                            questions={COURSE_CONTENT.finalExam.questions}
                                            passingScore={70}
                                            onComplete={(score, passed) => {
                                                console.log(`Exam completed. Score: ${score}, Passed: ${passed}`);
                                            }}
                                        />
                                    ) : (
                                        <div className="p-12 text-center text-muted-foreground">No Exam Configured.</div>
                                    )}
                                </Card>
                            </div>
                        )}

                        {/* --- VIEW: MODULE QUIZ --- */}
                        {viewMode === 'module-quiz' && currentModule?.quiz && (
                            <div className="max-w-5xl mx-auto animate-fade-in">
                                <Card className="shadow-sm border-border/60 bg-card min-h-[85vh] p-8">
                                    <div className="mb-10 text-center pb-8">
                                        <h1 className="text-3xl font-bold tracking-tight mb-2">{currentModule.quiz.title}</h1>
                                        <p className="text-muted-foreground">Module Assessment • {currentModule.quiz.questions.length} Questions</p>
                                    </div>
                                    <QuizBlock
                                        title={currentModule.quiz.title}
                                        questions={currentModule.quiz.questions}
                                        isEmbedded={true}
                                        onComplete={(score) => console.log("Quiz done:", score)}
                                    />
                                </Card>
                            </div>
                        )}

                        {/* --- VIEW: LEARNING (LESSON) --- */}
                        {viewMode === 'learning' && (
                            <div className="max-w-6xl mx-auto animate-fade-in">
                                <Card className="shadow-sm border-border/60 bg-card min-h-[85vh] p-8 md:p-12 relative overflow-hidden">
                                    {/* Subtle top accents similar to Dashboard */}
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                                    {/* LESSON HEADER (NO DIVIDERS) */}
                                    <div className="mb-12 relative z-10">
                                        <div className="flex items-center gap-3 mb-6 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                            <span className="text-primary flex items-center gap-2">
                                                <BookOpen className="h-4 w-4" />
                                                {currentModule?.title}
                                            </span>
                                            <span className="text-border mx-2">•</span>
                                            <span>Lesson {currentLesson?.id.split('-').pop()}</span>
                                        </div>

                                        <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-4xl mb-6">
                                            {currentLesson?.title}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
                                            {currentLesson?.completed && (
                                                <span className="text-emerald-600 flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5" /> Completed
                                                </span>
                                            )}
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> {currentLesson?.duration || "20 min"}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Award className="w-4 h-4" /> {currentLesson?.difficulty || "Beginner"}
                                            </span>
                                        </div>

                                        {/* DESCRIPTION */}
                                        {currentLesson?.description && (
                                            <div className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                                {currentLesson.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* BLOCKS */}
                                    <div className="space-y-12 relative z-10 max-w-4xl">
                                        {currentLesson?.blocks.map((block) => (
                                            <div key={block.id} className="space-y-6">
                                                {block.title && block.type !== 'quiz' && (
                                                    <h3 className="text-2xl font-bold text-foreground">
                                                        {block.title}
                                                    </h3>
                                                )}

                                                {/* TEXT */}
                                                {block.type === 'text' && (
                                                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg">
                                                        <Markdown>{block.content}</Markdown>
                                                    </div>
                                                )}

                                                {/* IMAGE */}
                                                {block.type === 'image' && (
                                                    <figure className="my-8">
                                                        <img
                                                            src={block.content}
                                                            alt={block.title}
                                                            className="w-full h-auto rounded-2xl shadow-sm"
                                                        />
                                                        {block.title && (
                                                            <figcaption className="mt-3 text-center text-sm font-medium text-muted-foreground">
                                                                {block.title}
                                                            </figcaption>
                                                        )}
                                                    </figure>
                                                )}

                                                {/* YOUTUBE */}
                                                {block.type === 'youtube' && (
                                                    <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                                                        <iframe width="100%" height="100%" src={block.content} title={block.title} frameBorder="0" allowFullScreen />
                                                    </div>
                                                )}

                                                {/* QUIZ (Inline) */}
                                                {block.type === 'quiz' && (
                                                    <div className="my-12">
                                                        <QuizBlock
                                                            title={block.title || "Knowledge Check"}
                                                            questions={block.content}
                                                            isEmbedded={true}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* RESOURCES - CLEAN GRID */}
                                    {currentLesson?.resources && currentLesson.resources.length > 0 && (
                                        <div className="mt-20 relative z-10">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4" /> Additional Resources
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentLesson.resources.map((res, i) => (
                                                    <a
                                                        key={i}
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="group flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 hover:border-primary/20 transition-all duration-300"
                                                    >
                                                        <div className="flex-none h-12 w-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                                            {res.url.includes('pdf') ? <FileText className="w-6 h-6" /> : <LinkIcon className="w-6 h-6" />}
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 flex items-center gap-2">
                                                                {res.title}
                                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                            </div>
                                                            <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                                {res.description}
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        )}

                        {/* BOTTOM SPACER to ensure content isn't hidden by floating pill */}
                        <div className="h-24" />
                    </div>

                    {/* FLOATING NAVIGATION PILL (Only in learning mode) */}
                    {viewMode === 'learning' && (
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 w-full max-w-md px-4 pointer-events-none">
                            <div className="pointer-events-auto bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-full p-2 pl-2 flex items-center justify-between gap-3 ring-1 ring-black/5">

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-12 h-12 rounded-full hover:bg-foreground/5 text-foreground transition-all shrink-0"
                                    title="Previous Lesson"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>

                                <div className="flex-1 text-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Current Lesson</span>
                                    <span className="text-sm font-bold text-foreground truncate block max-w-[150px] mx-auto">{currentLesson?.title?.split(':')[0]}</span>
                                </div>

                                <Button
                                    onClick={() => currentLesson && completeLesson(currentLesson.id)}
                                    size="lg"
                                    className={cn(
                                        "rounded-full h-12 px-6 text-sm font-bold shadow-lg transition-all hover:scale-105 shrink-0",
                                        currentLesson?.completed
                                            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
                                            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-indigo-500/20"
                                    )}
                                >
                                    {currentLesson?.completed ? "Next Lesson" : "Complete"}
                                    {currentLesson?.completed ? <ChevronRight className="w-4 h-4 ml-2" /> : <CheckCircle className="w-4 h-4 ml-2" />}
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </CourseLayout>
    );
}

// ----------------------------------------------------------------------
// SIDEBAR (CLEAN VERSION)
// ----------------------------------------------------------------------
interface SidebarContentProps {
    course: any;
    viewMode: 'overview' | 'learning' | 'module-quiz' | 'exam';
    setViewMode: (mode: 'overview' | 'learning' | 'module-quiz' | 'exam') => void;
    selectedLessonId: string | null | undefined;
    setSelectedLessonId: (id: string) => void;
    selectedModuleId: string | null | undefined;
    setSelectedModuleId: (id: string) => void;
}

function SidebarContent({ course, viewMode, setViewMode, selectedLessonId, setSelectedLessonId, selectedModuleId, setSelectedModuleId }: SidebarContentProps) {
    return (
        <div className="flex flex-col h-full bg-card/50">
            {/* Header */}
            <div className="p-6">
                <h2 className="font-bold text-lg leading-tight mb-4 cursor-pointer hover:text-primary transition-colors" onClick={() => setViewMode('overview')}>
                    {course.title}
                </h2>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Award className="w-3 h-3" /> Progress: {course.progress}%
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-2 px-4 space-y-6">
                {course?.modules?.map((module: any, idx: number) => (
                    <div key={idx}>
                        <div className="px-2 mb-2 text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                            Module {idx + 1}: {module.title}
                        </div>
                        <div className="space-y-1">
                            {module.lessons?.map((lesson: any) => {
                                const isSelected = viewMode === 'learning' && selectedLessonId === lesson.id;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => { setViewMode('learning'); setSelectedLessonId(lesson.id); }}
                                        className={cn(
                                            "w-full flex items-center justify-start h-11 px-3 font-medium transition-all duration-300 rounded-xl text-sm",
                                            isSelected
                                                ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-glow hover:opacity-90"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        <div className={cn("mr-3 h-5 w-5 flex items-center justify-center", isSelected ? "text-white" : "text-muted-foreground")}>
                                            {lesson.completed
                                                ? <CheckCircle className={cn("w-4 h-4", isSelected ? "text-white" : "text-emerald-500")} />
                                                : <PlayCircle className="w-4 h-4" />
                                            }
                                        </div>
                                        <span className="truncate flex-1 text-left">{lesson.title}</span>
                                    </button>
                                );
                            })}

                            {module.quiz && (
                                <button
                                    onClick={() => { setViewMode('module-quiz'); setSelectedModuleId(module.id); }}
                                    className={cn(
                                        "w-full flex items-center justify-start h-11 px-3 font-medium transition-all duration-300 rounded-xl text-sm",
                                        viewMode === 'module-quiz' && selectedModuleId === module.id
                                            ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-glow hover:opacity-90"
                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    <div className={cn("mr-3 h-5 w-5 flex items-center justify-center", (viewMode === 'module-quiz' && selectedModuleId === module.id) ? "text-white" : "text-muted-foreground")}>
                                        <Flag className="w-4 h-4" />
                                    </div>
                                    <span className="truncate flex-1 text-left">Module Quiz</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-muted/10">
                <button
                    onClick={() => setViewMode('exam')}
                    className={cn(
                        "flex items-center justify-center gap-2 w-full p-3 rounded-xl font-bold transition-all text-sm mb-3",
                        viewMode === 'exam'
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-background border border-border shadow-sm hover:border-primary/50"
                    )}
                >
                    <Award className="w-4 h-4" /> Final Exam
                </button>

                <Link to="/dashboard">
                    <button className="flex items-center justify-center gap-2 w-full p-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors">
                        <LogOut className="w-3 h-3" /> Exit Course
                    </button>
                </Link>
            </div>
        </div>
    );
}
