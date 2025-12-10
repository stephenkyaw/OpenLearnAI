import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    BookOpen, PlayCircle, Search, Filter,
    LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight, ArrowRight, Clock, Award,
    Code, Brain, Languages, Briefcase, Palette, Plus, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Helper for Dynamic Icons
const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Development": return Code;
        case "Data Science": return Brain;
        case "Business": return Briefcase;
        case "Design": return Palette;
        case "Language": return Languages;
        default: return BookOpen;
    }
};

const getCourseColor = (iconColor: string) => {
    const colorMap: Record<string, string> = {
        "text-indigo-600": "bg-indigo-500",
        "text-blue-600": "bg-blue-500",
        "text-yellow-600": "bg-yellow-500",
        "text-purple-600": "bg-purple-500",
        "text-emerald-600": "bg-emerald-500",
        "text-pink-600": "bg-pink-500",
        "text-orange-600": "bg-orange-500",
        "text-cyan-600": "bg-cyan-500",
    };
    return colorMap[iconColor] || "bg-primary";
};

// Mock Data
const MOCK_COURSES = [
    { id: 1, title: "English for Business: The Professional Edge", description: "Master professional communication, negotiation, and leadership language.", progress: 65, color: "bg-gradient-to-br from-indigo-50 to-indigo-100", iconColor: "text-indigo-600", link: "/course/english", category: "Language", status: "active", duration: "12h 30m", createdAt: "2023-10-15" },
    { id: 2, title: "Introduction to React", description: "Learn the basics of React, components, state, and props.", progress: 35, color: "bg-gradient-to-br from-blue-50 to-blue-100", iconColor: "text-blue-600", link: "/course/react", category: "Development", status: "active", duration: "8h 45m", createdAt: "2023-11-02" },
    { id: 3, title: "Advanced Python Patterns", description: "Deep dive into decorators, generators, and context managers.", progress: 10, color: "bg-gradient-to-br from-yellow-50 to-yellow-100", iconColor: "text-yellow-600", link: "/course/python", category: "Development", status: "active", duration: "15h 10m", createdAt: "2023-09-20" },
    { id: 4, title: "Machine Learning Basics", description: "Understanding neural networks and backpropagation.", progress: 0, color: "bg-gradient-to-br from-purple-50 to-purple-100", iconColor: "text-purple-600", link: "/course/ml", category: "Data Science", status: "pending", duration: "22h 15m", createdAt: "2023-12-05" },
    { id: 5, title: "Digital Marketing Fundamentals", description: "SEO, SEM, and Content Marketing strategies.", progress: 100, color: "bg-gradient-to-br from-emerald-50 to-emerald-100", iconColor: "text-emerald-600", link: "/course/marketing", category: "Business", status: "completed", duration: "6h 20m", createdAt: "2023-08-30" },
    { id: 6, title: "UI/UX Design Principles", description: "Wireframing, prototyping, and user testing workflows.", progress: 80, color: "bg-gradient-to-br from-pink-50 to-pink-100", iconColor: "text-pink-600", link: "/course/design", category: "Design", status: "active", duration: "10h 00m", createdAt: "2023-10-10" },
    { id: 7, title: "Data Visualization with D3", description: "Create stunning interactive charts.", progress: 0, color: "bg-gradient-to-br from-orange-50 to-orange-100", iconColor: "text-orange-600", link: "/course/d3", category: "Data Science", status: "pending", duration: "14h 30m", createdAt: "2023-11-25" },
    { id: 8, title: "Agile Project Management", description: "Scrum, Kanban, and Sprint planning.", progress: 100, color: "bg-gradient-to-br from-cyan-50 to-cyan-100", iconColor: "text-cyan-600", link: "/course/agile", category: "Business", status: "completed", duration: "5h 45m", createdAt: "2023-09-15" },
    { id: 9, title: "AI for Beginners", description: "Generating course content and structure...", progress: 0, color: "bg-gradient-to-br from-indigo-50 to-indigo-100", iconColor: "text-indigo-600", link: "#", category: "Data Science", status: "generating", duration: "--", createdAt: "Just now" }
];

