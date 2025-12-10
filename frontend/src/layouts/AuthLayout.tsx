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
                <div className="flex items-center space-x-2 mb-12">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">OpenLearnAI</span>
                </div>

                {/* Centered Form Card */}
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-md transition-shadow">
                        {/* Decorative blur blob */}
                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-indigo-50 opacity-50 pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
                                <p className="text-sm text-slate-600">
                                    {subtitle}
                                </p>
                            </div>
                            {children}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-slate-500">
                        By continuing, you agree to our{" "}
                        <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
