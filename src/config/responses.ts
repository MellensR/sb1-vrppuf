export const standardResponses = [
  'ENTRY LOGGED'
];

export const statusResponses = [
  'ALL SYSTEMS OPERATIONAL',
  'ATMOSPHERIC CONDITIONS: STABLE',
  'SHIP SYSTEMS: FUNCTIONAL',
  'NAVIGATION: ON COURSE',
  'POWER LEVELS: OPTIMAL',
  'SECURITY PROTOCOLS: ACTIVE'
];

export const d6Responses = {
  6: "Affirmative. Situation NOMINAL.",
  5: "Affirmative. Proceed with caution.",
  4: "Affirmative. Mother sees it feasible.",
  3: "Uncertain. Mother requires more data.",
  2: "Negative. Mother advises against it.",
  1: "Negative. Critical system alert!"
} as const;