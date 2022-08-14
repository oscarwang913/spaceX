import styles from '../styles/TableBody.module.scss'
import { useContext } from 'react'
import dataContext from '../context/dataContext'
import moment from 'moment'

const TableBody = ({rocketData}) => {
  const {sortField, tableHeadTitle, inputValue} = useContext(dataContext)
  const sortedItem = [...rocketData.launches]

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
  
  
  const filterData = (item) => {
    //to iterate each cell of one row
    if(inputValue) {
      if(item.mission_name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.rocket.rocket_name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.rocket.rocket_type.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.launch_date_local.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        return item
      }
    } else {
      return item
    }
  }

  if(sortField) {
    return (
      <tbody>
        {sortedItem && sortedItem.filter(item => filterData(item)).sort((a, b) => {
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
        {sortedItem && sortedItem.filter(item => filterData(item))
        .map(({mission_name, rocket, launch_date_local}, index) => 
          parseData({mission_name, rocket, launch_date_local}, index))
        }
      </tbody>
    )
  }
}

export default TableBody