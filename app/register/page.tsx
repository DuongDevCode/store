'use client'
import { FormEvent, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import '../globals.css'
import BackgroundImage from '@/public/imgs/background.png'
import Link from "next/link";
import styles from '@/styles/styles.module.css'
import { Spin, Modal } from "antd";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter()
  const [eyesPass, setEyesPass] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [modal, contextHolder] = Modal.useModal();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: formData,
      });
      // Handle response if necessary
      const data = await response.json();
      let secondsToGo = 2;
      const instance = modal.success({
        title: 'Register successfully!',
        content: `You can confirm email ${formData.get('email')}.`,
        okCancel: false,
        footer: <></>
      });
  
      const timer = setInterval(() => {
        secondsToGo -= 1;
        instance.update({
          content: `You can confirm email ${formData.get('email')}.`,
        });
      }, 1000);
  
      setTimeout(() => {
        clearInterval(timer);
        instance.destroy();
        router.push('/login')
      }, secondsToGo * 1000);
    } catch(err: any) {
      console.log(err)
      setErrorMessage(err.message)
    } finally {
      // setLoading(false)
    }
    
    // ...
  };

  return (
    <div className="bg-no-repeat bg-center bg-cover h-screen w-full flex justify-center items-center" style={{backgroundImage: `url(${BackgroundImage.src})`}}>
      <form className="rounded-md p-4 grid gap-y-4" style={{backgroundColor: 'rgb(255, 255, 255, 0.3)'}} onSubmit={onSubmit}>
        <h4 className="text-center font-semibold">Register System</h4>

        <div className="flex justify-between items-center">
          <label htmlFor="email" className="pr-4">
            Email: <span className="text-red-500">*</span>
          </label>
          <input className="border outline-none p-2 focus:border-sky-500 rounded-md h-[34px]" type='text' name="email" />
        </div>
        
        <div className="flex justify-between items-center">
          <label htmlFor="phonenumber" className="pr-4">
            Phone number: <span className="text-red-500">*</span>
          </label>
          <input className="border outline-none p-2 focus:border-sky-500 rounded-md h-[34px]" type='number' name="phonenumber" />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="username" className="pr-4">
            Username: <span className="text-red-500">*</span>
          </label>
          <input className="border outline-none p-2 focus:border-sky-500 rounded-md h-[34px]" type="text" name="username" />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="password" className="pr-4">
            Password: <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input className="border outline-none p-2 focus:border-sky-500 rounded-md h-[34px]" onChange={() => setErrorMessage('')} type={`${eyesPass ? "text" : "password"}`} name="password" />
            <button type="button" className="absolute hover:text-orange-500 right-3 bottom-2" onClick={() => setEyesPass(!eyesPass)}>{eyesPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}</button>
          </div>
        </div>

        <p className="text-red-500 text-center">{errorMessage}</p>

        <div className={`text-center ${styles['submit']}`}>
          <button className="btn-submit hover:bg-orange-700" type="submit">Submit</button>
        </div>
      </form>
      {contextHolder}
    </div>
  );
};

export default RegisterPage;
