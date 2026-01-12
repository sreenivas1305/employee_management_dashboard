'use client';

import { Employee } from '@/types';
import Image from 'next/image';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onPrint: () => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete, onPrint }: EmployeeTableProps) => {
  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">No employees found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Profile</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DOB</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">State</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">{employee.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={employee.profileImage}
                    alt={employee.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{employee.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{calculateAge(employee.dateOfBirth)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.state}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      employee.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this employee?')) {
                        onDelete(employee.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={onPrint}
                    className="text-green-600 hover:text-green-800 font-medium transition"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
