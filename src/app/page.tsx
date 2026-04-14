"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/animated-number";
import { MOCK_NODES } from "@/lib/mock-data";
import { ArrowRight, Shield, Clock, Users, Zap } from "lucide-react";

export default function HomePage() {
  const totalTVL = MOCK_NODES.reduce(
    (sum, n) => sum + n.totalDelegated + n.ownerStaked,
    0
  );
  const totalDelegators = MOCK_NODES.reduce(
    (sum, n) => sum + n.delegatorCount,
    0
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/10 text-lime text-xs font-semibold tracking-wide mb-8 animate-fade-in-up">
            <Zap className="h-3.5 w-3.5" />
            LIVE ON BSC — UP TO 24% APY
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up delay-75">
            Stake DGAI.
            <br />
            <span className="text-lime">Share Yields.</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-in-up delay-150">
            Delegate to community validator nodes or run your own. Enjoy flexible rewards and unstake freely at any time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-225">
            <Link href="/nodes">
              <Button className="rounded-2xl px-8 h-12 text-base font-semibold bg-[#bfff00] text-[#0d0e10] hover:bg-[#bfff00]/90 shadow-[0_0_30px_rgba(191,255,0,0.2)] transition-all hover:shadow-[0_0_40px_rgba(191,255,0,0.3)] animate-neon-pulse cursor-pointer">
                Start Staking
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="rounded-2xl px-8 h-12 text-base font-semibold border-border/60 hover:bg-muted/50 cursor-pointer"
              >
                My Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar — animated counters */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                Total Value Locked
              </p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                <AnimatedNumber
                  value={totalTVL / 1_000_000}
                  decimals={2}
                  suffix="M"
                />
                <span className="text-sm text-muted-foreground font-normal ml-1.5">
                  DGAI
                </span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                Active Nodes
              </p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                <AnimatedNumber
                  value={MOCK_NODES.filter((n) => n.isActive).length}
                />
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                Total Delegators
              </p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                <AnimatedNumber value={totalDelegators} />
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                Base APY
              </p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-lime">
                <AnimatedNumber value={12} suffix="%" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "Choose a Node",
              description:
                "Browse community validator nodes. Compare commission rates, TVL, and delegator counts to find your best fit.",
            },
            {
              icon: Clock,
              title: "Lock & Multiply",
              description:
                "Select your lock period — from 30 days (1×) to 1 year (2×). Longer commitment means higher rewards.",
            },
            {
              icon: Shield,
              title: "Earn & Claim",
              description:
                "Rewards accrue in real-time. Claim anytime or restake to compound. 7-day cooldown protects the ecosystem.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-2xl border border-border/60 bg-card/50 hover:bg-card hover:border-lime/20 transition-all duration-300 animate-fade-in-up delay-${
                (i + 1) * 75
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime mb-5 group-hover:bg-lime/20 transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-lime/20 bg-gradient-to-r from-lime/5 to-transparent p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Ready to run your own node?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Stake 500,000+ DGAI and earn commission from every delegator.
                Set your own rates and build your community.
              </p>
            </div>
            <Link href="/nodes/create">
              <Button className="rounded-2xl px-8 h-12 text-sm font-semibold bg-[#bfff00] text-[#0d0e10] hover:bg-[#bfff00]/90 shadow-[0_0_25px_rgba(191,255,0,0.15)] shrink-0 cursor-pointer">
                Create a Node
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
