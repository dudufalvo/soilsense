import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

import styles from './centrals.module.scss'

import Tabs from 'components/Tab'
import CentralForm from 'components/CentralForm'

type TableMessageType = {
  central_id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Centrals = () => {
  const [data, setData] = useState<TableMessageType[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/central/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
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

  return (
    <>
      <div className={styles.accountOptions}>
        <div className={styles.accountOptionsContent}>
          <span>My Centrals</span>
        </div>
        <Tabs
          tabs={
            data.map((item) => {
              return {
                title: item.name.toUpperCase(),
                children: <CentralForm central_id={item.central_id} name={item.name} latitude={item.latitude} longitude={item.longitude} />
              }
            })
          } />
      </div>
    </>
  )
}

export default Centrals
