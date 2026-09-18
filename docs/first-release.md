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
- Keep the complete daily prayer schedule visible. Each row distinguishes prayer start time from iqamah time.
- Each mosque can configure iqamah for each prayer as an offset from the prayer start time, such as 10 or 20 minutes, or a fixed clock time. This requirement is confirmed; validation and next-event behavior still belong to the prayer semantics decision.
- Give weather and the notice quiet, dedicated areas. They must not replace or obscure prayer information.
- Weather should help viewers plan the day, prioritizing likely rain and useful heat/cold context. The user requested investigation of unusual temperatures; any comparison with normal conditions requires an evidenced baseline.

Breezy Weather is a user-supplied design reference and NWS is a proposed data source. Neither app code/assets nor a weather provider has been selected. Exact forecast wording, time horizon, and temperature thresholds await research and the reliability decision.

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

## Ready-to-build gate

Resolve the linked human decisions, record the selected design and data sources, agree distribution and license, and replace proposed checks with testable acceptance criteria. The user then reviews the specification in the readiness ticket. Research completion alone does not satisfy this gate.
