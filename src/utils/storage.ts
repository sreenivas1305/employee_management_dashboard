import { Employee } from '@/types';
import { MOCK_EMPLOYEES } from '@/lib/mockData';

const EMPLOYEES_STORAGE_KEY = 'employees';

export const getEmployees = (): Employee[] => {
  if (typeof window === 'undefined') return MOCK_EMPLOYEES;
  
  const stored = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : MOCK_EMPLOYEES;
};

export const saveEmployees = (employees: Employee[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
};

export const addEmployee = (employee: Omit<Employee, 'id'>): Employee => {
  const employees = getEmployees();
  
  // Generate next sequential ID
  const nextId = employees.length > 0 
    ? (Math.max(...employees.map(e => parseInt(e.id))) + 1).toString()
    : '1';
  
  const newEmployee: Employee = {
    ...employee,
    id: nextId
  };
  employees.push(newEmployee);
  saveEmployees(employees);
  return newEmployee;
};

export const updateEmployee = (id: string, updates: Partial<Employee>): Employee | null => {
  const employees = getEmployees();
  const index = employees.findIndex(e => e.id === id);
  
  if (index === -1) return null;
  
  employees[index] = { ...employees[index], ...updates };
  saveEmployees(employees);
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const employees = getEmployees();
  const filtered = employees.filter(e => e.id !== id);
  
  if (filtered.length === employees.length) return false;
  
  saveEmployees(filtered);
  return true;
};

export const searchAndFilterEmployees = (
  searchTerm: string = '',
  genderFilter: string = '',
  statusFilter: string = ''
): Employee[] => {
  let employees = getEmployees();

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    employees = employees.filter(emp =>
      emp.fullName.toLowerCase().includes(term)
    );
  }

  if (genderFilter) {
    employees = employees.filter(emp => emp.gender === genderFilter);
  }

  if (statusFilter) {
    const isActive = statusFilter === 'active';
    employees = employees.filter(emp => emp.isActive === isActive);
  }

  return employees;
};
