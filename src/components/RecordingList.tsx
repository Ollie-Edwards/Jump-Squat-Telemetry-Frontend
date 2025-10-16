import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { formatDistanceToNow } from 'date-fns';
import { fetchRecords } from '../api/manageSensor';

import { useEffect, useState } from "react"
import { Link } from "react-router";

function RecordingList() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);

  type RecordItem = {
    id: string;
    athleteId: string;
    date: string;
    name: string;
    duration: number;
  };

  const fetchAllRecords = async () => {
    try {
      setLoading(true);
      const response = await fetchRecords();
      setRecords(response); // save fetched records
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRecords();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className="w-full min-h-[50svh] flex items-center justify-center">
            <Spinner className="size-18" />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-4 my-10">
            {records.map((record) => (
              <div key={record.id} className="flex w-full max-w-md flex-col gap-2">
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>
                      {record.name} | Athlete ID: {record.athleteId}
                    </ItemTitle>
                    <ItemDescription>
                      Date: {record.date ? formatDistanceToNow(new Date(record.date), { addSuffix: true }) : "Unknown"}
                      <br />
                      Duration: {record.duration} seconds
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Link to={"/data/" + record.id}>
                      <Button variant="outline" size="sm">
                        Action
                      </Button>
                    </Link>
                  </ItemActions>
                </Item>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default RecordingList;
