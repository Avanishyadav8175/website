// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialCustomerReminder } from "../utils/getInitialCustomerReminder";

// libraries
import moment from "moment";

// hooks
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Input from "@/lib/Forms/Input/Input";

// types
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";
import Textarea from "@/lib/Forms/Textarea/Textarea";

export default function CustomerReminderForm({
  showForm,
  occasions,
  relations,
  defaultValue,
  onChangeShowForm,
  onSubmit
}: {
  showForm: boolean;
  occasions: OccasionDocument[];
  relations: RelationDocument[];
  defaultValue?: CustomerReminderDocument;
  onChangeShowForm: (newShowForm: boolean) => void;
  onSubmit: (newAddress: CustomerReminderDocument) => void;
}) {
  // hooks
  const { toast } = useToast();

  // states
  const [customerReminder, setCustomerReminder] =
    useState<CustomerReminderDocument>(
      defaultValue || getInitialCustomerReminder()
    );

  // handlers
  const handleReset = () => {
    setCustomerReminder(defaultValue || getInitialCustomerReminder());
  };

  const handleSubmit = () => {
    if (!customerReminder.recipientName.trim()) {
      toast({
        title: "Missing Name",
        description: "name is Required",
        variant: "warning"
      });
    } else if (!customerReminder.date) {
      toast({
        title: "Missing Date",
        description: "Date is Required",
        variant: "warning"
      });
    } else if (!customerReminder.occasion) {
      toast({
        title: "Missing Occasion",
        description: "Occasion is Required",
        variant: "warning"
      });
    } else if (!customerReminder.relation) {
      toast({
        title: "Missing Relation",
        description: "Relation is Required",
        variant: "warning"
      });
    } else {
      onSubmit(customerReminder);
      onChangeShowForm(false);
    }
  };

  // side effects
  useEffect(() => {
    if (defaultValue) {
      setCustomerReminder(defaultValue);
    } else {
      setCustomerReminder(getInitialCustomerReminder());
    }
  }, [defaultValue, showForm]);

  const customInputStyle =
    "outline-none text-charcoal-3/90 transition-all duration-300 bg-ivory-2/80 rounded-xl w-full py-2.5 px-3.5 text-base hover:bg-ivory-2 focus:bg-sienna-1/10 focus:ring-1 focus:ring-sienna-1/50 focus:ring-offset-2";

  return (
    <Dialog
      open={showForm}
      onOpenChange={onChangeShowForm}
    >
      <DialogContent className="outline-none min-w-fit max-sm:w-device max-sm:h-device sm:p-5 sm:rounded-2xl sm:pb-3 z-[995]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-4 w-full max-sm:pt-6">
          <div className="flex items-center justify-start gap-3 max-sm:pb-3">
            <div className="bg-sienna w-1 h-7 rounded-full -translate-y-1" />
            <span className="font-light text-2xl pb-3">New Reminder</span>
          </div>
          <Input
            customStyle={customInputStyle}
            type="text"
            name="recipientName"
            labelConfig={{
              label: "Title",
              layoutStyle: "grid grid-cols-[110px_1fr]",
              labelStyle: "self-center"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: customerReminder.recipientName,
              setValue: (newRecipientName: string) => {
                setCustomerReminder({
                  ...customerReminder,
                  recipientName: newRecipientName
                } as CustomerReminderDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="date"
            name="date"
            labelConfig={{
              label: "Date",
              layoutStyle: "grid grid-cols-[110px_1fr]",
              labelStyle: "self-center"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: moment(customerReminder.date).format("YYYY-MM-DD") || "",
              setValue: (newDate: string) => {
                setCustomerReminder({
                  ...customerReminder,
                  date: newDate
                } as CustomerReminderDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="dropdown"
            name="occasion"
            labelConfig={{
              label: "Occasion",
              layoutStyle: "grid grid-cols-[110px_1fr]",
              labelStyle: "self-center"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select Occasion"
            options={occasions.map(({ _id, name }) => ({
              label: name,
              value: _id as string
            }))}
            customValue={{
              value: (customerReminder.occasion as string) || "",
              setValue: (newOccasion: string) => {
                setCustomerReminder({
                  ...customerReminder,
                  occasion: newOccasion
                } as CustomerReminderDocument);
              }
            }}
          />
          <Input
            customStyle={customInputStyle}
            type="dropdown"
            name="relation"
            labelConfig={{
              label: "Relation",
              layoutStyle: "grid grid-cols-[110px_1fr]",
              labelStyle: "self-center"
            }}
            isRequired
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select Relation"
            options={relations.map(({ _id, name }) => ({
              label: name,
              value: _id as string
            }))}
            customValue={{
              value: (customerReminder.relation as string) || "",
              setValue: (newRelation: string) => {
                setCustomerReminder({
                  ...customerReminder,
                  relation: newRelation
                } as CustomerReminderDocument);
              }
            }}
          />
          <Textarea
            customStyle={`h-20 resize-none ${customInputStyle}`}
            name="note"
            labelConfig={{
              label: "Note",
              layoutStyle: "grid grid-cols-[110px_1fr]",
              labelStyle: "self-center"
            }}
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: customerReminder.note,
              setValue: (newNote: string) => {
                setCustomerReminder({
                  ...customerReminder,
                  note: newNote
                } as CustomerReminderDocument);
              }
            }}
          />
          <section className="pl-[120px] flex max-sm:flex-col items-center justify-start gap-2 sm:gap-3 w-full pt-3.5 sm:pb-3">
            <div
              className={`!bg-emerald-500 !text-white ${BUTTON_STYLES.GENESIS}`}
              onClick={handleSubmit}
            >
              Submit
            </div>
            <div
              className={BUTTON_STYLES.GHOST}
              onClick={handleReset}
            >
              Reset
            </div>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
