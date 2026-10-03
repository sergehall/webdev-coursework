import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="owner-page-header">
      <p className="owner-eyebrow">My account</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function Message({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={`owner-message ${error ? "owner-message--error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
