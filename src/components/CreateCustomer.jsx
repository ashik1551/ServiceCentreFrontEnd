import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCustomerApi, retrieveCustomerApi, updateCustomerApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreateCustomer({ cls, custId, setReload }) {

    const [customer, setCustomer] = useState({ name: '', email: '', vehicle_no: '', running_km: '', phone: '' })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    async function handleSubmit() {
        let res = custId ? await updateCustomerApi(custId, customer) : await addCustomerApi(customer)
        if (res.status > 199 && res.status < 300) {
            handleClose()
            custId ? setReload() : navigate(`/customer/${res.data.id}/`)
        }
    }

    async function fetchCustomerData(id) {
        let res = await retrieveCustomerApi(id)
        if (res.status > 199 && res.status < 300) {
            setCustomer(res.data)
        }
    }

    useEffect(() => {
        fetchCustomerData(custId)
    }, [custId])

    return (
        <>
            <Button className="btn btn-info" onClick={handleShow}>
                <i className={cls}></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{custId ? "Edit Customer" : "Create New Customer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="">Enter Customer Name</label>
                            <input type="text" className='form-control' value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Enter Customer Phone</label>
                            <input type="text" className='form-control' value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Enter Customer Email</label>
                            <input type="email" className='form-control' value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Enter Customer Vehicle Number</label>
                            <input type="text" className='form-control' value={customer.vehicle_no} onChange={(e) => setCustomer({ ...customer, vehicle_no: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Enter vehicle Running Km</label>
                            <input type="text" className='form-control' value={customer.running_km} onChange={(e) => setCustomer({ ...customer, running_km: e.target.value })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {custId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCustomer