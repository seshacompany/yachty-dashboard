import type { SVGAttributes } from "react";

export type IconProps = SVGAttributes<SVGElement> & {
    class?: string;
    active?: boolean;
};