import * as React from "react"

import { useTheme } from "next-themes"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
  
    return (
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      </button>
    )
  }