# First-release specification

Status: draft. Confirmed scope is recorded below; the linked decision tickets must resolve before this is ready to build.

The [first-release specification map](https://github.com/Today20092/OpenMasjidDisplay/issues/1) is the planning index. Detailed decisions and research resolutions live in its child tickets.

## Purpose

Open Masjid Display should make prayer times and the passage of the day understandable on a beautiful, readable display. It is intended for mosques, schools, and other shared spaces.

## Confirmed first-release scope

- The first installation is the user's computer and monitor.
- Setup and editing happen on that computer. Remote editing and multi-screen syncing come later.
- Show prayer times and clear information about the next prayer.
- Include a sun visualization tied to the selected location, with prayer markers.
- Include weather and a simple text notice.
- Treat large-screen graphic design and readability as product requirements.
- Keep the project free and open source, with GitHub decision tickets and contributor instructions.
- Users should not need to administer a server.

## Decisions required before implementation

| Question | Authoritative ticket |
| --- | --- |
| What existing products already do well and which gaps deserve testing | [Existing display research](https://github.com/Today20092/OpenMasjidDisplay/issues/2) |
| Whether Lumos, shadcn/ui, daisyUI, or native styling fits the display and controls | [Design approach research](https://github.com/Today20092/OpenMasjidDisplay/issues/3) |
| What a browser app can reliably promise | [Browser feasibility research](https://github.com/Today20092/OpenMasjidDisplay/issues/4) |
| What viewers must understand first and which screen formats to support | [At-a-glance information hierarchy](https://github.com/Today20092/OpenMasjidDisplay/issues/5) |
| Meaning and source of prayer times, next prayer, and sun markers | [Prayer and solar semantics](https://github.com/Today20092/OpenMasjidDisplay/issues/6) |
| Actual visual composition and behavior | [Large-screen visual prototype](https://github.com/Today20092/OpenMasjidDisplay/issues/7) |
| Setup, storage, offline use, weather failure, and recovery | [Reliability contract](https://github.com/Today20092/OpenMasjidDisplay/issues/8) |
| Final acceptance scenarios, distribution, and license | [Specification readiness](https://github.com/Today20092/OpenMasjidDisplay/issues/9) |

A web app is the leading platform candidate. No framework, component toolkit, prayer calculation library, weather provider, or hosting service has been selected.

## Acceptance checks to make concrete

These are proposed checks to refine through the decision tickets, not agreed thresholds:

- A viewer can identify the next prayer and its time from the intended viewing distance.
- The sun visualization explains its relationship to prayer without confusing physical sun position with a configured congregation time.
- Realistic long labels and notices fit the agreed monitor and banner formats without obscuring essential information.
- The display handles night, the final prayer of the day, date changes, time-zone changes, and missing solar events according to the agreed prayer rules.
- The chosen foreground/background pairs pass measured contrast checks; essential state is understandable without relying on color or motion.
- A network interruption leaves the promised core information usable and identifies unavailable or stale weather honestly.
- A user can save settings and recover from reloads or lost browser data according to the agreed support contract.

## Deferred

Remote editing and multi-screen syncing are outside the first release. Native TV apps, automatic unattended startup, media slides, accounts, and installation-specific mosque features are not promised until explicitly scoped.

## Ready-to-build gate

Resolve the linked human decisions, record the selected design and data sources, agree distribution and license, and replace proposed checks with testable acceptance criteria. The user then reviews the specification in the readiness ticket. Research completion alone does not satisfy this gate.
