import React, { FC } from "react";
export const Footer: FC = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <hr style={{ color: "black" }} />
        <div className="container footer-links">
          <ul className="flex">
            <li>
              <a
                href="https://github.com/ajithav789"
                target={"_blank"}
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ajith-a-v-41114a176/"
                target={"_blank"}
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ajith__78/"
                target={"_blank"}
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li
              onClick={() => {
                window.prompt(
                  "Copy to clipboard: Ctrl+C, Enter",
                  "ajithav021@gmail.com"
                );
              }}
            >
              E-mail
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
