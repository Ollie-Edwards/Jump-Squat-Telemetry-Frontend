import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MdDeleteForever, MdEdit, MdInfo } from "react-icons/md";


function AthleteCard({ name }) {
  return (
    <Card className="w-full p-5 mx-auto my-5">
      <div className="w-full flex flex-row">
        <h1 className="align-middle my-auto"><strong>{name}</strong></h1>
        <Button variant="outline" className="mx-2 ml-auto">
          <MdDeleteForever />
        </Button>
        <Button variant="outline" className="mx-2">
          <MdEdit />
        </Button>
        <Button variant="outline" className="mx-2">
          <MdInfo />
        </Button>
      </div>
    </Card>
  )
}

export default AthleteCard