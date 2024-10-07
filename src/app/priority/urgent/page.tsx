import CommonPage from "../commonpage";
import { PriorityDataType } from "@/redux/endpoints/interfaces";
const UrgentPage = () => {
  return <CommonPage priority={PriorityDataType.Urgent} />;
};

export default UrgentPage;
