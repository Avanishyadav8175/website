"use client";
import { useEffect, useState } from "react";
import {
  EllipsisVertical,
  NotebookPen,
  PenLine,
  Plus,
  Trash2,
  UserRound
} from "lucide-react";
import { FormEntriesType } from "@/common/types/types";
import { generateRandomId } from "@/components/(admin)/Images/static/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import SavedRemindersNoReminderField from "./components/SavedAddressesNoAddressField";
import ReminderDialogForm from "./components/SavedAddressDialogForm";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Format the date
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
    .replace(",", ".");

  return formattedDate;
}

const DUMMY_RELATIONS = [
  { label: "Friend", id: generateRandomId(16) },
  { label: "Family", id: generateRandomId(16) },
  { label: "Colleague", id: generateRandomId(16) },
  { label: "Acquaintance", id: generateRandomId(16) },
  { label: "Partner", id: generateRandomId(16) },
  { label: "Mentor", id: generateRandomId(16) },
  { label: "Neighbor", id: generateRandomId(16) },
  { label: "Client", id: generateRandomId(16) },
  { label: "Supplier", id: generateRandomId(16) },
  { label: "Community Member", id: generateRandomId(16) }
];

const DUMMY_OCCASIONS = [
  { label: "Birthday", id: generateRandomId(16) },
  { label: "Anniversary", id: generateRandomId(16) },
  { label: "Graduation", id: generateRandomId(16) },
  { label: "Wedding", id: generateRandomId(16) },
  { label: "Holiday Party", id: generateRandomId(16) },
  { label: "Baby Shower", id: generateRandomId(16) },
  { label: "Housewarming", id: generateRandomId(16) },
  { label: "Retirement Party", id: generateRandomId(16) },
  { label: "Festival", id: generateRandomId(16) },
  { label: "Reunion", id: generateRandomId(16) }
];

export type RemindersType = {
  name: string;
  relation: string;
  occasion: string;
  date: string;
  note: string;
  _id: string;
};

