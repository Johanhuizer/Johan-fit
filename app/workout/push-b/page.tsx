import WorkoutPage from "../../components/WorkoutPage";

import {
  pushBWorkout,
} from "../../lib/workoutPlans";


export default function PushBPage() {
  return (
    <WorkoutPage
      defaultWorkout={pushBWorkout}
      storageKey="forgefit-workout-push-b"
    />
  );
}