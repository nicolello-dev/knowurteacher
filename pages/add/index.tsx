import Image from "next/image";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { toast } from "react-toastify";

export default function AddTeacher() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  async function addTeacher() {
    if (!name || !school) {
      return;
    }
    const body = {
      name: name,
      school: school,
    };

    await toast
      .promise(
        fetch(`/api/teacher/add`, {
          method: "POST",
          body: JSON.stringify(body),
        })
          .then((r) => {
            if (r.ok) {
              return r.json();
            }
            throw new Error("");
          })
          .catch(),
        {
          pending: "Loading response from server...",
          error:
            "Couldn't add teacher. Please check that you're logged in and the teacher doesn't already exist.",
          success: "Teacher added successfully!",
        },
      )
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Header />
      <h1 className="text-center m-6 mt-8 text-4xl dark:text-darktext">
        Add a teacher:
      </h1>
      <div className="relative flex flex-col rounded bg-white dark:bg-[#26092a] items-center w-min my-[100px] mx-auto min-w-[270px]">
        <div className="flex-auto p-6">
          <Image
            src={"https://cdn.knowurteacher.com/defaultpfp.png"}
            height={200}
            width={200}
            alt={`${name}'s picture`}
          />
        </div>
        <div className="flex-auto p-6 flex flex-col items-center dark:text-darktext">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <label className="form-label m-2">School:</label>
          <input
            type="text"
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required={true}
          />
          <button
            className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white m-2 mt-6 bg-primary dark:bg-darkprimary"
            onClick={(_) => addTeacher()}
          >
            Add
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
