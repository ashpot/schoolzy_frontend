import { Search } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { initials2 } from "@/usersDashboard/super-admin/features/subscriptions/utils/format";
import { schoolTileClass } from "@/usersDashboard/super-admin/features/subscriptions/utils/tones";
import type { Conversation } from "../../types";
import { shortAgo } from "../../utils/format";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
}

export default function ConversationList({ conversations, activeId, onSelect, search, onSearch }: ConversationListProps) {
  return (
    <section className="flex h-[640px] flex-col overflow-hidden rounded-3xl border border-border-line02 bg-white" aria-label="Conversations">
      <div className="p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            autoComplete="off"
            className="w-full rounded-xl border border-border-line02 bg-bg-input py-2.5 pl-10 pr-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {conversations.length === 0 && <li className="px-6 py-10 text-center text-sm text-text-muted">No conversations found.</li>}
        {conversations.map((c) => {
          const last = c.messages[c.messages.length - 1];
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-current={c.id === activeId}
                onClick={() => onSelect(c.id)}
                className={cn("flex w-full items-center gap-3 border-t border-border-line02 px-4 py-4 text-left transition-colors hover:bg-sa-row-hover", c.id === activeId && "bg-sa-blue-soft")}
              >
                <span className="relative shrink-0">
                  <span className={cn("flex-center h-12 w-12 rounded-xl text-sm font-semibold", schoolTileClass(c.school))}>{initials2(c.school)}</span>
                  {c.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-sa-green-icon" aria-label="Online" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-text-primary">{c.school}</span>
                    <span className="shrink-0 text-xs text-text-muted">{last ? shortAgo(last.at) : ""}</span>
                  </span>
                  <span className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-text-secondary">{last?.text}</span>
                    {c.unread > 0 && (
                      <span className="flex-center h-5 min-w-5 shrink-0 rounded-full bg-brand-primary px-1.5 text-[11px] font-semibold text-white">{c.unread}</span>
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}