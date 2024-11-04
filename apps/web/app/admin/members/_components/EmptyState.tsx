interface EmptyState {
  activeTab: string;
}

export default function EmptyState({ activeTab }: EmptyState): JSX.Element {
  return (
    <div className="min-h-400 flex items-center justify-center">
      <p className="text-20 text-custom-black/60">
        {activeTab === "전체" ? "등록된 멤버가 없습니다." : `${activeTab} 팀에 속한 멤버가 없습니다.`}
      </p>
    </div>
  );
}
