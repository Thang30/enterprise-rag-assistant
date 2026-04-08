import { QueryResponse } from '@/types/apiTypes';

type ChatTranscriptProps = {
  question: string;
  response: QueryResponse | null;
};

export function ChatTranscript({ question, response }: ChatTranscriptProps) {
  if (!response) {
    return (
      <p className="empty-state">
        Run a query to inspect the generated answer, retrieved sources, and
        trace identifier.
      </p>
    );
  }

  return (
    <div className="message-stack">
      <article className="message-card">
        <div className="message-card__meta">
          <h3 className="message-card__question">Latest answer</h3>
          {response.trace_id ? (
            <span className="field-help">Trace ID: {response.trace_id}</span>
          ) : null}
        </div>
        <p className="field-help">Question</p>
        <p className="message-card__answer">{question}</p>
        <p className="field-help">Answer</p>
        <p className="message-card__answer">{response.answer}</p>
      </article>
    </div>
  );
}
