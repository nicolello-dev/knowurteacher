import { useState } from "react";

export default function RateTeacher() {

    const [showInput, setShowInput] = useState<boolean>(true);
    
    return <>
        <p>
            Do you know this teacher? Leave a review! <span onClick={setShowInput(p => !p)}>{showInput ? "hide" : "show"}</span>
        </p>
        {
            // teaching, fairness, general
            showInput && <>
                <label for="Teaching">Please describe the teacher&apos; teaching style and effect</label>
                <textarea id="Teaching"/>
                <label for="Fairness">Please describe how fair the teacher is in class</label>
                <textarea id="Fairness"/>
                <label for="General">Feel free to include anything else here</label>
                <textarea id="General"/>
            </>
        }
    </>
}