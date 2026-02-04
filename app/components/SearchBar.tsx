'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';

import React from 'react'
import { useFormStatus } from 'react-dom';

export default function SearchBar() {
    const status = useFormStatus();

    return (
        <div className='w-3xl flex gap-2'>
            <Input
                type="text"
                placeholder="Search note..."
                name='searchText'
                autoFocus
            />
            <Button disabled={status.pending} type='submit' className='w-20' variant='default'>
                {status.pending ? (
                    <LoaderCircle className='animate-spin' />
                ) : 'Search'}
            </Button>
        </div>
    )
}
