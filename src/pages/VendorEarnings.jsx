import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Wallet, label: "Available balance", value: "₹42,300", hint: "Ready to withdraw" },
  { icon: DollarSign, label: "This month", value: "₹1,24,500", hint: "+8% vs last month" },
  { icon: TrendingUp, label: "Lifetime earnings", value: "₹8,42,900", hint: "Since Jan 2025" },
];

// Mock daily earnings for the last 14 days
const chart = [42, 55, 38, 60, 72, 51, 68, 80, 65, 88, 92, 76, 95, 110];
const max = Math.max(...chart);

const transactions = [
  { id: "TXN-2841", date: "Apr 18, 2026", desc: "Subscription payouts", amount: "+₹12,400", status: "Completed" },
  { id: "TXN-2832", date: "Apr 15, 2026", desc: "Daily orders settlement", amount: "+₹8,900", status: "Completed" },
  { id: "TXN-2820", date: "Apr 12, 2026", desc: "Bank withdrawal", amount: "-₹25,000", status: "Processed" },
  { id: "TXN-2811", date: "Apr 09, 2026", desc: "Subscription payouts", amount: "+₹14,200", status: "Completed" },
  { id: "TXN-2799", date: "Apr 05, 2026", desc: "Bonus credit", amount: "+₹1,500", status: "Completed" },
];

const VendorEarnings = () => {
  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Earnings</h1>
            <p className="text-sm text-muted-foreground mt-1">Track payouts, settlements and revenue trends.</p>
          </div>
          <Button className="rounded-xl gradient-orange text-primary-foreground shadow-card hover:shadow-card-hover gap-2">
            <ArrowDownToLine className="w-4 h-4" /> Withdraw funds
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-card border-border/60 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card border-border/60 rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Last 14 days revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {chart.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-[hsl(28_100%_60%)] hover:opacity-80 transition-all relative"
                    style={{ height: `${(v / max) * 100}%` }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-foreground bg-card border border-border rounded-md px-1.5 py-0.5 whitespace-nowrap shadow-sm">
                      ₹{v}00
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">D{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/60 rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">ID</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Description</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-3 px-2 text-muted-foreground font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-2 text-muted-foreground font-mono text-xs">{t.id}</td>
                      <td className="py-3 px-2 text-foreground">{t.date}</td>
                      <td className="py-3 px-2 text-foreground">{t.desc}</td>
                      <td className="py-3 px-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">{t.status}</span>
                      </td>
                      <td className={`py-3 px-2 text-right font-semibold ${t.amount.startsWith("-") ? "text-destructive" : "text-foreground"}`}>
                        {t.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorEarnings;
