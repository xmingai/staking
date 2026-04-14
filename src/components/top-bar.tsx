"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/nodes", label: "Community Nodes" },
  { href: "/llm-providers", label: "LLM Providers" },
];

export function TopBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Read persisted theme on mount
  useEffect(() => {
    // const saved = localStorage.getItem("dgai-theme");
    // if (saved === "light") setIsDark(false);
  }, []);

  // Apply and persist theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      // localStorage.setItem("dgai-theme", "dark");
    } else {
      root.classList.remove("dark");
      // localStorage.setItem("dgai-theme", "light");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#bfff00] text-[#0d0e10] font-bold text-sm transition-transform group-hover:scale-105">
            D
          </div>
          <span className="text-lg font-bold tracking-tight">
            DGAI <span className="text-muted-foreground font-normal">Staking</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-lime/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Dashboard / Balance */}
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3 h-9 rounded-xl hover:bg-muted/50 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bfff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bfff00]"></span>
            </span>
            <span className="font-mono tabular-nums font-bold text-foreground">203,456.00</span>
            <span className="text-xs">DGAI</span>
          </Link>

          {/* Theme Toggle - Commented out for now to enforce Dark Mode */}
          {/* <button
            onClick={() => setIsDark(!isDark)}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button> */}

          <Button
            onClick={() => setConnected(!connected)}
            className={`hidden md:flex rounded-2xl px-5 h-10 text-sm font-semibold transition-all cursor-pointer ${
              connected
                ? "bg-secondary text-foreground hover:bg-secondary/80"
                : "bg-[#bfff00] text-[#0d0e10] hover:bg-[#bfff00]/90 shadow-[0_0_20px_rgba(191,255,0,0.15)]"
            }`}
          >
            <Wallet className="h-4 w-4 mr-2" />
            {connected ? "0xA0C1...a875" : "Connect Wallet"}
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-background px-4 pb-4 pt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-lime/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 items-center justify-center gap-1.5 px-4 rounded-xl bg-muted/50 hover:bg-muted/80 text-sm font-medium text-muted-foreground transition-colors"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bfff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bfff00]"></span>
              </span>
              <span className="font-mono tabular-nums font-bold text-foreground">203,456.00</span>
              <span className="text-xs">DGAI</span>
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <Button
              onClick={() => setConnected(!connected)}
              className={`flex-1 rounded-2xl h-11 text-sm font-semibold ${
                connected
                  ? "bg-secondary text-foreground"
                  : "bg-[#bfff00] text-[#0d0e10]"
              }`}
            >
              <Wallet className="h-4 w-4 mr-2" />
              {connected ? "0xA0C1...a875" : "Connect Wallet"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
