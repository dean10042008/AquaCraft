import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";
import authService from "../../services/auth-service.js";
import PasswordInput from "../../components/PasswordInput.jsx";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const [isLoggedIn] = useContext(appContext);
    const getErrorAndDisplay = useContext(appContext)[6];
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    async function onSubmit(e) {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        try {
            if (email.length < 5) {
                throw new Error("email.short");
            }

            if (email.length > 99) {
                throw new Error("email.long");
            }

            if (! /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                throw new Error("email.invalid");
            }
        }
        catch (error) {
            console.error(error);
            getErrorAndDisplay(error.message);
        }

        const [loginData, error] = await authService.login(email, password);
            
        if (loginData) {
            localStorage.setItem("accessToken", JSON.stringify(loginData.accessToken));
            navigate("/");
            getErrorAndDisplay(loginData.message)
        }
        else {
            getErrorAndDisplay(error);
        }
    }

    return (
        <div id="login">
            <h1>{t("login.title")}</h1>
            <div className="form-wrapper">
                <form onSubmit={onSubmit} id="login-form" className="form">
                    <span>
                        <input type="email" name="email" placeholder={`${t("login.email")}*`} />
                    </span>
                    <PasswordInput name={"password"} placeholder={`${t("login.password")}*`} />

                    <button type="submit">{t("login.title")}</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;