import { useState } from "react";

export default function NewReview({ teacherId } : { teacherId: string }) {
    const [reviewData, setReviewData] = useState({
        teaching: "",
        fairness: "",
        general: ""
    });

    function handleOnSubmit(e: any) {
        e.preventDefault();
        fetch('/api/teacher/review/add', {
            method: "POST",
            body: JSON.stringify({
                ...reviewData,
                teacherId
            })
        });
    }

    return <form onSubmit={e => handleOnSubmit(e)} className="flex flex-col gap-6 w-80% max-w-[500px] mx-auto my-16">
        <h1 className="text-xl text-center font-bold">Do you know this teacher? Review them!</h1>
        <p className="text-lg text-center">Please describe your teacher in these fields: </p>
        <label>
            Teaching:
        </label>
        <textarea value={reviewData.teaching} onChange={e => setReviewData(p => {
            return {...p, teaching: e.target.value}
        })} className="h-32 p-2">
        </textarea>
        <label>
            Fairness:
        </label>
        <textarea value={reviewData.fairness} onChange={e => setReviewData(p => {
            return {...p, fairness: e.target.value}
        })} className="h-32 p-2">
        </textarea>
        <label>
            General:
        </label>
        <textarea value={reviewData.general} onChange={e => setReviewData(p => {
            return {...p, general: e.target.value}
        })} className="h-32 p-2">
        </textarea>
        <button type="submit" className="bg-primary p-3 m-6 w-min text-white rounded-xl mx-auto">
            Submit
        </button>
    </form>
}