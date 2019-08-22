import React from 'react';
import Museum from "./museum/page";

function App() {
  const a = "123as";
  return (

    <React.Fragment>
      <Museum hello={a}/>
    </React.Fragment>
  );
}

export default App;
