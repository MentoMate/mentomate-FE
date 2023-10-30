import * as yup from "yup";

export const LOGIN_SCHEMA = yup.object().shape({
	email: yup
		.string()
		.required("이메일을 입력하세요.")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"올바른 이메일을 입력해주세요.",
		),
	password: yup.string().required("비밀번호를 입력해주세요."),
});

export const SIGN_UP_SCHEMA = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"올바른 이메일을 입력해주세요.",
		)
		.required("이메일 입력은 필수입니다."),
	password: yup
		.string()
		.min(8, "비밀번호는 최소 8자 이상입니다.")
		.max(16, "비밀번호는 최대 16자리입니다.")
		.matches(
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}[^\s]*$/,
			"특수문자를 모두 포함한 8자리 이상 입력해주세요.",
		)
		.required("비밀번호를 입력해주세요"),
	checkPassword: yup
		.string()
		.oneOf([yup.ref("password")], "비밀번호가 일치하기 않습니다.")
		.required("비밀번호를 입력해주세요."),
	nickName: yup
		.string()
		.min(2, "닉네임은 최소 2자 이상입니다.")
		.max(8, "닉네임은 최대 8자리입니다.")
		.required("닉네임 입력은 필수입니다."),
});
