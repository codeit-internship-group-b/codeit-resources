"use client";

import Close from "./Close";
import Content from "./Content";
import Description from "./Description";
import Root from "./Root";
import Title from "./Title";
import Trigger from "./Trigger";

/**
 * @example
 * ```tsx
 * import Modal from '@/ui/Modal';
 * 
 * export default function ModalEx() {
 *  
 *  return (
 *    <>
      <Modal.Root>
        <Modal.Trigger>modal trigger</Modal.Trigger>
        <Modal.Content popover icon>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>내용</Modal.Description>
          <Modal.Close
            onConfirm={() => console.log('Button Clicked!')}
          >
            예
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
 *    </>
 *  )
 * }
 * ```
 * - 모든 param은 안 넣어도 됩니다.
 * @param {void} onConfirm - 모달 버튼에 넣을 함수입니다.
 * @param {string} className - tailwind css를 위한 클래스 네임을 추가할 수 있습니다.
 * 
 * - Title, Description, Close 안 넣어도 됩니다.
 * 
 * @author 배영준 
 */

const Modal = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
};

export default Modal;
