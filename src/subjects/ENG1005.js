/**
 * subjects/ENG1005.js
 *
 * Subject: ENG1005 — Engineering Mathematics
 * Aggregates all topic template files into one subject definition.
 */

import { TOPIC as VEC_TOPIC, templates as vecTemplates }   from '../topics/vectors'
import { TOPIC as SLE_TOPIC, templates as sleTemplates }   from '../topics/systemsOfLinearEquations'
import { TOPIC as MAT_TOPIC, templates as matTemplates }   from '../topics/matrices'
import { TOPIC as EIG_TOPIC, templates as eigTemplates }   from '../topics/eigenvectorsEigenvalues'
import { TOPIC as MVC_TOPIC, templates as mvcTemplates }   from '../topics/multivariableCalculus'
import { TOPIC as CAL_TOPIC, templates as calTemplates }   from '../topics/calculus'

export const SUBJECT = 'ENG1005'

export const topics = [
  { topic: VEC_TOPIC, templates: vecTemplates },
  { topic: SLE_TOPIC, templates: sleTemplates },
  { topic: MAT_TOPIC, templates: matTemplates },
  { topic: EIG_TOPIC, templates: eigTemplates },
  { topic: MVC_TOPIC, templates: mvcTemplates },
  { topic: CAL_TOPIC, templates: calTemplates },
]
