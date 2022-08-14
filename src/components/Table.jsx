import TableHead from './TableHead'
import TableBody from './TableBody'

const Table = ({rocketData, sortField, setSortField, tableHeadTitle, setTableHeadTitle}) => {
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
    <table style={{'borderSpacing' : 0, 'border': '10px solid green'}}>
      <TableHead tableHeadTitle={tableHeadTitle} handleSorting={handleSorting}/>
      <TableBody rocketData={rocketData} tableHeadTitle={tableHeadTitle} sortField={sortField}/>
    </table>
  )
}

export default Table