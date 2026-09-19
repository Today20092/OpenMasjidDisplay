# First-release specification

Status: draft. Confirmed scope is recorded below; the linked decision tickets must resolve before this is ready to build.

The [first-release specification map](https://github.com/Today20092/OpenMasjidDisplay/issues/1) is the planning index. Detailed decisions and research resolutions live in its child tickets.

## Purpose

Open Masjid Display should make prayer times and the passage of the day understandable on a beautiful, readable display. It is intended for mosques, schools, and other shared spaces.

## Confirmed first-release scope

- The first installation is the user's computer, used to preview a display designed for TVs viewed from across a room in mosques or similar spaces. The user's particular monitor does not define the layout or readability target.
- Setup and editing happen on that computer. Remote editing and multi-screen syncing come later.
- Show prayer times and clear information about the next prayer.
- Include a sun visualization tied to the selected location, with prayer markers.
- Include weather and a simple text notice.
- Treat large-screen graphic design and readability as product requirements.
- Keep the project free and open source, with GitHub decision tickets and contributor instructions.
- Users should not need to administer a server.

## Agreed information hierarchy

Recorded in [What should the first display help someone understand at a glance?](https://github.com/Today20092/OpenMasjidDisplay/issues/5):

- Design the first layout for a standard landscape TV viewed from across a room. The preview computer does not set the layout's physical size or reading distance.
- Next-prayer information is the first thing viewers should notice, alongside a prominent visualization of the sun's current position. The sun view should help answer whether sunrise or sunset is approaching or it is the middle of the day.
- The remaining-time countdown is secondary to the prayer information and sun view.
- Keep the complete daily prayer schedule visible. When iqamah is enabled, each row distinguishes prayer start time from iqamah time.
- Each mosque can configure iqamah for each prayer as an offset from the prayer start time, such as 10 or 20 minutes, or a fixed clock time. Flag invalid schedules before saving and explain what needs correction.
- Give weather and the notice quiet, dedicated areas. They must not replace or obscure prayer information.
- Weather should help viewers plan the day, prioritizing likely rain and useful heat/cold context. The user requested investigation of unusual temperatures; any comparison with normal conditions requires an evidenced baseline.

Breezy Weather is a user-supplied design reference and NWS is a proposed data source. Neither app code/assets nor a weather provider has been selected. The user selected the next three hours as the weather-background forecast window. Exact forecast wording, condition selection and temperature thresholds remain part of the reliability decision.

## Confirmed prayer behavior

Agreed in [What exactly do prayer times, next prayer, and sun markers mean?](https://github.com/Today20092/OpenMasjidDisplay/issues/6):

- Show prayer start and iqamah together in the prominent prayer summary when iqamah is enabled. Do not hide either time as the next event changes; people need both to plan their arrival.
- Keep the prominent prayer until its iqamah time, then advance directly to the next prayer without a congregation-starting message. When iqamah is disabled, advance at prayer start.
- The secondary countdown targets prayer start first, then iqamah, with an explicit target label. Both absolute times remain visible in the prominent summary when iqamah is enabled.
- Calculate prayer start times from a location and user-selected calculation settings. Permit individual adjustments to match the mosque's approved timetable.
- Show the selected calculation method in setup and allow users to change it. The concrete supported method catalog and calculation library remain technical selections, not a single convention imposed on all mosques.
- Use the configured display location's time zone, including its daylight-saving rules, even when the computer uses a different time zone. A wrong device clock is a separate reliability problem; selecting coordinates or a time zone does not establish the current instant.
- Flag invalid schedules before saving, such as an iqamah before its prayer start, and explain how to correct them.
- Support location lookup and exact latitude/longitude entry. A location-search provider and its offline behavior remain implementation decisions.
- Make iqamah optional. With it disabled, show prayer start times without an empty iqamah column or iqamah-only labels.
- Preserve the previously agreed per-prayer iqamah offset or fixed-clock-time options.
- Support a configurable list of optional Jumu'ah services on Fridays. Each service has a "Khutbah starts" time and can have its own iqamah time. Support one or several services, including three or more, rather than a single mosque-wide Friday iqamah. When none is configured, including displays outside a mosque, use the ordinary Dhuhr schedule.
- Keep every configured Friday service visible. The headline follows each upcoming khutbah and optional iqamah, then the next daily prayer, using the agreed next-event behavior.
- After Isha's iqamah, or Isha start when iqamah is disabled, show "Tomorrow's Fajr" prominently. Keep today's full schedule until midnight in the configured location's time zone; at midnight switch the schedule to the new day and remove the "Tomorrow" label.

If the selected calculation method cannot produce a prayer time, flag the missing time and let the mosque enter its approved time manually. Do not silently change methods or invent a time. The user accepted this fallback. The concrete calculation library and supported preset catalog are technical selections to validate against these rules. Timetable import has not been selected for the first release. Clock verification belongs to the reliability decision.

## Solar visualization direction

The user favors an extended half-arc, roughly a semicircle with additional dawn/dusk portions below a visible horizon, rather than a full circle. It should show the sun's current position and help viewers understand the approach of sunrise, midday and sunset. Sunrise/sunset markers and prayer markers remain distinct. Adjusting a prayer schedule must not change the calculated sun position.

When a valid solar calculation establishes that sunrise or sunset does not occur on the selected local date, show "No sunrise today" or "No sunset today" respectively and omit that event's marker. Do not fabricate a time or use this label for a calculation/data failure. Keep the mosque's configured prayer schedule separate; this display fallback does not choose a high-latitude prayer calculation rule.

The precise geometry, projection and behavior when the sun is outside the visible twilight portion remain prototype decisions. The user suggested a moon as a possible nighttime treatment, not an agreed requirement. A symbolic night icon must be distinct from a claim about actual lunar position; a sun-to-moon substitution along the same path has not been approved.

## Proposed weather backgrounds

The user requested exploration of an optional weather-responsive background: subtle rain or snow effects, or a sunny treatment, as a visual cue to expected weather. This is a prototype candidate; first-release inclusion and default settings remain undecided.

The agreed forecast horizon is the next three hours, labelled explicitly. Evaluate the effect behind a stable, readable prayer foreground, with a static/off option and reduced-motion behavior. Keep an explicit text forecast and its time window so the background does not imply rain is occurring now when it represents later conditions. Proposed safeguards are to use a neutral background when forecast data is stale/unavailable and to keep weather styling separate from the sun's astronomical position. Condition-selection rules, intensity and fallback policy require agreement in the weather/reliability decision.

## Requested moon and fasting context

The user requested a moon-phase visual with the percentage illuminated and full-moon context, an indication of whether the White Days are approaching or current, and optional advance reminders for Monday/Thursday fasting. The explicit examples are a Sunday reminder for Monday and a Wednesday reminder for Thursday. Present these as voluntary observances, not commands to fast.

The moon visual and observance labels have separate meanings. [Lunar research](https://github.com/Today20092/OpenMasjidDisplay/issues/12) establishes that White Days refer to Hijri dates 13, 14 and 15 rather than an astronomical illumination threshold. The physical phase and illuminated percentage must not be changed to match the calendar badge. The human decision must choose the Hijri calendar, local adjustment behavior, reminder lead time/window, sunset versus civil-day wording, exceptional-date handling and first-release placement. Proposed reminder exceptions and unconfirmed-calendar behavior are documented in the research, not yet approved as product policy.

This requested context supplements the agreed prayer/sun hierarchy and visible schedule. It does not bring dedicated Ramadan/Taraweeh layouts into the first release. Exact visual treatment belongs to the prototype after calendar/reminder behavior is agreed.

## Decisions required before implementation

| Question | Authoritative ticket |
| --- | --- |
| What existing products already do well and which gaps deserve testing | [Existing display research](https://github.com/Today20092/OpenMasjidDisplay/issues/2) |
| Whether Lumos, shadcn/ui, daisyUI, or native styling fits the display and controls | [Design approach research](https://github.com/Today20092/OpenMasjidDisplay/issues/3) |
| What a browser app can reliably promise | [Browser feasibility research](https://github.com/Today20092/OpenMasjidDisplay/issues/4) |
| Whether to adapt existing work and retain the current public name | [Project origin and naming](https://github.com/Today20092/OpenMasjidDisplay/issues/10) |
| What viewers must understand first and which screen formats to support | [At-a-glance information hierarchy](https://github.com/Today20092/OpenMasjidDisplay/issues/5) |
| Meaning and source of prayer times, next prayer, and sun markers | [Prayer and solar semantics](https://github.com/Today20092/OpenMasjidDisplay/issues/6) |
| Actual visual composition and behavior | [Large-screen visual prototype](https://github.com/Today20092/OpenMasjidDisplay/issues/7) |
| Setup, storage, offline use, weather failure, and recovery | [Reliability contract](https://github.com/Today20092/OpenMasjidDisplay/issues/8) |
| Weather design inspiration and public forecast capabilities | [Weather signage research](https://github.com/Today20092/OpenMasjidDisplay/issues/11) |
| Astronomical moon phase versus voluntary-fasting calendar dates | [Lunar and fasting research](https://github.com/Today20092/OpenMasjidDisplay/issues/12) |
| Hijri calendar and optional reminder behavior | [Moon and reminder policy](https://github.com/Today20092/OpenMasjidDisplay/issues/13) |
| Final acceptance scenarios, distribution, and license | [Specification readiness](https://github.com/Today20092/OpenMasjidDisplay/issues/9) |

A web app is the leading platform candidate. No framework, component toolkit, prayer calculation library, weather provider, or hosting service has been selected.

## Acceptance checks to make concrete

These are proposed checks to refine through the decision tickets, not agreed thresholds:

- A viewer can identify the next prayer and its time from the intended viewing distance.
- The sun visualization explains its relationship to prayer without confusing physical sun position with a configured congregation time.
- Realistic long labels and notices fit the standard landscape TV layout without obscuring essential information. Wide banner layouts are deferred.
- The display handles night, the final prayer of the day, date changes, time-zone changes, and missing solar events according to the agreed prayer rules.
- The chosen foreground/background pairs pass measured contrast checks; essential state is understandable without relying on color or motion.
- A network interruption leaves the promised core information usable and identifies unavailable or stale weather honestly.
- A user can save settings and recover from reloads or lost browser data according to the agreed support contract.

## Deferred

Remote editing, multi-screen syncing, and wide banner layouts are outside the first release. Native TV apps, automatic unattended startup, media slides, accounts, and additional installation-specific mosque features are not promised until explicitly scoped.

Future seasonal layouts should support Ramadan and mosque-specific activities such as Taraweeh. The user explicitly wants these later; the first release does not include dedicated Ramadan/Taraweeh layouts.

## Ready-to-build gate

Resolve the linked human decisions, record the selected design and data sources, agree distribution and license, and replace proposed checks with testable acceptance criteria. The user then reviews the specification in the readiness ticket. Research completion alone does not satisfy this gate.
