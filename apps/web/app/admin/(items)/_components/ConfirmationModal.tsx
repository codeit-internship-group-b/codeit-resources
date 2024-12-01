"use client";

import { Modal } from "@ui/index";
import { type PropsWithChildren } from "react";

interface ConfirmationModalProps extends PropsWithChildren {
  title: string;
  type: "item" | "category";
  onConfirm: () => void;
}

export default function ConfirmationModal({ title, type, onConfirm, children }: ConfirmationModalProps): JSX.Element {
  return (
    <Modal.Root>
      {children}
      <Modal.Content>
        <Modal.Title className="flex flex-col">
          <span className="text-20 mb-10 text-center font-extrabold">{title}</span>
          <span>해당 {type === "item" ? "아이템" : "카테고리"}를 삭제하시겠습니까?</span>
        </Modal.Title>
        <Modal.Description>
          <span>삭제된 {type === "item" ? "아이템" : "카테고리"}은 복구할 수 없습니다.</span>
          {type === "category" && <p>카테고리 하위의 아이템들도 함께 삭제됩니다.</p>}
        </Modal.Description>
        <Modal.Close
          onConfirm={() => {
            onConfirm();
          }}
          confirmText="확인"
          cancelText="취소"
        >
          예
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
