# Ramadan Rewards App — Apple Design UX Proposal

## Light Theme · iOS Native · Apple Human Interface Guidelines

---

## 1. DESIGN PHILOSOPHY

This app sits at the intersection of **spiritual devotion** and **daily utility**. The design must feel like a calm, sacred companion — not a loud productivity tool. Every pixel should breathe reverence.

**Core Apple HIG Principles Applied**:

- **Clarity**: Every deed, hadith, and tracker is immediately legible. No visual noise.
- **Deference**: The UI recedes; the Islamic content is the star. Controls support, never compete.
- **Depth**: Subtle layering and elevation distinguish interactive elements from content.
- **Consistency**: Uniform patterns across all 5 daily sections. Once a user learns one section, they know them all.

**Spiritual Design Ethos**: The app should feel like opening a beautifully bound mushaf (Quran copy) — warm, reverent, and intentional. Light theme here does not mean clinical white. It means luminous warmth, like morning light filtering through a masjid window.

---

## 2. COLOR SYSTEM

### Primary Palette (Light Theme)

| Token | Hex | Usage |
|---|---|---|
| **Canvas** | `#FDFAF5` | App background — warm off-white, like aged parchment |
| **Surface** | `#FFFFFF` | Cards, sheets, modals |
| **Surface Elevated** | `#F8F4EE` | Section headers, grouped backgrounds |
| **Primary** | `#1B6B4A` | Primary actions, active states — deep Islamic green |
| **Primary Light** | `#E8F5EE` | Selected states, light fills, tag backgrounds |
| **Secondary** | `#C8963E` | Accents, highlights, gold — represents barakah/reward |
| **Secondary Light** | `#FDF4E3` | Gold highlight backgrounds, reward badges |
| **Text Primary** | `#1A1A1A` | Headings, primary body text |
| **Text Secondary** | `#6B6B6B` | Subtext, timestamps, metadata |
| **Text Tertiary** | `#9B9B9B` | Placeholders, disabled states |
| **Border** | `#E8E4DE` | Card borders, dividers |
| **Success** | `#2D9F5F` | Completed deeds, streak achievements |
| **Friday Gold** | `#D4A843` | Friday special badge and accents |
| **Last 10 Purple** | `#7B5EA7` | Last 10 nights special mode accent |
| **Destructive** | `#D94B4B` | Missed deeds, reset actions (used sparingly) |

### Section Time-of-Day Accent Colors

Each of the 5 daily sections gets a subtle tint that evokes its time:

| Section | Accent | Hex | Reasoning |
|---|---|---|---|
| Suhoor | Deep Indigo | `#3D3B8E` | Pre-dawn darkness, starlit sky |
| Morning | Warm Amber | `#D4943A` | Sunrise, Fajr light |
| Afternoon | Sage Green | `#5A8F6E` | Midday calm, earth tones |
| Iftar | Burnt Orange | `#C86F3C` | Sunset, warmth of breaking fast |
| Night | Deep Teal | `#2A6B7C` | Night sky, depth of Taraweeh |

These accents appear as a thin 3px top border on each section card and tint the section icon. They never overwhelm.

---

## 3. TYPOGRAPHY

### Font Stack

**Primary Display Font**: SF Pro Display (Apple system)
- Used for: Section titles, day numbers, large stat counters
- Weight: Semibold (600) and Bold (700)

**Body Font**: SF Pro Text
- Used for: Hadith text, descriptions, tips, body copy
- Weight: Regular (400) and Medium (500)

