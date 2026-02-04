import React from 'react'
import Header from '@/app/components/Header'

export default function DashboardLayout(
    { children }: {
        children: React.ReactNode
    }
) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}
