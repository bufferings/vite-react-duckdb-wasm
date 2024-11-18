import type { CSSProperties } from "react";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export function MySpinner() {
  return (
    <RingLoader
      loading={true}
      color="#36d7b7"
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
}
