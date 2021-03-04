function groupObjectsBy(array, key) {
  return array
    .reduce((hash, obj) => {
      if(obj[key] === undefined) return hash; 
      return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
    }, {})
}

let channels = [
      {
        "channel": "A",
        "name": "shoe"
      },
      {
        "channel": "A",
        "name": "electronics"
      },
      {
        "channel": "B",
        "name": "apparel"
      },
      {
        "channel": "C",
        "name": "electronics"
      }
    ];
console.log(JSON.stringify(groupObjectsBy(channels, 'channel')));

