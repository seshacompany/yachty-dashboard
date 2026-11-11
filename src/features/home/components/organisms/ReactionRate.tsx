import { HeaderReactionRate } from "../molecules/ReactionRate/HeaderReactionRate";
import { ShapeReactionRate } from "../molecules/ReactionRate/ShapeReactionRate";

const data = [
  { name: "يناير", uv: 4000 },
  { name: "فبراير", uv: 4300 },
  { name: "مارس", uv: 3000 },
  { name: "أبريل", uv: 4600 },
  { name: "مايو", uv: 3200 },
  { name: "يونيو", uv: 4500 },
];

export function ReactionRate() {
  return (
    <div className="p-4 border border-solid border-white/20 rounded-xl flex flex-col gap-8 bg-card dark:bg-primary-dark transition duration-300 ease-in-out">
      <HeaderReactionRate />
      <ShapeReactionRate data={data} />
    </div>
  );
}
