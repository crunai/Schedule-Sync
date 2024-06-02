import useDelayDisplay from "../hooks/useDelayDisplay";

function FallBack() {
  const display = useDelayDisplay();

  return (
    <div className="flex flex-1 items-center justify-center">
      {display && (
        <>
          <h1 className="text-2xl font-semibold text-emerald-600">Loading</h1>
          <span className="loading loading-ball w-28 bg-emerald-600" />
        </>
      )}
    </div>
  );
}

export default FallBack;
