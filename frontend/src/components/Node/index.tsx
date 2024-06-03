import styles from './node.module.scss'
import axios from 'axios'
import toast from 'utils/toast'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type NodeRequestType = {
  node_id: string;
  central: number;
}

const Node = ({node_id, central}: NodeRequestType) => {
  const [data, setData] = useState<NodeRequestType[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/soil-data/node/${node_id}/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((response) => {
      const data = response.data;
      console.log(data)
      setData(data);
    }
    )
    .catch((error) => {
      console.log(error);
    });
  }
  , []);

  return (
    <div className={styles.main}>
      <h2>{`${node_id.toUpperCase()}`}</h2>
      <TableContainer component={Paper} key={node_id}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Node ID</StyledTableCell>
              <StyledTableCell align="right">Central ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={node_id}>
              <StyledTableCell component="th" scope="row">
                {node_id}
              </StyledTableCell>
              <StyledTableCell align="right">{central}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Node