import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, FileText, Trash2, Plus, Link as LinkIcon, Youtube, Wand2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";

interface ResourceLink {
    id: string;
    type: 'website' | 'youtube';
    url: string;
}

export function CreateCoursePage() {
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructions, setCourseInstructions] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [links, setLinks] = useState<ResourceLink[]>([]);
    const [newLink, setNewLink] = useState("");

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(prev => [...prev, ...Array.from(selectedFiles)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const addLink = () => {
        if (!newLink) return;
        const type = newLink.includes('youtube.com') || newLink.includes('youtu.be') ? 'youtube' : 'website';
        setLinks([...links, { id: Math.random().toString(36).substr(2, 9), type, url: newLink }]);
        setNewLink("");
    };

    const removeLink = (id: string) => {
        setLinks(links.filter(l => l.id !== id));
    };

    const handleCreateCourse = () => {
        if (!courseName || (files.length === 0 && links.length === 0)) return;
        setUploading(true);

        // Simulate complex AI processing
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                navigate("/course/english"); // Redirect to demo course
            }
        }, 100);
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-10 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Create New Course
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Transform documents and video URLs into a structured, interactive learning experience within minutes.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Course Details Card */}
                        <Card className="relative overflow-hidden group shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
                            {/* Decorative Blur Blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-primary/10 transition-all opacity-50 pointer-events-none group-hover:opacity-70" />

                            <CardHeader>
                                <CardTitle className="flex items-center text-2xl">
                                    <span className="bg-primary/10 text-primary w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-sm border border-primary/20">1</span>
                                    Course Details
                                </CardTitle>
                                <CardDescription className="text-base ml-14">
                                    Basic information to identify your course.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <Label htmlFor="courseName" className="text-foreground font-semibold text-sm ml-1">Course Name</Label>
                                    <Input
                                        id="courseName"
                                        placeholder="e.g. Advanced Python Masterclass"
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        className="h-14 text-lg rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseDescription" className="text-foreground font-semibold text-sm ml-1">Description</Label>
                                    <Textarea
                                        id="courseDescription"
                                        placeholder="Briefly describe what this course is about..."
                                        value={courseDescription}
                                        onChange={(e) => setCourseDescription(e.target.value)}
                                        className="min-h-[120px] rounded-xl bg-muted/30 border-input focus:bg-background focus:ring-4 focus:ring-primary/10 text-base resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseInstructions" className="text-foreground font-semibold text-sm ml-1">
                                        Custom AI Instructions <span className="text-muted-foreground font-normal text-xs ml-2">(Optional)</span>
                                    </Label>
                                    <Textarea
                                        id="courseInstructions"
                                        placeholder="e.g. 'Focus on practical examples', 'Use a professional tone', 'Include 3 quizzes per module'..."
                                        value={courseInstructions}
                                        onChange={(e) => setCourseInstructions(e.target.value)}
                                        className="min-h-[100px] rounded-xl bg-muted/30 border-input focus:bg-background focus:ring-4 focus:ring-primary/10 text-base resize-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. Upload Materials Card */}
                        <Card className="relative overflow-hidden group shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-blue-500/10 transition-all opacity-50 pointer-events-none group-hover:opacity-70" />

                            <CardHeader>
                                <CardTitle className="flex items-center text-2xl">
                                    <span className="bg-blue-500/10 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-sm border border-blue-500/20">2</span>
                                    Upload Materials
                                </CardTitle>
                                <CardDescription className="text-base ml-14">
                                    Upload documents (PDF, DOCX, TXT) for the AI to analyze.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <div
                                    className={cn(
                                        "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer relative z-10 group/drop",
                                        isDragging
                                            ? "border-primary bg-primary/5 scale-[1.01] shadow-inner"
                                            : "border-border/60 hover:border-primary/40 hover:bg-muted/30"
                                    )}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className={cn("h-20 w-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 shadow-sm",
                                        isDragging ? "bg-card text-primary scale-110" : "bg-muted/50 text-muted-foreground group-hover/drop:scale-110 group-hover/drop:bg-primary/10 group-hover/drop:text-primary")}>
                                        <Upload className="h-10 w-10 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-xl text-foreground mb-2">Drag & drop files here</h3>
                                    <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                                        Support for PDF, DOCX, and TXT files up to 50MB.
                                    </p>
                                    <div className="relative">
                                        <Button variant="outline" className="border-border/60 bg-card hover:bg-white hover:text-primary hover:border-primary/30 font-semibold rounded-xl px-8 h-12 shadow-sm">
                                            Select Files
                                        </Button>
                                        <Input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept=".pdf,.docx,.txt"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                {/* File List */}
                                {files.length > 0 && (
                                    <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2">
                                        {files.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-card border border-border/50 p-4 rounded-xl group/file hover:border-blue-500/30 hover:shadow-md transition-all">
                                                <div className="flex items-center space-x-4 overflow-hidden">
                                                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div className="text-left min-w-0">
                                                        <p className="text-sm font-bold text-foreground truncate pr-4">{file.name}</p>
                                                        <p className="text-xs text-muted-foreground font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => removeFile(idx)} className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors shrink-0">
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* 3. External Resources Card */}
                        <Card className="relative overflow-hidden group shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-purple-500/10 transition-all opacity-50 pointer-events-none group-hover:opacity-70" />

                            <CardHeader>
                                <CardTitle className="flex items-center text-2xl">
                                    <span className="bg-purple-500/10 text-purple-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-sm border border-purple-500/20">3</span>
                                    Add Resources
                                </CardTitle>
                                <CardDescription className="text-base ml-14">
                                    Include links to websites or YouTube videos for content enrichment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Paste YouTube video or website URL..."
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addLink()}
                                        className="h-12 rounded-xl text-base"
                                    />
                                    <Button
                                        onClick={addLink}
                                        className="h-12 px-6 rounded-xl font-semibold shadow-lg shadow-primary/20 shrink-0"
                                        variant="default"
                                    >
                                        <Plus className="h-5 w-5 mr-2" /> Add
                                    </Button>
                                </div>

                                {/* Link List */}
                                {links.length > 0 && (
                                    <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2">
                                        {links.map((link) => (
                                            <div key={link.id} className="flex items-center justify-between bg-card border border-border/50 p-4 rounded-xl group/link hover:border-purple-500/30 hover:shadow-md transition-all">
                                                <div className="flex items-center space-x-4 overflow-hidden">
                                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                                                        link.type === 'youtube' ? "bg-red-500/10 text-red-600" : "bg-purple-500/10 text-purple-600")}>
                                                        {link.type === 'youtube' ? <Youtube className="h-6 w-6" /> : <LinkIcon className="h-6 w-6" />}
                                                    </div>
                                                    <p className="text-sm font-medium text-foreground truncate pr-4">{link.url}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => removeLink(link.id)} className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors shrink-0">
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <Card className="shadow-xl shadow-indigo-500/10 border-border/60 bg-card/80 backdrop-blur-xl">
                                <CardHeader className="pb-4 border-b border-border/50">
                                    <CardTitle className="text-xl">Course Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground font-medium flex items-center"><FileText className="h-4 w-4 mr-2 opacity-70" /> Files Uploaded</span>
                                            <span className="font-bold text-foreground bg-secondary px-2.5 py-0.5 rounded-full">{files.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground font-medium flex items-center"><LinkIcon className="h-4 w-4 mr-2 opacity-70" /> External Links</span>
                                            <span className="font-bold text-foreground bg-secondary px-2.5 py-0.5 rounded-full">{links.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm pt-2 border-t border-border/50">
                                            <span className="text-muted-foreground font-medium">Est. Generation Time</span>
                                            <span className="font-bold text-emerald-600">~2 mins</span>
                                        </div>
                                    </div>

                                    {uploading ? (
                                        <div className="space-y-4 pt-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-primary">
                                                <span className="flex items-center"><Wand2 className="h-3 w-3 mr-1 animate-pulse" /> AI Processing...</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-indigo-600 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.4)]"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground text-center animate-pulse">
                                                Wait a moment while we structure your course...
                                            </p>
                                        </div>
                                    ) : (
                                        <Button
                                            className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
                                            onClick={handleCreateCourse}
                                            disabled={!courseName || (files.length === 0 && links.length === 0)}
                                            variant="premium"
                                        >
                                            <Wand2 className="h-5 w-5 mr-2" /> Generate Course
                                        </Button>
                                    )}

                                    <p className="text-xs text-muted-foreground text-center leading-relaxed px-2 opacity-80">
                                        Our AI will analyze your inputs to create a structured, interactive learning path with quizzes and flashcards.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
