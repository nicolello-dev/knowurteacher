import type { Review } from "@prisma/client";

import type { APIResponse } from "@/types/api";

import { useState, useEffect, createContext } from "react";

import { getRelativeTime } from "@/lib/time";

import VotingComponent from "@/components/review/voting";

// For ease of readability
type StateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

function refetchReviews(teacherId: string, setIsLoading: StateFunction<boolean>, setReviews: StateFunction<Review[]|null>, setSuccess: StateFunction<boolean|null>) {
    setIsLoading(true);
    teacherId && fetch(`/api/teacher/review/get?teacherID=${teacherId}`)
            .then(r => r.json())
            .then((r: APIResponse<Review[]>) => {
                if(!r.success) {
                    throw new Error(r.message!);
                }
                setReviews(r.data);
                setSuccess(true);
            })
            .catch(err => {
                setSuccess(false);
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
}

export default function ShowReviews({ teacherId }: { teacherId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [blur, setBlur] = useState<boolean>(true);

    const refetchReviewsWithArguments = () => refetchReviews(teacherId, setIsLoading, setReviews, setSuccess);
    
    useEffect(() => {
        refetchReviews(teacherId, setIsLoading, setReviews, setSuccess);
    }, [teacherId]);

    if (!success) {
        return <h1 className="text-center text-3xl dark:text-darktext">Something went wrong! Please try again</h1>
    }

    if (isLoading || reviews == null) {
        return <h1 className="text-center text-3xl dark:text-darktext">Loading reviews...</h1>;
    }

    if (reviews.length == 0) {
        return <p className="mx-auto text-center m-6 text-xl dark:text-darktext">No comments yet! Be the first one!</p>
    }

    return <>
        {
            reviews.map((review: Review, i: number) => <article key={i} className="mx-auto p-5 m-5 bg-white container rounded-xl relative">
                <div className="my-2 flex flex-row flex-wrap justify-between items-center">
                    <p className="text-gray-700">
                        Reviewed <span>{getRelativeTime(review.createdAt)}</span>,
                        last updated <span>{getRelativeTime(review.updatedAt)}</span>
                    </p>
                    <VotingComponent review={review} refetchReviews={refetchReviewsWithArguments}/>
                </div>
                <div className={`${review.reports > 0 && blur ? "blur" : ""}`}>
                    <h2 className="font-bold text-lg">Teaching: </h2>
                    <p>{review.teaching}</p>
                    <h2 className="font-bold text-lg">Fairness: </h2>
                    <p>{review.fairness}</p>
                    <h2 className="font-bold text-lg">General: </h2>
                    <p>{review.general}</p>
                </div>
                {
                    blur && review.reports > 0 && <div className="mx-auto absolute w-full text-center top-0 bottom-0 translate-y-1/2">
                        <p>This review was flagged by the community as being harmful</p>
                        <button className="bg-primary text-white p-3 m-2 rounded-3xl" onClick={() => setBlur(false)}>Proceed and unblur</button>
                    </div>
                }
            </article>)
        }
    </>
}