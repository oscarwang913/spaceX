import {useState} from 'react'
import styles from '../styles/TableHead.module.scss'
import upArrow from '../assets/icons8-up-48.png'
import downArrow from '../assets/icons8-down-48.png'

const TableHead = ({tableHeadTitle, handleSorting}) => {
  const [order, setOrder] = useState(null)
  const [sortColumn, setSortColumn] = useState(null)

  const onSortingChange = (label) => {
    //**default stauts is asc. Once click, the order becomes desc
    const sortingOrder = label === sortColumn && order === 'asc' ? 'desc' : 'asc'
    setSortColumn(label)
    setOrder(sortingOrder)
    handleSorting(label, sortingOrder)
  }

  return (
    <thead>
      <tr>
        {
          tableHeadTitle.map(({columnName, label, order}) => (
            <th className={styles.head} 
                key={label}
                onClick={() => onSortingChange(label)}
            >
              {columnName} 
              {!order ? null : order === 'asc' ? <img src={upArrow} /> : <img src={downArrow} />}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

export default TableHead