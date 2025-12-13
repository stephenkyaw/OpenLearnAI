
import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Search, Filter, Upload, FileCode, FileImage, File, BookOpen,
    LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight, FileText,
    Eye, Download, MoreVertical, Archive, Trash2
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
            <div className="max-w-7xl mx-auto pb-10 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Document Library
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Manage source materials and track their usage across generated courses.
                        </p>
                    </div>
                    <Button variant="premium" className="shadow-lg shadow-indigo-500/20">
                        <Upload className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                </div>

                {/* Controls Section */}
                <div className="space-y-6">
                    <Card className="p-4 shadow-sm border-border/60">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search documents..."
                                        className="pl-10 h-11 bg-muted/30 border-input focus:bg-background transition-colors rounded-xl font-medium"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-input">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-1 border-l pl-4 border-border/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode('grid')}
                                    className={cn("h-10 w-10 rounded-lg transition-all", viewMode === 'grid' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}
                                >
                                    <LayoutGrid className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode('list')}
                                    className={cn("h-10 w-10 rounded-lg transition-all", viewMode === 'list' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}
                                >
                                    <ListIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Tabs defaultValue="all" className="w-full" onValueChange={(val) => { setCurrentTab(val); setCurrentPage(1); }}>
                        <TabsList className="mb-6 bg-transparent p-0 gap-2 h-auto flex-wrap">
                            <TabsTrigger value="all" className="h-9 px-4 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all text-sm font-medium text-muted-foreground">
                                All Documents
                            </TabsTrigger>
                            <TabsTrigger value="linked" className="h-9 px-4 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all text-sm font-medium text-muted-foreground">
                                Linked
                            </TabsTrigger>
                            <TabsTrigger value="unlinked" className="h-9 px-4 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all text-sm font-medium text-muted-foreground">
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
                                <div className="flex flex-col items-center justify-center p-16 text-center bg-card rounded-3xl border border-dashed border-border/60">
                                    <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                                        <File className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">No documents found</h3>
                                    <p className="text-muted-foreground max-w-sm">
                                        We couldn't find any documents matching your filters. Try adjusting your search query.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="h-10 w-10 rounded-full border-input hover:bg-muted hover:text-primary transition-colors"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        Page <span className="text-foreground">{currentPage}</span> of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-10 w-10 rounded-full border-input hover:bg-muted hover:text-primary transition-colors"
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
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/60 hover:-translate-y-1 hover:border-primary/20 bg-card">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm", bg, color)}>
                        <Icon className="h-7 w-7" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>

                <div className="mb-6 flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors truncate leading-tight">
                        {doc.name}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground font-medium gap-2.5">
                        <span className="uppercase font-bold tracking-wider opacity-70">{doc.type}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{doc.size}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>{doc.date}</span>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="min-h-[24px]">
                        {doc.linkedCourses.length > 0 ? (
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {doc.linkedCourses.slice(0, 3).map((_: any, i: number) => (
                                        <div key={i} className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-[8px] font-bold text-muted-foreground shadow-sm">
                                            <BookOpen className="h-3 w-3" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground font-medium">Used in {doc.linkedCourses.length} courses</span>
                            </div>
                        ) : (
                            <span className="text-xs text-muted-foreground/50 italic flex items-center"><Archive className="h-3 w-3 mr-1.5" /> Unused</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 border-t border-border/40 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="sm" className="flex-1 h-9 font-medium text-xs bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
                            <Eye className="h-3.5 w-3.5 mr-2" /> Preview
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function DocumentListItem({ doc }: { doc: any }) {
    const { icon: Icon, color, bg } = getFileIcon(doc.type);

    return (
        <Card className="hover:shadow-md transition-all duration-300 group hover:border-primary/20 border-border/60 cursor-default">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm", bg, color)}>
                    <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full">
                    <div className="md:col-span-2 min-w-0">
                        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate mb-1">
                            {doc.name}
                        </h3>
                        <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground font-medium gap-2">
                            <span>{doc.size}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <span>{doc.date}</span>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start">
                        {doc.linkedCourses.length > 0 ? (
                            <Badge variant="secondary" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 font-medium text-[10px] pl-2 pr-3 py-1">
                                <BookOpen className="w-3 h-3 mr-1.5" />
                                {doc.linkedCourses.length} Linked
                            </Badge>
                        ) : (
                            <span className="text-xs text-muted-foreground/50 italic px-2">Unused</span>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
