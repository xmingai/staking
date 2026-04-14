"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { MOCK_NODES, LOCK_OPTIONS, formatNumber } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Lock,
  TrendingUp,
  Users,
  Info,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function StakePage() {
  const params = useParams();
  const router = useRouter();
  const nodeId = params.nodeId as string;
  const node = MOCK_NODES.find((n) => n.id === nodeId);

  const [amount, setAmount] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!node) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
        <p className="text-muted-foreground">Node not found.</p>
        <Link href="/nodes">
          <Button variant="outline" className="mt-4 rounded-2xl">
            Back to Nodes
          </Button>
        </Link>
      </div>
    );
  }

  const netAPY = node.baseAPY * (1 - node.commissionRate / 100);
  const parsedAmount = parseFloat(amount) || 0;
  const estimatedReward = parsedAmount * (netAPY / 100);

  const handleStake = () => {
    setConfirmed(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/nodes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Nodes
      </Link>

      {/* Stake Card — Uniswap centered style */}
      <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-xl shadow-black/5">
        {/* Node Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime font-bold text-sm">
            {node.name[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold">{node.name}</h1>
            <p className="text-xs text-muted-foreground font-mono">
              {node.owner}
            </p>
          </div>
          <Badge
            variant="outline"
            className="ml-auto text-xs rounded-lg border-lime/30 text-lime"
          >
            {node.commissionRate}% Commission Fee
          </Badge>
        </div>

        {/* Node Stats Mini */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-muted/30 mb-6">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">TVL</p>
            <p className="text-sm font-semibold font-mono">{formatNumber(node.totalDelegated + node.ownerStaked)}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Delegators</p>
            <p className="text-sm font-semibold font-mono">{node.delegatorCount}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Base APY</p>
            <p className="text-sm font-semibold text-lime font-mono">{node.baseAPY}%</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Amount Input */}
        <div className="mb-6">
          <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 block">
            Stake Amount
          </label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-2xl h-14 text-2xl font-mono font-bold bg-muted/30 border-border/60 pr-20 focus-visible:ring-lime/50"
              disabled={confirmed}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
              DGAI
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Balance: <span className="font-mono text-foreground">125,000.00 DGAI</span>
          </p>
        </div>



        {/* Reward Preview */}
        <div className="p-4 rounded-2xl bg-muted/30 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Your Net APY
            </span>
            <span className="text-lg font-bold text-lime font-mono">{netAPY.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              Est. Reward (Annual)
            </span>
            <span className="text-sm font-semibold font-mono">
              {estimatedReward.toFixed(2)} DGAI
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Commission</span>
            <span className="text-sm font-mono text-muted-foreground">{node.commissionRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Type</span>
            <span className="text-sm font-mono text-muted-foreground">Flexible Staking</span>
          </div>
        </div>

        {/* CTA */}
        {confirmed ? (
          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-lime/10 border border-lime/30">
            <Check className="h-5 w-5 text-lime" />
            <p className="text-sm font-semibold text-lime">
              Staking Confirmed! Redirecting...
            </p>
          </div>
        ) : (
          <Button
            onClick={handleStake}
            disabled={parsedAmount <= 0}
            className="w-full rounded-2xl h-14 text-base font-semibold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_30px_rgba(191,255,0,0.15)] disabled:opacity-40 disabled:shadow-none transition-all"
          >
            Stake {parsedAmount > 0 ? formatNumber(parsedAmount) : ""} DGAI
          </Button>
        )}
      </div>
    </div>
  );
}
