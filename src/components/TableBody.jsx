import styles from '../styles/TableBody.module.scss'
import moment from 'moment'

const TableBody = ({rocketData}) => {
  const parseData = ({mission_name, rocket, launch_date_local}, index) => {
    return (
      <tr key={index}>
        <td className={styles.body}>{mission_name}</td>
        <td className={styles.body}>{rocket.rocket_name}</td>
        <td className={styles.body}>{rocket.rocket_type}</td>
        <td className={styles.body}>{moment(launch_date_local).format('YYYY-MM-DD')}</td>
      </tr>
    )
  }

  return (
    <tbody>
      {rocketData && rocketData
      .map(({mission_name, rocket, launch_date_local}, index) => 
        parseData({mission_name, rocket, launch_date_local}, index))
      }
    </tbody>
  )
}

export default TableBody