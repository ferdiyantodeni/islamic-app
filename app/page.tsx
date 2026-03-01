import AlquranPage from "@/components/alquran/alquran-page";
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <AlquranPage />
    </div>
  );
}
