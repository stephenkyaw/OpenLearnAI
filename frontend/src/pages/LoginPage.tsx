import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Github } from "lucide-react";

export function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
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
            title="Welcome back"
            subtitle="Enter your email to sign in to your account"
        >
            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-semibold">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background transition-all shadow-sm"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-foreground font-semibold">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium">
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background transition-all shadow-sm"
                    />
                </div>
                <Button
                    className="w-full h-12 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 text-base font-semibold"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-medium">
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
                    className="h-11 rounded-xl bg-transparent hover:bg-muted transition-all duration-200 border-border"
                >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    disabled={loading}
                    onClick={handleSocialLogin}
                    className="h-11 rounded-xl bg-transparent hover:bg-muted transition-all duration-200 border-border"
                >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google
                </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-primary hover:text-primary/80 font-semibold">
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    );
}
