"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { MOCK_NODES, formatNumber } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  Search,
  Users,
  TrendingUp,
  ChevronRight,
  Server,
  ShieldCheck,
  Coins,
} from "lucide-react";

type SortField = "tvl" | "commission" | "delegators" | "apy";

export default function NodesPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("tvl");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filtered = useMemo(() => {
    let list = MOCK_NODES.filter(
      (n) =>
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.owner.toLowerCase().includes(search.toLowerCase())
    );

    list.sort((a, b) => {
      let va: number, vb: number;
      switch (sortField) {
        case "tvl":
          va = a.totalDelegated + a.ownerStaked;
          vb = b.totalDelegated + b.ownerStaked;
          break;
        case "commission":
          va = a.commissionRate;
          vb = b.commissionRate;
          break;
        case "delegators":
          va = a.delegatorCount;
          vb = b.delegatorCount;
          break;
        case "apy":
          va = a.baseAPY * (1 - a.commissionRate / 100);
          vb = b.baseAPY * (1 - b.commissionRate / 100);
          break;
        default:
          va = 0;
          vb = 0;
      }
      return sortAsc ? va - vb : vb - va;
    });

    return list;
  }, [search, sortField, sortAsc]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Community Nodes</h1>
          <p className="text-sm text-muted-foreground">
            Choose a community node to delegate your DGAI. Lower commission = higher returns.
          </p>
        </div>
        <Link href="/nodes/create">
          <Button className="rounded-2xl px-6 h-10 text-sm font-semibold bg-[#bfff00] text-[#0d0e10] hover:bg-[#bfff00]/90 shadow-[0_0_20px_rgba(191,255,0,0.15)] transition-all shrink-0">
            + Create Node
          </Button>
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl h-10 bg-card border-border/60"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              { field: "tvl" as SortField, label: "TVL" },
              { field: "commission" as SortField, label: "Commission" },
              { field: "apy" as SortField, label: "Net APY" },
              { field: "delegators" as SortField, label: "Delegators" },
            ] as const
          ).map((s) => (
            <button
              key={s.field}
              onClick={() => handleSort(s.field)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortField === s.field
                  ? "bg-lime/15 text-lime"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              <ArrowUpDown className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Node Cards */}
      <div className="grid gap-4">
        {filtered.map((node) => {
          const tvl = node.totalDelegated + node.ownerStaked;
          const netAPY = node.baseAPY * (1 - node.commissionRate / 100);

          return (
            <Link key={node.id} href={`/stake/${node.id}`}>
              <div className="group p-5 rounded-2xl border border-border/60 bg-card/50 hover:bg-card hover:border-lime/20 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Name & Owner */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime/10 text-lime font-bold text-sm">
                      {node.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{node.name}</h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] rounded-lg border-lime/30 text-lime shrink-0"
                        >
                          {node.commissionRate}% Commission Fee
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {node.owner}
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">TVL</p>
                      <p className="text-sm font-semibold font-mono">
                        {formatNumber(tvl)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <Users className="inline h-3 w-3 mr-0.5" />
                        Delegators
                      </p>
                      <p className="text-sm font-semibold font-mono">
                        {node.delegatorCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <Coins className="inline h-3 w-3 mr-0.5" />
                        Total DGAI
                      </p>
                      <p className="text-sm font-semibold font-mono">
                        {node.dgridCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <TrendingUp className="inline h-3 w-3 mr-0.5" />
                        Net APY
                      </p>
                      <p className="text-sm font-bold text-lime font-mono">
                        {netAPY.toFixed(1)}%
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-lime transition-colors hidden sm:block" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
