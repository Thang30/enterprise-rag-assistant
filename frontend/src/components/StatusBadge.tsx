type StatusBadgeProps = {
  status: string;
};

function normalizeStatus(status: string) {
  return status.trim().toLowerCase().replace(/\s+/g, '-');
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = normalizeStatus(status || 'unknown');

  return (
    <span className={`status-badge status-badge--${normalizedStatus}`}>
      {status}
    </span>
  );
}
