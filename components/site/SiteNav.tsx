"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";
import ButtonLink from "@/components/ui/ButtonLink";
import type { NavItem, RepoCta } from "@/content/site.config";

type Props = { items: NavItem[]; cta: RepoCta };

export default function SiteNav({ items, cta }: Props) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Esc to close, focus trap, scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const focusables = () =>
      Array.from(
        [
          menuBtnRef.current,
          ...(sheet ? sheet.querySelectorAll<HTMLElement>("a[href]") : []),
        ].filter(Boolean) as HTMLElement[],
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    sheet?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-nav" data-scrolled={scrolled || open}>
      <nav className="wrap nav-inner" aria-label="Main navigation">
        <Wordmark />

        <div className="nav-links">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={cta.href} variant="secondary" size="sm" external={cta.external}>
            {cta.label}
          </ButtonLink>
        </div>

        <div className="nav-end">
          <ButtonLink href={cta.href} variant="secondary" size="sm" external={cta.external}>
            {cta.label}
          </ButtonLink>
          <button
            ref={menuBtnRef}
            type="button"
            className="btn btn-secondary btn-sm menu-btn"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="nav-sheet" ref={sheetRef} className="nav-sheet">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
