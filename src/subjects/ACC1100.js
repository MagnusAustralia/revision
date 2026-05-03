/**
 * subjects/ACC1100.js
 * ACC1100 — Introduction to Financial Accounting
 */

import { TOPIC as T1, templates as t1 } from '../topics/acc1100/topic1'
import { TOPIC as T2, templates as t2 } from '../topics/acc1100/topic2'
import { TOPIC as T3, templates as t3 } from '../topics/acc1100/topic3'
import { TOPIC as T4, templates as t4 } from '../topics/acc1100/topic4'
import { TOPIC as T6, templates as t6 } from '../topics/acc1100/topic6'

export const SUBJECT = 'ACC1100'

export const topics = [
  { topic: T1, templates: t1 },
  { topic: T2, templates: t2 },
  { topic: T3, templates: t3 },
  { topic: T4, templates: t4 },
  { topic: T6, templates: t6 },
]