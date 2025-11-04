import { useEffect, useState } from "react";
import dayjs from "dayjs";

import MultiGraph from "./MultiGraph";
import SelectTrial from "./SelectTrial";

function SingleAthleteData() {
  const [trialData, setTrialData] = useState("");
  const [trialData2, setTrialData2] = useState("");

  function handleDataFromChild(data) {
    setTrialData(data);
  }

  function handleDataFromChild2(data) {
    setTrialData2(data);
  }

  return (
    <> 
    <div className="w-fit mx-auto">
      <div className="flex flex-row mx-auto">
        <div className="bg-red-50">
          <SelectTrial sendDataToParent={handleDataFromChild} boldColour={"rgba(255, 99, 133, 1)"} backgroundColour={"rgba(255, 99, 133, 0.1)"} />
        </div>
        <div className="bg-blue-50">
          <SelectTrial sendDataToParent={handleDataFromChild2} boldColour={"rgba(115, 99, 255, 1)"} backgroundColour={"rgba(115, 99, 255, 0.1)"} />
        </div>
      </div>
    </div>

      {
        (trialData) ? <MultiGraph datasets={[...trialData, ...trialData2]} title="Jumps Comparison" /> : <></>
      }
    </>
  )
}

export default SingleAthleteData