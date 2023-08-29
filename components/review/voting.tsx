import { svgs } from "@/components/svgs";
import { Review } from "@prisma/client";

function reportReview(id: string) {
    fetch('/api/teacher/review/report', {
        method: "POST",
        body: JSON.stringify({ id })
    })
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

type Layout = {
    classNameExtras: string,
    onClick: (...args: any) => any,
    button: true
    content: React.ReactNode
} | {
    classNameExtras: string,
    onClick: () => void,
    button: false,
}

export const reviewLayouts: Layout[] = [
    {
        classNameExtras: "flex flex-row gap-x-2",
        onClick: (id: string) => reportReview(id),
        button: true,
        content: <div className="flex flex-row items-center gap-2">
                    {svgs.attention(18, 18, "#FFF")} Report
                 </div>
    },
    {
        classNameExtras: "",
        onClick: (id: string, refetchReviews: () => any) => {
            downVoteReview(id, refetchReviews);
        },
        button: true,
        content: svgs.downvote(18, 18, "#FFF")
    },
    {
        classNameExtras: "w-[18px] text-center",
        onClick: () => {},
        button: false
    },
    {
        classNameExtras: "",
        onClick: (id: string, refetchReviews: () => any) => {
            upVoteReview(id, refetchReviews);
        },
        button: true,
        content: svgs.upvote(18, 18, "#FFF")
    }
]

export default function VotingComponent({ review, refetchReviews }: { review: Review, refetchReviews: () => any }) {
    
    return <div className="flex flex-row gap-x-2 items-center">
        {
            reviewLayouts.map(element => {
                if (element.button) {
                    return <button
                        className={`bg-primary text-white p-2 rounded ${element.classNameExtras}`}
                        onClick={() => element.onClick(review.id, refetchReviews)}>

                        {element.content}

                    </button>
                } else {
                    return <p className={element.classNameExtras}>{review.points}</p>
                }
            })
        }
    </div>
}