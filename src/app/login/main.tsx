'use client'
import { FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Checkbox, Form, Input, Spin } from "antd"
import Link from "next/link"
import backgroundImage from '../../../public/bgLogin.jpg'
import Image from "next/image"
import Error from "next/error"
import { useRouter } from "next/navigation"

interface IFieldType {
  username?: string;
  password?: string;
}
function MainPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    console.log('Success:', values);
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    // try {
    //   const response = await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    // } catch(err: Error | any) {
    //   throw new Error(err)
    // }
    setTimeout(() => {
      setLoading(false)
      router.push('/home')
    }, 2000)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{backgroundImage: `url(${backgroundImage.src})`}} className="h-[100vh] flex justify-center items-center bg-no-repeat bg-center bg-cover w-[100vw]">
      <Form
        className="px-10 py-8 bg-[rgba(255,255,255,0.5)] rounded-3xl"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h4 className="font-semibold text-center pb-4">STORE SYSTEM</h4>
        <Form.Item<IFieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoComplete="off" disabled={loading} />
        </Form.Item>

        <Form.Item<IFieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete="off" disabled={loading} />
        </Form.Item>

        <div className="flex justify-between mb-3">
          <Link className={`text-sky-500 hover:underline ${loading ? 'pointer-events-none' : ''}`} 
            aria-disabled={loading} 
            tabIndex={loading? -1 : undefined} href={'/register'}>Create account?</Link>
          <Link className={`text-sky-500 hover:underline ${loading ? 'pointer-events-none' : ''}`} 
            aria-disabled={loading} 
            tabIndex={loading? -1 : undefined} href={'/forgot'}>Forget password?</Link>
        </div>

        <div className="w-full text-center">
          {
            loading ? <Spin className="text-white" /> : 
            <Button className="bg-sky-600" type="primary" htmlType="submit">
              Sign in
            </Button>
          }
        </div>

            
      </Form>
    </div>
  )
}

export default MainPage