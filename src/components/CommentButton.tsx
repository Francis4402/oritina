"use client"

import { MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'

import { blogCommentType } from '@/app/types/Types'
import Link from 'next/link'
import { getblogComments } from '@/services/BlogComment'


const CommentButton = ({ blogId }: { blogId: string }) => {
    const [comments, setComments] = useState<blogCommentType[]>([]);



    const fetchComments = async () => {
        try {
            const commentList = await getblogComments(blogId);
            setComments(commentList || []);
        } catch (error) {
            toast.error("Failed to load comments");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);



    return (
        <Link href={`/blogs/${blogId}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{comments.length}</span>
            </Button>
        </Link>
    )
}

export default CommentButton