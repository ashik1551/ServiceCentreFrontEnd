import React from 'react'
import CreateCustomer from '../components/CreateCustomer'
import CustomerList from '../components/CustomerList'

function Index() {
  

  return (
    <div>
        <div className='container d-flex justify-content-end my-2'>
        <CreateCustomer cls={"fa-solid fa-plus"} custId={null}></CreateCustomer>
        </div>
        <div className="container">
        <CustomerList></CustomerList>
        </div>
    </div>
  )
}

export default Index