'use client'

import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm } from '@tanstack/react-form-nextjs'
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

Modal.setAppElement('body')

type Props = {
    modalIsOpen: boolean
    closeModal: () => void
}

export default function EditModal({ modalIsOpen, closeModal }: Props) {
    const [tagInput, setTagInput] = useState('')

    const form = useForm({
        defaultValues: {
            title: '',
            note: '',
            tags: [] as string[],
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            closeModal()
        },
    })

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Note"
            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
            className="bg-white rounded-lg p-6 w-full max-w-md outline-none"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Note</h2>
                <button onClick={closeModal} className="text-muted-foreground">
                    <X size={18} />
                </button>
            </div>

            <form
                id="edit-note-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
                className="space-y-4"
            >
                <FieldGroup>
                    {/* Title */}
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) => (!value ? 'Title is required' : undefined),
                        }}
                    >
                        {(field) => (
                            <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                                <FieldLabel className="text-muted-foreground">
                                    Title
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Enter note title"
                                    />
                                    {/* <FieldError errors={field.state.meta.errors} /> */}
                                </FieldContent>
                            </Field>
                        )}
                    </form.Field>

                    {/* Note */}
                    <form.Field
                        name="note"
                        validators={{
                            onChange: ({ value }) => (!value ? 'Note is required' : undefined),
                        }}
                    >
                        {(field) => (
                            <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                                <FieldLabel className="text-muted-foreground">
                                    Note
                                </FieldLabel>
                                <FieldContent>
                                    <Textarea
                                        rows={7}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Write your note..."
                                    />
                                    {/* <FieldError errors={field.state.meta.errors} /> */}
                                </FieldContent>
                            </Field>
                        )}
                    </form.Field>
                </FieldGroup>

                {/* Tags */}
                <form.Field name="tags">
                    {(field) => (
                        <div className="space-y-2">
                            <FieldLabel className="text-muted-foreground">
                                Tags
                            </FieldLabel>

                            {/* Existing tags */}
                            <div className="flex flex-wrap gap-2">
                                {field.state.value.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-secondary text-secondary-foreground"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                field.handleChange(
                                                    field.state.value.filter((_, i) => i !== index)
                                                )
                                            }
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Tag input BELOW */}
                            <Input
                                value={tagInput}
                                placeholder="Press Enter to add tag"
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && tagInput.trim()) {
                                        e.preventDefault()
                                        const tag = tagInput.trim()
                                        if (!field.state.value.includes(tag)) {
                                            field.handleChange([...field.state.value, tag])
                                        }
                                        setTagInput('')
                                    }
                                }}
                            />
                        </div>
                    )}
                </form.Field>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset()
                            closeModal()
                        }}
                    >
                        Cancel
                    </Button>

                    <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit || isSubmitting}>
                                {isSubmitting ? 'Saving…' : 'Save'}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </form>
        </Modal>
    )
}
