import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { BucketGridState, FlyingIon } from "../app";
import { Ion } from "./ion";

interface Props {
  numCols: number;
  bucketGridState: BucketGridState;
  flyingIon: FlyingIon | null;
}

export const Bucket = ({ numCols, bucketGridState, flyingIon }: Props) => {
  const columnIndices = new Array(numCols).fill(0);
  const flyingIonRef = useRef() as RefObject<HTMLDivElement>;
  useEffect(() => {
    const updateFlyingElement = () => {
      const flyingIonElement = flyingIonRef.current;
      if (flyingIon && flyingIonElement && flyingIon.flyingProgress < 1) {
        flyingIon.flyingProgress += 0.005;
        flyingIonElement.style.transform = `translateY(calc(${
          flyingIon.flyingProgress * 100
        }vh - 100%))`;
        frameRequest = requestAnimationFrame(updateFlyingElement);
      }
    };
    let frameRequest = requestAnimationFrame(updateFlyingElement);
    return () => {
      cancelAnimationFrame(frameRequest);
    };
  }, [flyingIon]);
  return (
    <div class="bucket">
      {columnIndices.map((_col, colIndex) => {
        return (
          <div class="column">
            {flyingIon && flyingIon.bucketColumnIndex === colIndex && (
              <div
                class="flying-ion"
                ref={flyingIonRef}
                style={{
                  transform: `translateY(${flyingIon.flyingProgress * 100}%)`,
                }}
              >
                <Ion ion={flyingIon.ion} />
              </div>
            )}
            {bucketGridState.rows.map((row) => {
              const ion = row.columns[colIndex];
              if (ion === null) {
                return <div>Empty</div>;
              } else {
                return <Ion ion={ion} />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
