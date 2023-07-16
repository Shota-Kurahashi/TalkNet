import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

export const formatTimeDistance = (time: Date | string): string => {
  if (typeof time === "string") {
    return formatDistance(Date.parse(time), new Date(), {
      addSuffix: true,
      locale: ja,
    });
  }

  return formatDistance(time, new Date(), {
    addSuffix: true,
    locale: ja,
  });
};
