"use client"


import { MainTable } from '@/app/utils/Table'
import { deleteProductCategory } from '@/services/ProductCategory'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'
import DeleteModel from '../../modelsdialogs/DeleteModel'
import { category } from '@/app/types/Types'



const CategoryTable = ({ category }: { category: category[] }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await deleteProductCategory(id);
      if (res) {
        toast.success("Category Deleted");
      } else {
        toast.error(res.error || "Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the category");
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: ColumnDef<category>[] = [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <div className="text-left">{row.getValue('category')}</div>
    },
    {
      accessorKey: "action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => (
        <DeleteModel 
          onConfirm={() => handleDelete(row.original.id!)} 
          disabled={isDeleting}
        />
      )
    }
  ];

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={category} />
    </div>
  )
}

export default CategoryTable