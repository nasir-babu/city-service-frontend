"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The icon depends on the system-resolved theme, which is only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun aria-hidden="true" />
        ) : (
          <Moon aria-hidden="true" />
        )
      ) : (
        <span aria-hidden="true" className="size-4" />
      )}
    </Button>
  );
}
