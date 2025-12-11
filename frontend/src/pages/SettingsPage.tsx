import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Moon, Shield, Save } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

function ThemeOption({ value, label, currentTheme, setTheme, preview }: { value: string, label: string, currentTheme: string, setTheme: (t: any) => void, preview: React.ReactNode }) {
    const isActive = currentTheme === value;
    return (
        <div
            onClick={() => setTheme(value as any)}
            className={cn(
                "border rounded-xl p-3 cursor-pointer transition-all hover:shadow-md",
                isActive
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/50 opacity-60 hover:opacity-100"
            )}
        >
            {preview}
            <div className={cn("mt-3 text-center text-sm font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>
                {label}
            </div>
        </div>
    );
}

export function SettingsPage() {
    const { theme, setTheme } = useTheme();
    return (
        <DashboardLayout>
            <div className="max-w-6xl pb-10">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Manage your account preferences and app settings.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="account" className="space-y-8">
                    <TabsList className="bg-muted p-1 rounded-lg">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    </TabsList>

                    {/* Account Settings */}
                    <TabsContent value="account" className="space-y-8">
                        {/* Profile Information Card */}
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-primary/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-primary/20">
                                    <User className="h-4 w-4" />
                                </span>
                                Profile Information
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-foreground font-semibold">First Name</Label>
                                        <Input
                                            id="firstName"
                                            defaultValue="John"
                                            className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-foreground font-semibold">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            defaultValue="Doe"
                                            className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email" className="text-foreground font-semibold">Email</Label>
                                        <Input
                                            id="email"
                                            defaultValue="john.doe@example.com"
                                            className="h-12 rounded-xl bg-muted/50 border-input focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-auto font-semibold shadow-lg shadow-primary/20">
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-destructive/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-destructive/10 text-destructive w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-destructive/20">
                                    <Shield className="h-4 w-4" />
                                </span>
                                Security
                            </h2>

                            <div className="relative z-10">
                                <p className="text-sm text-muted-foreground mb-4">Manage your password and security settings.</p>
                                <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 h-11 rounded-xl">
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications" className="space-y-8">
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-yellow-500/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-yellow-500/10 text-yellow-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-yellow-500/20">
                                    <Bell className="h-4 w-4" />
                                </span>
                                Email Preferences
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between py-4 border-b border-border/50">
                                    <Label htmlFor="course-updates" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-foreground">Course Updates</span>
                                        <span className="font-normal text-sm text-muted-foreground">Get notified when new lessons are added.</span>
                                    </Label>
                                    <Switch id="course-updates" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-border/50">
                                    <Label htmlFor="security-alerts" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-foreground">Security Alerts</span>
                                        <span className="font-normal text-sm text-muted-foreground">Get notified about suspicious activity.</span>
                                    </Label>
                                    <Switch id="security-alerts" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <Label htmlFor="marketing" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-foreground">Marketing Emails</span>
                                        <span className="font-normal text-sm text-muted-foreground">Receive offers and newsletters.</span>
                                    </Label>
                                    <Switch id="marketing" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Billing Settings */}
                    <TabsContent value="billing" className="space-y-8">
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-green-500/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-green-500/10 text-green-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-green-500/20">
                                    $
                                </span>
                                Billing & Plans
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="bg-muted/50 p-6 rounded-xl flex items-center justify-between border border-border/50">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">Free Plan</h3>
                                        <p className="text-sm text-muted-foreground">You are currently on the free tier.</p>
                                    </div>
                                    <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-auto font-semibold shadow-lg shadow-primary/20">
                                        Upgrade to Pro
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground">Payment Methods</h3>
                                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between hover:bg-muted/30 hover:shadow-sm transition-all">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-12 bg-muted rounded-lg flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-foreground">Visa ending in 4242</p>
                                                <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg">
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance" className="space-y-8">
                        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-purple-500/5 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-foreground relative z-10">
                                <span className="bg-purple-500/10 text-purple-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-purple-500/20">
                                    <Moon className="h-4 w-4" />
                                </span>
                                Theme Preferences
                            </h2>

                            <div className="relative z-10">
                                <p className="text-sm text-muted-foreground mb-6">Customize how OpenLearnAI looks on your device.</p>

                                <div className="grid grid-cols-3 gap-4">
                                    <ThemeOption
                                        value="light"
                                        label="Light"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="space-y-2 bg-slate-100 p-3 rounded-lg border border-slate-200">
                                                <div className="h-2 w-20 bg-slate-300 rounded" />
                                                <div className="h-2 w-full bg-slate-300 rounded" />
                                            </div>
                                        )}
                                    />
                                    <ThemeOption
                                        value="dark"
                                        label="Dark"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="space-y-2 bg-slate-900 p-3 rounded-lg border border-slate-700">
                                                <div className="h-2 w-20 bg-slate-600 rounded" />
                                                <div className="h-2 w-full bg-slate-600 rounded" />
                                            </div>
                                        )}
                                    />
                                    <ThemeOption
                                        value="system"
                                        label="System"
                                        currentTheme={theme}
                                        setTheme={setTheme}
                                        preview={(
                                            <div className="flex h-full items-center justify-center p-4 bg-muted/20 border border-dashed border-border rounded-lg">
                                                <span className="text-xs text-muted-foreground font-semibold">Auto</span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
