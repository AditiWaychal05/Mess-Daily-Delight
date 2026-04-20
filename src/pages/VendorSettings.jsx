import { useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getSession, updateProfile } from "@/lib/auth";
import { useTheme } from "@/hooks/use-theme";
import { Bell, Moon, Mail, Lock, Save } from "lucide-react";

const NOTIF_KEY = "messdaily-notif-prefs";

const loadNotifs = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIF_KEY) || "null");
    if (stored) return stored;
  } catch {}
  return { email: true, push: true, sms: false };
};

const VendorSettings = () => {
  const session = getSession() || { name: "", email: "" };
  const { isDark, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: session.name || "",
    email: session.email || "",
    bio: "Serving fresh homestyle meals since 2024.",
  });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [notifs, setNotifs] = useState(loadNotifs);

  const updateNotif = (key, value) => {
    const next = { ...notifs, [key]: value };
    setNotifs(next);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
    toast.success(`${value ? "Enabled" : "Disabled"} ${key} notifications`);
  };

  const handleDarkToggle = (value) => {
    setTheme(value ? "dark" : "light");
    toast.success(`${value ? "Dark" : "Light"} mode activated`);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name: profile.name });
    toast.success("Profile updated", { description: "Your changes have been saved." });
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (pwd.next !== pwd.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (pwd.next.length < 6) {
      toast.error("Password too short", { description: "Use at least 6 characters." });
      return;
    }
    updateProfile({ password: pwd.next });
    setPwd({ current: "", next: "", confirm: "" });
    toast.success("Password changed", { description: "Use your new password next time." });
  };

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your profile, security and preferences.</p>
        </div>

        {/* Profile */}
        <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveProfile} className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-card">
                  {(profile.name?.[0] || "V").toUpperCase()}
                </div>
                <div>
                  <Button type="button" variant="outline" size="sm" className="rounded-xl">Change photo</Button>
                  <p className="text-xs text-muted-foreground mt-2">PNG or JPG, max 2MB.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full name</Label>
                  <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input value={profile.email} disabled className="h-11 rounded-xl bg-muted" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Bio</Label>
                <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="rounded-xl min-h-[90px]" />
              </div>
              <Button type="submit" className="rounded-xl gradient-orange text-primary-foreground shadow-card hover:shadow-card-hover gap-2 transition-all hover:scale-105">
                <Save className="w-4 h-4" /> Save changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2"><Lock className="w-4 h-4 text-primary" /> Change password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={savePassword} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Current password</Label>
                  <Input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label>New password</Label>
                  <Input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm</Label>
                  <Input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className="h-11 rounded-xl" />
                </div>
              </div>
              <Button type="submit" variant="outline" className="rounded-xl">Update password</Button>
            </form>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="rounded-2xl shadow-card hover:shadow-card-hover transition-shadow border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {[
              { key: "email", icon: Mail, title: "Email notifications", desc: "Order updates and weekly reports.", value: notifs.email, onChange: (v) => updateNotif("email", v) },
              { key: "push", icon: Bell, title: "Push notifications", desc: "Real-time alerts on your device.", value: notifs.push, onChange: (v) => updateNotif("push", v) },
              { key: "sms", icon: Bell, title: "SMS alerts", desc: "Text messages for urgent updates.", value: notifs.sms, onChange: (v) => updateNotif("sms", v) },
              { key: "dark", icon: Moon, title: "Dark mode", desc: "Easier on the eyes in low light.", value: isDark, onChange: handleDarkToggle },
            ].map((row) => (
              <div key={row.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <row.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{row.title}</div>
                    <div className="text-xs text-muted-foreground">{row.desc}</div>
                  </div>
                </div>
                <Switch checked={row.value} onCheckedChange={row.onChange} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorSettings;
