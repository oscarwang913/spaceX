
import styles from '../styles/TableBody.module.css'


const TableBody = ({rocketData, tableHeadTitle, sortField}) => {
  const sortedItem = [...rocketData.launches]
  if(sortField) {
    return (
      <tbody>
        {sortedItem && sortedItem.sort((a, b) => {
          const sortedColumn = tableHeadTitle.find(({label}) => label === sortField)
          if(a[sortField] < b[sortField] || a.rocket[sortField] < b.rocket[sortField]) {
            return sortedColumn.order === 'asc' ?  -1 : 1
          }
          if(a[sortField] > b[sortField] || a.rocket[sortField] > b.rocket[sortField]) {
            return sortedColumn.order === 'asc' ?  1 : -1
          }
        }).map(({mission_name, launch_date_local, rocket}, index) => (
        <tr key={index}>
          <td className={styles.head}>{mission_name}</td>
          <td className={styles.head}>{rocket.rocket_name}</td>
          <td className={styles.head}>{rocket.rocket_type}</td>
          <td className={styles.head}>{launch_date_local}</td>
        </tr>
      ))}
      </tbody>
    )
  } else {
    return (
      <tbody>
        {sortedItem && sortedItem.map(({mission_name, launch_date_local, rocket}, index) => (
        <tr key={index}>
          <td className={styles.head}>{mission_name}</td>
          <td className={styles.head}>{rocket.rocket_name}</td>
          <td className={styles.head}>{rocket.rocket_type}</td>
          <td className={styles.head}>{launch_date_local}</td>
        </tr>
      ))}
      </tbody>
    )
  }
}

export default TableBody