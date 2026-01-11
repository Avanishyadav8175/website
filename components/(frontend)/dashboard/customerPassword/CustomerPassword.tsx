"use client";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// hooks
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";

// components
import { GoogleAnalytics } from "@next/third-parties/google";
import Input from "@/lib/Forms/Input/Input";

export default function CustomerPassword() {
  // hooks
  const {
    profile: {
      data: { password }
    }
  } = useAppStates();
  const {
    password: { onChange }
  } = useCustomerProfile();
  const { toast } = useToast();

  // states
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // event handlers
  const handleCleanup = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    toast({
      title: password ? "Updated" : "Added",
      description: `Your password has been ${password ? "updated" : "added"}`,
      variant: "success"
    });

    setCurrentPassword((prev) => "");
    setNewPassword((prev) => "");
  };

  const handleAddPassword = () => {
    if (newPassword.length < 8) {
      toast({
        title: "Password Is Too Short",
        description: "Your Password Should Be At Least 8 Characters",
        variant: "warning"
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please Check Password",
        variant: "warning"
      });

      return;
    }

    onChange(newPassword, handleCleanup);
  };

  const handleUpdatePassword = () => {
    if (newPassword.length < 8) {
      toast({
        title: "Password Is Too Short",
        description: "Your Password Should Be At Least 8 Characters",
        variant: "warning"
      });

      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: "Same Password",
        description: "Your New Password Can't Be Same as Current password",
        variant: "warning"
      });

      return;
    }

    if (currentPassword !== password) {
      setTimeout(() => {
        toast({
          title: "Wrong Current Password",
          description: "Please Provide Correct Current Password",
          variant: "warning"
        });
      }, 1500);

      return;
    }

    onChange(newPassword, handleCleanup);
  };

  const customInputStyle =
    "outline-none text-charcoal-3/90 transition-all duration-300 bg-ivory-2/80 rounded-xl w-full py-2.5 px-3.5 hover:bg-ivory-2 focus:bg-sienna-1/10 focus:ring-1 focus:ring-sienna-1/50 focus:ring-offset-2";

  return (
    <>
      <section className="grid grid-cols-1 auto-rows-min sm:pt-20 place-items-center gap-7 max-sm:py-20">
        <span className="text-3xl pb-6 sm:pb-5 font-light max-sm:font-extralight sm:text-charcoal-3/80">
          {password ? "Change Password" : "Add Password"}
        </span>
        <Input
          type="password"
          name={password ? "currentPassword" : "password"}
          labelConfig={{
            label: password ? "Current Password" : "Password",
            labelStyle: "font-normal !font-medium mb-1 text-charcoal-3/95",
            layoutStyle: "flex-col w-[340px] sm:w-[300px] space-y-1.5"
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: password ? currentPassword : newPassword,
            setValue: password ? setCurrentPassword : setNewPassword
          }}
          className={customInputStyle}
        />
        <Input
          type="password"
          name={password ? "newPassword" : "confirmPassword"}
          labelConfig={{
            label: password ? "New Password" : "Confirm Password",
            labelStyle: "font-normal !font-medium mb-1 text-charcoal-3/95",
            layoutStyle: "flex-col w-[340px] sm:w-[300px] space-y-1.5"
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: password ? newPassword : confirmPassword,
            setValue: password ? setNewPassword : setConfirmPassword
          }}
          className={customInputStyle}
        />
        <div
          className="px-7 py-2.5 mt-3 !bg-sienna text-white !border-0 hover:!bg-sienna-2 outline-none rounded-xl cursor-pointer transition-all duration-300"
          onClick={password ? handleUpdatePassword : handleAddPassword}
        >
          {password ? "Update Password" : "Add Password"}
        </div>
      </section>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
