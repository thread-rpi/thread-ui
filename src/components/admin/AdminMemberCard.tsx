// import { useNavigate } from "react-router-dom";
import type { Member } from "../../types/memberTypes";

interface AdminMemberCardProps {
  member: Pick<Member, "id" | "name" | "display_name" | "role" | "email" | "start_year" | "active" | "visible">;
}

export default function AdminMemberCard({ member }: AdminMemberCardProps) {
  const displayName = member.display_name ?? member.name;

  // const navigate = useNavigate();

  return (
    <article 
      className={`outline-1 outline-black bg-white p-4 flex flex-col gap-3 cursor-pointer transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg ${member.active ? "opacity-100" : "opacity-50"}`} 
      // onClick={() => navigate(`/admin/members/${member.id}`)}
    >
      <h3 className="text-base font-bold leading-tight truncate">{displayName}</h3>

      <p className="text-sm font-medium text-thread-red leading-snug truncate">{member.role}</p>

      <p className="text-sm text-black/60 leading-snug truncate">{member.email}</p>

      <p className="text-xs font-medium uppercase tracking-wide text-black/45">
        Since {member.start_year}
        {member.active ? " · Active" : " · Inactive"}
        {!member.visible ? " · Hidden" : ""}
      </p>
    </article>
  );
}
