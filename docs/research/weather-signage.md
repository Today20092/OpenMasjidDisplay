# Weather that helps someone plan their day

Research date: 2026-09-18. Supports [What can Breezy Weather and public forecasts contribute to useful signage weather?](https://github.com/Today20092/OpenMasjidDisplay/issues/11). These findings and recommendations do not approve a provider or adopt another app's code/assets.

## User decisions

Weather belongs in a quiet, dedicated area beneath next-prayer information and the sun visualization. It should help people anticipate rain, heat, and cold. The user supplied Breezy Weather as design inspiration and suggested NWS as a possible free source. The installation's country is not established.

## Breezy Weather: evidence and transferable ideas

The project describes a Material 3 Expressive Android app with daily/hourly forecasts, charts, nowcasting and multiple sources. That is its README's description, not evidence that its interface works at television viewing distances. Its repository is marked LGPL-3.0; additional terms reserve trademarks and prohibit misrepresenting origin. This research recommends inspiration only; copying code or assets would need a separate review of the applicable files and notices. [Repository](https://github.com/breezy-weather/breezy-weather), [additional terms](https://github.com/breezy-weather/breezy-weather/blob/main/LICENSE_ADDITIONAL).

Its main-screen documentation distinguishes minute-scale nowcasting from hourly forecasts. Nowcasting appears only with a compatible source and expected precipitation. Hourly trends combine time, condition icons, temperature and precipitation probability. Missing whole-period data hides the relevant trend. The documentation also describes a forecast-median fallback when climate normals are unavailable: that fallback must not become an “above normal” claim in our display. [Main-screen explanation](https://github.com/breezy-weather/breezy-weather/blob/main/docs/HOMEPAGE.md).

Official [light header](https://github.com/breezy-weather/breezy-weather/blob/main/fastlane/metadata/android/en-US/images/phoneScreenshots/01-main-header-light.png) and [weather blocks](https://github.com/breezy-weather/breezy-weather/blob/main/fastlane/metadata/android/en-US/images/phoneScreenshots/03-main-blocks-1.png) screenshots were located. The research browser returned image references without inspectable pixels; no claims about their actual palette, spacing, typography or visual quality are made here.

**Design proposal:** borrow the documented idea of putting a condition and its time together, but reduce it to one readable near-term message and a few supporting numbers. A phone's tabs, scrolling charts and dense collection of weather variables are not the proposed signage layout. Validate the composition at a distance in the later prototype.

## NWS: useful candidate, geographically bounded

NWS provides U.S. forecasts through local forecast-office grids; do not treat it as a worldwide source. Resolve the configured coordinates through `/points/{latitude},{longitude}` and follow the returned forecast links. Standard periods are 12 hours; `forecastHourly` and raw `forecastGridData` are separate products. Coverage must be verified for the actual location. The service is free, cache-friendly and rate limited, with an unpublished general limit. Its current documentation requires an identifying User-Agent and describes API keys as a future change, not a present setup requirement. [NWS API documentation](https://www.weather.gov/documentation/services-web-api) (also fetched through Context7 `/websites/weather_gov`).

The live OpenAPI schema lists grid layers for temperature, apparent temperature, heat index, wind chill, precipitation probability and precipitation quantity; layers can be absent in some areas. Respect each layer's validity interval and units, and missing values. These support near-term temperature and precipitation context, not an exact statement that rain starts in eleven minutes. [NWS OpenAPI schema](https://api.weather.gov/openapi.json).

Official active alerts are a separate resource with point/area filtering. If included later, preserve issuance/expiry and geographic applicability. A generated “hot afternoon” message is not an official warning. Alert refresh guidance limits polling to no more than once every 30 seconds; that is not a reason to poll ordinary forecasts at that rate. [NWS alerts documentation](https://www.weather.gov/documentation/services-web-alerts).

### Browser and attribution constraints

Chrome may silently discard a custom User-Agent supplied to `fetch`, despite that header no longer being forbidden by the standard. A static browser client therefore cannot simply promise to identify itself exactly as NWS requests. [MDN browser documentation](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header).

A research HTTP request to the NWS OpenAPI endpoint returned status 200 and `Access-Control-Allow-Origin: *`. This is only an observed response from that endpoint, not an end-to-end browser test of points, forecasts and alerts. Before selecting NWS, test the real hosted origin and supported browsers, including header behavior, errors and cache refresh. A small hosted fetch endpoint could supply identification if required, but adds an operational dependency and is not an approved architecture.

NWS information is generally public domain unless noted otherwise. Do not imply endorsement, claim its data as our own, or present modified material as official government content. Recommendation: show a modest source credit and forecast update time, and clearly distinguish app-written summaries. Handle outages with cache/backoff and visibly stale or unavailable data. [NWS disclaimer and usage guidance](https://www.weather.gov/disclaimer).

## “Above average” needs another baseline

A forecast alone cannot establish what is normal for that location and season. NOAA's climate normals provide daily/monthly/hourly statistics based on 30-year periods; the current standard release is 1991–2020. A comparison must match the location, calendar period and quantity (for example, today's forecast high against the normal daily high). [NOAA climate normals](https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals).

**Proposal:** first show forecast temperatures and provider-supplied feels-like values when available. Defer “above average” until an appropriate normals source and comparison rule are chosen. A comparison with tomorrow or this week's forecast median can be labeled as such, but is not a climate anomaly.

## Non-U.S. option and recommendation

Open-Meteo remains a candidate for global model forecasts, with hourly temperature, apparent temperature and precipitation variables. Its free hosted API is restricted to non-commercial use and has rate limits/no uptime guarantee; commercial API access differs from the data's CC BY 4.0 attribution license. Free/open-source app distribution does not by itself determine whether every deployment qualifies. [Forecast documentation](https://open-meteo.com/en/docs), [pricing and attribution](https://open-meteo.com/en/pricing). Context7 `/websites/open-meteo_en` was fetched; official pages supply the specific service terms.

Proposed first-release weather area:

- One near-term message, such as “Rain possible this afternoon”, tied to forecast intervals and uncertainty. Do not convert precipitation probability into an exact onset or a rain-only claim when precipitation type is unknown.
- A restrained temperature readout, today's high/low and optional feels-like value. Label forecast conditions honestly rather than implying a live observation.
- A small source/update label. Stale, unavailable and unsupported-location states must not look like a fresh reassuring forecast.

Do not add minute-level nowcasting, climate-anomaly wording, radar or an alert system merely because Breezy Weather offers them. Choose the first supported geography, then a provider and browser fetching approach. The next visual prototype can use clearly labeled sample weather while those decisions remain open.

## Limits of this investigation

No code/assets reused, production code written, provider selected or browser integration verified. Official screenshots need visual inspection during design exploration. Actual rain-summary thresholds, temperature wording, refresh/staleness limits and any alert prominence remain specification decisions.
