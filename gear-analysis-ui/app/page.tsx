"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // a small spinner library (optional)
import GearUsageTable from "./summaryTable";
import CassetteData from "./CassetteData";
import Explanation from "./explanation"; 
import Instructions from "./instructions";
import InputFields from "./inputFields";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// A helper to parse usage percentage strings like "15.4%" into numeric values
const parsePercentage = (percentageStr: string | number): number => {
  if (typeof percentageStr === "string" && percentageStr.trim().endsWith("%")) {
    return parseFloat(percentageStr.slice(0, -1));
  }
  return Number(percentageStr);
};



// Cassette dropdown options
const cassetteOptions = [
  { value: "12shimano34", label: "12-speed Shimano 11-34" },
  { value: "12shimano30", label: "12-speed Shimano 11-30" },
  { value: "11shimano25", label: "11-speed Shimano 11-25" },
  { value: "11shimano28", label: "11-speed Shimano 11-28" },
  { value: "11shimano30", label: "11-speed Shimano 11-30" },
  { value: "11shimano32", label: "11-speed Shimano 11-32" },
  { value: "11shimano19", label: "11-speed Shimano 12-25" },
  { value: "11shimano28wide", label: "11-speed Shimano 14-28" },
  { value: "12sram28", label: "12-speed SRAM 10-28" },
  { value: "12sram30", label: "12-speed SRAM 10-30" },
  { value: "12sram33", label: "12-speed SRAM 10-33" },
  { value: "12sram36", label: "12-speed SRAM 10-36" },
  { value: "12sram44", label: "12-speed SRAM 10-44" },
  { value: "12sram46", label: "12-speed SRAM 10-46" },
  { value: "12sram50", label: "12-speed SRAM 10-50" },
  { value: "12sram52", label: "12-speed SRAM 10-52" },
  { value: "13sram46", label: "13-speed SRAM 10-46" },
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [bigChainring, setBigChainring] = useState("53");
  const [smallChainring, setSmallChainring] = useState("39");
  const [cassette, setCassette] = useState("12shimano34");
  const [minCadence, setMinCadence] = useState("0");
  const [minPower, setMinPower] = useState("0");
  const [oneBySetup, setOneBySetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [colorsRemoved, setColorsRemoved] = useState(false);
  

  // Store both raw gear data (for chart) and text summary lines
  const [gearAnalysis, setGearAnalysis] = useState<any[]>([]);
  const [formattedOutput, setFormattedOutput] = useState<string[]>([]);
  const [zoneSummary, setZoneSummary] = useState<any>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const chosenFile = event.target.files[0];
      // Optional: Quick file type check
      if (!chosenFile.name.toLowerCase().endsWith(".fit")) {
        toast.error("Please upload a .fit file!");
        return;
      }
      setFile(chosenFile);
    }
  };

  const handleSampleFileChange = async () => {
    try {
      const response = await fetch("/sample.fit"); // sample.fit must be in the /public folder
      const blob = await response.blob();
      const chosenFile = new File([blob], "sample.fit", { type: "application/octet-stream" });
  
      setFile(chosenFile);
  
      toast.success("Sample file loaded!");
    } catch (error) {
      console.error("Error loading sample file:", error);
      toast.error("Could not load the sample file.");
    }
  };

  // const toggleColors = () => {
  //   const rows = document.querySelectorAll("tbody tr");
  
  //   rows.forEach(row => {
  //     if (!colorsRemoved) {
  //       // Detect and store background and text color classes
  //       const classList = Array.from(row.classList);
  
  //       const bgClass = classList.find(cls =>
  //         ["bg-green-100", "bg-orange-100", "bg-red-100"].includes(cls)
  //       );
  //       const textClass = classList.find(cls =>
  //         ["text-green-800", "text-orange-800", "text-red-800"].includes(cls)
  //       );
  
  //       if (bgClass) {
  //         row.setAttribute("data-original-bg", bgClass);
  //         row.classList.remove(bgClass);
  //       }
  //       if (textClass) {
  //         row.setAttribute("data-original-text", textClass);
  //         row.classList.remove(textClass);
  //       }
  //     } else {
  //       // Restore classes from data attributes
  //       const bgClass = row.getAttribute("data-original-bg");
  //       const textClass = row.getAttribute("data-original-text");
  
  //       if (bgClass) {
  //         row.classList.add(bgClass);
  //         row.removeAttribute("data-original-bg");
  //       }
  //       if (textClass) {
  //         row.classList.add(textClass);
  //         row.removeAttribute("data-original-text");
  //       }
  //     }
  //   });
  
  //   setColorsRemoved(prev => !prev);
  // };
  


  // Handle upload & analysis
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file before uploading!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bigChainring", bigChainring);
    formData.append("smallChainring", smallChainring);
    formData.append("cassette", cassette);
    formData.append("oneBySetup", oneBySetup.toString());
    if (minCadence) formData.append("minCadence", minCadence);
    if (minPower) formData.append("minPower", minPower);

    try {
      // const response = await fetch("http://localhost:8080/api/analyze", {        method: "POST",
      const response = await fetch("https://javachainring-production.up.railway.app/api/analyze", {        method: "POST",
      body: formData,
      });

      if (!response.ok) {
        toast.error("Error analyzing file. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // For the chart
      setGearAnalysis(data.gear_analysis);

      // For the text-based gear usage summary
      const formattedData = data.gear_analysis.map((gear: any) =>
        `⚙ Gear ${gear.gear} (${gear.front_teeth}T:${gear.rear_teeth}T | Ratio: ${gear.gear_ratio}) → ⏳ Time: ${gear.total_time} (${gear.usage_percentage}), 🚴 Avg Speed: ${gear.avg_speed}, Avg Cadence: ${gear.avg_cadence}, ⚡ Avg Power: ${gear.avg_power}`
      );
      setFormattedOutput(formattedData);

      // Zone summary
      setZoneSummary(data.zone_summary);

      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred during upload. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-700">Gear Analysis Tool</h1>
          <p className="text-center text-gray-600 mb-4">
            Upload a FIT file and provide chainring/cassette details to analyze your ride gear usage.
          </p>
          {/* Instructions */}
          <Instructions/>
          {/* File Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Upload FIT File</label>
            <div className="relative">
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 inline-flex items-center"
              >
                {file ? file.name : "Choose File"}
              </label>
            </div>
              {/* ➕ Sample file button */}
        <button
          type="button"
          onClick={handleSampleFileChange}
          className="cursor-pointer mt-4 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition duration-300 inline-flex items-center"
          >
          Use Sample Crit Race File
        </button>
          </div>

          {/* Input Fields */}
          <InputFields
            bigChainring={bigChainring}
            setBigChainring={setBigChainring}
            smallChainring={smallChainring}
            setSmallChainring={setSmallChainring}
            cassette={cassette}
            setCassette={setCassette}
            minPower={minPower}
            setMinPower={setMinPower}
            minCadence={minCadence}
            setMinCadence={setMinCadence}
            oneBySetup={oneBySetup}
            setOneBySetup={setOneBySetup}
            cassetteOptions={cassetteOptions}/>
          <div className="flex justify-center mt-4">
          <button
            onClick={handleUpload}
            className="p-2 bg-blue-600  text-white rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex justify-center items-center"
            disabled={loading}
          >
            
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Upload & Analyze"
            )}
          </button>
          </div>
        </div> 

          {/* Zone Summary  */}
          <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
          {/* <button
     //   onClick={toggleColors}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {colorsRemoved ? "Restore Color Logic" : "Remove Color Logic"} 
      </button> */}

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Gear Usage Summary</h2>
          {gearAnalysis.length > 0 ? (
            <GearUsageTable
              gearData={gearAnalysis}
              cassetteTeeth={CassetteData[cassette]} // make sure CassetteData is imported
              isOneBySetup={oneBySetup}
            />
          ) : (
            <p className="text-gray-500 text-center">
              Your gear usage summary will appear here after analysis.
            </p>
          )}
           {(zoneSummary) ? (
            <div className="mt-6 mx-auto max-w-md p-4 bg-gray-100 rounded">
              <h3 className="text-xl font-bold mb-2 text-center text-gray-700">Zone Summary</h3>
              <div className="space-y-1 text-gray-700">
                <p>
                  🔴 Red Zone: {zoneSummary.red_zone.time} ({zoneSummary.red_zone.percentage})
                </p>
                <p>
                  🟠 Orange Zone: {zoneSummary.orange_zone.time} ({zoneSummary.orange_zone.percentage})
                </p>
                <p>
                  🟢 Green Zone: {zoneSummary.green_zone.time} ({zoneSummary.green_zone.percentage})
                </p>
                <p>
                  TOTAL TIME: {zoneSummary.total.time}
                </p>
              </div>
            </div>
          ) : (
              <p className="text-gray-500 text-center">
              </p>
            )}
          
        </div>

        {/* Gear Usage Summary (Text-Based) */}
        {/* <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Gear Usage Summary</h2>
          {formattedOutput.length > 0 ? (
            <div className="space-y-2">
              {formattedOutput.map((line, index) => (
                <p key={index} className="text-gray-700 whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Your gear usage summary will appear here after analysis.
            </p>
          )}
        </div> */}    
        <Explanation/>
      </div>
      <SpeedInsights />
    </main>
  );
}
