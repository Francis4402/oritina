"use client"

import { MessageCircle, Send, User, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentValid, commentValidation } from '@/app/zodvalidation/commentValidation'
import { deleteComment, getComments, postcomment } from '@/services/Comment'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { commenttype } from '@/app/types/Types'
import { Card, CardContent } from './ui/card'
import { format, formatDistanceToNow } from 'date-fns'

const CommentButton = ({ blogId }: { blogId: string }) => {
    const [comments, setComments] = useState<commenttype[]>([]);


    const form = useForm<CommentValid>({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            comment: '',
        }
    });

    const { formState: { isSubmitting }, reset } = form;

    const fetchComments = async () => {
        try {
            const commentList = await getComments(blogId);
            setComments(commentList || []);
        } catch (error) {
            toast.error("Failed to load comments");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteComment(id);

            if (res.success) {
                toast.success("comment deleted");
                await fetchComments();
            } else {
                toast.error("failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit: SubmitHandler<CommentValid> = async (data) => {
        try {
            const res = await postcomment({
                ...data,
                blogId
            });

            if (res) {
                toast.success("Comment added successfully!");
                reset();
                fetchComments();
            } else {
                toast.error("Failed to add comment. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred.")
        }
    }

    // Format date using date-fns
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
            
            if (diffInDays < 1) {
                return formatDistanceToNow(date, { addSuffix: true });
            } 
            else if (date.getFullYear() === now.getFullYear()) {
                return format(date, 'MMM d');
            } 
            else {
                return format(date, 'MMM d, yyyy');
            }
        } catch (error) {
            return format(new Date(), 'MMM d, yyyy');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{comments.length}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg rounded-xl">
                <DialogHeader className="px-1">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Comments ({comments.length})
                    </DialogTitle>
                </DialogHeader>

                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
                    {comments.length > 0 ? (
                        <div className='flex flex-col gap-4'>
                            {comments.map((com) => (
                                <div key={com.id} className='flex gap-3 items-start group'>
                                    <Avatar className="h-9 w-9 border flex-shrink-0">
                                        <AvatarImage src={com.user?.image || ""} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Card className='flex-1 bg-muted/5 group-hover:bg-muted/10 transition-colors'>
                                        <CardContent className="p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <div className='flex flex-col gap-1'>
                                                    <span className="font-medium text-sm text-foreground">
                                                        {com.user?.name || "Anonymous"}
                                                    </span>
                                                    <p className="text-sm text-foreground/90">{com.comment}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    {com.createdAt && (
                                                        <span className="text-xs text-muted-foreground flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {formatDate(com.createdAt)}
                                                        </span>
                                                    )}
                                                    <Button 
                                                        onClick={() => handleDelete(com.id!)} 
                                                        variant="outline" 
                                                        size="sm" 
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No comments yet</p>
                            <p className="text-sm">Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>

                <div className="border-t pt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value || ""}
                                                placeholder="Share your thoughts..."
                                                disabled={isSubmitting}
                                                className="resize-none min-h-[80px]"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">
                                    {form.watch('comment')?.length > 0 
                                        ? `${form.watch('comment').length} characters` 
                                        : 'Write something meaningful...'
                                    }
                                </span>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !form.formState.isValid}
                                    className="gap-1.5"
                                    size="sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Post Comment
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentButton