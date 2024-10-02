import { format } from "date-fns";
import { enIN } from "date-fns/locale";

interface DateDataTypes {
  formattedDate: string;
  formattedTime: string;
}

// Change the function signature to a standard function declaration
export const DateData = (): DateDataTypes => {
  const now = new Date();
  const formattedDate = format(now, "EEEE, dd MMMM yyyy", { locale: enIN });
  const formattedTime = format(now, "hh:mm a");

  return {
    formattedDate,
    formattedTime,
  };
};
