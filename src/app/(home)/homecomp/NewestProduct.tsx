
import { product } from '@/app/types/Types';
import { Button } from '@/components/ui/button'
import { getProducts } from '@/services/Product'
import Image from 'next/image'


const NewestProduct = async () => {

    const cloths = await getProducts();

    // const newest = cloths
    // .filter((c: product) => c.producttype === 'newarrivals')
    // .slice(0, 3);

  return (
    <div className='grid md:grid-cols-3'>
        {/* {
            newest.map((c: product, index: number) => {
                return (
                    c.producttype === 'newarrivals' ? (
                        <div className={`${c.color} flex flex-col items-center justify-center p-4 w-full`} key={index}>
                            <Image src={c.productImage[0]} alt="T-shirt" width={600} height={600} />
                            <Button>Shop Button</Button>
                        </div>
                    ) : ""
                )
            })
        } */}
    </div>
  )
}

export default NewestProduct