import CommonPage from "../commonpage";
import { PriorityDataType } from "@/redux/endpoints/interfaces";
const Lowpage = () => {
  return <CommonPage priority={PriorityDataType.Low} />;
};

export default Lowpage;
