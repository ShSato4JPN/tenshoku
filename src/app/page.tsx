"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <p>You Are Not Signed In</p>
      <Button
        ref={ref}
        variant={"outline"}
        className="bg-orange-500"
        onClick={() => alert("hello")}
      >
        Click
      </Button>

      <Button variant={"outline"} onClick={() => ref.current?.focus()}>
        move focus
      </Button>
    </div>
  );
}
