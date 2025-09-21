"use client"


import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Edit, Send, Star } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { productCommentType } from '@/app/types/Types'
import { format, formatDistanceToNow } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CommentValid, commentValidation } from '@/app/zodvalidation/commentValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Textarea } from './ui/textarea'
import { deleteProductComment, postproductComment } from '@/services/ProductComments'
import { postRating } from '@/services/Rating'
import { useState } from 'react'


const CommentRatingUtils = ({commentList, productId}: {commentList: productCommentType[], productId: string}) => {
    
    const [userRating, setUserRating] = useState<number>(0)
    const [hoverRating, setHoverRating] = useState<number>(0)
    const [isRating, setIsRating] = useState(false)


    const form = useForm<CommentValid>({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            comment: '',
        }
    });

    const {formState: {isSubmitting}, reset} = form;

    const handleRating = async (rating: number) => {
        if (isRating) return;
        
        setIsRating(true)
        try {
            const res = await postRating({
                productId,
                ratings: rating
            });

            if(res) {
                setUserRating(rating)
                toast.success("Rating submitted successfully!")
            } else {
                toast.error("Failed to submit rating")
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to submit rating")
        } finally {
            setIsRating(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteProductComment(id);

            if(res.success) {
                toast.success("comment deleted");
            } else {
                toast.error("failed to comment");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const onSubmit: SubmitHandler<CommentValid> = async (data) => {
        try {
            const res = await postproductComment({
                ...data,
                productId
            });

            if (res) {
                toast.success("Comment added successfully!");
                reset();
            } else {
                toast.error("Failed to add comment. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred.")
        }
    }


    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
            
            if (diffInDays < 1) {
                return formatDistanceToNow(date, { addSuffix: true });
            } 
            else if (date.getFullYear() === now.getFullYear()) {
                return format(date, 'MMM d, y');
            } 
            else {
                return format(date, 'M d, yyyy');
            }
        } catch (error) {
            return format(new Date(), 'MMM d, yyyy');
        }
    }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
        <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">Comments & Reviews</h3>
                
                {/* Add Comment Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Share Your Thoughts</h4>
                
                {/* Rating Stars */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rate this Product</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                                key={star} 
                                className={`h-6 w-6 cursor-pointer transition-colors duration-150 hover:text-yellow-500 hover:scale-110 ${
                                    star <= (hoverRating || userRating) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-slate-300 dark:text-slate-600'
                                } ${isRating ? 'opacity-50' : ''}`}
                                onMouseEnter={() => !isRating && setHoverRating(star)}
                                onMouseLeave={() => !isRating && setHoverRating(0)}
                                onClick={() => !isRating && handleRating(star)}
                            />
                        ))}
                    </div>
                    {userRating > 0 && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            You rated this {userRating} star{userRating > 1 ? 's' : ''}
                        </p>
                    )}
                    {isRating && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Submitting rating...
                        </p>
                    )}
                </div>

                    {/* Comment Textarea */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                            <FormField control={form.control} name="comment" render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            id="comment"
                                            {...field}
                                            value={field.value || ""}
                                            rows={4}
                                            placeholder="What did you think about this article? Share your insights..."
                                            />
                                    </FormControl>
                                </FormItem>
                            )} />

                            <Button type='submit' className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                <Send className="h-4 w-4" />
                                {isSubmitting ? "...Posting" : "Post Comment"}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Existing Comments */}
                <div className="space-y-6">
                <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">Recent Comments ({commentList.length})</h4>
                
                {/* Comment 1 */}
                {
                    commentList.map((comments: productCommentType) => (
                    <div key={comments.id} className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className='flex justify-between items-start'>
                        <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                            <AvatarImage src={comments.user.image} />
                            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-red-400 text-white text-sm">
                                SA
                            </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-medium text-slate-900 dark:text-slate-100">{comments.user.name}</h5>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                        key={star} 
                                        className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(comments.createdAt!)}</span>

                                <Tooltip>
                                <TooltipTrigger><Edit size={20} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                                </Tooltip>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                {comments.comment}
                            </p>
                            </div>
                        </div>

                            <Button onClick={() => handleDelete(comments.id!)} variant={"destructive"}>Delete</Button>
                        </div>
                    </div>
                    ))
                }

                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default CommentRatingUtils