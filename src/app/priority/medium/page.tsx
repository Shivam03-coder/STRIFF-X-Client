import CommonPage from "../commonpage";
import { PriorityDataType } from "@/redux/endpoints/interfaces";
const Mediumpage = () => {
  return <CommonPage priority={PriorityDataType.Medium} />;
};

export default Mediumpage;