import React from 'react';
import CodeBlock from './CodeBlock';

const mlopsContent = `
Code repo: monorepo with /mobile (React Native), /backend (FastAPI), /ml (PyTorch).

Model registry: MLflow. Data versioning: DVC or DeltaLake.

Vector DB: Milvus (self-host) or Pinecone (managed).

CI/CD: GitHub Actions → Docker images → Kubernetes (EKS/GKE) + horizontal autoscaling.

Mobile inference: quantize weights with bitsandbytes 4-bit for LLM distillation or use Llama-style small models; package via ONNX + TFLite where appropriate.

Monitoring: Prometheus + Grafana for infra; ML drift detection: Evidently / WhyLogs.

Privacy: end-to-end encryption for sensitive data; implement a user consent flow for data collection. Offer “local only” mode.
`;

const MLOpsInfra: React.FC = () => {
  return (
    <div>
        <CodeBlock content={mlopsContent.trim()} language="yaml" />
    </div>
  );
};

export default MLOpsInfra;
