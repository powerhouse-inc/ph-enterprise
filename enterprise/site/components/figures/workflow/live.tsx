"use client";

import * as React from "react";
import { translateAlong } from "@/components/iso/iso-kit";
import { LabelOverlay, type LabelSpot } from "../labels";
import { StepList } from "../step-list";
import { useTour } from "../use-tour";
import { CONNECTOR_RUN, FEEDER_RUN, GATE_AT, GATE_RISE, SCAN_RUN } from "./geometry";
import { LEDGER, STEPS } from "./model";
import { HEIGHT, MODULE_W, MODULE_XS, P, WIDTH } from "./view";

/*
 * Runs one workflow, a step at a time. Step n lights its parts in the
 * accent (cyan for data and AI, green for approval and history) and fills
 * its pins; a document chip travels the connectors. Reduced motion: each
 * step shows its end state.
 */

const DURATIONS = STEPS.map((step) => step.duration);
const CHIP_W = 9;
// Connector 4 (approval to update) starts at M4's right face; the chip waits
// with its front edge just short of the gate, then passes once it rises.
const GATE_START = MODULE_XS[3]! + MODULE_W / 2 + 1;
const WAIT = GATE_AT - 0.8 - 1.2 - CHIP_W - GATE_START;
const CROSS = GATE_AT - CHIP_W / 2 - GATE_START; // offset at which the chip's centre passes the gate

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
/** A chip's travel: position along its run and its opacity (fades in, then out at the far port). */
function travel(t: number, start: number, length: number, run: number, fadeOut = true) {
  if (t < start) return { x: 0, opacity: 0 };
  const k = ease((t - start) / length);
  const opacity = Math.min(ease((t - start) / 0.2), fadeOut ? 1 - ease((t - start - length + 0.25) / 0.25) : 1);
  return { x: k * run, opacity };
}

function poseOf(step: number, t: number, calm: boolean) {
  const hidden = { x: 0, opacity: 0 };
  const pose = {
    chips: [hidden, hidden, hidden, hidden, hidden, hidden],
    fields: step >= 2 ? 4 : 0,
    scan: 0,
    turned: step >= 3,
    gate: step >= 3 ? GATE_RISE : 0,
    approved: step >= 3,
    logged: [1, 2, 3, 5, 5][step]!,
  };
  if (calm) {
    if (step === 1) pose.fields = 4;
    return pose;
  }
  if (step === 0) {
    const cycle = t % 2.2;
    pose.chips[0] = travel(cycle, 0, 1.6, FEEDER_RUN);
  }
  if (step === 1) {
    pose.chips[1] = travel(t, 0, 1.3, CONNECTOR_RUN);
    pose.fields = Math.max(0, Math.min(4, Math.floor((t - 1.3) / 0.55) + 1));
  }
  if (step === 2) {
    pose.chips[2] = travel(t, 0, 1.2, CONNECTOR_RUN);
    pose.scan = t > 1.2 ? SCAN_RUN * Math.sin((t - 1.2) * 2.3) * (1 - ease((t - 3.9) / 0.5)) : 0;
  }
  if (step === 3) {
    pose.chips[3] = travel(t, 0, 1.1, CONNECTOR_RUN);
    pose.turned = t > 1.6;
    pose.gate = ease((t - 1.8) / 0.7) * GATE_RISE;
    // The chip comes out of M4, waits at the gate, then passes when it is up.
    const waiting = travel(t, 1.1, 0.4, WAIT, false);
    const passing = t > 2.5 ? WAIT + ease((t - 2.5) / 0.9) * (CONNECTOR_RUN - WAIT) : waiting.x;
    const opacity = Math.min(waiting.opacity, 1 - ease((t - 3.15) / 0.25));
    const chip = { x: passing, opacity };
    pose.chips[4] = chip.x < CROSS ? chip : hidden;
    pose.chips[5] = chip.x >= CROSS ? chip : hidden;
    pose.approved = t > 3.3;
    pose.logged = t > 3.3 ? 5 : 4;
  }
  if (step === 4) {
    pose.logged = Math.min(LEDGER.length, Math.max(0, Math.floor((t - 0.3) / 0.6) + 1));
  }
  return pose;
}

function readoutOf(step: number, logged: number) {
  const printing = step === 4 && logged > 0;
  return `${STEPS[step]!.num} · ${printing ? LEDGER[logged - 1]! : STEPS[step]!.readout}`;
}

