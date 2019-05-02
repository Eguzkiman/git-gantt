import { schema } from 'normalizr';

export const RepoSchema = new schema.Entity('repo');
export const MilestoneSchema = new schema.Entity('milestone');
export const IssueSchema = new schema.Entity('issues');