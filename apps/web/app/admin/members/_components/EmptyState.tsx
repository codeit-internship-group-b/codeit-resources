interface EmptyState {
  activeTab: string;
  keyword: string;
}

export default function EmptyState({ activeTab, keyword }: EmptyState): JSX.Element {
  return (
    <div className="min-h-400 flex items-center justify-center">
      {keyword ? (
        <p className="text-20 text-custom-black/60 text-center">
          검색 결과가 없습니다. <br /> 단어의 철자가 정확한지 확인해 보세요.
        </p>
      ) : (
        <>
          {activeTab === "전체" ? (
            <p className="text-20 text-custom-black/60 text-center">
              등록된 멤버가 없습니다. <br /> 멤버를 새로 등록해보세요.
            </p>
          ) : (
            <p className="text-20 text-custom-black/60 text-center">
              {activeTab} 팀에 속한 멤버가 없습니다. <br /> 멤버를 새로 등록해보세요.
            </p>
          )}
        </>
      )}
    </div>
  );
}
