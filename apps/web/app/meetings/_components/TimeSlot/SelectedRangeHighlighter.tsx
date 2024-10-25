import React from "react";

interface SelectedRangeHighlighterProps {
  isInSelectedRange: boolean;
}

export const SelectedRangeHighlighter: React.FC<SelectedRangeHighlighterProps> = ({ isInSelectedRange }) => {
  return <div className={isInSelectedRange ? "bg-blue-200" : ""} />;
};
