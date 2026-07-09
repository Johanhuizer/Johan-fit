import WorkoutPage from "../../components/WorkoutPage";

import {
  upperBWorkout,
} from "../../lib/workoutPlans";

export default function UpperBPage() {
  return (
    <WorkoutPage
      defaultWorkout={upperBWorkout}
      storageKey="forgefit-upper-b"
    />
  );
}