import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
