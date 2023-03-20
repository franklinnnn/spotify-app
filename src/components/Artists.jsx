import React from "react";

const Artists = ({ list }) => {
  const popularityArray = list.map((items) => {
    return items.popularity;
  });
  const totalPopularity = popularityArray.reduce((a, b) => a + b, 0);
  return (
    <div>
      <table className="w-full">
        <thead className="border-black border-y border-dashed">
          <tr className="uppercase ">
            <td>qty</td>
            <td className="px-2">item</td>
            <td className="flex justify-end">amt</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const numberList = index + 1;
            return (
              // <div key={index}>
              //   <div className="flex items-center gap-2">
              //     <span className="flex justify-end text-sm w-[1rem]">
              //       {index + 1}
              //     </span>
              //     <span className="text-lg justify-start">{item.name}</span>
              //   </div>
              // </div>
              <tr key={index}>
                <td className="flex justify-start pr-2">
                  {numberList.toString().padStart(2, "0")}
                </td>
                <td className="px-2 uppercase">
                  <span>{item.name}</span>
                </td>
                <td className="flex justify-end text-sm">
                  <span>{item.popularity}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-black border-y border-dashed uppercase py-1">
        <div className="flex justify-between">
          <span>item count:</span>
          <span className="text-sm">{list.length}</span>
        </div>
        <div className="flex justify-between">
          <span>total:</span>
          <span className="text-sm">{totalPopularity}</span>
        </div>
      </div>
    </div>
  );
};

export default Artists;
