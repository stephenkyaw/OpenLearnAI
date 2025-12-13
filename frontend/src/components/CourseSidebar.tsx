import { PlayCircle, CheckCircle, Award, Flag, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";


import type { Course, Module, Lesson } from "@/data/mockCourse";

interface SidebarContentProps {
    course: Course;
    viewMode: 'overview' | 'learning' | 'module-quiz' | 'exam';
    setViewMode: (mode: 'overview' | 'learning' | 'module-quiz' | 'exam') => void;
    selectedLessonId: string | null | undefined;
    setSelectedLessonId: (id: string) => void;
    selectedModuleId: string | null | undefined;
    setSelectedModuleId: (id: string) => void;
    onMobileClose?: () => void;
}

export function CourseSidebar({
    course,
    viewMode,
    setViewMode,
    selectedLessonId,
    setSelectedLessonId,
    selectedModuleId,
    setSelectedModuleId,
    onMobileClose
}: SidebarContentProps) {

    const handleViewChange = (mode: 'overview' | 'learning' | 'module-quiz' | 'exam') => {
        setViewMode(mode);
        onMobileClose?.();
    };

    const handleLessonSelect = (id: string) => {
        setViewMode('learning');
        setSelectedLessonId(id);
        onMobileClose?.();
    };

    const handleModuleSelect = (id: string) => {
        setViewMode('module-quiz');
        setSelectedModuleId(id);
        onMobileClose?.();
    };

    return (
        <div className="flex flex-col h-full bg-card/50">
            {/* Header */}
            <div className="p-6">
                <h2 className="font-bold text-lg leading-tight mb-4 cursor-pointer hover:text-primary transition-colors" onClick={() => handleViewChange('overview')}>
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
                {course?.modules?.map((module: Module, idx: number) => (
                    <div key={idx}>
                        <div className="px-2 mb-2 text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                            Module {idx + 1}: {module.title}
                        </div>
                        <div className="space-y-1">
                            {module.lessons?.map((lesson: Lesson) => {
                                const isSelected = viewMode === 'learning' && selectedLessonId === lesson.id;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(lesson.id)}
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
                                    onClick={() => handleModuleSelect(module.id)}
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
                    onClick={() => handleViewChange('exam')}
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
