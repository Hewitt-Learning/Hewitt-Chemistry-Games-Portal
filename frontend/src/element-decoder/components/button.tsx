import { JSX } from "preact";
import clsx from "clsx";
import "./button.css";

type ButtonProps = JSX.IntrinsicElements["button"];

const Button = (props: ButtonProps) => {
  return <button {...props} class={clsx("display-button", props.class)} />;
};

export default Button;
