"use client";
import { FormEntriesType } from "@/common/types/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { useEffect, useId, useState } from "react";

const HEADER_UI_CHANGE_THRESHOLD = 80;

export default function VendorRegistrationHeader({
  asCustomerContactPage
}: {
  asCustomerContactPage?: boolean;
}) {
  const headerId = useId();

  const [open, setOpen] = useState<boolean>(false);

  const handleFormSubmit = (formData: FormEntriesType) => {
    const username = formData["username"];
    const password = formData["password"];

    console.log({ username, password });

    setOpen(false);
  };

  useEffect(() => {
    const header = document.getElementById(headerId) as HTMLElement;

    const checkHeaderStyles = () => {
      if (scrollY > HEADER_UI_CHANGE_THRESHOLD) {
        header.animate(
          {
            background: "#fff",
            boxShadow: "0 0 10px 5px #7773"
          },
          { duration: 350, fill: "forwards" }
        );
      }

      if (scrollY <= HEADER_UI_CHANGE_THRESHOLD) {
        header.animate(
          {
            background: "#aaa0",
            boxShadow: "none"
          },
          { duration: 350, fill: "forwards" }
        );
      }
    };

    addEventListener("scroll", checkHeaderStyles);
    checkHeaderStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      id={headerId}
      className="z-20 flex items-center justify-between px-3.5 sm:px-12 py-4 text-sm *:transition-all *:duration-300 sticky top-0"
    >
      <div>LOGO</div>

      <div className="flex items-center justify-end gap-2 text-sm">
        {asCustomerContactPage !== true && (
          <>
            <div
              onClick={() => setOpen((prev) => true)}
              className="rounded-full border border-charcoal-3 py-1 px-5 uppercase ml-4 cursor-pointer transition-all duration-300 hover:bg-[#7a6040] hover:border-[#7a6040] hover:text-white"
            >
              <span className="max-sm:hidden pr-1">Vendor</span>
              Login
            </div>
          </>
        )}
      </div>

      {asCustomerContactPage !== true && (
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogContent className="min-w-fit sm:h-[350px] w-[300px] flex flex-col justify-start gap-3 pb-1 border-none outline-none rounded-3xl">
            <span className="text-2xl font-light pb-4">Login</span>
            <Form
              onSubmit={handleFormSubmit}
              className="flex flex-col relative justify-start sm:gap-x-5 sm:gap-y-4 *:text-sm h-[65%]"
            >
              <Input
                type="text"
                name={"username"}
                isRequired={false}
                labelConfig={{
                  label: "Username",
                  layoutStyle: "flex-col"
                }}
                errorCheck={false}
                validCheck={false}
                customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
              />
              <Input
                type="password"
                name={"password"}
                isRequired={false}
                labelConfig={{
                  label: "Password",
                  layoutStyle: "flex-col"
                }}
                errorCheck={false}
                validCheck={false}
                customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
              />

              <div className="translate-y-3.5 flex flex-col justify-start items px-8 gap-y-3">
                <Submit
                  label="Login"
                  customStyle="bg-sienna/60 hover:bg-sienna hover:text-white cursor-pointer rounded-full text-amber-950 !px-16 sm:px-10 pb-2 pt-2.5 max-sm:mt-2 max-sm:mb-1 flex items-center justify-center transition-all duration-300"
                />
                <Reset
                  label="Reset"
                  className="!pt-0 !pb-1 max-sm:hidden"
                />
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