export function MyCoursesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTab, setCurrentTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filter Logic
    const filteredCourses = MOCK_COURSES.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = currentTab === "all" || course.status === currentTab || (currentTab === 'active' && (course.status === 'active' || course.status === 'pending' || course.status === 'generating')); // Simplified logic

        // Exact tab matching for 'completed' and 'generating'
        if (currentTab === 'completed' && course.status !== 'completed') return false;
        if (currentTab === 'generating' && course.status !== 'generating') return false;

        return matchesSearch && matchesTab;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">My Courses</h1>
                    <p className="text-muted-foreground">Manage and track your learning progress.</p>
                </div>
                <Link to="/dashboard/upload">
                    <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 font-semibold tracking-wide">
                        <Plus className="h-4 w-4 mr-2" /> New Course
                    </Button>
                </Link>
            </div>

            {/* Controls Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="border-slate-200">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 border-l pl-4 border-slate-100">
                        <Button
                            variant={viewMode === 'grid' ? "secondary" : "ghost"}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                            className={viewMode === 'grid' ? "bg-slate-100 text-slate-900" : "text-muted-foreground"}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? "secondary" : "ghost"}
                            size="icon"
                            onClick={() => setViewMode('list')}
                            className={viewMode === 'list' ? "bg-slate-100 text-slate-900" : "text-muted-foreground"}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full" onValueChange={(val) => { setCurrentTab(val); setCurrentPage(1); }}>
                    <TabsList className="mb-6 bg-transparent p-0 gap-4">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all"
                        >
                            All Courses
                        </TabsTrigger>
                        <TabsTrigger
                            value="active"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all"
                        >
                            In Progress
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all"
                        >
                            Completed
                        </TabsTrigger>
                        <TabsTrigger
                            value="generating"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all"
                        >
                            Generating
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={currentTab} className="mt-0">
                        {paginatedCourses.length > 0 ? (
                            <div className={cn(
                                "grid gap-6 transition-all",
                                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}>
                                {paginatedCourses.map(course => (
                                    viewMode === 'grid'
                                        ? <CourseGridItem key={course.id} course={course} />
                                        : <CourseListItem key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-muted-foreground bg-white rounded-3xl border border-dashed border-slate-200">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                                <h3 className="text-lg font-semibold text-slate-900">No courses found</h3>
                                <p>Try adjusting your search or filters.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-10">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-full w-10 h-10 border-slate-200"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-full w-10 h-10 border-slate-200"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

// Solid White High Contrast Grid Item with Premium Details
// Dashboard "Jump Back" Style Grid Item
function CourseGridItem({ course }: { course: any }) {
    const Icon = getCategoryIcon(course.category);

    return (
        <div className="bg-white rounded-3xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 shadow-sm border border-slate-100 hover:-translate-y-1 flex flex-col h-full">
            {/* Decorative Blur Blob */}
            <div className={cn("absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 transition-colors opacity-50 pointer-events-none group-hover:scale-110 duration-500", course.color)} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0",
                        getCourseColor(course.iconColor))}>
                        <Icon className="h-7 w-7" />
                    </div>
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm border border-slate-100">
                        {course.category}
                    </span>
                </div>

                <div className="mb-4 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                        {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {course.description}
                    </p>
                </div>

                <div className="space-y-5 mt-auto">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Award className="h-3.5 w-3.5" />
                            <span>{course.createdAt}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500">Progress</span>
                            <span className="text-primary">{course.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>

                    <Link to={course.link} className={cn("block", course.status === 'generating' && "pointer-events-none")}>
                        <Button
                            disabled={course.status === 'generating'}
                            className="w-full rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 h-11 font-semibold tracking-wide transition-all border border-transparent disabled:opacity-80 disabled:cursor-not-allowed">
                            {course.status === 'generating' ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...
                                </>
                            ) : course.progress > 0 ? (
                                <>
                                    <PlayCircle className="h-4 w-4 mr-2" /> Continue Lesson
                                </>
                            ) : (
                                <>
                                    Start Course <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// List View Item
// Dashboard "Jump Back" Style List Item
function CourseListItem({ course }: { course: any }) {
    const Icon = getCategoryIcon(course.category);

    return (
        <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-x-1 relative overflow-hidden">
            {/* Decorative Blur Blob */}
            <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-colors opacity-30 pointer-events-none group-hover:scale-110 duration-500", course.color)} />

            <div className={cn("h-20 w-20 rounded-xl flex items-center justify-center shrink-0 shadow-md text-white relative z-10",
                getCourseColor(course.iconColor))}>
                <Icon className="h-8 w-8" />
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate text-slate-900">
                        {course.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-bold uppercase tracking-wider rounded-full w-fit mx-auto sm:mx-0">
                        {course.category}
                    </span>
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-1">{course.description}</p>

                <div className="flex items-center justify-center sm:justify-start gap-6 text-xs text-slate-400 font-semibold mb-3">
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5" /> {course.createdAt}
                    </span>
                </div>

                <div className="flex items-center gap-4 max-w-sm mx-auto sm:mx-0">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold text-primary w-8 text-right">{course.progress}%</span>
                </div>
            </div>

            <div className="w-full sm:w-auto mt-2 sm:mt-0 pl-4 border-l border-slate-100 relative z-10">
                <Link to={course.link} className={cn("block", course.status === 'generating' && "pointer-events-none")}>
                    <Button
                        disabled={course.status === 'generating'}
                        className="w-full sm:w-40 rounded-xl shadow-md bg-white hover:bg-slate-50 text-primary border border-slate-200 h-10 font-bold tracking-wide disabled:opacity-70 disabled:grayscale">
                        {course.status === 'generating' ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating
                            </>
                        ) : course.progress > 0 ? "Continue" : "Start Now"}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
