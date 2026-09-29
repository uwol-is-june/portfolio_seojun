import type { FinalDiagnosisResult, DiagAnswers } from './final-diagnosis';
import type { ApplicantType, Role } from './self-diagnosis';
import { replacesApplicantType, type SpecialConditionState } from './special-condition';
import {
  DEBT_DOC_GUIDE,
  REVIEW_CAREER_DOCS,
  REVIEW_COMMON_DOCS,
  REVIEW_DOCS_GROUP_NOTE,
  REVIEW_DOCS_GROUP_TITLE,
  TRANSFER_DOCS_GROUP,
  getDocGroups,
  getSpecialConditionDocs,
  type DocGroup,
  type DocItem,
} from './rules/documents';
import { LIMIT_B } from './rules/limit-items';
import { TODO_GROUPS, allTodoItems } from './rules/todo-items';

export type DocsInput = {
  type: ApplicantType;
  role: Role;
  special: SpecialConditionState;

  result: FinalDiagnosisResult;

  answers: DiagAnswers;
};

export type DocChecks = Record<string, boolean | undefined>;

export function checkKey(type: ApplicantType, name: string): string {
  return `d_${type}_${name}`;
}

export function todoKey(name: string): string {
  return `todo_${name}`;
}

export function getTodoGroups(): readonly DocGroup[] {
  return TODO_GROUPS;
}

export function buildDocGroups(input: DocsInput): DocGroup[] {

  const groups: DocGroup[] = getDocGroups(
    input.type,
    input.role,
    replacesApplicantType(input.special.condition),
  );

  const flaggedB = LIMIT_B.filter((item) => {
    const answer = input.answers[item.id];
    return answer === 'bad' || answer === 'blocked';
  });

  if (flaggedB.length > 0) {
    const itemDocs: DocItem[] = flaggedB
      .filter((item) => item.doc)
      .map((item) => ({
        n: item.doc!.n,
        s: `📌 ${item.n} 해당`,
        org: false,

        guide: item.id === 'fin_acc_reg' ? DEBT_DOC_GUIDE : item.doc!.s,
      }));

    const careerDocs = input.type === 'new' ? REVIEW_CAREER_DOCS : [];
    groups.push({
      t: REVIEW_DOCS_GROUP_TITLE,
      i: [...itemDocs, ...REVIEW_COMMON_DOCS, ...careerDocs],
      note: REVIEW_DOCS_GROUP_NOTE,
      review: true,
    });
  }

  const specialDocs = getSpecialConditionDocs(input.special.condition, input.special.foreignerCode);
  if (specialDocs) groups.push(specialDocs);

  if (input.result.needsTransferDocs) groups.push(TRANSFER_DOCS_GROUP);

  return groups;
}

export type DocProgress = { done: number; total: number; percent: number };

function progress(done: number, total: number): DocProgress {
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function countDocProgress(
  groups: readonly DocGroup[],
  type: ApplicantType,
  checks: DocChecks,
): DocProgress {
  let total = 0;
  let done = 0;
  for (const group of groups) {
    for (const item of group.i) {
      total += 1;
      if (checks[checkKey(type, item.n)]) done += 1;
    }
  }
  return progress(done, total);
}

export function countTodoProgress(checks: DocChecks): DocProgress {
  const items = allTodoItems();
  const done = items.filter((item) => checks[todoKey(item.n)]).length;
  return progress(done, items.length);
}

export function isDocsComplete(
  groups: readonly DocGroup[],
  type: ApplicantType,
  checks: DocChecks,
): boolean {
  const docs = countDocProgress(groups, type, checks);
  const todos = countTodoProgress(checks);
  return docs.total > 0 && docs.done === docs.total && todos.done === todos.total;
}
