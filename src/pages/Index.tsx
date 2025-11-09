import { Countdown } from "@/components/Countdown";
import CheckConnection from "../components/CheckConnection"
import ControlForm from "../components/ControlForm"
import RecordingList from "../components/RecordingList"

function Index() {
  return (
    <>
      <CheckConnection />
      <ControlForm />
      <hr/>
      <RecordingList />
    </>
  );
}

export default Index;
