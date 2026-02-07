import React from 'react'
import Card from '../components/Card'
import { Plus } from 'lucide-react'

export default function page() {
    return (
        <div>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-3 mt-6'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />

                </div>
            </div>

            <div>
                <button className='h-14 w-14 grid place-content-center absolute right-10 bottom-10 rounded-lg bg-amber-800 text-accent shadow-lg pointer-cursor hover:shadow-accent-foreground'><Plus className='transition-transform duration-200 hover:scale-120' size={30} /></button>
            </div>
        </div>
    )
}
