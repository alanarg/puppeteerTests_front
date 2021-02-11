import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Log from './componentlogin'
import { Box } from '@material-ui/core'
import './css.css'
const useStyles = makeStyles(theme => ({
  
  alignItemsAndJustifyContent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6fff2',
  },
}))
const Centering4Ways = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
     
      <div className={classes.alignItemsAndJustifyContent}>
        <Log></Log>
      </div>
    </React.Fragment>
  )
}
export default Centering4Ways