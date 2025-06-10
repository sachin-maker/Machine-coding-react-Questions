import React from 'react'
import SelectableGrid from './SelectableGrid'
import './style.css'

const SelectableGridApp = () => {
  return (
    <div>
        <h1>Selctable Grid</h1>
        <SelectableGrid rows={15} cols={15}/>
    </div>
  )
}

export default SelectableGridApp