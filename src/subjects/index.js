/**
 * subjects/index.js
 *
 * Master registry of all subjects.
 * Import this anywhere you need the full subject list.
 *
 * To add a new subject:
 *   1. Create src/subjects/MYSUBJECT.js following the existing pattern
 *   2. Import and add it to the `subjects` array below
 */

import { SUBJECT as ENG1005, topics as eng1005Topics } from './ENG1005'
import { SUBJECT as ENG1014, topics as eng1014Topics } from './ENG1014'
import { SUBJECT as ENG1011, topics as eng1011Topics } from './ENG1011'
import { SUBJECT as ACC1100, topics as acc1100Topics } from './ACC1100'

export const subjects = [
  { id: 'ENG1005', name: ENG1005, topics: eng1005Topics },
  { id: 'ENG1014', name: ENG1014, topics: eng1014Topics },
  { id: 'ENG1011', name: ENG1011, topics: eng1011Topics },
  { id: 'ACC1100', name: ACC1100, topics: acc1100Topics },
]
