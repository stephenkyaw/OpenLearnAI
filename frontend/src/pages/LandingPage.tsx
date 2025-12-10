import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Upload, Layout } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -z-10 opacity-30 animate-pulse" />
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-6 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                        AI-Powered Learning Platform
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white drop-shadow-sm">
                        Master Any Subject with <br />
                        <span className="text-indigo-600">Intelligent Structure</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Upload your unstructured documents. We turn them into interactive courses, quizzes, and personalized learning paths using advanced AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <Button variant="premium" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                                Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/demo">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-secondary/30 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Chaos into Clarity</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            OpenLearnAI takes your PDFs, Docs, and heavy textbooks and breaks them down into digestible, trackable learning modules.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Upload className="h-10 w-10 text-blue-600" />}
                            title="Upload Anything"
                            description="Support for PDF, DOCX, and TXT. Drag and drop your study materials and let AI do the heavy lifting."
                        />
                        <FeatureCard
                            icon={<Brain className="h-10 w-10 text-purple-600" />}
                            title="AI Structuring"
                            description="Automatically generates units, chapters, and topics. It understands the context and organizes logically."
                        />
                        <FeatureCard
                            icon={<Layout className="h-10 w-10 text-pink-600" />}
                            title="Interactive Quizzes"
                            description="Test your knowledge with AI-generated quizzes and exercises tailored to each chapter's content."
                        />
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-20 border-y border-border/40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <Stat number="10k+" label="Documents Processed" />
                        <Stat number="500+" label="Courses Generated" />
                        <Stat number="98%" label="User Satisfaction" />
                        <Stat number="24/7" label="AI Availability" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background py-12 border-t border-border">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                        <span className="font-bold text-lg">OpenLearnAI</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2024 OpenLearnAI. Open Source Education.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-xl bg-background shadow-sm border border-border/50 w-fit group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}

function Stat({ number, label }: { number: string, label: string }) {
    return (
        <div>
            <div className="text-4xl font-extrabold text-foreground mb-1">{number}</div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
        </div>
    )
}
