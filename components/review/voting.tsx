import { svgs } from "@/components/svgs";
import { Review } from "@prisma/client";
import { toast } from "react-toastify";

function reportReview(id: string, refetch: () => any) {
    fetch('/api/teacher/review/report', {
        method: "POST",
        body: JSON.stringify({ id })
    })
    .finally(() => refetch())
}

function downVoteReview(id: string, refetch: () => any) {
    fetch('/api/teacher/review/downvote', {
        method: "POST",
        body: JSON.stringify({ id })
    })
    .finally(() => refetch())
}

function upVoteReview(id: string, refetch: () => any) {
    fetch('/api/teacher/review/upvote', {
        method: "POST",
        body: JSON.stringify({ id })
    })
    .finally(() => refetch())
}

function handleRemoveReview(refetch: () => any) {
    toast.promise(
        fetch('/api/teacher/review/remove', {
            method: 'POST'
        })
        .then(r => {
            if(r.ok) {
                return r.json();
            }
            throw new Error('');
        })
        .finally(() => refetch()),
        {
            pending: "Waiting for server response...",
            success: "Successfully deleted your review",
            error: "Error occurred. Are you sure you're signed in?"
        }
    );
}

type Layout = {
    classNameExtras: string,
    ariaLabel: string,
    onClick: (...args: any) => any,
    button: true
    content: React.ReactNode
} | {
    classNameExtras: string
    onClick: () => void,
    button: false,
}

export const reviewLayouts: Layout[] = [
    {
        classNameExtras: "bg-primary flex flex-row gap-x-2",
        ariaLabel: "Report",
        onClick: (id: string, refetchReviews: () => any) => reportReview(id, refetchReviews),
        button: true,
        content: <div className="flex flex-row items-center gap-2">
                    {svgs.attention(18, 18, "#FFF")} Report
                 </div>
    },
    {
        classNameExtras: "",
        ariaLabel: "Downvote",
        onClick: (id: string, refetchReviews: () => any) => {
            downVoteReview(id, refetchReviews);
        },
        button: true,
        content: svgs.downvote(18, 18, "#000")
    },
    {
        classNameExtras: "w-[18px] text-center text-black",
        onClick: () => {},
        button: false
    },
    {
        classNameExtras: "",
        ariaLabel: "upvote",
        onClick: (id: string, refetchReviews: () => any) => {
            upVoteReview(id, refetchReviews);
        },
        button: true,
        content: svgs.upvote(18, 18, "#000")
    }
]

export default function VotingComponent({ review, refetchReviews, userId }: { review: Review, refetchReviews: () => any, userId: string }) {
    
    return <div className="flex flex-row gap-x-2 items-center">
        {
            review.authorID == userId && <button
                className="p-2"
                onClick={() => handleRemoveReview(refetchReviews)}>{svgs.trash(18, 18)}</button>
        }
        {
            reviewLayouts.map((element, i) => {
                if (element.button) {
                    return <button
                        key={i}
                        className={`text-white p-2 rounded ${element.classNameExtras}`}
                        onClick={() => element.onClick(review.id, refetchReviews)}
                        aria-label={element.ariaLabel}>

                        {element.content}

                    </button>
                } else {
                    return <p key={i} className={element.classNameExtras}>{review.points}</p>
                }
            })
        }
    </div>
}