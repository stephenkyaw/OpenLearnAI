import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, Bell, Moon, Shield, Save, CreditCard, Mail } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

function ThemeOption({ value, label, currentTheme, setTheme, preview }: { value: string, label: string, currentTheme: string, setTheme: (t: any) => void, preview: React.ReactNode }) {
    const isActive = currentTheme === value;
    return (
        <div
            onClick={() => setTheme(value as any)}
            className={cn(
                "border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg",
                isActive
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border/60 bg-card hover:border-primary/50 opacity-70 hover:opacity-100"
            )}
        >
            <div className="mb-4 pointer-events-none select-none">{preview}</div>
            <div className={cn("text-center text-sm font-bold", isActive ? "text-primary" : "text-muted-foreground")}>
                {label}
            </div>
        </div>
    );
}

export function SettingsPage() {
    const { theme, setTheme } = useTheme();
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-10 animate-fade-in">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Settings
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Manage your account preferences, security, and application settings.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="account" className="space-y-8">
                    <TabsList className="bg-transparent p-0 gap-2 h-auto flex-wrap mb-6">
                        <TabsTrigger value="account" className="h-10 px-6 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all font-medium text-muted-foreground">Account</TabsTrigger>
                        <TabsTrigger value="notifications" className="h-10 px-6 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all font-medium text-muted-foreground">Notifications</TabsTrigger>
                        <TabsTrigger value="billing" className="h-10 px-6 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all font-medium text-muted-foreground">Billing</TabsTrigger>
                        <TabsTrigger value="appearance" className="h-10 px-6 rounded-full border border-transparent data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm hover:bg-muted/50 transition-all font-medium text-muted-foreground">Appearance</TabsTrigger>
                    </TabsList>

                    {/* Account Settings */}
                    <TabsContent value="account" className="space-y-8">
                        {/* Profile Information Card */}
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-primary/10 transition-all opacity-50 pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    Profile Information
                                </CardTitle>
                                <CardDescription>Update your personal details and contact info.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 relative z-10">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-foreground font-semibold ml-1">First Name</Label>
                                        <Input
                                            id="firstName"
                                            defaultValue="John"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-foreground font-semibold ml-1">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            defaultValue="Doe"
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email" className="text-foreground font-semibold ml-1">Email Address</Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                defaultValue="john.doe@example.com"
                                                className="h-12 rounded-xl pl-10"
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end pt-2 pb-6 px-8 bg-muted/20 border-t border-border/50">
                                <Button className="h-11 px-8 rounded-xl font-semibold shadow-lg shadow-primary/20" variant="premium">
                                    <Save className="h-4 w-4 mr-2" /> Save Changes
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Security Card */}
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-destructive/5 transition-all opacity-50 pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-destructive/10 rounded-xl text-destructive">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    Security
                                </CardTitle>
                                <CardDescription>Manage your password and account security settings.</CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 pb-8">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-card/50">
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-foreground">Password</h4>
                                        <p className="text-sm text-muted-foreground">Last changed 3 months ago.</p>
                                    </div>
                                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 h-10 rounded-xl font-medium">
                                        Change Password
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications" className="space-y-8">
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-yellow-500/5 transition-all opacity-50 pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-600">
                                        <Bell className="h-5 w-5" />
                                    </div>
                                    Email Preferences
                                </CardTitle>
                                <CardDescription>Manage what emails you receive from us.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20">
                                            <div className="font-bold text-lg">📚</div>
                                        </div>
                                        <Label htmlFor="course-updates" className="flex flex-col space-y-1 cursor-pointer">
                                            <span className="font-semibold text-foreground text-base">Course Updates</span>
                                            <span className="font-normal text-sm text-muted-foreground">Get notified when new lessons or materials are added.</span>
                                        </Label>
                                    </div>
                                    <Switch id="course-updates" defaultChecked />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <Label htmlFor="security-alerts" className="flex flex-col space-y-1 cursor-pointer">
                                            <span className="font-semibold text-foreground text-base">Security Alerts</span>
                                            <span className="font-normal text-sm text-muted-foreground">Get notified about suspicious activity and login attempts.</span>
                                        </Label>
                                    </div>
                                    <Switch id="security-alerts" defaultChecked />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-500/20">
                                            <div className="font-bold text-lg">🎁</div>
                                        </div>
                                        <Label htmlFor="marketing" className="flex flex-col space-y-1 cursor-pointer">
                                            <span className="font-semibold text-foreground text-base">Marketing Emails</span>
                                            <span className="font-normal text-sm text-muted-foreground">Receive special offers, newsletters, and feature updates.</span>
                                        </Label>
                                    </div>
                                    <Switch id="marketing" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Billing Settings */}
                    <TabsContent value="billing" className="space-y-8">
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-green-500/5 transition-all opacity-50 pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/10 rounded-xl text-green-600">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    Billing & Plans
                                </CardTitle>
                                <CardDescription>Manage your subscription and payment methods.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 relative z-10">
                                <div className="bg-gradient-to-br from-muted/50 to-muted/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-border/50 gap-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                                            Free Plan
                                            <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">Current</span>
                                        </h3>
                                        <p className="text-muted-foreground mt-1">You are currently on the free tier with limited access.</p>
                                    </div>
                                    <Button className="h-11 px-8 rounded-xl font-bold shadow-lg shadow-primary/20" variant="premium">
                                        Upgrade to Pro
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg text-foreground">Payment Methods</h3>
                                    <div className="bg-card border border-border/60 rounded-2xl p-4 flex items-center justify-between hover:bg-muted/30 hover:shadow-sm transition-all group/card">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-16 bg-muted rounded-xl flex items-center justify-center text-xs font-bold text-muted-foreground border border-border/50">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground">Visa ending in 4242</p>
                                                <p className="text-xs text-muted-foreground font-medium">Expires 12/2026</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg font-medium">
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance" className="space-y-8">
                        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-border/60">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 bg-purple-500/5 transition-all opacity-50 pointer-events-none" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600">
                                        <Moon className="h-5 w-5" />
                                    </div>
                                    Theme Preferences
                                </CardTitle>
                                <CardDescription>Customize how OpenLearnAI looks on your device.</CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 pb-10">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-4">
                                    <ThemeOption
                                        value="light"
                                        label="Light"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="space-y-2 bg-[#f8fafc] p-4 rounded-xl border border-border/60 shadow-sm aspect-video flex flex-col justify-center">
                                                <div className="h-2.5 w-24 bg-slate-300 rounded-full mb-2" />
                                                <div className="space-y-1.5 opacity-60">
                                                    <div className="h-2 w-full bg-slate-200 rounded-full" />
                                                    <div className="h-2 w-full bg-slate-200 rounded-full" />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <ThemeOption
                                        value="dark"
                                        label="Dark"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="space-y-2 bg-[#020817] p-4 rounded-xl border border-slate-800 shadow-sm aspect-video flex flex-col justify-center">
                                                <div className="h-2.5 w-24 bg-slate-700 rounded-full mb-2" />
                                                <div className="space-y-1.5 opacity-60">
                                                    <div className="h-2 w-full bg-slate-800 rounded-full" />
                                                    <div className="h-2 w-full bg-slate-800 rounded-full" />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <ThemeOption
                                        value="system"
                                        label="System"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="flex h-full items-center justify-center p-4 bg-muted/30 border-2 border-dashed border-border/60 rounded-xl aspect-video">
                                                <span className="text-sm text-muted-foreground font-bold bg-muted/50 px-3 py-1 rounded-md">Auto</span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
