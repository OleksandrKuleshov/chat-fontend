import React, { useState, useEffect } from 'react'
import { Button, Input, Form, List} from 'antd';
import { io } from 'socket.io-client'
import { useLocation, useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik';

//socket initialization with some parameters
const socket = io('http://localhost:8080', {
  transports: ["websocket"],
  autoConnect : false,
  reconnection: false
});

//chat room functional component that handles communication with server, chat messages display, users in chat display
const ChatRoom = () => {
  const location = useLocation();
  const username = location.state.username
  const history = useHistory();

  
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState([])

  //hook for communication with server
  useEffect(() => {
    socket.connect();

      socket.on('connect', () => {
        socket.emit("username", username);
      })
      socket.on('msg', inc => {
        setMsg(msg => [...msg, inc]);
      })

      socket.on('users', users => {
        setUsers(users);
      })

      socket.on('disconnected', msg => {
        socket.disconnect();
        history.push({pathname:'/chatRoom', state :{username : ""}});
      })

      socket.on('disconnect', () => {
        alert('Chat server went down');
        socket.disconnect();
        history.push({pathname:'/chatRoom', state :{username : ""}})
      })
  }, [history, username])

  function sendMessage(msg) {
    socket.emit('msg', msg);
  }

  return(<>
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
          header={<div style = {{fontWeight:'bold'}}>Chat Room</div>}
          bordered
          dataSource={msg}
          renderItem={item => 
            <List.Item>{item.sender} : {item.text}</List.Item>}          
        />
        </div>
        <div style ={{  display: 'flex', justifyContent:'center'}}>
          
            <Formik 
              initialValues ={{msg: ""}} 
              onSubmit={(data,) => {
                sendMessage(data.msg)
                data.msg = "";
              }}>
              {({ values, handleSubmit}) => (
              <Form onFinish={handleSubmit} value={values.msg}>
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