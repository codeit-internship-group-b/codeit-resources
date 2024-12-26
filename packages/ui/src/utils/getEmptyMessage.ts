import { EMPTY_STATE_MESSAGES } from "@repo/constants/messages";

interface EmptyStateProps {
  activeTab: string;
  keyword: string;
}

interface EmptyMessage {
  title: string;
  description: string;
}

export const getEmptyMessage = ({ activeTab: team, keyword }: EmptyStateProps): EmptyMessage => {
  if (keyword) {
    return {
      title: EMPTY_STATE_MESSAGES.SEARCH.NO_RESULT.MESSAGE,
      description: EMPTY_STATE_MESSAGES.SEARCH.CHECK_SPELLING,
    };
  }

  if (team === "전체") {
    return EMPTY_STATE_MESSAGES.MEMBERS.NO_MEMBERS;
  }

  return EMPTY_STATE_MESSAGES.MEMBERS.NO_TEAM_MEMBERS(team);
};
