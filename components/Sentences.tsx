import { Fragment } from "react";

/**
 * Renders text so each sentence stays together: a sentence moves to the next line as a
 * whole, and only wraps inside itself if it's too long for the screen.
 * Pass an array to choose the sentences yourself, or a string to split on ". ".
 */
export default function Sentences({ text, className = "" }: { text: string | string[]; className?: string }) {
  const parts = Array.isArray(text) ? text : text.split(/(?<=\.)\s+/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={`inline-block ${className}`}>{part}</span>
        </Fragment>
      ))}
    </>
  );
}
