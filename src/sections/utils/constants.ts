export type PositionKey = "POR" | "DFD" | "DFI" | "LD" | "LI" | "MCO" | "MCI" | "MCD" | "ED" | "EI" | "DC";
export type PositionKey352 = "POR" | "DFD" | "DFI" | "DFC" | "MD" | "MCO" | "MCI" | "MCD" | "MI" | "DLD" | "DLI";

export const positionColors = (tactic: "433" | "352"): Partial<Record<PositionKey | PositionKey352, string>> => {
  if (tactic === "433") {
    return {
      POR: "#d09900",
      DFI: "#2036b0",
      DFD: "#2036b0",
      LD: "#2036b0",
      LI: "#2036b0",
      MCI: "#2036b0",
      MCD: "#2036b0",
      ED: "#2036b0",
      EI: "#2036b0",
      DC: "#2036b0",
      MCO: "#2036b0",
    };
  } else if (tactic === "352") {
    return {
      POR: "#d09900",
      DFD: "#2036b0",
      DFC: "#2036b0",
      DFI: "#2036b0",
      MCI: "#2036b0",
      MCD: "#2036b0",
      MD: "#2036b0",
      MI: "#2036b0",
      MCO: "#2036b0",
      DLD: "#2036b0",
      DLI: "#2036b0",
    };
  }
  return {};
};