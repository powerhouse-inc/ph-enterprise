"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "./demo-modal";

type DemoButtonProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
  /** Label used in the lead email subject, e.g. "Rollout planning". */
  topic?: string;
};

export function DemoButton({ topic, children, ...props }: DemoButtonProps) {
  const { open } = useDemoModal();
  return (
    <Button type="button" onClick={() => open(topic)} {...props}>
      {children}
    </Button>
  );
}
