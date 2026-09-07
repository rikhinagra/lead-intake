import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({
  icon: Icon,
  title,
  action,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-icon-bg">
            <Icon className="h-4 w-4 text-ink-soft" />
          </span>
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
