import React from 'react';

const Table = ({ columns, buttons, data, onButtonClick }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column}`}>{row[column]}</td>
            ))}
            <td>
              {buttons.map((button) => (
                <button
                  key={button.label}
                  onClick={() => onButtonClick(button.action, row.id)}
                >
                  {button.label}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
