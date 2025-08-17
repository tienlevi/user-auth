import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "react-ts" },
    { name: "description", content: "react-ts is a web application" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-2">
        <div className="text-3xl text-center font-bold">Home Page</div>
      </div>
    </>
  );
}