export default function FrontendDashboardSavedReminders() {
  const [hasReminders, setHasReminders] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [reminders, setReminders] = useState<RemindersType[]>([]);
  const [dataInQ, setDataInQ] = useState<RemindersType>();

  const handleNewReminder = (formData: FormEntriesType) => {
    const name = formData["name"];
    const occasion = formData["occasion"];
    const relation = formData["relation"];
    const note = formData["note"];
    const date = formData["date"];
    const _id = generateRandomId(16);

    if (dataInQ) {
      setReminders((prev) =>
        prev.map((addr) =>
          addr._id === dataInQ._id
            ? ({
                _id: dataInQ._id,
                date,
                name,
                note,
                occasion,
                relation
              } as RemindersType)
            : addr
        )
      );
    } else
      setReminders((prev) => [
        ...prev,
        { date, name, note, occasion, relation, _id } as RemindersType
      ]);
    setOpen((prev) => false);
    setDataInQ((prev) => undefined);
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter(({ _id }) => _id !== id));
  };

  const editReminder = (id: string) => {
    const addressData = reminders.find(({ _id }) => _id === id);
    if (addressData) {
      setDataInQ((prev) => addressData);
      setOpen((prev) => true);
    }
  };

  useEffect(() => {
    if (reminders.length) setHasReminders((prev) => true);
    else setHasReminders((prev) => false);
  }, [reminders]);

  useEffect(() => {
    if (!open) {
      setDataInQ((prev) => undefined);
    }
  }, [open]);

  return (
    <div
      className={`${hasReminders ? "max-sm:px-3.5 grid grid-cols-1" : "max-sm:px-3.5 grid grid-cols-1 gap-8 auto-rows-min justify-center text-center mt-10 sm:mt-28"}`}
    >
      {hasReminders ? (
        <div className="grid grid-cols-1 auto-rows-min">
          <div className="flex max-sm:flex-col max-sm:text-center items-center justify-start sm:justify-between py-10">
            <span className="flex flex-col justify-start sm:gap-1">
              <span className="text-2xl">My Reminders</span>
              <span className="text-sm text-charcoal-3/70">
                Total Reminders: {reminders.length}
              </span>
            </span>
            <div
              onClick={() => setOpen((prev) => true)}
              className="w-fit justify-self-center flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-2.5 px-5 mt-5 rounded-full sm:rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
            >
              <Plus
                strokeWidth={1.5}
                width={20}
                height={20}
              />
              <span>Add an address</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 pt-2 pb-5 sm:py-5">
            {reminders.map(
              ({ name, note, relation, occasion, date, _id }, index) => (
                <div
                  key={index}
                  className="relative flex flex-col justify-start sm:grid-cols-[30px_1fr] sm:grid-rows-[repeat(3,auto)] max-sm:gap-x-4 sm:flex sm:flex-col sm:items-start sm:justify-start border border-charcoal-3/50 shadow-md p-6 rounded-xl"
                >
                  <span className="sm:pt-4 font-medium capitalize">
                    {formatDate(date)}
                  </span>
                  <span className="sm:pt-1.5 sm:pb-2.5 text-sm text-charcoal-3/90 sm:text-charcoal-3/70 max-sm:mb-2 max-sm:mt-0.5">
                    {DUMMY_OCCASIONS.find(({ id }) => id === occasion)?.label ||
                      ""}
                  </span>

                  <div className="grid grid-cols-[20px_1fr] gap-y-0.5 gap-x-1 items-center max-sm:!text-charcoal-3/70">
                    <UserRound
                      strokeWidth={1.5}
                      width={15}
                      height={15}
                    />
                    <span className="max-sm:pt-0.5 text-sm text-charcoal-3/90 max-sm:!text-charcoal-3/7">
                      {name}{" "}
                      <>
                        {DUMMY_RELATIONS.find(({ id }) => id === relation) ? (
                          <>
                            (
                            {DUMMY_RELATIONS.find(({ id }) => id === relation)
                              ?.label || ""}
                            )
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    </span>

                    {note && note.length ? (
                      <>
                        <NotebookPen
                          strokeWidth={1.5}
                          width={15}
                          height={15}
                        />
                        <span className="max-sm:pt-0.5 text-sm text-charcoal-3/90 max-sm:!text-charcoal-3/7">
                          {note}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <span className="absolute right-2.5 top-2.5">
                    <Popover>
                      <PopoverTrigger className="rounded-full p-1.5 transition-all duration-300 hover:bg-ash/50 cursor-pointer">
                        <EllipsisVertical
                          strokeWidth={1.5}
                          width={18}
                          height={18}
                        />
                      </PopoverTrigger>

                      <PopoverContent
                        side="right"
                        className="min-w-fit w-[150px] p-2 rounded-xl"
                      >
                        <span
                          onClick={() => editReminder(_id)}
                          className="py-2 px-3 transition-all duration-300 hover:bg-ash/30 cursor-pointer rounded-md flex items-center justify-start gap-2.5"
                        >
                          <PenLine
                            strokeWidth={1.5}
                            width={18}
                            height={18}
                          />
                          <span>Edit</span>
                        </span>
                        <span
                          onClick={() => deleteReminder(_id)}
                          className="py-2 px-3 transition-all duration-300 hover:bg-rose-50 hover:text-rose-500 cursor-pointer rounded-md flex items-center justify-start gap-2.5"
                        >
                          <Trash2
                            strokeWidth={1.5}
                            width={18}
                            height={18}
                          />
                          <span>Delete</span>
                        </span>
                      </PopoverContent>
                    </Popover>
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <SavedRemindersNoReminderField
          onClick={() => setOpen((prev) => true)}
        />
      )}
      <ReminderDialogForm
        open={open}
        onOpenChange={setOpen}
        defaultValues={dataInQ}
        onSubmitFormData={handleNewReminder}
        occasions={DUMMY_OCCASIONS}
        relations={DUMMY_RELATIONS}
      />
    </div>
  );
}
