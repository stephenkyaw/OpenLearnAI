import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BarChart, CheckCircle2, PlayCircle, BookOpen } from "lucide-react";

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
            <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 pb-32 space-y-16 animate-fade-in">
                {/* Hero Section */}
                <div className="space-y-8 max-w-3xl">
                    <div className="space-y-4">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                            <BookOpen className="mr-2 h-3.5 w-3.5" />
                            Course Overview
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                        <Button
                            onClick={onStartCourse}
                            size="lg"
                            className="h-14 px-8 text-lg rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
                        >
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Start Learning
                        </Button>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium px-2">
                            <span className="flex items-center bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                                <Clock className="mr-2 h-4 w-4 text-primary" /> 4 Weeks
                            </span>
                            <span className="flex items-center bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                                <BarChart className="mr-2 h-4 w-4 text-primary" /> Intermediate
                            </span>
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {objectives.map((obj, idx) => (
                            <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-full ring-1 ring-primary/20">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                    </div>
                                    <span className="text-lg text-muted-foreground leading-relaxed font-medium">{obj}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Course Syllabus */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Course Syllabus</h2>
                    <div className="grid gap-1">
                        {syllabus.map((item, idx) => (
                            <div key={idx} className="group flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                                <div className="flex-none mt-1">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 py-0.5">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 mb-1">
                                        <h3 className="font-bold text-lg text-foreground leading-tight">{item.title}</h3>
                                        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border/50 w-fit">{item.duration}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Features */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Course Stats</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/50">
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-bold text-foreground mb-2">12</div>
                                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Video Lectures</div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/50">
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-bold text-foreground mb-2">4</div>
                                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quizzes</div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/50 bg-gradient-to-br from-card to-muted/50">
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                                <div className="text-4xl font-bold text-foreground mb-2">10h</div>
                                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Duration</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}

