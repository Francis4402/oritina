"use client"


import { commenttype } from '@/app/types/Types'
import { MainTable } from '@/app/utils/Table'
import { ColumnDef } from '@tanstack/react-table'


const CommentTable = ({comment}: {comment: commenttype[]}) => {

    const columns: ColumnDef<commenttype>[] = [
        {
            accessorKey: 'comment',
            header: 'Comment',
            cell: ({row}) => <div className="text-left">{row.getValue('comment')}</div>
        },
    ]

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={comment} />
    </div>
  )
}

export default CommentTable