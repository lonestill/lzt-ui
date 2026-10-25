"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPagerForPath } from "@/lib/docs-nav";

export function DocsPager() {
  const pathname = usePathname();
  const { prev, next } = getPagerForPath(pathname);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 pt-6 border-t border-[rgb(30,39,37)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-4xl pb-16">
      {prev ? (
        <Button variant="secondary" size="default" asChild className="w-full sm:w-auto justify-start sm:justify-center">
          <Link href={prev.href} className="inline-flex items-center gap-1.5 text-xs">
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{prev.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button variant="primary" size="default" asChild className="w-full sm:w-auto justify-end sm:justify-center sm:ml-auto">
          <Link href={next.href} className="inline-flex items-center gap-1.5 text-xs font-semibold">
            <span className="truncate">{next.title}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
