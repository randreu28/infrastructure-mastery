import Content from "./components/Content";
import Posts from "./components/Posts";

export default function App() {
  return (
    <div className="flex h-full flex-col xl:flex-row">
      <div className="w-full bg-neutral-900 p-5 xl:w-3/4">
        <h1 className="border-b-2 border-gray-500 pb-6 text-6xl">Posts</h1>
        <Posts />
      </div>
      <div className="w-full p-5">
        <Content />
      </div>
    </div>
  );
}
