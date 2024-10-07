import CommonPage from "../commonpage";
import { PriorityDataType } from "@/redux/endpoints/interfaces";
const Backlogpage = () => {
  return <CommonPage priority={PriorityDataType.Backlog} />;
};

export default Backlogpage;
