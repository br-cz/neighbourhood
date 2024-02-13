"use client";
import { useState } from "react";

export function useStepperState(initialStep = 0) {
    const [active, setActive] = useState(initialStep);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  
    return { active, nextStep, prevStep, setActive };
  }
  