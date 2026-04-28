import { Bucket } from "./components/bucket";
import "./app.css";
import { useEffect, useState } from "preact/hooks";
import { cation, anion } from "./ion-list";
import Button from "../element-decoder/components/button";
import { ThemeToggle } from "../theme";

export interface Ion {
  symbol: string;
  charge: number;
}

export interface RowState {
  columns: (Ion | null)[];
}

export interface BucketGridState {
  rows: RowState[];
}

export interface GridState {
  buckets: BucketGridState[];
}

export interface FlyingIon {
  ion: Ion;
  bucketColumnIndex: number;
  bucketIndex: number;
  /** How far down the screen it has fallen, from 0 (top) to 1 (bottom) */
  flyingProgress: number;
}
const randIon = () => {
  var posNeg = Math.floor(Math.random() * 2);
  var ion;
  var index;
  if (posNeg == 0) {
    index = Math.floor(Math.random() * cation.length);
    ion = cation[index];
  } else {
    index = Math.floor(Math.random() * anion.length);
    ion = anion[index];
  }
  return ion;
};
export function App() {
  const bucketColumns = [2, 2, 3, 3];
  const [flyingIon, setFlyingIon] = useState<FlyingIon | null>(null);
  const [grid, setGrid] = useState<GridState>({
    buckets: [
      {
        rows: [
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "P", charge: -3 },
            ],
          },
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "N", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "P", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Li", charge: 1 },
              { symbol: "Li", charge: 1 },
              { symbol: "O", charge: -2 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Li", charge: 1 },
              { symbol: "Li", charge: 1 },
              { symbol: "O", charge: -2 },
            ],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    // Attach keydown listener (fires when key is first pressed down)
    // for right and left keys, to move the flying ion
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setFlyingIon((flyingIon) => {
          if (!flyingIon) return null;
          // Copy the flying ion to a new object, increasing the column
          const newFlyingIon = {
            ...flyingIon,
            bucketColumnIndex: flyingIon.bucketColumnIndex + 1,
          };
          // Prevent overflowing the current bucket columns (flow into the next bucket)
          if (
            newFlyingIon.bucketColumnIndex >
            bucketColumns[newFlyingIon.bucketIndex] - 1
          ) {
            newFlyingIon.bucketIndex++;
            newFlyingIon.bucketColumnIndex = 0;
          }
          // Prevent overflowing the whole game screen
          // (if it is past the last column, put it in the last column)
          if (newFlyingIon.bucketIndex > bucketColumns.length - 1) {
            newFlyingIon.bucketIndex = bucketColumns.length - 1;
            newFlyingIon.bucketColumnIndex =
              bucketColumns[newFlyingIon.bucketIndex] - 1;
          }
          return newFlyingIon;
        });
      } else if (event.key === "ArrowLeft") {
        setFlyingIon((flyingIon) => {
          if (!flyingIon) return null;
          // Copy the flying ion to a new object, decrasing the column
          const newFlyingIon = {
            ...flyingIon,
            bucketColumnIndex: flyingIon.bucketColumnIndex - 1,
          };
          // Prevent underflowing the current bucket columns (flow into the previous bucket)
          if (newFlyingIon.bucketColumnIndex < 0) {
            newFlyingIon.bucketIndex--;
            newFlyingIon.bucketColumnIndex =
              bucketColumns[newFlyingIon.bucketIndex] - 1;
          }
          // Prevent underflowing the whole game screen
          // (if it is past the first column, put it in the first column)
          if (newFlyingIon.bucketIndex < 0) {
            newFlyingIon.bucketIndex = 0;
            newFlyingIon.bucketColumnIndex = 0;
          }

          return newFlyingIon;
        });
      }
    };

    window.addEventListener("keydown", keydownListener);

    return () => {
      window.removeEventListener("keydown", keydownListener);
    };
  });

  return (
    <>
      <ThemeToggle />
      <Button
        onClick={() =>
          setFlyingIon({
            ion: randIon(),
            bucketIndex: 0,
            bucketColumnIndex: 0,
            flyingProgress: 0,
          })
        }
      >
        Send an element
      </Button>
      <div
        class="ionic-tetris"
        style={{
          gridTemplateColumns: bucketColumns
            .map((numCols) => `${numCols}fr`)
            .join(" "),
        }}
      >
        {bucketColumns.map((numCols, i) => {
          return (
            <Bucket
              key={i}
              flyingIon={
                flyingIon && flyingIon.bucketIndex === i ? flyingIon : null
              }
              numCols={numCols}
              bucketGridState={grid.buckets[i]}
            />
          );
        })}
      </div>
    </>
  );
}
