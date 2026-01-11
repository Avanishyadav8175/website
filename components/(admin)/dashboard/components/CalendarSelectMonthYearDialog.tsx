"use client";

// icons
import { ChevronDown, ChevronUp } from "lucide-react";

// utils
import { getMonthName } from "../utils/getMonthName";

// hooks
import { useState } from "react";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export default function CalendarSelectMonthYearDialog({
  month,
  year,
  onChangeMonth,
  onChangeYear
}: {
  month: number;
  year: number;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
}) {
  // states
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedYear, setSelectedYear] = useState<number>(year);

  // variables
  const canIncreaseMonth = selectedMonth !== 11;
  const canDecreaseMonth = selectedMonth !== 0;

  // event handlers
  const handleIncreaseMonth = () => {
    if (canIncreaseMonth) {
      setSelectedMonth((prevSelectedMonth) => prevSelectedMonth + 1);
    }
  };

  const handleDecreaseMonth = () => {
    if (canDecreaseMonth) {
      setSelectedMonth((prevSelectedMonth) => prevSelectedMonth - 1);
    }
  };

  const handleIncreaseYear = () => {
    setSelectedYear((prevSelectedYear) => prevSelectedYear + 1);
  };

  const handleDecreaseYear = () => {
    setSelectedYear((prevSelectedYear) => prevSelectedYear - 1);
  };

  const handleSelectMonthYear = () => {
    onChangeMonth(selectedMonth);
    onChangeYear(selectedYear);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <section className="flex items-center justify-center gap-2 min-w-[140px] sm:min-w-[150px] cursor-pointer">
          <span>{getMonthName({ month })}</span>
          <span>{year}</span>
        </section>
      </DialogTrigger>
      <DialogContent className="rounded-xl p-2">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <section>
          <section className="flex items-center justify-evenly w-full">
            <section className="flex flex-col items-center justify-center gap-2 w-[30dvw] sm:w-[10dvw]">
              <span
                className="cursor-pointer"
                onClick={handleDecreaseMonth}
              >
                <ChevronUp
                  strokeWidth={1.5}
                  width={30}
                  height={30}
                />
              </span>
              {Array.from({
                length: 3
              }).map((_, i) => (
                <span
                  key={
                    selectedMonth === 0 || selectedMonth === 11
                      ? selectedMonth === 0
                        ? i === 0
                          ? -1
                          : i === 1
                            ? 0
                            : 1
                        : i === 0
                          ? 10
                          : i === 1
                            ? 11
                            : 12
                      : i === 0
                        ? selectedMonth - 1
                        : i === 1
                          ? selectedMonth
                          : selectedMonth + 1
                  }
                  className="relative min-h-[20px] text-xl sm:text-2xl font-light"
                >
                  <span>
                    {getMonthName({
                      month:
                        selectedMonth === 0 || selectedMonth === 11
                          ? selectedMonth === 0
                            ? i === 0
                              ? -1
                              : i === 1
                                ? 0
                                : 1
                            : i === 0
                              ? 10
                              : i === 1
                                ? 11
                                : 12
                          : i === 0
                            ? selectedMonth - 1
                            : i === 1
                              ? selectedMonth
                              : selectedMonth + 1
                    })}
                  </span>
                  <span
                    className={`absolute top-0 left-0 w-full h-full ${i === 0 ? "bg-gradient-to-b from-white to-transparent" : i === 2 ? "bg-gradient-to-b from-transparent to-white" : ""}`}
                  ></span>
                </span>
              ))}
              <span
                className="cursor-pointer"
                onClick={handleIncreaseMonth}
              >
                <ChevronDown
                  strokeWidth={1.5}
                  width={30}
                  height={30}
                />
              </span>
            </section>
            <section className="flex flex-col items-center justify-center gap-2 w-[30dvw] sm:w-[10dvw]">
              <span
                className="cursor-pointer"
                onClick={handleDecreaseYear}
              >
                <ChevronUp
                  strokeWidth={1.5}
                  width={30}
                  height={30}
                />
              </span>
              {Array.from({
                length: 3
              }).map((_, i) => (
                <span
                  key={
                    i === 0
                      ? selectedYear - 1
                      : i === 1
                        ? selectedYear
                        : selectedYear + 1
                  }
                  className={`relative min-h-[20px] text-xl sm:text-2xl font-light`}
                >
                  <span>
                    {i === 0
                      ? selectedYear - 1
                      : i === 1
                        ? selectedYear
                        : selectedYear + 1}
                  </span>
                  <span
                    className={`absolute top-0 left-0 w-full h-full ${i === 0 ? "bg-gradient-to-b from-white to-transparent" : i === 2 ? "bg-gradient-to-b from-transparent to-white" : ""}`}
                  ></span>
                </span>
              ))}
              <span
                className="cursor-pointer"
                onClick={handleIncreaseYear}
              >
                <ChevronDown
                  strokeWidth={1.5}
                  width={30}
                  height={30}
                />
              </span>
            </section>
          </section>
          <section className="flex items-center justify-end gap-2 w-full pt-4 sm:pt-8">
            <DialogClose className="w-[80px] sm:w-[100px] py-1 border border-charcoal rounded-md text-sm sm:text-base text-center cursor-pointer">
              <span>Cancel</span>
            </DialogClose>
            <DialogClose
              className="w-[80px] sm:w-[100px] py-1 border border-charcoal bg-charcoal text-white rounded-md text-sm sm:text-base text-center cursor-pointer"
              onClick={handleSelectMonthYear}
            >
              <span>Done</span>
            </DialogClose>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