interface Layers {
  back: React.ReactNode[];
  head: React.ReactNode;
  middle: React.ReactNode[];
  gate: React.ReactNode;
  front: React.ReactNode[];
}

export function WorkflowLive({ label, labels, layers }: { label: string; labels: readonly LabelSpot[]; layers: Layers }) {
  const anchor = React.useRef<HTMLDivElement>(null);
  const plate = React.useRef<HTMLDivElement>(null);
  const list = React.useRef<HTMLOListElement>(null);
  const headRef = React.useRef<SVGGElement>(null);
  const gateRef = React.useRef<SVGGElement>(null);
  const shown = React.useRef({ step: -1, text: "", fields: -1, logged: -1, turned: false, approved: false });

  const write = React.useCallback((step: number, t: number, calm: boolean) => {
    const root = plate.current;
    if (!root) return;
    const pose = poseOf(step, t, calm);
    const fine = (value: number) => Math.round(value * 100) / 100;

    root.querySelectorAll<SVGGElement>("[data-chip]").forEach((node) => {
      const c = pose.chips[Number(node.dataset.chip)]!;
      node.setAttribute("transform", translateAlong(P, [c.x, 0, 0]));
      node.setAttribute("opacity", String(fine(clamp01(c.opacity))));
    });
    headRef.current?.setAttribute("transform", translateAlong(P, [0, pose.scan, 0]));
    gateRef.current?.setAttribute("transform", translateAlong(P, [0, 0, pose.gate]));

    const s = shown.current;
    if (pose.fields !== s.fields) {
      s.fields = pose.fields;
      root.querySelectorAll<SVGPathElement>("[data-field]").forEach((node) => {
        node.style.display = Number(node.dataset.field) < pose.fields ? "inline" : "none";
      });
    }
    if (pose.turned !== s.turned) {
      s.turned = pose.turned;
      root.querySelectorAll<SVGGElement>("[data-key]").forEach((node) => {
        node.style.display = (node.dataset.key === "turned") === pose.turned ? "inline" : "none";
      });
    }
    if (pose.approved !== s.approved) {
      s.approved = pose.approved;
      root.querySelectorAll<SVGPathElement>("[data-pointer]").forEach((node) => {
        node.style.display = (node.dataset.pointer === "approved") === pose.approved ? "inline" : "none";
      });
    }
    if (pose.logged !== s.logged) {
      s.logged = pose.logged;
      root.querySelectorAll<SVGGElement>("[data-cell]").forEach((node) => {
        if (Number(node.dataset.cell) < pose.logged) node.setAttribute("data-logged", "");
        else node.removeAttribute("data-logged");
      });
    }
    if (step !== s.step) {
      s.step = step;
      root.setAttribute("data-active", String(step + 1));
      root.setAttribute("data-tone", STEPS[step]!.tone);
      root.querySelectorAll<SVGGElement>("[data-lit-step]").forEach((group) => {
        const on = Number(group.dataset.litStep) === step + 1;
        group.querySelectorAll(".iso-solid").forEach((node) => (on ? node.setAttribute("data-lit", "") : node.removeAttribute("data-lit")));
      });
    }
    const text = readoutOf(step, pose.logged);
    if (text !== s.text) {
      s.text = text;
      const slot = root.querySelector("[data-readout]");
      if (slot) slot.textContent = text;
    }
  }, []);

  const { active, choose, handlers } = useTour({ durations: DURATIONS, write, anchor, list });

  return (
    <div ref={anchor} className="fig-root" data-layout="stacked" {...handlers}>
      <div ref={plate} className="iso-plate fig-plate fig-ink wf-plate" data-active="1" data-tone="cyan">
        <div className="fig-stage">
          <svg className="iso-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label} focusable="false">
            {layers.back}
            <g ref={headRef}>{layers.head}</g>
            {layers.middle}
            <g ref={gateRef}>{layers.gate}</g>
            {layers.front}
          </svg>
          <LabelOverlay spots={labels} />
        </div>
        <div className="fig-readout" data-readout="" aria-hidden="true">
          {readoutOf(0, 1)}
        </div>
      </div>
      <StepList items={STEPS} active={active} onChoose={choose} listRef={list} row />
    </div>
  );
}
