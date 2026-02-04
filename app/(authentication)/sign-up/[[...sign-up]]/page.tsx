import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex inset-0 h-dvh justify-center items-center'>
            <SignUp />
        </div>
    )
}