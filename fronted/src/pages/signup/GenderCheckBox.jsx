// import React from 'react'
import propTypes from 'prop-types'

function GenderCheckBox({onChangeCheckbox,selectedGender}) {
  return (
    <div className='flex '>
      <div className='form-control '>
        <label className='label gap-2 cursor-pointer'>
            <span className='label-text text-xl'>Male</span>
            <input type="checkbox" className='checkbox w-4 h-4 border-slate-400' 
            checked={selectedGender==="male"}
            onChange={()=> onChangeCheckbox("male")}
            />
        </label>
      </div>
      
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
            <span className='label-text text-xl'>Female</span>
            <input type="checkbox" className='checkbox w-4 h-4 border-slate-400' 
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
