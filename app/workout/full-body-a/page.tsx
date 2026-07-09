import WorkoutPage from "../../components/WorkoutPage";

import {
  fullBodyAWorkout,
} from "../../lib/workoutPlans";

export default function FullBodyAPage() {
  return (
    <WorkoutPage
      defaultWorkout={fullBodyAWorkout}
      storageKey="forgefit-full-body-a"
    />
  );
}