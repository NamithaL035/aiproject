import React from 'react';
import CodeBlock from './CodeBlock';

const sprintTasksContent = `
Phase 1 (MVP) — deliverables:

- [ ] Mobile skeleton (RN) & FastAPI backend.
- [ ] User profile screen + manual expense entry.
- [ ] Dashboard (charts) using Recharts.
- [ ] Budget estimator (server-side Bayesian regression) + basic UI.
- [ ] Quotation prototype using static price dataset (CSV) + simple aggregator.
- [ ] Tests: unit tests for API, integration tests for estimator.

Done when all endpoints pass integration tests and pilot users can create entries and receive a budget + quote.

Phase 2 → Phase 4: add AI components (LLM RAG, optimizer, OCR, voice), family sync, store integrations; each with its own test suite & pilot rollout.
`;

const SprintTasks: React.FC = () => {
  return (
    <div>
      <CodeBlock content={sprintTasksContent.trim()} language="markdown" />
    </div>
  );
};

export default SprintTasks;
