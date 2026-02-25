"use client"

import * as React from "react"

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var resolvedTheme = theme || systemTheme;
              
              if (resolvedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              } else {
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  )
}
