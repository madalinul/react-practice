'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type ComboboxProps = {
    options: ComboboxOption[];
    onChange?: (value: string) => void;
    selectOptionText?: string;
    searchOptionsText?: string;
};

export type ComboboxOption = {
    label: string;
    value: string;
};

export function Combobox({
    options = [],
    onChange,
    selectOptionText = 'Select an option...',
    searchOptionsText = 'Search options...',
}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : selectOptionText}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command
                    filter={(value, search) => {
                        if (value.toLowerCase().includes(search.toLowerCase())) {
                            return 1;
                        }
                        return 0;
                    }}
                >
                    <CommandInput placeholder={searchOptionsText} className='h-9' />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={`${option.value} ${option.label}`}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue.split(' ')[0];
                                        const updatedValue = newValue === value ? '' : newValue;
                                        setValue(updatedValue);
                                        setOpen(false);
                                        if (typeof onChange === 'function') {
                                            onChange(updatedValue);
                                        }
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === option.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
