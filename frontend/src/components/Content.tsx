import { useAtomValue } from "jotai";
import { postStore } from "../lib/store";

export default function Content() {
  const selectedPost = useAtomValue(postStore);

  /* TODO: Do something with the selected post */

  return <div>Content</div>;
}
