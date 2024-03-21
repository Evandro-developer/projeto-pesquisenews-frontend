import { useContext } from "react";
import { SummaryProcessContext } from "../contexts/SummaryProcessContext";

const useSummaryProcess = () => useContext(SummaryProcessContext);

export default useSummaryProcess;
