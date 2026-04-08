import { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="page-title">{title}</h2>
        <p className="page-lead">{description}</p>
      </div>
      {actions}
    </header>
  );
}
