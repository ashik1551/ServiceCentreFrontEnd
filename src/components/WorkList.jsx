import React, { useEffect, useState } from 'react'
import { deleteWorkApi, retrieveCustomerApi } from '../services/api'
import { Button } from 'react-bootstrap'

function WorkList({ custId, refresh, setWorkId }) {

    const [works, setWorks] = useState('')

    const [workTotal, setWorkTotal] = useState('')

    async function fetchWorkData(custId) {
        let res = await retrieveCustomerApi(custId)
        if (res.status > 199 && res.status < 300) {
            setWorks(res.data.works)
            setWorkTotal(res.data.work_total)
        }
    }

    async function handleDelete(id) {
        let res = await deleteWorkApi(id)
        if (res.status > 199 && res.status < 300) {
            fetchWorkData((custId))
        }
    }

    useEffect(() => {
        fetchWorkData(custId)
    }, [refresh])

    return (
        <div className='border border-2 rounded p-3 mt-3'>
            <table className='table'>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    {works && works.map((w, i) =>
                        <tr key={i}>
                            <td>{w.title}</td>
                            <td>{w.description}</td>
                            <td>₹{w.amount}</td>
                            <td className='d-flex gap-2'>
                                <Button className='btn btn-danger' onClick={() => handleDelete(w.id)} >
                                    <i class="fa-solid fa-trash"></i>
                                </Button>

                                <Button className='btn btn-warning' onClick={() => setWorkId(w.id)}>
                                    <i class=" fa-solid fa-pen-to-square"></i>
                                </Button>
                            </td>
                        </tr>
                    )}
                    {workTotal ?
                        <tr>
                            <td></td>
                            <td></td>
                            <td><h5>Total : ₹{workTotal}</h5></td>
                            <td></td>
                        </tr> : null}
                </tbody>
            </table>
        </div>
    )
}

export default WorkList