import { useEffect, useState } from "react";

import { getAthletes } from "../api/manageAthletes"

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

   const getData = async () => {
    setLoading(true);
    try {
      const response = await getAthletes();
      setData(response);
      console.log(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="w-150 mx-auto">
      <h1 className="text-3xl text-center my-10">Select Athlete</h1>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Athlete Selection" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Athlete</SelectLabel>
            {data.map((name) => (
              <SelectItem value={name}>{name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SingleAthleteData