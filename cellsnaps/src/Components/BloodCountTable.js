import React from 'react';

const BloodCountsTable = ({ rbc, wbc, platelets }) => {
  return (
    <div className="table-container">
      <h2>Blood Count Values</h2>
      <table>
        <tbody>
          <tr>
            <td><strong> Red Blood Cells </strong></td>
            <td>  {rbc}  cells/µL</td>
          </tr>
          <tr>
            <td><strong> White Blood Cells </strong></td>
            <td>  {wbc}  cells/µL</td>
          </tr>
          <tr>
            <td><strong> Platelets </strong></td>
            <td>  {platelets}  cells/µL</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BloodCountsTable;
