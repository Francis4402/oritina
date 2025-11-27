"use client"

import { blogCommentType } from '@/app/types/Types'
import { MainTable } from '@/app/utils/Table'
import { deleteblogComment } from '@/services/BlogComment'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'
import DeleteModel from '../../modelsdialogs/DeleteModel'
import { deleteProductComment } from '@/services/ProductComments'


const ProductCommentTable = ({comment}: {comment: blogCommentType[]}) => {
  const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id: string) => {
        setIsDeleting(true);

        try {
            const res = await deleteProductComment(id);

            if (res) {
                toast.success("Product Comment Deleted");
            } else {
                toast.error(res.error || "Failed to delete comment");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the comment");
        } finally {
            setIsDeleting(false);
        }
    }

    const columns: ColumnDef<blogCommentType>[] = [
        {
            accessorKey: 'comment',
            header: 'Comment',
            cell: ({row}) => <div className="text-left">{row.getValue('comment')}</div>
        },
        {
          header: 'Action',
          cell: ({ row }) => (
              <DeleteModel 
                  onConfirm={() => handleDelete(row.original.id!)} 
                  disabled={isDeleting}
              />
          )
        }
    ]

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={comment} />
    </div>
  )
}

export default ProductCommentTable