import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import Toast from './toast'

interface ToastContextProps {
  showToast: (message: string, type?: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
    visible: boolean
  }>({
    message: '',
    type: 'success',
    visible: false,
  })

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type, visible: true })
    },
    []
  )

  const handleClose = useCallback(() => {
    setToast(t => ({ ...t, visible: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
