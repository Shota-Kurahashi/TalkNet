import { Profile } from "@prisma/client";
import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string({
    required_error: "アバター画像を選択してください。",
  }),
  cover_img: z.string({
    required_error: "カバー画像を選択してください。",
  }),
  introduction: z.string({
    required_error: "自己紹介を入力してください。",
  }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export type ProfileReturn = {
  profile: Profile;
};
