export function TeacherAnnotation() {
  return (
    <svg
      className="esl10g-teacher-annotation"
      viewBox="0 0 1672 935"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="One of my first ESL teachers is highlighted in the class photo"
    >
      <g transform="rotate(-4 277 84)">
        <rect
          x="42"
          y="20"
          width="470"
          height="132"
          rx="25"
          fill="#fff2bd"
          stroke="#19314c"
          strokeWidth="5"
        />
        <text x="83" y="74" className="esl10g-teacher-annotation__eyebrow">
          ONE OF MY FIRST
        </text>
        <text x="83" y="126" className="esl10g-teacher-annotation__label">
          ESL teachers!
        </text>
      </g>
      <path
        d="M 478 135 C 504 144 511 158 500 177"
        className="esl10g-teacher-annotation__arrow"
      />
      <path
        d="M 484 165 L 500 177 L 514 164"
        className="esl10g-teacher-annotation__arrow"
      />
      <ellipse
        cx="574"
        cy="188"
        rx="89"
        ry="104"
        transform="rotate(-8 574 188)"
        className="esl10g-teacher-annotation__ring"
      />
      <path
        d="M 671 67 L 678 81 L 692 88 L 678 95 L 671 109 L 664 95 L 650 88 L 664 81 Z"
        className="esl10g-teacher-annotation__sparkle"
      />
    </svg>
  );
}

export function MatthewAnnotation() {
  return (
    <svg
      className="esl10g-matthew-annotation"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Matthew, my current ESL teacher, is speaking to the class"
    >
      <ellipse
        cx="948"
        cy="488"
        rx="169"
        ry="190"
        className="esl10g-matthew-annotation__halo"
      />
      <g className="esl10g-matthew-annotation__rays">
        <path d="M 946 275 L 945 238" />
        <path d="M 816 326 L 788 294" />
        <path d="M 759 445 L 719 436" />
        <path d="M 1085 324 L 1119 291" />
        <path d="M 1139 426 L 1180 414" />
        <path d="M 802 648 L 771 677" />
      </g>
      <g className="esl10g-matthew-annotation__speech-lines">
        <path d="M 1055 452 Q 1095 471 1055 492" />
        <path d="M 1080 438 Q 1142 471 1080 507" />
      </g>
      <path
        d="M 1115 31 H 1575 Q 1600 31 1600 56 V 152 Q 1600 176 1575 176 H 1221 L 1154 218 L 1174 176 H 1115 Q 1090 176 1090 152 V 56 Q 1090 31 1115 31 Z"
        className="esl10g-matthew-annotation__bubble"
      />
      <text x="1130" y="94" className="esl10g-matthew-annotation__name">
        Meet Matthew!
      </text>
      <text x="1130" y="144" className="esl10g-matthew-annotation__caption">
        MY CURRENT ESL TEACHER
      </text>
      <path
        d="M 730 245 L 738 263 L 756 271 L 738 279 L 730 297 L 722 279 L 704 271 L 722 263 Z"
        className="esl10g-matthew-annotation__sparkle"
      />
    </svg>
  );
}

const ROUTE_66_JOURNEY_PATH =
  "M 390 255 C 470 175 545 350 650 265 C 755 180 865 160 950 235 S 1080 355 1170 290";

function Route66Car({ animated }: { animated: boolean }) {
  return (
    <g
      className={
        animated ? "esl10g-route66__car" : "esl10g-route66__car-static"
      }
      {...(!animated && { transform: "translate(1170 290) rotate(-28)" })}
    >
      {animated && (
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          rotate="auto"
          path={ROUTE_66_JOURNEY_PATH}
        />
      )}
      <path
        d="M -38 5 L -29 -10 Q -26 -16 -18 -16 H 12 Q 20 -16 25 -9 L 34 4 Q 40 5 40 12 V 18 H -40 V 11 Q -40 7 -38 5 Z"
        className="esl10g-route66__car-body"
      />
      <path
        d="M -21 -10 H 11 Q 16 -10 19 -5 L 24 3 H -29 Z"
        className="esl10g-route66__car-window"
      />
      <circle cx="-23" cy="18" r="9" className="esl10g-route66__wheel" />
      <circle cx="23" cy="18" r="9" className="esl10g-route66__wheel" />
      <circle cx="-23" cy="18" r="3" className="esl10g-route66__hubcap" />
      <circle cx="23" cy="18" r="3" className="esl10g-route66__hubcap" />
    </g>
  );
}

export function Route66Journey() {
  return (
    <svg
      className="esl10g-route66"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A car travels from New York through Oklahoma City, then along Route 66 to Los Angeles"
    >
      <path d={ROUTE_66_JOURNEY_PATH} className="esl10g-route66__road-edge" />
      <path d={ROUTE_66_JOURNEY_PATH} className="esl10g-route66__road" />
      <path d={ROUTE_66_JOURNEY_PATH} className="esl10g-route66__center-line" />
      <g className="esl10g-route66__city esl10g-route66__city--start">
        <rect x="321" y="174" width="184" height="54" rx="16" />
        <text x="413" y="210" textAnchor="middle">
          NEW YORK
        </text>
      </g>
      <g className="esl10g-route66__city esl10g-route66__city--via">
        <rect x="534" y="335" width="244" height="49" rx="15" />
        <text x="656" y="368" textAnchor="middle">
          OKLAHOMA CITY
        </text>
      </g>
      <g className="esl10g-route66__shield" transform="translate(815 287)">
        <path d="M -59 -31 H 59 V 14 Q 57 42 0 66 Q -57 42 -59 14 Z" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          className="esl10g-route66__shield-top"
        >
          ROUTE
        </text>
        <text
          x="0"
          y="47"
          textAnchor="middle"
          className="esl10g-route66__shield-number"
        >
          66
        </text>
      </g>
      <g className="esl10g-route66__city esl10g-route66__city--end">
        <rect x="1070" y="349" width="221" height="54" rx="16" />
        <text x="1180" y="385" textAnchor="middle">
          LOS ANGELES
        </text>
      </g>
      <Route66Car animated />
      <Route66Car animated={false} />
    </svg>
  );
}

