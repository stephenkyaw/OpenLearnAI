import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Github, Mail, Lock, User } from "lucide-react";

export function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate register
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    const handleSocialLogin = () => {
        setLoading(true);
        // Simulate social login
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Join thousands of learners today"
        >
            <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/80 font-semibold ml-1">Full Name</Label>
                    <div className="relative">
                        <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            className="h-12 pl-11 rounded-xl bg-muted/30 border-input hover:bg-muted/50 focus:bg-background transition-all shadow-sm"
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/80 font-semibold ml-1">Email</Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="h-12 pl-11 rounded-xl bg-muted/30 border-input hover:bg-muted/50 focus:bg-background transition-all shadow-sm"
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground/80 font-semibold ml-1">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="h-12 pl-11 rounded-xl bg-muted/30 border-input hover:bg-muted/50 focus:bg-background transition-all shadow-sm"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <Button
                    className="w-full h-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 text-base font-bold tracking-wide"
                    type="submit"
                    disabled={loading}
                    variant="premium"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                    <span className="bg-card px-4 text-muted-foreground font-semibold">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    type="button"
                    disabled={loading}
                    onClick={handleSocialLogin}
                    className="h-12 rounded-xl bg-card hover:bg-muted transition-all duration-300 border-border/60 hover:border-primary/30 hover:shadow-md"
                >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    disabled={loading}
                    onClick={handleSocialLogin}
                    className="h-12 rounded-xl bg-card hover:bg-muted transition-all duration-300 border-border/60 hover:border-primary/30 hover:shadow-md"
                >
                    <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google
                </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-8">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-all hover:underline">
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
}
