import React, {useCallback} from 'react'
import {Stack, TextArea} from '@sanity/ui'
import {set, unset, type StringInputProps} from 'sanity'

/**
 * Custom text input that preserves exact pasted text
 * Prevents OS-level smart punctuation from converting curly quotes to straight quotes
 */
export function PlainTextInput(props: StringInputProps) {
  const {value, onChange, schemaType, elementProps} = props
  const rows = (schemaType.options as {rows?: number})?.rows || 4

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      // Prevent default paste which may trigger OS text substitution
      event.preventDefault()
      
      // Get the exact plain text from clipboard (preserves curly quotes)
      const pastedText = event.clipboardData.getData('text/plain')
      
      const textarea = event.currentTarget
      const start = textarea.selectionStart || 0
      const end = textarea.selectionEnd || 0
      const currentValue = value || ''
      
      // Insert pasted text at cursor position, replacing any selection
      const newValue = currentValue.substring(0, start) + pastedText + currentValue.substring(end)
      
      onChange(set(newValue))
      
      // Restore cursor position after paste
      requestAnimationFrame(() => {
        const newPosition = start + pastedText.length
        textarea.selectionStart = newPosition
        textarea.selectionEnd = newPosition
        textarea.focus()
      })
    },
    [value, onChange]
  )

  return (
    <Stack space={2}>
      <TextArea
        {...elementProps}
        value={value || ''}
        onChange={handleChange}
        onPaste={handlePaste}
        rows={rows}
      />
    </Stack>
  )
}

