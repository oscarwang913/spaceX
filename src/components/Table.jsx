import TableHead from './TableHead'
import TableBody from './TableBody'
import { useContext } from 'react'
import dataContext from '../context/dataContext'
import styles from '../styles/Table.module.scss'

const Table = ({rocketData}) => {
  const {setSortField, setTableHeadTitle} = useContext(dataContext)
  
  const handleSorting = (label, sortOrder) => {
    setSortField(label)
    setTableHeadTitle(currentTableHead => currentTableHead.map(tableHead => {
      if (tableHead.label === label) {
        return {
          ...tableHead,
          order: sortOrder
        }
      } else {
        return tableHead
      }
    }))
  }

  return (
    <table className={styles.table}>
      <TableHead handleSorting={handleSorting}/>
      <TableBody rocketData={rocketData} />
    </table>
  )
}

export default Table