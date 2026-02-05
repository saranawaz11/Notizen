import React from 'react'
import Card from '../components/Card'

export default function page() {
    return (
        <div>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-3 mt-6'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />

                </div>
            </div>
        </div>
    )
}
