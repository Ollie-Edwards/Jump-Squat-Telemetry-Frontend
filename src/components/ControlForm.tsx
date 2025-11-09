import { Button } from "@/components/ui/button";
import { Countdown } from "./Countdown";

import { useState } from "react";

function ControlForm() {
  const [formData, setFormData] = useState({ name: "Default", duration: 3.0, jumpNum: 3, jumpTime: 5, restTime: 30, barWeight: 60 });

  // sets state of countdown popup
  const [active, setActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true)
    // const response = await beginRecording(formData["duration"], formData["name"])
    // console.log(response)
  };

  return (
    <>
      < Countdown
        active = {active}
        setActive = {setActive}
        athleteID = {1} 
        restTime = {formData.restTime}
        jumpTime = {formData.jumpTime}
        maxJumpNum = {formData.jumpNum}
        barWeight = {formData.barWeight}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-150 mx-auto mb-10"
      >
        <div className="flex min-h-[25svh] flex-col items-center justify-center">
          <Button
            type="submit"
            variant="destructive"
            className="h-20 rounded-md px-10 text-xl"
          >
            Record Data
          </Button>
        </div>

        {/* String input */}
        <label>
          Athlete Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full p-2 border rounded"
          />
        </label>

        {/* Float input */}
        <label>
          Rest Time:
          <div className="flex items-center border rounded p-2">
            <input
              type="number"
              step="0.1"
              name="restTime"
              value={formData.restTime}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full outline-none"
            />
            <span className="ml-2 text-gray-500">seconds</span>
          </div>
        </label>

        {/* Float input */}
        <label>
          Jump Time:
          <div className="flex items-center border rounded p-2">
            <input
              type="number"
              step="0.1"
              name="jumpTime"
              value={formData.jumpTime}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full outline-none"
            />
            <span className="ml-2 text-gray-500">seconds</span>
          </div>
        </label>

        {/* Float input */}
        <label>
          Number of jumps:
          <div className="flex items-center border rounded p-2">
            <input
              type="number"
              step="1"
              name="jumpNumber"
              value={formData.jumpNum}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full outline-none"
            />
            <span className="ml-2 text-gray-500">reps</span>
          </div>
        </label>

        {/* Float input */}
        <label>
          Bar Weight:
          <div className="flex items-center border rounded p-2">
            <input
              type="number"
              step="0.1"
              name="barWeight"
              value={formData.barWeight}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full outline-none"
            />
            <span className="ml-2 text-gray-500">kg</span>
          </div>
        </label>
      </form>
    </>
  );
}

export default ControlForm;