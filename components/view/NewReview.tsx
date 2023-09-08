import { useState } from "react";

export default function NewReview({ teacherId } : { teacherId: string }) {
    const [text, setText] = useState<string>("");

    function handleOnSubmit(e: any) {
        e.preventDefault();
        fetch('/api/teacher/review/add', {
            method: "POST",
            body: JSON.stringify({
                text,
                teacherId
            })
        });
    }

    return <div className="mx-auto flex flex-row justify-center align-center dark:text-darktext"> 
            <form onSubmit={e => handleOnSubmit(e)} className="flex flex-col gap-6 w-80% max-w-[500px] my-16 m-5">
            <h1 className="text-xl text-center font-bold">Do you know this teacher? Review them!</h1>
            <p className="text-lg text-center">Please describe your teacher in these fields: </p>
            <label>Comment</label>
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="h-32 p-2 text-primary">
            </textarea>
            <button type="submit" className="bg-primary p-3 m-6 w-min text-white rounded-xl mx-auto">
                Submit
            </button>
        </form>
    </div>
}