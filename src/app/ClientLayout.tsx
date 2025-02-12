// app/ClientLayout.tsx
"use client";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { useStorePersist } from "@/hooks/useStorePersist";

function StoreInitializer() {
  useStorePersist();
  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <StoreInitializer />
      {children}
    </ReduxProvider>
  );
}
