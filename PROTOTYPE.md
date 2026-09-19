# Display design study

Throwaway visual study for [Which large-screen composition makes prayer and daylight easiest to read?](https://github.com/Today20092/OpenMasjidDisplay/issues/7). No production application exists yet. This is the second review iteration, following the user's preference for A and B and B's solar-chart placement.

Run `npm run preview`, then open http://127.0.0.1:4178/?variant=A . No packages need installing. Alternatively open `prototype.html` directly. Use A or B in the variant parameter, or the floating arrow controls.

- A, Horizon: B's larger solar-led composition in the dark palette.
- B, Daylight: the same refined composition in a light palette.

The initial three structurally different compositions, including C, are preserved at commit `f72fd9e26b24a8555ee83eab172735b5e84383c3`. The user rejected C's oversized prayer-name focus. These two refinements intentionally compare dark/light treatments within the preferred composition.

The analog countdown uses a 12-hour clock: hands show sample current time, the shaded clockwise interval runs to the target dot, and text retains the exact remaining duration. The event switches to iqamah in the dawn sample when enabled. This is a design proposal, not yet selected. Built-in checks cover the 24-minute, 13-minute, 446-minute and overnight 498-minute intervals.

Controls preview dawn/afternoon/night, rain/clear/snow/unavailable weather, long notice, optional iqamah and optional motion. Motion starts off and respects reduced-motion preferences. TV view hides study controls; Escape restores them. URL parameters preserve the preview state.

All dates, prayer times, solar coordinates, lunar values and weather are illustrative. Solar geometry is schematic, not a tested projection. Moon reminder copy is a placement example, not validated religious-calendar behavior. No network data, persistence, actual calculations, time synchronization or settings editor is implemented. Friday-service layout remains a separate prototype refinement.

Append `&check=1` to run the small built-in behavior checks, or run `runChecks()` in the browser console. The study has no production build and must stay on its prototype branch; its controls are not production UI.

The user must judge layout and viewing-distance readability before the visual decision resolves. Do not promote this code directly into production.

## Second-review verification

Built-in checks pass for both refined variants and all three scenes, including the four analog intervals. Inspected the short afternoon wedge and the overnight wedge. At a 1920x1080 CSS viewport, both variants retain all five prayer entries with iqamah disabled, a long notice and unavailable weather; measured hero/schedule/context/notice bounds do not overlap. Physical TV viewing-distance readability still needs human review.

## Initial-review verification

Inspected all three rendered compositions, including night, dawn, a long notice and unavailable weather. Built-in checks pass for all three variants and all three scenes; the dawn fixture advances to Dhuhr when iqamah is disabled. Verified mouse/arrow-key switching updates the URL.

Checked a 1920x1080 CSS viewport and a larger effective 3151x2160 viewport, plus the narrower default preview. All five schedule rows remain present; measured schedule/context/notice bounds do not overlap in the tested layouts. The requested larger viewport was constrained by browser scaling, so a true 3840x2160 check is not claimed. Measured night-palette primary text contrast is at least 10.5:1 and secondary text at least 5.0:1 against the base background. Those measurements do not certify gradient/motion overlays or physical viewing-distance legibility.

Fixed a dawn-label overlap and removed scene-inappropriate weather wording. No actual TV, across-room viewing, screen-reader session or complete 200% zoom audit has been performed. Friday services and the final Hijri reminder policy are not simulated yet. Review the overall composition first, then refine those states in the selected direction.
