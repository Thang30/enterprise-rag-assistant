import { ChangeEvent } from 'react';

const availableMetrics = [
  'faithfulness',
  'answer_relevance',
  'context_precision',
  'context_recall',
  'latency',
  'cost',
];

type MetricsChecklistProps = {
  selectedMetrics: string[];
  onChange: (nextMetrics: string[]) => void;
};

export function MetricsChecklist({
  selectedMetrics,
  onChange,
}: MetricsChecklistProps) {
  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    if (checked) {
      onChange([...selectedMetrics, value]);
      return;
    }

    onChange(selectedMetrics.filter((metric) => metric !== value));
  };

  return (
    <div>
      <h3 className="panel-title">Metrics</h3>
      <p className="panel-copy">
        Choose the metrics to compute for the evaluation run.
      </p>
      <div className="checkbox-grid">
        {availableMetrics.map((metric) => (
          <label className="checkbox-card" key={metric}>
            <input
              checked={selectedMetrics.includes(metric)}
              onChange={handleToggle}
              type="checkbox"
              value={metric}
            />
            <span>{metric}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
