import { svgs } from "@/components/svgs";
import { Review } from "@prisma/client";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function reportReview(id: string, refetch: () => any) {
  fetch("/api/teacher/review/report", {
    method: "POST",
    body: JSON.stringify({ id }),
  }).finally(() => refetch());
}

function downVoteReview(id: string, refetch: () => any) {
  fetch("/api/teacher/review/vote/add", {
    method: "POST",
    body: JSON.stringify({ type: 'down', commentId: id }),
  }).finally(() => refetch());
}

function upVoteReview(id: string, refetch: () => any) {
  fetch("/api/teacher/review/vote/add", {
    method: "POST",
    body: JSON.stringify({ type: 'up', commentId: id }),
  }).finally(() => refetch());
}

function handleRemoveReview(refetch: () => any) {
  toast.promise(
    fetch("/api/teacher/review/remove", {
      method: "POST",
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("");
      })
      .finally(() => refetch()),
    {
      pending: "Waiting for server response...",
      success: "Successfully deleted your review",
      error: "Error occurred. Are you sure you're signed in?",
    },
  );
}

type Layout =
  | {
      classNameExtras: string;
      ariaLabel: string;
      onClick: (...args: any) => any;
      button: true;
      content: React.ReactNode;
    }
  | {
      classNameExtras: string;
      onClick: () => void;
      button: false;
    };

export const reviewLayouts: Layout[] = [
  {
    classNameExtras: "bg-primary flex flex-row gap-x-2",
    ariaLabel: "Report",
    onClick: (id: string, refetchReviews: () => any) =>
      reportReview(id, refetchReviews),
    button: true,
    content: (
      <div className="flex flex-row items-center gap-2">
        {svgs.attention(18, 18, "#FFF")} <span className="hidden sm:inline">Report</span>
      </div>
    ),
  },
  {
    classNameExtras: "fill-black dark:fill-white",
    ariaLabel: "Downvote",
    onClick: (id: string, refetchReviews: () => any) => {
      downVoteReview(id, refetchReviews);
    },
    button: true,
    content: svgs.downvote(18, 18, ""),
  },
  {
    classNameExtras: "w-[18px] text-center text-black dark:text-white",
    onClick: () => {},
    button: false,
  },
  {
    classNameExtras: "fill-black dark:fill-white",
    ariaLabel: "upvote",
    onClick: (id: string, refetchReviews: () => any) => {
      upVoteReview(id, refetchReviews);
    },
    button: true,
    content: svgs.upvote(18, 18, ""),
  },
];

export default function VotingComponent({
  review,
  votes,
  refetchReviews,
  userId,
}: {
  review: Review,
  votes: number,
  refetchReviews: () => any,
  userId: string
}) {

  const session = useSession();

  return (
    <div className="flex flex-row gap-x-2 items-center">
      {review.authorID == userId && (
        <button
          className="p-2"
          onClick={() => handleRemoveReview(refetchReviews)}
        >
          {svgs.trash(18, 18)}
        </button>
      )}
      {reviewLayouts.map((element, i) => {
        if (element.button) {
          return (
            <button
              key={i}
              className={`text-white p-2 rounded ${element.classNameExtras} ${session.status == "authenticated" ? "" : "opacity-40 cursor-not-allowed"}`}
              onClick={() => session.data?.user?.email ? element.onClick(review.id, refetchReviews) : toast.error("Please log in")}
              aria-label={element.ariaLabel}
            >
              {element.content}
            </button>
          );
        } else {
          return (
            <p key={i} className={element.classNameExtras}>
              {votes}
            </p>
          );
        }
      })}
    </div>
  );
}
