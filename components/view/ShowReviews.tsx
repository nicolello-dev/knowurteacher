// TODO: Implement an actual view of the reviews

import type { Review } from "@prisma/client";

import type { APIResponse } from "@/types/api";

import { useState, useEffect } from "react";

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
    }, [teacherId])

    if(isLoading || reviews == null) {
        return <h1 className="text-center text-3xl">Loading reviews...</h1>;
    }

    if(reviews.length == 0) {
        return <p className="mx-auto text-center m-6 text-xl">No comments yet! Be the first one!</p>
    }
    
    return <>
        {
            JSON.stringify(reviews)
        }
    </>
}