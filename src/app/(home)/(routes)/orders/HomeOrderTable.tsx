"use client"

import { OrderProduct, TOrder } from '@/app/types/Types'
import { MainTable } from '@/app/utils/Table'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UpdateOrderStatus } from '@/services/Orders'
import { toast } from 'sonner'

const HomeOrderTable = ({orders}: {orders: TOrder[]}) => {
    const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
        
    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setLoadingStates(prev => ({...prev, [orderId]: true}));
        
        try {
            const result = await UpdateOrderStatus(orderId, newStatus);
            
            if (result) {
                toast.success('Order status updated successfully');
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
        } finally {
            setLoadingStates(prev => ({...prev, [orderId]: false}));
        }
    }


    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Recent"
        
        try {
            return format(parseISO(dateString), 'MMM dd, yyyy')
        } catch (error) {
            console.error('Error formatting date:', error)
            return "Recent"
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            header: 'Order ID',
            accessorKey: 'id'
        },
        {
            header: 'Product Name',
            cell: ({row}) => {
                const products = row.original.products;
                return (
                    <div className='text-left'>
                        {JSON.parse(products).map((product: OrderProduct) => (
                            <div key={product.id} className="mb-2 flex items-center">
                                <Image src={product.image} alt="i" width={50} height={50} />
                                <p className="font-medium">{product.name} (x{product.quantity})</p>
                            </div>
                        ))}
                    </div>
                )
            }
        },
        {
            header: 'Total',
            cell: ({row}) => (
                <div className='text-left'>${(row.original.total / 100).toFixed(2)}</div>
            )
        },
        {
            header: 'Shipping',
            cell: ({row}) => (
                <div className='text-left'>${(row.original.shipping / 100).toFixed(2)}</div>
            )
        },
        {
            header: 'Tax',
            cell: ({row}) => (
                <div className='text-left'>${(row.original.tax / 100).toFixed(2)}</div>
            )
        },
        {
            header: 'Shipping Address',
            cell: ({row}) => (
                <div className='text-left'>{row.original.shippingAddress}</div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({row}) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    row.original.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    row.original.status === 'Cancelled' ? 'bg-red-500 text-white' :
                    row.original.status === 'Delivered' ? 'bg-yellow-100 text-yellow-800' :
                    row.original.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {row.original.status}
                </span>
            )
        },
        {
            header: 'Action',
            cell: ({row}) => {
                const order = row.original;
                const isLoading = loadingStates[order.id] || false;
                const isCanceled = order.status === 'Canceled';
                const isShipped = order.status === 'Shipped';
                
                return (
                    <button
                        onClick={() => handleStatusChange(order.id, 'Canceled')}
                        disabled={isLoading || isCanceled || isShipped}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            isLoading || isCanceled || isShipped
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                    >
                        {isLoading ? 'Canceling...' : 'Cancel'}
                    </button>
                )
            }
        },
        {
            header: 'Date',
            accessorKey: 'createdAt',
            cell: ({row}) => (
                <div>{formatDate(row.original.createdAt)}</div>
            )
        },
    ]

    return (
        <div>
            <MainTable columns={columns} data={orders} />
        </div>
    )
}

export default HomeOrderTable