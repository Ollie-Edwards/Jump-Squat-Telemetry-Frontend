import { useEffect, useState } from "react";
import dayjs from "dayjs";

import MultiGraph from "./MultiGraph";

import { getAthletes, getAllAthleteTrials, getSingleTrial } from "../api/manageAthletes"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectTrial({ sendDataToParent, boldColour, backgroundColour }) {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState("");

  const [athleteTrials, setAthleteTrials] = useState([]);
  const [selectedTrial, setSelectedTrial] = useState("");

   const getAllAthletes = async () => {
    try {
      const response = await getAthletes();
      setAthletes(response);
      console.log(response);
    } finally { }
  };

   const updateAthleteTrials = async (athleteName : string) => {
    try {
      const response = await getAllAthleteTrials(athleteName);
      setAthleteTrials(response);
    } finally { }
  };

  const getTrial = async (trialId : string) => {
    try {
      const response = await getSingleTrial(trialId);

      const coloredData = response.map((data: any) => ({
        ...data,
        colour: backgroundColour, // or choose logic to assign colors
      }));

      // 2️⃣ Compute average time & acceleration as a separate variable
      const numTrials = response.length;
      const numPoints = response[0].time.length; // assumes same length for all trials

      const sumTime = new Array(numPoints).fill(0);
      const sumAcceleration = new Array(numPoints).fill(0);

      response.forEach(trial => {
        trial.time.forEach((t: number, i: number) => sumTime[i] += t);
        trial.acceleration.forEach((a: number, i: number) => sumAcceleration[i] += a);
      });

      const avgTime = sumTime.map(t => t / numTrials);
      const avgAcceleration = sumAcceleration.map(a => a / numTrials);

      const averagedTrial = {
        ...response[0],
        "time": avgTime,
        "acceleration": avgAcceleration,
        "colour": boldColour, // different color for the average
      };

    const combinedData = [...coloredData, averagedTrial];

    sendDataToParent(combinedData)

    } finally { }
  };

  useEffect(() => {
    getAllAthletes()
  }, []);

  useEffect(() => {
    if (selectedAthlete){
      console.log(selectedAthlete)
    }
  }, [selectedAthlete]);

    useEffect(() => {
    if (selectedTrial){
      getTrial(selectedTrial)
    }
  }, [selectedTrial]);

  const handleChange = (athleteName : string) => {
    setSelectedAthlete(athleteName)
    updateAthleteTrials(athleteName)
  }

  return (
    <>
      <div className="w-150 mx-10">
        <h1 className="text-3xl text-center my-10">Select Athlete</h1>
        <Select onValueChange={(athleteName) => handleChange(athleteName)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Athlete Selection" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Athlete</SelectLabel>
              {athletes.map((name) => (
                <SelectItem value={name}>{name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        { selectedAthlete ? 
          <>
            <h1 className="text-3xl text-center my-10">Select Effort</h1>
            <Select onValueChange={(trial) => {setSelectedTrial(trial)}}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Athlete Selection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trial</SelectLabel>
                  {athleteTrials.map((trial) => (
                    <SelectItem value={trial.trial_id}>{ dayjs(trial.trial_date).format("DD/MM/YY HH:mm A") } - {trial.num_jumps} Jumps</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
          :
          <></>
        }
      </div>
    </>
  )
}

export default SelectTrial