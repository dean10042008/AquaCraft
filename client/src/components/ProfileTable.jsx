import { useTranslation } from "react-i18next";
import ProfileOrder from "./ProfileOrder";

const ProfileTable = ({ orders, isAdmin = false, complete = null }) => {
    const { t } = useTranslation();

    return (
        <span id="profile-table">
            {
                orders.length === 0 ?
                    isAdmin ? <h4>{t("admin.orders.empty")}</h4> : <h4>{t("profile.orders.empty")}</h4> :
                    <table>
                        <thead>
                            <tr>
                                <th>{t("profileTable.id")}</th>
                                <th>{t("profileTable.date")}</th>
                                <th>{t("profileTable.quantity")}</th>
                                <th>{t("profileTable.name")}</th>
                                <th>{t("profileTable.price")}</th>
                                <th></th>
                                {isAdmin && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <ProfileOrder key={order._id} order={order} isAdmin={isAdmin} complete={complete} />
                                ))
                            }
                        </tbody>
                    </table>
            }
        </span>
    );
}

export default ProfileTable;