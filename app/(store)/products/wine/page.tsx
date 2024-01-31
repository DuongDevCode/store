'use client'
import { useEffect, useState } from "react"
import { Skeleton, Image, Rate } from "antd"

const WineLayout = () => {
  const [datas, setDatas] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProds = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:8000/api/products')
        const result = await res.json()
        setDatas(result)
      } catch(err) {

      } finally {
        setLoading(false)
      }
    }
    fetchProds()
  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
  });

  return(
    <>
      {
        loading || datas.length === 0 ? <Skeleton active /> : 
        <ul className="flex justify-start gap-4 items-center">
          {datas.map((item: any, index: number) => {
            return(
              <li className="flex flex-col justify-center items-center border border-gray-500 rounded-md p-4">
                <Image.PreviewGroup
                  // preview={{
                  //   onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                  // }}
                >
                  <Image
                    width={50}
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                  />
                </Image.PreviewGroup>
                <span>{item.name}</span>
                <span className="text-red-500">{formatter.format(item.price)}</span>
                <Rate disabled defaultValue={item.evaluate} />
              </li>
            )
          })}
        </ul> 
      }
    </>
  )
}

export default WineLayout