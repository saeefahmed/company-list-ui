import axios from 'axios'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ICompany, ICompanyWithoutId } from '../Interfaces';
const UpdateCompany:FC=()=> {
    type QuizParams = {
        id: string;
      };
      const { id } = useParams<QuizParams>();
    
    const [companyInfo, setCompanyInfo] = useState<ICompanyWithoutId>({
        companyName: ''
    });
    

    useEffect(()=> {
        const getCompany= async ()=>{
            const res = await axios.get(`https://localhost:7180/api/Company/${id}`)
            setCompanyInfo(res.data)
        }
        getCompany();
    }, [id])

    const handleChange= (e: ChangeEvent<HTMLInputElement>)=>{
        setCompanyInfo({
            ...companyInfo,
            [e.target.name]: e.target.value
        });
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
                            const res = await axios.put('https://localhost:7180/api/Company', companyInfo);
                            if(res.status===200){
                                alert('Successfully Updated');
                            }
                        }}>
                            <div className="form-group mb-3">
                                <label>Company Name</label>
                                <input required type="text" name="companyName" value={companyInfo.companyName} onChange={handleChange} className="form-control" />
                            </div>
                            <div className='form-group mb-3'>
                                <button type='submit' className='btn btn-primary'>Update</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default UpdateCompany