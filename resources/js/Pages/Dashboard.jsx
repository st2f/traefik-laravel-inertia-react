import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useData } from '@/Services/useData.js';

export default function Dashboard({ auth }) {

  const posts = useData(`/api/articles`);
  const categories = useData(`/api/categories`);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Article Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>

            {posts.map((post) => {
              return (
                <tr key={post.id} className="bg-white dark:bg-gray-800" >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {post.id}
                </th>
                <td className="px-6 py-4">
                <Link href={route('article.update', post.id )} >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {post.category}
                </td>
                <td className="px-6 py-4">

                </td>
              </tr>
              );
            })}

          </tbody>
        </table>
      </div>

    </AuthenticatedLayout>
  );
}
