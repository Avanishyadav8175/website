"use client";

// constants
import { GOOGLE_CLIENT_ID } from "@/common/constants/environmentVariables";

// hooks
import { CustomerAuthProvider } from "@/hooks/auth/useCustomerAuth";
import { CartProvider } from "@/hooks/useCart";
import { CustomerProfileProvider } from "@/hooks/useCustomerProfile";
import { LocationProvider } from "@/hooks/useLocation/useLocation";
import { SearchProvider } from "@/hooks/useSearch/useSearch";
import { SettingProvider } from "@/hooks/useSetting/useSetting";
import { GoogleOAuthProvider } from "@react-oauth/google";

// components

// types
import { type ReactNode } from "react";

export default function ContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // If Google Client ID is missing, render without GoogleOAuthProvider
  if (!GOOGLE_CLIENT_ID) {
    console.warn('Google OAuth disabled: NEXT_PUBLIC_GOOGLE_CLIENT_ID not found');
    return (
      <SettingProvider>
        <CustomerAuthProvider>
          <CustomerProfileProvider>
            <LocationProvider>
              <SearchProvider>
                <CartProvider>{children}</CartProvider>
              </SearchProvider>
            </LocationProvider>
          </CustomerProfileProvider>
        </CustomerAuthProvider>
      </SettingProvider>
    );
  }

  return (
    <SettingProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <CustomerAuthProvider>
          <CustomerProfileProvider>
            <LocationProvider>
              <SearchProvider>
                <CartProvider>{children}</CartProvider>
              </SearchProvider>
            </LocationProvider>
          </CustomerProfileProvider>
        </CustomerAuthProvider>
      </GoogleOAuthProvider>
    </SettingProvider>
  );
}
