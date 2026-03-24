'use client'
import { updateNote } from '@/app/actions/notes'
import { notesTable } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNoteTitle } from '@/hooks/use-note-title'
import { useRefresh } from '@/hooks/use-refresh'
import { InferSelectModel } from 'drizzle-orm'
import React, { startTransition, useEffect, useRef, useState } from 'react'

type Note = InferSelectModel<typeof notesTable>

type Props = {
  initialData: Note
}

export default function Title({ initialData }: Props) {
  const { title, setTitle, icon, setIcon } = useNoteTitle()

  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { refresh } = useRefresh()

  // ✅ Sync BOTH title + icon
  useEffect(() => {
    setTitle(initialData.title || 'Untitled')
    setIcon(initialData.icon || '')
  }, [initialData.id])

  const enableInput = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)

    startTransition(async () => {
      try {
        await updateNote({
          id: initialData.id,
          title: newTitle || 'Untitled'
        })
        refresh()
      } catch (error) {
        console.error('Failed to update note:', error)
      }
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput()
    }
  }

  return (
    <div className="flex items-center gap-x-1">

      {/* ✅ Use GLOBAL icon */}
      {icon && (
        <p onClick={enableInput} className="cursor-pointer">
          {icon}
        </p>
      )}

      {isEditing ? (
        <Input
          ref={inputRef}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
          <Button
            onClick={enableInput}
            variant={'ghost'}
            size={'sm'}
            className="font-normal h-auto p-1"
          >
          <span className="truncate">
              {title || 'Untitled'}
          </span>
        </Button>
      )}
    </div>
  )
}