import { useState, useEffect } from "react";
import { beginRecording, createTrial } from "../api/manageSensor.ts" 
import { Button } from "@/components/ui/button"
import { ImCross } from "react-icons/im";

export interface CountdownProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  athleteID:  number;
  restTime: number;
  jumpTime: number;
  maxJumpNum: number;
  barWeight: number;
}

export function Countdown({active, setActive, athleteID, restTime, jumpTime, maxJumpNum, barWeight}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [trialNumber, setTrialNumber] = useState(1);
  const [rest, setRest] = useState(true);

  type TrialID = number | null; // or number | null
  const [trialID, setTrialID] = useState<TrialID>(null);

  function incrementTrialNumber(){
    setTrialNumber(trialNumber+1)
  }
  
  function toggleRest(){
    setRest(!rest)
  }

  function resetData(){
    setTimeLeft(10)
    setTrialNumber(1)
    setRest(true)    
  }

  function onComplete(){
    console.log("completed")
    if (trialNumber <= maxJumpNum){

      toggleRest()

      if (rest){
        // send jump command
        setTimeLeft(jumpTime)
        if (trialID !== null) {
          beginRecording(jumpTime, trialID, trialNumber)
        }
        else{
          console.log("recording failed, trialID is null")
        }
      }
      else{
        incrementTrialNumber()
        setTimeLeft(restTime)
      }
    }
  }

  async function makeTrial(){
    const response = await createTrial(athleteID, barWeight, maxJumpNum)
    console.log(`created trial with id ${response}`)
    setTrialID(response)
  }

  // /trial/create
  useEffect(() => {
    if (active){
      resetData()
      makeTrial()
    }
  }, [active]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (active){
        setTimeLeft((prev) => Math.max(0, Math.round((prev - 0.1) * 10) / 10));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/60 z-50 ${active ? "" : "hidden"}`} >
      <div className={`flex flex-col items-center p-6 text-center w-150 h-100 font-semibold text-white rounded-2xl shadow-lg ${rest ? "bg-red-500" : "bg-green-500"}`}>
        <Button className="ml-auto bg-black-500 bg-opacity-50" variant="secondary" size="icon" onClick={() => setActive(false)}>
          <ImCross />
        </Button>
        { trialNumber <= maxJumpNum ? 
          <>
            <p className="text-xl">Trial Number: {trialNumber}</p>

            <h1 className="text-4xl my-auto">
              {timeLeft > 0 && rest ?`Jump in ${timeLeft} second${timeLeft !== 1 ? "s" : ""}` : ""}
              {timeLeft > 0 && !rest ? `JUMP (${timeLeft}s)` : ""}
            </h1>
            <p className="text-xs">athleteID: {athleteID}, restTime: {restTime}, jumpTime: {jumpTime}, maxJumpNum: {maxJumpNum}, barWeight:{barWeight}kg</p>
          </>
          : <h1 className="text-4xl my-auto">Success</h1>} 
      </div>
    </div>
  );
};