# Presentation styles

`../../presentation-bookends.css` imports these files in cascade order:

- `illustrations.css`: slide-specific SVG illustrations, annotations, and their
  reduced-motion rules.
- `transitions.css`: slide stage and native view-transition animations.
- `bookends.css`: opening and closing screens, QR card, responsive rules, and
  motion preferences.

Keep each illustration's selectors and motion alternatives together. Place new
rules with the interface they style and preserve import order when moving a rule
that shares a selector with another file.
