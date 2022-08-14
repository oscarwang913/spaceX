import {useState} from 'react'
import styles from '../styles/TableHead.module.css'
import { useContext } from 'react'
import dataContext from '../context/dataContext'

const TableHead = ({handleSorting}) => {
  const {tableHeadTitle} = useContext(dataContext)
  const [order, setOrder] = useState(null)
  const [sortColumn, setSortColumn] = useState(null)

  const onSortingChange = (label) => {
    //**default stauts is asc. Once click, the order becomes desc.
    const sortingOrder = label === sortColumn && order === 'asc' ? 'desc' : 'asc'
    setSortColumn(label)
    setOrder(sortingOrder)
    handleSorting(label, sortingOrder)
  }
  
  return (
    <thead>
      <tr>
        {
          tableHeadTitle.map(({columnName, label}) => (
            <th className={styles.head} 
                key={label}
                onClick={() => onSortingChange(label)}
            >
              {columnName}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default TableHead