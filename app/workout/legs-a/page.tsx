import WorkoutPage from "../../components/WorkoutPage";

import {
  legsAWorkout,
} from "../../lib/workoutPlans";


export default function LegsAPage() {
  return (
    <WorkoutPage
      defaultWorkout={legsAWorkout}
      storageKey="forgefit-workout-legs-a"
    />
  );
}