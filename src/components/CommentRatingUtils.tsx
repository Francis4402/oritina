"use client"

import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Edit, Send, Star } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { productCommentType, Rating } from '@/app/types/Types'
import { format, formatDistanceToNow } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CommentValid, commentValidation } from '@/app/zodvalidation/commentValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Textarea } from './ui/textarea'
import { deleteProductComment, postproductComment } from '@/services/ProductComments'
import { fetchRatings, postRating } from '@/services/Rating'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const CommentRatingUtils = ({commentList, productId}: {commentList: productCommentType[], productId: string}) => {
    
    const [userRating, setUserRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [isRating, setIsRating] = useState(false);
    const [ratings, setRatings] = useState<Rating[]>([]);

    const {data: session} = useSession();

    useEffect(() => {
        fetchRatings(productId).then((response) => {
            setRatings(response.ratings);
        });
    }, [productId]);

    const form = useForm<CommentValid>({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            comment: '',
        }
    });

    const {formState: {isSubmitting}, reset} = form;

    // Function to get rating for a specific user
    const getUserRating = (userId: string): number => {
        const userRating = ratings.find(rating => rating.user.id === userId);
        return userRating ? userRating.rating : 0;
    };

    // Function to render star rating display
    const renderStarRating = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                            star <= rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-slate-300 dark:text-slate-600'
                        }`}
                    />
                ))}
            </div>
        );
    };

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
                // Refresh ratings after posting
                const updatedRatings = await fetchRatings(productId);
                setRatings(updatedRatings.ratings);
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
                        
                        {/* Comments List */}
                        {commentList.map((comment: productCommentType) => {
                            const userStarRating = getUserRating(comment.user.id!);
                            
                            return (
                                <div key={comment.id} className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className='flex justify-between items-start'>
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={comment.user.image} />
                                                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-red-400 text-white text-sm">
                                                    {comment.user.name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h5 className="font-medium text-slate-900 dark:text-slate-100">{comment.user.name}</h5>
                                                    
                                                    {/* Display user's rating */}
                                                    {userStarRating > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            {renderStarRating(userStarRating)}
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                                ({userStarRating}.0)
                                                            </span>
                                                        </div>
                                                    )}
                                                    
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {formatDate(comment.createdAt!)}
                                                    </span>

                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Edit size={16} className="text-slate-400 hover:text-slate-600" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>

                                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>

                                        {
                                            session?.user.id === comment.user.id && <Button onClick={() => handleDelete(comment.id!)} variant={"destructive"}>Delete</Button>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CommentRatingUtils;