import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import git from 'react-syntax-highlighter/dist/esm/languages/prism/git';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("git", git);


export default function CodeHighlight({ style = '', codeToHighlight }) {
  return (

    <Markdown
      remarkPlugins={[remarkGfm]}
      children={codeToHighlight}
      style={style}
      components={{
        code(props) {
          const {children, className, node, ...rest} = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={String(children).replace(/\n/gi, '\n')}
            language={match[1]}
            style={ (style == 'coy') ? coy : okaidia}
          />
          ) : (
          <code {...rest} className={className}>
            {children}
          </code>
          )
        }
      }}
    />
  );
}
