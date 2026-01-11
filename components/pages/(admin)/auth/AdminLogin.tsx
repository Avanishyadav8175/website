"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";
import Input from "@/lib/Forms/Input/Input";
import { ArrowRight } from "lucide-react";
import { ROOT_ADMIN_ROUTE } from "@/common/routes/admin/staticLinks";

export default function FrontendAdminLoginPage() {
  const { replace } = useRouter();
  const {
    data: { isAuthenticated },
    method: { login }
  } = useAdminAuth();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => userName && password
    ? login({ userName, password })
    : {};

  if (isAuthenticated) replace(ROOT_ADMIN_ROUTE);

  return (
    <>
      <div className="py-2.5 px-1">
        <Input
          type="text"
          isRequired
          labelConfig={{
            label: "Username",
            layoutStyle: "flex flex-col gap-3"
          }}
          errorCheck={false}
          validCheck={false}
          name="userName"
          customValue={{
            value: userName,
            setValue: setUserName
          }}
          className="py-2.5"
        />
      </div>
      <div className="py-2.5 px-1">
        <Input
          type="password"
          isRequired
          labelConfig={{
            label: "Password",
            layoutStyle: "flex flex-col gap-3"
          }}
          errorCheck={false}
          validCheck={false}
          name="password"
          customValue={{
            value: password,
            setValue: setPassword
          }}
          className="py-2.5"
        />
      </div>
      <div
        onClick={handleLogin}
        className="mt-6 sm:mt-2 mb-3.5 group text-center transition-all duration-300 hover:gap-1 row-start-3 justify-self-stretch bg-sienna-1 font-medium py-3 rounded-lg text-white cursor-pointer"
      >
        Login
      </div>
    </>
  );
}
