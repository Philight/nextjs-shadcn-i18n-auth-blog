'use client';

import { Element } from 'react-scroll';
import {
  useState, useMemo 
} from 'react';
import {
  Command, CommandInput, CommandItem, CommandList 
} from '@/shadcn/command';

import { useGlobalStore } from '@/store';
import {
  cn, debounce 
} from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

const DEBOUNCE_DELAY = 1500;

// ============================================================================

interface ISearchBarProps extends IGenericProps {
  data?: { value: string; label: string }[];
  id?: any;
}

export default function SearchBar({ className, data, ...props }: ISearchBarProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setFilters, filters } = useGlobalStore((state) => state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilters = useMemo(() => debounce(setFilters, DEBOUNCE_DELAY), []);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);

    debouncedSetFilters({
      title: value,
      content: value,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filtered = useMemo(() => (Array.isArray(data) ? data.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())) : []), []);

  // ============================================================================

  return (
    <Element name="search-bar">
      <Command className={cn('search-bar__c ', className)} {...props}>
        <CommandInput placeholder="Type a title or text..." onValueChange={handleValueChange} />
        {data?.length && (
          <CommandList>
            {open &&
              filtered.length > 0 &&
              filtered.map((command) => (
                <CommandItem key={command.value} value={command.value}>
                  {command.label}
                </CommandItem>
              ))}
          </CommandList>
        )}
      </Command>
    </Element>
  );
}
