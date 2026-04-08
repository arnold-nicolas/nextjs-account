import { fetchUserById } from '@/app/lib/user';
import { UserProfile } from "@/app/lib/server/definitions";

/**
 * The function `ProfileView` is a React component that displays user profile information in a
 * formatted way.
 *
 * @param {UserProfile} user - takes a prop `user` which is an array of `UserProfile` objects.
 * Inside the component, it maps over the `user` array and renders a definition list (`dl`) for
 * each `UserProfile` object.
 *
 * @returns The `ProfileView` function is being returned. It is a React component that takes a prop
 * `user` which is an array of `UserProfile` objects. Inside the component, it maps over the `user`
 * array and renders a list of key-value pairs for each `UserProfile` object. The keys are formatted to
 * have the first letter capitalized, and the values are displayed in a grid layout with
 */
export default async function ProfileView({user}: {user: UserProfile[]}) {
  const formatKey = (key: string) =>
  key.charAt(0).toUpperCase() + key.slice(1);  

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