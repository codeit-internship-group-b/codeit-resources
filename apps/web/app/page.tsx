import { Modal } from "@ui/index";

export default function Home(): JSX.Element {
  return (
    <>
      <Modal.Root>
        <Modal.Trigger>modal trigger</Modal.Trigger>
        <Modal.Content>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>내용</Modal.Description>
          <Modal.Close
            onConfirm={() => {
              console.log("Button Clicked!");
            }}
          >
            예
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
      <div />
    </>
  );
}
