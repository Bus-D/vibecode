# Faculty Hub – Design Specification

## 1. Purpose

The Faculty Hub is a customizable dashboard that allows faculty to:
- Quickly access teaching resources
- View key academic tools (calendar, SCOT, mentorship, etc.)
- Interact with annual reporting tools (non-evaluative, informational)

The system prioritizes:
- Simplicity
- Clarity
- Customization (within constraints)
- Low cognitive load

This is NOT a performance grading system.

---

## 2. Layout Overview

### Page Structure

Header
- Left: hamburger menu (future use)
- Right: "Welcome, {Name}" + profile icon

Main Content
1. Greeting Section
   - "Hello {Name}"

2. Fixed Widgets (Top Row)
   - Goals (left, 50%)
   - Course Overview (right, 50%)
   - These are ALWAYS visible
   - Cannot be removed or reordered

3. Divider

4. Custom Widget Section
   - Title: "Custom Widgets"
   - "+ Add Widget" button (top right)

5. Widget Grid
   - 2-column layout
   - Fixed widget sizes
   - Cards stack vertically

---

## 3. Widget System

### Widget Rules

- Widgets are **predefined templates**
- Widgets have:
  - Fixed size
  - Fixed structure
- Users can:
  - Add widgets
  - Remove widgets (except locked ones)
  - Reorder widgets

---

### Default Widgets

#### Locked (Non-removable)
- Goals
- Course Overview

#### Available Widgets
- Resources
- Mentorship
- SCOT
- Calendar

---

### Widget Card Structure

Each widget includes:
- Title (top-left)
- Options menu (top-right "⋮")
- Content area
- Optional action button

Options Menu:
- Remove widget
- Move up
- Move down

---

## 4. Add Widget Flow

### Trigger
- "+ Add Widget" button
- OR empty placeholder card

---

### Modal Behavior

- Opens centered modal
- Background darkens (overlay)
- Modal includes:

#### Left Panel
- Categories:
  - All
  - Teaching
  - Resources
  - Reporting

#### Top
- Search bar

#### Main Area
- List/grid of available widgets
- Each shows:
  - Name
  - Short description

---

### Advanced (Optional for Prototype)
- Right panel preview of dashboard layout
- Shows:
  - Current widgets
  - New widget placement preview
- User can reorder before confirming

---

### Selection Flow

1. User selects widget
2. Widget is added to dashboard
3. Modal closes
4. Widget appears at bottom (or chosen position)

---

## 5. Widget Types (Initial)

### Goals
- Static or simple editable content
- May include button

### Course Overview
- Summary of courses
- Placeholder for Power BI integration

### Resources
- Expandable list of links
- Accordion-style items

### Mentorship
- Simple content block
- Possibly list of mentees or notes

### SCOT
- Reporting/assessment data
- Placeholder content

### Calendar
- Monthly grid view
- Static or simple JS-based

---

## 6. Interaction Model

### Reordering
- Buttons (Move Up / Move Down)
- No drag-and-drop (to keep simple)

### Removing
- From widget menu
- Instant removal

### Adding
- Via modal

---

## 7. Visual Design

Based on provided mock:

- Soft blue gradient background
- White/gray cards
- Rounded corners
- Subtle shadows
- Clean spacing

Typography:
- Bold headings
- Simple sans-serif

---

## 8. Future Considerations (Not in Prototype)

- Role-based dashboards (admin, department head)
- Drag-and-drop layout
- Widget resizing
- Theme customization
- Multiple dashboards
- Live API data (Power BI integration)

---

## 9. Constraints

- Built with:
  - HTML
  - CSS
  - Vanilla JavaScript

- No frameworks (no :contentReference[oaicite:0]{index=0})

- Focus:
  - Functioning prototype
  - Clear structure
  - Expandable architecture