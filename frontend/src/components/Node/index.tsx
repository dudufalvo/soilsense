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
import TablePagination from '@mui/material/TablePagination';

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

type SoilDataType = {
  soil_data_id: string,
  moisture: number,
  sensor_id: number,
  date: string,
  time: string,
  latitude: number,
  longitude: number,
  battery: number,
  node: string
}

type FetchDataType = {
  soil_data_id: string,
  moisture: number,
  sensor_id: number,
  timestamp: string,
  latitude: number,
  longitude: number,
  battery: number,
  node: string
}

const converTimeStamp = (timestamp: string) => {
  // split time stamp in date and time
  const date = timestamp.split('T')[0];
  const time = timestamp.split('T')[1].split('.')[0];
  return {date, time};
}

const Node = ({ node_id, central }: NodeRequestType) => {
  const [data, setData] = useState<SoilDataType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/soil-data/node/${node_id}/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((response) => {
      const data = response.data;

      const soilData = data.map((item: FetchDataType) => {
        const {date, time} = converTimeStamp(item.timestamp);
        return {
          soil_data_id: item.soil_data_id,
          moisture: item.moisture,
          sensor_id: item.sensor_id,
          date: date,
          time: time,
          latitude: item.latitude,
          longitude: item.longitude,
          battery: item.battery,
          node: item.node
        }
      }
      );

      soilData.reverse();

      console.log(data)
      setData(soilData);
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
              <StyledTableCell>Soil Data ID</StyledTableCell>
              <StyledTableCell align="right">Sensor ID</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Latitude</StyledTableCell>
              <StyledTableCell align="right">Longitude</StyledTableCell>
              <StyledTableCell align="right">Battery</StyledTableCell>
              <StyledTableCell align="right">Moisture</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.soil_data_id}>
                <StyledTableCell component="th" scope="row">
                  {row.soil_data_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sensor_id}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">{row.latitude}</StyledTableCell>
                <StyledTableCell align="right">{row.longitude}</StyledTableCell>
                <StyledTableCell align="right">{row.battery}</StyledTableCell>
                <StyledTableCell align="right">{row.moisture}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default Node