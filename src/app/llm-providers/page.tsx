"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TrendingUp, Zap, ShieldCheck, Cpu, Unlock, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LLMProvidersPage() {
  const [isStaking, setIsStaking] = useState(false);
  const [hasPosition, setHasPosition] = useState(true); // Mock active position for prototyping

  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
      setHasPosition(true); // Simulate getting a position
      // Simulate success
      alert("Successfully staked and registered as an LLM Provider!");
    }, 2000);
  };

  const handleUnstake = () => {
    setIsUnstaking(true);
    setTimeout(() => {
      setIsUnstaking(false);
      setHasPosition(false); // Simulate removing the position
      alert("Unstake initiated. Your tokens will be available after the 7-day cooldown.");
    }, 2000);
  };

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      alert("Successfully claimed 142.50 DGAI!");
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-20 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-6 border-lime/30 text-lime bg-lime/5 py-1.5 px-4 text-xs font-semibold uppercase tracking-widest rounded-full">
          ONE API, ALL LLMS.
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Become an <span className="text-lime">LLM Provider</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Power the next generation of decentralized AI. Stake DGAI to register your high-performance node as a computational provider for the network.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="#">
            <Button variant="ghost" className="rounded-2xl text-muted-foreground hover:text-foreground">
              Explore LLM Market <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Requirement Card */}
        <div className="rounded-[2.5rem] p-8 border border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-lime/10 blur-[100px] rounded-full pointer-events-none" />
          
          <Tabs defaultValue="stake" className="relative z-10 w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 rounded-xl p-1 h-12">
              <TabsTrigger value="stake" className="rounded-lg h-10 font-bold">1. Stake & Register</TabsTrigger>
              <TabsTrigger value="unstake" className="rounded-lg h-10 font-bold">2. Unstake & Claim</TabsTrigger>
            </TabsList>

            <TabsContent value="stake" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold mb-2">Provider Requirements</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Minimum stake required to join the active LLM Provider set.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col p-5 rounded-2xl bg-muted/30 border border-border/40">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">Minimum Stake</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-bold text-foreground">100,000</span>
                    <span className="text-sm text-muted-foreground font-medium">DGAI</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-5 rounded-2xl bg-lime/10 border border-lime/20 relative overflow-hidden">
                  <span className="text-xs text-lime uppercase font-bold tracking-wider mb-2 relative z-10">Base APY</span>
                  <div className="flex items-baseline gap-1.5 relative z-10">
                    <span className="text-4xl font-mono font-bold text-lime leading-none">12%</span>
                    <span className="text-sm text-lime/80 font-medium pb-1">Yield</span>
                  </div>
                  <div className="absolute -right-2 -bottom-4 text-lime/20 pointer-events-none">
                    <TrendingUp className="w-20 h-20" />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStake}
                disabled={isStaking}
                className="w-full rounded-2xl h-14 text-base font-bold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_30px_rgba(191,255,0,0.2)] transition-all"
              >
                {isStaking ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 rounded-full border-2 border-lime-foreground/30 border-t-lime-foreground" />
                    Approving Stake...
                  </span>
                ) : (
                  "Stake 100,000 DGAI & Register"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4 font-medium">
                Staked tokens can be unstaked at any time, subject to a 7-day cooldown.
              </p>
            </TabsContent>

            <TabsContent value="unstake" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold mb-2">Manage Position</h2>
              <p className="text-sm text-muted-foreground mb-8">
                View your active staked balance and claim your earned DGAI yields.
              </p>

              <div className="flex flex-col p-8 rounded-2xl bg-muted/30 border border-border/40 mb-8 items-center justify-center text-center shadow-inner">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-sm text-muted-foreground font-medium">Your Active Stake</span>
                   <Badge variant="outline" className="text-[10px] border-lime/30 text-lime bg-lime/5 py-0 px-1.5 h-5">12% APY</Badge>
                 </div>
                 <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-4xl font-mono font-bold text-foreground">{hasPosition ? "100,000" : "0.00"}</span>
                   <span className="text-sm font-medium text-muted-foreground">DGAI</span>
                 </div>
                 <span className="text-sm text-lime flex items-center justify-center gap-1 font-medium bg-lime/10 px-3 py-1 rounded-full"><TrendingUp className="w-4 h-4" /> {hasPosition ? "+142.50" : "+0.00"} DGAI Unclaimed</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button 
                   variant="outline" 
                   onClick={handleUnstake}
                   className="w-full rounded-2xl h-14 font-bold border-border/50 hover:bg-muted/50 transition-colors" 
                   disabled={!hasPosition || isUnstaking}
                 >
                   {isUnstaking ? (
                     <span className="flex items-center gap-2">
                       <span className="animate-spin h-4 w-4 rounded-full border-2 border-foreground/30 border-t-foreground" />
                       Unstaking...
                     </span>
                   ) : (
                     "Unstake"
                   )}
                 </Button>
                 <Button 
                   onClick={handleClaim}
                   className={`w-full rounded-2xl h-14 font-bold bg-lime text-lime-foreground ${hasPosition && !isClaiming && !isUnstaking ? 'hover:bg-lime/90' : 'opacity-50 cursor-not-allowed'}`} 
                   disabled={!hasPosition || isClaiming || isUnstaking}
                 >
                   {isClaiming ? (
                     <span className="flex items-center gap-2">
                       <span className="animate-spin h-4 w-4 rounded-full border-2 border-lime-foreground/30 border-t-lime-foreground" />
                       Claiming...
                     </span>
                   ) : (
                     "Claim Yield"
                   )}
                 </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4 font-medium">
                {hasPosition ? (
                  <span className="text-amber-500/90 font-semibold tracking-wide">Note: Unstaking requires a 7-day cooldown period.</span>
                ) : (
                  "You do not have an active Provider position."
                )}
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Benefits List */}
        <div className="flex flex-col gap-6 pt-4 md:pl-6">
          <h3 className="text-xl font-bold mb-2">Provider Benefits</h3>
          
          {[
            {
              icon: Cpu,
              title: "LLM Market Access",
              desc: "Gain the entry ticket to the LLM Market and become an official AI model provider.",
            },
            {
              icon: TrendingUp,
              title: "Exclusive 12% APY",
              desc: "Enjoy up to 12% Annual Percentage Yield, exclusively available for Dgrid network.",
            },
            {
              icon: Unlock,
              title: "Flexible Unstaking",
              desc: "Unstake and redeem your DGAI tokens freely at any time without long-term lockups.",
            },
          ].map((benefit, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-card border border-border/50 text-lime/80 shadow-sm">
                <benefit.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setHasPosition(!hasPosition)}
        className="fixed bottom-6 right-6 z-50 bg-card border border-border px-4 py-2 rounded-full text-xs font-mono font-medium shadow-2xl hover:bg-muted transition-all flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${hasPosition ? 'bg-lime animate-pulse' : 'bg-red-500'}`} />
        Simulate Stake: {hasPosition ? 'Active' : 'Empty'}
      </button>
    </div>
  );
}
