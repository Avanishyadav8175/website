"use client";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { FormEntriesType } from "@/common/types/types";
import { useToast } from "@/components/ui/use-toast";
import { VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";
import { addVendorRequest } from "@/request/vendor/registration/request";

const CONTACT = {
    NAME: "JSAIGJRISG",
    COMPANY: "AJEGHAHSGRG",
    EMAIL: "AEJGFUAHGU",
    PHONE: "IOHUSIGI",
    MESSAGE: "ID&FYIUYGUE",
    CAPTCHA: "UAGFIYT"
};

export default function ContactUsForm() {
    const { toast } = useToast();

    // event handlers
    const handleFormSubmit = (formData: FormEntriesType) => {
        const name = formData[CONTACT.NAME] as string;
        const company = formData[CONTACT.COMPANY] as string;
        const mail = formData[CONTACT.EMAIL] as string;
        const mobile = formData[CONTACT.PHONE] as string;
        const message = formData[CONTACT.MESSAGE] as string;

        const reqData = {
            businessName: company || "NULL",
            ownerName: name || "NULL",
            mobile: mobile || "NULL",
            whatsapp: "NULL",
            mail: "NULL",
            address: message || "NULL",
            city: mail || "NULL",
            categories: [] as string[]
        } as Partial<VendorRequestDocument>;


        addVendorRequest(reqData);

        // onChangeShowForm(false);

        toast({
            title: "Successfully Sent",
            variant: "success"
        });
    };

    return (
        <>
            <Form
                onSubmit={handleFormSubmit}
                className="flex flex-col relative justify-start sm:grid sm:grid-cols-2 gap-y-7 sm:gap-x-12 sm:gap-y-6 *:text-sm sm:px-6"
            >
                <Input
                    type="text"
                    name={CONTACT.NAME}
                    isRequired
                    labelConfig={{ label: "Your Name", layoutStyle: "flex-col" }}
                    errorCheck={false}
                    validCheck={false}
                    customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
                <Input
                    type="text"
                    name={CONTACT.EMAIL}
                    isRequired
                    labelConfig={{
                        label: "Your Email",
                        layoutStyle: "flex-col"
                    }}
                    errorCheck={false}
                    validCheck={false}
                    customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
                <Input
                    type="text"
                    name={CONTACT.PHONE}
                    isRequired
                    labelConfig={{ label: "Your Mobile Number", layoutStyle: "flex-col" }}
                    errorCheck={false}
                    validCheck={false}
                    customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
                <Input
                    type="text"
                    name={CONTACT.COMPANY}
                    isRequired
                    labelConfig={{ label: "Company Name", layoutStyle: "flex-col" }}
                    errorCheck={false}
                    validCheck={false}
                    customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
                <Textarea
                    name={CONTACT.MESSAGE}
                    validCheck={false}
                    errorCheck={false}
                    isList={false}
                    customValue={undefined}
                    defaultValue=""
                    isRequired
                    labelConfig={{
                        label: "Your Message",
                        labelStyle: "",
                        layoutStyle: "flex-col col-span-2 max-sm:my-3 "
                    }}
                    customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300 resize-none h-24"
                />
                <SubmitAndReset
                    position="center"
                    className="sm:col-span-2 bg-transparent !pt-0 pb-5 max-sm:flex max-sm:gap-3 bg-white !relative"
                >
                    <Submit
                        label="Send"
                        customStyle="bg-sienna-2 font-medium cursor-pointer rounded-lg text-base text-white px-14 sm:px-10 pb-2 pt-2.5 flex items-center justify-center transition-all duration-300"
                    />
                </SubmitAndReset>
            </Form>
        </>
    );
}
