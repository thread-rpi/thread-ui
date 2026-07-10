import { Icon } from "@iconify/react";
import AdminEntityGrid from "../../components/admin/AdminEntityGrid";
import AdminImageCard from "../../components/admin/AdminImageCard";
import { adminImageFixtures } from "../../fixtures/adminEntityFixtures";

const AdminImages = () => {
  return (
    <div className="w-full max-w-7xl min-h-dvh px-6 md:px-11 mx-auto flex flex-col items-center justify-start">
      <div className="w-full flex flex-row items-center gap-5">
        <div className="text-2xl font-bold">IMAGES</div>
        <button className="w-max h-max flex items-center gap-1 bg-white text-black font-medium px-2.5 py-1 outline-1 outline-black">
          <Icon icon="gridicons:dropdown" width="24px" height="24px" color="black" />
          <div className="text-lg whitespace-nowrap">F25</div>
        </button>
      </div>

      <AdminEntityGrid>
        {adminImageFixtures.map((image) => (
          <AdminImageCard key={image.id} image={image} />
        ))}
      </AdminEntityGrid>
    </div>
  );
};

export default AdminImages;
