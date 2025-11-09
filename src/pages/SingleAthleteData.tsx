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
        (trialData || trialData2) ? 
        <>
        <MultiGraph datasets={[...trialData, ...trialData2]} title="Jumps Comparison" />
        
        {/* quick fix */}
        <div className="flex flex-row">
          <div className="p-6 bg-gray-50 rounded-2xl shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Jump Analysis Results
            </h2>

            { trialData ? 
            <ul className="divide-y divide-gray-200">
              {Object.entries(trialData[0]).map(([key, value]) => (
                <li key={key} className="py-2 flex justify-between">
                  <span className="font-medium text-gray-700">
                    {key.replaceAll("_", " ")}
                  </span>
                  <span className="text-gray-900">{String(value)}</span>
                </li>
              ))}
            </ul> : <></> }
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Jump Analysis Results
            </h2>
            
            { trialData2 ? 
            <ul className="divide-y divide-gray-200">
              {Object.entries(trialData2[0]).map(([key, value]) => (
                <li key={key} className="py-2 flex justify-between">
                  <span className="font-medium text-gray-700">
                    {key.replaceAll("_", " ")}
                  </span>
                  <span className="text-gray-900">{String(value)}</span>
                </li>
              ))}
            </ul> : <></> }
          </div>
        </div>;
        </>
        : <></>
      }
    </>
  )
}

export default SingleAthleteData