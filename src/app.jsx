import React, { useEffect, useState } from "react";

function App() {
    useEffect(async() => {
        const res = await fetch('https://localhost:3000')
        console.log(res.json())
    }, [])
    return (
        <>
        </>
    )
}

function ActivityForm() {

  const [category, setCategory] = useState("");
  const [nature, setNature] = useState("");
  const [winner, setWinner] = useState(""); // Only for MOOC
  const [level, setLevel] = useState("");

  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    venue: "",
    startDate: "",
    endDate: "",
    file: null,
  });

  // Category checks
  const isMOOC = category === "MOOC Course of SWAYAM/NPTEL";
  const isCoursera = category === "Coursera";
  const isSchool = category === "School";
  const isIndustry = category === "Industry Certification";

  const showFormFields =
    (isMOOC && nature && winner && level) ||
    ((isCoursera || isSchool || isIndustry) && nature && level);

  const levelOptions =
    isSchool || isIndustry
      ? ["University", "State", "National", "International"]
      : ["University Level (20 Points)"];

  const natureOptions = [
    "Course Completion",
    "Participation",
    "Certification",
    "Winner",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      category,
      nature,
      level,
      ...(isMOOC && { winner }),
      ...formData,
    };
    console.log("Submitted data:", finalData);
    alert("Form submitted successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h3>Activity Submission</h3>

      {/* Category */}
      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setNature("");
          setWinner("");
          setLevel("");
        }}
      >
        <option value="">-- Select Category --</option>
        <option value="MOOC Course of SWAYAM/NPTEL">MOOC Course of SWAYAM/NPTEL</option>
        <option value="Coursera">Coursera</option>
        <option value="School">School</option>
        <option value="Industry Certification">Industry Certification</option>
      </select>

      {/* Nature Dropdown */}
      {category && (
        <>
          <br />
          <label>Nature:</label>
          <select
            value={nature}
            onChange={(e) => {
              setNature(e.target.value);
              setLevel("");
              setWinner("");
            }}
          >
            <option value="">-- Select Nature --</option>
            {natureOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </>
      )}

      {/* Winner (Only for MOOC) */}
      {isMOOC && nature && (
        <>
          <br />
          <label>Winner:</label>
          <select value={winner} onChange={(e) => setWinner(e.target.value)}>
            <option value="">-- Select Winner --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </>
      )}

      {/* Level (All categories) */}
      {nature && (isMOOC ? winner : true) && (
        <>
          <br />
          <label>Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">-- Select Level --</option>
            {levelOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Event Form Fields */}
      {showFormFields && (
        <>
          <br />
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
          />

          <br />
          <label>Organizer:</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
          />

          <br />
          <label>Venue:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
          />

          <br />
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />

          <br />
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />

          <br />
          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} />

          <br /><br />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default ActivityForm;
