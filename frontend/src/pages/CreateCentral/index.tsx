import styles from './createcentral.module.scss'
import InputText from 'components/Form/InputText'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/Button'
import * as yup from 'yup'
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

type MessageType = {
  name: string;
  latitude: number;
  longitude: number;
}

type TableMessageType = {
  central_id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  latitude: yup.number().required('Latitude is required'),
  longitude: yup.number().required('Longitude is required')
})

const CreateCentral = () => {
  const [data, setData] = useState<TableMessageType[]>([]);

  useEffect(() => {
    axios.get(`${process.env.VITE_API_BASE_URL}/users/central/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((response) => {
      const data = response.data;
      setData(data);
    }
    )
    .catch((error) => {
      console.log(error);
    });
  }
  , []);

  const methods = useForm<MessageType>({
    resolver: yupResolver(validationSchema)
  })

  const handleSendMessage = (data: MessageType) => {
    axios.post(`${process.env.VITE_API_BASE_URL}/central/create`, { data }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(() => {
        toast.success('Message sent successfully')
      })
      .catch(() => {
        toast.error('Failed to send message')
      })
  }

  return (
    <div className={styles.main}>
      <div className={styles.table}>
        <span>New Central</span>

        <div className={styles.forms}>
          <FormProvider {...methods}>
            <form className={styles.reviewModal}>
              <InputText label='Name' name='name' id='name' placeholder="Enter the central's name" isRequired={true} />
              <InputText type='number' label='Latitude' name='latitude' id='latitude' placeholder="Enter the central's latitude" isRequired={true} />
              <InputText type='number' label='Longitude' name='longitude' id='longitude' placeholder="Enter the central's longitude" isRequired={true} />
              <Button type='submit' variant='filled' fullWidth handle={methods.handleSubmit(handleSendMessage)}>Create Central</Button>
            </form>
          </FormProvider>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>CentralId</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Latitude</StyledTableCell>
                <StyledTableCell align="right">Longitude</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.central_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.central_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.latitude}</StyledTableCell>
                  <StyledTableCell align="right">{row.longitude}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default CreateCentral
