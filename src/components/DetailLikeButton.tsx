"use client"

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getLikesById, postLike } from '@/services/Like'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FaHeart } from 'react-icons/fa'


interface LikeButtonProps {
  blogId: string
}

export function DetailLikeBtton({ blogId }: LikeButtonProps) {
  const [likes, setLikes] = useState<any[]>([]);

  const {data: session} = useSession();

  const fetchLikes = async () => {
    try {
      const likesData = await getLikesById(blogId);
      setLikes(likesData);
      
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  };


  const like = likes.find(like => like.blogId === blogId && like.userId === session?.user?.id && like.liked === true);
  
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

  const handleToastNotification = () => {
    toast.error("You are not logged in", {
      description: "Please login to like the blog",
    });
  }

  useEffect(() => {
    fetchLikes();
  }, [blogId]);


  return (
    <div>
      {
        session?.user ? (
            <Button onClick={handleLike} variant={"default"} size={"lg"}>
                {
                    isLiked ? (
                        <FaHeart className="h-4 w-4" />
                    ) : <Heart className="h-4 w-4" />
                }
                Like
                <span>{likes.length}</span>
          </Button>
        ) : <Button
            variant="ghost"
            size="lg"
            onClick={handleToastNotification}
          >
              {
                isLiked ? (
                    <FaHeart className="h-4 w-4" />
                ) : <Heart className="h-4 w-4" />
              }
            <span>{likes.length}</span>
          </Button>
      }
    </div>
  )
}