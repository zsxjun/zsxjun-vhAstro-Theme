import { execSync } from "child_process";

const COMMITER_DATE_ISO_FORMAT = "%cI";

export default function getFileCreateTime(filePath: string, type: string): Date {
  try {
    const result = execSync(`git log --pretty=format:"${COMMITER_DATE_ISO_FORMAT}" ${filePath}`).toString();
    if (!result) {
      throw new Error('Git command failed to execute');
    }
    const commits = result.split(/\r?\n/g);
    return new Date(commits[type == 'create' ? commits.length - 1 : 0]);
  } catch (e) {
    // not committed yet
    return new Date();
  }
}