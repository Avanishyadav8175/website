/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useState } from "react";
import { SIDEBAR_SECTIONS } from "@/common/routes/admin/sidebarSections";
import getAuthRequest from "@/common/utils/api/getAuthRequest";
import { useToast } from "@/components/ui/use-toast";
import { type AdminDocument } from "@/common/types/documentation/users/admin";
import { type AdminPanelSection } from "@/common/types/layouts/admin/adminPanelLayout";
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";
import { type Children } from "@/common/types/reactTypes";
import { ADMIN_AUTH_ROUTE } from "@/common/routes/admin/apiLinks";

const { login, validate, logout } = getAuthRequest<AdminDocument>(ADMIN_AUTH_ROUTE);

type AdminAuth = {
  status: "initial" | "idle" | "pending";
  data: {
    isAuthenticated: boolean;
    userName?: string;
    isSuperAdmin?: boolean;
    permission?: AdminRolePermissionDocument;
    authorizedSections?: AdminPanelSection[];
  };
  method: {
    login: (credentials: Partial<AdminDocument>) => void;
    validate: () => void;
    logout: () => void;
  };
};

const AdminAuth = createContext<AdminAuth | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: Children }) {
  const { toast } = useToast();
  const [status, setStatus] = useState<"initial" | "idle" | "pending">("initial");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<undefined | string>(undefined);
  const [isSuperAdmin, setIsSuperAdmin] = useState<true>(true);
  const [permission, setPermission] = useState<undefined | AdminRolePermissionDocument>(undefined);

  const authorizedSections = SIDEBAR_SECTIONS;

  // handlers
  const handleLogin = (credentials: Partial<AdminDocument>) => {
    credentials.status === "active";

    setStatus("pending");

    login(
      {
        select: ["status", "userName", "isSuperAdmin", "role"],
        populate: [{ path: "role", select: ["permission"], strict: false }]
      },
      credentials
    )
      .then(({ data }) => {
        if (data) {
          setUserName(data?.userName);
          setIsSuperAdmin(true);
          setPermission((data?.role as AdminRoleDocument)?.permission);

          setIsAuthenticated(true);

          toast({
            title: "Login Successful",
            description: `Welcome, ${data?.userName}`,
            variant: "success"
          });
        } else {
          toast({
            title: "Invalid Credentials",
            description: "Username or Password are incorrect",
            variant: "destructive"
          });
        }
      })
      .catch((error) => {
        console.error(error);

        toast({
          title: "Invalid Credentials",
          description: "Username or Password are incorrect",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleValidate = () => {
    validate({
      select: ["status", "userName", "isSuperAdmin", "role"],
      populate: [{ path: "role", select: ["permission"], strict: false }]
    })
      .then(({ data }) => {
        setUserName(data?.userName);
        setIsSuperAdmin(true);
        setPermission((data?.role as AdminRoleDocument)?.permission);

        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleLogout = () => {
    logout().then(() => {
      setIsAuthenticated(false);

      setUserName(undefined);
      setIsSuperAdmin(true);
      setPermission(undefined);

      toast({
        title: "Logged out",
        variant: "success"
      });
    });
  };

  return (
    <AdminAuth.Provider
      value={{
        status,
        data: {
          isAuthenticated,
          userName,
          isSuperAdmin,
          permission,
          authorizedSections
        },
        method: {
          login: handleLogin,
          validate: handleValidate,
          logout: handleLogout
        }
      }}
    >
      {children}
    </AdminAuth.Provider>
  );
}

// hook
export const useAdminAuth = (): AdminAuth => {
  const adminAuth = useContext(AdminAuth);

  if (!adminAuth) {
    throw new Error("useAdminAuth must be used within a AdminAuthProvider");
  }

  return adminAuth;
};
