import { footerLinks } from "../routes/routePaths";
import { useViewport } from "../contexts/useViewport";

export default function Footer() {
  const { width } = useViewport();
  const multiplier = 1.05;
  const viewportWidth = width || 1440;
  const footerWidth = viewportWidth * multiplier;
  const footerHeight = (footerWidth * 180) / 1440;

  return (
    <footer className="z-10 w-full h-max flex items-start justify-center overflow-hidden pt-3 pb-5">
        <svg className="shrink-0 max-w-none" xmlns="http://www.w3.org/2000/svg" width={footerWidth} height={footerHeight} viewBox="0 0 1440 173" preserveAspectRatio="xMidYMid meet" fill="none">
          <g filter="url(#filter0_d_2551_474)">
            <path id="footer-thread" d="M-33.5156 149.233C10.2386 77.7406 125.806 51.7324 252.984 54.7369C360.484 57.2764 430.556 90.8502 524.984 122.237C702.484 181.235 898.484 29.735 1043.98 36.7351C1183.48 36.7351 1393.14 176.075 1462.98 107.234" stroke="#AF1E2D" stroke-width="60"/>
            <text
              className="select-none"
              style={{
                fontSize: "14px",
                fill: "#FFFFFF",
                fontWeight: 650,
                dominantBaseline: "middle",
              }}
            >
              {/* text path */}
              <textPath
                  key="copyright"
                  href="#footer-thread"
                  startOffset="15%"
                  className="text-lg text-white font-bold"
                >
                  &copy; The Thread {new Date().getFullYear()}
              </textPath>
              {footerLinks.map((item) => (
                <textPath
                  key={item.label}
                  href="#footer-thread"
                  startOffset={item.offset}
                  onClick={() => window.open(item.href, '_blank')}
                  className="cursor-pointer text-white uppercase hover:opacity-60 transition-opacity duration-200 ease-in-out" 
                >
                  {/* <Icon inline={true} icon={item.icon}/> */}
                  {item.label}
                </textPath>
              ))}
            </text>
          </g>
        </svg>
    </footer>
  );
}
