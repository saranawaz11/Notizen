import React from 'react'

export default async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | number | undefined }>
    }
) {
    const { notesId } = await searchParams;
    console.log('Notes id:- ', notesId);
    

  return (
    <div>
        <div>This is form page</div>
    </div>
  )
}
