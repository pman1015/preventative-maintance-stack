import React, {useState} from "react";

import LoginPageDesktop from "./loginDesktop/loginDesktop";
import LoginPageMobile from "./loginMobile/loginPageMobile";

import useIsMobile from "../../util/styleSelect";

function LoginPage() {
	const isMobile = useIsMobile();

	return <>{isMobile ? <LoginPageMobile /> : <LoginPageDesktop />}</>;
}

export default LoginPage;
