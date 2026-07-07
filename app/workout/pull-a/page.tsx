import WorkoutPage from "../../components/WorkoutPage";

import {
  pullAWorkout,
} from "../../lib/workoutPlans";


export default function PullAPage() {
  return (
    <WorkoutPage
      defaultWorkout={pullAWorkout}
      storageKey="forgefit-workout-pull-a"
    />
  );
}