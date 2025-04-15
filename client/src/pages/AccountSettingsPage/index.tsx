import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { auth } from "../../firebase";
import AccountSettings from "../../components/AccountSettings";

const AccountSettingsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <SideMenu auth={auth} />
                    </div>

                    <div className="lg:col-span-3">
                        <AccountSettings />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
