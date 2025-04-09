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
    _cassetteTeeth: number[],
    _oneBySetup: boolean
  ): "red" | "orange" | "green" => {
    // Get all unique rear_teeth values from gearData, sorted ascending
    // console.log(_frontTeeth, "is front", rearTeeth, "Is rear")
    const uniqueSortedRear = Array.from(
      new Set(gearData.map(g => parseInt(g.rear_teeth)))
    ).sort((a, b) => {
      if (isNaN(a)) return 1;
      if (isNaN(b)) return -1;
      return a - b;
    });

    console.log("gearData:", gearData.map(g => g.rear_teeth));
    console.log("Parsed rear_teeths:", gearData.map(g => parseInt(g.rear_teeth)));
    console.log("uniqueSortedRear:", uniqueSortedRear);
  
    const len = cassetteTeeth.length;
    const pos = uniqueSortedRear.findIndex(teeth => teeth === rearTeeth);

    console.log(`Analyzing front:${_frontTeeth} rear:${rearTeeth} → pos:${pos}, cassetteLen:${len}`);

    // console.log(pos, "pos");
    if (isNaN(rearTeeth)) {
      return "red"; // Default to "red" if rearTeeth is NaN
    } else {
    }

    // Check if the array contains NaN
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
        if (pos <= 1) {
        return "red"  
        } else {
          if (pos <= 2 || pos === len || pos === len -1) return "orange"; // 3rd lowest, 2nd highest  
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
            if (gear.rear_teeth === 0) {
              gear.rear_teeth = "Unknown"
              gear.gear = "Unknown"
            }
            const zone = classifyZone(
              parseInt(gear.front_teeth),
              parseInt(gear.rear_teeth),
              cassetteTeeth,
              isOneBySetup
            );
            return (
              <tr key={idx} className={`${getZoneColor(zone)} hover:brightness-105`}>
                <td className="px-4 py-2 text-sm font-mono">{gear.gear}</td>
                <td className="px-4 py-2 text-sm">{gear.front_teeth}T</td>
                <td className="px-4 py-2 text-sm">{gear.rear_teeth}T</td>
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
