import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded" {...props}>
              {children}
            </code>
          );
        },
        a({ children, href }) {
          return (
            <a href={href} target="_blank" rel="noreferrer" className="text-blue-400 underline">
              {children}
            </a>
          );
        },
        table({ children }) {
          return <table className="table-auto border-collapse w-full">{children}</table>;
        },
        th({ children }) {
          return <th className="border border-gray-600 px-2 py-1 bg-gray-800">{children}</th>;
        },
        td({ children }) {
          return <td className="border border-gray-700 px-2 py-1">{children}</td>;
        },
      }}
    >
      {content || ""}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;


