import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useData } from '@/Services/useData.js';

export default function MyApp() {

  const posts = useData(`/api/articles`);
  const categories = useData(`/api/categories`);

  return (
    <PublicLayout title="Coding source & developement">

      <div className="py-2 pt-4">
      <h2>Latest</h2>
      </div>

      <div className="posts-container pb-5">
        {posts.map((post) => {
          return (
            <div className="post-card" key={post.id}>
              <div className="post-title pt-1">
                <Link href={route('article', post.id )}>
                  {post.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </PublicLayout>
  );

}
