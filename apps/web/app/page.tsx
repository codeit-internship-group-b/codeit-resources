import Input from "@ui/src/components/common/Input";
import DropdownTest from "@ui/src/components/common/Dropdown/DropdownTest";

export default function Home(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col gap-30 m-30">
        <Input id="name" placeholder="참여자" />
        <Input id="name" placeholder="참여자" isError errorMessage="에러 예시" />
        <DropdownTest />
      </div>
    </div>
  );
}
