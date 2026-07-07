import WorkoutPage from "../components/WorkoutPage";

import {
  pushAWorkout,
} from "../lib/workoutPlans";


export default function PushAPage() {
  return (
    <WorkoutPage
      defaultWorkout={pushAWorkout}
      storageKey="forgefit-workout-push-a"
    />
  );
}