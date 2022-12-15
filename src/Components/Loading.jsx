import { Blocks } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        zIndex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: "100% !important",
        height: "100%",
      }}
    >
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default Loading;
