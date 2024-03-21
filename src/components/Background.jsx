function Background({ isVisible }) {
  return (
    <div
      className={`background ${isVisible ? "background--visible" : ""}`}
    ></div>
  );
}

export default Background;
