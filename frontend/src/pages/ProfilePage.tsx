import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Flame, Calendar, BookOpen, Clock, Linkedin, Twitter, Github, Globe, User, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfilePage() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-10 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Profile
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Manage your personal profile and track your learning journey.
                        </p>
                    </div>
                </div>

                {/* Header Profile Card */}
                <Card className="rounded-3xl border-border/60 mb-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-primary/10 transition-all opacity-50 pointer-events-none group-hover:opacity-70" />

                    <CardContent className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        <div className="relative shrink-0">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-primary-foreground text-4xl font-bold border-4 border-card shadow-xl ring-2 ring-primary/10">
                                JD
                            </div>
                            <div className="absolute bottom-1 right-1 bg-card p-1 rounded-full border border-border shadow-sm">
                                <div className="bg-emerald-500 h-4 w-4 rounded-full border-2 border-card animate-pulse"></div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-3">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <h2 className="text-3xl font-bold text-foreground tracking-tight">John Doe</h2>
                                <span className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-0.5 rounded-full text-sm font-bold tracking-wide shadow-sm">
                                    PRO LEARNER
                                </span>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-lg mx-auto md:mx-0 font-medium">
                                Product Manager | Lifelong Learner | San Francisco, CA
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2 text-sm font-medium text-muted-foreground">
                                <div className="flex items-center hover:text-primary transition-colors">
                                    <Calendar className="h-4 w-4 mr-2 opacity-70" /> Joined Jan 2024
                                </div>
                                <div className="flex items-center hover:text-primary transition-colors">
                                    <Award className="h-4 w-4 mr-2 opacity-70" /> Top 5% Learner
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[160px]">
                            <Link to="/dashboard/settings" className="w-full">
                                <Button className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20" variant="premium">
                                    <User className="h-4 w-4 mr-2" /> Edit Profile
                                </Button>
                            </Link>
                            <Button variant="outline" className="h-11 rounded-xl border-input bg-card hover:bg-muted font-semibold">
                                Share Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatBox icon={<Flame className="text-orange-500 fill-orange-500/20" />} value="14" label="Day Streak" />
                            <StatBox icon={<BookOpen className="text-blue-500 fill-blue-500/20" />} value="12" label="Courses" />
                            <StatBox icon={<Clock className="text-purple-500 fill-purple-500/20" />} value="48h" label="Learning Time" />
                            <StatBox icon={<Award className="text-yellow-500 fill-yellow-500/20" />} value="1,250" label="XP Points" />
                        </div>

                        {/* About Me */}
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 bg-primary/5 transition-all opacity-50 pointer-events-none group-hover:opacity-80" />
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    Passionate about technology and lifelong learning. Currently focused on mastering Business English and Python to advance my career in Product Management. Always open to connecting with fellow learners!
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <SocialButton icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
                                    <SocialButton icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                                    <SocialButton icon={<Github className="h-4 w-4" />} label="GitHub" />
                                    <SocialButton icon={<Globe className="h-4 w-4" />} label="Website" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Learning Activity */}
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 bg-purple-500/5 transition-all opacity-50 pointer-events-none group-hover:opacity-80" />
                            <CardHeader>
                                <CardTitle>Learning Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="flex gap-1.5 h-32 items-end justify-between px-2">
                                    {[...Array(24)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-full bg-primary/20 rounded-md hover:bg-primary/60 transition-all cursor-pointer hover:scale-y-110 origin-bottom duration-300"
                                            style={{
                                                height: `${Math.max(15, Math.random() * 100)}%`,
                                                opacity: Math.max(0.3, Math.random())
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-4 px-2 uppercase tracking-wider opacity-70">
                                    <span>30 Days ago</span>
                                    <span>Today</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 bg-yellow-500/5 transition-all opacity-50 pointer-events-none group-hover:opacity-80" />
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Achievements</CardTitle>
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 -mr-2">View All <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <AchievementItem
                                    title="Communication Master"
                                    desc="Completed the Business English Module"
                                    date="2 days ago"
                                    icon={<Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                                    bg="bg-yellow-500/10 border-yellow-500/20"
                                />
                                <AchievementItem
                                    title="Early Bird"
                                    desc="Completed a lesson before 8 AM"
                                    date="1 week ago"
                                    icon={<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                                    bg="bg-blue-500/10 border-blue-500/20"
                                />
                                <AchievementItem
                                    title="Quick Starter"
                                    desc="Finished first quiz with 100% score"
                                    date="2 weeks ago"
                                    icon={<Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
                                    bg="bg-orange-500/10 border-orange-500/20"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Skills */}
                    <div className="space-y-6">
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 bg-green-500/5 transition-all opacity-50 pointer-events-none group-hover:opacity-80" />
                            <CardHeader>
                                <CardTitle>Skills Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <SkillBar skill="Business English" progress={85} color="bg-emerald-500" />
                                <SkillBar skill="Python Programming" progress={40} color="bg-blue-500" />
                                <SkillBar skill="Data Science" progress={25} color="bg-indigo-500" />
                                <SkillBar skill="Public Speaking" progress={60} color="bg-purple-500" />
                            </CardContent>
                        </Card>

                        <div className="rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-700 transition-all duration-500 group-hover:scale-105" />
                            <div className="relative z-10">
                                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Upgrade to Pro</h3>
                                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                                    Unlock unlimited AI course generation, advanced analytics, and priority support.
                                </p>
                                <Button className="w-full h-12 rounded-xl bg-white text-primary hover:bg-white/90 font-bold border-0 shadow-lg shadow-black/10">
                                    View Premium Plans
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatBox({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
    return (
        <Card className="border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-2.5 bg-muted/50 rounded-xl text-foreground group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/5">
                    {icon}
                </div>
                <div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide opacity-70 mt-0.5">{label}</div>
                </div>
            </CardContent>
        </Card>
    )
}

function AchievementItem({ title, desc, date, icon, bg }: { title: string, desc: string, date: string, icon: React.ReactNode, bg: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/40 transition-colors duration-200 group border border-transparent hover:border-border/40 cursor-default">
            <div className="flex items-center space-x-4">
                <div className={cn("p-2.5 rounded-xl border transition-transform group-hover:scale-105", bg)}>
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-sm text-foreground">{title}</div>
                    <div className="text-xs text-muted-foreground font-medium">{desc}</div>
                </div>
            </div>
            <div className="text-[10px] font-bold text-muted-foreground/70 bg-secondary/50 px-2.5 py-1 rounded-lg uppercase tracking-wide">{date}</div>
        </div>
    )
}

function SkillBar({ skill, progress, color }: { skill: string, progress: number, color: string }) {
    return (
        <div className="space-y-2.5 group">
            <div className="flex justify-between text-xs">
                <span className="font-bold text-foreground">{skill}</span>
                <span className="text-muted-foreground font-bold">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-90 shadow-[0_0_10px_rgba(0,0,0,0.1)]", color)}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <Button variant="outline" size="sm" className="space-x-2 rounded-xl h-10 px-4 hover:bg-muted border-input/60 hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all">
            {icon}
            <span className="font-medium">{label}</span>
        </Button>
    )
}
