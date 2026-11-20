import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { menuVariant } from "../../animations/variants";
import type { MenuItem } from "../../utils/menus";

interface Position {
  right: number;
  top?: number;
  bottom?: number;
}

interface ActionMenuProps<K extends string> {
  label: string; // accessible name, e.g. "Actions for Greenfield Academy"
  items: MenuItem<K>[];
  onSelect: (key: K) => void;
  variant?: "bordered" | "plain";
}

export default function ActionMenu<K extends string>({ label, items, onSelect, variant = "plain" }: ActionMenuProps<K>) {
  const [pos, setPos] = useState<Position | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const open = pos !== null;

  const close = () => setPos(null);

  const toggle = () => {
    if (open) return close();
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const flip = window.innerHeight - r.bottom < 320;
    setPos({
      right: window.innerWidth - r.right,
      ...(flip ? { bottom: window.innerHeight - r.top + 8 } : { top: r.bottom + 8 }),
    });
  };

  // Fixed + portal so a table's horizontal scroll container can never clip the menu.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setPos(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPos(null);
        btnRef.current?.focus();
      }
    };
    const onScrollOrResize = () => setPos(null);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const buttons = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? i + 1 : i - 1;
    buttons[(next + buttons.length) % buttons.length]?.focus();
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={toggle}
        className={cn(
          "flex-center rounded-xl text-text-muted transition-colors hover:bg-sa-gray-soft hover:text-text-primary",
          variant === "bordered" ? "h-11 w-11 border border-border-line03" : "h-10 w-10"
        )}
      >
        <MoreHorizontal size={18} />
      </button>

      {createPortal(
        <AnimatePresence>
          {pos && (
            <motion.div
              ref={menuRef}
              role="menu"
              variants={menuVariant}
              initial="hidden"
              animate="show"
              exit="exit"
              onKeyDown={onMenuKey}
              style={{ position: "fixed", ...pos, transformOrigin: pos.top !== undefined ? "top right" : "bottom right" }}
              className="sa-menu-shadow z-[70] w-60 rounded-2xl border border-border-line02 bg-white p-2"
            >
              {items.map(({ key, label: text, icon: Icon, danger }) => (
                <button
                  key={key}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    close();
                    onSelect(key);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm outline-none transition-colors",
                    danger
                      ? "text-sa-red-text hover:bg-sa-red-soft focus:bg-sa-red-soft"
                      : "text-text-nav hover:bg-sa-row-hover focus:bg-sa-row-hover"
                  )}
                >
                  <Icon size={16} aria-hidden /> {text}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}