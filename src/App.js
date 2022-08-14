import './App.css';
import Table from './components/Table'
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
  const [page, setPage] = useState(0)
  const {data, loading} = useQuery(GET_ROCKET, {
    variables: {
      offset: page,
      limit: 20
    }
  })

  const forward = () => {
    setPage(pre => pre + 20)
  }
  const back = () => {
    setPage(pre => pre - 20)
  }

  return (
    <div className="App">
      {!data && loading && <p>Loading...</p>}
      {data && 
        <Table 
          rocketData={data} 
          sortField={sortField} 
          setSortField={setSortField} 
          tableHeadTitle={tableHeadTitle}
          setTableHeadTitle={setTableHeadTitle}
        />
      }
      <button disabled={!page}onClick={back}>back</button>
      <button onClick={forward}>forward</button>
    </div>
  );
}

export default App;
