'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { DashboardSummary } from '@/components/DashboardSummary';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { EmployeeTable } from '@/components/EmployeeTable';
import { EmployeeForm } from '@/components/EmployeeForm';
import { Employee } from '@/types';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  searchAndFilterEmployees
} from '@/utils/storage';  // ← changed from @/utils/storage

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    gender: '',
    status: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [employees, filters]);

  // ── async: fetch all employees from Supabase via API ──
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  // ── async: search + filter via API ──
  const applyFilters = async () => {
    try {
      const filtered = await searchAndFilterEmployees(
        filters.search,
        filters.gender,
        filters.status
      );
      setFilteredEmployees(filtered);
    } catch (err) {
      console.error('Failed to filter employees:', err);
    }
  };

  // ── async: add ──
  const handleAddEmployee = async (formData: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await addEmployee(formData);
      setEmployees(prev => [...prev, newEmployee]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add employee:', err);
    }
  };

  // ── async: update ──
  const handleUpdateEmployee = async (formData: Employee) => {
    try {
      const updated = await updateEmployee(formData.id, formData);
      if (updated) {
        setEmployees(prev => prev.map(e => (e.id === formData.id ? updated : e)));
        setSelectedEmployee(null);
        setShowForm(false);
      }
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

  // ── async: delete ──
  const handleDeleteEmployee = async (id: string) => {
    try {
      const success = await deleteEmployee(id);
      if (success) {
        setEmployees(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (selectedEmployee) {
      handleUpdateEmployee({ ...formData, id: selectedEmployee.id });
    } else {
      handleAddEmployee(formData);
    }
  };

  const handlePrint = () => window.print();

  const activeCount   = employees.filter(e => e.isActive).length;
  const inactiveCount = employees.filter(e => !e.isActive).length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showForm ? (
            <EmployeeForm
              employee={selectedEmployee || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setSelectedEmployee(null);
              }}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                <button
                  onClick={() => {
                    setSelectedEmployee(null);
                    setShowForm(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  + Add Employee
                </button>
              </div>

              <DashboardSummary
                totalEmployees={employees.length}
                activeEmployees={activeCount}
                inactiveEmployees={inactiveCount}
              />

              <SearchAndFilter
                onSearch={(term) => setFilters({ ...filters, search: term })}
                onFilterGender={(gender) => setFilters({ ...filters, gender })}
                onFilterStatus={(status) => setFilters({ ...filters, status })}
              />

              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {loading
                    ? 'Loading employees...'
                    : `Employees (${filteredEmployees.length})`}
                </h3>
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Print List
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
                </div>
              ) : (
                <EmployeeTable
                  employees={filteredEmployees}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteEmployee}
                  onPrint={handlePrint}
                />
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          main, main * { visibility: visible; }
          button { display: none !important; }
          table { width: 100%; }
        }
      `}</style>
    </ProtectedRoute>
  );
}