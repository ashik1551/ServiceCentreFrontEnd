import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveCustomerApi } from '../services/api';
import WorkCreate from '../components/WorkCreate';
import WorkList from '../components/WorkList';

function CustomerDetail() {

    // extract url parameter  example:  localhost:5173/customer/{id}/

    const [refresh,setRefresh]=useState()

    const [workId,setWorkId]=useState(null)

    const { id } = useParams()

    const [customer, setCustomer] = useState()

    async function getCustomerDetail(id) {
        let res = await retrieveCustomerApi(id)
        if (res.status > 199 && res.status < 300) {
            setCustomer(res.data)
        }
    }

    useEffect(() => {
        getCustomerDetail(id)
    }, [id])

    return (
        <div className='container'>
            {customer && <div class="card my-3" >
                <div class="card-header">
                    {customer.name}
                </div>
                <div class="card-body row ">
                    <div class="col-3 border-end">
                        <h5 class="text-center text-decoration-underline"> Customer Details</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-phone"></i></span>{customer.phone}</div>

                        <div class="my-3"><span class="me-2"><i class="fa-regular fa-envelope"></i></span>{customer.email}</div>


                    </div>
                    <div class="col-3 border-end">
                        <h5 class="text-center text-decoration-underline"> Odometer</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-gauge"></i></span>{customer.running_km}km</div>



                    </div>
                    <div class="col-3 border-end">
                        <h5 class="text-center text-decoration-underline"> Date</h5>

                        <div class="my-3"><span class="me-2"><i
                            class="fa-solid fa-calendar-days"></i></span>{customer.created_date}</div>


                    </div>
                    <div class="col-3 border-end">
                        <h5 class="text-center text-decoration-underline"> VehicleNumber</h5>

                        <div class="my-3"><span class="me-2"><i class="fa-solid fa-car"></i></span>{customer.vehicle_no}</div>

                    </div>


                </div>
            </div>}
            <WorkCreate custId={id} setRefresh={setRefresh} workId={workId} setWorkId={setWorkId} ></WorkCreate>
            <WorkList custId={id} refresh={refresh} setWorkId={setWorkId}></WorkList>
        </div>
    )
}

export default CustomerDetail