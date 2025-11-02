import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useData } from '@/Services/useData.js';
import PrimaryButton from '@/Components/PrimaryButton';
import { getCatName } from '@/Services/categoryUtil.js';

export default function Dashboard({ auth }) {

  const posts = useData(`/api/articles`);
  const categories = useData(`/api/categories`);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-8 lg:px-20 lg:pe-20  lg:mx-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

        <div className="pb-6 text-gray-900 dark:text-gray-100">
          <span className="pr-6">You're logged in!</span>
          <Link href={route('article.new')}>
            <PrimaryButton>New page</PrimaryButton>
          </Link>
        </div>

        <div className="pt-2 relative overflow-x-auto">

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
                  <tr key={post.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a target="_blank" href={route('article', post.id )}>
                      <span className="inline-flex items-baseline">
                        <img src="/images/external.svg" alt="" className="self-center w-5 h-5 rounded-full mx-1" />
                        <span>{post.id}</span>
                      </span>
                    </a>
                  </th>
                  <td className="px-6 py-4">
                    <Link href={route('article.update', post.id )} >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    ({post.category})
                    {` `+getCatName(post.category, categories)}
                  </td>
                  <td className="px-6 py-4">

                  </td>
                </tr>
                );
              })}

            </tbody>
          </table>
        </div>

      </div>
      </div>
      </div>

    </AuthenticatedLayout>
  );
}
