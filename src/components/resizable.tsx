import { ReactComponentElement } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: ReactComponentElement<any>;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.7);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.8],
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
