import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react"; // Assuming lucide-react is installed

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        OpenLearnAI
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </Link>
                    <Link to="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Pricing
                    </Link>
                    <Link to="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/login">
                        <Button variant="ghost" className="text-sm font-medium">Log in</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="premium" className="text-sm font-medium">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
