// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: OrderDocument;
}) {
  return <section className="flex flex-col gap-3 w-[80dvw] p-1"></section>;
}
