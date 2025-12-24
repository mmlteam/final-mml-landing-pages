import React, { useState, useRef, useEffect } from "react";

export default function CountUp({ start = 0, end }) {
  const [state, setState] = useState(null);
  const ref = useRef(start);

  const accumulator = end / 200;

  const updateCounterState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) return setState(end);
      setState(result);
      ref.current = result;
    }
    setTimeout(updateCounterState, 40);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      updateCounterState();
    }

    return () => (isMounted = false);
  }, [end, start]);
  return (
    <div>
      {state}
      <span className="plus-icon">+</span>
    </div>
  );
}
