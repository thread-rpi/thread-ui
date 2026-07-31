import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/header-logo.svg";
import { routes, headerRoutes } from "../routes/routePaths";

const MARK_COLOR_SCROLL_THRESHOLD_PX = 20;

export default function Header() {
  const navigate = useNavigate();
  const [isMarkColorBlack, setIsMarkColorBlack] = useState(false);

  useEffect(() => {
    const updateMarkColor = () => {
      setIsMarkColorBlack(window.scrollY >= MARK_COLOR_SCROLL_THRESHOLD_PX);
    };

    updateMarkColor();
    window.addEventListener("scroll", updateMarkColor, { passive: true });
    return () => window.removeEventListener("scroll", updateMarkColor);
  }, []);

  return (
    <header className="z-200 w-full h-[130px] fixed top-0 left-0 flex flex-row items-start justify-between overflow-hidden ">
      {/* logo */}
      <img 
        src={headerLogo} 
        alt="Thread logo" 
        className={`z-20 w-max h-auto object-contain object-center px-5 py-4.5 cursor-pointer hover:opacity-70 transition duration-300 ease-in-out ${
          // wont work for event details page, blocking for now
          // isMarkColorBlack ? "brightness-0 mix-blend-exclusion" : "brightness-100 mix-blend-normal"
          "brightness-100 mix-blend-normal"
        }`}
        onClick={() => navigate(routes.root)}
      />

      {/* navbar */}
      <div className="w-max h-auto relative">
        {/* header thread svg */}
        <svg xmlns="http://www.w3.org/2000/svg" width="714" height="142" viewBox="0 0 714 142" fill="none">
          <g filter="url(#filter0_d_2551_474)">
            <path id="header-thread" d="M28.3721 -17.7407C108.872 117.259 461.701 36.9444 571.872 56.7593C682.043 76.5742 687.372 108.259 750.872 108.259" stroke="#AF1E2D" stroke-width="50"/>
            <text
              className="select-none"
              style={{
                fontSize: "14px",
                fill: "#FFFFFF",
                fontWeight: 650,
                dominantBaseline: "middle",
              }}
            >
              {/* text path for each route */}
              {headerRoutes.map((item) => (
                <textPath
                  key={item.label}
                  href="#header-thread"
                  startOffset={item.offset}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out"
                >
                  {item.label.toUpperCase()}
                </textPath>
              ))}
            </text>
          </g>
        </svg>
      </div>
    </header>
  );
}
