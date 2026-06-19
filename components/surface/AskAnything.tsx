'use client'

import { useState } from 'react'
import { ExplainDrawer } from '@/components/trust/ExplainDrawer'

export function AskAnything() {
  const [value, setValue] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      setDrawerOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask any question..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-0 py-0 text-[15px] text-ink bg-transparent border-0
                     placeholder:text-ink focus:outline-none"
        />
      </form>
      <ExplainDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setValue('') }}
        title={value || 'Ask anything'}
        content={null}
      />
    </>
  )
}
