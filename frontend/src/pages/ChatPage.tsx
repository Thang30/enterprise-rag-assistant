import { ChatTranscript } from '@/components/Chat/ChatTranscript';
import { PageHeader } from '@/components/PageHeader';
import { QueryForm } from '@/components/QueryInput/QueryForm';
import { SourcesList } from '@/components/SourcesPanel/SourcesList';
import { useQuery } from '@/hooks/useQuery';

export function ChatPage() {
  const { form, setForm, response, isLoading, error, submit } = useQuery();

  return (
    <section className="page-card">
      <PageHeader
        eyebrow="Assistant"
        title="Chat with the retrieval pipeline"
        description="Run live queries, inspect the generated answer, and validate source grounding from the API response."
      />

      <div className="dashboard-grid">
        <QueryForm
          error={error}
          isLoading={isLoading}
          onChange={setForm}
          onSubmit={submit}
          value={form}
        />

        <div className="panel">
          <h3 className="panel-title">Response preview</h3>
          <p className="panel-copy">
            The latest response payload is shown below.
          </p>
          <ChatTranscript question={form.question} response={response} />
        </div>
      </div>

      <div style={{ height: 20 }} />
      <SourcesList sources={response?.sources ?? []} />
    </section>
  );
}
