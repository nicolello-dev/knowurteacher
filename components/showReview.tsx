import { Teacher, Review } from "@prisma/client";

import { CircularProgress, Typography } from '@mui/material';

import { useState } from "react";

function CircularProgressWithLabel({ value } : { value: number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircularProgress variant="determinate" value={value} />
        <Typography variant="body2" color="textSecondary" style={{ marginLeft: 10 }}>
            {`${Math.round(value)}%`}
        </Typography>
        </div>
    );
}

enum ReviewElements {
  strictness = "strictness",
  punctuality = "punctuality",
  precision = "precision",
  communication = "communication",
  engagement = "engagement",
  feedbackQuality = "feedbackQuality",
  flexibility = "flexibility",
}

const reviewParts: ReviewElements[] = [
    ReviewElements.strictness,
    ReviewElements.punctuality,
    ReviewElements.precision,
    ReviewElements.communication,
    ReviewElements.engagement,
    ReviewElements.feedbackQuality,
    ReviewElements.flexibility,
];

export function ShowAvgReview({ reviews }: { reviews: Review[] }) {

  const reviewsDict: { [key: string]: number[] } = {
    strictness: [],
    punctuality: [],
    precision: [],
    communication: [],
    engagement: [],
    feedbackQuality: [],
    flexibility: [],
  };

  reviewParts.forEach((p) => {
    reviews.forEach((r) => {
      reviewsDict[p].push(r[p]);
    });
  });

  return <>
    <table className="table m-3 my-0" style={{ margin: '0px' }}>
        <tbody>
            <tr>
                <th>
                    Trait
                </th>
                <th>
                    Rating ({reviews.length})
                </th>
            </tr>
        {
            Object.keys(reviewsDict).map((k: any) => {
                const times = reviewsDict[k];
                const avg = times.reduce((p: any, c: any, i: any) => p + (c - p) / (i + 1), 0);
                return <tr className="container" key={k}>
                    <td key={k}>{k == "feedbackQuality" ? "Feedback Quality" : k.charAt(0).toUpperCase() + k.slice(1)}</td>
                    <td className="text-center">
                        <CircularProgressWithLabel value={avg * 10} />
                    </td>
                </tr>;
            })
        }
        </tbody>
    </table>
  </>;
}

export function RateTeacher({ teacher } : { teacher: Teacher }) {
    const [strictness, setStrictness] = useState<number>(5);
    const [communication, setCommunication] = useState<number>(5);
    const [engagement, setEngagement] = useState<number>(5);
    const [feedbackQuality, setFeedbackQuality] = useState<number>(5);
    const [flexibility, setFlexibility] = useState<number>(5);
    const [precision, setPrecision] = useState<number>(5);
    const [punctuality, setPunctuality] = useState<number>(5);
  
    function rate(e: any) {
        e.preventDefault();
        // fetch(`/api/rate?name=${teacher.name}&school=${teacher.school}&strictness=${strictness}&communication=${communication}&engagement=${engagement}&feedbackQuality=${feedbackQuality}&flexibility=${flexibility}&precision=${precision}&punctuality=${punctuality}`)
        // TODO: Actually add the rating
    }
  
    return (
      <>
        <form
          className="container d-flex flex-column"
          onSubmit={e => rate(e)}
          style={{ maxWidth: '400px', minWidth: '300px' }}
        >
          <label>Strictness: {strictness}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={strictness}
            onChange={e => setStrictness(parseInt(e.target.value))}
          />
  
          <label>Communication: {communication}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={communication}
            onChange={e => setCommunication(parseInt(e.target.value))}
          />
  
          <label>Engagement: {engagement}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={engagement}
            onChange={e => setEngagement(parseInt(e.target.value))}
          />
  
          <label>Feedback Quality: {feedbackQuality}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={feedbackQuality}
            onChange={e => setFeedbackQuality(parseInt(e.target.value))}
          />
  
          <label>Flexibility: {flexibility}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={flexibility}
            onChange={e => setFlexibility(parseInt(e.target.value))}
          />
  
          <label>Precision: {precision}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={precision}
            onChange={e => setPrecision(parseInt(e.target.value))}
          />
  
          <label>Punctuality: {punctuality}/10</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={punctuality}
            onChange={e => setPunctuality(parseInt(e.target.value))}
          />
  
          <input className="btn btn-primary m-3" type="submit" value="Grade" />
        </form>
      </>
    );
  }
  