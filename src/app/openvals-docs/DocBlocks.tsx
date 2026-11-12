import type { ReactNode } from "react";

function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function H2({ children }: { children: string }) {
  return (
    <h2
      className="docsH2"
      id={anchor(children)}
      style={{ fontSize: "28px", lineHeight: 1.2, margin: "48px 0 18px", color: "var(--docs-heading)", scrollMarginTop: "90px" }}
    >
      {children}
    </h2>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="docsParagraph" style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 18px" }}>
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="docsList" style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 22px", paddingLeft: "22px" }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: "8px" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DocsTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="docsTableWrap" style={{ overflowX: "auto", border: "1px solid var(--docs-border)", borderRadius: "14px", margin: "20px 0 22px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
        <thead>
          <tr style={{ background: "var(--docs-code-bg)", color: "var(--docs-heading)", textAlign: "left" }}>
            {headers.map((head) => (
              <th key={head} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border)" }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, idx) => (
                <td key={idx} style={{ padding: "14px", borderBottom: "1px solid var(--docs-border)", color: "var(--docs-muted)", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="docsList" style={{ color: "var(--docs-muted)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 22px", paddingLeft: "22px", listStyle: "none" }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: "8px", display: "flex", gap: "10px" }}>
          <span aria-hidden style={{ color: "var(--docs-heading)", flexShrink: 0 }}>
            ☐
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
