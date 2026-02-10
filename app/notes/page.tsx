import React from 'react'

export default async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {

    try {
        const { notesId } = await searchParams;
        console.log('Notes id is:- ', notesId);

        if (notesId) {
            return(
                <div className='max-w-6xl bg-pink-300 mx-auto p-10'>
                    <h2> Notes Id:- {notesId}</h2>
                </div>
            )
        }
        
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}
