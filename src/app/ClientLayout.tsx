"use client";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { useStorePersist } from "@/hooks/useStorePersist";
import { Toaster } from "react-hot-toast";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-sm text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );
}

function StoreInitializer() {
  const { isInitializing } = useStorePersist();

  if (isInitializing) {
    return <LoadingSpinner />;
  }

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
      <Toaster />
    </ReduxProvider>
  );
}
