import {useState} from 'react'
import styles from '../styles/TableHead.module.css'

const TableHead = ({tableHeadTitle, handleSorting}) => {
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