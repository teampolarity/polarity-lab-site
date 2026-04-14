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
    thesis: 'Recommendation surfaces what is popular nearby, not what exists. Polarity GPS is being built to measure that gap.',
    evidenceState: 'platform-live-study-pending',
    evidenceLabel: 'Platform live, formal study pending',
    href: '/projects/polarity-gps',
  },
  {
    name: 'WAXFEED',
    slug: 'waxfeed',
    thesis: 'Recommendation platforms build a model of the listener from engagement history. That model drifts from who the person actually is. WAXFEED is the counter-environment designed to surface what it has suppressed.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-environment in development',
    href: '/projects/waxfeed',
  },
  {
    name: 'AVDP',
    slug: 'avdp',
    thesis: 'Conventional interview formats suppress authentic expression. AVDP removes the production conditions that cause suppression and tests whether more of the person comes through.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-format in development',
    href: '/projects/avdp',
  },
];
