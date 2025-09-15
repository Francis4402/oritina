"use client"

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getLikes, postLike } from '@/services/Like'
import { useEffect, useState } from 'react'

interface LikeButtonProps {
  blogId: string
}

export function LikeButton({ blogId}: LikeButtonProps) {
  const [userLiked, setUserLiked] = useState();

  const handleLike = async () => {
    try {
      const data = await postLike(blogId);
      
      const liked = Boolean(data.liked);
           
      toast.success(liked ? "Liked!" : "Like removed");
      
    } catch (error) {      
      console.log(error);
    }
  }

  useEffect(() => {
    getLikes().then((data) => {
      setUserLiked(data);
    });
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
    >
      <Heart className={`h-4 w-4`} />
      <span>{userLiked ? "Liked" : "Like"}</span>
    </Button>
  )
}