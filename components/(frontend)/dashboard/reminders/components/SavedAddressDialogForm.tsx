import { SetStateType } from "@/common/types/reactTypes";
import { FormEntriesType } from "@/common/types/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { RemindersType } from "../FrontendDashboardSavedAddresses";

export default function ReminderDialogForm({
  open,
  onOpenChange,
  onSubmitFormData,
  defaultValues,
  relations,
  occasions
}: {
  open: boolean;
  onOpenChange: SetStateType<boolean>;
  onSubmitFormData: (formData: FormEntriesType) => void;
  defaultValues: RemindersType | undefined;
  relations: { label: string; id: string }[];
  occasions: { label: string; id: string }[];
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="outline-none min-w-fit max-sm:w-device max-sm:h-device sm:p-7 sm:rounded-2xl sm:pb-3">
        <Form
          onSubmit={onSubmitFormData}
          className="max-sm:h-[calc(100dvh_-_40px)] relative sm:pb-[85px]"
        >
          <div className="flex items-center justify-start gap-3">
            <div className="bg-sienna w-1 h-7 rounded-full -translate-y-1" />
            <span className="font-light text-2xl pb-3">New Reminder</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 pb-3">
            <Input
              type="text"
              name="name"
              isRequired
              defaultValue={defaultValues ? defaultValues.name || "" : ""}
              labelConfig={{ label: "Name", layoutStyle: "flex-col" }}
              errorCheck={false}
              validCheck={false}
              customStyle="outline-none mb-1.5 bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
            />
            <Input
              type="date"
              name="date"
              isRequired
              defaultValue={defaultValues ? defaultValues.date || "" : ""}
              labelConfig={{ label: "Date", layoutStyle: "flex-col" }}
              errorCheck={false}
              validCheck={false}
              customStyle="outline-none mb-1.5 bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
            />
            <Input
              type="dropdown"
              name="occasion"
              isRequired
              defaultValue={defaultValues ? defaultValues.occasion || "" : ""}
              labelConfig={{ label: "Occasion", layoutStyle: "flex-col" }}
              errorCheck={false}
              validCheck={false}
              nullOption
              options={occasions.map(({ label, id }) => ({ label, value: id }))}
              customStyle="outline-none cursor-pointer mb-1.5 bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
            />
            <Input
              type="dropdown"
              name="relation"
              isRequired
              defaultValue={defaultValues ? defaultValues.occasion || "" : ""}
              labelConfig={{ label: "Relation", layoutStyle: "flex-col" }}
              errorCheck={false}
              validCheck={false}
              nullOption
              options={relations.map(({ label, id }) => ({ label, value: id }))}
              customStyle="outline-none cursor-pointer mb-1.5 bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
            />
          </div>

          <Input
            type="text"
            name="note"
            isRequired={false}
            defaultValue={defaultValues ? defaultValues.note || "" : ""}
            labelConfig={{ label: "Note", layoutStyle: "flex-col" }}
            errorCheck={false}
            validCheck={false}
            customStyle="outline-none mb-1.5 bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
          />

          <SubmitAndReset
            position="center"
            className="!absolute "
          >
            <Submit
              label="Confirm"
              className="!bg-sienna text-white hover:!bg-[#9e8721] border-none"
            />
            <Reset label="Reset" />
          </SubmitAndReset>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
