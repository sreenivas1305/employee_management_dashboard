'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { DashboardSummary } from '@/components/DashboardSummary';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { EmployeeTable } from '@/components/EmployeeTable';
import { EmployeeForm } from '@/components/EmployeeForm';
import { Employee } from '@/types';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee, searchAndFilterEmployees } from '@/utils/storage';

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
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

  const loadEmployees = () => {
    const data = getEmployees();
    setEmployees(data);
    setFilteredEmployees(data);
  };

  const applyFilters = () => {
    const filtered = searchAndFilterEmployees(
      filters.search,
      filters.gender,
      filters.status
    );
    setFilteredEmployees(filtered);
  };

  const handleAddEmployee = (formData: Omit<Employee, 'id'>) => {
    const newEmployee = addEmployee(formData);
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleUpdateEmployee = (formData: Employee) => {
    const updated = updateEmployee(formData.id, formData);
    if (updated) {
      setEmployees(employees.map(e => (e.id === formData.id ? updated : e)));
      setSelectedEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = (id: string) => {
    if (deleteEmployee(id)) {
      setEmployees(employees.filter(e => e.id !== id));
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

  const handlePrint = () => {
    window.print();
  };

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
                  Employees ({filteredEmployees.length})
                </h3>
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Print List
                </button>
              </div>

              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEditClick}
                onDelete={handleDeleteEmployee}
                onPrint={handlePrint}
              />
            </>
          )}
        </main>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          main, main * {
            visibility: visible;
          }
          button {
            display: none !important;
          }
          table {
            width: 100%;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
