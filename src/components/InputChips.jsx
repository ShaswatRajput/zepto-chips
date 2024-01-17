import React, { useState } from "react";
import "./InputChips.css";

const InputChips = () => {
  const [tag, setTag] = useState("");
  const [highlightedTag, setHighlightedTag] = useState(null);
  const [peopleList, setPeopleList] = useState([
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      fullName: "Alex Johnson",
      email: "alex.johnson@example.com",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      fullName: "Emma Davis",
      email: "emma.davis@example.com",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      fullName: "Michael Brown",
      email: "michael.brown@example.com",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      fullName: "Olivia White",
      email: "olivia.white@example.com",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      fullName: "William Lee",
      email: "william.lee@example.com",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      fullName: "Sophia Taylor",
      email: "sophia.taylor@example.com",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  ]);
  const [peopleMatched, setPeopleMatched] = useState([]);
  const [tagList, setTagList] = useState([]);
  const handleSuggestionClick = (selectedItem) => {
    setTagList((tags) => [...tags, selectedItem.fullName]);
    setTag("");
    setPeopleMatched([]);
  };

  const handleChange = (ele) => {
    const { value } = ele.target;
    setTag(value);

    if (value.trim() === "") {
      setPeopleMatched(peopleList);
    } else {
      let matches = peopleList.filter((people) => {
        const regex = new RegExp(`${value}`, "gi");
        return (
          (people.fullName.match(regex) || people.email.match(regex)) &&
          !tagList.includes(people.fullName)
        );
      });
      setPeopleMatched(matches.slice(0, 5));
    }
    setHighlightedTag(null);
  };
  const handleKeyDown = (e) => {
    const { key } = e;

    const newTag = tag.trim();
    if (
      (key === "," || key === "Enter" || key === "Tab") &&
      newTag.length &&
      !tagList.includes(newTag)
    ) {
      e.preventDefault();
      setTagList((tags) => [...tags, newTag]);
      setTag("");
      setHighlightedTag(null);
    } else if (key === "Backspace") {
      if (highlightedTag !== null) {
        removeTag(highlightedTag);
        setHighlightedTag(null);
      } else if (tagList.length && !newTag.length) {
        setHighlightedTag(tagList.length - 1);
      }
    }
  };
  const handleFocus = () => {
    setPeopleMatched(peopleList);
  };
  const removeTag = (index) =>
    setTagList((prevTag) => prevTag.filter((tag, i) => i !== index));
  return (
    <div className="main-container">
      <div className="tags-inputbox">
        {tagList.map((tag, index) => (
          <div key={index} className="tag-item color-default">
            <span className="title">{tag}</span>
            <button className="remove-btn" onClick={() => removeTag(index)}>
              &times;
            </button>
          </div>
        ))}
        <input
          className="tag-input"
          value={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
      </div>
      {peopleMatched &&
        peopleMatched.map((item, index) => (
          <div key={index}>
            <div
              className="suggestionList"
              onClick={() => handleSuggestionClick(item)}
            >
              <span className="image">
                <img src={item.image}></img>
              </span>
              <span className="fullname">{item.fullName}</span>
              <span className="email">{item.email}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InputChips;
