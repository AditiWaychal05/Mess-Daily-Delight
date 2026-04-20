import { useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, ArrowDownToLine, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrangeBarChart from "@/components/charts/OrangeBarChart";
import Calendar from "@/components/Calendar";
import { toast } from "sonner";

const stats = [
  { icon: Wallet, label: "Available balance", value: "₹42,300", hint: "Ready to withdraw" },
  { icon: DollarSign, label: "This month", value: "₹1,24,500", hint: "+8% vs last month" },
  { icon: TrendingUp, label: "Lifetime earnings", value: "₹8,42,900", hint: "Since Jan 2025" },
];

const monthlyEarnings = [
  { label: "Jan", value: 78000 },
  { label: "Feb", value: 92000 },
  { label: "Mar", value: 86000 },
  { label: "Apr", value: 124500 },
  { label: "May", value: 110000 },
  { label: "Jun", value: 132000 },
  { label: "Jul", value: 118000 },
  { label: "Aug", value: 145000 },
];

const transactions = [
  { id: "TXN-2841", date: "Apr 18, 2026", desc: "Subscription payouts", amount: "+₹12,400", status: "Completed" },
  { id: "TXN-2832", date: "Apr 15, 2026", desc: "Daily orders settlement", amount: "+₹8,900", status: "Completed" },
  { id: "TXN-2820", date: "Apr 12, 2026", desc: "Bank withdrawal", amount: "-₹25,000", status: "Processed" },
  { id: "TXN-2811", date: "Apr 09, 2026", desc: "Subscription payouts", amount: "+₹14,200", status: "Completed" },
  { id: "TXN-2799", date: "Apr 05, 2026", desc: "Bonus credit", amount: "+₹1,500", status: "Completed" },
];

const VendorEarnings = () => {
  const [calOpen, setCalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Earnings</h1>
            <p className="text-sm text-muted-foreground mt-1">Track payouts, settlements and revenue trends.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setCalOpen((v) => !v)}
                className="rounded-xl gap-2 hover:bg-accent transition-all"
              >
                <CalendarIcon className="w-4 h-4" />
                {date.toLocaleDateString("en-IN", { dateStyle: "medium" })}
              </Button>
              {calOpen && (
                <div className="absolute right-0 top-full mt-2 z-40">
                  <Calendar
                    value={date}
                    onChange={(d) => {
                      setDate(d);
                      toast.success("Date selected", { description: d.toLocaleDateString("en-IN", { dateStyle: "long" }) });
                    }}
                    onClose={() => setCalOpen(false)}
                  />
                </div>
              )}
            </div>
            <Button
              onClick={() => toast.success("Withdrawal initiated", { description: "Funds will arrive in 1-2 business days." })}
              className="rounded-xl gradient-orange text-primary-foreground shadow-card hover:shadow-card-hover gap-2 transition-all hover:scale-105"
            >
              <ArrowDownToLine className="w-4 h-4" /> Withdraw
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <Card
              key={s.label}
              className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border/60 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-card">
                  <s.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card border-border/60 rounded-2xl hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="font-heading text-lg">Monthly Earnings</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Performance over the last 8 months</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-heading font-bold text-foreground">
                ₹{monthlyEarnings.reduce((s, d) => s + d.value, 0).toLocaleString()}
              </div>
              <div className="text-xs text-success mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14% YoY
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <OrangeBarChart data={monthlyEarnings} height={240} valuePrefix="₹" />
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/60 rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      t.amount.startsWith("-") ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                    }`}>
                      {t.amount.startsWith("-") ? <ArrowDownToLine className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.desc}</div>
                      <div className="text-xs text-muted-foreground">{t.date} • {t.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${t.amount.startsWith("-") ? "text-destructive" : "text-foreground"}`}>
                      {t.amount}
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorEarnings;
