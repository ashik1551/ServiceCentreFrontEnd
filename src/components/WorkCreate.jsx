import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { addWorkApi, retrieveWorkApi, updateWorkApi } from '../services/api';

function WorkCreate({custId,setRefresh,workId,setWorkId}) {

  const [work,setWork]=useState({title:'',description:'',amount:''})

  async function handleSubmit(){
    let res=workId? await updateWorkApi(workId,work) : await addWorkApi(custId,work)
    if(res.status>199 && res.status<300){
      setRefresh(Math.random())
      formReset()
      setWorkId(null)
    }
  }

  function formReset(){
    setWork({title:'',description:'',amount:''})
  }

  async function fetchWorkData(id){
    let res=await retrieveWorkApi(id)
    if(res.status>199 && res.status<300){
      setWork(res.data)
    }
  }

  useEffect(()=>{
    fetchWorkData(workId)
  },[workId])

  return (
    <div className='border border-2 border-dark p-3 rounded' >

      <div className="row">
        <h5 className='fw-bold text-center'>{workId?"Edit Work":"Add Work"}</h5>
        <div className="col-4">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Work Title
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={work.title}
              onChange={(e)=>setWork({...work,title:e.target.value})}
            />
          </InputGroup>
        </div>
        <div className="col-4">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Work Description
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={work.description}
              onChange={(e)=>setWork({...work,description:e.target.value})}
            />
          </InputGroup>
        </div>
        <div className="col-4">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Amount
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={work.amount}
              onChange={(e)=>setWork({...work,amount:e.target.value})}
            />
            <Button variant="secondary" id="button-addon2" onClick={handleSubmit}>
            {workId?"Update":"Add"}
            </Button>
          </InputGroup>
        </div>
      </div>

    </div>
  )
}

export default WorkCreate