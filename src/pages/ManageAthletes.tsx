import { useEffect, useState } from "react";
import { getAthletes } from "../api/manageAthletes"
import CreateAthleteForm from "../components/CreateAthleteForm"
import AthleteCard from "../components/AthleteCard"

function ManageAthletes() {
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

  if (!data){
    return (
      <h1>No data</h1>
    )
  }

  return (
    <>
      <CreateAthleteForm />

      <hr/>

      <h1 className="text-3xl text-center mt-10 my-10">View, Delete or Edit Athletes</h1>
      <div className="w-150 mx-auto">
        {data.map((value) => (
          <AthleteCard name={value} />
        ))}
      </div>
    </>
  );
}

export default ManageAthletes;
