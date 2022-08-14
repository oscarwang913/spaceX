import { useContext } from 'react'
import dataContext from '../context/dataContext'

const SearchInput = () => {
  console.log("****exe search*****")
  const {inputValue, setInputValue} = useContext(dataContext)

  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  return <input type="text" value={inputValue} onChange={onChange}/>
}

export default SearchInput