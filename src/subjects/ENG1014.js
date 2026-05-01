/**
 * subjects/ENG1014.js
 *
 * Subject: ENG1014
 * Status:  Scaffold — subtopics defined, templates not yet written.
 *
 * To add templates for a subtopic:
 *   1. Import or write your compute function in src/engine/computations.js
 *   2. Add a template object to the relevant subtopic array below
 *   3. The app will automatically pick it up on next run
 */

export const SUBJECT = 'ENG1014'

// Each entry describes a subtopic that belongs to this subject.
// `templates` arrays are intentionally empty — add your own as you go.
export const topics = [
  {
    topic: 'Topic 1',           // ← rename to match your actual topic name
    subtopics: [
      { name: 'Subtopic 1A', templates: [] },
      { name: 'Subtopic 1B', templates: [] },
    ],
  },
  {
    topic: 'Topic 2',
    subtopics: [
      { name: 'Subtopic 2A', templates: [] },
      { name: 'Subtopic 2B', templates: [] },
    ],
  },
]
