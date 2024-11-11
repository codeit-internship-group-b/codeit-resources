export const ROLES = ["전체", "멤버", "어드민"] as const;
export const TEAMS = ["Management", "Finance", "Strategy", "Brand Experience", "People & Culture"] as const;
export const CATEGORIES = [...ROLES, ...TEAMS] as const;
