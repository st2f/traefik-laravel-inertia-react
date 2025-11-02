import PublicLayout from '@/Layouts/PublicLayout';
import CodeHighlighter from '@/Components/CodeHighlight';
import { useData } from '@/Services/useData.js';

export default function Article({ id }) {

  const article = useData(`/api/articles/${id}`);

  return (
    <PublicLayout title={article.title}>

      <div className="text-center py-2">
        <h1>{article.title}</h1>
      </div>

      <hr></hr>

      <div className="pt-3 pb-3">
        <CodeHighlighter
          codeToHighlight={article.content}
        />
      </div>

    </PublicLayout>
  );
}
