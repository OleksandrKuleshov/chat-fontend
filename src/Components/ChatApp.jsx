import React, {  } from 'react'
import { Button, Input, Form} from 'antd';
import { Formik, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom'


const ChatApp = () => {
  const history = useHistory()
  history.username = '';
  return (
    
      <div style={{display: 'flex',}}>
        <div style ={{margin : 'auto', padding : '20%', display: 'flex'}}>
          <Formik 
            initialValues ={{userName: ""}} 
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              //make async call
              history.push({pathname:'/chatRoom', state :{username : data.userName}})
              console.log('submit: ', data)
              setSubmitting(false);
            }}>
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
            <Form  onFinish={handleSubmit} value={values.userName}>
              <Field style={{width:'500px'}} placeholder="Your username" name="userName" type="input" as={Input}/>
              <Button disabled={isSubmitting} type='primary' htmlType='submit'>
                <Link to= {{pathname:'/chatRoom', state :{username : values.userName}}}>Enter chat</Link>
                </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
            )}

          </Formik>
        </div>
      </div>

    );
}

export default ChatApp


            // <FormItem>
            //   <Input style={{width:'500px'}} size="middle" placeholder="Your username"></Input>
            // </FormItem>
            // <Button type="primary" htmlType="submit" className="login-form-button"></Button>