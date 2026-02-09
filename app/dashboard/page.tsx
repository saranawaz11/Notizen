import React from 'react'
import Card from '../components/Card'
import { Plus } from 'lucide-react'
import { getNotes } from '@/lib/queries/GetNotes'


export default async function page() {
    const results = await getNotes();


    // console.log('Result is:- ', results);


    return (
        <div>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-3 my-10'>

                    {
                        results.map((note) => (
                            <Card data={note} key={note.id} />
                        ))
                    }

                </div>
            </div>
            {/* <p>{JSON.stringify(results)}</p> */}
            <div>
                <button className='h-14 w-14 grid place-content-center fixed right-10 bottom-7 rounded-lg bg-amber-800 text-accent shadow-lg pointer-cursor hover:shadow-accent-foreground'><Plus className='transition-transform duration-200 hover:scale-120' size={30} /></button>
            </div>
        </div>
    )
}
