import { APIResponse } from "@/types/api";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

export default function NewReview({ teacherId }: { teacherId: string }) {
  const [show, setShow] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    fetch(`/api/teacher/review/hasUserWritten?id=${teacherId}`)
      .then((r) => r.json())
      .then((r: APIResponse<boolean>) => {
        if (r.data == true) {
          setShow(false);
        }
      });
  }, [teacherId]);

  function handleOnSubmit(e: any) {
    e.preventDefault();
    toast
      .promise(
        fetch("/api/teacher/review/add", {
          method: "POST",
          body: JSON.stringify({
            text,
            teacherId,
          }),
        }).then((r) => {
          if (r.ok) {
            return r.json();
          }
          throw new Error("");
        }),
        {
          pending: "Waiting for server response...",
          error:
            "Error adding your comment. Are you logged in or did you already write one?",
          success: "Comment successfully added",
        },
      )
      .catch((err) => console.error(err));
  }

  if (show == false) {
    return (
      <p className="mx-auto text-center m-32">
        You already wrote a comment! Please delete your previously-written one
        and reload the page
      </p>
    );
  }

  return (
    <div className="mx-auto flex flex-row justify-center align-center dark:text-darktext">
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className="flex flex-col gap-6 w-80% max-w-[500px] my-16 m-5"
      >
        <h1 className="text-xl text-center font-bold">
          Do you know this teacher? What do you want to say about them?
        </h1>
        <label htmlFor="newCommentTextArea">Comment</label>
        <textarea
          id="newCommentTextArea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-32 p-2 text-black border border-black dark:bg-darksecondary dark:border-primary dark:text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-primary p-3 m-6 w-min text-white rounded-xl mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
