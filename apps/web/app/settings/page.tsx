import Link from "next/link";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";

export default function Settings(): JSX.Element {
  return (
    <div>
      <Link href={PAGE_NAME.ADMIN_MEMBERS}>멤버 관리</Link>
    </div>
  );
}
