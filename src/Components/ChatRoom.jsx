import React, { useState, useEffect } from 'react'
import { Button, Input, Form, List} from 'antd';
import { io } from 'socket.io-client'
import { useLocation, useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik';

// var socket = 0

const socket = io('http://localhost:8080', {
  transports: ["websocket"],
  autoConnect : false,
  reconnection: false
});


const ChatRoom = () => {
  const location = useLocation();
  const username = location.state.username
  const history = useHistory();

  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState([])

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      socket.emit("username", username);
    })
    socket.on('msg', inc => {
      console.log("inc: " + JSON.stringify(inc))
      // setMsg(msg => [...msg, inc]);
    })

    socket.on('users', users => {
      setUsers(users);
    })

    socket.on('disconnected', msg => {
      console.log(msg);
    })

    socket.on('disconnect', () => {
      alert('Chat server went down');
      history.push({pathname:'/'})
    })
  }, [])

  function testSend() {
    socket.emit('msg', "test message");
  }

  function sendMessage(msg) {
    socket.emit('msg', msg);
  }

  return(<>
  <Button onClick={() => testSend()} type='primary' htmlType='submit'>test send</Button>
  <div style={{position:'fixed'}}>
    <List
      size="small"
      header={<div>Users in Chat Room</div>}
      bordered
      dataSource={users}
      renderItem={item => <List.Item>{item}</List.Item>}          
    />
  </div>
    <div style={{display: 'flex', justifyContent:'center',}}>
      <div id="chat_container">
        <div id="chat_window" style={{width:'800px'}}>
        <List
          size="small"
          header={<div>Chat Room</div>}
          bordered
          dataSource={msg}
          renderItem={item => <List.Item>{item}</List.Item>}          
        />
        </div>
        <div style ={{  display: 'flex', justifyContent:'center'}}>
          
            <Formik 
              initialValues ={{msg: ""}} 
              onSubmit={(data, {setSubmitting}) => {
                setSubmitting(true);
                //make async call
                sendMessage(data.msg)
                setSubmitting(false);
              }}>
              {({ values, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
              <Form style={{}} onFinish={handleSubmit} value={values.msg}>
                <Field style={{width:'735px'}} placeholder="" name="msg" type="input" as={Input}/>
                <Button type='primary' htmlType='submit'>
                  Send
                </Button>
              </Form>
              )}
            </Formik>
            </div>
          </div>
        </div>
  </>)
}

export default ChatRoom