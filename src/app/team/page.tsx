"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Gift, Check, Users } from "lucide-react";

const TEAM_VESTING_DATA = {
  totalAllocation: 100000000,
  monthlyUnlock: 2500000,
  availableToClaim: 5000000,
  locked: 95000000,
  claimed: 0,
};

const VESTING_SCHEDULE = [
  { id: 1, month: "April 2026", amount: 2500000, status: "Claimable", date: "2026-04-01" },
  { id: 2, month: "May 2026", amount: 2500000, status: "Claimable", date: "2026-05-01" },
  { id: 3, month: "June 2026", amount: 2500000, status: "Locked", date: "2026-06-01" },
  { id: 4, month: "July 2026", amount: 2500000, status: "Locked", date: "2026-07-01" },
  { id: 5, month: "August 2026", amount: 2500000, status: "Locked", date: "2026-08-01" },
  { id: 6, month: "September 2026", amount: 2500000, status: "Locked", date: "2026-09-01" },
];

export default function TeamPage() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => setClaimed(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Team Vesting</h1>
          <p className="text-sm text-muted-foreground font-mono">0xA0C1...a875</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          {
            icon: Users,
            label: "Total Allocation",
            value: formatNumber(TEAM_VESTING_DATA.totalAllocation),
            suffix: "DGAI",
          },
          {
            icon: Lock,
            label: "Total Locked",
            value: formatNumber(TEAM_VESTING_DATA.locked),
            suffix: "DGAI",
          },
          {
            icon: Unlock,
            label: "Monthly Unlock",
            value: formatNumber(TEAM_VESTING_DATA.monthlyUnlock),
            suffix: "DGAI",
          },
          /* {
            icon: Gift,
            label: "Available to Claim",
            value: formatNumber(TEAM_VESTING_DATA.availableToClaim),
            suffix: "DGAI",
            highlight: true,
          }, */
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

      {/* Actions layout - Claim Available Tokens */}
      {/* <div className="mb-8">
        <div className="rounded-2xl border border-border/60 bg-card/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4 text-lime" />
              Claimable Team Tokens
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-lime font-mono">
                {formatNumber(TEAM_VESTING_DATA.availableToClaim)}
              </p>
              <p className="text-xs text-muted-foreground font-medium">DGAI</p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Unlocks schedule: {formatNumber(TEAM_VESTING_DATA.monthlyUnlock)} DGAI / Month
            </p>
          </div>
          
          <Button
            onClick={handleClaim}
            disabled={claimed || TEAM_VESTING_DATA.availableToClaim === 0}
            className="rounded-2xl px-8 h-12 text-sm font-semibold bg-lime text-lime-foreground hover:bg-lime/90 shadow-[0_0_20px_rgba(191,255,0,0.15)] disabled:opacity-60 transition-all shrink-0 w-full sm:w-auto"
          >
            {claimed ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Claimed!
              </span>
            ) : (
              "Claim Available"
            )}
          </Button>
        </div>
      </div> */}

      {/* Vesting Schedule */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Vesting Schedule</h2>
        </div>
        <div className="space-y-4">
          {VESTING_SCHEDULE.map((schedule) => (
            <div
              key={schedule.id}
              className={`p-5 rounded-2xl border border-border/60 transition-colors ${
                schedule.status === 'Locked' 
                  ? 'bg-muted/30 opacity-70' 
                  : 'bg-card hover:bg-card/80 hover:border-lime/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                    schedule.status === 'Claimable' 
                      ? 'bg-lime/10 text-lime' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {schedule.status === 'Claimable' ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{schedule.month}</h3>
                      <Badge
                        variant="outline"
                        className={`text-[10px] rounded-lg ${
                          schedule.status === "Claimable"
                            ? "border-lime/30 text-lime"
                            : "border-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        {schedule.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Unlock Date: {schedule.date}
                    </p>
                  </div>
                </div>

                {/* Right: Data & Actions */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
                    <p className={`text-sm font-semibold font-mono ${schedule.status === 'Claimable' ? 'text-lime' : ''}`}>
                      {formatNumber(schedule.amount)}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={schedule.status === "Locked"}
                      className="rounded-xl text-xs h-8 border-border/60 hover:border-lime/30 hover:text-lime"
                      onClick={handleClaim}
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
      </div>
    </div>
  );
}
