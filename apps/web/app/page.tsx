import Button from "@ui/src/components/common/Button";

export default function Home(): JSX.Element {
  return (
    <>
      <div>
        <button type="button" className="bg-primary">
          tailwind 확인용
        </button>
        <button type="button" className="bg-primary">
          husky 확인용
        </button>
        <div className="w-10">px 확인용</div>
      </div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary" isActive={false}>
        Secondary Button
      </Button>
      <Button variant="Action">Action Button</Button>
      <Button variant="Tertiary">Tertiary Button</Button>
      <Button variant="Text">Text Button</Button>
      <button
        type="button"
        className="min-w-68 text-sm-medium md:min-w-84 md:text-md-medium lg:min-w-100 lg:h-42 text-custom-black/80 border-1 border-custom-black/20 hover:bg-custom-black/5 hover:text-custom-black flex h-32 items-center justify-center gap-4 rounded-md bg-white/40 px-12 py-6 md:h-40 md:rounded-lg md:px-16 md:py-8 lg:rounded-lg lg:px-24 lg:py-8"
      >
        버튼 레이블
      </button>
    </>
  );
}
