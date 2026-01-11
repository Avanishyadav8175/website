// layouts
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";

// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// types
import { type Document as MongooseDocument } from "mongoose";
import { type FormEvent, type ReactNode } from "react";
import { FormTitle } from "@/components/custom/inputs/title/Form";

export default function AdminFormLayout<
  Document extends MongooseDocument,
  FormFields extends HTMLFormControlsCollection
>({
  showForm,
  documentName,
  initialDocument,
  dialogClassName,
  formClassName,
  formCustomStyle,
  onChangeShowForm,
  getFormFields,
  onAddDocument,
  onUpdateDocument,
  getDocumentsFromFormFields
}: {
  showForm: boolean;
  documentName: string;
  initialDocument?: Document;
  dialogClassName?: string;
  formClassName?: string;
  formCustomStyle?: string;
  onChangeShowForm: (newShowForm: boolean) => void;
  getFormFields: ({
    initialDocument
  }: {
    initialDocument?: Document;
  }) => ReactNode;
  onAddDocument: ({
    newDocuments
  }: {
    newDocuments: Partial<Document> | Partial<Document>[];
  }) => void;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<Document>;
  }) => void;
  getDocumentsFromFormFields: (
    elements: FormFields
  ) => Partial<Document> | Partial<Document>[];
}) {
  interface FormElements extends HTMLFormElement {
    readonly elements: FormFields;
  }

  const handleSubmit = (e: FormEvent<FormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const newDocuments = getDocumentsFromFormFields(elements);

    if (!initialDocument) {
      onAddDocument({ newDocuments });
    } else {
      onUpdateDocument({
        documentId: initialDocument._id as string,
        updatedDocument: newDocuments as Partial<Document>
      });
    }
  };

  return (
    <Dialog
      open={showForm}
      onOpenChange={onChangeShowForm}
    >
      <DialogContent
        className={`w-max max-w-none rounded-none sm:rounded-3xl overflow-x-visible overflow-y-hidden max-sm:px-5 outline-none max-h-device sm:max-h-[calc(100dvh_-_100px)] py-0 transition-all duration-300 ${dialogClassName || ""}`}
      >
        <DialogTitle asChild>
          <FormTitle title={`${initialDocument ? "Update" : "New"} ${documentName}`} />
        </DialogTitle>
        <form
          className={
            formCustomStyle ||
            `justify-start items-start gap-3 grid grid-cols-1 relative overflow-auto scrollbar-hide max-h-[calc(100dvh_-_110px)] sm:max-h-[calc(90dvh_-_110px)] ${formClassName || ""}`
          }
          // noValidate
          onSubmit={handleSubmit}
        >
          {getFormFields({ initialDocument })}
          <SubmitAndReset position="right">
            {/* <Reset label="Reset" /> */}
            <div
              className={BUTTON_STYLES.GHOST}
              onClick={() => {
                onChangeShowForm(false);
              }}
            >
              {"Close"}
            </div>
            <Submit
              label={initialDocument ? "Update" : "Create"}
              customStyle={BUTTON_STYLES.GENESIS}
            />
          </SubmitAndReset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
