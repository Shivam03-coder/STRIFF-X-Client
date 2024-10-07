import CommonPage from "../commonpage";
import { PriorityDataType } from "@/redux/endpoints/interfaces";
const Highpage = () => {
  return <CommonPage priority={PriorityDataType.High} />;
};

export default Highpage;