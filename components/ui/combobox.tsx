"use client";

// icons
import { Check, ChevronsUpDown } from "lucide-react";

// utils
import { memo } from "react";
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// types
import { type SelectOption } from "@/common/types/inputs";

function Combobox({
  showCombobox,
  options,
  selected,
  theme,
  onChangeShowCombobox,
  onSelect
}: {
  showCombobox: boolean;
  options: SelectOption[];
  selected: string;
  theme: "default" | "transparent";
  onChangeShowCombobox: (newShowCombobox: boolean) => void;
  onSelect: (newValue: string) => void;
}) {
  return (
    <Popover
      open={showCombobox}
      onOpenChange={onChangeShowCombobox}
    >
      <PopoverTrigger asChild>
        <Button
          variant={theme === "default" ? "outline" : "ghost"}
          role="combobox"
          aria-expanded={showCombobox}
          className={`h-full justify-between ${theme === "transparent" ? "scale-110 w-16 -translate-x-2.5" : ""}`}
        >
          {selected || "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Not Found</CommandEmpty>
            <CommandGroup>
              {options.map(({ label, value }, i) => (
                <CommandItem
                  key={i}
                  value={value}
                  onSelect={(newValue) => {
                    onSelect(newValue);
                    onChangeShowCombobox(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default memo(Combobox);
