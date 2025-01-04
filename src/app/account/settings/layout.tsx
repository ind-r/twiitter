// layout.tsx

import { Providers } from "@/app/auth/callback-register/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
