import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InsightCard({
  tone = "brand",
  icon,
  kicker,
  children,
}: {
  tone?: "brand" | "alert" | "ok";
  icon: ReactNode;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={cn(
        "insight-premium flex gap-4 px-5 py-5 sm:px-7 sm:py-6",
        tone === "alert" && "is-alert",
        tone === "ok" && "is-ok",
      )}
    >
      <div
        className={cn(
          "mt-0.5 grid size-11 shrink-0 place-items-center rounded-md",
          tone === "alert" && "bg-coral/10 text-coral",
          tone === "ok" && "bg-mint/10 text-mint",
          tone === "brand" && "bg-rose/10 text-rose",
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {kicker}
        </p>
        <div className="mt-1.5 font-display text-[1.15rem] leading-snug font-semibold text-ink sm:text-[1.35rem]">
          {children}
        </div>
      </div>
    </aside>
  );
}
