import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import { z } from "zod";
import { validate } from "src/libs/validation";

export const formatTimeDistance = (time: Date): string => {
  validate(time, z.string());

  return formatDistance(Date.parse(time), new Date(), {
    addSuffix: true,
    locale: ja,
  });
};
