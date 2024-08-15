import React, { useEffect, useState } from 'react'
import { deleteCustomerApi, listCustomerApi } from '../services/api'
import { Button } from 'react-bootstrap'
import CreateCustomer from './CreateCustomer'
import { useNavigate } from 'react-router-dom'


function CustomerList({reload}) {

    const [customer, setCustomer] = useState()

    const navigate=useNavigate()

    async function getCustomer() {
        let res = await listCustomerApi()
        if (res.status > 199 && res.status < 300) {
            setCustomer(res.data)
        }
    }

    async function handleDelete(id){
        let res=await deleteCustomerApi(id)
        if(res.status>199 && res.status<300){
            getCustomer()
        }
    }

    useEffect(() => {
        getCustomer()
    }, [reload])

    return (
        <div>
            {customer && customer.map((cust, i) => <div class="card my-3" >
                <div class="card-header">
                    {cust.name}
                </div>
                <div class="card-body row ">
                    <div class="col-2 border-end">
                        <h5 class="text-center text-decoration-underline"> Customer Details</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-phone"></i></span>{cust.phone}</div>

                        <div class="my-3"><span class="me-2"><i class="fa-regular fa-envelope"></i></span>{cust.email}</div>


                    </div>
                    <div class="col-2 border-end">
                        <h5 class="text-center text-decoration-underline"> Odometer</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-gauge"></i></span>{cust.running_km}km</div>



                    </div>
                    <div class="col-2 border-end">
                        <h5 class="text-center text-decoration-underline"> Date</h5>

                        <div class="my-3"><span class="me-2"><i
                            class="fa-solid fa-calendar-days"></i></span>{cust.created_date}</div>


                    </div>
                    <div class="col-2 border-end">
                        <h5 class="text-center text-decoration-underline"> VehicleNumber</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-car"></i></span>{cust.vehicle_no}</div>

                    </div>
                    <div class="col-2 border-end">
                        <h5 class="text-center text-decoration-underline"> Total</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-rupee-sign"></i></span> {cust.work_total}</div>
                    </div>
                    <div class="col-2 ">
                        <h5 class="text-center text-decoration-underline"> Action</h5>

                        <div class="d-flex justify-content-evenly gap-2 align-items-center">
                            <div class="mb-2">

                                <Button className='btn btn-info' onClick={()=>{navigate(`/customer/${cust.id}/`)}} >
                                    <i class="fa-solid fa-eye"> </i>
                                </Button>

                            </div>

                            <div class="mb-2">

                                <CreateCustomer cls={"fa-solid fa-pen-to-square"} custId={cust.id} setReload={getCustomer}></CreateCustomer>

                            </div>

                            <div class="mb-2">
                                <Button className='btn btn-primary' onClick={()=>{handleDelete(cust.id)}} >
                                    <i class="fa-solid fa-trash"></i>
                                </Button>

                            </div>

                            <div class="mb-2">
                                <Button className='btn btn-danger' >
                                    <i class="fa-solid fa-file-invoice"></i>
                                </Button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>)}

        </div>
    )
}

export default CustomerList