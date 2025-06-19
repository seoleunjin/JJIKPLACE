import { z } from "zod";

export const SignUpSchema = z
  .object({
    nick_name: z
      .string()
      .min(2, { message: "닉네임은 2글자 이상이어야 합니다." }),

    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),

    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
      }),

    passwordConfirm: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
      }),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "약관에 동의해주세요" }),
    }),
    agreePrivacy: z.literal(true, {
      errorMap: () => ({
        message: "개인정보 수집 이용에 동의해야 가입할 수 있습니다.",
      }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이어야 합니다." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    }),
});
