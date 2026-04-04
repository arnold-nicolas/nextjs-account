import { UserCircleIcon } from '@heroicons/react/24/outline';
import Profile from '@/app/ui/profileview';
import { notFound } from 'next/navigation';
import { fetchUserById } from '@/app/lib/user';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const user = await Promise.all([
        fetchUserById(id),
    ]);

    if (user[0] === undefined) {
        console.log("not found.");
        notFound();
    }

    return (
    <main className="min-h-180 flex items-center justify-center p-20 leading-[1.6]">
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <div className=" flex items-center">
                    <UserCircleIcon className="h-14 w-14 text-gray-400" />
                    <h3 className="text-lg leading-6 font-medium text-gray-900 p-2">
                        User Profile
                    </h3>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <Profile user={user} />
        </div>
    </main>
    );
}