"use client";

import { useState } from "react";
import {
  MOCK_POSITIONS,
  MOCK_DASHBOARD,
  formatNumber,
  shortenAddress,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Wallet,
  TrendingUp,
  Clock,
  Layers,
  Gift,
  ArrowDownToLine,
  RotateCcw,
  Users,
  Settings,
  AlertTriangle,
  Check,
  Copy,
  Unlock,
} from "lucide-react";

// --- Node Mock Data ---
const MY_NODE = {
  name: "DGrid Genesis",
  owner: "0xA0C1B2C3D4E5F6789012345678901234567a875",
  ownerStaked: 500_000,
  totalDelegated: 4_250_000,
  delegatorCount: 342,
  commissionRate: 10,
  baseAPY: 12,
  pendingCommissionReward: 51_000,
  createdAt: "2026-01-15",
};

const DELEGATOR_LIST = [
  { address: "0x1234...5678", amount: 120000, since: "2026-02-01", lockDays: 365 },
  { address: "0xABCD...EF01", amount: 85000, since: "2026-02-15", lockDays: 180 },
  { address: "0x9876...5432", amount: 72000, since: "2026-03-01", lockDays: 90 },
  { address: "0xFEDC...BA98", amount: 65000, since: "2026-03-10", lockDays: 365 },
  { address: "0x5555...AAAA", amount: 55000, since: "2026-03-20", lockDays: 180 },
  { address: "0x7777...BBBB", amount: 48000, since: "2026-03-25", lockDays: 30 },
  { address: "0x3333...CCCC", amount: 42000, since: "2026-04-01", lockDays: 90 },
  { address: "0x8888...DDDD", amount: 38000, since: "2026-04-05", lockDays: 180 },
];

const TVL_HISTORY = [
  { month: "Jan", tvl: 800000 },
  { month: "Feb", tvl: 1500000 },
  { month: "Mar", tvl: 2800000 },
  { month: "Apr", tvl: 4750000 },
];

