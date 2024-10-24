import Button from "@ui/src/components/common/Button";

interface HeaderProps {
  onAddMember: () => void;
}

export default function Header({ onAddMember }: HeaderProps): JSX.Element {
  return (
    <header className="flex justify-between">
      <h1 className="text-3xl-bold mb-40">멤버 관리</h1>
      <Button onClick={onAddMember} variant="Secondary" className="w-122 h-42 text-lg-medium text-custom-black/80">
        + 멤버 추가
      </Button>
    </header>
  );
}
