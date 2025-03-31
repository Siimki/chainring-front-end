function Instructions() {

return(
<div className="mb-4 p-4 border rounded bg-gray-50">
<h2 className="text-xl font-semibold mb-2 text-gray-500">Input Instructions</h2>
<ul className="list-disc pl-5 text-gray-700 space-y-1x">
  <li>
    <strong>Upload .FIT file:</strong> Download it from your cycling computer software or Trainingpeaks, Strava platform. (Works from browser only). Downloaded file from Trainingpeaks needs to be unzipped.
  </li>
  <li>
    <strong>Big Chainring:</strong> Big chainring size.
  </li>
  <li>
    <strong>Small Chainring:</strong> Small chainring size.
  </li>
  <li>
    <strong>Cassette:</strong> Choose from the list.
  </li>
  <li>
    <strong>Min Power:</strong> If you want to have data only where power is higher than 100 watts, use 100 as value.
  </li>
  <li>
    <strong>Min Cadence:</strong> If you want to have data only where cadence is higher than 20 rpm, use 20 as value. 
  </li>
  <li>
    <strong>1 x setup:</strong> Add your chainring size to big chainring field.
  </li>
</ul>
</div>
)
}

export default Instructions;