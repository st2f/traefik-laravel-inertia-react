import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CodeHighlight({ id, className = '', style = '', codeToHighlight }) {
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
