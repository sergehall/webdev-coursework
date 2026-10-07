import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const inlineToken = /(\[([^\]]+)\]\(([^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
const verifiedExternalSources = new Set([
  "https://www.w3.org/TR/css-cascade-5/#cascade-sort",
]);

function safeSourceLink(href: string, allowed: ReadonlySet<string>) {
  return (
    allowed.has(href) &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href
      .split("")
      .some((character) => character === "\\" || character.charCodeAt(0) < 32)
  );
}

function inline(text: string, allowed: ReadonlySet<string>): ReactNode[] {
  const result: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(inlineToken)) {
    const index = match.index ?? 0;
    if (index > cursor) result.push(text.slice(cursor, index));
    const [raw, , label, href, strong, code] = match;
    if (label && href) {
      result.push(
        safeSourceLink(href, allowed) ? (
          <Link key={index} to={href}>
            {label}
          </Link>
        ) : verifiedExternalSources.has(href) ? (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ) : (
          label
        )
      );
    } else if (strong) result.push(<strong key={index}>{strong}</strong>);
    else if (code) result.push(<code key={index}>{code}</code>);
    else result.push(raw);
    cursor = index + raw.length;
  }
  if (cursor < text.length) result.push(text.slice(cursor));
  return result;
}

export default function MentorMarkdown({
  text,
  allowedSources = [],
}: {
  text: string;
  allowedSources?: { href: string }[];
}) {
  const allowed = new Set(allowedSources.map((source) => source.href));
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={blocks.length}>
          {paragraph.map((line, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {inline(line, allowed)}
            </span>
          ))}
        </p>
      );
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={blocks.length}>
          {list.map((item, index) => (
            <li key={index}>{inline(item, allowed)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  for (const line of lines) {
    const item = /^\s*[-*]\s+(.+)$/.exec(line);
    if (item) {
      flushParagraph();
      list.push(item[1]);
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return <div className="mentor-markdown">{blocks}</div>;
}
