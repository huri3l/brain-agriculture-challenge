import { ChevronDown, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";

export interface MultiSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
  error?: boolean
}

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ options, defaultValue, placeholder, onValueChange, error }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string[]>(
      options.filter(option => defaultValue?.includes(option))
    );
    const [inputValue, setInputValue] = React.useState('')

    const handleUnselect = React.useCallback((option: string) => {
      setSelected((prev) => prev.filter((s) => s !== option));
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (typeof ref === 'object' && ref !== null) {
          const input = ref?.current;
          if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
              if (input.value === "") {
                setSelected((prev) => {
                  const newSelected = [...prev];
                  newSelected.pop();
                  return newSelected;
                });
              }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
              input.blur();
            }
          }
        }
      },
      [ref]
    );

    const selectables = options.filter(
      (option) => !selected.includes(option)
    );

    React.useEffect(() => {
      if (selected.length > 0) {
        onValueChange(selected.map((option) => option));
      } else {
        onValueChange([])
      }

    }, [selected, onValueChange])

    return (
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className={cn("group rounded-md bg-card border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring", error && 'border-destructive')}>
          <div className="flex flex-wrap gap-1 relative">
            {selected.map((option) => {
              return (
                <Badge key={option}>
                  {option}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-1 focus:ring-ring"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 hover:text-muted-foreground" />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              ref={ref}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={selected.length === 0 ? placeholder : ''}
              className="min-w-8 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <ChevronDown className={cn("absolute right-0 top-1/2 transition transform -translate-y-1/2 size-4 opacity-50", open && selectables.length > 0 && 'rotate-180')} />
          </div>
        </div>
        {open && selectables.length > 0 ? (
          <div className="relative">
            <CommandList>
              <div className="absolute mt-2 top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((option) => {
                    return (
                      <CommandItem
                        key={option}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          setSelected((prev) => [...prev, option]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {option}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            </CommandList>
          </div>
        ) : null}
      </Command>
    );
  }
)
MultiSelect.displayName = 'MultiSelect'