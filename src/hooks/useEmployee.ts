// src/hooks/useEmployees.ts
import { useState, useEffect } from 'react';
import { Employee } from '@/types';

interface Filters {
  search?: string;
  state?: string;
  gender?: string;
  isActive?: boolean | null;
  page?: number;
}

export function useEmployees(filters: Filters = {}) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search)   params.set('search', filters.search);
    if (filters.state)    params.set('state', filters.state);
    if (filters.gender)   params.set('gender', filters.gender);
    if (filters.isActive !== undefined && filters.isActive !== null)
      params.set('isActive', String(filters.isActive));
    if (filters.page)     params.set('page', String(filters.page));

    setLoading(true);
    fetch(`/api/employees?${params}`)
      .then(r => r.json())
      .then(data => {
        setEmployees(data.employees || []);
        setTotal(data.total || 0);
      })
      .catch(() => setError('Failed to load employees'))
      .finally(() => setLoading(false));
  }, [filters.search, filters.state, filters.gender, filters.isActive, filters.page]);

  return { employees, total, loading, error };
}