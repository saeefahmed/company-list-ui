import axios from 'axios';
import React, { ChangeEvent, FC, useState } from 'react'
import { Link } from 'react-router-dom';
import { ICompanyWithoutId } from '../Interfaces';

const AddCompany: FC =()=> {
    const [companyInfo, setCompanyInfo] = useState<ICompanyWithoutId>({
        companyName: ''
    })

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=> {
        setCompanyInfo({
            ...companyInfo,
            [e.target.name] : e.target.value
        })
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Company List
                            <Link to='/' className='btn btn-primary btn-sm float-end'>Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                    <form onSubmit={async(e: React.SyntheticEvent) => {
                            e.preventDefault();
                            const res = await axios.post('https://localhost:7180/api/Company', companyInfo);
                            if(res.status===200){
                                alert('Successfully Saved.');
                            }
                        }}>
                            <div className="form-group mb-3">
                                <label>Company Name</label>
                                <input required type="text" name="companyName" value={companyInfo.companyName} onChange={handleChange} className="form-control" />
                            </div>
                            <div className='form-group mb-3'>
                                <button type='submit' className='btn btn-primary'>Save</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCompany;