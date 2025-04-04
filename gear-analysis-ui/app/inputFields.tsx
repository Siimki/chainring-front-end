import React from "react";

interface GearInputFieldsProps {
  bigChainring: string;
  setBigChainring: (value: string) => void;
  smallChainring: string;
  setSmallChainring: (value: string) => void;
  cassette: string;
  setCassette: (value: string) => void;
  minPower: string;
  setMinPower: (value: string) => void;
  minCadence: string;
  setMinCadence: (value: string) => void;
  oneBySetup: boolean;
  setOneBySetup: (value: boolean) => void;
  cassetteOptions: { value: string; label: string }[];
}

const InputFields = ({
  bigChainring,
  setBigChainring,
  smallChainring,
  setSmallChainring,
  cassette,
  setCassette,
  minPower,
  setMinPower,
  minCadence,
  setMinCadence,
  oneBySetup,
  setOneBySetup,
  cassetteOptions,
}: GearInputFieldsProps) => {
    return(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Big Chainring (e.g. 53)
        </label>
        <input
          type="text"
          value={bigChainring}
          onChange={(e) => setBigChainring(e.target.value)}
          className="w-full text-gray-700 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Small Chainring (e.g. 39)
        </label>
        <input
          type="text"
          value={smallChainring}
          onChange={(e) => setSmallChainring(e.target.value)}
          className="w-full p-2 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Cassette("Currently only shimano 11-34 is color corrected")
        </label>
        <select
          value={cassette}
          onChange={(e) => setCassette(e.target.value)}
          className="w-full p-2 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {cassetteOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Min Power (optional, default 0)
        </label>
        <input
          type="text"
          value={minPower}
          onChange={(e) => setMinPower(e.target.value)}
          className="w-full p-2 border text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Min Cadence (optional, default 0)
        </label>
        <input
          type="text"
          value={minCadence}
          onChange={(e) => setMinCadence(e.target.value)}
          className="w-full p-2 border text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          1x Setup? (optional, default is 2x)
        </label>
        <label className="flex items-center p-2 border rounded w-full h-[44px] cursor-pointer focus-within:ring-2 hover:ring-blue-400">
          <input
            type="checkbox"
            checked={oneBySetup}
            onChange={(e) => setOneBySetup(e.target.checked)}
            className="w-6 h-6 text-blue-600 border-gray-300 rounded hover:ring-blue-400"
          />
          <span className="ml-3 text-gray-700 text-base">Enable 1x setup</span>
          </label>
    </div>
  </div> 
)
}

export default InputFields;

