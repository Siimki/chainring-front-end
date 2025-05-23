import { useState } from "react";

function Explanation() {

    const[showExamples, setShowExamples] = useState(false);
    const[showBeta, setShowBeta] = useState(false);

    return(
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-2 text-center text-gray-700">Gear Zone Classification</h3>
        <p className="text-gray-700">
            Gears are grouped into zones based on their alignment and efficiency:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
            <li>
                <strong>Red Zone:</strong> Extreme cross-chaining positions (worst efficiency).
            </li>
            <li>
                <strong>Orange Zone:</strong> Near extremes of the cassette. Acceptable but not ideal.
            </li>
            <li>
                <strong>Green Zone:</strong> Middle gears with good chain alignment. Most efficient for drivetrain performance.
            </li>
        </ul>
        <p className="text-gray-700 mt-2">
            Floorlight logic is based on&nbsp;
            <a
                href="https://cdn.shopify.com/s/files/1/0726/7542/6606/files/cross-chaining-and-ring-size-report.pdf?v=1687253624"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
            >
                this study on cross-chaining and drivetrain losses
            </a>.
        </p>
        <div className="mt-4">
  <div className="flex items-center justify-between">
    <button
      onClick={() => setShowExamples(!showExamples)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {showExamples ? "Hide Study Examples" : "Show Study Examples"}
    </button>

    <button
      onClick={() => setShowBeta(!showBeta)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {showBeta ? "Hide Chainring Advisor" : "Chainring Advisor"}
    </button>
  </div>

  {/* Show Study Examples */}
  {showExamples && (
    <div className="mt-4">
      <p className="text-gray-600 mb-4">
        Example screenshots from study showing how chainring sizes and chain angles matter:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/alignedChainData.png" target="_blank" rel="noopener noreferrer">
          <img src="/alignedChainData.png" alt="Efficiency vs Chainline" className="rounded shadow" />
        </a>
        <a href="/offsetChainData.png" target="_blank" rel="noopener noreferrer">
          <img src="/offsetChainData.png" alt="Efficiency vs Gear Size" className="rounded shadow" />
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-2">Source: Friction Facts / CeramicSpeed</p>
    </div>
  )}

  {/* Show Beta Section */}
  {showBeta && (
    <div className="mt-6">
<p className="text-gray-600 mb-4">
Example screenshot from testing the chainring advisor. It simulates your ride with different front chainrings by matching gear ratios to your original data. Not ready nor super accurate, but it is kinda promising.
</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/chainringAdvisor.png" target="_blank" rel="noopener noreferrer">
          <img src="/chainringAdvisor.png" alt="Chainring advisor" className="rounded shadow" />
        </a>
      </div>
    </div>
  )}
</div>

    </div>
    )
}

export default Explanation;