const BELARUS_FLIGHT_PATH =
  "M 948 275 C 820 85 650 65 540 110 S 240 235 -80 70";

function FlightPath() {
  return (
    <>
      <path d={BELARUS_FLIGHT_PATH} className="esl10g-flight__path-shadow" />
      <path d={BELARUS_FLIGHT_PATH} className="esl10g-flight__path" />
    </>
  );
}

function FlightPlane({ animated }: { animated: boolean }) {
  return (
    <g
      className={
        animated ? "esl10g-flight__plane" : "esl10g-flight__plane-static"
      }
      {...(!animated && { transform: "translate(92 130) rotate(190)" })}
    >
      {animated && (
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          rotate="auto"
          path={BELARUS_FLIGHT_PATH}
        />
      )}
      <path
        d="M 44 0 L 10 -7 L -12 -38 L -25 -40 L -9 -6 L -35 -5 L -46 -17 L -53 -17 L -48 0 L -53 17 L -46 17 L -35 5 L -9 6 L -25 40 L -12 38 L 10 7 Z"
        className="esl10g-flight__plane-body"
      />
      <path d="M 12 -5 L 30 0 L 12 5" className="esl10g-flight__plane-detail" />
    </g>
  );
}

export function BelarusFlight() {
  return (
    <svg
      className="esl10g-flight"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An airplane flies from Belarus toward New York, leaving a dotted flight path"
    >
      <defs>
        <mask
          id="esl10g-flight-reveal"
          maskUnits="userSpaceOnUse"
          x="-110"
          y="0"
          width="1100"
          height="400"
        >
          <path
            d={BELARUS_FLIGHT_PATH}
            fill="none"
            stroke="white"
            strokeWidth="20"
            pathLength="100"
            strokeDasharray="100 100"
            strokeDashoffset="100"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="100;0"
              dur="7s"
              repeatCount="indefinite"
            />
          </path>
        </mask>
      </defs>
      <g className="esl10g-flight__trail" mask="url(#esl10g-flight-reveal)">
        <FlightPath />
      </g>
      <g className="esl10g-flight__trail-static">
        <FlightPath />
      </g>
      <g className="esl10g-flight__destination">
        <rect x="34" y="33" width="259" height="62" rx="18" />
        <text x="164" y="75" textAnchor="middle">
          ← NEW YORK
        </text>
      </g>
      <FlightPlane animated />
      <FlightPlane animated={false} />
    </svg>
  );
}

const HIKING_TRAIL_PATH =
  "M 600 708 C 655 683 686 648 730 625 S 811 583 856 560 S 923 520 951 506";

function HikingFigure({ animated }: { animated: boolean }) {
  return (
    <g
      className={animated ? "esl10g-hike__hiker" : "esl10g-hike__hiker-static"}
      {...(!animated && { transform: "translate(951 506)" })}
    >
      {animated && (
        <animateMotion
          dur="9s"
          repeatCount="indefinite"
          rotate="0"
          path={HIKING_TRAIL_PATH}
        />
      )}
      <rect
        x="-22"
        y="-32"
        width="17"
        height="26"
        rx="6"
        className="esl10g-hike__pack"
      />
      <circle cx="0" cy="-43" r="10" className="esl10g-hike__head" />
      <path
        d="M 0 -32 L 3 -15 M -2 -28 L -20 -16 M 2 -27 L 20 -17 M 3 -15 L -13 2 M 3 -15 L 17 2"
        className="esl10g-hike__limbs"
      />
      <path d="M 21 -19 L 25 7" className="esl10g-hike__pole" />
    </g>
  );
}

export function HikingJourney() {
  return (
    <svg
      className="esl10g-hike"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A little hiker climbs a winding trail toward a summit flag"
    >
      <path d={HIKING_TRAIL_PATH} className="esl10g-hike__trail-shadow" />
      <path d={HIKING_TRAIL_PATH} className="esl10g-hike__trail" />
      <g className="esl10g-hike__flag">
        <path d="M 948 516 V 438" />
        <path d="M 948 442 L 873 460 L 948 478 Z" />
      </g>
      <g className="esl10g-hike__summit">
        <rect x="694" y="365" width="250" height="65" rx="19" />
        <text x="819" y="408" textAnchor="middle">
          SUMMIT! ✦
        </text>
      </g>
      <path
        d="M 664 452 L 671 468 L 687 475 L 671 482 L 664 498 L 657 482 L 641 475 L 657 468 Z"
        className="esl10g-hike__sparkle"
      />
      <HikingFigure animated />
      <HikingFigure animated={false} />
    </svg>
  );
}
