type SourcesListProps = {
  sources: string[];
};

export function SourcesList({ sources }: SourcesListProps) {
  return (
    <section className="panel">
      <h3 className="panel-title">Retrieved sources</h3>
      <p className="panel-copy">
        Evidence returned by the RAG backend for the latest response.
      </p>
      {sources.length === 0 ? (
        <p className="empty-state">
          No sources were returned for the current query.
        </p>
      ) : (
        <div className="source-stack">
          {sources.map((source, index) => (
            <article className="source-card" key={`${source}-${index}`}>
              <p className="source-card__body">{source}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
