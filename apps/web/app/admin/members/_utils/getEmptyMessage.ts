export const getEmptyMessage = (activeTab: string): string => {
  switch (activeTab) {
    case "teams":
      return "등록된 팀이 없습니다.";
    case "전체":
      return "등록된 멤버가 없습니다.";
    default:
      return `${activeTab} 팀에 속한 멤버가 없습니다.`;
  }
};
