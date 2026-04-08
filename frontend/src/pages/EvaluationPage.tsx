import { FormEvent } from 'react';

import { FormField } from '@/components/FormField';
import { MetricsChecklist } from '@/components/MetricsPanel/MetricsChecklist';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useEvaluation } from '@/hooks/useEvaluation';

export function EvaluationPage() {
  const { form, setForm, response, isLoading, error, submit } = useEvaluation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <section className="page-card">
      <PageHeader
        eyebrow="Quality"
        title="Evaluate the pipeline"
        description="Kick off evaluation runs against named datasets and track the current execution state."
      />

      <div className="dashboard-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <FormField
            label="Dataset name"
            htmlFor="datasetName"
            helpText="Maps directly to the backend evaluation request payload."
            error={error}
          >
            <input
              className="field-control"
              id="datasetName"
              value={form.dataset_name}
              onChange={(event) =>
                setForm({ ...form, dataset_name: event.target.value })
              }
              placeholder="golden-set-v1"
            />
          </FormField>

          <FormField
            label="Candidate version"
            htmlFor="candidateVersion"
            helpText="Optional version label for the build or model under test."
          >
            <input
              className="field-control"
              id="candidateVersion"
              value={form.candidate_version ?? ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  candidate_version: event.target.value || undefined,
                })
              }
              placeholder="retriever-2026-04-08"
            />
          </FormField>

          <MetricsChecklist
            onChange={(nextMetrics) =>
              setForm({ ...form, metrics: nextMetrics })
            }
            selectedMetrics={form.metrics}
          />

          <div className="button-row">
            <button className="button" disabled={isLoading} type="submit">
              {isLoading ? 'Starting run...' : 'Start evaluation'}
            </button>
          </div>
        </form>

        <section className="panel">
          <h3 className="panel-title">Run status</h3>
          <p className="panel-copy">
            Status details from the backend response.
          </p>

          {response ? (
            <div className="status-stack">
              <article className="status-card">
                <div className="status-meta">
                  <h4 className="status-card__title">
                    Evaluation run accepted
                  </h4>
                  <StatusBadge status={response.status} />
                </div>
                <p className="status-card__body">
                  Evaluation ID: {response.evaluation_id}
                </p>
              </article>
            </div>
          ) : (
            <p className="empty-state">
              Submit an evaluation request to receive an evaluation identifier
              and current state.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
