import "@/components/iso/iso.css";
import "../figure-shared.css";
import "./workflow.css";
import { WorkflowArt } from "./art";
import { CAPTION, LEDGER } from "./model";

/**
 * How Powerhouse works, as one workflow built from pieces: a connector
 * catalogue outside the boundary, then trigger, typed record, a scoped AI
 * step, an approval gate and a status update, each logged on the panel
 * behind. The section's five steps sit beside it and drive it.
 */
export function WorkflowFigure() {
  return (
    <figure className="wf-figure iso" data-theme="light">
      <WorkflowArt
        label={`An isometric diagram of a workflow built from pieces, on a board with a dot grid inside a low rim, the boundary. Outside the rim, a tray holds connector tiles with service logos; the QuickBooks tile sits in the trigger module. Inside, five modules stand in a row, joined by connectors: the trigger, a typed claim record with four fields, a local model under a glass hood with a scan head, an approval module with a key switch and a gate on its outgoing connector, and a status update with a three-position dial. A panel behind logs ${LEDGER.length} entries, one per module.`}
      />
      <figcaption className="sr-only">{CAPTION}</figcaption>
    </figure>
  );
}
