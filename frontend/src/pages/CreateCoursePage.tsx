import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, Plus, Trash2, Link as LinkIcon, Youtube } from "lucide-react";
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
                navigate("/course/python-masterclass");
            }
        }, 100);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl pb-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Course</h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Transform documents and videos into structured learning.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Course Details Card */}
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            {/* Decorative Blur Blob */}
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-primary/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-primary/20">1</span>
                                Course Details
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <Label htmlFor="courseName" className="text-foreground font-semibold">Course Name</Label>
                                    <Input
                                        id="courseName"
                                        placeholder="e.g. Advanced Python Masterclass"
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseDescription" className="text-foreground font-semibold">Description</Label>
                                    <Textarea
                                        id="courseDescription"
                                        placeholder="Briefly describe what this course is about..."
                                        value={courseDescription}
                                        onChange={(e) => setCourseDescription(e.target.value)}
                                        className="h-28 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseInstructions" className="text-foreground font-semibold">
                                        Custom Instructions <span className="text-muted-foreground font-normal text-xs ml-2">(Optional)</span>
                                    </Label>
                                    <Textarea
                                        id="courseInstructions"
                                        placeholder="e.g. 'Focus on practical examples', 'Use a professional tone'..."
                                        value={courseInstructions}
                                        onChange={(e) => setCourseInstructions(e.target.value)}
                                        className="h-24 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Upload Materials Card */}
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-blue-500/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-blue-500/10 text-blue-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-blue-500/20">2</span>
                                Upload Materials
                            </h2>

                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer relative z-10",
                                    isDragging
                                        ? "border-primary bg-primary/5 scale-[1.01] shadow-inner"
                                        : "border-border hover:border-primary/40 hover:bg-muted/30 hover:shadow-lg hover:shadow-primary/5"
                                )}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className={cn("h-20 w-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm",
                                    isDragging ? "bg-card" : "bg-card border border-border/50")}>
                                    <Upload className={cn("h-8 w-8 transition-colors", isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                                </div>
                                <h3 className="font-bold text-lg text-foreground mb-2">Drag & drop files here</h3>
                                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                                    Support for PDF, DOCX, and TXT files. AI will extract and structure the content.
                                </p>
                                <div className="relative">
                                    <Button variant="outline" className="border-border bg-card hover:bg-muted text-foreground font-semibold rounded-xl px-6">
                                        Browses Files
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
                                <div className="mt-6 space-y-3 relative z-10">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-muted/50 border border-border/50 p-4 rounded-xl group/file hover:bg-card hover:border-blue-500/30 hover:shadow-sm transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-bold text-foreground truncate max-w-[200px]">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeFile(idx)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3. External Resources Card */}
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-purple-500/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-purple-500/10 text-purple-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-purple-500/20">3</span>
                                Add Resources
                            </h2>

                            <div className="flex gap-3 relative z-10">
                                <Input
                                    placeholder="Paste YouTube video or website URL..."
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addLink()}
                                    className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                                />
                                <Button
                                    onClick={addLink}
                                    className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20"
                                >
                                    <Plus className="h-5 w-5 mr-2" /> Add
                                </Button>
                            </div>

                            {/* Link List */}
                            {links.length > 0 && (
                                <div className="mt-6 space-y-3 relative z-10">
                                    {links.map((link) => (
                                        <div key={link.id} className="flex items-center justify-between bg-muted/50 border border-border/50 p-4 rounded-xl group/link hover:bg-card hover:border-purple-500/30 hover:shadow-sm transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center",
                                                    link.type === 'youtube' ? "bg-red-500/10 text-red-600" : "bg-purple-500/10 text-purple-600")}>
                                                    {link.type === 'youtube' ? <Youtube className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
                                                </div>
                                                <p className="text-sm font-medium text-foreground truncate max-w-[300px]">{link.url}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeLink(link.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 bg-card border border-border/50 rounded-3xl p-6 shadow-lg shadow-black/5">
                            <h3 className="font-bold text-lg mb-6 text-foreground">Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                                    <span className="text-muted-foreground font-medium">Files Uploaded</span>
                                    <span className="font-bold text-foreground">{files.length}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-border/50">
                                    <span className="text-muted-foreground font-medium">External Links</span>
                                    <span className="font-bold text-foreground">{links.length}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2">
                                    <span className="text-muted-foreground font-medium">Est. Generation Time</span>
                                    <span className="font-bold text-foreground">~2 mins</span>
                                </div>
                            </div>

                            {uploading ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-primary">
                                        <span>Designing Course...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.4)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 h-12 rounded-xl font-bold text-base tracking-wide transition-all hover:-translate-y-0.5"
                                    onClick={handleCreateCourse}
                                    disabled={!courseName || (files.length === 0 && links.length === 0)}
                                >
                                    Generate Course
                                </Button>
                            )}

                            <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed px-4">
                                Our AI will analyze your inputs to create a structured, interactive learning path with quizzes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
