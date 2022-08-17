import styles from './styles/App.module.scss'
import Table from './components/Table'

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import dataContext from './context/dataContext'
import spinner from'./assets/spinner.svg';

const GET_ROCKET = gql`
  query LaunQuery($limit: Int, $offset: Int) {
    launches (limit: $limit, offset: $offset) {
      launch_date_local
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

function App() {
  const [sortField, setSortField] = useState(null)
  const [tableHeadTitle, setTableHeadTitle] = useState([
    {columnName: 'Mission Name', label: 'mission_name', order: null},
    {columnName: 'Rocket Name', label: 'rocket_name', order: null},
    {columnName: 'Rocket Type', label: 'rocket_type', order: null},
    {columnName: 'Launch Date', label: 'launch_date_local', order: null},
  ])
  
  const {data, loading} = useQuery(GET_ROCKET)

  return (
    <dataContext.Provider
      value={
      { 
        sortField, 
        tableHeadTitle,
        setSortField, 
        setTableHeadTitle,
      }
    }>
      <div className={styles.app}>
        {!data && loading && <img src={spinner} alt='loading spinner'/>}
        {data && <Table rocketData={data} className={styles.table}/>}
      </div>
    </dataContext.Provider>
  );
}

export default App;
