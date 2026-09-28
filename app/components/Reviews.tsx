'use client';

import {useEffect, useState} from "react";
import Image from "next/image";

interface Review {
  date: string;
  review: string;
  score: number;
  tags: string[];
  user: {
    username: string;
    images: {
      jpg: {
        image_url: string;
      }
    }
  }
}

export const Reviews = ({id}: {id: string}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState<number>(0);

  /**
   * Determines the color of the review tag based on the tag
   * @param tag - the tag of the review
   * @returns the color of the tag CSS class
   */
  const reviewColors = (tag: string) => {
    if (tag.includes("Not"))
      return 'text-red-700';
    else if (tag.includes("Mixed"))
      return 'text-yellow-500';
    else
      return 'text-green-500'
  }

  /**
   * Updates the current index of the review array to the next index
   *
   */
  const handleNext = () => {
    if (current < reviews.length - 1)
      setCurrent(current + 1);
  }

  /**
   * Updates the current index of the review array to the previous index
   *
   */
  const handlePrevious = () => {
    if (current > 0)
      setCurrent(current - 1);
  }

  useEffect(() => {
    fetch(`https://api.tenrai.org/v1/anime/${id}/reviews`)
      .then(res => res.json())
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.log(err))
  }, [id]);

  return (
    <div className={"lg:max-w-1/2 flex flex-col justify-center items-center p-10"}>
      {reviews.length ? (
        <div className={"flex flex-col justify-center items-center"}>
          <h1 className={"text-4xl mb-10"}>Reviews</h1>
          <div className={"flex flex-col gap-4 mb-5"}>
            <p className={"text-gray-500"}>{new Date(reviews[current].date).toLocaleDateString()}</p>
            <div className={"flex flex-col lg:flex-row justify-between items-center gap-4"}>
              <div className={"flex gap-2 items-center"}>
                <Image src={reviews[current].user.images.jpg.image_url} alt={reviews[current].user.username} width={50} height={50}/>
                <p>{reviews[current].user.username}</p>
              </div>
              <p className={`${reviewColors(reviews[current].tags[0])}`}>{reviews[current].tags[0]}</p>
              <p className={"text-center"}>Score: {reviews[current].score}</p>
            </div>

            <p>{reviews[current].review}</p>
          </div>


          <div className={"flex gap-5 mt-10"}>
            {current > 0 ? <p className={"text-pink-400 cursor-pointer"} onClick={handlePrevious}>Previous</p> : undefined}
            {current < reviews.length-1 ? <p className={"text-pink-400 cursor-pointer"} onClick={handleNext}>Next</p> : undefined}
          </div>
        </div>
      ) : undefined}
    </div>
  )
}