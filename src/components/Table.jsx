import TableHead from './TableHead'
import TableBody from './TableBody'
import { useState, useContext, useMemo } from 'react'
import dataContext from '../context/dataContext'
import styles from '../styles/Table.module.scss'
import {sortData, filterData} from '../utils/utils'
import SearchInput from './SearchInput'

const Table = ({rocketData}) => {
  const [inputValue, setInputValue] = useState("")
  const {sortField, setSortField, tableHeadTitle, setTableHeadTitle} = useContext(dataContext)
  const [currentpage, setCurrentPage] = useState(1)
  const dataPerPage = 20
  const originData =  [...rocketData.launches]
  const sortedData = useMemo(() => sortData(originData, sortField, tableHeadTitle), [tableHeadTitle, sortField])
  const filteredData = useMemo(() => filterData(sortedData, inputValue), [inputValue, sortedData])
  const totalDataAmount = filteredData.length
  const totalPages = Math.ceil(totalDataAmount / dataPerPage)
  const slicedRocketData = filteredData.slice((currentpage - 1) * dataPerPage, currentpage * dataPerPage)
  
  const forward = () => {
    setCurrentPage(pre => pre + 1)
  }
  const back = () => {
    setCurrentPage(pre => pre - 1)
  }

  const onChange = (value) => {
    /*
      if the amount of filter data is less than 20, it should back to the first page.
      otherwise. If filtering at non-first page, the table might be empty
    */
    
    setCurrentPage(1)
    setInputValue(value)
  }

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
    <>
      <SearchInput handleValueChange={onChange} value={inputValue}/>
      <table className={styles.table}>
        <TableHead handleSorting={handleSorting}/>
        <TableBody rocketData={slicedRocketData} dataPerPage={dataPerPage}/>
      </table>
      <section>
        <button className={styles.actionButton} disabled={currentpage === 1} onClick={back}>back</button>
        <button className={styles.actionButton} disabled={currentpage === totalPages} onClick={forward}>forward</button>
      </section>
    </>
    
  )
}

export default Table