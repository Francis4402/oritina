"use client"


import { MainTable } from '@/app/utils/Table'
import { deleteBlog } from '@/services/Blog'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import DeleteModel from '../../modelsdialogs/DeleteModel'
import UpdateBlogsModel from '../../modelsdialogs/BlogUpdateModels'
import {format} from "date-fns";
import { blog } from '@/app/types/Types'


const BlogTable = ({blog}: {blog: blog[]}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id: string) => {
        setIsDeleting(true);

        try {
            const res = await deleteBlog(id);

            if (res) {
                toast.success("Blog Deleted");
            } else {
                toast.error(res.error || "Failed to delete blog");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the blog");
        } finally {
            setIsDeleting(false);
        }
    }


    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) return 'Invalid date';
            
            return format(date, 'MMM dd, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    }

    const columns: ColumnDef<blog>[] = [
        {
            accessorKey: 'blogImage',
            header: 'Blog Image',
            cell: ({row}) => (
                <div className='flex items-center space-x-3'>
                    {row.original.blogImage ? (
                        <Image 
                            src={row.original.blogImage} 
                            alt="i"
                            width={40} 
                            height={40} 
                            className='w-10 h-10 rounded-full object-cover' 
                        />
                    ) : (
                        <span className="text-gray-400">No image</span>
                    )}
                </div>
            )
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({row}) => <div className="text-left">{row.getValue('title')}</div>
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({row}) => <div className="text-left">{row.getValue('description')}</div>
        },
        {
            accessorKey: 'category',
            header: 'Blog Type',
            cell: ({row}) => <div className="text-left">{row.getValue('category')}</div>
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({row}) => {
                const value = row.getValue('createdAt') as string;
                return <div className="text-left">{formatDate(value)}</div>
            }
        },
        {
            accessorKey: 'updatedAt',
            header: 'Updated At',            
            cell: ({row}) => {
                const value = row.getValue('updatedAt') as string;
                return <div className="text-left">{formatDate(value)}</div>
            }
        },
        {
            accessorKey: "action",
            header: () => <div className="text-left">Action</div>,
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <UpdateBlogsModel 
                        blog={row.original}
                    />
                    <DeleteModel 
                        onConfirm={() => handleDelete(row.original.id!)} 
                        disabled={isDeleting}
                    />
                </div>
            )
        }
    ];

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={blog} />
    </div>
  )
}

export default BlogTable