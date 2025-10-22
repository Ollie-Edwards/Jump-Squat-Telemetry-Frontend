import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"

import { createAthlete } from "../api/manageAthletes.tsx" 

import { useState } from "react";

function CreateAthleteForm() {
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await createAthlete(formData["name"])
    setLoading(false);
    console.log(response)
  };

  return (
    <>
    <h1 className="text-3xl text-center mt-10">Create New Athlete</h1>
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col w-150 mx-auto my-10"
      >
        {/* String input */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter athlete name"
            className="w-full p-2 border rounded"
          />
        </label>

        <div className="flex my-5 w-full flex-col items-center justify-center">
          { loading ? 
            <Button
              type="submit"
              variant="outline"
              className="w-full"
            >
              <Spinner />
            </Button>
            :
            <Button
              type="submit"
              variant="default"
              className="w-full"
            >
              Create Athlete
            </Button>
          }
        </div>
      </form>
    </>
  );
}

export default CreateAthleteForm;