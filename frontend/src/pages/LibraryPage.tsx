import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search, Filter, Upload, FileCode, FileImage, File, BookOpen,
    LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight, FileText,
    Eye, Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


// Mock Data
const MOCK_DOCUMENTS = [
    { id: 1, name: "Business_Fundamentals_v2.pdf", type: "pdf", size: "4.2 MB", date: "Oct 24, 2024", linkedCourses: ["English for Business"], status: "processed" },
    { id: 2, name: "Q3_Financial_Report.xlsx", type: "xlsx", size: "1.8 MB", date: "Oct 22, 2024", linkedCourses: ["Data Science Basics", "Business Strategy"], status: "processed" },
    { id: 3, name: "Meeting_Notes_All_Hands.docx", type: "docx", size: "850 KB", date: "Oct 20, 2024", linkedCourses: [], status: "processed" },
    { id: 4, name: "Product_Roadmap_2025.pdf", type: "pdf", size: "2.1 MB", date: "Oct 15, 2024", linkedCourses: ["Product Management 101"], status: "processed" },
    { id: 5, name: "Python_Cheat_Sheet.md", type: "md", size: "12 KB", date: "Oct 12, 2024", linkedCourses: ["Advanced Python Patterns"], status: "processed" },
    { id: 6, name: "Architecture_Diagram.png", type: "png", size: "4.5 MB", date: "Oct 10, 2024", linkedCourses: ["System Design"], status: "processed" },
    { id: 7, name: "Project_Proposal_Draft.docx", type: "docx", size: "1.2 MB", date: "Oct 08, 2024", linkedCourses: [], status: "processing" },
    { id: 8, name: "Legacy_Code_Analysis.txt", type: "txt", size: "50 KB", date: "Oct 05, 2024", linkedCourses: ["Refactoring Legacy Code"], status: "processed" },
];

const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'pdf': return { icon: FileText, color: "text-red-500", bg: "bg-red-50" };
        case 'docx': return { icon: FileText, color: "text-blue-500", bg: "bg-blue-50" };
        case 'xlsx': return { icon: FileText, color: "text-green-500", bg: "bg-green-50" };
        case 'md':
        case 'txt': return { icon: FileCode, color: "text-indigo-500", bg: "bg-indigo-50" };
        case 'png':
        case 'jpg': return { icon: FileImage, color: "text-purple-500", bg: "bg-purple-50" };
        default: return { icon: File, color: "text-slate-500", bg: "bg-slate-50" };
    }
};

export function LibraryPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTab, setCurrentTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filter Logic
    const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = currentTab === "all" ||
            (currentTab === "linked" && doc.linkedCourses.length > 0) ||
            (currentTab === "unlinked" && doc.linkedCourses.length === 0);
        return matchesSearch && matchesTab;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
    const paginatedDocs = filteredDocs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <DashboardLayout>
            <div className="max-w-6xl pb-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 px-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Document Library</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your source materials and track their usage across courses.
                        </p>
                    </div>
                    <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 font-semibold transition-all hover:-translate-y-0.5">
                        <Upload className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                </div>

                {/* Controls Section */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search documents..."
                                    className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="border-slate-200 rounded-xl">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 border-l pl-4 border-slate-100">
                            <Button
                                variant={viewMode === 'grid' ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode('grid')}
                                className={cn("rounded-lg", viewMode === 'grid' ? "bg-slate-100 text-slate-900" : "text-muted-foreground")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode('list')}
                                className={cn("rounded-lg", viewMode === 'list' ? "bg-slate-100 text-slate-900" : "text-muted-foreground")}
                            >
                                <ListIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full" onValueChange={(val) => { setCurrentTab(val); setCurrentPage(1); }}>
                        <TabsList className="mb-6 bg-transparent p-0 gap-4">
                            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all">
                                All Documents
                            </TabsTrigger>
                            <TabsTrigger value="linked" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all">
                                Linked
                            </TabsTrigger>
                            <TabsTrigger value="unlinked" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-full px-6 transition-all">
                                Unused
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value={currentTab} className="mt-0">
                            {paginatedDocs.length > 0 ? (
                                <div className={cn(
                                    "grid gap-6 transition-all",
                                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                                )}>
                                    {paginatedDocs.map(doc => (
                                        viewMode === 'grid'
                                            ? <DocumentGridItem key={doc.id} doc={doc} />
                                            : <DocumentListItem key={doc.id} doc={doc} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-muted-foreground bg-white rounded-3xl border border-dashed border-slate-200">
                                    <File className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                                    <h3 className="text-lg font-semibold text-slate-900">No documents found</h3>
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
            </div>
        </DashboardLayout>
    );
}

function DocumentGridItem({ doc }: { doc: any }) {
    const { icon: Icon, color, bg } = getFileIcon(doc.type);

    return (
        <div className="bg-white rounded-3xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500 shadow-sm border border-slate-100 hover:-translate-y-1 flex flex-col h-full cursor-pointer">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105", bg, color)}>
                        <Icon className="h-7 w-7" />
                    </div>
                    {doc.linkedCourses.length > 0 && (
                        <div className="flex -space-x-2">
                            {doc.linkedCourses.slice(0, 3).map((_: any, i: number) => (
                                <div key={i} className="h-6 w-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[8px] font-bold text-slate-500 shadow-sm">
                                    <BookOpen className="h-3 w-3" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors truncate">
                        {doc.name}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 font-medium gap-2">
                        <span className="uppercase">{doc.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{doc.size}</span>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    {doc.linkedCourses.length > 0 ? (
                        <div className="text-xs text-slate-500">
                            Used in <span className="font-semibold text-slate-900">{doc.linkedCourses.length} courses</span>
                        </div>
                    ) : (
                        <div className="text-xs text-slate-400 italic">Unused</div>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                        <span className="text-xs text-slate-400 font-medium">{doc.date}</span>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Preview">
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DocumentListItem({ doc }: { doc: any }) {
    const { icon: Icon, color, bg } = getFileIcon(doc.type);

    return (
        <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group hover:-translate-x-1 cursor-pointer">
            <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", bg, color)}>
                <Icon className="h-8 w-8" />
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors truncate mb-1">
                    {doc.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start text-xs text-slate-500 font-medium gap-2 mb-2">
                    <span className="uppercase">{doc.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{doc.size}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{doc.date}</span>
                </div>

                {doc.linkedCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {doc.linkedCourses.map((course: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="bg-slate-50 border border-slate-100 text-slate-600 font-medium text-[10px] pl-1.5 hover:bg-white hover:shadow-sm transition-all">
                                <BookOpen className="w-3 h-3 mr-1 text-indigo-500" />
                                {course}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <span className="text-xs text-slate-400 italic">Not used in any course</span>
                )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl" title="Preview">
                    <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl" title="Download">
                    <Download className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
