import { getNotes } from '@/lib/queries/GetNotes';
import React from 'react';

export default async function Page({
  params,
}: {
    params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log('Notes id:', id);

  const data = await getNotes()
  console.log(data);
  

  return <div>Notes page for notesId: {id}</div>;
}
