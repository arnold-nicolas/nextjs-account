import { fetchUserById } from '@/app/lib/user';
import { UserTable } from "@/app/lib/server/definitions";

export default async function ProfileView({id}: {id: string}) {
  const user: UserTable[] = await Promise.all([
    fetchUserById(id),
  ]);
  const formatKey = (key: string) =>
  key.charAt(0).toUpperCase() + key.slice(1);  

  console.log(user);

  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
      {user.map((item, index) => (
        <dl
          key={index}
          className="sm:divide-y sm:divide-gray-200"
        >
          {Object.entries(item).map(([key, value]) => (
            <div key={key} className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {formatKey(key)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  );
}