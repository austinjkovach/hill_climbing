/*
Your hill climbing algorithm should have the following inputs:

f = A string that represents a continuous mathematical function of one variable, like "x^2 + 1".
v = A string that contains the name of the variable in the mathematical function, like "x".
l = A numerical lower bound.
u = A numerical upper bound.
a = The acceleration for the search.
e = The difference value that terminates the search, like 0.0001.

algorithm Continuous Space Hill Climbing(f, v, l, u, a, e) is
    currentPoint := randomly selected between l and u
    epsilon := e
    stepSize := [1, 1, 1, 1]
    acceleration := a
    candidate[0] := −acceleration
    candidate[1] := −1 / acceleration
    candidate[2] := 1 / acceleration
    candidate[3] := acceleration
    bestScore := f(s) of f(0) if s is undefined
    loop do
        beforeScore := bestScore
        for each element i in currentPoint do
            beforePoint := currentPoint[i]
            bestStep := 0
            for j from 0 to 3 do
                step := stepSize[i] × candidate[j]
                currentPoint[i] := beforePoint + step
                score := EVAL(currentPoint)
                if score > bestScore then
                    bestScore := score
                    bestStep := step
            if bestStep is 0 then
                currentPoint[i] := beforePoint
                stepSize[i] := stepSize[i] / acceleration
            else
                currentPoint[i] := beforePoint + bestStep
                stepSize[i] := bestStep
        if (bestScore − beforeScore) < epsilon then
            return currentPoint

 */

function continuous_space_hill_climbing(
  f,
  v,
  lower_bound,
  upper_bound,
  acceleration,
  epsilon
) {
  let currentPoint = getRandom(lower_bound, upper_bound);

  let stepSize = [1, 1, 1, 1];
  let candidates = [
    -acceleration,
    -1 / acceleration,
    1 / acceleration,
    acceleration,
  ];

  let bestScore = f(0);

  while (true) {
    let beforeScore = bestScore;
    let [x, y] = currentPoint;
    [x, y].forEach((point, i) => {
      let beforePoint = point;
      let bestStep = 0;

      candidates.forEach(candidate => {
        let step = stepSize[i] * candidate;
        currentPoint[i] = beforePoint + step;
        score = f(currentPoint);
        if (score > bestScore) {
          bestScore = score;
          bestStep = step;
        }
      });

      if (bestStep === 0) {
        currentPoint[i] = beforePoint;
        stepSize[i] = stepSize[i] / acceleration;
      } else {
        currentPoint[i] = beforePoint + bestStep;
        stepSize[i] = bestStep;
      }

      if (bestScore - beforeScore < epsilon) {
        return currentPoint;
      }
    });
  }
}

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);
