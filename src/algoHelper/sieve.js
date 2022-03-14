// return an array of number lists <= n, first element of each is a primary number
const sieve_algo = (n) => {
  let visited = { 1: true };
  let runs = [[1]];

  let curRun = [];
  for (let i = 2; i <= n; i += 2) {
    visited[i] = true;
    curRun.push(i);
  }
  runs.push(curRun);
  for (let i = 3; i <= n; i += 2) {
    if (visited[i]) continue;
    curRun = [i];
    for (let j = i; j * i <= n; ++j) {
      if (!visited[i * j]) {
        visited[i * j] = true;
        curRun.push(i * j);
      }
    }
    if (curRun.length > 0) runs.push(curRun);
  }
  return runs;
};

export { sieve_algo };
