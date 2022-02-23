import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ICompany } from '../Interfaces';

const Companies:FC = () => {
    const [companyList, setCompanyList] = useState<ICompany[]>();
    useEffect(()=> {
        const getCompanies = async ()=> {
            const res = await axios.get('https://localhost:7180/api/Company');
            setCompanyList(res.data)
        }
        getCompanies()
    }, []);
    
    const handleDelete= async (id: number)=>{
        const delConfirm = window.confirm("Do you want to delete?")
        if(delConfirm){
            const res = await axios.delete(`https://localhost:7180/api/Company/${id}`);
            if(res.status === 200)
                alert('Delete data successfully');
            const response = await axios.get('https://localhost:7180/api/Company');
                setCompanyList(response.data)
        }
       
    }

    var html_table: any;
    html_table = companyList?.map((item: ICompany, key: number) =>{
        return (
            <tr key={item.companyId}>
                <td>{item.companyId}</td>
                <td>{item.companyName}</td>
                <td><Link to={`/edit/${item.companyId}`} className='btn btn-secondary btn-sm'>Edit</Link></td>
                <td><button onClick={()=>handleDelete(item.companyId)} className='btn btn-danger btn-sm'>Delete</button></td>
            </tr>
        )
    })

    
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Company List
                            <Link to='/add-company' className='btn btn-primary btn-sm float-end'>Add New Company</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <td>Company Id</td>
                                    <td>Company Name</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    html_table
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Companies;
