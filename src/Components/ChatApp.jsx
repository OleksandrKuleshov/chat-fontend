import React, {  } from 'react'
import { Button, Input, Form} from 'antd';
import { Formik, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom'


//main page functional component, used to enter username and redirects user to chatRoom page
const ChatApp = () => {
  const history = useHistory()
  history.username = '';
  return (
    
      <div style={{display: 'flex',}}>
        <div style ={{margin : 'auto', padding : '20%', display: 'flex'}}>
          <Formik 
            initialValues ={{userName: ""}} 
            onSubmit={(data, ) => {
              history.push({pathname:'/chatRoom', state :{username : data.userName}})
            }}>
            {({ values, isSubmitting, handleSubmit}) => (
            <Form  onFinish={handleSubmit} value={values.userName}>
              <Field style={{width:'500px'}} placeholder="Your username" name="userName" type="input" as={Input}/>
              <Button disabled={isSubmitting} type='primary' htmlType='submit'>
                <Link to= {{pathname:'/chatRoom', state :{username : values.userName}}}>Enter chat</Link>
                </Button>
            </Form>
            )}

          </Formik>
        </div>
      </div>

    );
}

export default ChatApp