'use client';

interface DashboardSummaryProps {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
}

export const DashboardSummary = ({
  totalEmployees,
  activeEmployees,
  inactiveEmployees
}: DashboardSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Employees</p>
            <p className="text-3xl font-bold text-blue-600">{totalEmployees}</p>
          </div>
          <div className="text-4xl text-blue-200">👥</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Active Employees</p>
            <p className="text-3xl font-bold text-green-600">{activeEmployees}</p>
          </div>
          <div className="text-4xl text-green-200">✓</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Inactive Employees</p>
            <p className="text-3xl font-bold text-red-600">{inactiveEmployees}</p>
          </div>
          <div className="text-4xl text-red-200">✗</div>
        </div>
      </div>
    </div>
  );
};
