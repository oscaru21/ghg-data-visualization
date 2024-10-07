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
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { State } from "@/lib/models"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StateSwitcherProps extends PopoverTriggerProps {
  selectedState: State;
  setSelectedState: React.Dispatch<React.SetStateAction<State>>;
  states: State[];
}

export default function StateSwitcher({ className, selectedState, setSelectedState, states }: StateSwitcherProps) {
  const [open, setOpen] = React.useState(false)

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