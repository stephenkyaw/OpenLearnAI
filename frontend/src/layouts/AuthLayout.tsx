import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-background p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Logo */}
                <div className="flex items-center space-x-2 mb-12 justify-center">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                        <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">OpenLearnAI</span>
                </div>

                {/* Centered Form Card */}
                <div className="max-w-md mx-auto">
                    <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/5 border border-border/50 relative overflow-hidden backdrop-blur-sm">
                        {/* Decorative blur blob */}
                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-primary/10 opacity-50 pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                                <p className="text-sm text-muted-foreground">
                                    {subtitle}
                                </p>
                            </div>
                            {children}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <Link to="/terms" className="text-primary hover:text-primary/80 font-medium">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium">
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
