import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#bfff00] text-[#0d0e10] font-bold text-xs">
                D
              </div>
              <span className="text-sm font-bold tracking-tight">
                DGAI Staking
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Delegated staking on BSC. Earn rewards by supporting the DGrid
              validator network.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/nodes", label: "Nodes" },
                { href: "/nodes/create", label: "Create Node" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { href: "https://dgrid.ai", label: "DGrid.ai", external: true },
                { href: "#", label: "Documentation" },
                { href: "#", label: "Smart Contracts" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {item.label}
                    {item.external && (
                      <ExternalLink className="h-2.5 w-2.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Community
            </h4>
            <ul className="space-y-2">
              {["Twitter", "Discord", "Telegram"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            © 2026 DGrid AI. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Powered by BSC · Audited by{" "}
            <span className="text-lime font-medium">CertiK</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
