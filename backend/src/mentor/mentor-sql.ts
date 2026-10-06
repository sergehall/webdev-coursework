// TypeORM's PostgreSQL raw query returns [rows, rowCount] for UPDATE/DELETE,
// while INSERT/SELECT return rows directly.
export function returnedRows<T>(result: unknown): T[] {
  if (!Array.isArray(result)) return [];
  return Array.isArray(result[0]) ? (result[0] as T[]) : (result as T[]);
}
