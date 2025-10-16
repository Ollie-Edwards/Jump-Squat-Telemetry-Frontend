import { Button } from "@/components/ui/button";

import { beginRecording } from "../api/manageSensor.ts" 

import { useState } from "react";

function ControlForm() {
  const [formData, setFormData] = useState({ name: "Default", duration: 3.0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await beginRecording(formData["duration"], formData["name"])
    console.log(response)
  };

  return (
    <>
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
          Name:
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
          Duration:
          <input
            type="number"
            step="0.1"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full p-2 border rounded"
          />
        </label>
      </form>
    </>
  );
}

export default ControlForm;