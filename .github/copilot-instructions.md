# Project Guidelines

## Publishing website changes

Do not automatically commit or push website changes. Only commit or push when the user explicitly requests it. Never force-push.

## Accessibility requirements

Treat WCAG 2.2 Level AA as an ongoing acceptance criterion for every website change. Preserve accessible behavior on existing surfaces touched by a change; do not claim site-wide conformance without a complete audit.

- Use semantic HTML first. Give every form control a persistent visible label, every icon-only control an accessible name, and every informative image useful alternative text.
- Ensure all functionality works with a keyboard, with a visible focus indicator, logical focus order, no keyboard traps, and focus returned appropriately after dialogs. Provide a keyboard alternative to drag-and-drop.
- Implement dialogs with an accessible name, modal semantics, Escape/close behavior, focus management, and announced validation errors. Use live regions for asynchronous status messages.
- Meet WCAG 2.2 AA contrast requirements for text and meaningful controls in both themes. Do not convey state by color alone.
- Support reflow at 320 CSS pixels and text zoom to 200% without loss of content or functionality. Keep interactive targets at least 24 by 24 CSS pixels unless a WCAG exception applies.
- Respect reduced-motion preferences and avoid flashing content. Use appropriate headings, landmarks, table/grid semantics, and ARIA only when native HTML is insufficient.
- Validate changed interactions with keyboard-only use and a screen reader where available; run automated accessibility checks when available, and manually verify contrast, reflow, focus, labels, and error/status announcements. Automated scans alone do not establish conformance.
