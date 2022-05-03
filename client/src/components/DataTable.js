import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DataTable(props) {
  const styles = {
    width: "700px",
  }
  return (
    <div style={styles}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align="right">Epoch Time</TableCell>
              <TableCell align="right">Human Time</TableCell>
              <TableCell align="right">Direction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.epochTime}</TableCell>
                <TableCell align="right">{row.humanTime}</TableCell>
                <TableCell align="right">{row.direction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
//  "id": 70,
//             "epochTime": 1651208387,
//             "humanTime": "29/04/2022, 2:59:47 pm"