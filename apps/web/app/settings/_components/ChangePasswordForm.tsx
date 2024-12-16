import { Button, Input } from "@ui/index";

export default function ChangePasswordForm(): JSX.Element {
  return (
    <form className="flex flex-col gap-16">
      <h1 className="text-2xl-bold border-b-1 border-[#E8E8EA] py-8">비밀번호 변경</h1>
      <div>
        <Input placeholder="현재 비밀번호" />
        <Input placeholder="새 비밀번호" />
        <Input placeholder="새 비밀번호 확인" />
        <Button className="text-lg-medium w-106 h-42" type="submit" variant="Secondary">
          변경하기
        </Button>
      </div>
    </form>
  );
}
