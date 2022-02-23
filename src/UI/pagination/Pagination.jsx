import { getPagesArray } from '../../utils/pages'
import classes from './Pagination.module.css'

const Pagination = ({totalPages, page, changePage}) => {
  
  let pagesArray = getPagesArray(totalPages)
  
  return (
    <div className={classes.pageWrapper}>
      {pagesArray.map(p =>
        <span className={
          page === p
          ? `${classes.page} ${classes.pageCurrent}`
          : `${classes.page}`
          }
          onClick={() => {changePage(p)}}
          key={p}
        >{p}</span>
      )}
    </div>
  )
}

export default Pagination