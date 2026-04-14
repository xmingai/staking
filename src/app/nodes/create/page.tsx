"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/mock-data";
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  Check,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function CreateNodePage() {
  const router = useRouter();
  const [stakeAmount, setStakeAmount] = useState("500000");
  const [commission, setCommission] = useState([10]);
  const [nodeName, setNodeName] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const parsedStake = parseFloat(stakeAmount) || 0;
  const commissionRate = commission[0];
  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      setCreated(true);
      setTimeout(() => router.push("/nodes/manage"), 2000);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/nodes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Nodes
      </Link>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Create Your Node</h1>
        <p className="text-sm text-muted-foreground">
          Stake a minimum of 500,000 DGAI to launch your community validator node.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
        {/* Node Name */}
        <div className="mb-6">
          <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 block">
            Node Name
          </label>
          <Input
            placeholder="e.g. Neon Validators"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="rounded-2xl h-12 text-base bg-muted/30 border-border/60 focus-visible:ring-lime/50"
            disabled={creating || created}
          />
        </div>

        {/* Self-Stake */}
        <div className="mb-6">
          <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 block">
            <Shield className="inline h-3 w-3 mr-1" />
            Self-Stake Amount
          </label>
          <div className="relative">
            <Input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="rounded-2xl h-14 text-2xl font-mono font-bold bg-muted/30 border-border/60 pr-20 focus-visible:ring-lime/50"
              disabled={creating || created}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
              DGAI
            </span>
          </div>
          {parsedStake < 500000 && parsedStake > 0 && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-2">
              <AlertTriangle className="h-3 w-3" />
              Minimum 500,000 DGAI required
            </p>
          )}
        </div>

        <Separator className="my-6" />

        {/* Commission Rate Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Commission Rate
            </label>
            <span className="text-2xl font-bold text-lime font-mono">
              {commissionRate}%
            </span>
          </div>
          <Slider
            value={commission}
            onValueChange={setCommission}
            max={20}
            min={0}
            step={1}
            className="[&_[role=slider]]:bg-lime [&_[role=slider]]:border-lime [&_[role=slider]]:shadow-[0_0_10px_rgba(191,255,0,0.3)] [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-lime"
            disabled={creating || created}
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-muted-foreground">0% — Attract more delegators</span>
            <span className="text-[10px] text-muted-foreground">20% — Maximum earnings</span>
          </div>
        </div>


        {/* Info block */}
        <div className="p-4 rounded-2xl bg-lime/5 border border-lime/10 mb-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <TrendingUp className="inline h-3 w-3 text-lime mr-1" />
            Commission changes take <strong className="text-foreground">7 days</strong> to take effect.
            During this period, existing delegators can exit without penalty. This protects your
            community and builds trust.
          </p>
        </div>

        {/* CTA */}
        {created ? (
          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-lime/10 border border-lime/30 animate-in fade-in duration-500">
            <Check className="h-5 w-5 text-lime" />
            <p className="text-sm font-semibold text-lime">
              Node Created! Redirecting to management...
            </p>
          </div>
        ) : (
          <Button
            onClick={handleCreate}
            disabled={parsedStake < 500000 || !nodeName.trim() || creating}
            className="w-full rounded-2xl h-14 text-base font-semibold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_30px_rgba(191,255,0,0.15)] disabled:opacity-40 disabled:shadow-none transition-all"
          >
            {creating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-lime-foreground/30 border-t-lime-foreground rounded-full animate-spin" />
                Creating Node...
              </span>
            ) : (
              `Create Node — Stake ${formatNumber(parsedStake)} DGAI`
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
