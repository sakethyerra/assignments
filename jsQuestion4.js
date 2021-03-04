class SortArray{
      constructor(OriginalArray){
        let _OriginalArray
        this._OriginalArray= OriginalArray;
        this.getSortedArray= () => {
         return _OriginalArray;
        }
        this.setSortedArray= (OriginalArray) => {
          _OriginalArray = OriginalArray;
        }
        this.sortNumber = (a, b) => {return a - b;}
      }
    }
    class SortObjectArray extends SortArray{
    }
    var s= new SortArray();
    var a= s.sortNumber;
    s.setSortedArray([111,32,29,1]);
    console.log("OriginalArray " + s.getSortedArray());
    console.log("SortedArray " + s.getSortedArray().sort(a));
    
    var so= new SortObjectArray();
    var c= [
      {
        "name":"Saketh",
        "age":"25"
      },
      {
        "name":"Yerra",
        "age":"22"
      },
      {
        "name":"Test",
        "age":"21"
      }
    ]
    so.setSortedArray(c);
    console.log("OriginalJSONObject " + JSON.stringify(so.getSortedArray()));
    console.log("SortedJSONObject "+ JSON.stringify(so.getSortedArray().sort(function(a, b) {
        return parseFloat(a.age) - parseFloat(b.age)})));
    