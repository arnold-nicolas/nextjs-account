import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

/**
 * The `NotFound` function returns a React component displaying a 404 Not Found message with an option
 * to go back to the signup page.
 *
 * @returns A functional component named NotFound is being returned. It contains JSX elements including
 * a frown face icon, a heading displaying "404 Not Found", a paragraph with the text "Unknown User",
 * and a Link component with the text "Go Back" that redirects to the "/signup" route.
 */
export default function NotFound() {
    return (
        <main className='flex h-full flex-col items-center justify-center gap-2'>
            <FaceFrownIcon className='w-10 text-gray-400' />
            <h2 className='text-xl font-semibold'>404 Not Found</h2>
            <p>Unknown User.</p>
            <Link
                href="/signup"
                className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
            >
                Go Back
            </Link>
        </main>
    )
}