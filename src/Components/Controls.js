export function Controls() {
  return (
    <div className="control-group">
      <img className="view-image" src="" alt="Book Cover" loading="lazy" />
      <button className="add-btn">To the Reading List</button>
      <div className="remove-btn-container">
        <button className="remove-btn">Remove</button>
        <div className="simple-text">from the reading list</div>
      </div>
      <button className="next-btn">Next</button>
      <div className="rate-btn-container" style={{ display: "none" }}>
        <div className="upcom-text">Reading now</div>
        <button className="rate-btn">Rate</button>
      </div>
    </div>
  );
}
