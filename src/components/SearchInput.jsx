import styles from '../styles/SearchInput.module.scss'

const SearchInput = ({value, handleValueChange}) => {
  return <input className={styles.input} type="text" value={value} onChange={(e) => handleValueChange(e.target.value)} placeholder='Search...'/>
}

export default SearchInput