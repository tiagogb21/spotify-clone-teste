import { Aside } from "../components/Aside";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-black min-h-screen px-2">
            <Header />
            <div className="flex gap-2">
                <Aside />
                {children}
            </div>
            <Footer />
        </div>
    );
}
