import {
  BookOpen, Building2, Circle, ClipboardCheck, GraduationCap, Image,
  Layers, Mail, MapPin, Palette, Phone, School, Users, type LucideIcon,
} from "lucide-react";
import type { OnboardingItem, OnboardingStep } from "../types";
import { mapRoute } from "./routeMap";

export type StepStatus = "done" | "active" | "locked";

const ICON_MAP: Record<string, LucideIcon> = {
  school: School,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "graduation-cap": GraduationCap,
  layers: Layers,
  users: Users,
  building: Building2,
  "book-open": BookOpen,
  "clipboard-check": ClipboardCheck,
  image: Image,
  palette: Palette,
};

export const getIcon = (name: string): LucideIcon => ICON_MAP[name] ?? Circle;

export const getSortedItems = (items: Record<string, OnboardingItem>) =>
  Object.entries(items).sort(([, a], [, b]) => a.priority - b.priority);

export const countDone = (step: OnboardingStep) => {
  const all = Object.values(step.items);
  return { done: all.filter((i) => i.completed).length, total: all.length };
};

// First incomplete step is active, earlier ones done, later ones locked
export const getActiveStepIndex = (steps: OnboardingStep[]) => {
  const i = steps.findIndex((s) => !s.completed);
  return i === -1 ? steps.length : i;
};

export const getStepStatus = (index: number, activeIndex: number): StepStatus =>
  index < activeIndex ? "done" : index === activeIndex ? "active" : "locked";

// "Start" goes to the first incomplete item, not the step overview route
export const getStepStartRoute = (step: OnboardingStep) => {
  const next = getSortedItems(step.items).find(([, i]) => !i.completed)?.[1];
  return mapRoute(next?.action.route ?? step.route);
};