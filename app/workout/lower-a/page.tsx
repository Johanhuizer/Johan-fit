import WorkoutPage from "../../components/WorkoutPage";

import {
  lowerAWorkout,
} from "../../lib/workoutPlans";

export default function LowerAPage() {
  return (
    <WorkoutPage
      defaultWorkout={lowerAWorkout}
      storageKey="forgefit-lower-a"
    />
  );
}