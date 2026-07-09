import WorkoutPage from "../../components/WorkoutPage";

import {
  fullBodyBWorkout,
} from "../../lib/workoutPlans";

export default function FullBodyBPage() {
  return (
    <WorkoutPage
      defaultWorkout={fullBodyBWorkout}
      storageKey="forgefit-full-body-b"
    />
  );
}