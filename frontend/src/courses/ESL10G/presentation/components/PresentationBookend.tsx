import { PRESENTATION_QR_URL } from "../../../../features/analytics/useQrVisit";
import { presentationImageUrl } from "../config";

interface PresentationBookendProps {
  readonly isOpening: boolean;
  readonly showSubtitles: boolean;
}

export function PresentationBookend({
  isOpening,
  showSubtitles,
}: PresentationBookendProps) {
  return (
    <div
      className={`bookend ${isOpening ? "bookend--opening" : "bookend--closing"}`}
    >
      <div className="bookend__glow" aria-hidden="true" />
      <div className="bookend__eyebrow">
        ESL 10G <span>✳</span> Sergei’s story
      </div>
      {isOpening ? (
        <>
          <div className="bookend__copy">
            <span className="bookend__hello">Hello, everyone! 👋</span>
            <h2 aria-label="A little about myself">
              A little
              <br />
              <em>about myself.</em>
            </h2>
            {showSubtitles && (
              <p>
                From Belarus to California — and what I learned along the way.
              </p>
            )}
          </div>
          <div
            className="bookend__photos bookend__photos--opening"
            aria-hidden="true"
          >
            <img
              src="/course-materials/esl10g/presentation/belarus.png"
              alt=""
            />
            <img src={presentationImageUrl("brooklyn")} alt="" />
            <img
              src="/course-materials/esl10g/presentation/los-angeles.png"
              alt=""
            />
          </div>
          <div className="bookend__footer">
            Belarus <span>→</span> New York <span>→</span> California
          </div>
        </>
      ) : (
        <>
          <div className="bookend__copy">
            <span className="bookend__hello">
              The best part of the journey ✨
            </span>
            <h2 aria-label="We learn together">
              We learn
              <br />
              <em>together.</em>
            </h2>
            {showSubtitles && (
              <p>Different journeys. One classroom. Thank you for listening!</p>
            )}
          </div>
          <div
            className="bookend__photos bookend__photos--closing"
            aria-hidden="true"
          >
            <img
              src="/course-materials/esl10g/presentation/hiking.png"
              alt=""
            />
            <img
              src="/course-materials/esl10g/presentation/classroom.png"
              alt=""
            />
            <img
              src="/course-materials/esl10g/presentation/learning-together-personalized.png"
              alt=""
            />
          </div>
          <a
            className="bookend__qr"
            href={PRESENTATION_QR_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open this presentation on your phone at webdev-coursework.com"
          >
            <span className="bookend__qr-wave" aria-hidden="true" />
            <span
              className="bookend__qr-arrow bookend__qr-arrow--top"
              aria-hidden="true"
            >
              ↘
            </span>
            <span
              className="bookend__qr-arrow bookend__qr-arrow--bottom"
              aria-hidden="true"
            >
              ↗
            </span>
            <span className="bookend__qr-card">
              <span className="bookend__qr-title">Let’s stay in touch!</span>
              <img
                src="/course-materials/esl10g/presentation/presentation-qr.svg"
                alt="QR code for this presentation"
                width="220"
                height="220"
              />
              <span className="bookend__qr-caption">
                Scan to view • My presentation
              </span>
            </span>
          </a>
          <div className="bookend__footer">
            Any questions? <span>✳</span> Let’s talk!
          </div>
        </>
      )}
    </div>
  );
}
