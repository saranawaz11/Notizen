'use client'
import { motion } from "motion/react"

export function TypewriterTextAnimation({ text }: { text: string }) {
    return (
        <>
            {text.split("").map((letter, i) => (

                <motion.span key={i} className="relative">

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.025 }}
                    >
                        {letter}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            delay: i * 0.025,
                            duration: 0.4,
                            times: [0, 0.1, 1]
                        }}
                        className="absolute bottom-[3px] left-px right-0 top-[3px] bg-neutral-950" />
                </motion.span>

            ))}
        </>
    )
}