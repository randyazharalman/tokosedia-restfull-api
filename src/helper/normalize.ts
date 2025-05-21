export const normalizeString = (val: string) => val.trim().toLowerCase();
export const normalizeStringArray = (arr?: string[]) => (arr ?? []).map(normalizeString)