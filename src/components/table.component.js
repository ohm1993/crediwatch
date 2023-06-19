import React from 'react';

const Table = ({ columns, buttons, data, onButtonClick }) => {
  return (
    <table className='table'>
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
          <tr key={row._id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column}`}>{column === "image"? <img src={row[column]} width="50" height="50"></img>:`${row[column]}`}</td>
            ))}
            <td>
              {buttons.map((button) => (
                <button
                  className="btn btn-danger mr-2"
                  key={button.label}
                  disabled={button.disable}
                  onClick={() => onButtonClick(button.action, row._id)}
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
