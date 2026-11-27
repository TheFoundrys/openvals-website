import PapersView from "./PapersView";

export const revalidate = 60;

/** /papers — the day of the newest paper, like huggingface.co/papers */
export default function PapersPage() {
  return <PapersView period="day" periodKeyValue={null} />;
}
