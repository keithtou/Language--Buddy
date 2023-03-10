import React, { useState } from "react";
import StudentCard from "../studentCard/studentCard";
import "../studentCard/studentCard.css";
import "./SearchFilter.css"

const languages = ["English", "Spanish", "German", "French", "Japanese"];
const levels = ["Beginner", "Intermediate", "Advanced", "Native"];

function SearchFilter(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  console.log(props.students);

  const handleNameInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleLanguageInputChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleLevelInputChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredList = props.students.filter((item) => {
    const countryMatch = item.nationality
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const languageMatch =
      selectedLanguage === "" || selectedLanguage === item.language_name;

    const levelMatch = selectedLevel === "" || selectedLevel === item.levels;

    return countryMatch && languageMatch && levelMatch;
  });

  return (
    <div>
      <input
        type="text"
        onChange={handleNameInputChange}
        value={searchKeyword}
        placeholder="Search by Country"
        className="input"
      />
      <select onChange={handleLanguageInputChange} value={selectedLanguage} className="select-tag">
        <option value="">All Languages</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      <select onChange={handleLevelInputChange} value={selectedLevel} className="select-tag">
        <option value="">All Levels</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <div className="card-container">
        {filteredList.map((students) => {
          return <StudentCard students={students} key={Math.random()} />;
        })}
      </div>
    </div>
  );
}

export default SearchFilter;
