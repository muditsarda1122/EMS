"use client";

import { useEffect } from "react";

export default function AnimateSections() {
  useEffect(() => {
    const sections = document.querySelectorAll("section, article, header");
    
    sections.forEach((section) => {
      section.classList.add("section-animate");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
