export const filterData = (sortedData, inputValue) => {
  return sortedData.filter(item => {
    if(!inputValue) return sortedData
    if(inputValue) {
      if(item.mission_name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.rocket.rocket_name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.rocket.rocket_type.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || 
      item.launch_date_local.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        return item
      }
    }
  })
}

export const sortData = (rocketData, sortField, tableHeadTitle) => {
  return rocketData.sort((a, b) => {
    const sortedColumn = tableHeadTitle.find(({label}) => label === sortField)
    if(a[sortField] < b[sortField] || a.rocket[sortField] < b.rocket[sortField]) {
      return sortedColumn.order === 'asc' ?  -1 : 1
    }
    if(a[sortField] > b[sortField] || a.rocket[sortField] > b.rocket[sortField]) {
      return sortedColumn.order === 'asc' ?  1 : -1
    }
  })
}

