import React from 'react'
// import Heading from './_components/Heading'
import Heading from '@/app/(dashboard)/_components/Heading'

// import Card from '../components/Card'
// import { Plus } from 'lucide-react'
// import { getNotes } from '@/lib/queries/GetNotes'


export default async function HomePage() {

    return (
        <div className='min-h-full flex flex-col bg-[]'>
            <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
                <Heading/>
            </div>
        </div>
    )
}
