import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, BarChart, CheckCircle2 } from "lucide-react";

interface SyllabusItem {
    title: string;
    description: string;
    duration: string;
}

interface CourseOverviewProps {
    title: string;
    description: string;
    objectives: string[];
    syllabus: SyllabusItem[];
    onStartCourse: () => void;
}

export function CourseOverview({ title, description, objectives, syllabus, onStartCourse }: CourseOverviewProps) {
    return (
        <ScrollArea className="h-full">
            <div className="max-w-5xl mx-auto px-12 lg:px-20 py-16 pb-32 space-y-16">
                {/* Hero Section */}
                <div className="space-y-6 max-w-3xl">
                    <h1 className="text-5xl font-bold text-foreground leading-tight tracking-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {description}
                    </p>

                    <div className="flex items-center gap-8 pt-4">
                        <button
                            onClick={onStartCourse}
                            className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 text-base"
                        >
                            Start Learning
                        </button>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                            <span className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" /> 4 Weeks
                            </span>
                            <span className="flex items-center">
                                <BarChart className="mr-2 h-4 w-4" /> Intermediate
                            </span>
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {objectives.map((obj, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-muted-foreground leading-relaxed">{obj}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Syllabus */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Course Syllabus</h2>
                    <div className="space-y-3">
                        {syllabus.map((item, idx) => (
                            <div key={idx} className="p-5 bg-card border border-border/50 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all group">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                                            <span className="text-xs text-muted-foreground ml-4">{item.duration}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Features */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Course Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                            <div className="text-2xl font-bold text-foreground mb-1">12</div>
                            <div className="text-sm text-muted-foreground">Video Lectures</div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                            <div className="text-2xl font-bold text-foreground mb-1">4</div>
                            <div className="text-sm text-muted-foreground">Quizzes</div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                            <div className="text-2xl font-bold text-foreground mb-1">10h</div>
                            <div className="text-sm text-muted-foreground">Total Duration</div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}
