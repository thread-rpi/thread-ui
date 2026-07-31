import { Icon } from "@iconify/react";
import { footerLinks } from "../routes/routePaths";

export default function MobileFooter() {
  return (
    <footer id="mobile-footer-container" className="z-20 w-full bg-gradient-to-b from-transparent from-0% to-white to-20% px-6 pt-16 pb-9 sm:pb-8">
      <div className="mx-auto flex w-full max-w-screen-sm items-center justify-between gap-4 text-thread-red">
        <span className="text-xs sm:text-lg font-bold whitespace-nowrap">
          &copy; The Thread {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-5">
          {footerLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[26px] sm:text-3xl"
            >
              {/* {item.label} */}
              <Icon icon={item.icon} inline={true} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
