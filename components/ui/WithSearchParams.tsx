"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

type Get = (key: string) => string | undefined;

/**
 * Reads the page's ?query in the browser, so pages can still be built as
 * plain static files. Before the query is known it renders with none.
 */
export function WithSearchParams({ children }: { children: (get: Get) => ReactNode }) {
  return (
    <Suspense fallback={children(() => undefined)}>
      <Reader>{children}</Reader>
    </Suspense>
  );
}

function Reader({ children }: { children: (get: Get) => ReactNode }) {
  const params = useSearchParams();
  return children((key) => params.get(key) ?? undefined);
}
