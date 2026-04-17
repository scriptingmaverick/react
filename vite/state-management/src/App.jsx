import { useState } from "react";
import "./App.css";

const Slide = ({ data }) => <p id="slide">{data}</p>;

const SlideShow = ({ slides }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((slide + 1) % slides.length);
  const prevSlide = () => setSlide(Math.max(slide - 1, 0));

  return (
    <div id="slide-show">
      <button onClick={prevSlide}>Previous Slide</button>
      <Slide data={slides[slide]} />
      <button onClick={nextSlide}>
        Next Slide
      </button>
    </div>
  );
};

const App = () => {
  const slides = Array.from({ length: 10 }, (_, i) => `slide-${i + 1}`);
  return <SlideShow slides={slides} />;
};

export default App;
