"use client"

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getLikesById, postLike } from '@/services/Like'
import { useEffect, useState } from 'react'


interface LikeButtonProps {
  blogId: string
}

export function LikeButton({ blogId }: LikeButtonProps) {
  const [likes, setLikes] = useState<any[]>([]);

  const fetchLikes = async () => {
    try {
      const likesData = await getLikesById(blogId);
      setLikes(likesData);
      
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  };

  const like = likes.find(like => like.blogId === blogId && like.liked === true);
  
  const isLiked = Boolean(like);

  const handleLike = async () => {
    try {
      const data = await postLike(blogId);
      
      const liked = Boolean(data.liked);

      await fetchLikes();
           
      toast.success(liked ? "Liked!" : "Like removed");
      
    } catch (error) {      
      console.log(error);
      toast.error("Failed to update like");
    }
  }

  useEffect(() => {
    fetchLikes();
  }, [blogId]);


  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
    >
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
      <span>{likes.length}</span>
    </Button>
  )
}