import React, { ReactNode, useState } from 'react';

type ColumnType = 'text' | 'number' | 'date' | 'array' | 'component';

interface Column {
  key: string;
  title: string;
  type: ColumnType;
  sortable?: boolean; 
}

interface Row {
  [key: string]: string | number | Date | any[] | ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Row[];
  onCellClick?: (row: Row, column: Column, cellValue: any) => void;
}

type SortOrder = 'asc' | 'desc';

const Table: React.FC<TableProps> = ({ columns, data, onCellClick }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortOrder } | null>(null);

  const serialNumberColumn: Column = { key: 'serial', title: 'S.No', type: 'number', sortable: false };
  const extendedColumns = [serialNumberColumn, ...columns];

  const handleClick = (row: Row, column: Column, cellValue: any) => {
    if (onCellClick) {
      onCellClick(row, column, cellValue);
    }
  };

  const handleSort = (key: string) => {
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'asc'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        return sortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    return data;
  }, [data, sortConfig]);

  const renderCellValue = (column: Column, value: any, index?: number) => {
    if (column.key === 'serial') {
      return index !== undefined ? index + 1 : '';
    }

    switch (column.type) {
      case 'number':
        return typeof value === 'number' ? value.toFixed(2) : value;
      case 'date':
        return value instanceof Date ? value.toLocaleDateString() : value;
      case 'array':
        return Array.isArray(value) ? value.join(', ') : value;
      case 'component':
        return value;
      default:
        return value;
    }
  };

  return (
    <div className="overflow-x-auto scrollbar ">
      <table className="w-full shadow-lg border border-gray-200 p-2 rounded-2xl">
        <thead className="bg-primary text-white">
          <tr>
            {extendedColumns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable !== false && handleSort(column.key)}
                className={`p-2 border-b border-gray-300 text-center ${
                  column.key === 'serial' || column.sortable === false ? '' : 'cursor-pointer'
                } ${
                  column.key === 'serial' ? 'bg-primary' : ''
                }`}
              >
                {column.title}{' '}
                {column.sortable !== false &&
                  sortConfig?.key === column.key &&
                  (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-hoverLight' : 'bg-white'}>
              {extendedColumns.map((column) => (
                <td
                  key={column.key}
                  onClick={() => handleClick(row, column, row[column.key])}
                  className={`p-2 border-b border-gray-300 text-center  ${
                    column.key === 'serial' ? 'bg-white' : ''
                  } text-sm md:text-base`}
                >
                  {renderCellValue(column, row[column.key], rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
