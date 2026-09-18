# Browser feasibility for the first release

Research date: 2026-09-18. Resolves factual investigation in [#4](https://github.com/Today20092/OpenMasjidDisplay/issues/4), under [the Wayfinder map](https://github.com/Today20092/OpenMasjidDisplay/issues/1). These are recommendations, not accepted architecture decisions or tested implementation claims.

## Confirmed scope

The first installation is one computer and monitor, with setup and editing on that computer. Prayer times, next-prayer information, a location-based sun visualization, weather, and one text notice are in scope. Remote editing and syncing are deferred. The user favors a web interface but has not locked the platform.

## Recommended platform contract

Use an HTTPS web app with an offline application shell and optional PWA installation. Qualify current desktop Chrome and Edge on the user's actual computer first. A normal browser tab should remain usable; installation improves launching and window presentation rather than changing prayer behavior. Promise continued core operation after a successful online setup, while the computer is awake and the page is open. Do not promise unattended recovery after reboot, hardware failure, browser termination, or cleared browser data.

This is a fit assessment, not a framework choice. A native wrapper is unnecessary for the agreed scope. Revisit managed kiosk deployment first if unattended reboot recovery or locked-down public terminals become requirements; a wrapper alone does not establish those guarantees.

## Findings and their consequences

| Concern | Documented behavior | Proposed release behavior |
| --- | --- | --- |
| Fullscreen | `requestFullscreen()` requires transient user activation and can fail; the user can leave fullscreen. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) | Provide an explicit Start display action and an accessible exit/edit route. Move the window to the desired monitor manually, then enter fullscreen. Do not depend on automatic fullscreen after reload. |
| Keep-awake | Screen Wake Lock operates on visible active documents, may be rejected or released, and needs reacquisition after visibility changes. [MDN, fetched through Context7](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) | Request a lock during display use, handle loss without crashing, and show its status in setup. Document OS power settings for long sessions. It cannot make a closed app run or wake a sleeping computer. |
| Installation | A manifest describes standalone presentation; install availability and OS integration vary. Some desktop browsers offer user-enabled launch at sign-in. [web.dev installation](https://web.dev/learn/pwa/installation), [MDN manifest tutorial, Context7](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Manifest_file) | Installation is optional. A standalone window is not equivalent to fullscreen or a supervised kiosk. Sign-in launch is an optional device setup step, not an app-level reboot guarantee. |
| Offline startup | A service worker caches resources during installation and serves cached responses later. A replacement can wait while the old worker continues serving. [MDN, Context7](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) | Initial online access must complete before showing Offline ready. Cache all core assets, including fonts and calculation code. Verify reopening offline, not merely disconnecting an already-open page. Avoid forcing a reload during display use; offer a controlled update action. |
| Local settings | Storage is origin-bound; browser sessions can retain it, but storage may be blocked, quota-limited, evicted, or explicitly deleted. Persistent storage requests can be refused. [MDN storage quotas, Context7](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Use one persistent browser profile and stable origin. Offer versioned settings export/import, validate imports, and report failed saves. Request persistence where supported, but do not describe it as backup. Private mode is unsupported for durable setup. |
| Pauses and clock changes | Background timers are throttled and animation callbacks commonly stop in hidden pages. [MDN Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) | Derive the displayed time from the current clock rather than decrementing a counter. Recalculate on resume, visibility restoration, and date changes. A wrong computer clock can still produce wrong results. |
| Managed kiosks | Edge digital-signage kiosk mode runs fullscreen in InPrivate; automatic restarting requires additional technology such as Assigned Access. [Microsoft](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-configure-kiosk-mode) | Do not prescribe Edge kiosk mode for this local-settings release. Its private-session behavior conflicts with assuming persistent setup. Evaluate it separately if deployment requirements expand. |

## Prayer and sun computation

Local computation is feasible: Adhan provides JavaScript prayer calculations from coordinates, date, and calculation parameters; SunCalc provides solar position and event calculations. This establishes that an online prayer or solar service is not intrinsically required. It does not select these packages or establish religious accuracy for a particular community. [Adhan primary documentation](https://github.com/batoulapps/adhan-js), [SunCalc primary documentation](https://github.com/mourner/suncalc)

Recommended boundary: save coordinates and an explicit location time zone, plus whichever schedule rules the prayer decision approves. Keep the notice and these inputs locally. Domain decisions still need to settle calculation method, high-latitude handling, overrides, and congregation times. Validate daylight-saving transitions, midnight rollover, missing solar events, and a display location different from the computer's time zone. Do not derive prayer times from decorative sun geometry.

## Weather: one candidate, with explicit limits

Open-Meteo is a plausible first candidate: its non-commercial endpoint needs no API key; the hosted free service has usage limits, and attribution is required. Its data license and hosted service terms are distinct: being an open-source app does not automatically authorize every commercial installation to use the free endpoint. Provider selection remains open until intended usage is checked against the current terms. [Official service description](https://open-meteo.com/), [terms](https://open-meteo.com/en/terms), [forecast API](https://open-meteo.com/en/docs)

A direct browser fetch also requires the provider to permit the request through CORS; verify the actual endpoint from the deployed origin. `no-cors` does not make readable JSON available. [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Proposed behavior: fetch a small forecast periodically, retain the last successful result with its source timestamp, and label stale data. When it is too old, replace current conditions with Weather unavailable; prayer information and the notice continue. A suggested starting policy is refresh every 30 minutes and stop presenting conditions as current after two hours, subject to provider cadence and product agreement. Never interpret an offline cached forecast as a fresh observation.

Use a no-secret endpoint for the simple release. A shared paid API secret must not be embedded in browser JavaScript, bundled environment variables, URLs, or an export file: the client receives those values. If a selected provider requires a confidential key, introduce a server-side proxy with appropriate limits or choose another provider; that adds an operated service beyond static hosting. Weather requests reveal the requested coordinates and network address to the provider, so explain this in setup and permit weather to be disabled.

## Acceptance probes before claiming support

1. Configure location and notice, complete caching, close the browser, disconnect, and reopen. Prayer and sun data render; weather is honestly stale or unavailable.
2. Restart the browser in the same profile; settings survive. Clear site data and restore an exported configuration. A missing configuration opens setup rather than silently selecting a location.
3. Enter and exit fullscreen by keyboard, deny or lose wake lock, switch apps, and resume after sleep. The clock, next prayer, and date recover immediately.
4. Cross midnight and daylight-saving changes; simulate a time-zone mismatch and a manual clock correction. No cumulative countdown drift or stale daily schedule remains.
5. Fail or block weather requests, including CORS, rate limits, and offline conditions. Core rendering stays available and attribution remains visible when weather data is shown.
6. Install an update with an old display open; confirm coherent assets, retained settings, and recovery after a failed download.

No runtime prototype was built for this research. These probes, exact browser versions, OS power instructions, weather terms, and the final stale-data threshold belong in the agreed specification and release validation.
