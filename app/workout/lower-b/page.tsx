import WorkoutPage from "../../components/WorkoutPage";

import {
  lowerBWorkout,
} from "../../lib/workoutPlans";

export default function LowerBPage() {
  return (
    <WorkoutPage
      defaultWorkout={lowerBWorkout}
      storageKey="forgefit-lower-b"
    />
  );
}