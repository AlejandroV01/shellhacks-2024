import mermaid from "mermaid";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
};

const MarkdownRenderer = ({ markdown }: Props) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/material-dark").then(
      (mod) => setStyle(mod.default)
    );
  }, [markdown]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      darkMode: true,
      theme: "neutral",
      flowchart: {
        htmlLabels: false,
      },
    });
    mermaid.contentLoaded();
  }, [markdown, style]);

  return (
    <div className="markdown-body [&>*]:text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // @ts-expect-error: This is a custom component
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            // Handle Mermaid code blocks
            if (className === "language-mermaid") {
              return <div className="mermaid">{children}</div>;
            }

            return !inline && match ? (
              // @ts-expect-error: This is a custom component
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                style={style}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
