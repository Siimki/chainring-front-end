// GearUsageTable.tsx
import React from "react";

interface GearUsageTableProps {
  gearData: any[];
  cassetteTeeth: number[];
  isOneBySetup: boolean;
}

const GearUsageTable = ({ gearData, cassetteTeeth, isOneBySetup }: GearUsageTableProps) => {
  const classifyZone = (
    _frontTeeth: number,
    rearTeeth: number,
    uniqueSortedRear: number[],
    _cassetteTeeth: number[],
    _oneBySetup: boolean
  ): "red" | "orange" | "green" => {

    console.log("gearData:", gearData.map(g => g.rear_teeth));
    console.log("Parsed rear_teeths:", gearData.map(g => parseInt(g.rear_teeth)));
    console.log("uniqueSortedRear:", uniqueSortedRear);
  
    const len = uniqueSortedRear.length;
    const pos = uniqueSortedRear.findIndex(teeth => teeth === rearTeeth);

    // console.log(`Analyzing front:${_frontTeeth} rear:${rearTeeth} → pos:${pos}, cassetteLen:${len}`);

    // console.log(pos, "pos");
    if (isNaN(rearTeeth)) {
      return "red"; // Default to "red" if rearTeeth is NaN
    } else {
    }

    // Check if the array contains NaN
    console.log(pos, 'pos', len, 'len', _frontTeeth, "front chain")
    if (uniqueSortedRear.some(teeth => isNaN(teeth))) {
      if (_frontTeeth < 50){
        if (pos <= 1 ) {
          return "red"
        } else if (pos <= 2 || pos === len - 2){
          return "orange"
        } ;
      } else {
        if (pos <= 1 || pos === len - 1) {
        return "red"
        } ;   
        if (pos <= 2 || pos === len - 2) return "orange"; // fuji is correct. with -2
      }
     } else {
      if (_frontTeeth < 50){
        if (pos <= 3) {
        return "red"  
        } else {
          if (pos <= 2 || pos === len || pos === len -1 || pos === 4) return "orange"; // 3rd lowest, 2nd highest  
        };     // lowest 2, highest
      } else {
        if (pos <= 1 || pos === len -1 ) {
          return "red"
        }  else {
          if (pos <= 2 || pos === len - 2 ) return "orange";      // 3rd lowest, 2nd highest
        }   // lowest 2, highest
      }
    }
    // if (pos <= 1 || pos === len - 1) return "red";     // lowest 2, highest
    // if (pos <= 2 || pos === len - 2) return "orange"; // 3rd lowest, 2nd highest
    return "green";
  };


  const getZoneColor = (zone: "red" | "orange" | "green") => {
    switch (zone) {
      case "red":
        return "bg-red-100 text-red-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "green":
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const parsedSortedRear = Array.from(
    new Set(
      gearData
        .map(g => parseInt(g.rear_teeth))
        .filter(n => !isNaN(n))
    )
  ).sort((a, b) => a - b);

  return (
    <div className="overflow-x-auto">
      
      <table className="min-w-full divide-y divide-gray-300 border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Gear</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Front</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rear</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ratio</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Time</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Usage %</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Avg Speed</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Avg Cadence</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Avg Power</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          
          {gearData.map((gear, idx) => {
            const parsedRear = parseInt(gear.rear_teeth);
            const isUnknown = parsedRear === 0;
          
            const displayRear = isUnknown ? "Unknown" : `${gear.rear_teeth}`;
            const displayGear = isUnknown ? "Unknown" : gear.gear;
            const zone = isUnknown
              ? "green"
              : classifyZone(
                  parseInt(gear.front_teeth),
                  parsedRear,
                  parsedSortedRear,
                  cassetteTeeth,
                  isOneBySetup
                );
            return (
              <tr key={idx} className={`${getZoneColor(zone)} hover:brightness-105`}>
                <td className="px-4 py-2 text-sm font-mono">{displayGear}</td>
                <td className="px-4 py-2 text-sm">{gear.front_teeth}T</td>
                <td className="px-4 py-2 text-sm">{displayRear}T</td>
                <td className="px-4 py-2 text-sm">{gear.gear_ratio}</td>
                <td className="px-4 py-2 text-sm">{gear.total_time}</td>
                <td className="px-4 py-2 text-sm">{gear.usage_percentage}</td>
                <td className="px-4 py-2 text-sm">{gear.avg_speed}</td>
                <td className="px-4 py-2 text-sm">{gear.avg_cadence}</td>
                <td className="px-4 py-2 text-sm">{gear.avg_power}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GearUsageTable;
