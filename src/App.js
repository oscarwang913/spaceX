import styles from './styles/App.module.scss'
import Table from './components/Table'
import { useQuery, gql } from '@apollo/client';
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
  const {data, loading} = useQuery(GET_ROCKET)

  return (
    <div className={styles.app}>
      {!data && loading && <img src={spinner} alt='loading spinner'/>}
      {data && <Table rocketData={data} className={styles.table}/>}
    </div>
  );
}

export default App;
