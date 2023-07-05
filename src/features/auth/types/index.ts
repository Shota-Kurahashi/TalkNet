import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスを入力してください",
    })
    .email({
      message: "メールアドレスの形式が正しくありません",
    }),

  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください",
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    email: z
      .string({
        required_error: "メールアドレスを入力してください",
      })
      .email({
        message: "メールアドレスの形式が正しくありません",
      }),

    name: z.string({
      required_error: "名前を入力してください",
    }),

    password: z.string().min(8, {
      message: "パスワードは8文字以上で入力してください",
    }),

    confirmPassword: z.string().min(8, {
      message: "パスワードは8文字以上で入力してください",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
