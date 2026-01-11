// providers
import { AdminAuthProvider } from "@/hooks/auth/useAdminAuth";
import { ScreenInfoProvider } from "@/hooks/useScreenInfo";

// components
import { Toaster } from "@/components/ui/toaster";

// types
import { type Children } from "@/common/types/reactTypes";

export default function AdminPanelLayout({ children }: { children: Children }) {
  return (
    <>
      <ScreenInfoProvider>
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </ScreenInfoProvider>
      <Toaster />
    </>
  );
}
