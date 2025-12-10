import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function UploadPage() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);

        // Simulate upload and AI processing
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploading(false);
                // Navigate to the newly created course (simulated)
                navigate("/course/introduction-to-python");
            }
        }, 200);
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Material</h1>
                    <p className="text-muted-foreground">Upload your PDF, DOCX, or TXT file. Our AI will analyze it and create a structured course for you.</p>
                </div>

                <div className="space-y-6">
                    <div
                        className={cn(
                            "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300",
                            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50",
                            file ? "bg-secondary/30" : "bg-card"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {!file ? (
                            <>
                                <div className="h-20 w-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
                                    <Upload className="h-10 w-10 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Drag & drop your file here</h3>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    Supports PDF, Word Documents, and Text files up to 50MB.
                                </p>
                                <div className="relative">
                                    <Button variant="outline">Select File</Button>
                                    <Input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.docx,.txt"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full">
                                <div className="flex items-center justify-between bg-background border border-border p-4 rounded-lg mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={uploading}>
                                        <X className="h-5 w-5 text-muted-foreground" />
                                    </Button>
                                </div>

                                {uploading && (
                                    <div className="space-y-2 text-left animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="flex items-center">
                                                {progress < 100 ? (
                                                    <>
                                                        <div className="h-3 w-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-2" />
                                                        AI Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                                                        Done!
                                                    </>
                                                )}
                                            </span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground pt-1">
                                            {progress < 30 && "Uploading file..."}
                                            {progress >= 30 && progress < 60 && "Extracting text content..."}
                                            {progress >= 60 && progress < 90 && "Generating course structure..."}
                                            {progress >= 90 && "Finalizing..."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button variant="ghost" onClick={() => navigate("/dashboard")} disabled={uploading}>Cancel</Button>
                        <Button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            variant="premium"
                            className="w-32"
                        >
                            {uploading ? "Processing..." : "Generate Course"}
                        </Button>
                    </div>

                    {/* AI Hint */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-lg flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="font-medium text-yellow-900 dark:text-yellow-200 text-sm">How it works</h4>
                            <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                                Our AI analyzes your document to understand the topics and difficulty. It then breaks it down into logical Units and Chapters, adding quizzes and examples to help you learn better.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
