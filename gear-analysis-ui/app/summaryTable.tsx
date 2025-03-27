// GearUsageTable.tsx
import React from "react";

interface GearUsageTableProps {
  gearData: any[];
  cassetteTeeth: number[];
  isOneBySetup: boolean;
}

const GearUsageTable: React.FC<GearUsageTableProps> = ({ gearData, cassetteTeeth, isOneBySetup }) => {
  const classifyZone = (
    frontTeeth: number,
    rearTeeth: number,
    cassetteTeeth: number[],
    oneBySetup: boolean
  ): "red" | "orange" | "green" => {
    const len = cassetteTeeth.length;
    const isBigRing = !oneBySetup && frontTeeth >= 50;
    const pos = cassetteTeeth.indexOf(rearTeeth);

    if (pos === -1) return "green";

    if (oneBySetup) {
      if (pos === 0 || pos === 1 || pos === len - 1) {
        return "red";
      } else if (pos === 2 || pos === len - 3 || pos === len - 2) {
        return "orange";
      }
      return "green";
    }

    if (isBigRing) {
      if (pos === 0 || pos === 1 || pos === len - 1) return "red";
      if (pos === 2 || pos === len - 3 || pos === len - 2) return "orange";
      return "green";
    } else {
      if (pos <= 3 || pos === len - 1) return "red";
      if (pos === len - 3 || pos === len - 2 || pos == len -8) return "orange";
      return "green";
    }
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
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cadence</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Power</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {gearData.map((gear, idx) => {
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
