import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useData } from '@/Services/useData.js';
import { getCatName } from '@/Services/categoryUtil.js';

export default function MyApp() {

  const posts = useData(`/api/articles`);
  const categories = useData(`/api/categories`);

  return (
    <PublicLayout title="Develop, learn, experiment">

      <div className="py-2 pt-5">
      <h2>Latest</h2>
      </div>

      <div className="posts-container pb-5 leading-7">
        {posts.map((post) => {
          return (
            <div className="post-card" key={post.id}>
              <div className="post-title pt-1">
                <Link href={route('article', post.id )}>
                  {post.title + ' '}
                  <span className="inline-flex shrink-0 items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20 ring-inset">
                    {getCatName(post.category, categories)}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </PublicLayout>
  );

}
