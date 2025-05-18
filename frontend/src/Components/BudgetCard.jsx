import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

/* Budget Data */
const data = [
  { name: 'Spent', value: 90 },  
  { name: 'Remaining', value: 10 },
];

// Hardcoded variables for total budget and spent budget
const budgetTotal = 100; 
const budgetSpent = 90;

const BudgetCard = () => {
  const { isDarkMode } = useTheme();

  const COLORS = isDarkMode 
    ? ['#A6E22E', '#374151'] // Dark mode colors
    : ['#005339', '#E8F5E9']; // Light mode colors

  return (
    <div 
      className={`rounded-2xl flex flex-col items-center justify-center p-4 h-[170px] transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 shadow-none' 
          : 'bg-white shadow-sm border border-gray-100'
      }`}
    >
      {/* Title */}
      <h2 className={`font-[Montserrat] text-[15px] font-medium mb-2 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Monthly Budget
      </h2>

      {/* Pie Chart */}
      <div className="relative">
        <PieChart width={80} height={80}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={38}
            paddingAngle={0}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        {/* Percentage in middle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {budgetSpent}%
          </span>
        </div>
      </div>

      {/* Budget info */}
      <div className="mt-3 text-center">
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className={`font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            PKR {budgetSpent}K
          </span>
          {' '}of {budgetTotal}K
        </p>
      </div>
    </div>
  );
};

export default BudgetCard;
