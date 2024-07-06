function countQueryOccurrences(input, query) {
    return query.map(q => input.filter(word => word === q).length);
  }
  
  const INPUT = ['xc', 'dz', 'bbb', 'dz'];
  const QUERY = ['bbb', 'ac', 'dz'];
  const OUTPUT = countQueryOccurrences(INPUT, QUERY);
  console.log(OUTPUT);  
  