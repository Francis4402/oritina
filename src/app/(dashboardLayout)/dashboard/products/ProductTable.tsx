"use client"


import { MainTable } from '@/app/utils/Table'
import { deleteProduct } from '@/services/Product'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { toast } from 'sonner'
import UpdateProductModel from '../../modelsdialogs/ProductUpdateModel'
import DeleteModel from '../../modelsdialogs/DeleteModel'
import { Badge } from '@/components/ui/badge'
import { product } from '@/app/types/Types'



const ProductTable = ({product}: {product: product[]}) => {

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteProduct(id);

            if (res) {
                toast.success("Product Deleted");
            } else {
                toast.error(res.error || "Failed to delete product");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const columns: ColumnDef<product>[] = [
        {
            accessorKey: 'productImage',
            header: 'Product Images',
            cell: ({row}) => (
                <div className="flex items-center space-x-2 overflow-x-auto py-1">
                    {row.original.productImage && row.original.productImage.length > 0 ? (
                        row.original.productImage.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`${row.original.name || "Product"} image ${index + 1}`}
                                width={40}
                                height={40}
                                className="w-8 h-8 rounded object-cover border flex-shrink-0"
                            />
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No images</span>
                    )}
                </div>
            )
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({row}) => <div className="text-left">{row.getValue('name')}</div>
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({row}) => <div className="text-left">{row.getValue('description')}</div>
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({row}) => <div className="text-left">${row.getValue('price')}</div>
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: ({row}) => <div className="text-left">{row.getValue('quantity')}</div>
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({row}) => <div className="text-left">{row.getValue('category')}</div>
        },
        {
            accessorKey: 'readTime',
            header: 'ReadTime',
            cell: ({row}) => <div className="text-left">{row.getValue('readTime')}</div>
        },
        {
            accessorKey: 'producttype',
            header: 'Product Type',
            cell: ({row}) => <div className="text-left"><Badge>{row.getValue('producttype')}</Badge></div>
        },
        {
            accessorKey: 'color',
            header: 'Color',
            cell: ({row}) => {
                const colors = row.original.color || [];
                return (
                    <div className="flex gap-1">
                        {colors.length > 0 ? (
                            colors.map((color, index) => (
                                <Badge 
                                    key={index}
                                >
                                    {color}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm">No colors</span>
                        )}
                    </div>
                )
            }
        },
        {
            accessorKey: "action",
            header: () => <div className="text-left">Action</div>,
            cell: ({ row }) => (
                <div className='flex space-x-2'>
                    <UpdateProductModel product={row.original} />
                    <DeleteModel onConfirm={() => handleDelete(row.original.id!)} />
                </div>
            )
        }
    ]

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={product} />
    </div>
  )
}

export default ProductTable