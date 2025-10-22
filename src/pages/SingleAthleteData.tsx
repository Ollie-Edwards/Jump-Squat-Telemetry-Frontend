import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { getAthletes, getAllAthleteTrials } from "../api/manageAthletes"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SingleAthleteData() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [athleteTrials, setAthleteTrials] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState("");

   const getAllAthletes = async () => {
    setLoading(true);
    try {
      const response = await getAthletes();
      setAthletes(response);
      console.log(response);
    } finally {
      setLoading(false);
    }
  };

   const updateAthleteTrials = async (athleteName : string) => {
    try {
      console.log("trying " + athleteName)
      const response = await getAllAthleteTrials(athleteName);
      console.log("get athlete trials")
      console.log(response)
      setAthleteTrials(response);
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

  const handleChange = (athleteName : string) => {
    setSelectedAthlete(athleteName)
    updateAthleteTrials(athleteName)
  }

  return (
    <div className="w-150 mx-auto">
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
          <Select onValueChange={() =>{}}>
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
  )
}

export default SingleAthleteData