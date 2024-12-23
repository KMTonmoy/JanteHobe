
import Sidebar from "@/Components/sidebar";
import "../../app/globals.css";
import AuthProvider from "@/Provider/AuthProvider";


export default function RootLayout({ children }) {
    return (
        <div>
            <AuthProvider>
                <div className="flex  ">
                    <Sidebar />
                    <main className="flex justify-center w-full">{children}</main>
                </div>
            </AuthProvider>
        </div>
    );
}