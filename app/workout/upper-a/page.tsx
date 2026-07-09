import WorkoutPage from "../../components/WorkoutPage";

import {
  upperAWorkout,
} from "../../lib/workoutPlans";

export default function UpperAPage() {
  return (
    <WorkoutPage
      defaultWorkout={upperAWorkout}
      storageKey="forgefit-upper-a"
    />
  );
}
