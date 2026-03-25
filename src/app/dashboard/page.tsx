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
} from '@/utils/storage';  // ← fix import

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    gender: '',
    status: ''
  });

  useEffect(() => {
    loadEmployees(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    loadWithFilters(1);
  }, [filters]);

  const loadEmployees = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/employees?page=${page}&limit=20`);
      const data = await res.json();
      setEmployees(data.employees);
      setFilteredEmployees(data.employees);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWithFilters = async (page: number) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.gender) params.set('gender', filters.gender);
      if (filters.status === 'active') params.set('isActive', 'true');
      if (filters.status === 'inactive') params.set('isActive', 'false');
      params.set('page', String(page));
      params.set('limit', '20');

      const res = await fetch(`/api/employees?${params}`);
      const data = await res.json();
      setFilteredEmployees(data.employees);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to filter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (formData: Omit<Employee, 'id'>) => {
    try {
      await addEmployee(formData);
      loadEmployees(currentPage);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add employee:', err);
    }
  };

  const handleUpdateEmployee = async (formData: Employee) => {
    try {
      const updated = await updateEmployee(formData.id, formData);
      if (updated) {
        setFilteredEmployees(prev => prev.map(e => e.id === formData.id ? updated : e));
        setSelectedEmployee(null);
        setShowForm(false);
      }
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const success = await deleteEmployee(id);
      if (success) {
        loadEmployees(currentPage);
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

  // These counts are from ALL employees, so fetch separately
  const activeCount = employees.filter(e => e.isActive).length;
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
              onCancel={() => { setShowForm(false); setSelectedEmployee(null); }}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                <button
                  onClick={() => { setSelectedEmployee(null); setShowForm(true); }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  + Add Employee
                </button>
              </div>

              <DashboardSummary
                totalEmployees={total}
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
                  {loading ? 'Loading...' : `Employees (${total})`}
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
                <>
                  <EmployeeTable
                    employees={filteredEmployees}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteEmployee}
                    onPrint={handlePrint}
                  />

                  {/* ── Pagination ── */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                      >
                        ← Prev
                      </button>

                      {/* Page number buttons */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                        .reduce((acc: (number | string)[], p, i, arr) => {
                          if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, i) =>
                          p === '...' ? (
                            <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => setCurrentPage(p as number)}
                              className={`px-4 py-2 rounded-lg font-medium border ${
                                currentPage === p
                                  ? 'bg-green-600 text-white border-green-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {p}
                            </button>
                          )
                        )}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                      >
                        Next →
                      </button>
                    </div>
                  )}

                  <p className="text-center text-sm text-gray-500 mt-3">
                    Page {currentPage} of {totalPages} · {total} total employees
                  </p>
                </>
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