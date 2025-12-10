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
                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex items-center gap-8 pt-4">
                        <button
                            onClick={onStartCourse}
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-base"
                        >
                            Start Learning
                        </button>
                        <div className="flex items-center gap-6 text-sm text-slate-600">
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
                    <h2 className="text-2xl font-bold text-slate-900">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {objectives.map((obj, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700 leading-relaxed">{obj}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Syllabus */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Course Syllabus</h2>
                    <div className="space-y-3">
                        {syllabus.map((item, idx) => (
                            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                            <span className="text-xs text-slate-500 ml-4">{item.duration}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
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
                    <h2 className="text-2xl font-bold text-slate-900">Course Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-900 mb-1">12</div>
                            <div className="text-sm text-slate-600">Video Lectures</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-900 mb-1">4</div>
                            <div className="text-sm text-slate-600">Quizzes</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-900 mb-1">10h</div>
                            <div className="text-sm text-slate-600">Total Duration</div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}
