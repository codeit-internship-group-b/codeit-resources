import Button from "@ui/src/components/common/Button";

interface AddCategoryButtonProps {
  onClick: () => void;
}

export default function AddCategoryButton({ onClick }: AddCategoryButtonProps): JSX.Element {
  return (
    <Button variant="Secondary" onClick={onClick}>
      분류 추가
    </Button>
  );
}
