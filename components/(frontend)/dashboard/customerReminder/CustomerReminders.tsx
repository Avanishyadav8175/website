"use client";

// requests
import { fetchOccasions } from "@/request/preset/occasion";
import { fetchRelations } from "@/request/preset/relation";

// libraries
import mongoose from "mongoose";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// hooks
import { useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";

// components
import CustomerReminderForm from "./components/CustomerReminderForm";
import CustomerReminderEmptyList from "./components/CustomerReminderEmptyList";
import CustomerReminderList from "./components/CustomerReminderList";
import { GoogleAnalytics } from "@next/third-parties/google";

// types
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

export default function CustomerReminders() {
  // hooks
  const {
    profile: {
      data: { reminders }
    }
  } = useAppStates();
  const {
    reminder: { onAdd, onUpdate, onDelete }
  } = useCustomerProfile();

  // states
  const [selectedCustomerReminderId, setSelectedCustomerReminderId] =
    useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [occasions, setOccasions] = useState<OccasionDocument[]>([]);
  const [relations, setRelations] = useState<RelationDocument[]>([]);

  // variables
  const hasReminders = Boolean(reminders.length);

  const selectedCustomerReminders = reminders.find(
    ({ _id }) => _id === selectedCustomerReminderId
  );

  // handlers
  const handleGetOccasions = () => {
    fetchOccasions({
      active: true,
      select: ["name"],
      sortBy: "name"
    })
      .then(({ data: occasions }) => {
        if (occasions && occasions.length) {
          setOccasions(occasions as OccasionDocument[]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetRelations = () => {
    fetchRelations({
      active: true,
      select: ["name"],
      sortBy: "name"
    })
      .then(({ data: relations }) => {
        if (relations && relations.length) {
          setRelations(relations as RelationDocument[]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddOrUpdateReminder = (newReminder: CustomerReminderDocument) => {
    if (mongoose.Types.ObjectId.isValid(newReminder._id as string)) {
      onUpdate(newReminder);
    } else {
      onAdd(newReminder);
    }
  };

  const handleAddReminder = () => {
    setShowForm(true);
  };

  const handleUpdateReminder = (reminderId: string) => {
    setSelectedCustomerReminderId(reminderId);
    setShowForm(true);
  };

  const handleDeleteReminder = (reminderId: string) => {
    onDelete(reminderId);
  };

  // side effects
  useEffect(() => {
    handleGetOccasions();
    handleGetRelations();
  }, []);

  useEffect(() => {
    if (!showForm) {
      setSelectedCustomerReminderId("");
    }
  }, [showForm]);

  return (
    <>
      <section
        className={`${hasReminders ? "max-sm:px-3.5 grid grid-cols-1" : "max-sm:px-3.5 grid grid-cols-1 gap-8 auto-rows-min justify-center text-center mt-10 sm:mt-28"}`}
      >
        {hasReminders ? (
          <CustomerReminderList
            reminders={reminders}
            occasions={occasions}
            relations={relations}
            onAdd={handleAddReminder}
            onUpdate={handleUpdateReminder}
            onDelete={handleDeleteReminder}
          />
        ) : (
          <CustomerReminderEmptyList onAdd={handleAddReminder} />
        )}
        <CustomerReminderForm
          showForm={showForm}
          occasions={occasions}
          relations={relations}
          defaultValue={selectedCustomerReminders}
          onChangeShowForm={setShowForm}
          onSubmit={handleAddOrUpdateReminder}
        />
      </section>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
