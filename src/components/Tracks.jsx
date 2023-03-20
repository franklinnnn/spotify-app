import React from "react";

const Tracks = ({ list }) => {
  const msToMinutesSeconds = (ms) => {
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const msArray = list.map((item) => {
    return item.duration_ms;
  });
  const totalMs = msArray.reduce((a, b) => a + b, 0);
  const totalDuration = msToMinutesSeconds(totalMs);

  return (
    <div>
      <table className="w-full">
        <thead className="border-black border-y border-dashed">
          <tr className="uppercase">
            <td>qty</td>
            <td className="px-2">item</td>
            <td className="flex justify-end">amt</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const numberList = index + 1;
            return (
              <tr key={index}>
                <td className="flex justify-start pr-2">
                  {numberList.toString().padStart(2, "0")}
                </td>
                <td className="px-2 uppercase">
                  <span>{item.name}</span>
                  <div>
                    {item.artists?.map((artist, index) => (
                      <span className="text-sm" key={index}>
                        {(index ? ", " : "") + artist.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="flex justify-end text-sm">
                  <span>{msToMinutesSeconds(item.duration_ms)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-black border-y border-dashed uppercase my-1 py-1">
        <div className="flex justify-between">
          <span>item count:</span>
          <span className="text-sm">{list.length}</span>
        </div>
        <div className="flex justify-between">
          <span>total:</span>
          <span className="text-sm">{totalDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
