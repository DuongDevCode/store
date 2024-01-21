'use client'
import { FormEvent, useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

interface ILogin {
  acc: string,
  pwd: string
}
const LoginPage = () => {
  const router = useRouter()
  const [dataForm, setDataForm] = useState<ILogin>({
    acc: '',
    pwd: ''
  })
  // const loading = useSelector((state: any) => state.loading)
  // console.log(loading)

  const onsubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })
    // const data = await response.json()
    console.log(formData)
    router.push('/dashboard')
  }

  return (
    <div className="h-screen flex justify-center items-center ">
      <form className="border border-gray-600 p-4 rounded-md gap-y-4 max-w-[500px] m-auto shadow-2xl bg-white" onSubmit={onsubmit}>
        <h4 className="font-bold text-center pb-4">LOGIN</h4>
        <div className="mb-4 w-full flex justify-between items-center">
          <label className="pr-4" htmlFor="acc">Account: <span className="text-red-500"> *</span></label>
          <input
            className="border border-gray-500 rounded-md p-2 outline-none focus:border-sky-600 h-8"
            type="text"
            name='acc'
            value={dataForm.acc}
            placeholder="Input Account..."
            onChange={(e: any) => setDataForm({ ...dataForm, acc: e.target.value })}
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <label className="pr-4" htmlFor="pwd">Password: <span className="text-red-500"> *</span></label>
          <input
            className="border border-gray-500 rounded-md p-2 outline-none focus:border-sky-600 h-8"
            type="password"
            name="pwd"
            value={dataForm.pwd}
            placeholder="Input password..."
            onChange={(e: any) => setDataForm({ ...dataForm, pwd: e.target.value })}
          />
        </div>
        <Link className="text-gray-400 text-right hover:underline hover:text-sky-600" href={'/forget-account'}>*forget account?</Link>

        <div className="text-right">
          <button 
            className={`${dataForm.acc === '' || dataForm.pwd === '' ? 'opacity-50' : 'opacity-100'} border border-sky-600 bg-sky-600 hover:bg-sky-700 hover:border-sky-600 text-white rounded-md p-2 outline-none`}
            disabled={dataForm.acc === '' || dataForm.pwd === ''}
            >Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage