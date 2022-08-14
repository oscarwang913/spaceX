import { useContext } from 'react'
import dataContext from '../context/dataContext'
import styles from '../styles/SearchInput.module.scss'

const SearchInput = () => {
  const {inputValue, setInputValue} = useContext(dataContext)

  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  return <input className={styles.input} type="text" value={inputValue} onChange={onChange} placeholder='Search...'/>
}

export default SearchInput