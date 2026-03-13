// app/components/ErrorBoundary.tsx
'use client'
import { Component, ReactNode } from 'react'

class ErrorBoundary extends Component<{children: ReactNode}, {error: Error | null}> {
    state = { error: null }
    componentDidCatch(error: Error) {
        console.error('Exact error source:', error)
        this.setState({ error })
    }
    render() {
        if (this.state.error) return <pre>{(this.state.error as Error).stack}</pre>
        return this.props.children
    }
}

export default ErrorBoundary