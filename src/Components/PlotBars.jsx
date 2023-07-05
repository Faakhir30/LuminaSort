function PlotBars({bars}) {
    const toArray=function(array) {
        const arrayString = JSON.stringify(array, (key, value) => {
            if (Array.isArray(value)) {
                return `{${value.join(", ")}}`;
            }
            return value;
        });
        return arrayString;
    }
  return (
    <>
      {bars.map((element, index) => (
        <div key={index+" =>main bar index"}>
          <div className="bardata">
            <div
              key={index}
              id={`${index}th-bar`}
              className="bar"
              style={{
                height: `${(element / Math.max(...bars)) * 70}vh`,
                width: `${40 / bars.length}vw`,
                marginRight: `${4 / bars.length}vw`,
                backgroundColor: "#27374D", // Set the default background color
              }}
            ></div>

            <div className="numbers">{element}</div>
          </div>
        </div>
      ))}
      ;
      <div className="array" key={"array"}>
        ARRAY={toArray(bars)}
      </div>
    </>
  );
}

export default PlotBars;