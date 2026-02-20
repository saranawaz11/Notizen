import React from 'react'
import { TypewriterTextAnimation } from './TypewriterTextAnimation'

export default function Heading() {
    return (
        <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#626868]">
                Welcome to <span className='text-[#655560]'>Notizen</span> <br />
                Where Your Thoughts Find Structure. <br />
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium capitalize">
                A quiet space for loud ideas. <br />
                <span className="text-lg uppercase">
                    <TypewriterTextAnimation
                        text="Capture ideas, manage tasks, and keep everything in one clean, distraction-free space."
                    />
                </span>
            </h3>
        </div>
    )
}
