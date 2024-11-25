import styles from './markdown.module.css';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import supersub from 'remark-supersub';

interface MarkdownProps {
  content: string;
}

const MAX_LENGTH_FOR_GFM = 10000; // remarkGfm lags with large content

const Markdown = ({ content }: MarkdownProps) => {
  const remarkPlugins: any[] = [[supersub]];

  if (content.length <= MAX_LENGTH_FOR_GFM) {
    remarkPlugins.push([remarkGfm, { singleTilde: false }]);
  }

  return (
    <span className={styles.markdown}>
      <ReactMarkdown
        children={content}
        remarkPlugins={remarkPlugins}
        rehypePlugins={[[rehypeSanitize]]}
        components={{
          a: ({ children, href }) => (
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {children}
            </a>
          ),
          img: ({ src }) => <img src={src} alt=''  />,
          video: ({ src }) => <video src={src} controls autoPlay loop muted />,
        }}
      />
    </span>
  );
};

export default Markdown;
