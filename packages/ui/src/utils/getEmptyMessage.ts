import { EMPTY_STATE_MESSAGES } from "@repo/constants/messages";

interface EmptyStateProps {
  activeTab: string;
  keyword: string;
}

interface EmptyMessage {
  title: string;
  description: string;
}

export const getEmptyMessage = ({ activeTab, keyword }: EmptyStateProps): EmptyMessage => {
  const teamMessage = EMPTY_STATE_MESSAGES.MEMBERS.NO_TEAM_MEMBERS(activeTab);

  if (keyword) {
    return {
      title: EMPTY_STATE_MESSAGES.SEARCH.NO_RESULT,
      description: EMPTY_STATE_MESSAGES.SEARCH.CHECK_SPELLING,
    };
  }

  if (activeTab === "전체") {
    return {
      title: EMPTY_STATE_MESSAGES.MEMBERS.NO_MEMBERS.NOTICE,
      description: EMPTY_STATE_MESSAGES.MEMBERS.NO_MEMBERS.SUGGESTION,
    };
  }

  return {
    title: teamMessage.NOTICE,
    description: teamMessage.SUGGESTION,
  };
};
