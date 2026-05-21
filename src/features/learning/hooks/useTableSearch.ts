import { useState, useMemo } from "react";

export function useTableSearch<T>(items: T[], fields: (keyof T)[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (searchQuery === "") return items;

    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  }, [items, searchQuery, fields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}