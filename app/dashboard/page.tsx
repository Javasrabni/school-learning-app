
import SignedPage from "@/components/signedPage/SignedPage";
import Footer from "../partials/footer";
import Navbar from "../partials/navbar";

export default function Dashboard() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-between">
            <Navbar />
            <SignedPage />
            <Footer />
        </div>
    )
}
