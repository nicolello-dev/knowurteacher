import type { Review } from "@prisma/client";

import type { APIResponse } from "@/types/api";

import { useState, useEffect } from "react";

import { getRelativeTime } from "@/lib/time";

import { svgs } from "@/components/svgs";

export default function ShowReviews({ teacherId }: { teacherId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    
    useEffect(() => {
        teacherId && fetch(`/api/teacher/review/get?teacherID=${teacherId}`)
            .then(r => r.json())
            .then((r: APIResponse<Review[]>) => {
                setIsLoading(false);
                setReviews(r.data);
                setSuccess(true);
            })
            .catch(err => {
                setIsLoading(false);
                setSuccess(false);
                console.error(err);
            })
    }, [teacherId]);

    function reportReview(id: string) {
        fetch('/api/teacher/review/report', {
            body: JSON.stringify({ id })
        })
    }

    if(!success) {
        return <h1 className="text-center text-3xl">Something went wrong! Please try again</h1>
    }
    
    if(isLoading || reviews == null) {
        return <h1 className="text-center text-3xl">Loading reviews...</h1>;
    }

    if(reviews.length == 0) {
        return <p className="mx-auto text-center m-6 text-xl">No comments yet! Be the first one!</p>
    }
    
    return <>
        {
            reviews.map((review: Review, i: number) => <article key={i} className="mx-auto p-5 m-5 bg-secondary container rounded-xl">
                <div className="my-2 flex flex-row flex-wrap justify-between items-center">
                    <p className="text-gray-700">
                        Reviewed <span>{getRelativeTime(review.createdAt)}</span>, last update <span>{getRelativeTime(review.updatedAt)}</span>
                    </p>
                    <button className="flex flex-row items-center gap-x-2 border p-2 rounded border-black" onClick={_ => reportReview(review.id)}>
                        {svgs.attention(18, 18, "#374151")} Report
                    </button>
                </div>
                <div>
                    <h2 className="font-bold text-lg">Teaching: </h2>
                    <p>{review.teaching}</p>
                    <h2 className="font-bold text-lg">Fairness: </h2>
                    <p>{review.fairness}</p>
                    <h2 className="font-bold text-lg">General: </h2>
                    <p>{review.general}</p>
                </div>
            </article>)
        }
    </>
}