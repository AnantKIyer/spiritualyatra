import { cn } from "@/lib/utils";

interface AdminEntitySplitLayoutProps {
  title: string;
  subtitle: string;
  sidebarCount: React.ReactNode;
  sidebarAction: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminEntitySplitLayout({
  title,
  subtitle,
  sidebarCount,
  sidebarAction,
  sidebar,
  children,
}: AdminEntitySplitLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100dvh-11.5rem)] min-h-0">
      <div className="mb-4 shrink-0">
        <h2 className="font-display text-3xl text-ink-900">{title}</h2>
        <p className="text-ink-600 text-sm mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <aside
          className={cn(
            "w-full lg:w-[30%] shrink-0 flex flex-col min-h-0",
            "bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden",
            "lg:max-h-full",
          )}
        >
          <div className="p-4 border-b border-ink-100 flex items-center justify-between gap-2 shrink-0">
            <div className="text-sm font-medium text-ink-700">{sidebarCount}</div>
            {sidebarAction}
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">{sidebar}</div>
        </aside>

        <main
          className={cn(
            "flex-1 min-w-0 min-h-0 flex flex-col",
            "bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

interface EntityPanelShellProps {
  header: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  scrollBody?: boolean;
}

export function EntityPanelShell({
  header,
  actions,
  footer,
  children,
  scrollBody = false,
}: EntityPanelShellProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-start justify-between gap-4 p-5 border-b border-ink-100 shrink-0">
        <div className="min-w-0 flex-1">{header}</div>
        {actions && <div className="shrink-0 flex gap-2">{actions}</div>}
      </div>

      <div
        className={cn(
          "p-5 flex-1 min-h-0 space-y-4",
          scrollBody && "overflow-y-auto",
        )}
      >
        {children}
      </div>

      {footer && (
        <div className="p-5 border-t border-ink-100 shrink-0 flex flex-wrap gap-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-ink-50">
      <p className="text-ink-500 text-xs">{label}</p>
      <p className="text-ink-900 font-medium text-sm mt-0.5 truncate">{value}</p>
    </div>
  );
}

export function PanelSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink-700 mb-2">{title}</h4>
      {children}
    </div>
  );
}

import Image from "next/image";

export function PanelImage({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="w-full h-36 rounded-xl bg-ink-100 flex items-center justify-center text-ink-400 text-sm">
        No image
      </div>
    );
  }

  return (
    <div className="relative w-full h-36 rounded-xl overflow-hidden shrink-0">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
    </div>
  );
}
