import styles from '../styles/TableBody.module.css'
import { useContext } from 'react'
import dataContext from '../context/dataContext'

const TableBody = ({rocketData}) => {
  const {sortField, tableHeadTitle, inputValue} = useContext(dataContext)
  const sortedItem = [...rocketData.launches]

  const parseData = ({mission_name, rocket, launch_date_local}, index) => {
    return (
      <tr key={index}>
        <td className={styles.head}>{mission_name}</td>
        <td className={styles.head}>{rocket.rocket_name}</td>
        <td className={styles.head}>{rocket.rocket_type}</td>
        <td className={styles.head}>{launch_date_local}</td>
      </tr>
    )
  }
  console.log(inputValue)

  if(sortField) {
    return (
      <tbody>
        {sortedItem && sortedItem.filter(item => {
          if(inputValue) {
            if(item.mission_name.indexOf(inputValue) > -1 || item.rocket.rocket_name.indexOf(inputValue) > -1 || 
            item.rocket.rocket_type.indexOf(inputValue) > -1 || 
            item.launch_date_local.indexOf(inputValue) > -1) {
              return item
            }
          } else {
            return item
          }
        }).sort((a, b) => {
          const sortedColumn = tableHeadTitle.find(({label}) => label === sortField)
          if(a[sortField] < b[sortField] || a.rocket[sortField] < b.rocket[sortField]) {
            return sortedColumn.order === 'asc' ?  -1 : 1
          }
          if(a[sortField] > b[sortField] || a.rocket[sortField] > b.rocket[sortField]) {
            return sortedColumn.order === 'asc' ?  1 : -1
          }
        })
        .map(({mission_name, rocket, launch_date_local}, index) => 
          parseData({mission_name, rocket, launch_date_local}, index))
        }
      </tbody>
    )
  } else {
    return (
      <tbody>
        {sortedItem && sortedItem.filter(item => {
          if(inputValue) {
            if(item.mission_name.indexOf(inputValue) > -1 || item.rocket.rocket_name.indexOf(inputValue) > -1 || 
            item.rocket.rocket_type.indexOf(inputValue) > -1 || 
            item.launch_date_local.indexOf(inputValue) > -1) {
              return item
            }
          } else {
            return item
          }
        })
        .map(({mission_name, rocket, launch_date_local}, index) => 
          parseData({mission_name, rocket, launch_date_local}, index))
        }
      </tbody>
    )
  }
}

export default TableBody