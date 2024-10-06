"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const states: State[] = [
  { label: "Alabama", value: "al" },
  { label: "Arizona", value: "az" },
  { label: "Arkansas", value: "ar" },
  { label: "California", value: "ca" },
  { label: "Colorado", value: "co" },
  { label: "Connecticut", value: "ct" },
  { label: "Delaware", value: "de" },
  { label: "Florida", value: "fl" },
  { label: "Georgia", value: "ga" },
  { label: "Idaho", value: "id" },
  { label: "Illinois", value: "il" },
  { label: "Indiana", value: "in" },
  { label: "Iowa", value: "ia" },
  { label: "Kansas", value: "ks" },
  { label: "Kentucky", value: "ky" },
  { label: "Louisiana", value: "la" },
  { label: "Maine", value: "me" },
  { label: "Maryland", value: "md" },
  { label: "Massachusetts", value: "ma" },
  { label: "Michigan", value: "mi" },
  { label: "Minnesota", value: "mn" },
  { label: "Mississippi", value: "ms" },
  { label: "Missouri", value: "mo" },
  { label: "Montana", value: "mt" },
  { label: "Nebraska", value: "ne" },
  { label: "Nevada", value: "nv" },
  { label: "New Hampshire", value: "nh" },
  { label: "New Jersey", value: "nj" },
  { label: "New Mexico", value: "nm" },
  { label: "New York", value: "ny" },
  { label: "North Carolina", value: "nc" },
  { label: "North Dakota", value: "nd" },
  { label: "Ohio", value: "oh" },
  { label: "Oklahoma", value: "ok" },
  { label: "Oregon", value: "or" },
  { label: "Pennsylvania", value: "pa" },
  { label: "Rhode Island", value: "ri" },
  { label: "South Carolina", value: "sc" },
  { label: "South Dakota", value: "sd" },
  { label: "Tennessee", value: "tn" },
  { label: "Texas", value: "tx" },
  { label: "Utah", value: "ut" },
  { label: "Vermont", value: "vt" },
  { label: "Virginia", value: "va" },
  { label: "Washington", value: "wa" },
  { label: "West Virginia", value: "wv" },
  { label: "Wisconsin", value: "wi" },
  { label: "Wyoming", value: "wy" }
];

type State = {
  label: string
  value: string
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StateSwitcherProps extends PopoverTriggerProps {}

export default function StateSwitcher({ className }: StateSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedState, setSelectedState] = React.useState<State>(
    states[0]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a State"
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedState.label}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search State..." />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    onSelect={() => {
                      setSelectedState(state)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    {state.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedState.value === state.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}