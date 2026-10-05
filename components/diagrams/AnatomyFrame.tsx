"use client";
// Fig. 3 desktop enhancement: aligns each annotation with its marker on the specimen and draws a thin
// leader line between them. Without JavaScript, or below the desktop width, the annotations are a plain
// numbered list under the specimen.
import { useEffect, useRef, type ReactNode } from "react";

export default function AnatomyFrame({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const svg = el.querySelector<SVGSVGElement>(".anat-lines");
    const list = el.querySelector<HTMLOListElement>(".anat-notes");
    if (!svg || !list) return;
    const wide = () => getComputedStyle(svg).display !== "none";

    const layout = () => {
      const items = Array.from(list.querySelectorAll<HTMLLIElement>("li"));
      if (!wide()) {
        el.removeAttribute("data-aligned");
        list.style.height = "";
        items.forEach((li) => (li.style.top = ""));
        svg.replaceChildren();
        return;
      }
      const lr = list.getBoundingClientRect();
      let cursor = 0;
      el.setAttribute("data-aligned", "true");
      // Place each note at its marker's height, pushed down to clear the previous note.
      for (const li of items) {
        const mk = el.querySelector<HTMLElement>(`.sp-mk[data-mk="${li.dataset.n}"]`);
        if (!mk) continue;
        const m = mk.getBoundingClientRect();
        const top = Math.max(m.top + m.height / 2 - lr.top - 11, cursor);
        li.style.top = `${top}px`;
        cursor = top + li.offsetHeight + 10;
      }
      list.style.height = `${Math.max(cursor - 10, 0)}px`;
      // The notes have moved, so measure markers and numbers afterwards to draw the lines.
      const f = el.getBoundingClientRect();
      svg.innerHTML = items
        .map((li) => {
          const mk = el.querySelector<HTMLElement>(`.sp-mk[data-mk="${li.dataset.n}"]`);
          const num = li.querySelector<HTMLElement>(".anat-n");
          if (!mk || !num) return "";
          const m = mk.getBoundingClientRect();
          const r = num.getBoundingClientRect();
          return `<path d="M${m.right - f.left + 2},${m.top + m.height / 2 - f.top} L${r.left - f.left - 6},${r.top + r.height / 2 - f.top}" />`;
        })
        .join("");
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    document.fonts?.ready.then(layout);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="anat-frame" ref={frame}>
      {children}
      <svg className="anat-lines" aria-hidden="true" focusable="false" />
    </div>
  );
}
