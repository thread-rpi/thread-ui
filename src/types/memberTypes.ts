// Member document from members collection (memberDB)
export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  start_year: number;
  visible: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  event_involvements?: Record<string, string>;
  image_involvements?: Record<string, string>;
  display_name?: string;
};

// Member id name pair
export type MemberIdNamePair = Pick<Member, "id" | "name">;