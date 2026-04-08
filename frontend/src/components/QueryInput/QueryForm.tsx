import { FormEvent } from 'react';

import { FormField } from '@/components/FormField';
import { QueryRequest } from '@/types/apiTypes';

type QueryFormProps = {
  value: QueryRequest;
  isLoading: boolean;
  error?: string | null;
  onChange: (nextValue: QueryRequest) => void;
  onSubmit: () => void;
};

export function QueryForm({
  value,
  isLoading,
  error,
  onChange,
  onSubmit,
}: QueryFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3 className="panel-title">Ask the system</h3>
      <p className="panel-copy">
        Configure retrieval depth and provide an optional conversation
        identifier to continue context.
      </p>

      <FormField
        label="Question"
        htmlFor="question"
        helpText="This is sent directly to the backend query endpoint."
        error={error}
      >
        <textarea
          className="field-control textarea"
          id="question"
          value={value.question}
          onChange={(event) =>
            onChange({ ...value, question: event.target.value })
          }
          placeholder="What are the current risks in the knowledge base coverage?"
        />
      </FormField>

      <div className="two-column-layout">
        <FormField
          label="Conversation ID"
          htmlFor="conversationId"
          helpText="Leave empty to start a new conversation."
        >
          <input
            className="field-control"
            id="conversationId"
            value={value.conversation_id ?? ''}
            onChange={(event) =>
              onChange({
                ...value,
                conversation_id: event.target.value || undefined,
              })
            }
            placeholder="ops-review-001"
          />
        </FormField>

        <FormField
          label="Top K"
          htmlFor="topK"
          helpText="Allowed range is 1 to 25."
        >
          <input
            className="field-control"
            id="topK"
            max={25}
            min={1}
            type="number"
            value={value.top_k}
            onChange={(event) =>
              onChange({ ...value, top_k: Number(event.target.value) || 1 })
            }
          />
        </FormField>
      </div>

      <div className="button-row">
        <button className="button" disabled={isLoading} type="submit">
          {isLoading ? 'Running query...' : 'Run query'}
        </button>
      </div>
    </form>
  );
}
