export const prompts = [
  {
    id: "prompt-1",
    title: "Weekly Update to Manager",
    description: "Email template for weekly progress update",
    category: "work",
    subject: "Weekly Update",
    fields: [
      { key: "achieved", label: "What did you achieve this week?", placeholder: "List your key accomplishments..." },
      { key: "nextWeek", label: "What are your priorities for next week?", placeholder: "List your upcoming priorities..." },
      { key: "needs", label: "What do you need from your manager?", placeholder: "List any support or resources needed..." },
      { key: "coming", label: "What is coming up?", placeholder: "Mention upcoming deadlines, meetings, or events..." },
    ],
    featured: true,
  },
  {
    id: "prompt-2",
    title: "Project Status Report",
    description: "Formal project status update",
    category: "work",
    subject: "Project Status Update",
    fields: [
      { key: "achieved", label: "What was completed this week?", placeholder: "List completed tasks..." },
      { key: "nextWeek", label: "What is planned for next week?", placeholder: "List planned tasks..." },
      { key: "needs", label: "What support is needed?", placeholder: "List blockers or support needed..." },
      { key: "coming", label: "What milestones are coming?", placeholder: "List upcoming milestones..." },
    ],
    featured: false,
  },
  {
    id: "prompt-3",
    title: "Corporate Weekly Status Email",
    description: "Expert corporate communication assistant template for manager updates",
    category: "work",
    subject: "Weekly Update – [Week/Date]",
    fields: [
      { key: "achieved", label: "1. This Week – Achievements", placeholder: "Summarize key work completed, outcomes, deliverables, problems solved, and progress. Highlight important contributions and impact. Avoid listing every small task." },
      { key: "nextWeek", label: "2. Next Week – Priorities", placeholder: "List the highest-priority items first. Mention expected deliverables/outcomes. Highlight anything that requires coordination with other teams." },
      { key: "needs", label: "3. Support Needed", placeholder: "Identify decisions, clarifications, approvals, prioritization, resources, or support with dependencies/blockers needed from manager. If none, state: No specific support required at this time." },
      { key: "coming", label: "4. Coming Up", placeholder: "Mention important upcoming items: major milestones, releases, meetings, client discussions, dependencies, risks, upcoming deadlines, important decisions that may be required." },
    ],
    promptText: `You are an expert corporate communication assistant.

I need to send a weekly status/update email to my manager. Create a concise, professional, positive, and leadership-oriented email that clearly communicates progress without sounding like I am over-explaining or making excuses.

Structure the email into exactly these 4 sections:

### 1. What I achieved this week

Summarize the key work completed this week.

* Focus on outcomes, deliverables, problems solved, and progress.
* Highlight important contributions and impact.
* Avoid listing every small task.
* Make the achievements sound factual and measurable where possible.

### 2. Priorities for next week

Clearly explain what I plan to focus on next week.

* List the highest-priority items first.
* Mention expected deliverables/outcomes.
* Highlight anything that requires coordination with other teams.

### 3. What I need from my manager

Identify anything where I need:

* Decisions
* Clarifications
* Approvals
* Prioritization
* Resources
* Support with dependencies/blockers

If nothing is required, say that no specific support is needed at this time.

### 4. What is coming up

Mention important upcoming items such as:

* Major milestones
* Releases
* Meetings
* Client discussions
* Dependencies
* Risks
* Upcoming deadlines
* Important decisions that may be required

Keep this section forward-looking.

### Writing style

* Professional but natural
* Concise and easy to scan
* Confident but not arrogant
* Focus on business impact rather than activity
* Use bullet points where appropriate
* Clearly separate accomplishments, priorities, support needed, and upcoming items
* Do not use unnecessary corporate jargon
* Do not make assumptions or invent achievements
* If information is missing, leave a placeholder or ask for it
* Keep the entire email short enough that my manager can read it in under 2 minutes.

Use this format:

Subject: Weekly Update – [Week/Date]

Hi [Manager Name],

### 1. This Week – Achievements

* [Achievement]
* [Achievement]
* [Achievement]

### 2. Next Week – Priorities

* [Priority]
* [Priority]
* [Priority]

### 3. Support Needed

* [Decision/approval/support required]
* If none: "No specific support required at this time."

### 4. Coming Up

* [Upcoming milestone/deadline]
* [Upcoming meeting/release/dependency]
* [Potential risk or important item]

Thanks,
Bhanu`,
    featured: true,
  },
];

export const promptCategories = [
  { id: "work", label: "Work", color: "#10b981" },
  { id: "personal", label: "Personal", color: "#3b82f6" },
];
