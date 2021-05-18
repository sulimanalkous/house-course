import Layout from "src/components/layout";
import Map from "src/components/map";

export default function Home() {
  return (
    <Layout
      main={
        <div className="flex">
          <div className="w-1/2 pb-4" style={{ maxHeight: "calc(100vh - 64px)", overflowX: "scroll" }}>
            HouseList
          </div>
          <div className="w-1/2">
            <Map />
          </div>
        </div>
      }
    />
  );
}
