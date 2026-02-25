import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({ tasks, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  const extendedTasks = [
    tasks[tasks.length - 1], 
    ...tasks, 
    tasks[0]
  ];

  const handleNext = () => {
    if (currentIndex >= extendedTasks.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (currentIndex === extendedTasks.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500); 
    }
    if (currentIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedTasks.length - 2);
      }, 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, extendedTasks.length]);

  if (tasks.length === 0) return <div className="empty">No tasks found.</div>;

  return (
    <div className="carousel-viewport">
      <div 
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
      >
        {extendedTasks.map((task, idx) => (
          <div className="carousel-item" key={`${task.id}-${idx}`}>
            {renderItem(task)}
          </div>
        ))}
      </div>
      <button className="nav-btn prev" onClick={handlePrev} style={{position:'absolute', left: 0, top: '50%'}}>‹</button>
      <button className="nav-btn next" onClick={handleNext} style={{position:'absolute', right: 0, top: '50%'}}>›</button>
    </div>
  );
};

export default Carousel;