import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title="The Page You are looking fir cant be found"
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
