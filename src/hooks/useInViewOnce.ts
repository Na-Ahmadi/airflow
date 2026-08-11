"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(margin: `${number}px` = "-100px") {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}
