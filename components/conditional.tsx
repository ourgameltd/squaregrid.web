import { ReactNode } from "react";

const Conditional = ({condition, children }: { condition: boolean, children: ReactNode }) => {
  return condition ? <>{children}</> : <></>;
}

export default Conditional