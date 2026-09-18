# Design approach research

Research for [Which design approach fits the display and its setup controls?](https://github.com/Today20092/OpenMasjidDisplay/issues/3), checked 18 September 2026. This report recommends a direction; it does not approve a stack or implement a display.

## Recommendation

Design the viewing screen as a custom composition with HTML, CSS and inline SVG. Start the setup screen with native labelled controls. If the application later selects React and needs richer setup interactions, use selected shadcn/ui components there. Do not combine all three toolkits or choose an application framework merely to obtain their default appearance.

The visual work belongs in the hierarchy, typography, spacing and sun visualization. A component catalogue cannot decide those for a room-sized display. This is a design judgment, not a measured comparison of finished products.

## Confirmed brief

The [Wayfinder map](https://github.com/Today20092/OpenMasjidDisplay/issues/1) records one computer first, with local setup, prayer times, next-prayer information, a location-based sun visualization, weather and a simple text notice. Remote editing and syncing are deferred. The user wants deliberate graphic design for monitors, banners and digital signage. A browser app remains a candidate.

## The three candidates

| Candidate | Verified facts | Fit for this project, as a recommendation |
| --- | --- | --- |
| Lumos at the supplied URL | An Astro component and styling framework. Its copied source includes design tokens, fluid sizing, utilities and components. The official introduction says MIT licensed and pre-1.0, with unsettled component APIs. The header identifies 0.0.3, while part of the introduction still refers to 0.0.1. [Official introduction](https://lumosframework.com/docs/), [repository](https://github.com/lumosframework/lumos-for-astro). | Consider only if Astro is independently selected. Its token and spacing principles are useful inspiration. The current URL is not a Webflow dependency; do not substitute a similarly named Webflow product. Avoid committing the app to this early framework just for styling. |
| shadcn/ui | Distributes editable component source. The documented React components use Tailwind styling; CSS variables provide shared theme roles. Component dependencies are installed separately from the copied source. [Introduction](https://ui.shadcn.com/docs), [manual installation](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/installation/manual.mdx), [component installation source](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/utils/add-components.ts). MIT licensed. [License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). | Best of these candidates for a React setup interface requiring menus, dialogs or complex selection. Own the resulting maintenance and test customized components. The viewing screen does not need dashboard cards, sidebars or a chart package. |
| daisyUI | CSS component classes, normally installed as a Tailwind plugin; also usable as standalone CSS. It is JavaScript-framework agnostic and MIT licensed. [Introduction](https://daisyui.com/docs/intro/), [license](https://github.com/saadeghi/daisyui/blob/master/LICENSE). Semantic theme variables support built-in and custom themes. [Theme documentation](https://daisyui.com/docs/themes/). | A reasonable alternative for a small setup form if Tailwind is already chosen and React is not. CSS classes do not supply the complete behavior of a complex interactive control. Avoid adding it beside shadcn merely for additional themes. |

Context7 supplied the shadcn findings through `/shadcn-ui/ui` and the daisyUI theme findings through `/websites/daisyui`; the linked official pages are their underlying sources. Resolving Lumos returned unrelated Webflow API documentation, so this report uses the exact requested website and its linked repository instead. No package was installed.

## Display composition

Propose two compositions using the same content: a landscape monitor view and a shallow banner view. In both, make the next prayer name and absolute time immediately readable, with the remaining interval secondary. Keep the full prayer schedule visible. Reserve a coherent area for the sun visualization, then give weather and the notice quieter supporting positions. Recompose a banner horizontally rather than shrinking the monitor layout.

Use a restrained day/night palette and consistent foreground/background roles. Keep numerals stable as time updates. Avoid putting important text over changing sky gradients. Give the notice a bounded space and an editor preview; reject text that cannot fit the chosen presentation rather than silently shrinking it below readability. These are proposed design constraints, awaiting visual exploration and user approval.

Inline SVG suits the sun path and markers because SVG scales without raster blur and integrates with CSS and the DOM. [MDN SVG documentation](https://developer.mozilla.org/en-US/docs/Web/SVG). Use ordinary HTML for the readable schedule and explanatory text. A SVG illustration needs no charting, canvas or 3D dependency. Calculating the sun's position is a separate domain decision: an attractive arc must not imply an accurate altitude calculation if it only represents progress through time. Define nighttime, polar-day/night and missing-data behavior before implementation.

## Accessibility and proposed visual checks

Toolkit accessibility claims do not certify the finished app. Labels, focus order, error messages, contrast, customization and real content remain our responsibility. Lumos describes semantic elements and reduced-motion behavior in its [introduction](https://lumosframework.com/docs/); shadcn describes accessible composable components in its [documentation](https://ui.shadcn.com/docs). Treat daisyUI as styling and retain native semantics and keyboard behavior.

- Review at 1920×1080 and 3840×2160, plus a provisional 1920×480 banner. Test actual browser viewport sizes and operating-system scaling. These are proposed targets, not proven device support.
- At the intended viewing distance on the user's monitor, ask someone to identify the next prayer and its time after a five-second glance. Confirm every schedule row and the notice remain readable. Set final type sizes after this check; resolution alone does not determine readability.
- Check long prayer/location names, 12/24-hour times, the maximum notice, empty notice, unavailable/stale weather, daylight, sunset and night. No clipping, overlapping labels or loss of prayer information.
- Measure text contrast in every palette and against the actual sky background. WCAG AA requires 4.5:1 for normal text and 3:1 for large text. Large means at least 18pt regular or 14pt bold. These minimums do not establish distance readability. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Prefer a still composition, no flashing, no ticker and no second-by-second animation. If moving or auto-updating content is introduced, assess pause/stop/hide requirements and provide an appropriate control; reduced-motion alone does not satisfy every requirement. [W3C motion and updating-content guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
- Test setup entirely by keyboard, visible focus, associated labels and useful validation. Check enlarged text and 200% zoom. Expose prayer information as text without depending on color or the sun graphic.

## Still unknown

The user has not approved typography, palette, exact banner dimensions, supported languages, solar geometry or a toolkit. No rendered prototype or actual monitor test was performed in this research. Hosting, weather retrieval and clock/schedule reliability belong to the platform and domain decisions. Recheck the selected package version, dependency licenses and browser requirements at implementation time; the MIT status of these projects does not cover every optional template, font or third-party asset.
