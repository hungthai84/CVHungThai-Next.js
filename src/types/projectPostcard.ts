export interface ProjectPostcardData {
  projectId: string;
  phaseCode: string;
  headline: string;
  summary: string;
  role: string;
  timeframe: string;
  context: string;
  challenges: string[];
  objectives: string[];
  solutions: {
    summary: string;
    people?: string[];
    process?: string[];
    technology?: string[];
    customer?: string[];
  };
  implementation: {
    step: string;
    title: string;
    desc: string;
    value?: string;
  }[];
  scale?: { label: string; value: string }[];
  systems?: string[];
  metrics: { label: string; value: string; desc?: string }[];
  results: string[];
  keyMessage: string;
}

export interface ProjectAudioMetadata {
  enabled: boolean;
  src: string;
  voice: string;
  model: string;
  duration?: string;
  generatedAt?: string;
  contentHash?: string;
}