**Arabic Text**: SF Arabic (Apple's native Arabic system font)
- Used for: Dua text, Quranic ayat, Arabic phrases
- Weight: Regular and Semibold
- Always displayed with right-to-left alignment
- Slightly larger font size than English body text (1.15x multiplier) for legibility

**Monospace (counters)**: SF Mono
- Used for: Dhikr counters, streak numbers, juz trackers

### Type Scale

| Role | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Large Title | SF Pro Display | 34pt | Bold | 41pt |
| Title 1 | SF Pro Display | 28pt | Bold | 34pt |
| Title 2 | SF Pro Display | 22pt | Bold | 28pt |
| Title 3 | SF Pro Display | 20pt | Semibold | 25pt |
| Headline | SF Pro Text | 17pt | Semibold | 22pt |
| Body | SF Pro Text | 17pt | Regular | 22pt |
| Callout | SF Pro Text | 16pt | Regular | 21pt |
| Subheadline | SF Pro Text | 15pt | Regular | 20pt |
| Footnote | SF Pro Text | 13pt | Regular | 18pt |
| Caption 1 | SF Pro Text | 12pt | Regular | 16pt |
| Caption 2 | SF Pro Text | 11pt | Regular | 13pt |
| Arabic Body | SF Arabic | 20pt | Regular | 28pt |
| Arabic Display | SF Arabic | 26pt | Semibold | 34pt |

---

## 4. APP STRUCTURE & NAVIGATION

### Tab Bar (Bottom — 5 tabs)

Apple's standard UITabBar at the bottom. Light background with subtle top hairline border.

| Tab | SF Symbol | Label |
|---|---|---|
| Today | `sun.horizon.fill` | Today |
| Sections | `clock.fill` | Schedule |
| Quran | `book.fill` | Quran |
| Tracker | `chart.bar.fill` | Progress |
| Settings | `gearshape.fill` | Settings |

- Active tab: Primary green (`#1B6B4A`) with filled icon
- Inactive tabs: `#9B9B9B` with outline icon
- Tab bar background: `#FFFFFF` with 0.5pt top border in `#E8E4DE`
- Slight frosted glass blur effect (UIBlurEffect.systemMaterial)

### Navigation Bar (Top)

- Large Title style (collapses on scroll, per Apple HIG)
- Background: Matches canvas `#FDFAF5`
- Title: "Ramadan Day 15" (dynamically updates)
- Right bar button: Hijri date display as a pill badge
- Left bar button: Notification bell (`bell.fill` SF Symbol)

---

## 5. HOME SCREEN — "TODAY" TAB

This is the hero screen. It must feel like opening the app to a peaceful, purposeful morning.

### 5A. Day Header Card

A prominent card at the top of the scrolling view:

```
┌─────────────────────────────────────────────┐
│                                             │
│   ☪︎  RAMADAN                                │
│                                             │
│        Day 15                               │
│   ─────────────────                         │
│   Friday, March 28, 2025                    │
│   15 Ramadan 1446 AH                        │
│                                             │
│   ┌──────────┐  ┌──────────┐                │
│   │ Fajr     │  │ Maghrib  │                │
│   │ 5:23 AM  │  │ 6:47 PM  │                │
│   └──────────┘  └──────────┘                │
│                                             │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░  15/30   │
│                                             │
└─────────────────────────────────────────────┘
```

**Design details**:
- Background: Subtle geometric Islamic pattern at 3-5% opacity over `#FFFFFF`
- The crescent icon is custom, not emoji — a refined SF Symbol-weight line icon
- Day number: SF Pro Display, 56pt Bold, `#1A1A1A`
- Dates: SF Pro Text, 15pt Regular, `#6B6B6B`
- Prayer time pills: Rounded rectangles (cornerRadius 12pt), `#F8F4EE` background
- Progress bar: Rounded capsule shape, green fill (`#1B6B4A`) on `#E8E4DE` track
- Friday badge (when applicable): Gold pill badge "Jumu'ah" with `star.fill` icon, background `#FDF4E3`, text `#C8963E`
- Last 10 Nights badge: Purple pill "Laylat al-Qadr Window" with `sparkles` icon

### 5B. Current Section Highlight

Below the header, the app automatically highlights **the current time section** (based on prayer times). This section is visually elevated:

- Card has a subtle shadow (`shadowColor: #000000` at 5% opacity, offset y: 4, blur: 16)
- Left border accent in the section's time-of-day color (3pt, rounded)
- "NOW" pill badge in top-right corner: `#1B6B4A` background, white text, `clock.fill` icon
- All other sections appear below in their collapsed state

### 5C. Section Cards (The 5 Daily Sections)

Each section is a collapsible card. Tapping expands it. The current section is auto-expanded.

**Collapsed state**:
```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│  🌅  MORNING (Fajr → Dhuhr)      3/6 ✓   ▼ │
│  ━━━━━━━━━━━━━━━━━━░░░░░░░  50%             │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

- Corner radius: 16pt (Apple's standard large card radius)
- Background: `#FFFFFF`
- Border: 1pt `#E8E4DE`
- Section icon: SF Symbol in the section accent color
- Completion count: "3/6 ✓" right-aligned in `#2D9F5F`
- Mini progress bar: 4pt height, rounded capsule
- Chevron: `chevron.down` / `chevron.up` SF Symbol for expand/collapse
- Expand animation: UIKit spring animation, 0.35s duration, slight bounce

**Expanded state** — each deed inside the section:

```
┌─────────────────────────────────────────────┐
│  🌅  MORNING (Fajr → Dhuhr)        3/6 ✓  ▲│
│  ━━━━━━━━━━━━━━━━━━░░░░░░░  50%            │
│─────────────────────────────────────────────│
│                                             │
│  ○  Pray Fajr on time                      │
│     Under Allah's protection all day        │
│     Sahih Muslim 656              [  ⓘ  ]  │
│                                             │
│  ●  Morning Adhkar                 ✓ Done   │
│     Protection & forgiveness                │
│     Sahih al-Bukhari 6306         [  ⓘ  ]  │
│                                             │
│  ●  Ishraq / Duha Prayer          ✓ Done   │
│     Reward of Hajj & Umrah                  │
│     Sahih Muslim 720              [  ⓘ  ]  │
│                                             │
│  ○  Quran — Morning Session                 │
│     Each letter = 10 hasanat                │
│     Juz 15 today                  [  ⓘ  ]  │
│                                             │
│  ●  Guard tongue & limbs           ✓ Done   │
│     Fasting is a shield                     │
│     Sahih al-Bukhari 1903         [  ⓘ  ]  │
│                                             │
│  ○  Salawat on Prophet ﷺ                    │
│     10 blessings per salawat                │
│     Sahih Muslim 408              [  ⓘ  ]  │
│                                             │
└─────────────────────────────────────────────┘
```

### 5D. Individual Deed Row (Critical Component)

Each deed is a list row with:

**Left**: Custom checkbox
- Unchecked: Circle outline (`circle` SF Symbol), `#D0CCC6`
- Checked: Filled circle with checkmark (`checkmark.circle.fill`), `#2D9F5F`
- Animation: Scale bounce (0.9 → 1.05 → 1.0) with haptic feedback (UIImpactFeedbackGenerator, medium)

**Center**: Deed content (stacked vertically)
- **Title**: SF Pro Text, 17pt, Semibold, `#1A1A1A`
- **Reward summary**: SF Pro Text, 14pt, Regular, `#6B6B6B` — one line, italicized
- **Source**: SF Pro Text, 12pt, Regular, `#9B9B9B` — hadith book and number

**Right**: Info button
- `info.circle` SF Symbol, `#9B9B9B`
- Tapping opens a bottom sheet (see Deed Detail Sheet below)

**Completed state**: The entire row gets a subtle green tint background (`#E8F5EE` at 50% opacity), and text does NOT get struck through (this is worship, not a mundane to-do — it should feel accomplished, not dismissed).

### 5E. Deed Detail Bottom Sheet

Triggered by tapping the ⓘ button. Uses Apple's standard `.sheet` presentation (half-height detent, draggable to full).

```
┌─────────────────────────────────────────────┐
│  ━━━━  (drag indicator)                     │
│                                             │
│  📖  Pray Fajr on Time                     │
│                                             │
│  ┌─ Hadith ──────────────────────────────┐  │
│  │                                       │  │
│  │  "Whoever prays Fajr is under the     │  │
│  │   protection of Allah."               │  │
│  │                                       │  │
│  │   — Sahih Muslim 656                  │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  REWARD                                     │
│  Allah's protection (dhimmah) for the       │
│  entire day. Combined with Isha in          │
│  congregation = full night's reward.        │
│                                             │
│  PRACTICAL TIP                              │
│  Set multiple alarms. Place your phone      │
│  across the room. Make wudu part of your    │
│  Suhoor routine so you're already           │
│  prepared when the adhan calls.             │
│                                             │
│  ┌─ Arabic Text ─────────────────────────┐  │
│  │                                       │  │
│  │  مَنْ صَلَّى الصُّبْحَ فَهُوَ فِي ذِمَّةِ اللَّهِ   │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│         [ Mark as Complete ✓ ]              │
│                                             │
└─────────────────────────────────────────────┘
```

**Design details**:
- Drag indicator: Standard Apple pill, `#D0CCC6`, centered
- Hadith quote card: `#F8F4EE` background, 12pt corner radius, 1pt `#E8E4DE` border
- Arabic text card: Same style, right-to-left, SF Arabic 22pt
- "Mark as Complete" button: Full-width, 50pt height, `#1B6B4A` background, white text, 14pt corner radius
- If already completed: Button becomes outlined green with "✓ Completed" text

---

## 6. FRIDAY SPECIAL MODE

When the current day falls on Friday, the app transforms subtly:

### Visual Changes
- Day header card gets a gold border (2pt, `#D4A843`)
- A "Jumu'ah Blessings" banner appears below the header with a warm gold gradient (`#FDF4E3` → `#F8EDD0`)
- Section cards gain a subtle gold shimmer accent

### Additional Content Card
A dedicated "Friday Specials" card appears between the section cards:

```
┌─────────────────────────────────────────────┐
│  ★  FRIDAY SPECIALS                         │
│─────────────────────────────────────────────│
│                                             │
│  ○  Recite Surah al-Kahf                   │
│     Light between two Fridays               │
│                                             │
│  ○  Extra Salawat (200+ target)             │
│     Presented to Prophet ﷺ on Friday        │
│                                             │
│  ○  Dua in the last hour before Maghrib     │
│     Hour of guaranteed acceptance            │
│                                             │
│  ○  Ghusl before Jumu'ah                    │
│     Strongly emphasized Sunnah              │
│                                             │
│  ○  Go early to Jumu'ah prayer              │
│     Each step = 1 year of fasting           │
│                                             │
│  ○  Use Miswak & best clothes               │
│     Prophetic Sunnah for Friday             │
│                                             │
└─────────────────────────────────────────────┘
```

- Star icon: `star.fill` in `#D4A843`
- Card border: 1pt `#D4A843`
- Background: `#FFFCF5` (very subtle warm tint)

---

## 7. LAST 10 NIGHTS SPECIAL MODE

Activates automatically from Day 21. This is a reverent transformation:

### Visual Changes
- A persistent top banner: "The Last 10 Nights — Seek Laylat al-Qadr" with `sparkles` SF Symbol
- Banner: Deep purple gradient (`#7B5EA7` → `#5D4399`) with white text
- On **odd nights** (21, 23, 25, 27, 29): Extra emphasis — the banner pulses gently (opacity animation 0.8 → 1.0, 2s cycle)
- Night section (Section 5) gets expanded by default with extra items

### Additional Content
A "Laylat al-Qadr" card appears with:
- The dua: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni"
- Arabic calligraphy rendering of this dua (large, centered, beautiful)
- I'tikaf reminder
- Intensified worship checklist

---

## 8. PROGRESS TAB — HABIT TRACKER

### 8A. Monthly Overview (Top of screen)

A **30-day grid** (5 rows × 6 columns), each cell representing one day:

```
┌──────────────────────────────────────────┐
│  RAMADAN 1446 AH                         │
│                                          │
│   1●  2●  3●  4●  5●  6◐               │
│   7●  8●  9◐ 10● 11● 12●               │
│  13● 14● 15◉ 16○ 17○ 18○               │
│  19○ 20○ 21○ 22○ 23○ 24○               │
│  25○ 26○ 27○ 28○ 29○ 30○               │
│                                          │
│  ● 80%+  ◐ 50-79%  ◉ Today  ○ Upcoming │
└──────────────────────────────────────────┘
```

- Each circle: 40×40pt tap target
- Color fill based on completion: Green gradient from `#E8F5EE` (low) to `#1B6B4A` (100%)
- Today: Ring outline with dot in center, pulsing subtly
- Future days: `#E8E4DE` outline only
- Friday cells: Tiny gold dot indicator below
- Last 10 nights cells: Subtle purple background tint
- Tapping a day navigates to that day's detail view

### 8B. Today's Stats

Below the grid, a summary card:

```
┌──────────────────────────────────────────┐
│  TODAY'S PROGRESS                        │
│                                          │
│        ╭─────╮                           │
│       │ 73%  │   14 of 20 deeds          │
│        ╰─────╯                           │
│                                          │
│  🕌 Prayers  ████████░░  4/5             │
│  📖 Quran    ██████░░░░  Juz 15          │
│  🤲 Dhikr    ████████░░  80%             │
│  💛 Charity  ██████████  Done             │
│                                          │
└──────────────────────────────────────────┘
```

- Circular progress ring: 120pt diameter, `#1B6B4A` stroke (6pt width), animated on appear
- Category bars: Standard Apple progress bars, rounded capsule, 8pt height
- Use SF Symbols for category icons, not emoji (emoji shown here for illustration)
  - Prayers: `figure.stand` or custom mosque symbol
  - Quran: `book.fill`
  - Dhikr: `hands.sparkles.fill` 
  - Charity: `heart.fill`

### 8C. Streak Tracker

Horizontal scroll of streak cards:

```
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ 🔥 15  │ │ 🔥 12  │ │ 🔥 8   │ │ 🔥 15  │
│  days  │ │  days  │ │  days  │ │  days  │
│ Fajr   │ │ Quran  │ │ Sadaqah│ │ Adhkar │
│ on time│ │ daily  │ │ daily  │ │        │
└────────┘ └────────┘ └────────┘ └────────┘
```

- Horizontal UICollectionView with compositional layout
- Card size: 100×120pt
- Corner radius: 14pt
- Background: `#FFFFFF` with 1pt `#E8E4DE` border
- Streak number: SF Mono, 28pt Bold
- Active streak: Green border glow (`#2D9F5F`)
- Broken streak: Muted (`#9B9B9B`)

### 8D. Habit Detail View

Tapping any habit shows a detail screen with:
- 30-day completion calendar (green dots for completed days)
- Current streak and best streak
- The hadith motivating this habit
- A line chart (using Swift Charts) showing consistency over time

---

## 9. QURAN TAB

### 9A. Juz Tracker

A visual tracker for completing the entire Quran in Ramadan:

```
┌──────────────────────────────────────────┐
│  QURAN COMPLETION                        │
│                                          │
│  Juz 1  ●●●●●●●●●●  ✓                  │
│  Juz 2  ●●●●●●●●●●  ✓                  │
│  ...                                     │
│  Juz 15 ●●●●●●○○○○  60%                 │
│  Juz 16 ○○○○○○○○○○  —                   │
│  ...                                     │
│                                          │
│  15 / 30 Juz Complete                    │
│  ━━━━━━━━━━━━━━━░░░░░░░░░░░  50%        │
│                                          │
└──────────────────────────────────────────┘
```

- Each juz row: Tap to expand and see page range, surah names
- Completed juz: `#1B6B4A` filled dots
- In-progress: Partially filled
- Slider or stepper to log pages read today

### 9B. Daily Quran Reminder Card

Shows which juz to read today with estimated reading time and a motivational hadith about Quran recitation.

---

## 10. SETTINGS TAB

### 10A. Prayer Time Configuration
- Location selector (auto-detect or manual city)
- Calculation method picker (ISNA, MWL, Egyptian, Umm al-Qura, etc.)
- Madhab selection for Asr (Hanafi vs. standard)

### 10B. Notification Preferences
- Toggle switches (Apple standard UISwitch) for each reminder type:
  - Suhoor reminder
  - Fajr reminder
  - Duha reminder
  - Prayer time reminders
  - Pre-Iftar dua reminder
  - Taraweeh reminder
  - Last third of night reminder
  - Friday specials reminder
- Each toggle: `#1B6B4A` tint when on

### 10C. Customization
- Daily Quran target (pages or juz)
- Dhikr count targets
- Salawat daily target
- Charity tracking (amount or just done/not done)

### 10D. Display Settings
- Text size slider (Dynamic Type support — mandatory for Apple HIG compliance)
- Arabic text size independent slider
- Transliteration toggle (show/hide)
- Translation language picker

---

## 11. MICRO-INTERACTIONS & ANIMATIONS

### Completion Animations
- **Deed checkbox**: Spring scale animation (0.9 → 1.05 → 1.0, 0.3s) + haptic (medium impact)
- **Section complete** (all deeds done): Confetti-like particle burst of tiny green dots, 1.5s, then the section card gets a green left border
- **Day complete** (all sections done): Full-screen gentle particle animation — golden dots falling like light, 2s — with a motivational hadith overlay
- **Streak milestone** (7, 15, 30 days): Celebration animation + badge unlock

### Transitions
- Section expand/collapse: UIKit spring animation, 0.35s, dampingRatio 0.85
- Tab switches: Standard iOS cross-dissolve
- Sheet presentation: Apple default `.sheet` with detents (medium and large)
- Day navigation: Horizontal swipe gesture to go to next/previous day (like a calendar)

### Scroll Behavior
- Large title navigation bar collapses on scroll (standard Apple behavior)
- Parallax effect on the day header card (subtle, 15% offset)
- Section headers stick when scrolling through expanded sections

---

## 12. ICONOGRAPHY

### SF Symbols Used Throughout

| Context | SF Symbol Name | Rendering |
|---|---|---|
| Suhoor section | `moon.stars.fill` | Hierarchical, indigo |
| Morning section | `sunrise.fill` | Hierarchical, amber |
| Afternoon section | `sun.max.fill` | Hierarchical, sage |
| Iftar section | `sunset.fill` | Hierarchical, orange |
| Night section | `moon.fill` | Hierarchical, teal |
| Prayer | `figure.stand` | Monochrome, primary |
| Quran | `book.fill` | Monochrome, primary |
| Dhikr/Tasbeeh | `repeat` | Monochrome, secondary |
| Dua | `hands.sparkles.fill` | Hierarchical, primary |
| Charity | `heart.fill` | Monochrome, gold |
| Streak fire | `flame.fill` | Palette, orange/red |
| Completed | `checkmark.circle.fill` | Monochrome, success green |
| Incomplete | `circle` | Monochrome, tertiary |
| Info | `info.circle` | Monochrome, tertiary |
| Friday | `star.fill` | Monochrome, gold |
| Last 10 | `sparkles` | Hierarchical, purple |
| Notification | `bell.fill` | Monochrome, primary |
| Settings | `gearshape.fill` | Monochrome, secondary |
| Calendar | `calendar` | Monochrome, primary |
| Clock / Time | `clock.fill` | Monochrome, secondary |
| Fajr time | `alarm.fill` | Monochrome, amber |
| Maghrib time | `clock.badge.checkmark.fill` | Hierarchical, orange |

### Custom Symbols (create via SF Symbols app)
- **Crescent and star**: For Ramadan branding (app icon, header)
- **Mosque silhouette**: For prayer-related contexts
- **Tasbih beads**: For dhikr counter
- **Open hands (dua)**: More Islamic-specific than `hands.sparkles`
- **Quran on stand**: For Quran tab icon

---

## 13. COMPONENTS LIBRARY

### Card Component
- Background: `#FFFFFF`
- Corner radius: 16pt
- Border: 1pt `#E8E4DE` (optional, context-dependent)
- Shadow: `#000000` at 4% opacity, offset (0, 2), blur 8 (subtle)
- Padding: 16pt all sides
- Spacing between internal elements: 12pt

### Button — Primary
- Background: `#1B6B4A`
- Text: `#FFFFFF`, SF Pro Text 17pt Semibold
- Corner radius: 14pt
- Height: 50pt
- Full width in sheets, inline in cards
- Pressed state: Darken background 10%
- Disabled state: 40% opacity

### Button — Secondary
- Background: `#E8F5EE`
- Text: `#1B6B4A`, SF Pro Text 17pt Semibold
- Same dimensions as primary
- Used for: "Learn More", optional actions

### Button — Outline
- Background: transparent
- Border: 1.5pt `#1B6B4A`
- Text: `#1B6B4A`
- Used for: Completed state buttons, secondary options

### Tag / Pill Badge
- Background: Contextual (green for status, gold for Friday, purple for last 10)
- Text: Caption 1 size, semibold
- Corner radius: Full (capsule)
- Horizontal padding: 10pt
- Vertical padding: 4pt
- Icon + text layout

### Toggle Switch
- On tint: `#1B6B4A`
- Standard Apple UISwitch dimensions

### Progress Bar
- Track: `#E8E4DE`
- Fill: Contextual (usually `#1B6B4A`)
- Height: 6pt (standard) or 4pt (compact)
- Corner radius: Full (capsule)

### Circular Progress Ring
- Track: `#E8E4DE` at 30% opacity
- Fill: `#1B6B4A`
- Stroke width: 8pt (large) or 4pt (small)
- Animated on appear (0 → current value, 0.8s, ease-out)
- Center label: SF Pro Display, Bold

### Divider
- Height: 0.5pt (Retina hairline)
- Color: `#E8E4DE`
- Inset: 16pt from leading edge (in lists)

### Bottom Sheet
- Apple standard `.sheet` modifier
- Detents: [.medium, .large]
- Drag indicator: Standard system pill
- Corner radius: 16pt (system default)
- Background: `#FFFFFF`

---

## 14. SPACING & LAYOUT SYSTEM

Follow Apple's 8pt grid system:

| Token | Value | Usage |
|---|---|---|
| `spacing-xs` | 4pt | Between icon and label in compact contexts |
| `spacing-sm` | 8pt | Between related elements within a component |
| `spacing-md` | 12pt | Between components in a group |
| `spacing-lg` | 16pt | Card padding, section spacing |
| `spacing-xl` | 24pt | Between major sections |
| `spacing-xxl` | 32pt | Top/bottom page margins |

### Safe Areas
- Respect all safe area insets (notch, home indicator, Dynamic Island)
- Content padding from screen edges: 16pt minimum (20pt preferred)
- Tab bar: Standard system height (49pt + home indicator)
- Navigation bar: Standard system height (44pt + status bar)

---

## 15. ACCESSIBILITY

### Must-Implement (Apple HIG Compliance)

1. **Dynamic Type**: All text must scale with the system text size setting. Use Apple's built-in text styles (Title, Body, Caption, etc.) which automatically support Dynamic Type.

2. **VoiceOver**: Every interactive element needs meaningful accessibility labels.
   - Deed checkbox: "Pray Fajr on time. Under Allah's protection all day. Sahih Muslim 656. Not completed. Double tap to mark as complete."
   - Section card: "Morning section. 3 of 6 deeds completed. Double tap to expand."
   - Progress ring: "Today's progress. 73 percent. 14 of 20 deeds completed."

3. **Color contrast**: All text must meet WCAG AA minimum (4.5:1 for body text, 3:1 for large text). The proposed palette has been considered with this in mind.

4. **Reduce Motion**: When the user has "Reduce Motion" enabled in iOS Settings, disable all decorative animations (confetti, particles, pulse effects). Keep only functional transitions (expand/collapse, sheet presentation).

5. **Bold Text**: Support the system Bold Text accessibility setting.

6. **Smart Invert**: Ensure the app looks correct in Smart Invert mode. Images and icons with specific colors should be flagged as `accessibilityIgnoresInvertColors`.

7. **Minimum tap targets**: 44×44pt for all interactive elements (Apple HIG minimum).

---

## 16. ISLAMIC DESIGN DETAILS

### Geometric Patterns
- Use subtle Islamic geometric patterns (arabesque, tessellations) as decorative backgrounds at very low opacity (3-5%)
- Apply to: Day header card, Friday special card, Last 10 Nights banner
- Never as full-page wallpaper — only as card accents
- Pattern color: `#1B6B4A` at 4% opacity on light backgrounds

### Arabic Calligraphy
- "Bismillah al-Rahman al-Raheem" in beautiful thuluth or naskh calligraphy at the app launch / splash screen
- Surah names in Arabic displayed alongside English
- Dua text always shown in Arabic first, then transliteration, then translation
- Arabic text alignment: Always right-to-left, with proper ligature rendering

### Respectful Representations
- Never use pictorial representations of the Prophet ﷺ or any prophet
- Use "ﷺ" (peace be upon him) unicode character after the Prophet's name consistently
- Use "(RA)" or the Arabic رضي الله عنه after Sahabi names
- Quranic text should be visually distinguished (different background, slight size increase) to show reverence

---

## 17. ONBOARDING FLOW

First-time launch: A 4-screen onboarding carousel (Apple standard page control dots):

**Screen 1**: Welcome
- Large crescent illustration
- "Your Ramadan Companion"
- "Maximize every moment of this blessed month with authenticated Sunnah guidance"

**Screen 2**: How It Works
- 5 section icons arranged vertically with time labels
- "Your day, beautifully organized into 5 worship windows"

**Screen 3**: Track & Build Habits
- Progress ring illustration
- "Build habits that last beyond Ramadan. Track your daily deeds and watch your consistency grow."

**Screen 4**: Setup
- Location permission request (for prayer times)
- Notification permission request
- Madhab preference selector
- "Get Started" primary button

---

## 18. WIDGET SUPPORT (iOS Lock Screen & Home Screen)

### Small Widget (Circular — Lock Screen)
- Shows: Next prayer time countdown
- Or: Today's completion percentage in a ring

### Medium Widget (Rectangular — Lock Screen)
- Shows: Current section name + next deed to complete
- Or: "Day 15 — 73% Complete — Next: Quran Session"

### Large Widget (Home Screen)
- Shows: All 5 sections with mini completion indicators
- Current section highlighted
- Prayer times for Fajr and Maghrib
- Tap to open directly to the current section

### Extra Large Widget (iPad / StandBy)
- Full day overview with all sections, progress, and Quran tracker

---

## 19. APPLE WATCH COMPANION (Optional)

- **Complication**: Next prayer time countdown
- **Glanceable view**: Current section + next deed
- **Haptic reminders**: Gentle tap for prayer times and Suhoor
- **Quick actions**: Mark current deed as complete from the wrist
- **Dhikr counter**: Digital Crown to count, haptic on each count

---

## 20. TECHNICAL IMPLEMENTATION NOTES

### Frameworks
- **SwiftUI** as primary UI framework (iOS 17+)
- **Swift Charts** for progress visualizations
- **WidgetKit** for widgets
- **UserNotifications** for reminders
- **CoreLocation** for automatic prayer time calculation
- **CloudKit** for syncing progress across devices

### Data Architecture
- Prayer times: Calculate locally using established algorithms (e.g., Adhan library by Batoul Apps) or integrate with a reliable API like Aladhan
- All Islamic content (hadiths, duas, tips): Stored locally in a structured JSON/Core Data database — the app should work fully offline
- User progress: Core Data for local storage, CloudKit for sync
- Streak calculations: Computed properties based on completion dates

### Performance
- Launch time: Under 1 second to first meaningful content
- Smooth 60fps scrolling at all times
- Prefetch and cache prayer times for the entire month on first launch
- Lazy loading for expanded section content

---

## SUMMARY

This design creates an app that feels like it belongs in the Apple ecosystem — clean, warm, purposeful — while honoring the sacred nature of Ramadan worship. The light theme avoids sterile white by using warm parchment tones and Islamic green/gold accents. Every interaction is considered: from the gentle haptic when marking a deed complete, to the golden shimmer on Fridays, to the reverent purple of the last 10 nights.

The user should feel, every time they open this app, that they are being gently guided toward the best version of their Ramadan — one deed at a time.
