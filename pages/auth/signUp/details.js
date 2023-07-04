import React from 'react'
import { LIST_OF_ACCOUNT_TYPE } from '../../common/constants'

const Details = (props) => {
    const { values, handleChange } = props;
  return (
    <form className="form1">
    <div className="form-group">
        <label className="col-form-label">Phone No</label>
        <input className="form-control" onChange={(e) => handleChange(e)} type="number" name="phoneNo" placeholder="(xxx) xxx-xxxx" value={values.phoneNo}/>
    </div>
    <div className="form-group">
    <label className="col-form-label" for="accountType">Choose Account Type</label>
      <select id="accountType" className="form-control" name="accountType" onChange={(e) => handleChange(e)}  >
        {
           LIST_OF_ACCOUNT_TYPE.map((accountType, index) => {
               return <option key={index} value={values.accountType}>{accountType.label}</option>
           })
        }
      </select>
    </div>
</form>
  )
}

export default Details