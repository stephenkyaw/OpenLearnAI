import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Flame, Calendar, BookOpen, Clock, Linkedin, Twitter, Github, Globe, User } from "lucide-react";

export function ProfilePage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profile</h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Manage your profile and track your learning progress.
                        </p>
                    </div>
                </div>

                {/* Header Profile Card */}
                <div className="bg-white rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-indigo-50 transition-all opacity-50 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                            JD
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-slate-200">
                            <div className="bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <h1 className="text-3xl font-bold text-slate-900">John Doe</h1>
                            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Pro Learner</span>
                        </div>
                        <p className="text-slate-600 max-w-lg">Product Manager | Lifelong Learner | San Francisco, CA</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <div className="flex items-center text-sm text-slate-500">
                                <Calendar className="h-4 w-4 mr-1" /> Joined Jan 2024
                            </div>
                            <div className="flex items-center text-sm text-slate-500">
                                <Award className="h-4 w-4 mr-1" /> Top 5%
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[150px] relative z-10">
                        <Link to="/dashboard/settings">
                            <Button className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200">
                                <User className="h-4 w-4 mr-2" /> Edit Profile
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-11 rounded-xl">Share Profile</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatBox icon={<Flame className="text-orange-500" />} value="14" label="Day Streak" />
                            <StatBox icon={<BookOpen className="text-blue-500" />} value="12" label="Courses" />
                            <StatBox icon={<Clock className="text-purple-500" />} value="48h" label="Learning Time" />
                            <StatBox icon={<Award className="text-yellow-500" />} value="1,250" label="XP Points" />
                        </div>

                        {/* About Me */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-blue-50 transition-all opacity-50 pointer-events-none" />

                            <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">About Me</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                Passionate about technology and lifelong learning. Currently focused on mastering Business English and Python to advance my career in Product Management. Always open to connecting with fellow learners!
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3 relative z-10">
                                <SocialButton icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
                                <SocialButton icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                                <SocialButton icon={<Github className="h-4 w-4" />} label="GitHub" />
                                <SocialButton icon={<Globe className="h-4 w-4" />} label="Website" />
                            </div>
                        </div>

                        {/* Learning Activity */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-purple-50 transition-all opacity-50 pointer-events-none" />

                            <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Learning Activity</h3>
                            <div className="flex gap-1 h-32 items-end justify-between relative z-10">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-full bg-indigo-500/20 rounded-sm hover:bg-indigo-500/40 transition-colors cursor-pointer"
                                        style={{ height: `${Math.max(10, Math.random() * 100)}%`, opacity: Math.random() + 0.2 }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-2 relative z-10">
                                <span>30 Days ago</span>
                                <span>Today</span>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-yellow-50 transition-all opacity-50 pointer-events-none" />

                            <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Recent Achievements</h3>
                            <div className="space-y-4 relative z-10">
                                <AchievementItem
                                    title="Communication Master"
                                    desc="Completed the Business English Module"
                                    date="2 days ago"
                                    icon={<Award className="h-5 w-5 text-yellow-600" />}
                                    bg="bg-yellow-50"
                                />
                                <AchievementItem
                                    title="Early Bird"
                                    desc="Completed a lesson before 8 AM"
                                    date="1 week ago"
                                    icon={<Clock className="h-5 w-5 text-blue-600" />}
                                    bg="bg-blue-50"
                                />
                                <AchievementItem
                                    title="Quick Starter"
                                    desc="Finished first quiz with 100% score"
                                    date="2 weeks ago"
                                    icon={<Flame className="h-5 w-5 text-orange-600" />}
                                    bg="bg-orange-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Skills */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-green-50 transition-all opacity-50 pointer-events-none" />

                            <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Skills Progress</h3>
                            <div className="space-y-4 relative z-10">
                                <SkillBar skill="Business English" progress={85} />
                                <SkillBar skill="Python Programming" progress={40} />
                                <SkillBar skill="Data Science" progress={25} />
                                <SkillBar skill="Public Speaking" progress={60} />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
                            <p className="text-indigo-100 text-sm mb-4">Unlock unlimited AI generation and advanced analytics.</p>
                            <Button className="w-full h-11 rounded-xl bg-white text-indigo-600 hover:bg-slate-50 font-semibold">View Plans</Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatBox({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
    return (
        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 hover:border-slate-300 hover:shadow-sm transition-all duration-200 group cursor-default">
            <div className="p-2 bg-slate-50 rounded-lg text-slate-900 group-hover:scale-105 transition-transform duration-200">{icon}</div>
            <div>
                <div className="text-xl font-bold tracking-tight text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 font-medium">{label}</div>
            </div>
        </div>
    )
}

function AchievementItem({ title, desc, date, icon, bg }: { title: string, desc: string, date: string, icon: React.ReactNode, bg: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${bg} border border-slate-200`}>
                    {icon}
                </div>
                <div>
                    <div className="font-semibold text-sm text-slate-900">{title}</div>
                    <div className="text-xs text-slate-600">{desc}</div>
                </div>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{date}</div>
        </div>
    )
}

function SkillBar({ skill, progress }: { skill: string, progress: number }) {
    return (
        <div className="space-y-2 group">
            <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-900">{skill}</span>
                <span className="text-slate-600 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out group-hover:bg-indigo-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <Button variant="outline" size="sm" className="space-x-2 rounded-lg hover:bg-slate-50">
            {icon}
            <span>{label}</span>
        </Button>
    )
}
