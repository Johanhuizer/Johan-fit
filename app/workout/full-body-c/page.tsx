import WorkoutPage from "../../components/WorkoutPage";

import {
  fullBodyCWorkout,
} from "../../lib/workoutPlans";

export default function FullBodyCPage() {
  return (
    <WorkoutPage
      defaultWorkout={fullBodyCWorkout}
      storageKey="forgefit-full-body-c"
    />
  );
}