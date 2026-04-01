import React, { useState } from "react";
import "./Video.css";

const topics = [
  { name: "C Programming", url: "https://www.youtube.com/watch?v=irqbmMNs2Bo&t=652s" },
  { name: "Java", url: "https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop" },
  { name: "DBMS", url: "https://www.youtube.com/watch?v=YRnjGeQbsHQ" },
  { name: "React JS", url: "https://www.youtube.com/watch?v=RGKi6LSPDLU&t=5419s" },
  { name: "Node.js", url: "https://www.youtube.com/watch?v=BLl32FvcdVM" },
  { name: "HTML", url: "https://www.youtube.com/watch?v=HcOc7P5BMi4&t=850s" },
  { name: "CSS", url: "https://www.youtube.com/watch?v=ESnrn1kAD4E" },
  { name: "Javascript", url: "https://www.youtube.com/watch?v=VlPiVmYuoqw" },
  { name: "Backend", url: "https://www.youtube.com/watch?v=7fjOw8ApZ1I&t=34305s" },
  { name: "SQL", url: "https://www.youtube.com/watch?v=hlGoQC332VM&t=9601s" },
  { name: "Git/Github", url: "https://www.youtube.com/watch?v=Ez8F0nW6S-w" },
  { name: "Python", url: "https://www.youtube.com/watch?v=ERCMXc8x7mc&t=35958s" },
  { name: "C++", url: "https://www.youtube.com/watch?v=Z2oxGj36vZk&t=32540s" },
  { name: "OOPs", url: "https://www.youtube.com/watch?v=bSrm9RXwBaI&t=1619s" },
];

function Video() {
  const [search, setSearch] = useState("");

  // Filter topics based on search
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="video-section container">
      {/* Search Box */}
      {/* Title */}
      <h2 className="video-title">
        Coding Video Tutorials 🎥
      </h2>

      <div className="search-wrapper">
        <input
          type="text"
          className="form-control form-control-lg custom-search"
          placeholder="Search by topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      

      {/* Grid */}
      <div className="video-grid">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <div key={index} className="video-card">

              {/* Topic Name */}
              <h4 className="video-topic">💻 {topic.name}</h4>

              {/* Text */}
              <p className="video-text">
                Watch complete tutorials and boost your skills in{" "}
                <b>{topic.name}</b>.
              </p>

              {/* Button */}
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-btn"
              >
                Watch Now ▶
              </a>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">
            No topics found 
          </p>
        )}
      </div>
    </div>
  );
}

export default Video;