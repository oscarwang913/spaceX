import './App.css';
import Table from './components/Table'
import SearchInput from './components/SearchInput'
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import dataContext from './context/dataContext'

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
  const [inputValue, setInputValue] = useState("")

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
    <dataContext.Provider
      value={
      { 
        sortField, 
        tableHeadTitle,
        setSortField, 
        setTableHeadTitle,
        inputValue, 
        setInputValue
      }
    }>
      <div className="App">
        <SearchInput  />
        {!data && loading && <p>Loading...</p>}
        {data && <Table rocketData={data} />}
        <button disabled={!page}onClick={back}>back</button>
        <button onClick={forward}>forward</button>
      </div>
    </dataContext.Provider>
  );
}

export default App;
