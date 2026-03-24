// src/utils/storage.ts
import { Employee } from '@/types';

// ── helpers ──────────────────────────────────────────────────────────────────

function buildQuery(params: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') query.set(k, v);
  });
  return query.toString();
}

// ── READ ─────────────────────────────────────────────────────────────────────

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await fetch('/api/employees');
  if (!res.ok) throw new Error('Failed to fetch employees');
  const data = await res.json();
  return data.employees;
};

export const searchAndFilterEmployees = async (
  searchTerm: string = '',
  genderFilter: string = '',
  statusFilter: string = ''
): Promise<Employee[]> => {
  const query = buildQuery({
    search: searchTerm,
    gender: genderFilter,
    isActive:
      statusFilter === 'active'
        ? 'true'
        : statusFilter === 'inactive'
        ? 'false'
        : undefined,
  });

  const res = await fetch(`/api/employees?${query}`);
  if (!res.ok) throw new Error('Failed to fetch employees');
  const data = await res.json();
  return data.employees;
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const res = await fetch(`/api/employees/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch employee');
  return res.json();
};

// ── CREATE ────────────────────────────────────────────────────────────────────

export const addEmployee = async (
  employee: Omit<Employee, 'id'>
): Promise<Employee> => {
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error('Failed to add employee');
  return res.json();
};

// ── UPDATE ────────────────────────────────────────────────────────────────────

export const updateEmployee = async (
  id: string,
  updates: Partial<Employee>
): Promise<Employee | null> => {
  const res = await fetch(`/api/employees/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to update employee');
  return res.json();
};

// ── DELETE ────────────────────────────────────────────────────────────────────

export const deleteEmployee = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error('Failed to delete employee');
  return true;
};

// ── LEGACY SYNC STUBS (remove once all callers are updated) ──────────────────
// If any component still calls the old sync versions, these will throw a
// helpful error instead of silently returning stale localStorage data.

export const saveEmployees = (_employees: Employee[]): never => {
  throw new Error(
    'saveEmployees() is removed. Use addEmployee / updateEmployee / deleteEmployee instead.'
  );
};