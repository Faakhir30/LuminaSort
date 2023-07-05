function PlotBars({bars, setBars}) {
    const toArray=function(array) {
        const arrayString = JSON.stringify(array, (key, value) => {
            if (Array.isArray(value)) {
                return `{${value.join(", ")}}`;
            }
            return value;
        });
        return arrayString;
    }
    const changeHandler = (e, index, action) => {
        e.preventDefault();
        const updatedBars = [...bars];
        if (updatedBars[index]<Math.max(...bars)){
            updatedBars[index] += action?1:-1;
            setBars(updatedBars);
        }
      };
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
            >
                <p onClick={e=>changeHandler(e, index, 0)} className={element<5?"d-none":""}>-</p>
                <p onClick={e=>changeHandler(e, index, 1)}>+</p>
            </div>

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