import { BurgerIcon } from "@ui/public";

export default function TeamListSkeleton(): JSX.Element {
  return (
    <div className="boder-solid rounded-12 mb-16 flex h-72 items-center justify-between border px-24 py-16">
      <div className="flex flex-grow items-center gap-32 text-left">
        <BurgerIcon />
        <div />
      </div>
    </div>
  );
}
