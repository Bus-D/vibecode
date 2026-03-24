# Faculty Hub – State Management Specification

## 1. Core State Shape

Global state object:

```js
const state = {
  user: {
    name: "Daniel",
    role: "faculty"
  },

  widgets: [
    {
      id: "goals",
      type: "goals",
      locked: true,
      position: 0
    },
    {
      id: "course-overview",
      type: "courseOverview",
      locked: true,
      position: 1
    },
    {
      id: "resources-1",
      type: "resources",
      locked: false,
      position: 2
    }
  ]
};