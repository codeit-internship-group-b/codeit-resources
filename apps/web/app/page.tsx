"use client";

import React, { useState, useEffect } from "react";
import Button from "@ui/src/components/common/Button";

export default function Home(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [startPending, setStartPending] = useState(false);
  const [stopPending, setStopPending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startPending) {
      timer = setTimeout(() => {
        setIsPending(true);
        setStartPending(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [startPending]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stopPending) {
      timer = setTimeout(() => {
        setIsPending(false);
        setStopPending(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [stopPending]);

  return (
    <div className="space-y-4 p-8">
      {/* 기본 primary 버튼 */}
      <Button variant="Primary">Primary Button</Button>

      {/* 링크로 사용되는 버튼 (a 요소로 렌더링) */}
      <Button as="a" href="#" variant="Primary">
        Link Button
      </Button>

      {/* 비활성화된 secondary 버튼 */}
      <Button variant="Secondary" isActive={false}>
        Disabled Secondary Button
      </Button>

      {/* Tertiary 변형 버튼 */}
      <Button variant="Tertiary">Tertiary Button</Button>

      {/* 텍스트 버튼 */}
      <Button variant="Text">Text Button</Button>

      {/* 사용자 정의 클래스 이름을 추가한 primary 버튼 */}
      <Button variant="Primary" className="my-custom-class">
        Custom Styled Button
      </Button>

      {/* 아이콘을 포함하는 버튼 */}
      <Button variant="Primary">
        <span role="img" aria-label="check">
          ✅
        </span>{" "}
        Icon Button
      </Button>

      {/* isPending 상태를 가진 버튼 */}
      <Button variant="Primary" isPending={isPending} className="w-500">
        Save
      </Button>

      {/* Test 버튼 */}
      <Button
        variant="Primary"
        onClick={() => {
          setStartPending(true);
        }}
        className="w-500"
      >
        Test
      </Button>

      {/* Stop 버튼 */}
      <Button
        variant="Secondary"
        onClick={() => {
          setStopPending(true);
        }}
        className="w-500"
      >
        Stop
      </Button>
    </div>
  );
}
