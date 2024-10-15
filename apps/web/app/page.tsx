import Button from "@ui/src/components/common/Button";

export default function Home(): JSX.Element {
  return (
    <div className="space-y-4 p-8">
      {/* 기본 primary 버튼 */}
      <Button variant="primary">Primary Button</Button>

      {/* 링크로 사용되는 버튼 (a 요소로 렌더링) */}
      <Button as="a" href="#" variant="primary">
        Link Button
      </Button>

      {/* 비활성화된 secondary 버튼 */}
      <Button variant="secondary" isActive={false}>
        Disabled Secondary Button
      </Button>

      {/* Tertiary 변형 버튼 */}
      <Button variant="Tertiary">Tertiary Button</Button>

      {/* 텍스트 버튼 */}
      <Button variant="Text">Text Button</Button>

      {/* 사용자 정의 클래스 이름을 추가한 primary 버튼 */}
      <Button variant="primary" className="my-custom-class">
        Custom Styled Button
      </Button>

      {/* 아이콘을 포함하는 버튼 */}
      <Button variant="primary">
        <span role="img" aria-label="check">
          ✅
        </span>{" "}
        Icon Button
      </Button>
    </div>
  );
}
