import SideLayout from "@/components/common/Sidebar/Layout";
import BottomSheet from "@/components/common/BottomSheet";

export default function Home(): JSX.Element {
  return (
    <>
      <SideLayout>
        <h1>홈 페이지</h1>
      </SideLayout>
      <BottomSheet />
    </>
  );
}
