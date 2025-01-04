import "./globals.css";
import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ThemeProvider from "./themeProvider";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Twiitter",
  description: "Made by Inderpreet インダー with love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
