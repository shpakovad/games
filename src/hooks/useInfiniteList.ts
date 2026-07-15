import { useEffect, useMemo, useRef, useState } from "react";

interface UseInfiniteListParams<T> {
  items: T[];
  pageSize: number;
  resetKey: string;
}

export const useInfiniteList = <T>({ items, pageSize, resetKey }: UseInfiniteListParams<T>) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [pageSize, resetKey]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisibleCount((currentCount) => Math.min(currentCount + pageSize, items.length));
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [hasMore, items.length, pageSize]);

  return {
    hasMore,
    triggerRef,
    visibleItems,
  };
};
