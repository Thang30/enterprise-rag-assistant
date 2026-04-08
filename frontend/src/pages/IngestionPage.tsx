import { FormEvent } from 'react';

import { FormField } from '@/components/FormField';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useIngestion } from '@/hooks/useIngestion';

export function IngestionPage() {
  const {
    form,
    setForm,
    metadataInput,
    setMetadataInput,
    response,
    isLoading,
    error,
    submit,
  } = useIngestion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <section className="page-card">
      <PageHeader
        eyebrow="Indexing"
        title="Ingest new content"
        description="Send a document source and metadata payload to the backend ingestion endpoint."
      />

      <div className="dashboard-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <FormField
            label="Source URI"
            htmlFor="sourceUri"
            helpText="File path, blob URL, or any location understood by the backend."
            error={error}
          >
            <input
              className="field-control"
              id="sourceUri"
              value={form.source_uri}
              onChange={(event) =>
                setForm({ ...form, source_uri: event.target.value })
              }
              placeholder="s3://knowledge-base/policies/security-handbook.pdf"
            />
          </FormField>

          <FormField
            label="Content type"
            htmlFor="contentType"
            helpText="Defaults to application/pdf but can be any declared media type."
          >
            <input
              className="field-control"
              id="contentType"
              value={form.content_type}
              onChange={(event) =>
                setForm({ ...form, content_type: event.target.value })
              }
              placeholder="application/pdf"
            />
          </FormField>

          <FormField
            label="Metadata JSON"
            htmlFor="metadata"
            helpText="Parsed client-side and sent as string values."
          >
            <textarea
              className="field-control textarea"
              id="metadata"
              value={metadataInput}
              onChange={(event) => setMetadataInput(event.target.value)}
            />
          </FormField>

          <div className="button-row">
            <button className="button" disabled={isLoading} type="submit">
              {isLoading ? 'Submitting job...' : 'Submit ingestion'}
            </button>
          </div>
        </form>

        <section className="panel">
          <h3 className="panel-title">Job status</h3>
          <p className="panel-copy">
            Current job information returned by the ingestion endpoint.
          </p>

          {response ? (
            <article className="status-card">
              <div className="status-meta">
                <h4 className="status-card__title">Ingestion job created</h4>
                <StatusBadge status={response.status} />
              </div>
              <p className="status-card__body">Job ID: {response.job_id}</p>
            </article>
          ) : (
            <p className="empty-state">
              Submit a document source to receive the ingestion job identifier
              and status.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
