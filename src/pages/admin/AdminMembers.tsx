import { Icon } from "@iconify/react";
import { useGetAdminMembers } from "../../api/queries";
import AdminEntityGrid from "../../components/admin/AdminEntityGrid";
import AdminMemberCard from "../../components/admin/AdminMemberCard";
import Loader from "../../components/Loader";

const AdminMembers = () => {
  const { data, isLoading, isError } = useGetAdminMembers();
  const members = data?.members ?? [];

  return (
    <div className="w-full max-w-7xl min-h-dvh px-6 md:px-11 mx-auto flex flex-col items-center justify-start">
      <div className="w-full flex flex-row items-center gap-5">
        <div className="text-2xl font-bold">MEMBERS</div>
        <button className="w-max h-max flex items-center gap-1 bg-white text-black font-medium px-2.5 py-1 outline-1 outline-black">
          <Icon icon="gridicons:dropdown" width="24px" height="24px" color="black" />
          <div className="text-lg whitespace-nowrap">F25</div>
        </button>
      </div>

      {isLoading && <Loader />}

      {isError && (
        <p className="w-full mt-6 text-sm text-thread-red font-medium">
          We could not load members. Please try again later.
        </p>
      )}

      {!isLoading && !isError && (
        <AdminEntityGrid>
          {members.map((member) => (
            <AdminMemberCard key={member.id} member={member} />
          ))}
        </AdminEntityGrid>
      )}
    </div>
  );
};

export default AdminMembers;