export default function DashboardPage() {
  const stats = MOCK_DASHBOARD;
  
  // Node state
  const [newCommission, setNewCommission] = useState([MY_NODE.commissionRate]);
  const [showConfirmCommission, setShowConfirmCommission] = useState(false);
  const [commissionSaved, setCommissionSaved] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [positionFilter, setPositionFilter] = useState("all");

  const commissionChanged = newCommission[0] !== MY_NODE.commissionRate;
  const maxTvl = Math.max(...TVL_HISTORY.map((d) => d.tvl));

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCommission = () => {
    setCommissionSaved(true);
    setShowConfirmCommission(false);
    setTimeout(() => setCommissionSaved(false), 3000);
  };

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => setClaimed(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-sm text-muted-foreground font-mono">0xA0C1...a875</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 p-1 h-auto rounded-xl bg-muted/50 border border-border/60 inline-flex">
          <TabsTrigger 
            value="overview"
            className="rounded-lg px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="node"
            className="rounded-lg px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
          >
            My Community Node
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0 animate-in fade-in duration-300">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: Wallet,
                label: "My Balance",
                value: "203,456.00",
                suffix: "DGAI",
              },
              {
                icon: ArrowDownToLine,
                label: "Total Staked",
                value: formatNumber(stats.totalStaked),
                suffix: "DGAI",
              },
              {
                icon: Gift,
                label: "Total Earned",
                value: formatNumber(stats.totalEarned),
                suffix: "DGAI",
                highlight: true,
              },
              {
                icon: Layers,
                label: "Active Positions",
                value: stats.activePositions.toString(),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="p-5 rounded-2xl border border-border/60 bg-card/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime/10 text-lime">
                    <s.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
                <p className={`text-xl font-bold font-mono ${s.highlight ? "text-lime" : ""}`}>
                  {s.value}
                  {s.suffix && (
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      {s.suffix}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Positions */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Staking Positions</h2>
            <div className="flex bg-muted/50 p-1 rounded-lg">
              {[
                { id: "all", label: "All" },
                { id: "active", label: "Active" },
                { id: "cooling", label: "Cooling Down" },
                { id: "inactive", label: "Closed" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPositionFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    positionFilter === f.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_POSITIONS.filter(pos => positionFilter === "all" ? true : pos.status === positionFilter).map((pos) => (
              <div
                key={pos.id}
                className={`p-5 rounded-2xl border border-border/60 bg-card/50 transition-colors ${pos.status === 'inactive' ? 'opacity-50 grayscale' : 'hover:bg-card'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime font-bold text-sm shrink-0">
                      {pos.nodeName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{pos.nodeName}</h3>
                        <Badge
                          variant="outline"
                          className={`text-[10px] rounded-lg ${
                            pos.status === "active"
                              ? "border-lime/30 text-lime"
                              : pos.status === "cooling"
                              ? "border-yellow-500/30 text-yellow-500"
                              : pos.status === "inactive"
                              ? "border-muted-foreground/30 text-muted-foreground"
                              : "border-blue-500/30 text-blue-500"
                          }`}
                        >
                          {pos.status === "active"
                            ? "Active"
                            : pos.status === "cooling"
                            ? "Cooling Down"
                            : pos.status === "inactive"
                            ? "Closed"
                            : "Claimable"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Flexible Staking · Unstake at any time
                      </p>
                    </div>
                  </div>

                  {/* Right: Data & Actions */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">Staked</p>
                      <p className="text-sm font-semibold font-mono">
                        {formatNumber(pos.amount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">Earned</p>
                      <p className="text-sm font-semibold text-lime font-mono">
                        +{formatNumber(pos.earned)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">APY</p>
                      <p className="text-sm font-bold text-lime font-mono">
                        {pos.effectiveAPY.toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={pos.status === "cooling" || pos.status === "inactive"}
                            className="rounded-xl text-xs h-8 border-border/60 hover:border-lime/30 hover:text-lime"
                          >
                            <Unlock className="h-3 w-3 mr-1" />
                            Unstake
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl">Unstake from {pos.nodeName}</DialogTitle>
                          </DialogHeader>
                          <div className="py-2">
                            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 block">
                              Unstake Amount
                            </label>
                            <div className="relative mb-3">
                              <input
                                type="number"
                                placeholder="0.00"
                                className="w-full rounded-2xl h-14 text-2xl font-mono font-bold bg-muted/30 border border-border/60 pl-4 pr-20 focus-visible:outline-none focus-visible:border-lime/50 transition-colors"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                                DGAI
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <p>Available: <span className="font-mono text-foreground">{formatNumber(pos.amount)}</span></p>
                              <button className="text-lime hover:underline font-medium">Max</button>
                            </div>
                          </div>
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3 text-amber-500 text-sm mt-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <p className="leading-tight">Unstaking requires a mandatory 7-day cooldown period before withdrawal.</p>
                          </div>
                          <Button className="w-full rounded-2xl h-14 mt-4 text-base font-bold bg-lime text-lime-foreground hover:bg-lime/90 transition-all shadow-[0_0_20px_rgba(191,255,0,0.15)]">
                            Confirm Unstake
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={pos.status === "cooling" || pos.status === "inactive"}
                        className="rounded-xl text-xs h-8 border-border/60 hover:border-lime/30 hover:text-lime"
                      >
                        <Gift className="h-3 w-3 mr-1" />
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="node" className="focus-visible:outline-none focus-visible:ring-0 animate-in fade-in zoom-in-95 duration-300">
          <div>
            {/* Node Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/10 text-lime font-bold text-lg">
                  {MY_NODE.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">{MY_NODE.name}</h2>
                    <Badge className="bg-lime/15 text-lime border-0 text-xs">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Since {MY_NODE.createdAt}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl text-sm border-border/60 hover:border-lime/30 hover:text-lime gap-2"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Invite Link"}
              </Button>
            </div>

            {/* Node Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: TrendingUp,
                  label: "Total TVL",
                  value: formatNumber(MY_NODE.totalDelegated + MY_NODE.ownerStaked),
                  suffix: "DGAI",
                },
                {
                  icon: Users,
                  label: "Delegators",
                  value: MY_NODE.delegatorCount.toLocaleString(),
                },
                {
                  icon: Settings,
                  label: "Commission",
                  value: MY_NODE.commissionRate + "%",
                },
                {
                  icon: Gift,
                  label: "Pending Rewards",
                  value: formatNumber(MY_NODE.pendingCommissionReward),
                  suffix: "DGAI",
                  highlight: true,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl border border-border/60 bg-card/50 hover:bg-card transition-colors relative group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime/10 text-lime">
                      <s.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                  <p className={`text-xl font-bold font-mono ${s.highlight ? "text-lime" : ""}`}>
                    {s.value}
                    {s.suffix && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        {s.suffix}
                      </span>
                    )}
                  </p>
                  
                  {s.label === "Commission" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="absolute top-4 right-4 h-7 px-3 text-[10px] uppercase font-bold text-lime bg-lime/10 hover:bg-lime/20 hover:text-lime tracking-wider rounded-lg border-0 transition-opacity">
                          Adjust
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] border-border/60 bg-background/95 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl">
                        <DialogHeader className="mb-4">
                          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <Settings className="h-5 w-5 text-lime" />
                            Adjust Commission Rate
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-muted-foreground">
                              Current: <span className="text-foreground font-semibold">{MY_NODE.commissionRate}%</span>
                            </span>
                            <span className="text-3xl font-bold text-lime font-mono">{newCommission[0]}%</span>
                          </div>
                          <Slider
                            value={newCommission}
                            onValueChange={(v) => {
                              setNewCommission(v);
                              setCommissionSaved(false);
                            }}
                            max={20}
                            min={0}
                            step={1}
                            className="mb-3 [&_[role=slider]]:bg-lime [&_[role=slider]]:border-lime [&_[role=slider]]:shadow-[0_0_10px_rgba(191,255,0,0.3)]"
                          />
                          <div className="flex justify-between mb-6">
                            <span className="text-[10px] text-muted-foreground font-mono">0%</span>
                            <span className="text-[10px] text-muted-foreground font-mono">20%</span>
                          </div>

                          {commissionChanged && !commissionSaved && (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-semibold text-yellow-500 mb-1">7-Day Timelock</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                  Changes take 7 days to activate. Delegators can exit without penalty during this window.
                                </p>
                              </div>
                            </div>
                          )}

                          {commissionSaved ? (
                            <div className="flex items-center justify-center gap-2 text-lime text-sm font-medium animate-in fade-in duration-300 h-12 bg-lime/10 rounded-2xl w-full">
                              <Check className="h-4 w-4" />
                              Update queued — effective in 7 days
                            </div>
                          ) : (
                            commissionChanged && (
                              <Button
                                onClick={handleSaveCommission}
                                className="w-full rounded-2xl h-12 text-sm font-bold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_20px_rgba(191,255,0,0.15)] transition-all"
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Schedule Change to {newCommission[0]}%
                              </Button>
                            )
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </div>

            {/* Actions layout - Claim Rewards Only */}
            <div className="mb-8">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Gift className="h-4 w-4 text-lime" />
                    Commission Rewards
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-lime font-mono">
                      {formatNumber(MY_NODE.pendingCommissionReward)}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">DGAI</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Rewards from {MY_NODE.delegatorCount} delegators × {MY_NODE.commissionRate}% commission
                  </p>
                </div>
                
                <Button
                  onClick={handleClaim}
                  disabled={claimed}
                  className="rounded-2xl px-8 h-12 text-sm font-semibold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_20px_rgba(191,255,0,0.15)] disabled:opacity-60 transition-all shrink-0 w-full sm:w-auto"
                >
                  {claimed ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Claimed!
                    </span>
                  ) : (
                    "Claim"
                  )}
                </Button>
              </div>
            </div>

            {/* Delegator Table */}
            <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-lime" />
                  Top Delegators
                </h3>
                <span className="text-xs text-muted-foreground">
                  {DELEGATOR_LIST.length} of {MY_NODE.delegatorCount} shown
                </span>
              </div>
              <div className="space-y-2">
                {DELEGATOR_LIST.map((d, i) => (
                  <div
                    key={d.address}
                    className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono w-5">
                        #{i + 1}
                      </span>
                      <span className="text-sm font-mono group-hover:text-lime transition-colors">
                        {d.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-0.5">Staked</p>
                        <p className="text-sm font-semibold font-mono">{formatNumber(d.amount)}</p>
                      </div>
                      <div className="text-right min-w-[66px]">
                        <p className="text-xs text-muted-foreground mb-0.5">Lock</p>
                        <p className="text-sm font-mono">{d.lockDays}d</p>
                      </div>
                      <div className="text-right min-w-[76px]">
                        <p className="text-xs text-muted-foreground mb-0.5">Since</p>
                        <p className="text-xs font-mono text-muted-foreground">{d.since}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
