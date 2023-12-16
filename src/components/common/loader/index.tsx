import "@/styles/Loader.module.scss";

type LoaderProps = {
  loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => (
  <>
    <div
      className="opaque-loader-wrapper"
      style={{ display: loading ? "flex" : "none" }}
    >
      <h1>Loading</h1>
    </div>
  </>
);
export default Loader;
