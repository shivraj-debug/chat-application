// import React from 'react'
import propTypes from 'prop-types'

function GenderCheckBox({onChangeCheckbox,selectedGender}) {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={'label gap-2 cursor-pointer'}>
            <span className='label-text'>Male</span>
            <input type="checkbox" className='checkbox border-slate-900' 
            checked={selectedGender==="male"}
            onChange={()=> onChangeCheckbox("male")}
            />
        </label>
      </div>
      
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
            <span className='label-text'>Female</span>
            <input type="checkbox" className='checkbox border-slate-900' 
            checked={selectedGender==="female"}
            onChange={()=> onChangeCheckbox("female")}
            />
        </label>
      </div>
    </div>
  )
}

GenderCheckBox.propTypes={
    onChangeCheckbox:propTypes.func.isRequired,
    selectedGender:propTypes.string.isRequired,
}

export default GenderCheckBox
