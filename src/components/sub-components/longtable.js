import React from "react";
const LongTable = (props) => {
  return (
    <table cellSpacing="5" cellPadding="5">
      <thead>
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>dominic</td>
        </tr>
      </tbody>
      <tfoot>
        <td>Total</td>
        <td>100</td>
      </tfoot>
    </table>
  );
};
export default LongTable;
