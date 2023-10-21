module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"plugin:prettier/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
	rules: {
		// 0이면 이 규약에 신경쓰지 않는다
		allowForLoopAfterthoughts: true, // 단항 연산자 ++ / --를 for 루프의 사후 (최종 표현식에) 표현
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off", // console.log가 남았을 때 오류 위반 해제
		"no-unused-vars": "off", // 안쓰는 변수가 있을 경우에 오류 위반 해제
		"@typescript-eslint/no-unused-vars": ["error"], // typescript에서 안쓰는 변수가 있을 경우에 오류 위반 해제
		"react/jsx-props-no-spreading": "off", // props로 받은 것 바로 props로 넘기기 허용
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"arrow-body-style": ["error", "always"],
		"prefer-arrow-callback": "off",
		"import/no-unresolved": "off", // 친절한 이 옵션은 import 뿐만 아니라 require, define 등의 CommonJS 혹은 AMD도 지원을 해준다. 기본적으로는 켜져있어서 true
		"import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
		"import/prefer-default-export": "off", // export default 권장
		"jsx-a11y/label-has-associated-control": [
			2,
			{
				labelAttributes: ["htmlFor"],
			},
		], // label 사용시 attributes를 htmlFor로 사용
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
				json: "never",
			},
		], // 확장자명이 달려있다면 error로 표시해라. 단, js, jsx, ts, tsx, json은 예외
		"jsx-a11y/click-events-have-key-events": 0, // onClick 이벤트를 사용하기 위해서는 onKeyUp, onKeyDown, onKeyPress 이벤트 중 하나 이상을 같이 사용해야 한다는 규약
		"react/prefer-stateless-function": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-one-expression-per-line": 0,
		"no-nested-ternary": 0,
		"react/react-in-jsx-scope": "off",
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function",
			},
		],
	},
	settings: {
		// import/resolver` 는 `eslint-plugin-import` 의 경로 설정 옵션
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
};
