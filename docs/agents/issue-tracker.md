# Issue tracker: GitHub

Issues and specifications live in https://github.com/Today20092/OpenMasjidDisplay/issues. Use `gh` from this clone; verify the remote before writing.

## Issue operations

- Create: `gh issue create --title "..." --body-file <path> --label <label>`.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open --json number,title,labels,assignees`.
- Comment: `gh issue comment <number> --body-file <path>`.
- Label: `gh issue edit <number> --add-label <label>` or `--remove-label <label>`.
- Close: post the resolution comment, then `gh issue close <number>`.

Use UTF-8 files for multiline bodies. When a skill says to publish to the tracker, create a GitHub issue; when it says to fetch a ticket, read the issue and comments.

## Pull requests as a triage surface

PRs as a request surface: no.

## Wayfinding operations

- The canonical map is one issue labelled `wayfinder:map`. Its body contains Destination, Notes, Decisions so far, Not yet specified, and Out of scope. Keep open tickets in the native sub-issue list, not duplicated in the map body.
- Each decision ticket is a native sub-issue with a `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task` label. Refer to tickets by linked title.
- Link a child with `gh api --method POST repos/Today20092/OpenMasjidDisplay/issues/<map>/sub_issues -F sub_issue_id=<child-database-id>`.
- Add dependencies in a second pass with `gh api --method POST repos/Today20092/OpenMasjidDisplay/issues/<dependent>/dependencies/blocked_by -F issue_id=<blocker-database-id>`.
- Numeric database IDs come from `gh api repos/Today20092/OpenMasjidDisplay/issues/<number> --jq .id`; issue numbers and node IDs are different identifiers.
- Find the frontier by listing the map's sub-issues in order. Keep open, unassigned children with no open blockers. Use the native dependency summary or fetch blockers and inspect their states.
- Claim the first frontier ticket by assigning it to the driving developer before work: `gh issue edit <number> --add-assignee @me`.
- Resolve by posting findings as a comment, closing the ticket, then appending a one-line gist and linked ticket title to the map. Detailed decisions live in their tickets.
- If native sub-issues are unavailable, use a map task list and a parent link in each child. If native dependencies are unavailable, use an explicit `Blocked by` line and check referenced issue states. Record the fallback if needed.

Charting creates the map and tickets; it does not resolve human decisions. Research may run in parallel on separate `research/<name>` branches. Later sessions resolve at most one non-research ticket, then update the map.
