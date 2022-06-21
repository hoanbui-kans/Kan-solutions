import React, { useRef, useState } from 'react'
import { Form, Button, Loader, Schema, useToaster, Message } from 'rsuite'
import axios from 'axios';
import styles from '../../styles/footer.module.css'
import Image from 'next/image'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const EmailMarketing = () => {
  const formRef = useRef();
  const toaster = useToaster();

  const [ isLoading, setLoading ] = useState(false);
  const [ FormValue, setFormValue ] = useState({
    email: ''
  })
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    'email': StringType().isRequired('Bạn chưa nhập địa chỉ email.').isEmail('Địa chỉ Email không đúng'),
  });

  const HandleSubmitMarketingForm = async () => {
        let data = new FormData();
        data.append('email', FormValue.email);
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true);

        let Config = {
            url: rootURL + 'contact-form-7/v1/contact-forms/1801/feedback',
            method: 'post',
            data: data
        }
        const response = await axios(Config).then((res) => {
            return res.data
        }).catch((error) => {
            console.log(error);
        })

        setLoading(false);
        if(!response.error){
            toaster.push(<Message type={'success'} showIcon>{response.message}</Message>, {
                placement: 'topStart'
            })
        }
  }
  return (
    <Form 
        className={styles.x_footer_form}
        ref={formRef}
        formValue={FormValue}
        model={model}
        onChange={setFormValue}
        onSubmit={HandleSubmitMarketingForm}
    >
        <Form.Control name='email' className={styles.x_form_newsletter} value={EventTarget.value} placeholder={'Nhập địa chỉ Email...'}></Form.Control>
        <Button className={styles.x_newsletter_button} type='submit'>
            <span className={styles.x_newsletter_ico}>
                {
                    isLoading ? 
                    <Loader size='sm' />  : 
                    <Image alt='layout' src={'/icons/Send_fill.svg'} width={24} height={24} /> 
                }
            </span>
            Gửi đi
        </Button>
    </Form>
  )
}

export default EmailMarketing