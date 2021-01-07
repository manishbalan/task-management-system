import React from "react";
import Board from "../board/Board";

// Internal CSS
const styles = {
  icon: {
    color: "#fff",
  },
  div: {
    margin: "50px",
  },
};
// BoardContainer Functional Component 
function BoardContainer() {

  // Return Board Component 
  return (
    <>
      <div style={styles.div}>
        <Board />
      </div>
    </>
  );
}

export default BoardContainer;
