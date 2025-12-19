# MLB.com Test Plan – Portfolio (MLB Technology Internship)

Author: Rafael Mejia  
Target Role: Technology Summer Internship – MLB (New York)  
System Under Test (SUT): [https://www.mlb.com/en](https://www.mlb.com/en)

---

## 1. Context & Goal

**Product**

MLB.com is the official website of Major League Baseball. It centralizes:

- News, videos and editorial content  
- Scores, schedule and standings  
- Player and team statistics  
- Team hubs and navigation by club  

**Goal of this Test Plan**

Showcase **QA / Test Engineering** skills using MLB.com as the system under test, with focus on:

- Product analysis and risk/impact-based prioritization  
- Clear, actionable manual test design  
- Selection of key scenarios for **E2E automation** (Playwright)  
- Clean, professional documentation for a **GitHub portfolio**

This plan is intentionally compact, but rich enough to reflect the mindset of a senior QA engineer.

---

## 2. Scope

**In Scope (public, high-impact flows)**

1. Home & Global Navigation  
2. Scores & Schedule  
3. Standings  
4. Stats / Players  
5. Teams  

**Out of Scope (for this portfolio iteration)**

- Auth flows (MLB.TV login, personalized account)  
- Real ticket purchase or third-party flows (SeatGeek, MLB Shop)  
- Full performance/load testing  
- Deep security testing  

---

## 3. Test Approach

### 3.1 Functional Testing

- **Manual Testing**
  - Guided exploration of key flows
  - Defined, prioritized functional test cases

- **Automated Testing (Playwright + TypeScript)**
  - Smoke and basic regression on the most critical flows
  - Page Object pattern to keep tests readable and maintainable
  - Execution via CLI / CI (e.g., GitHub Actions)

---

## 4. Test Types

- **Smoke Tests**
  - Verify that main sections load and are navigable

- **Functional E2E**
  - Validate navigation, main content, and transitions between key views

- **Selected Regression**
  - Subset of automated flows that should remain stable over time

---

## 5. Critical Flows & Test Design

### 5.1 Home & Global Navigation

**Objective**

Ensure users understand the main offering (scores, schedule, stats, standings, teams, etc.) and can navigate to key sections from the home page.

**Manual Tests (examples)**

1. Verify the **header** shows main sections (e.g., Scores, Schedule, Stats, Standings, Teams).  
2. Validate that the MLB logo redirects back to the home page from another section.  
3. Confirm that core home content (e.g., top news or main modules) loads without visible errors.  
4. Change language (e.g., English → Spanish) and verify:
   - Content language updates accordingly
   - Primary navigation still works as expected

**Automation Candidates**

- Home smoke:
  - Load home page
  - Verify header, footer and at least one main content module are visible
- Global navigation:
  - From the home page, click on 3–4 key sections (Scores, Schedule, Stats, Standings)
  - Validate URL patterns and page headings

---

### 5.2 Scores & Schedule

**Objective**

Verify that users can view game results and schedule.

**Manual Tests**

1. Navigate to **Scores** from the header:
   - Confirm games for the current day (when applicable) are listed
   - Validate each game card shows teams, score and game status (Final, Live, etc.)
2. Navigate to **Schedule**:
   - Change date (today, +1 day, −1 day) and verify the list of games updates
   - Switch views (e.g., by team or competition, if available)

**Automation Candidates**

- “Scores smoke”:
  - Go to Scores
  - Verify the section loads and there is either at least one game or a consistent message (no errors)
- “Schedule navigation”:
  - Go to Schedule
  - Change to another date and validate that the game list changes
  - Apply a team filter (if available) and confirm only that team’s games are shown

---

### 5.3 Standings

**Objective**

Ensure standings tables for leagues/divisions are displayed correctly and are navigable.

**Manual Tests**

1. Verify the **Standings** page shows:
   - Divisions such as AL East, AL Central, AL West, NL East, NL Central, NL West
   - Team rows with basic columns (W, L, etc.)
2. Switch between different standing views (e.g., current season, wild card, league view if available).  
3. If team names are clickable:
   - Click a team and validate navigation to that team’s page
   - Check consistency of basic information (team name, league/division)

**Automation Candidates**

- “Standings structure”:
  - Navigate to Standings
  - Verify expected divisions are rendered
  - Check each team row contains a name and W/L columns
- (Optional) “Standings → Team navigation”:
  - Click a team
  - Validate the correct team page is opened

---

### 5.4 Stats / Players

**Objective**

Validate that users can view statistics and player profiles.

**Manual Tests**

1. Go to **Stats**:
   - Verify an initial stats table or main view is displayed
   - Apply basic filters (e.g., hitting/pitching, current season) and check the table updates
2. From a players or search flow:
   - Search for a known player
   - Validate the player profile page shows: name, team, position, and key stats

**Automation Candidates**

- “Stats basic table”:
  - Navigate to Stats
  - Apply a simple filter
  - Validate the table has rows and columns (not empty or broken)
- “Player profile smoke”:
  - Search for a specific player
  - Validate the profile contains name, team, and at least one stats section

---

### 5.5 Teams

**Objective**

Confirm that fans can quickly access basic information about a team from the Teams menu.

**Manual Tests**

1. Open the **Teams** menu:
   - Verify all teams are listed and logically grouped (by league/division if applicable)
2. Select a team (e.g., Yankees, Mets, Dodgers):
   - Validate the team page loads with correct name and logo
   - Confirm presence of main sections (News, Schedule, Roster, etc., when available)

**Automation Candidates**

- “Teams menu – basic navigation”:
  - Open Teams menu
  - Select one or two teams
  - Validate that URL and page title match the selected team

---

## 6. Priority & Coverage

| Flow              | Priority | Manual | Automated  |
|-------------------|----------|--------|-----------|
| Home & Navigation | High     | Yes    | Yes (smoke) |
| Scores & Schedule | High     | Yes    | Yes         |
| Standings         | Medium   | Yes    | Yes         |
| Stats / Players   | Medium   | Yes    | Yes (partial) |
| Teams             | Medium   | Yes    | Yes (basic)   |

---

## 7. How This Supports the Portfolio

This test plan is designed to be paired with:

- **Documentation in `docs/`:**
  - This `mlb-web-test-plan.md`
  - A separate test case file with detailed steps for 2–3 key flows

- **Automation in `tests/`:**
  - Playwright scripts organized by feature (home, standings, scores, etc.)
  - Page Objects for MLB home, Teams, Scores, Standings, Stats

This demonstrates:

- Ability to quickly analyze a real, production-grade website (MLB.com)  
- Risk and impact-based prioritization of test coverage  
- Design of manual and automated tests aligned with that analysis  
- Use of modern automation practices (Playwright, TypeScript, Page Objects, CI-ready structure)

---
