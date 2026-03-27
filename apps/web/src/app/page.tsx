import NavbarMain from "./components/navbarMain";
import Sidebar from "./components/sidebar";
import HomeContent from "./components/HomeContent";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#D5C2A3]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />
        <HomeContent />
      </div>
    </main>
  );
}
