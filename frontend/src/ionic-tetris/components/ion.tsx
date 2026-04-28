import "./ion.css";
import { Ion as IonType } from "../app";
import clsx from "clsx";

interface Props {
  ion: IonType;
}

const chargeToString = (charge: number) => {
  if (charge === 0) {
    return "";
  } else if (charge > 0) {
    return `+${charge}`;
  } else {
    return `${charge}`;
  }
};

export const Ion = ({ ion }: Props) => {
  return (
    <div
      class={clsx(
        "ion",
        ion.charge > 0 ? "ion-positive-charge" : "ion-negative-charge",
      )}
    >
      <div class="ion-inner">
        {ion.symbol}
        <span class="ion-charge">{chargeToString(ion.charge)}</span>
      </div>
    </div>
  );
};
