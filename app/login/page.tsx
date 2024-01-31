'use client'
import { FormEvent, useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import '../globals.css'
import BackgroundImage from '@/public/imgs/background.png'
import Link from "next/link";
import styles from '@/styles/styles.module.css'
import { Spin } from "antd";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter()
  const [eyesPass, setEyesPass] = useState<boolean>(false)
  // const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setLoading(true)
    // const domSubmit = document.querySelector(".btn-submit")
    // if (domSubmit) {
    //   domSubmit.classList.add('animate')
    //   setTimeout(() => {
    //     domSubmit.classList.remove('animate')
    //   }, 3000)
    // }
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch("http://localhost:8000/api/sign-in", {
        method: "POST",
        body: formData,
      });
      // Handle response if necessary
      const data = await response.json();
      if (!data.token) setErrorMessage(data.message)
      else {
        localStorage.setItem('currentUser', JSON.stringify(data))
        router.push('/')
      }  
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
        <h4 className="text-center font-semibold">Login System</h4>
        <div className="flex justify-between items-center">
          <label htmlFor="username" className="pr-4">
            Username: <span className="text-red-500">*</span>
          </label>
          <input className="border outline-none p-2 focus:border-sky-500 rounded-md h-[34px]" type="text" name="username" onChange={() => setErrorMessage('')} />
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
          {/* {loading && <Spin />} */}
        </div>

        <p className="text-sm text-right">You don't account? <Link className="text-sky-600 hover:underline" href='/register'>create account</Link></p>

      </form>
    </div>
  );
};

export default LoginPage;
