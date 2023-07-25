import { Teacher, Review, Labels } from "@prisma/client";

import { useState } from "react";
import { Session } from "next-auth";

export function ShowAvgReview({ reviews }: { reviews: Review[] }) {

  const reviewsDict: { [key: string]: number } = {
  };

  for(const key in Labels) {
    reviewsDict[key] = 0;
  }

  reviews.forEach(r => {
    r.labels.forEach(l => reviewsDict[l] += 1);
  });

  return <>
    <table className="table m-3 my-0" style={{ margin: '0px' }}>
        <tbody>
            <tr>
                <th>
                    Label
                </th>
                <th>
                    Count ({reviews.length})
                </th>
            </tr>
        {
                                    // Sort the labels in descending order
            Object.keys(reviewsDict).sort((a, b) => {
              if(reviewsDict[a] < reviewsDict[b]) {
                return 1
              } else if(reviewsDict[a] == reviewsDict[b]) {
                return 0
              }
              return -1
            }).map((k: any) => {
                const times = reviewsDict[k];
                return <tr className="container" key={k}>
                    <td key={k}><kbd>{k}</kbd></td>
                    <td className="text-center" key={k + times}>
                      {times ? times.toString() : "-"}
                    </td>
                </tr>;
            })
        }
        </tbody>
    </table>
  </>;
}

export function RateTeacher({ teacher, session, setError, setShowSuccess, setShowError, setReviews } : { teacher: Teacher, session: Session | null, setError: Function, setShowSuccess: Function, setShowError: Function, setReviews: Function }) {
    const [labels, setLabels] = useState<Labels[]>([]);
    const [currentLabel, setCurrentLabel] = useState<string>(Object.keys(Labels)[0]);
  
    function rate() {
      if(!session) {
        setError("Not signed in! Please do in order to rate and add teachers.");
        setShowError(true);
        return;
      } else {
        const email = session.user?.email
        const body = {
          email,
          name: teacher.name,
          school: teacher.school,
          labels
        }
        fetch('/api/rate', {
          method: "POST",
          body: JSON.stringify(body)
        })
          .then(r => r.json())
          .then(r => {
            if(r.success) {
              setShowSuccess(true);
              setLabels([]);
              setCurrentLabel("");
              setShowError(false);
              // If successful refetch the reviews
              fetch(`/api/getTeacherReviews?teacherID=${teacher.id}`)
                .then(r => r.json())
                .then(r => setReviews(r))
            } else {
              setError(r.message);
              setShowError(true);
            }});
      }
    }

    function handleNewLabel() {
      // Validate user input
      if(!Object.keys(Labels).includes(currentLabel) || labels.includes(currentLabel as Labels)) {
        // user input is not a valid Label or labels already includes the user's input
        return;
      }
      setLabels([...labels, currentLabel as Labels]);
      const availableLabels = Object.keys(Labels).filter(l => !labels.includes(l as Labels) && l != currentLabel);
      setCurrentLabel(availableLabels[0]);
    }
  
    return (
      <>
          <div className="m-3 d-flex flex-column flex-wrap align-content-center w-full max-w-3xl">
            <label
              htmlFor="newteacherlabel"
              className="form-label d-flex flex-row flex-wrap">
                Labels chosen: 
                {
                labels.map((l, i) => {
                  return  <kbd
                            key={i}
                            onClick={_ => setLabels(labels.filter(label => label != l))}>
                              {l}
                          </kbd>
                })
                }
            </label>
            <select
              name="label"
              id="newteacherlabel"
              onChange={e => setCurrentLabel(e.target.value)}
              value={currentLabel}>
              {
                Object.keys(Labels).filter(l => ! labels.includes(l as Labels)).map((l, i) => {
                  return <option value={l} key={i}>{l}</option>
                })
              }
            </select>
            <button className="btn btn-secondary m-3" onClick={handleNewLabel}>Add</button>
          </div>
  
          <input className="btn btn-primary m-3" type="submit" value="Grade" onClick={_ => rate()} />
      </>
    );
  }
  