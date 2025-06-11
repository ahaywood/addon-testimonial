"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";

export function MultiSelectCombobox({
  data,
  label,
  placeholder = "",
  notFoundMessage = "", // this is displayed when the combobox search is empty
  emptyMessage = "", // this is displayed the combobox if it is empty
}: {
  data: {
    value: string;
    label: string;
    color?: string;
  }[];
  label: string;
  placeholder?: string;
  notFoundMessage?: string;
  emptyMessage?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col gap-0 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="justify-between -mx-2 w-[calc(100%_+_8px)]"
          >
            {label}
            <Settings className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{notFoundMessage}</CommandEmpty>
              <CommandGroup>
                {data &&
                  data.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        // if the value is already selected, remove it from the list
                        // if the value is not selected, add it to the list
                        setValue(
                          value.includes(currentValue)
                            ? value.filter((v) => v !== currentValue)
                            : [...value, currentValue]
                        );
                      }}
                    >
                      <Checkbox
                        checked={value.includes(item.value)}
                        className="dark:border-zinc-500"
                      />
                      <div className="rounded-full size-3 bg-red-500" />
                      {item.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2 flex-wrap">
        {value.length > 0 ? (
          value.map((item) => (
            <Badge key={item}>
              {data.find((i) => i.value === item)?.label}
              <button
                role="button"
                onClick={() => {
                  // remove this item from the list
                  setValue(value.filter((v) => v !== item));
                }}
              >
                <X className="size-4 cursor-pointer" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
