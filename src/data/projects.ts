// src/data/projects.ts
export type EvidenceState =
  | 'observability-pilot'
  | 'platform-live-study-pending'
  | 'design-iteration'
  | 'concept';

export interface Project {
  name: string;
  slug: string;
  thesis: string;
  evidenceState: EvidenceState;
  evidenceLabel: string;
  href: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Integrity Delta',
    slug: 'integrity-delta',
    thesis: 'Clinical AI produces gaps that standard workflow review does not surface. IΔ measures them.',
    evidenceState: 'observability-pilot',
    evidenceLabel: 'Observability confirmed, validation study designed',
    href: '/projects/integrity-delta',
  },
  {
    name: 'Polarity GPS',
    slug: 'polarity-gps',
    thesis: 'Recommendation surfaces what is popular nearby. The Proximity Index measures what exists but does not appear.',
    evidenceState: 'platform-live-study-pending',
    evidenceLabel: 'Platform live, formal study pending',
    href: '/projects/polarity-gps',
  },
  {
    name: 'WAXFEED',
    slug: 'waxfeed',
    thesis: 'Recommendation platforms build a model of the listener from engagement history. The Cognitive Gap Measure scores how far that model has drifted from who the person actually is.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-environment in development',
    href: '/projects/waxfeed',
  },
  {
    name: 'AVDP',
    slug: 'avdp',
    thesis: 'Media format constraints suppress authentic expression. AVDP removes the suppressants and measures how much more of the person comes through.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-format in development',
    href: '/projects/avdp',
  },
];
