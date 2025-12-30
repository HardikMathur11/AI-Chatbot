import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className="bg-[#27272a] text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          );
        },
        a({ children, href }) {
          return (
            <a href={href} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              {children}
            </a>
          );
        },
        // Table Styles
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4 rounded-lg border border-[#27272a]">
              <table className="w-full text-left bg-[#18181b]">{children}</table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-[#27272a] text-slate-200 uppercase text-xs font-semibold tracking-wider">{children}</thead>;
        },
        th({ children }) {
          return <th className="px-4 py-3 border-b border-[#3f3f46]">{children}</th>;
        },
        td({ children }) {
          return <td className="px-4 py-3 border-b border-[#27272a] text-slate-300 text-sm whitespace-pre-wrap">{children}</td>;
        },
        tr({ children }) {
          return <tr className="hover:bg-white/5 transition-colors">{children}</tr>;
        },
        p({ children }) {
          return <p className="mb-6 leading-relaxed text-slate-100 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-6 space-y-2 text-slate-100 last:mb-0">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-100">{children}</ol>;
        }
      }}
    >
      {content || ""}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;


