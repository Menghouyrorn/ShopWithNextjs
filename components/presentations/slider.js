import { useEffect, useState } from "react";
const images = [
  "https://previews.123rf.com/images/mikalaimanyshau/mikalaimanyshau1703/mikalaimanyshau170300130/73802267-computer-shop-various-computer-parts-are-on-the-table-web-flat-vector-banner-.jpg",
  "https://arpad.al/wp-content/uploads/2017/07/4.-INNOVATION-TRANSFER-OF-TECHNOLOGY.jpg",
  "https://bsmedia.business-standard.com/_media/bs/img/article/2021-01/14/full/1610640588-3918.jpg",
];
export default function App() {
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };
  const prev = () => {
    setIndex((i) => (i - 1) % images.length);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="App">
      <img src={images[index]} alt="" width="100%" height="500" />
    </div>
  );
}