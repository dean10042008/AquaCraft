import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../../services/auth-service";
import CheckoutInput from "../../components/CheckoutInput";
import { appContext } from "../../../App";
import productsService from "../../services/products-service";

const CreateProductPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ isAdmin, setIsAdmin] = useState(true);
    const getErrorAndDisplay = useContext(appContext)[6];

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
            return;
        }

        const getAdminInfo = async () => {
            const isAdmin = (await authService.getUserData())[0].isAdmin;
            setIsAdmin(isAdmin);
        }

        getAdminInfo();
    }, [isAdmin]);

    async function onSubmit(e) {
        e.preventDefault();

        const { title, imageUrl, price, description } = Object.fromEntries(new FormData(e.currentTarget));

        const [data, error] = await productsService.addOne(title, imageUrl, price, description);
        console.log(data, error);

        if (!data) {
            getErrorAndDisplay(error);
            return;
        }

        getErrorAndDisplay(data.message)
        navigate("/products");
    }

    return (
        <div id="create">
            <h1>{t("profile.create.title")}</h1>

            <div className="content">
                <form onSubmit={onSubmit}>
                    <CheckoutInput label={`${t("profile.create.name")}*`} name={"title"} />
                    <CheckoutInput label={`${t("profile.create.image")}*`} name={"imageUrl"} />
                    <CheckoutInput label={`${t("profile.create.price")}*`} name={"price"} type={"number"} min={0} />

                    <div>
                        <label htmlFor="description">{t("profile.create.description")}*</label>
                        <textarea name="description" id="description"></textarea>
                    </div>

                    <button type="submit">{t("profile.create.submit")}</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProductPage;