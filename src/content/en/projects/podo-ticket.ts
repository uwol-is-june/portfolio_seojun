import { podoTicket as ko } from "../../projects/podo-ticket";
import type { Project } from "../../types";

const g = ko.gallery ?? [];

export const podoTicket: Project = {
  ...ko,
  title: "Podo Ticket",
  subtitle: "NFC-based O2O ticketing service",
  summary:
    "Replaced handwritten ticketing at small theaters with NFC ticketing and cut ticketing time by 73.5% on average. On-site confusion was solved by detecting the booking type automatically, cutting VOC by 80%.",
  cardPoints: [
    "Handwritten ticketing at small theaters → NFC ticketing",
    "Ticketing time down 73.5% on average",
    "Auto booking-type detection cut on-site VOC by 80%",
  ],
  organization: "Podo Store",
  team: [
    { role: "PM", count: 1 },
    { role: "Designer", count: 1 },
    { role: "FE", count: 2 },
    { role: "BE", count: 2 },
  ],
  tags: ["O2O", "NFC", "User flow", "On-site operations", "VOC"],
  logo: ko.logo && { ...ko.logo, alt: "Podo Ticket logo" },
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Podo Ticket mobile screen mockup" },
  highlights: [
    "Ran the service at 13 shows for 495 audience members",
    "Ticketing time down 73.5% on average · 0.4% error rate",
    "Auto booking detection: on-site ticketing another 22.6% faster · VOC down 80%",
    "Satisfaction 4.92 · NPS 80",
  ],
  background: {
    title: "Small theaters still issue tickets by hand",
    stats: ["Over 70% of small shows and independent troupes in Korea issue tickets by hand"],
    source: "2024 KOPIS Performing Arts Survey",
  },
  research: {
    title: "Customers found handwritten ticketing highly inefficient",
    stats: [
      "95% of ticket managers said the current process is inefficient",
      "86% of audience members said handwritten ticketing is inconvenient and needs fixing",
    ],
    source: "Nov 2024 in-depth interviews with 64 ticket managers and audience members",
  },
  problem: {
    statement: "Handwritten ticketing was causing delays and confusion on site",
    points: [
      "Audiences arrived 5–10 minutes before curtain, causing long entry queues",
      "Manual ticketing led to slow processing, duplicate tickets, and missing entry records",
    ],
  },
  hypothesis:
    "If we introduce NFC-based digital ticketing, customers will get fast and accurate ticketing, and satisfaction and NPS will rise",
  metrics: [
    { name: "Ticketing time", definitions: ["Time to issue for advance bookings", "Time to issue for on-site bookings"] },
    { name: "Ticketing error rate", definitions: ["Share of tickets issued with errors"] },
    { name: "Satisfaction", definitions: ["Audience satisfaction (rating, NPS)"] },
  ],
  actions: [
    {
      title: "Planning and building NFC ticketing",
      description: "Planned and built an NFC-based digital ticketing service and designed the ticket info, guest list, and live seat map screens.",
      artifact: "Service planning, screen design",
    },
    {
      title: "On-site operations",
      description: "Set up tablets and NFC cards at real venues and ran the service myself at 13 shows for 495 audience members.",
    },
  ],
  outcome: {
    verdict: "Core hypothesis validated",
    metrics: [
      { label: "Advance booking ticketing", value: "14.2s", description: "76% faster than before" },
      { label: "On-site booking ticketing", value: "26.56s", description: "71% faster than before" },
      { label: "Ticketing error rate", value: "0.4%", description: "2 of 495" },
      { label: "Satisfaction", value: "4.92 / 5", description: "NPS 80.0" },
    ],
  },
  iterations: [
    {
      verdict: "On-site operations revealed more to fix",
      findings: ["NFC ticketing beat the manual process, but some audience members didn't understand the flow, causing confusion on site"],
      analysis: {
        title: "Problems found in on-site interviews",
        stats: [
          "Many said \"I don't know whether to choose advance or on-site booking\"",
          "Choosing a booking type (advance · on-site) increased waiting time and fatigue",
        ],
      },
      insight: "Don't make the audience decide the booking type; let the system decide",
      actions: [
        {
          title: "Automatic booking-type detection",
          description: "Audiences now only enter their booking details, and the backend looks up the booking and routes advance and on-site bookings automatically.",
          points: ["Booking found → straight to seat selection", "No booking → routed to on-site booking"],
        },
      ],
      flow: {
        title: "Ticketing flow",
        before: {
          title: "AS-IS · the user decides",
          description: "Audiences had to choose a booking type first.",
          nodes: [
            { label: "Arrive at the theater" },
            {
              label: "Choose booking type",
              kind: "decision",
              note: "user decides",
              branches: [
                { condition: "Advance booking", label: "Check booking" },
                { condition: "On-site booking", label: "On-site booking process" },
              ],
            },
            { label: "Choose seat" },
            { label: "Issue ticket", kind: "end" },
          ],
        },
        after: {
          title: "TO-BE · the system decides",
          description: "Enter booking details and the system routes you.",
          nodes: [
            { label: "Arrive at the theater" },
            { label: "Enter booking details" },
            {
              label: "Detect booking automatically",
              kind: "system",
              note: "backend",
              branches: [
                { condition: "Booking found", label: "Go to seat selection" },
                { condition: "No booking", label: "Route to on-site booking" },
              ],
            },
            { label: "Choose seat" },
            { label: "Issue ticket", kind: "end" },
          ],
        },
      },
      after: {
        verdict: "Ticketing even faster, on-site confusion VOC down 80%",
        metrics: [
          { label: "On-site confusion VOC", value: "Down 80%", description: "in-app feedback" },
          { label: "Advance booking ticketing", value: "13.37s", description: "14.2s → about 6% faster" },
          { label: "On-site booking ticketing", value: "20.57s", description: "26.56s → 22.6% faster" },
        ],
      },
    },
  ],
  gallery: [
    { ...g[0], alt: "Podo Ticket ticket info screen", caption: "Ticket info" },
    { ...g[1], alt: "Podo Ticket guest list screen", caption: "Guest list" },
    { ...g[2], alt: "Podo Ticket live seat map", caption: "Live seat map" },
    { ...g[3], alt: "An audience member tapping an NFC card", caption: "On-site NFC ticketing" },
    { ...g[4], alt: "Podo Ticket tablet and signs at a venue entrance", caption: "On-site setup" },
    { ...g[5], alt: "Podo Ticket NFC cards", caption: "NFC cards" },
  ],
};
