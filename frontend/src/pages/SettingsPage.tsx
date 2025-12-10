import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Moon, Shield, Save } from "lucide-react";

export function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl pb-10">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Manage your account preferences and app settings.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="account" className="space-y-8">
                    <TabsList className="bg-slate-100 p-1 rounded-lg">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    </TabsList>

                    {/* Account Settings */}
                    <TabsContent value="account" className="space-y-8">
                        {/* Profile Information Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-indigo-50 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-slate-900 relative z-10">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-indigo-200">
                                    <User className="h-4 w-4" />
                                </span>
                                Profile Information
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-slate-700 font-semibold">First Name</Label>
                                        <Input
                                            id="firstName"
                                            defaultValue="John"
                                            className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-slate-700 font-semibold">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            defaultValue="Doe"
                                            className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
                                        <Input
                                            id="email"
                                            defaultValue="john.doe@example.com"
                                            className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button className="h-12 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold shadow-lg shadow-slate-200">
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-red-50 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-slate-900 relative z-10">
                                <span className="bg-red-100 text-red-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-red-200">
                                    <Shield className="h-4 w-4" />
                                </span>
                                Security
                            </h2>

                            <div className="relative z-10">
                                <p className="text-sm text-slate-600 mb-4">Manage your password and security settings.</p>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-11 rounded-xl">
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications" className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-yellow-50 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-slate-900 relative z-10">
                                <span className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-yellow-200">
                                    <Bell className="h-4 w-4" />
                                </span>
                                Email Preferences
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                                    <Label htmlFor="course-updates" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-slate-900">Course Updates</span>
                                        <span className="font-normal text-sm text-slate-600">Get notified when new lessons are added.</span>
                                    </Label>
                                    <Switch id="course-updates" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                                    <Label htmlFor="security-alerts" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-slate-900">Security Alerts</span>
                                        <span className="font-normal text-sm text-slate-600">Get notified about suspicious activity.</span>
                                    </Label>
                                    <Switch id="security-alerts" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <Label htmlFor="marketing" className="flex flex-col space-y-1 cursor-pointer">
                                        <span className="font-semibold text-slate-900">Marketing Emails</span>
                                        <span className="font-normal text-sm text-slate-600">Receive offers and newsletters.</span>
                                    </Label>
                                    <Switch id="marketing" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Billing Settings */}
                    <TabsContent value="billing" className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-green-50 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-slate-900 relative z-10">
                                <span className="bg-green-100 text-green-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-green-200">
                                    $
                                </span>
                                Billing & Plans
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="bg-slate-50 p-6 rounded-xl flex items-center justify-between border border-slate-200">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">Free Plan</h3>
                                        <p className="text-sm text-slate-600">You are currently on the free tier.</p>
                                    </div>
                                    <Button className="h-12 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold shadow-lg shadow-slate-200">
                                        Upgrade to Pro
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-900">Payment Methods</h3>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:bg-white hover:border-green-100 hover:shadow-sm transition-all">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-12 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-slate-900">Visa ending in 4242</p>
                                                <p className="text-xs text-slate-600">Expires 12/2026</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 rounded-lg">
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance" className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-10 -mt-10 bg-purple-50 transition-all opacity-50 pointer-events-none" />

                            <h2 className="text-xl font-bold flex items-center mb-6 text-slate-900 relative z-10">
                                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mr-3 shadow-sm border border-purple-200">
                                    <Moon className="h-4 w-4" />
                                </span>
                                Theme Preferences
                            </h2>

                            <div className="relative z-10">
                                <p className="text-sm text-slate-600 mb-6">Customize how OpenLearnAI looks on your device.</p>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="border-2 border-indigo-600 rounded-xl p-3 bg-white cursor-pointer hover:shadow-md transition-shadow">
                                        <div className="space-y-2 bg-slate-100 p-3 rounded-lg">
                                            <div className="h-2 w-20 bg-slate-300 rounded" />
                                            <div className="h-2 w-full bg-slate-300 rounded" />
                                        </div>
                                        <div className="mt-3 text-center text-sm font-semibold text-indigo-600">Light</div>
                                    </div>
                                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-950 cursor-pointer opacity-50 hover:opacity-100 hover:shadow-md transition-all">
                                        <div className="space-y-2 bg-slate-800 p-3 rounded-lg">
                                            <div className="h-2 w-20 bg-slate-600 rounded" />
                                            <div className="h-2 w-full bg-slate-600 rounded" />
                                        </div>
                                        <div className="mt-3 text-center text-sm font-semibold text-slate-400">Dark</div>
                                    </div>
                                    <div className="border border-slate-200 rounded-xl p-3 bg-white cursor-pointer opacity-50 hover:opacity-100 hover:shadow-md transition-all">
                                        <div className="flex h-full items-center justify-center p-4">
                                            <span className="text-xs text-slate-600 font-semibold">System</span>
                                        </div>
                                        <div className="mt-3 text-center text-sm font-semibold text-slate-600">System</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
