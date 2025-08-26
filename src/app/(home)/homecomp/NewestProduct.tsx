import { Button } from '@/components/ui/button'
import Image from 'next/image'


const NewestProduct = () => {

    const cloths = [
        {
            cloth: "/clothimage/imgitems1.png",
            color: "bg-orange-300"
        },
        {
            cloth: "/clothimage/imgitems2.png",
            color: "bg-red-200"
        },
        {
            cloth: "/clothimage/imgitems3.png",
            color: "bg-gray-300"
        }
    ]

  return (
    <div className='grid md:grid-cols-3'>
        {
            cloths.map((c, index) => (
                <div className={`${c.color} flex flex-col items-center justify-center p-4 w-full`} key={index}>
                    <Image src={c.cloth} alt="T-shirt" width={600} height={600} />
                    <Button>Shop Button</Button>
                </div>
            ))
        }
    </div>
  )
}

export default NewestProduct