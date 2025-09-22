"use client"



import { blogCommentType } from '@/app/types/Types'
import { MainTable } from '@/app/utils/Table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'


const CommentTable = ({comment}: {comment: blogCommentType[]}) => {

    const columns: ColumnDef<blogCommentType>[] = [
        {
            accessorKey: 'comment',
            header: 'Comment',
            cell: ({row}) => <div className="text-left">{row.getValue('comment')}</div>
        },
        {
          header: 'Action',
          cell: ({row}) => <Button size={"sm"}>Delete</Button>
        }
    ]

  return (
    <div className="mt-10">
      <MainTable columns={columns} data={comment} />
    </div>
  )
}

export default CommentTable